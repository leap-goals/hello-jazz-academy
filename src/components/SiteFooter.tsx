"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import SocialLinks from "@/components/SocialIcons";
import {
  ABOUT_PATH,
  BOOKS_URL,
  CHORD_TOOL_PATH,
  FAQ_PATH,
  IMAIKE_FORM_URL,
  IMAIKE_PATH,
  LEAP_GOALS_URL,
  NEWS_PATH,
  PRIVACY_PATH,
  TOKUSHOHO_PATH,
  TRIAL_FORM_URL,
} from "@/components/SiteHeader";

/*
 * 締めは2段に分ける。
 *   上 … 申し込みの一言だけを、色の面いっぱいに置く。ページで最後に見る色がこれになる
 *   下 … サイトマップ・SNS・著作権表示。小さな文字と罫線だけの、探すための面
 * 濃い面を続けて2つ置かないことで、上段のCTAだけが立つ。
 */

type FooterLink = { href: string; label: string; external?: boolean };

// サイトマップは全ページ共通。トップ内のアンカーは下層からも辿れるよう絶対パスで書く。
// 「サービス案内」は教室・レッスンにまつわる情報、「コンテンツ」は付随する読み物・ツール
const FOOTER_GROUPS: { label: string; links: FooterLink[] }[] = [
  {
    label: "サービス案内",
    links: [
      { href: ABOUT_PATH, label: "教室について" },
      { href: NEWS_PATH, label: "お知らせ" },
      { href: "/#teacher", label: "講師紹介" },
      { href: "/#lesson", label: "レッスン・料金" },
      { href: IMAIKE_PATH, label: "今池対面レッスン" },
      { href: "/#flow", label: "入会までの流れ" },
      { href: FAQ_PATH, label: "FAQ" },
      { href: PRIVACY_PATH, label: "プライバシーポリシー" },
      { href: TOKUSHOHO_PATH, label: "特定商取引法に基づく表記" },
    ],
  },
  {
    label: "コンテンツ",
    links: [
      { href: BOOKS_URL, label: "おすすめ教則本", external: true },
      { href: CHORD_TOOL_PATH, label: "コード・スケール分析ツール", external: true },
      { href: LEAP_GOALS_URL, label: "Leap Goals（ゴール設定アプリ）", external: true },
    ],
  },
];

// 締めのCTAだけは、いま見ているページで売っているものに合わせて差し替える
const ONLINE_CTA = {
  heading: ["オンライン体験レッスン受付中！"],
  lead: "レッスンの雰囲気の確認、質問・お悩みなどをお聞かせください。",
  button: "体験レッスンに申し込む",
  price: "45min ¥3,000",
  href: TRIAL_FORM_URL,
  note: "レッスンはZoomまたはFaceTime。お支払いはSquare請求書にて承ります。",
};

// 今池だけは申し込みを外部フォームで受けるため、ボタンの行き先が違う
const IMAIKE_CTA = {
  heading: ["音楽の可能性を広げていきましょう。"],
  lead: "お申し込みフォームに、ご希望の月と時間帯、いま弾ける曲や学びたいことを添えてお送りください。開催日と会場の詳しい場所をご案内します。受講経験のある方は、LINEからでも承ります。",
  button: "申し込みフォームへ",
  price: "60min ¥10,000",
  href: IMAIKE_FORM_URL,
  note: "今池駅より徒歩3分、グランドピアノ完備のスタジオ。お支払いはクレジットカード決済のみとなります。",
};

export default function SiteFooter() {
  const isImaike = usePathname().startsWith(IMAIKE_PATH.replace(/\/$/, ""));
  const cta = isImaike ? IMAIKE_CTA : ONLINE_CTA;

  return (
    <footer>
      {/* ---- 申し込み ---- */}
      {/* オンライン側だけ写真背景+暗いレイヤーにする。今池は専用のマゼンタ地のまま */}
      <section id="contact" className="surface-violet section relative overflow-hidden">
        {!isImaike && (
          <>
            <Image
              src="/images/piano-plant.jpeg"
              alt=""
              fill
              sizes="100vw"
              className="object-cover object-[72%_60%]"
            />
            <div className="absolute inset-0 bg-ink/65" />
          </>
        )}
        <div className="container-page relative">
          <Reveal className="max-w-3xl">
            <SectionLabel tone="cyan">Contact</SectionLabel>
            <h2 className="heading mt-6 text-paper">
              {cta.heading[0]}
              {cta.heading[1] ? (
                <>
                  <br />
                  {cta.heading[1]}
                </>
              ) : null}
            </h2>
            <p className="lead measure mt-7">{cta.lead}</p>
          </Reveal>

          <Reveal delay={100} className="mt-9 flex flex-wrap items-center gap-x-8 gap-y-5">
            <a
              href={cta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-inverse"
            >
              {cta.button}
              <span className="btn-note text-violet">{cta.price}</span>
            </a>
            <p className="caption measure">{cta.note}</p>
          </Reveal>
        </div>
      </section>

      {/* ---- 探すための面 ---- */}
      <div className="border-t border-rule bg-paper py-14 md:py-16">
        <div className="container-page">
          <div className="flex flex-col gap-12 md:flex-row md:justify-between md:gap-16">
            <div>
              <Link href="/" aria-label="Hello Jazz Academy ホーム" className="inline-block">
                <Image
                  src="/images/logo.png"
                  alt="Hello Jazz Academy"
                  width={1532}
                  height={629}
                  className="h-10 w-auto"
                />
              </Link>
              <div className="mt-8">
                <p className="eyebrow eyebrow-faint">Follow</p>
                <SocialLinks size="w-7" gap="gap-4" className="mt-4" />
              </div>
            </div>

            <div className="flex flex-col gap-10 sm:flex-row sm:gap-16">
              {FOOTER_GROUPS.map((group) => (
                <nav key={group.label} aria-label={group.label} className="md:min-w-[13rem]">
                  <p className="eyebrow eyebrow-faint">{group.label}</p>
                  <ul className="mt-4">
                    {group.links.map((link) => (
                      <li key={link.href}>
                        {link.external ? (
                          <a
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block py-2 text-[0.8125rem] text-ink-soft transition-colors duration-200 hover:text-violet"
                          >
                            {link.label}
                          </a>
                        ) : (
                          <Link
                            href={link.href}
                            className="block py-2 text-[0.8125rem] text-ink-soft transition-colors duration-200 hover:text-violet"
                          >
                            {link.label}
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              ))}
            </div>
          </div>

          <p className="caption mt-14 border-t border-rule pt-7">© 2026 Hello Jazz Academy</p>
        </div>
      </div>
    </footer>
  );
}
