#!/usr/bin/env node
// data/wp-export/*.json (fetch-wp-content.mjsの出力)を元に、旧WPサイトから新Next.jsサイトへの
// 301リダイレクトマップを生成する。
//
// 前提方針(2026-08-29 ユーザー確認済み):
// - 新サイトのURL構造は現行WPのスラッグ・パスを完全に踏襲する(移行するページはold path === new path)
// - login / register / pw_reset (Ultimate Member, 未実装の生徒専用ページ)、
//   otona_classes (本文が空の重複ページ)、
//   'post'型の旧ブログ記事4件 (ナビゲーション上の「お知らせ」= 'news'型とは別物)
//   は新サイトに移行しない。301でリダイレクトする。
//
// 使い方: node scripts/wp-export/generate-redirect-map.mjs
// 前提: 先に node scripts/wp-export/fetch-wp-content.mjs を実行しておくこと。

import { mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '../../data/wp-export');
const OUT_DIR = path.resolve(__dirname, '../../data/redirects');

// 移行しない固定ページのスラッグと、リダイレクト先・理由
const EXCLUDED_PAGE_SLUGS = {
  login: { to: '/', reason: '生徒専用ログイン(Ultimate Member)。新サイトでは未実装(実装時期未定)' },
  register: { to: '/', reason: '生徒専用登録(Ultimate Member)。新サイトでは未実装(実装時期未定)' },
  pw_reset: { to: '/', reason: '生徒専用パスワードリセット(Ultimate Member)。新サイトでは未実装' },
  otona_classes: {
    to: '/courses/jazzpianoforbeginners/',
    reason: '本文が空の重複ページ。内容の近い /courses/jazzpianoforbeginners/ へ統合',
  },
};

// 'post'型(標準投稿, ナビゲーション上の「お知らせ」とは別の旧ブログ記事)は全件除外し、/news/ へ集約する
const LEGACY_POST_REDIRECT_TARGET = '/news/';
const LEGACY_POST_REASON = "'post'型の旧ブログ記事。現行ナビゲーションの「お知らせ」(newsカスタム投稿タイプ)とは別物のため移行対象外";

// sitemap.xml上に残っていた、実体のない/削除済みの旧URL
//
// 注意: クエリ文字列付きURL(`/?page_id=83`等)はCloudflare Pagesの_redirectsでは
// マッチング対象外(クエリ文字列は無視される)。旧「/?page_id=83 -> /」のような行は
// 実質「/ -> /」と解釈され、トップページが無限リダイレクトループに陥る重大な不具合になる
// (2026-08-30 本番で発生・確認済み)。静的サイトはクエリ文字列を無視して同じファイルを
// 返すため、これらのURLはリダイレクトを書かなくても実害はない。よってここには
// クエリ文字列を含むold_pathを追加しないこと。
const STALE_LEGACY_URLS = [];

function toPath(link) {
  const u = new URL(link);
  return u.pathname; // WPの `link` は末尾スラッシュ込みなのでそのまま使う
}

async function loadJson(file) {
  const raw = await readFile(path.join(DATA_DIR, file), 'utf-8');
  return JSON.parse(raw);
}

function buildRedirectsFile(entries) {
  const lines = [
    '# Cloudflare Pages _redirects',
    '# node scripts/wp-export/generate-redirect-map.mjs により自動生成。手動編集した場合は再生成時に上書きされる点に注意。',
    '',
  ];
  for (const e of entries.filter((e) => e.category === 'redirect')) {
    lines.push(`${e.old_path} ${e.new_path} 301`);
  }
  lines.push('');
  return lines.join('\n');
}

function buildSummary(entries) {
  const keep = entries.filter((e) => e.category === 'keep');
  const redirect = entries.filter((e) => e.category === 'redirect');
  const lines = [];
  lines.push('# 301リダイレクトマップ サマリー');
  lines.push('');
  lines.push(`生成日時: ${new Date().toISOString()}`);
  lines.push('');
  lines.push(
    '方針: 新サイトのURL構造は現行WPを完全踏襲するため、以下「維持」に分類したURLは旧→新で変化なし(リダイレクト不要)。'
  );
  lines.push('「リダイレクト」に分類したURLのみ301を設定する。');
  lines.push('');
  lines.push(`## 維持するURL (${keep.length}件, リダイレクト不要)`);
  lines.push('');
  for (const e of keep) {
    lines.push(`- \`${e.old_path}\` (${e.source_type})`);
  }
  lines.push('');
  lines.push(`## 301リダイレクトするURL (${redirect.length}件)`);
  lines.push('');
  for (const e of redirect) {
    lines.push(`- \`${e.old_path}\` → \`${e.new_path}\` — ${e.reason}`);
  }
  lines.push('');
  return lines.join('\n');
}

async function main() {
  const pages = await loadJson('pages.json');
  const posts = await loadJson('posts.json');
  const news = await loadJson('news.json');

  const entries = [];

  for (const p of pages) {
    const oldPath = toPath(p.link);
    const excluded = EXCLUDED_PAGE_SLUGS[p.slug];
    if (excluded) {
      entries.push({
        source_type: 'page',
        old_path: oldPath,
        new_path: excluded.to,
        reason: excluded.reason,
        category: 'redirect',
      });
    } else {
      entries.push({ source_type: 'page', old_path: oldPath, new_path: oldPath, category: 'keep' });
    }
  }

  for (const n of news) {
    const oldPath = toPath(n.link);
    entries.push({ source_type: 'news', old_path: oldPath, new_path: oldPath, category: 'keep' });
  }

  for (const p of posts) {
    const oldPath = toPath(p.link);
    entries.push({
      source_type: 'post(legacy)',
      old_path: oldPath,
      new_path: LEGACY_POST_REDIRECT_TARGET,
      reason: LEGACY_POST_REASON,
      category: 'redirect',
    });
  }

  for (const s of STALE_LEGACY_URLS) {
    entries.push({
      source_type: 'stale-sitemap-url',
      old_path: s.old_path,
      new_path: s.to,
      reason: s.reason,
      category: 'redirect',
    });
  }

  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(path.join(OUT_DIR, 'redirect-map.json'), JSON.stringify(entries, null, 2), 'utf-8');
  await writeFile(path.join(OUT_DIR, '_redirects'), buildRedirectsFile(entries), 'utf-8');
  await writeFile(path.join(OUT_DIR, 'summary.md'), buildSummary(entries), 'utf-8');

  const redirectCount = entries.filter((e) => e.category === 'redirect').length;
  const keepCount = entries.filter((e) => e.category === 'keep').length;
  console.log(`維持: ${keepCount}件, リダイレクト: ${redirectCount}件`);
  console.log(`出力先: ${OUT_DIR}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
