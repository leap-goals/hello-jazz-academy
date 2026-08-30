"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Reveal from "@/components/Reveal";
import FloatingIllust from "@/components/FloatingIllust";
import { CHORD_TOOL_PATH, IMAIKE_PATH } from "@/components/SiteHeader";
import { Curve, Equalizer, Headphones, Microphone, SingleNote } from "@/components/Illustrations";

// サイトマップは全ページ共通。トップ内のアンカーは下層からも辿れるよう絶対パスで書く
const FOOTER_LINKS = [
  { href: "/#lesson", label: "レッスンについて", en: "LESSON" },
  { href: "/#teacher", label: "講師紹介", en: "INSTRUCTOR" },
  { href: "/#price", label: "料金", en: "PRICE" },
  { href: "/#flow", label: "入会までの流れ", en: "FLOW" },
  { href: "/#faq", label: "受講のご案内", en: "FAQ" },
  { href: IMAIKE_PATH, label: "今池での対面レッスン", en: "IN PERSON" },
  { href: "/#access", label: "アクセス", en: "ACCESS" },
  { href: CHORD_TOOL_PATH, label: "コード・スケール分析ツール", en: "CHORD TOOL", external: true },
  { href: "/privacypolicy/", label: "プライバシーポリシー", en: "PRIVACY" },
];

const MAIL = "info@hellojazzacademy.com";

// 締めのCTAだけは、いま見ているページで売っているものに合わせて差し替える
const ONLINE_CTA = {
  heading: ["はじめの一音を、", "いっしょに鳴らしませんか。"],
  lead: "30分の体験レッスンでは、レッスンの雰囲気の確認はもちろん、いま弾けること・弾きたい曲・お悩みをお聞かせください。楽器がなくても構いません。",
  button: "体験レッスンに申し込む",
  price: "30min ¥1,500",
  href: `mailto:${MAIL}?subject=${encodeURIComponent("体験レッスンのお申し込み")}`,
  note: ["レッスンはZoomまたはFaceTime。", "お支払いはSquare請求書にて承ります。"],
};

const IMAIKE_CTA = {
  heading: ["月に一度の60分を、", "いっしょに使いませんか。"],
  lead: "ご希望の月と時間帯、いま弾ける曲や学びたいことを添えてご連絡ください。開催日と会場の詳しい場所をご案内します。受講経験のある方は、LINEからでも承ります。",
  button: "レッスンを申し込む",
  price: "60min ¥10,000",
  href: `mailto:${MAIL}?subject=${encodeURIComponent("今池 対面レッスンのお申し込み")}`,
  note: ["今池駅より徒歩3分、グランドピアノ完備のスタジオ。", "お支払いはクレジットカード決済のみとなります。"],
};

export default function SiteFooter() {
  const isImaike = usePathname().startsWith(IMAIKE_PATH.replace(/\/$/, ""));
  const cta = isImaike ? IMAIKE_CTA : ONLINE_CTA;

  return (
    <footer id="contact" className="relative">
      {/* 紙からインクの面へ切り替わる境目 */}
      <Curve className="block h-14 w-full text-violet-deep md:h-20" />

      <div className="relative overflow-hidden bg-violet-deep px-4 pb-14 pt-4 text-paper md:px-8 md:pb-16">
        <FloatingIllust
          className="-right-10 top-14 w-36 opacity-90 md:right-10 md:w-48"
          speed={0.18}
          rotate={-8}
          driftMs={8200}
        >
          <Microphone className="w-full" />
        </FloatingIllust>
        <FloatingIllust
          className="-left-8 bottom-24 hidden w-40 opacity-90 md:block"
          speed={0.1}
          rotate={12}
          driftMs={9000}
          driftDelayMs={700}
        >
          <Headphones className="w-full" />
        </FloatingIllust>

        <div className="relative mx-auto max-w-6xl">
          {/* CTA */}
          <div className="border-b border-paper/25 pb-12 md:pb-16">
            <Reveal>
              <p className="font-en text-xs tracking-[0.28em] text-cyan md:text-sm">CONTACT</p>
              <h2 className="mt-5 font-display text-[1.7rem] font-bold leading-[1.7] text-paper md:text-4xl md:leading-[1.7]">
                {cta.heading[0]}
                <br />
                {cta.heading[1]}
              </h2>
              <p className="mt-6 max-w-xl font-body text-sm leading-8 text-paper/75 md:text-base">
                {cta.lead}
              </p>
            </Reveal>

            <Reveal delay={140} className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center">
              <a
                href={cta.href}
                className="group inline-flex items-center justify-between gap-6 rounded-full bg-paper px-8 py-4 text-ink transition-transform duration-300 ease-out hover:-translate-y-1"
              >
                <span className="font-display text-base font-bold">{cta.button}</span>
                <span className="font-en text-sm text-violet">{cta.price}</span>
              </a>
              <a
                href={cta.href}
                className="font-en text-sm tracking-[0.14em] text-paper/80 underline decoration-cyan/60 underline-offset-[6px] transition-opacity duration-200 hover:opacity-60"
              >
                {MAIL}
              </a>
            </Reveal>
          </div>

          {/* サイトマップ */}
          <div className="mt-12 grid gap-10 md:grid-cols-[1.4fr_1fr] md:gap-16">
            <ul>
              {FOOTER_LINKS.map((link, i) => {
                const linkClassName =
                  "group flex items-baseline gap-4 py-3 transition-opacity duration-200 hover:opacity-60";
                const linkContent = (
                  <>
                    <span className="font-en text-sm tracking-[0.2em] text-paper">{link.en}</span>
                    <span className="font-body text-xs text-paper/65">{link.label}</span>
                    <Reveal
                      as="span"
                      variant="rule"
                      delay={i * 70}
                      className="ml-auto hidden h-px flex-1 bg-paper/30 sm:block"
                    >
                      {null}
                    </Reveal>
                    <span className="hidden h-1.5 w-1.5 rounded-full bg-cyan sm:block" />
                  </>
                );

                return (
                  <li key={link.href}>
                    {"external" in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClassName}>
                        {linkContent}
                      </a>
                    ) : (
                      <Link href={link.href} className={linkClassName}>
                        {linkContent}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div className="flex flex-col justify-between gap-8">
              <div className="flex items-center gap-3">
                <SingleNote className="w-8 shrink-0" />
                <p className="font-body text-xs leading-7 text-paper/70">
                  {cta.note[0]}
                  <br />
                  {cta.note[1]}
                </p>
              </div>
              <div>
                <p className="flex items-center gap-2 font-en text-sm tracking-[0.24em] text-paper">
                  <Equalizer className="text-cyan" />
                  HELLO JAZZ ACADEMY
                </p>
                <p className="mt-3 font-body text-xs text-paper/55">
                  © 2026 Hello Jazz Academy
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
