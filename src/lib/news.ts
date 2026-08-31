import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";

/*
 * データ源は data/wp-export/markdown/news/*.md 。
 * WP REST APIから抽出したスラッグは(和文タイトルの場合)パーセントエンコードされた
 * 文字列として格納されているが、抽出スクリプトはそれをデコードしてファイル名にしている。
 * そのためファイル名(拡張子抜き)がそのまま実際のWP投稿スラッグ(和文含む)と一致し、
 * 旧URL(/news/<スラッグ>/)をそのまま新サイトのルートに引き継げる。
 */
const NEWS_DIR = path.join(process.cwd(), "data/wp-export/markdown/news");

export type NewsPost = {
  slug: string;
  title: string;
  /** WP側のオリジナルURL。OGPのcanonical用途にそのまま使う */
  link: string;
  date: string;
  modified: string;
  /** ダウンロード済みの/public/images/legacy/配下を指すローカルパス。未設定ならnull */
  featuredImage: string | null;
  metaDescription: string;
  paragraphs: string[];
};

function unquote(value: string): string {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"');
  }
  return trimmed;
}

// WPのuploads URLを、download-legacy-images.mjsが取得済みのローカルパスへ変換する
function toLocalImagePath(url: string): string | null {
  const marker = "/wp-content/uploads/";
  const idx = url.indexOf(marker);
  if (idx === -1) return null;
  const relPath = url.slice(idx + marker.length);
  return encodeURI(`/images/legacy/${relPath}`);
}

function parseNewsMarkdown(raw: string, filename: string): NewsPost {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);
  if (!match) {
    throw new Error(`front matterが見つかりません: ${filename}`);
  }
  const [, frontMatterBlock, body] = match;

  const fields: Record<string, string> = {};
  for (const line of frontMatterBlock.split("\n")) {
    const sep = line.indexOf(":");
    if (sep === -1) continue;
    fields[line.slice(0, sep).trim()] = unquote(line.slice(sep + 1));
  }

  const paragraphs = body
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);

  return {
    slug: path.basename(filename, ".md"),
    title: fields.title ?? "",
    link: fields.link ?? "",
    date: fields.date ?? "",
    modified: fields.modified || fields.date || "",
    featuredImage: fields.featured_image ? toLocalImagePath(fields.featured_image) : null,
    metaDescription: fields.meta_description ?? "",
    paragraphs,
  };
}

let cachedPosts: NewsPost[] | null = null;

export function getAllNewsPosts(): NewsPost[] {
  if (cachedPosts) return cachedPosts;
  const files = readdirSync(NEWS_DIR).filter((f) => f.endsWith(".md"));
  const posts = files.map((f) =>
    parseNewsMarkdown(readFileSync(path.join(NEWS_DIR, f), "utf-8"), f),
  );
  posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
  cachedPosts = posts;
  return posts;
}

/*
 * Next.js 16.3.3 の静的エクスポートでは、和文スラッグの場合に
 * generateMetadataへは復号済みの文字列が渡る一方、ページコンポーネント本体には
 * パーセントエンコード済みの文字列(大文字16進)が渡ってくる非対称なバグがある。
 * デコード済み文字列に対するdecodeURIComponentは素通りするだけなので、
 * どちらの形で来ても同じ結果になるようここで一度吸収しておく。
 */
export function getNewsPostBySlug(rawSlug: string): NewsPost | undefined {
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    // 不正な%エスケープを含む場合はそのまま扱う
  }
  return getAllNewsPosts().find((post) => post.slug === slug);
}

/** 表示用の日付。WPのローカル時刻をそのまま使うため、Dateへは変換しない */
export function formatNewsDate(isoLike: string): string {
  return isoLike.slice(0, 10).replaceAll("-", ".");
}
