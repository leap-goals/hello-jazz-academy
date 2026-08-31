#!/usr/bin/env node
// data/wp-export/xml/image-urls.txt に載っている画像を public/images/legacy/ 配下へ一括取得する。
// 使い方: node scripts/wp-export/download-legacy-images.mjs
//
// 方針:
//   - 自サイトの wp-content/uploads 配下だけを対象にする。移行時にドメインがIPアドレス
//     (52.194.116.245等)のまま残っている古い参照は www.hellojazzacademy.com へ正規化して取得する。
//   - Amazonアソシエイトのウィジェット画像(ws-fe.amazon-adsystem.com等)は自サイトの資産ではなく
//     Amazon側が動的に生成する広告画像なので、取得対象から除外する(再配置しても意味がなく、
//     無関係な第三者のサーバーへ機械的に一括アクセスするのも避ける)。
//   - 既にファイルが存在する場合はスキップする(再実行しても安全)。

import { mkdir, stat, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '../..');
const URL_LIST_PATH = path.join(ROOT, 'data/wp-export/xml/image-urls.txt');
const OUT_DIR = path.join(ROOT, 'public/images/legacy');
const REPORT_PATH = path.join(ROOT, 'data/wp-export/xml/image-download-report.json');

const CANONICAL_HOST = 'www.hellojazzacademy.com';
const THIRD_PARTY_HOST_RE = /amazon-adsystem\.com|amazonaws\.com/i;
const REQUEST_DELAY_MS = 150;
const FETCH_TIMEOUT_MS = 20000;

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

// url-list上のURLを実際に取得すべきURLとローカル保存パスに正規化する。
// wp-content/uploads配下でなければ(想定外のホスト等) nullを返して呼び出し側でスキップする。
function resolveTarget(rawUrl) {
  let u;
  try {
    // "//host/path" のプロトコル相対URLはhttps:を補う
    u = new URL(rawUrl.startsWith('//') ? `https:${rawUrl}` : rawUrl);
  } catch {
    return { skip: 'unparseable-url' };
  }

  if (THIRD_PARTY_HOST_RE.test(u.hostname)) {
    return { skip: 'third-party-widget' };
  }

  const idx = u.pathname.indexOf('/wp-content/uploads/');
  if (idx === -1) {
    return { skip: 'not-uploads-path' };
  }

  const relPath = u.pathname.slice(idx + '/wp-content/uploads/'.length);
  const decodedRelPath = relPath
    .split('/')
    .map((seg) => decodeURIComponent(seg))
    .join('/');

  const fetchUrl = `https://${CANONICAL_HOST}${u.pathname}${u.search}`;
  const localPath = path.join(OUT_DIR, decodedRelPath);
  return { fetchUrl, localPath };
}

async function fileExists(p) {
  try {
    await stat(p);
    return true;
  } catch {
    return false;
  }
}

async function downloadOnce(url) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return Buffer.from(await res.arrayBuffer());
  } finally {
    clearTimeout(timer);
  }
}

async function main() {
  const listText = await (await import('node:fs/promises')).readFile(URL_LIST_PATH, 'utf-8');
  const urls = listText.split('\n').map((l) => l.trim()).filter(Boolean);
  console.log(`Read ${urls.length} URLs from ${path.relative(ROOT, URL_LIST_PATH)}`);

  const result = { downloaded: [], skipped_existing: [], skipped: [], failed: [] };

  for (const rawUrl of urls) {
    const target = resolveTarget(rawUrl);
    if (target.skip) {
      result.skipped.push({ url: rawUrl, reason: target.skip });
      continue;
    }

    if (await fileExists(target.localPath)) {
      result.skipped_existing.push({ url: target.fetchUrl, path: path.relative(ROOT, target.localPath) });
      continue;
    }

    let lastErr = null;
    for (let attempt = 1; attempt <= 2; attempt += 1) {
      try {
        const buf = await downloadOnce(target.fetchUrl);
        await mkdir(path.dirname(target.localPath), { recursive: true });
        await writeFile(target.localPath, buf);
        result.downloaded.push({ url: target.fetchUrl, path: path.relative(ROOT, target.localPath), bytes: buf.length });
        console.log(`OK   ${path.relative(ROOT, target.localPath)} (${buf.length} bytes)`);
        lastErr = null;
        break;
      } catch (err) {
        lastErr = err;
        if (attempt === 1) await sleep(400); // 1回だけ間を置いてリトライ
      }
    }
    if (lastErr) {
      result.failed.push({ url: target.fetchUrl, error: String(lastErr) });
      console.warn(`FAIL ${target.fetchUrl} — ${lastErr}`);
    }

    await sleep(REQUEST_DELAY_MS);
  }

  await mkdir(path.dirname(REPORT_PATH), { recursive: true });
  await writeFile(
    REPORT_PATH,
    JSON.stringify(
      {
        generated_at: new Date().toISOString(),
        totals: {
          input_urls: urls.length,
          downloaded: result.downloaded.length,
          skipped_existing: result.skipped_existing.length,
          skipped: result.skipped.length,
          failed: result.failed.length,
        },
        ...result,
      },
      null,
      2,
    ),
    'utf-8',
  );

  console.log('');
  console.log(`Downloaded: ${result.downloaded.length}`);
  console.log(`Already existed (skipped): ${result.skipped_existing.length}`);
  console.log(`Skipped (third-party / non-upload): ${result.skipped.length}`);
  console.log(`Failed: ${result.failed.length}`);
  console.log(`Report written to ${path.relative(ROOT, REPORT_PATH)}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
