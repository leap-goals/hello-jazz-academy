#!/usr/bin/env node
// WordPressのエクスポートXML(WXR形式)をパースし、移行用データを書き出す。
// REST API経由のfetch-wp-content.mjsと違い、非公開/下書き投稿や旧URL(_wp_old_slug)、
// 添付ファイルの実ファイルURLまで含む「DBダンプそのもの」を読めるのが利点。
//
// 使い方: node scripts/wp-export/parse-wxr.mjs
//
// 出力:
//   data/wp-export/xml/posts.json         — 全post/page/newsの内容
//   data/wp-export/xml/image-urls.txt     — 本文中の画像URL一覧(1行1URL)
//   data/wp-export/xml/site-metadata.json — パーマリンク/カテゴリー構造のまとめ
//   data/redirects/redirects.json         — 旧パス→スラッグの対応表(_wp_old_slug含む)

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const XML_PATH = path.join(ROOT, 'hellojazzacademy.WordPress.2026-08-31.xml');
const WP_EXPORT_DIR = path.join(ROOT, 'data/wp-export/xml');
const REDIRECTS_DIR = path.join(ROOT, 'data/redirects');

// WXRの非CDATAフィールド(link/guidなど)は数値文字参照でエンコードされる。fetch-wp-content.mjsと同じ実装。
function decodeHtmlEntities(str) {
  if (!str) return str;
  return str
    .replace(/&#(\d+);/g, (_, dec) => String.fromCodePoint(Number(dec)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ');
}

// <tag>...</tag> または <tag><![CDATA[...]]></tag> のどちらでも中身を取る。
function field(block, tag) {
  const re = new RegExp(`<${tag}[^>]*>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`);
  const m = block.match(re);
  return m ? m[1] : null;
}

function intField(block, tag) {
  const v = field(block, tag);
  return v === null || v === '' ? null : Number(v);
}

// domain="category" / "post_tag" の <category> 要素をすべて拾う
function extractTerms(itemXml, domain) {
  const re = new RegExp(`<category domain="${domain}" nicename="([^"]*)"><!\\[CDATA\\[([\\s\\S]*?)\\]\\]></category>`, 'g');
  const out = [];
  let m;
  while ((m = re.exec(itemXml))) {
    out.push({ slug: decodeURIComponent(m[1]), name: m[2] });
  }
  return out;
}

// <wp:postmeta><wp:meta_key>K</wp:meta_key><wp:meta_value>V</wp:meta_value></wp:postmeta> をmapに
function extractPostmeta(itemXml) {
  const re = /<wp:postmeta>\s*<wp:meta_key><!\[CDATA\[([\s\S]*?)\]\]><\/wp:meta_key>\s*<wp:meta_value><!\[CDATA\[([\s\S]*?)\]\]><\/wp:meta_value>\s*<\/wp:postmeta>/g;
  const map = {};
  let m;
  while ((m = re.exec(itemXml))) {
    const key = m[1];
    // 同じキーが複数回(履歴等)出ることがあるため配列で保持
    (map[key] ??= []).push(m[2]);
  }
  return map;
}

// PHPのシリアライズ文字列から、トップレベルのwidth/heightだけを雑に拾う(完全なunserializeはしない)。
// _wp_attachment_metadata は width/height が sizes サブ配列より必ず先に出るWP側の生成順に依存する。
function extractWidthHeight(serialized) {
  if (!serialized) return { width: null, height: null };
  const w = serialized.match(/s:5:"width";i:(\d+);/);
  const h = serialized.match(/s:6:"height";i:(\d+);/);
  return { width: w ? Number(w[1]) : null, height: h ? Number(h[1]) : null };
}

function extractItems(xml) {
  return xml.match(/<item>[\s\S]*?<\/item>/g) ?? [];
}

function extractChannelTerms(xml, tag, nameTag) {
  const head = xml.slice(0, xml.indexOf('<item>'));
  const blocks = head.match(new RegExp(`<wp:${tag}>[\\s\\S]*?</wp:${tag}>`, 'g')) ?? [];
  return blocks.map((b) => ({
    term_id: intField(b, 'wp:term_id'),
    nicename: field(b, `wp:${tag}_nicename`) ? decodeURIComponent(field(b, `wp:${tag}_nicename`)) : null,
    parent: field(b, `wp:${tag}_parent`) || null,
    name: field(b, `wp:${nameTag}`),
  }));
}

function parseItem(itemXml, attachmentMap) {
  const postType = field(itemXml, 'wp:post_type');
  const postId = intField(itemXml, 'wp:post_id');
  const rawSlug = field(itemXml, 'wp:post_name') ?? '';
  const meta = extractPostmeta(itemXml);
  const metaFirst = (key) => (meta[key] ? meta[key][0] : null);

  const thumbnailId = metaFirst('_thumbnail_id');
  const featured = thumbnailId ? attachmentMap.get(Number(thumbnailId)) ?? null : null;

  // AIOSEOの未入力は '' または PHPシリアライズの空配列 'a:0:{}' として出てくる。両方nullに畳む。
  const seoField = (key) => {
    const v = metaFirst(key);
    if (!v || v === 'a:0:{}') return null;
    return decodeHtmlEntities(v);
  };

  const contentHtml = field(itemXml, 'content:encoded') ?? '';
  const excerptHtml = field(itemXml, 'excerpt:encoded') ?? '';

  return {
    post_type: postType,
    id: postId,
    title: decodeHtmlEntities(field(itemXml, 'title') ?? ''),
    slug: decodeURIComponent(rawSlug),
    slug_raw: rawSlug,
    link: decodeHtmlEntities(field(itemXml, 'link') ?? ''),
    status: field(itemXml, 'wp:status'),
    date: field(itemXml, 'wp:post_date'),
    date_gmt: field(itemXml, 'wp:post_date_gmt'),
    modified: field(itemXml, 'wp:post_modified'),
    parent: intField(itemXml, 'wp:post_parent') ?? 0,
    menu_order: intField(itemXml, 'wp:menu_order'),
    categories: extractTerms(itemXml, 'category'),
    tags: extractTerms(itemXml, 'post_tag'),
    content_html: contentHtml,
    content_is_empty: contentHtml.trim().length === 0,
    excerpt_html: excerptHtml || null,
    featured_image: featured ? { id: Number(thumbnailId), url: featured.url, width: featured.width, height: featured.height } : null,
    seo: {
      title: seoField('_aioseo_title'),
      description: seoField('_aioseo_description'),
      keywords: seoField('_aioseo_keywords'),
      og_title: seoField('_aioseo_og_title'),
      og_description: seoField('_aioseo_og_description'),
    },
    // WordPressはスラッグを変更すると旧スラッグをここに積む。301の手がかりになる。
    old_slugs: (meta._wp_old_slug ?? []).map(decodeURIComponent),
    // page_header_image はURLではなく添付ファイルID(文字列の数値)で入っているため、
    // アイキャッチと同じくattachmentMapで解決する。
    page_header_image: (() => {
      const id = metaFirst('page_header_image');
      if (!id || !/^\d+$/.test(id)) return null;
      const att = attachmentMap.get(Number(id));
      return att ? att.url : null;
    })(),
  };
}

function buildAttachmentMap(items) {
  const map = new Map();
  for (const itemXml of items) {
    if (field(itemXml, 'wp:post_type') !== 'attachment') continue;
    const id = intField(itemXml, 'wp:post_id');
    const url = field(itemXml, 'wp:attachment_url');
    if (!id || !url) continue;
    const meta = extractPostmeta(itemXml);
    const { width, height } = extractWidthHeight(meta._wp_attachment_metadata?.[0]);
    map.set(id, { url: decodeHtmlEntities(url), width, height });
  }
  return map;
}

// 本文HTML中の <img src="..."> をすべて拾う。属性の並び順は問わない。
function extractImgSrcs(html) {
  const out = [];
  const re = /<img\b[^>]*\bsrc=["']([^"']+)["']/gi;
  let m;
  while ((m = re.exec(html))) out.push(decodeHtmlEntities(m[1]));
  return out;
}

function buildRedirects(posts) {
  const redirects = [];
  for (const p of posts) {
    let oldPath;
    try {
      oldPath = new URL(p.link).pathname;
    } catch {
      oldPath = p.link;
    }
    redirects.push({
      type: 'current',
      old_path: oldPath,
      post_type: p.post_type,
      post_id: p.id,
      slug: p.slug,
      status: p.status,
    });
    // _wp_old_slug は「変更前のスラッグ」単体。現行のURL構造(page: /slug/, news: /news/slug/)に
    // あてはめて旧パスを推定する。post_type='page'の子ページはparentが辿れないため、
    // ルート直下と仮定した参考値である旨をnoteに残す。
    for (const oldSlug of p.old_slugs) {
      if (!oldSlug) continue;
      const guessedPath =
        p.post_type === 'news' ? `/news/${oldSlug}/` : `/${oldSlug}/`;
      redirects.push({
        type: 'slug_change',
        old_path: guessedPath,
        post_type: p.post_type,
        post_id: p.id,
        slug: p.slug,
        status: p.status,
        note: '_wp_old_slugから推定。子ページの場合パスの親階層は含まれないため要確認',
      });
    }
  }
  return redirects;
}

async function main() {
  console.log(`Reading ${XML_PATH} ...`);
  const xml = await readFile(XML_PATH, 'utf-8');

  const items = extractItems(xml);
  console.log(`  -> ${items.length} <item> elements`);

  const attachmentMap = buildAttachmentMap(items);
  console.log(`  -> ${attachmentMap.size} attachments`);

  const TARGET_TYPES = new Set(['page', 'post', 'news']);
  const posts = items
    .filter((it) => TARGET_TYPES.has(field(it, 'wp:post_type')))
    .map((it) => parseItem(it, attachmentMap))
    .sort((a, b) => (a.post_type + a.date).localeCompare(b.post_type + b.date));

  const counts = {};
  for (const p of posts) {
    const key = `${p.post_type}:${p.status}`;
    counts[key] = (counts[key] ?? 0) + 1;
  }

  await mkdir(WP_EXPORT_DIR, { recursive: true });
  await writeFile(
    path.join(WP_EXPORT_DIR, 'posts.json'),
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        source_file: path.basename(XML_PATH),
        note: 'post_type: page|post|news。post=旧ブログ記事(下書き含む)、news=お知らせカスタム投稿タイプ。statusで公開状態を判別すること。',
        counts,
        posts,
      },
      null,
      2,
    ),
    'utf-8',
  );
  console.log(`  -> wrote posts.json (${posts.length} items)`);

  // --- image-urls.txt: 本文中の画像 + アイキャッチ + ページヘッダー画像 ---
  const imageUrls = new Set();
  for (const p of posts) {
    for (const src of extractImgSrcs(p.content_html)) imageUrls.add(src);
    if (p.featured_image?.url) imageUrls.add(p.featured_image.url);
    if (p.page_header_image) imageUrls.add(decodeHtmlEntities(p.page_header_image));
  }
  const sortedUrls = [...imageUrls].sort();
  await writeFile(path.join(WP_EXPORT_DIR, 'image-urls.txt'), sortedUrls.join('\n') + '\n', 'utf-8');
  console.log(`  -> wrote image-urls.txt (${sortedUrls.length} unique URLs)`);

  // --- site-metadata.json ---
  const categories = extractChannelTerms(xml, 'category', 'cat_name');
  const tags = extractChannelTerms(xml, 'tag', 'tag_name');
  const baseUrl = field(xml.slice(0, xml.indexOf('<item>')), 'wp:base_site_url');
  const generatorMatch = xml.match(/generator="([^"]+)" created="([^"]+)"/);

  const siteMetadata = {
    generated_at: new Date().toISOString(),
    source_file: path.basename(XML_PATH),
    base_url: baseUrl,
    exported_with: generatorMatch ? generatorMatch[1] : null,
    export_created: generatorMatch ? generatorMatch[2] : null,
    post_type_counts: counts,
    permalink_patterns: {
      page: '/{slug}/ (親ページがある場合は /{parent-slug}/{slug}/ 。本ダンプのslugはparentを含まないpost_name単体)',
      news: '/news/{slug}/',
      post: '/{slug}/ 。ただしdraft等でslugが空の場合は /?p={id}',
    },
    categories,
    tags,
  };
  await writeFile(path.join(WP_EXPORT_DIR, 'site-metadata.json'), JSON.stringify(siteMetadata, null, 2), 'utf-8');
  console.log('  -> wrote site-metadata.json');

  // --- redirects.json ---
  const redirects = buildRedirects(posts);
  await mkdir(REDIRECTS_DIR, { recursive: true });
  await writeFile(path.join(REDIRECTS_DIR, 'redirects.json'), JSON.stringify(redirects, null, 2), 'utf-8');
  console.log(`  -> wrote redirects.json (${redirects.length} entries, incl. ${redirects.filter((r) => r.type === 'slug_change').length} slug-change entries)`);

  console.log('Done.');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
