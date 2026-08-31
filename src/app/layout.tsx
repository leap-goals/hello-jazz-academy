import type { Metadata } from "next";
import { Quicksand, Zen_Maru_Gothic } from "next/font/google";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

/*
 * 書体は2本だけ。ロゴのワードマークが「線幅が一定で、端が丸い幾何学サンセリフ」
 * なので、和文・欧文ともそこへ寄せる。
 *
 * Zen丸ゴシック … 和文のすべて(見出し・本文・注記)。丸ゴシックのなかでは
 *                 字面が締まっていて、大きく組んでも子どもっぽくならない。
 * Quicksand   … 欧文ラベル、数字(料金・割合)、和音記号。
 *                 ロゴの欧文とほぼ同じ骨格の幾何学ラウンド体。
 *
 * 書体を1系統に絞ったぶん、階層は「大きさ・太さ・濃度・余白」だけでつける。
 * 和文はファイルが大きいため preload は切り、使う字だけを取りにいかせる。
 */
const gothic = Zen_Maru_Gothic({
  variable: "--font-gothic",
  weight: ["400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  // 相対パスで指定したOGP画像(/images/xxx.jpeg)を絶対URLへ解決するための基点。
  // 未設定だとNext.jsがhttp://localhost:3000を基点にしてしまい、静的書き出し後もog:imageがlocalhost参照のまま残る
  metadataBase: new URL("https://www.hellojazzacademy.com"),
  title: "Hello Jazz Academy | オンラインジャズピアノレッスン",
  description:
    "自宅から受けられるオンラインジャズピアノレッスン。Zoom / FaceTimeで世界中どこからでも、初心者もゼロから。月2回・オーダーメイドのカリキュラムで、コードもアドリブも身につきます。",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ja"
      className={`${gothic.variable} ${quicksand.variable} h-full antialiased`}
    >
      <head>
        {/*
          スクロール連動の演出はJSで表示状態を切り替えるため、
          JSが動かない環境では最初から表示済みの状態に倒す。
        */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
      </head>
      <body className="flex min-h-full flex-col bg-paper font-body text-ink">
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
