#!/usr/bin/env node
/*
 * microCMSのnews APIに追加した`slug`フィールドへ、WPスラッグを一括で埋め戻す。
 * 対象は data/wp-export/markdown/news/*.md のタイトルとmicroCMS側のtitleが完全一致するもののみ。
 * 一致しない(=WP由来ではない新規記事)はスキップし、手動での設定が必要な旨をログに出す。
 *
 * 実行: node --env-file=.env.local scripts/wp-export/backfill-news-slugs.mjs
 *
 * 前提:
 *   - microCMS管理画面でnews APIのスキーマに、フィールドID "slug" のテキストフィールドを追加済みであること
 *   - .env.local に MICROCMS_SERVICE_DOMAIN と MICROCMS_MANAGEMENT_API_KEY (コンテンツAPIの書き込み権限を含む)
 *   - 既にslugが設定済みの記事は上書きしない(冪等)
 */

import { readFileSync, readdirSync } from "node:fs";
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
const NEWS_DIR = path.join(ROOT, "data/wp-export/markdown/news");

function unquote(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"') && trimmed.length >= 2) {
    return trimmed.slice(1, -1).replace(/\\"/g, '"');
  }
  return trimmed;
}

// ファイル名(拡張子抜き) = 旧WPのスラッグ(和文含む、旧URLをそのまま引き継ぐため)
function loadWpSlugByTitle() {
  const map = new Map();
  const files = readdirSync(NEWS_DIR).filter((f) => f.endsWith(".md"));
  for (const filename of files) {
    const raw = readFileSync(path.join(NEWS_DIR, filename), "utf-8");
    const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);
    if (!match) continue;
    const fields = {};
    for (const line of match[1].split("\n")) {
      const sep = line.indexOf(":");
      if (sep === -1) continue;
      fields[line.slice(0, sep).trim()] = unquote(line.slice(sep + 1));
    }
    if (!fields.title) continue;
    map.set(fields.title, path.basename(filename, ".md"));
  }
  return map;
}

async function fetchAllContents() {
  const contents = [];
  const limit = 100;
  for (let offset = 0; ; offset += limit) {
    const res = await fetch(
      `${CONTENT_BASE}/news?fields=id,title,slug&limit=${limit}&offset=${offset}`,
      { headers: { "X-MICROCMS-API-KEY": API_KEY } },
    );
    if (!res.ok) throw new Error(`一覧取得に失敗: HTTP ${res.status} ${await res.text()}`);
    const body = await res.json();
    contents.push(...body.contents);
    if (offset + limit >= body.totalCount) break;
  }
  return contents;
}

async function setSlug(id, slug) {
  const res = await fetch(`${CONTENT_BASE}/news/${id}`, {
    method: "PATCH",
    headers: { "X-MICROCMS-API-KEY": API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ slug }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} ${await res.text()}`);
}

async function main() {
  const wpSlugByTitle = loadWpSlugByTitle();
  const contents = await fetchAllContents();
  console.log(`microCMS: ${contents.length}件 / WP由来タイトル: ${wpSlugByTitle.size}件\n`);

  let updated = 0;
  let skippedAlready = 0;
  const unmatched = [];

  for (const content of contents) {
    if (content.slug && content.slug.trim() !== "") {
      skippedAlready++;
      continue;
    }
    const wpSlug = wpSlugByTitle.get(content.title);
    if (!wpSlug) {
      unmatched.push(content);
      continue;
    }
    await setSlug(content.id, wpSlug);
    console.log(`- 更新: ${content.title} -> slug="${wpSlug}"`);
    updated++;
  }

  console.log("\n===== 結果 =====");
  console.log(`更新: ${updated}件 / 設定済みのためスキップ: ${skippedAlready}件 / 要手動設定: ${unmatched.length}件`);
  if (unmatched.length > 0) {
    console.log("\n手動でslugを設定してください(WP由来ではない新規記事です):");
    for (const c of unmatched) {
      console.log(`  - ${c.title} (id: ${c.id})`);
    }
  }
}

main();
