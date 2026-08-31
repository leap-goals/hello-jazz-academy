"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import SocialLinks from "@/components/SocialIcons";
import {
  CHORD_TOOL_PATH,
  IMAIKE_FORM_URL,
  IMAIKE_PATH,
  NEWS_PATH,
  TRIAL_FORM_URL,
} from "@/components/SiteHeader";

/*
 * 締めは2段に分ける。
 *   上 … 申し込みの一言だけを、色の面いっぱいに置く。ページで最後に見る色がこれになる
 *   下 … サイトマップ・SNS・著作権表示。小さな文字と罫線だけの、探すための面
 * 濃い面を続けて2つ置かないことで、上段のCTAだけが立つ。
 */

// サイトマップは全ページ共通。トップ内のアンカーは下層からも辿れるよう絶対パスで書く
const FOOTER_LINKS = [
  { href: "/#lesson", label: "レッスンについて" },
  { href: "/#teacher", label: "講師紹介" },
  { href: "/#price", label: "料金" },
  { href: "/#flow", label: "入会までの流れ" },
  { href: "/#faq", label: "受講のご案内" },
  { href: IMAIKE_PATH, label: "今池での対面レッスン" },
  { href: "/#access", label: "アクセス" },
  { href: NEWS_PATH, label: "お知らせ" },
  { href: CHORD_TOOL_PATH, label: "コード・スケール分析ツール", external: true },
  { href: "/privacypolicy/", label: "プライバシーポリシー" },
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
  heading: ["月に一度の60分を、", "いっしょに使いませんか。"],
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
      <section id="contact" className="surface-violet section">
        <div className="container-page">
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

            <nav aria-label="サイトマップ" className="md:min-w-[20rem]">
              <p className="eyebrow eyebrow-faint">Sitemap</p>
              {/* 縦に読ませたいので、行送りではなく列送りで流す(左の段を上から下、次に右の段) */}
              <ul className="mt-4 grid gap-x-10 sm:grid-flow-col sm:grid-rows-5">
                {FOOTER_LINKS.map((link) => (
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
          </div>

          <p className="caption mt-14 border-t border-rule pt-7">© 2026 Hello Jazz Academy</p>
        </div>
      </div>
    </footer>
  );
}
