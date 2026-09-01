/*
 * データ源はmicroCMSの newsAPI。
 * 完全静的エクスポートのため実行時には問い合わせず、ビルド時に一度だけ全件取得して
 * モジュール内にキャッシュする(同一ビルド中に複数ページから呼ばれても1回のfetchで済む)。
 */

export type NewsPost = {
  id: string;
  /** URLスラッグ。microCMS側のslugフィールドが空の記事はidをそのまま使う */
  slug: string;
  title: string;
  /** ISO8601 (UTC)。表示はformatNewsDateでJSTに変換してから使う */
  publishedAt: string;
  revisedAt: string;
  /** microCMSのリッチエディタが出力するHTML。そのまま描画する */
  contentHtml: string;
  metaDescription: string;
  /** OGP画像用。本文中の最初の画像URL。無ければnull */
  featuredImage: string | null;
};

type MicroCmsNewsContent = {
  id: string;
  title: string;
  content: string;
  slug?: string;
  publishedAt: string;
  revisedAt: string;
};

type MicroCmsListResponse = {
  contents: MicroCmsNewsContent[];
  totalCount: number;
};

function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `${name} が未設定です。.env.local (ローカル) / Cloudflare Pagesのビルド環境変数を確認してください。`,
    );
  }
  return value;
}

function stripTags(html: string): string {
  return html
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function extractFirstImageSrc(html: string): string | null {
  const match = html.match(/<img[^>]+src="([^"]+)"/);
  return match ? match[1] : null;
}

function toNewsPost(content: MicroCmsNewsContent): NewsPost {
  return {
    id: content.id,
    slug: content.slug?.trim() || content.id,
    title: content.title,
    publishedAt: content.publishedAt,
    revisedAt: content.revisedAt,
    contentHtml: content.content,
    metaDescription: stripTags(content.content).slice(0, 110),
    featuredImage: extractFirstImageSrc(content.content),
  };
}

async function fetchAllFromMicroCms(): Promise<NewsPost[]> {
  const domain = requireEnv("MICROCMS_SERVICE_DOMAIN");
  const apiKey = requireEnv("MICROCMS_API_KEY");
  const base = `https://${domain}.microcms.io/api/v1/news`;

  const contents: MicroCmsNewsContent[] = [];
  const limit = 100;
  for (let offset = 0; ; offset += limit) {
    const res = await fetch(`${base}?limit=${limit}&offset=${offset}&orders=-publishedAt`, {
      headers: { "X-MICROCMS-API-KEY": apiKey },
    });
    if (!res.ok) {
      throw new Error(`microCMSからのお知らせ取得に失敗しました: HTTP ${res.status} ${await res.text()}`);
    }
    const body = (await res.json()) as MicroCmsListResponse;
    contents.push(...body.contents);
    if (offset + limit >= body.totalCount) break;
  }

  return contents.map(toNewsPost);
}

let cachedPosts: Promise<NewsPost[]> | null = null;

export function getAllNewsPosts(): Promise<NewsPost[]> {
  if (!cachedPosts) cachedPosts = fetchAllFromMicroCms();
  return cachedPosts;
}

/*
 * Next.js 16.3.3 の静的エクスポートでは、和文スラッグの場合に
 * generateMetadataへは復号済みの文字列が渡る一方、ページコンポーネント本体には
 * パーセントエンコード済みの文字列(大文字16進)が渡ってくる非対称なバグがある。
 * デコード済み文字列に対するdecodeURIComponentは素通りするだけなので、
 * どちらの形で来ても同じ結果になるようここで一度吸収しておく。
 */
export async function getNewsPostBySlug(rawSlug: string): Promise<NewsPost | undefined> {
  let slug = rawSlug;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    // 不正な%エスケープを含む場合はそのまま扱う
  }
  const posts = await getAllNewsPosts();
  return posts.find((post) => post.slug === slug);
}

/** 表示用の日付。microCMSのpublishedAtはUTCのため、JSTの日付に変換してから切り出す */
export function formatNewsDate(isoDate: string): string {
  const parts = new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date(isoDate));
  const get = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${get("year")}.${get("month")}.${get("day")}`;
}
