#!/usr/bin/env node
/*
 * WordPressの「お知らせ」(data/wp-export/news.json, 17件)をmicroCMSの newsAPIへ一括インポートする。
 *
 * 実行: node --env-file=.env.local scripts/wp-export/import-to-microcms.mjs
 *
 * 前提:
 *   - .env.local に MICROCMS_SERVICE_DOMAIN と MICROCMS_MANAGEMENT_API_KEY を設定済みであること
 *   - このAPIキーには以下の権限が必要(2026-08-31時点でhellojazzサービスに対して確認したところ、
 *     現在設定されているキーはコンテンツAPIの読み取りのみで、下記はすべて不足していた):
 *       1. コンテンツAPI「news」への書き込み(POST)権限
 *       2. マネジメントAPIの「メディアアップロード」権限
 *   - newsAPIのスキーマはAPI情報取得権限がなく直接確認できなかったため、
 *     既存のサンプル記事(GET /api/v1/news)から逆算した title / content / category の3項目とする。
 *     category は必須のrelationフィールドで、既存の唯一のカテゴリ「更新情報」(id: h-h8dpkpvnj)を
 *     WP側に元々カテゴリ分類がないため全件に付与する。スキーマがこれと異なる場合は要修正。
 *   - 画像は scripts/wp-export/download-legacy-images.mjs で取得済みの
 *     public/images/legacy/ 配下のファイルをアップロードする(WP側の生存に依存しない)。
 *     5MBを超えるファイル、ローカルに存在しないファイルはアップロードをスキップし、
 *     本文中は元のWP URLのまま残す(ログに警告を出す)。
 */

import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "../..");

const SERVICE_DOMAIN = process.env.MICROCMS_SERVICE_DOMAIN;
const API_KEY = process.env.MICROCMS_MANAGEMENT_API_KEY;

if (!SERVICE_DOMAIN || !API_KEY) {
  console.error(
    "MICROCMS_SERVICE_DOMAIN / MICROCMS_MANAGEMENT_API_KEY が未設定です。.env.local を確認してください。",
  );
  process.exit(1);
}

const CONTENT_BASE = `https://${SERVICE_DOMAIN}.microcms.io/api/v1`;
const MANAGEMENT_BASE = `https://${SERVICE_DOMAIN}.microcms-management.io/api/v1`;
const CATEGORY_ID = "h-h8dpkpvnj"; // 既存の唯一のカテゴリ「更新情報」
const NEWS_JSON_PATH = path.join(ROOT, "data/wp-export/news.json");
const LEGACY_IMAGES_DIR = path.join(ROOT, "public/images/legacy");
const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

// 拡張子からMIMEタイプを決める。microCMSのメディアアップロードは
// Content-Typeが image/* であることを検証しており、未指定(application/octet-stream)は拒否される
const MIME_BY_EXT = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function toLocalImagePath(wpUrl) {
  const marker = "/wp-content/uploads/";
  const idx = wpUrl.indexOf(marker);
  if (idx === -1) return null;
  return path.join(LEGACY_IMAGES_DIR, decodeURIComponent(wpUrl.slice(idx + marker.length)));
}

const uploadCache = new Map(); // 元のWP画像URL -> microCMSアップロード後のURL
const UPLOAD_DELAY_MS = 300; // 連続アップロードでの429を避けるための最小間隔

async function uploadImage(wpUrl) {
  if (uploadCache.has(wpUrl)) return uploadCache.get(wpUrl);

  const localPath = toLocalImagePath(wpUrl);
  if (!localPath) {
    console.warn(`    [image] uploads配下のURLではないためスキップ: ${wpUrl}`);
    return null;
  }

  let buffer;
  try {
    buffer = await readFile(localPath);
  } catch {
    console.warn(`    [image] ローカルにファイルが見つからずスキップ: ${localPath}`);
    return null;
  }

  if (buffer.byteLength > MAX_UPLOAD_BYTES) {
    console.warn(
      `    [image] 5MB超のためスキップ (${(buffer.byteLength / 1024 / 1024).toFixed(1)}MB): ${localPath}`,
    );
    return null;
  }

  const filename = path.basename(localPath);
  const mimeType = MIME_BY_EXT[path.extname(filename).toLowerCase()] ?? "application/octet-stream";

  for (let attempt = 1; attempt <= 4; attempt++) {
    await sleep(UPLOAD_DELAY_MS);

    const form = new FormData();
    form.append("file", new Blob([buffer], { type: mimeType }), filename);

    const res = await fetch(`${MANAGEMENT_BASE}/media`, {
      method: "POST",
      headers: { "X-MICROCMS-API-KEY": API_KEY },
      body: form,
    });

    if (res.ok) {
      const { url } = await res.json();
      uploadCache.set(wpUrl, url);
      console.log(`    [image] アップロード完了: ${filename}`);
      return url;
    }

    if (res.status === 429 && attempt < 4) {
      const retryAfterSec = Number(res.headers.get("retry-after"));
      const backoffMs = Number.isFinite(retryAfterSec) ? retryAfterSec * 1000 : attempt * 1500;
      console.warn(`    [image] レート制限、${backoffMs}ms待って再試行 (${attempt}/4): ${filename}`);
      await sleep(backoffMs);
      continue;
    }

    const body = await res.text().catch(() => "");
    console.warn(`    [image] アップロード失敗 (HTTP ${res.status}): ${filename} — ${body}`);
    return null;
  }

  return null;
}

function extractImgSrcs(html) {
  const srcs = new Set();
  const re = /<img[^>]+src="([^"]+)"/g;
  let match;
  while ((match = re.exec(html))) srcs.add(match[1]);
  return [...srcs];
}

async function buildContentHtml(post) {
  let html = post.content_html || "";
  const inlineSrcs = extractImgSrcs(html);
  const allSrcs = new Set(inlineSrcs);
  if (post.featured_image?.url) allSrcs.add(post.featured_image.url);

  const replacements = new Map();
  for (const src of allSrcs) {
    const newUrl = await uploadImage(src);
    if (newUrl) replacements.set(src, newUrl);
  }

  for (const [oldUrl, newUrl] of replacements) {
    html = html.split(oldUrl).join(newUrl);
  }

  // アイキャッチ専用フィールドがないスキーマのため、本文中に出てこないアイキャッチは先頭に差し込む
  if (post.featured_image?.url && !inlineSrcs.includes(post.featured_image.url)) {
    const featuredNewUrl = replacements.get(post.featured_image.url);
    if (featuredNewUrl) {
      html = `<figure><img src="${featuredNewUrl}" alt=""></figure>\n${html}`;
    }
  }

  return html;
}

// タイトルが一致する既存コンテンツのMap<title, id>を取得する。
// 再実行時に重複作成せず、既存分はPATCHで更新できるようにするため
async function fetchExistingByTitle() {
  const map = new Map();
  let offset = 0;
  const limit = 100;
  for (;;) {
    const res = await fetch(`${CONTENT_BASE}/news?fields=id,title&limit=${limit}&offset=${offset}`, {
      headers: { "X-MICROCMS-API-KEY": API_KEY },
    });
    if (!res.ok) throw new Error(`既存コンテンツの取得に失敗: HTTP ${res.status}`);
    const body = await res.json();
    for (const c of body.contents) map.set(c.title, c.id);
    offset += limit;
    if (offset >= body.totalCount) break;
  }
  return map;
}

async function upsertNewsEntry(post, existingId) {
  const content = await buildContentHtml(post);
  const payload = {
    title: post.title,
    content,
    category: CATEGORY_ID,
    publishedAt: `${post.date_gmt}Z`,
  };

  const url = existingId ? `${CONTENT_BASE}/news/${existingId}` : `${CONTENT_BASE}/news`;
  const res = await fetch(url, {
    method: existingId ? "PATCH" : "POST",
    headers: {
      "X-MICROCMS-API-KEY": API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${JSON.stringify(body)}`);
  }
  return existingId ?? body.id;
}

async function main() {
  const posts = JSON.parse(await readFile(NEWS_JSON_PATH, "utf-8"));
  const existingByTitle = await fetchExistingByTitle();
  console.log(`${posts.length}件のお知らせをインポートします\n`);

  const results = [];
  for (const post of posts) {
    const existingId = existingByTitle.get(post.title);
    console.log(`- ${post.title} (${post.slug})${existingId ? ` [更新: ${existingId}]` : ""}`);
    try {
      const id = await upsertNewsEntry(post, existingId);
      console.log(`  -> 成功 (id: ${id})`);
      results.push({ slug: post.slug, title: post.title, ok: true, id });
    } catch (err) {
      console.error(`  -> 失敗: ${err.message}`);
      results.push({ slug: post.slug, title: post.title, ok: false, error: err.message });
    }
  }

  const succeeded = results.filter((r) => r.ok);
  const failed = results.filter((r) => !r.ok);

  console.log("\n===== 結果 =====");
  console.log(`成功: ${succeeded.length}件 / 失敗: ${failed.length}件 / 合計: ${results.length}件`);
  if (failed.length > 0) {
    console.log("\n失敗した投稿:");
    for (const f of failed) {
      console.log(`  - ${f.title} (${f.slug}): ${f.error}`);
    }
    process.exitCode = 1;
  }
}

main();
