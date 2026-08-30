import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  // 旧WPサイトのURL(例: /access/)と末尾スラッシュの有無を揃え、301リダイレクトマップとの整合性を保つ
  trailingSlash: true,
  images: {
    // 完全静的エクスポートではNext.jsの画像最適化API(サーバー)が使えないため無効化
    unoptimized: true,
  },
  // ホームディレクトリ直下に無関係なpackage-lock.jsonがあり、
  // ワークスペースルートの自動検出が誤爆するため明示的に固定する
  turbopack: {
    root: __dirname,
  },
  // スマホ実機からLAN経由でdevサーバーを確認するため、自宅LANのオリジンを許可する
  allowedDevOrigins: ["192.168.1.36"],
};

export default nextConfig;
