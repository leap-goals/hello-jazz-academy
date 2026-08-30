import type { Metadata } from "next";
import { Shippori_Mincho_B1, EB_Garamond } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

// 本文も見出しも同じオールド明朝で通す。リソグラフ調の紙面と、
// ジャズという「印刷物としての文化」に軸足を置いた版面をつくる。
const mincho = Shippori_Mincho_B1({
  variable: "--font-mincho",
  weight: ["400", "500", "700", "800"],
  subsets: ["latin"],
  preload: false,
});

// 欧文のラベル(ABOUT / LESSON など)。古典的なセリフでレコードジャケットの活字に寄せる
const enSerif = EB_Garamond({
  variable: "--font-en-serif",
  weight: ["500", "600"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hello Jazz Academy | オンラインジャズピアノレッスン",
  description:
    "自宅から受けられるオンラインジャズピアノレッスン。Zoom / FaceTimeで世界中どこからでも、初心者もゼロから。月2回・オーダーメイドのカリキュラムで、コードもアドリブも身につきます。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${mincho.variable} ${enSerif.variable} h-full antialiased`}
    >
      <head>
        {/*
          スクロール連動の演出はJSで表示状態を切り替えるため、
          JSが動かない環境では最初から表示済みの状態に倒す。
        */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}.rule-draw{transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-paper font-body text-ink">
        <SiteHeader />
        {children}
        <SiteFooter />
        <div className="paper-grain" aria-hidden="true" />
      </body>
    </html>
  );
}
