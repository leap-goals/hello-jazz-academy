#!/usr/bin/env node
// WordPress REST APIから全ページ・全記事を取得し、data/wp-export/ 配下にJSON/Markdownで保存する。
// 使い方: node scripts/wp-export/fetch-wp-content.mjs

import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE_URL = 'https://www.hellojazzacademy.com';
const API_BASE = `${SITE_URL}/wp-json/wp/v2`;
const PER_PAGE = 100;

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.resolve(__dirname, '../../data/wp-export');

// WordPressのcontent/titleは数値文字参照(&#8211;等)でエンコードされているため、それを実文字に戻す。
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

function htmlToPlainText(html) {
  if (!html) return '';
  const stripped = html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|h[1-6]|li|figure)>/gi, '\n')
    .replace(/<[^>]+>/g, '');
  return decodeHtmlEntities(stripped)
    .replace(/[ \t]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .split('\n')
    .map((line) => line.trim())
    .join('\n')
    .trim();
}

async function fetchAllPaginated(endpoint) {
  const results = [];
  let page = 1;
  while (true) {
    const url = `${API_BASE}/${endpoint}?per_page=${PER_PAGE}&page=${page}&_embed=1`;
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 400 && page > 1) break; // ページ範囲外
      throw new Error(`Failed to fetch ${url}: HTTP ${res.status}`);
    }
    const items = await res.json();
    results.push(...items);
    const totalPages = Number(res.headers.get('X-WP-TotalPages') || '1');
    if (page >= totalPages) break;
    page += 1;
  }
  return results;
}

function extractFeaturedImage(item) {
  const media = item._embedded?.['wp:featuredmedia']?.[0];
  if (!media || media.code) return null; // codeがある場合はエラーオブジェクト
  return {
    id: item.featured_media || null,
    url: media.source_url || null,
    alt: decodeHtmlEntities(media.alt_text || '') || null,
  };
}

function extractSeo(item) {
  const meta = item.aioseo_meta_data || {};
  return {
    meta_description: meta.description || null,
    og_title: meta.og_title ? decodeHtmlEntities(meta.og_title) : null,
    og_description: meta.og_description || null,
    og_image_url: meta.og_image_url || meta.og_image_custom_url || null,
  };
}

function normalizeItem(item, type) {
  const contentHtml = item.content?.rendered ?? '';
  const excerptHtml = item.excerpt?.rendered ?? '';
  return {
    type,
    id: item.id,
    slug: item.slug,
    link: item.link,
    status: item.status,
    title: decodeHtmlEntities(item.title?.rendered ?? ''),
    date: item.date,
    date_gmt: item.date_gmt,
    modified: item.modified,
    parent: item.parent ?? 0,
    menu_order: item.menu_order ?? null,
    template: item.template || null,
    content_html: contentHtml,
    content_text: htmlToPlainText(contentHtml),
    content_is_empty: contentHtml.trim().length === 0,
    excerpt_html: excerptHtml || null,
    excerpt_text: excerptHtml ? htmlToPlainText(excerptHtml) : null,
    featured_image: extractFeaturedImage(item),
    seo: extractSeo(item),
    author: item._embedded?.author?.[0]?.name
      ? decodeHtmlEntities(item._embedded.author[0].name)
      : null,
    categories:
      item._embedded?.['wp:term']?.flat()
        .filter((t) => t.taxonomy === 'category')
        .map((t) => ({ id: t.id, name: decodeHtmlEntities(t.name), slug: t.slug })) || [],
  };
}

function slugForFile(item) {
  // 日本語タイトルがパーセントエンコードされたslugはデコードしてファイル名に使う
  const decoded = decodeURIComponent(item.slug || '');
  return decoded || `id-${item.id}`;
}

async function writeMarkdownFiles(items, subdir) {
  const dir = path.join(OUT_DIR, 'markdown', subdir);
  await mkdir(dir, { recursive: true });
  for (const item of items) {
    const frontmatter = [
      '---',
      `title: "${item.title.replace(/"/g, '\\"')}"`,
      `slug: ${item.slug}`,
      `link: ${item.link}`,
      `status: ${item.status}`,
      `date: ${item.date}`,
      `modified: ${item.modified}`,
      `parent: ${item.parent}`,
      `featured_image: ${item.featured_image?.url ?? ''}`,
      `meta_description: "${(item.seo.meta_description || '').replace(/"/g, '\\"')}"`,
      '---',
      '',
    ].join('\n');
    const body = item.content_is_empty
      ? '(本文が空です。ページビルダー/テーマカスタマイザーで構築されている可能性があります。手動確認が必要です)'
      : item.content_text;
    await writeFile(path.join(dir, `${slugForFile(item)}.md`), frontmatter + body + '\n', 'utf-8');
  }
}

function buildSummary(pages, posts, news) {
  const lines = [];
  lines.push('# WordPress コンテンツ抽出サマリー');
  lines.push('');
  lines.push(`取得日時: ${new Date().toISOString()}`);
  lines.push(`取得元: ${SITE_URL}`);
  lines.push('');
  lines.push(`## ページ (${pages.length}件)`);
  lines.push('');
  for (const p of pages) {
    const flags = [];
    if (p.content_is_empty) flags.push('⚠️本文空');
    if (!p.featured_image) flags.push('アイキャッチなし');
    if (!p.seo.og_image_url) flags.push('OGP画像未設定');
    lines.push(`- [${p.title}](${p.link}) (slug: \`${decodeURIComponent(p.slug)}\`, parent: ${p.parent})${flags.length ? ' — ' + flags.join(', ') : ''}`);
  }
  lines.push('');
  lines.push(`## お知らせ (カスタム投稿タイプ 'news', ${news.length}件)`);
  lines.push('');
  for (const p of news) {
    const flags = [];
    if (!p.featured_image) flags.push('アイキャッチなし');
    if (!p.seo.og_image_url) flags.push('OGP画像未設定');
    lines.push(`- [${p.title}](${p.link}) (slug: \`${decodeURIComponent(p.slug)}\`, 公開日: ${p.date})${flags.length ? ' — ' + flags.join(', ') : ''}`);
  }
  lines.push('');
  lines.push(`## 旧ブログ投稿 (標準投稿タイプ 'post', ${posts.length}件, /news/ とは別URL構造)`);
  lines.push('');
  for (const p of posts) {
    const flags = [];
    if (!p.featured_image) flags.push('アイキャッチなし');
    if (!p.seo.og_image_url) flags.push('OGP画像未設定');
    lines.push(`- [${p.title}](${p.link}) (slug: \`${decodeURIComponent(p.slug)}\`, 公開日: ${p.date})${flags.length ? ' — ' + flags.join(', ') : ''}`);
  }
  lines.push('');
  lines.push('## 既知の問題・要確認事項');
  lines.push('');
  lines.push('- 全ページ/投稿/お知らせでOGP画像(`og_image_url`)が未設定(`null`)。CLAUDE.mdに記載の既知不具合と一致。新サイトでは全ページに正しいOGP画像を設定すること。');
  lines.push('- 「お知らせ」はWP標準の投稿(`post`, rest_base: posts)ではなく、カスタム投稿タイプ`news`(rest_base: news, `/news/スラッグ/`)で管理されている。別途4件の`post`型記事が存在するが、こちらはナビゲーション上の「お知らせ」とは別の旧ブログ記事(URLも`/news/`配下ではなくルート直下)。移行対象に含めるか要確認。');
  lines.push('- `page_id=83`(旧「教室について」ページ)はREST API・公開URLともに404/rest_forbidden。現行の固定ページ一覧に該当ページが存在しない。');
  lines.push('- 講師 河地里咲 は現在休業中のため、プロフィールはトップページのみに掲載する方針(確認済み)。トップページ本文はREST API経由では取得できないため、掲載文言は別途書き起こしが必要。');
  lines.push('- 講師 コルテス・ポール のプロフィール文は `online` ページ本文中に埋め込まれた状態で発見。現在の運用はポール先生のオンラインレッスンがメイン。');
  lines.push('- トップページ(slug: `top`)の本文(`content.rendered`)が空。ページビルダー/テーマカスタマイザーでホームページが構築されており、REST API経由では文言を取得できない。目視での書き起こしが必要。');
  lines.push('- `login`/`register`ページに Ultimate Member プラグインのショートコード(`[ultimatemember form_id="..."]`)を検出。生徒専用ページは将来実装を検討中だが時期未定(確認済み)。新サイトでは現時点では実装しない。');
  lines.push('- 決済はSquare請求書を利用し、予約カレンダーも現状使用しない(確認済み)。ウェブサイト上にこれらの機能は不要。');
  lines.push('- `otona_classes`ページは本文が完全に空。`/courses/jazzpianoforbeginners/`と内容が重複する旧ページ(未整理のまま残存)の可能性があり、移行対象か削除対象か要確認。');
  lines.push('- `imaike_jazzpiano_lesson`ページは`content.rendered`に`<!DOCTYPE html>`から始まる独立したHTMLページ全体が丸ごと埋め込まれている。今池教室では月1回対面レッスンを実施しており、2027年3月までの期間限定(以降は東京でのレッスンを予定しているが未定、確認済み)。通常のブロックエディタ構造とは異なり独自CSS/HTMLを持つため、移行時は個別対応が必要。');
  lines.push('');
  return lines.join('\n');
}

async function main() {
  console.log('Fetching pages...');
  const rawPages = await fetchAllPaginated('pages');
  console.log(`  -> ${rawPages.length} pages`);

  console.log('Fetching posts...');
  const rawPosts = await fetchAllPaginated('posts');
  console.log(`  -> ${rawPosts.length} posts`);

  // 「お知らせ」は 'post' ではなくカスタム投稿タイプ 'news' (rest_base: news) で管理されている。
  // CLAUDE.mdの `/news/` はこちらを指す。'posts' はナビゲーションから独立した旧ブログ記事。
  console.log('Fetching news...');
  const rawNews = await fetchAllPaginated('news');
  console.log(`  -> ${rawNews.length} news`);

  const pages = rawPages.map((p) => normalizeItem(p, 'page'));
  const posts = rawPosts.map((p) => normalizeItem(p, 'post'));
  const news = rawNews.map((p) => normalizeItem(p, 'news'));

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(path.join(OUT_DIR, 'pages.json'), JSON.stringify(pages, null, 2), 'utf-8');
  await writeFile(path.join(OUT_DIR, 'posts.json'), JSON.stringify(posts, null, 2), 'utf-8');
  await writeFile(path.join(OUT_DIR, 'news.json'), JSON.stringify(news, null, 2), 'utf-8');

  await writeMarkdownFiles(pages, 'pages');
  await writeMarkdownFiles(posts, 'posts');
  await writeMarkdownFiles(news, 'news');

  const summary = buildSummary(pages, posts, news);
  await writeFile(path.join(OUT_DIR, 'summary.md'), summary, 'utf-8');

  console.log(`Done. Output written to ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
