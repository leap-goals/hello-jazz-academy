"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialLinks from "@/components/SocialIcons";
import { BeamedNotes, Keyboard, Record } from "@/components/Illustrations";

/*
 * ページ内アンカーの中身はページごとに違うため、ナビはページ単位で持ち替える。
 * hrefはすべて絶対パス + ハッシュで書く。同一ページならその場でスクロールし、
 * 別ページならページ遷移してから該当セクションへ飛ぶ。
 *
 * 帯の組み方はIKEAのヘッダーに倣っている。
 *   - 上に細いインクの帯(補助情報とSNS)、下に紙の帯(ロゴと操作)の2段
 *   - スクロール位置で見え方を変えず、常に同じ場所に同じ形で出しておく
 *   - 操作は「主ボタン(申し込む)」と「副ボタン(メニュー)」の2つだけに絞り、
 *     どちらも文字ラベルを添えて何が起きるか読めるようにする
 */
export const IMAIKE_PATH = "/imaike_jazzpiano_lesson/";

// 別アプリ(vanilla JSの単体ツール)として public/tools/ に配置しているため、
// Next.jsのLinkによるソフトナビゲーションは使わずタブで開く
export const CHORD_TOOL_PATH = "/tools/chord-scale-analyzer";

// 今池の対面レッスンの申し込みはHubSpotのフォームで受ける
export const IMAIKE_FORM_URL = "https://share.hsforms.com/1loLPVQtPQ1-NgA-F8kpuWwdtnw5";

const HOME_NAV = [
  { href: "/#lesson", label: "レッスンについて", en: "LESSON" },
  { href: "/#teacher", label: "講師紹介", en: "INSTRUCTOR" },
  { href: "/#price", label: "料金", en: "PRICE" },
  { href: "/#flow", label: "入会までの流れ", en: "FLOW" },
  { href: "/#faq", label: "受講のご案内", en: "FAQ" },
  { href: IMAIKE_PATH, label: "今池の対面レッスン", en: "IN PERSON" },
  { href: "/#access", label: "アクセス", en: "ACCESS" },
  { href: CHORD_TOOL_PATH, label: "コード・スケール分析ツール", en: "CHORD TOOL", external: true },
  { href: "/#contact", label: "お問い合わせ", en: "CONTACT" },
];

const IMAIKE_NAV = [
  { href: `${IMAIKE_PATH}#point`, label: "レッスンの特徴", en: "POINT" },
  { href: `${IMAIKE_PATH}#teacher`, label: "講師紹介", en: "INSTRUCTOR" },
  { href: `${IMAIKE_PATH}#price`, label: "料金", en: "PRICE" },
  { href: `${IMAIKE_PATH}#policy`, label: "受講のご案内", en: "GUIDE" },
  { href: `${IMAIKE_PATH}#access`, label: "会場とスケジュール", en: "ACCESS" },
  { href: CHORD_TOOL_PATH, label: "コード・スケール分析ツール", en: "CHORD TOOL", external: true },
  { href: "/", label: "オンラインレッスン", en: "ONLINE" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const isImaike = usePathname().startsWith(IMAIKE_PATH.replace(/\/$/, ""));
  const navLinks = isImaike ? IMAIKE_NAV : HOME_NAV;

  // 今池は申し込みフォームが別サービスにあるので、CTAだけ外部リンクになる
  const cta = isImaike
    ? {
        short: "申し込む",
        label: "レッスンを申し込む",
        price: "60min ¥10,000",
        href: IMAIKE_FORM_URL,
        external: true,
      }
    : {
        short: "体験レッスン",
        label: "体験レッスンに申し込む",
        price: "30min ¥1,500",
        href: "/#contact",
        external: false,
      };

  // 全画面メニューを開いている間は背面をスクロールさせない
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const ctaContent = (
    <>
      <span className="md:hidden">{cta.short}</span>
      <span className="hidden md:inline">{cta.label}</span>
      <span className="hidden font-en text-xs font-medium text-paper/75 md:inline">{cta.price}</span>
    </>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        {/* 上段: 常設の細い帯。名乗りとSNSだけを置く */}
        <div className="bg-ink">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 md:px-8">
            <p className="font-en text-[0.6rem] tracking-[0.18em] text-paper/70 md:text-xs md:tracking-[0.24em]">
              ONLINE JAZZ PIANO LESSON — NAGOYA
            </p>
            <SocialLinks size="w-[1.1rem] md:w-5" gap="gap-3.5 md:gap-4" />
          </div>
        </div>

        {/* 下段: ロゴと操作。紙と同じ地色に、境目の罫線だけを引く */}
        <div className="border-b border-rule bg-paper">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2.5 md:px-8 md:py-3">
            <Link href="/" className="flex items-center" onClick={() => setOpen(false)}>
              <Image
                src="/images/logo.png"
                alt="Hello Jazz Academy"
                width={459}
                height={246}
                priority
                className="h-8 w-auto md:h-10"
              />
            </Link>

            <div className="flex items-center gap-2 md:gap-3">
              {cta.external ? (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm text-sm md:text-[0.95rem]"
                >
                  {ctaContent}
                </a>
              ) : (
                <Link
                  href={cta.href}
                  onClick={() => setOpen(false)}
                  className="btn btn-primary btn-sm text-sm md:text-[0.95rem]"
                >
                  {ctaContent}
                </Link>
              )}

              <button
                type="button"
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
                className="btn btn-secondary btn-sm text-sm md:text-[0.95rem]"
              >
                <span className="relative block h-3.5 w-5" aria-hidden="true">
                  <span
                    className={`absolute left-0 h-px w-full bg-ink transition-all duration-300 ease-out ${
                      open ? "top-1/2 rotate-45" : "top-0"
                    }`}
                  />
                  <span
                    className={`absolute left-0 top-1/2 h-px w-full bg-ink transition-opacity duration-200 ease-out ${
                      open ? "opacity-0" : "opacity-100"
                    }`}
                  />
                  <span
                    className={`absolute left-0 h-px w-full bg-ink transition-all duration-300 ease-out ${
                      open ? "top-1/2 -rotate-45" : "top-full"
                    }`}
                  />
                </span>
                {open ? "とじる" : "メニュー"}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 全画面メニュー。紙をめくって現れる面として扱い、ヘッダーの帯の下に潜らせる */}
      <div
        className={`fixed inset-0 z-40 overflow-hidden bg-paper transition-[opacity,visibility] duration-500 ease-out ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* 回転そのものはレコードに、登場の動きは外側のラッパーに持たせて transform を取り合わせない */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute -left-16 -top-12 w-48 transition-transform duration-[900ms] ease-out md:w-64 ${
            open ? "translate-y-0 scale-100" : "-translate-y-10 scale-90"
          }`}
        >
          <Record className="w-full motion-safe:animate-spin-slow" />
        </div>
        <Keyboard
          className={`pointer-events-none absolute -right-12 bottom-16 w-64 transition-transform duration-[900ms] ease-out md:w-96 ${
            open ? "translate-y-0 rotate-[-12deg]" : "translate-y-16 rotate-[8deg]"
          }`}
        />
        <BeamedNotes
          className={`pointer-events-none absolute bottom-24 left-8 w-16 transition-transform duration-[1100ms] ease-out md:w-24 ${
            open ? "translate-y-0 rotate-[10deg]" : "translate-y-12 rotate-[-20deg]"
          }`}
        />

        {/*
          イラストの上に紙をもう一枚かぶせる。イラストは気配として残しつつ、
          この面の主役である項目名とのコントラストを確保するための膜。
        */}
        <div className="pointer-events-none absolute inset-0 bg-paper/80" aria-hidden="true" />

        {/*
          中身は m-auto で中央に置く。justify-center だと項目数が画面に入り切らない
          ときに先頭がはみ出してスクロールでも届かなくなるため、autoマージンで寄せる。
        */}
        <nav className="relative flex h-full flex-col overflow-y-auto px-6 pb-10 pt-28 md:px-16 md:pt-32">
          <div className="m-auto w-full max-w-3xl">
            <ul className="w-full">
              {navLinks.map((link, i) => {
                const navItemClassName =
                  "flex items-baseline gap-4 py-3.5 transition-transform duration-[600ms] ease-out md:gap-8 md:py-5";
                const navItemStyle = {
                  transform: open ? "translateY(0)" : "translateY(110%)",
                  transitionDelay: open ? `${120 + i * 60}ms` : "0ms",
                };
                const navItemContent = (
                  <>
                    <span className="font-en text-xs tracking-[0.22em] text-violet md:text-sm">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-display text-2xl font-medium tracking-wide text-ink md:text-4xl">
                      {link.label}
                    </span>
                    <span className="ml-auto font-en text-xs tracking-[0.2em] text-ink-soft md:text-sm">
                      {link.en}
                    </span>
                  </>
                );

                return (
                  <li key={link.href} className="overflow-hidden border-b border-rule">
                    {"external" in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className={navItemClassName}
                        style={navItemStyle}
                      >
                        {navItemContent}
                      </a>
                    ) : (
                      <Link href={link.href} onClick={() => setOpen(false)} className={navItemClassName} style={navItemStyle}>
                        {navItemContent}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div
              className="mt-10 w-full transition-opacity duration-500"
              style={{ opacity: open ? 1 : 0, transitionDelay: open ? "520ms" : "0ms" }}
            >
              {cta.external ? (
                <a
                  href={cta.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="btn btn-primary text-base"
                >
                  {cta.label}
                  <span className="font-en text-sm font-medium text-paper/75">{cta.price}</span>
                </a>
              ) : (
                <Link href={cta.href} onClick={() => setOpen(false)} className="btn btn-primary text-base">
                  {cta.label}
                  <span className="font-en text-sm font-medium text-paper/75">{cta.price}</span>
                </Link>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-rule pt-7">
                <p className="font-en text-xs tracking-[0.2em] text-ink-soft">
                  HELLO JAZZ ACADEMY — {isImaike ? "IN PERSON, IMAIKE" : "ONLINE JAZZ PIANO"}
                </p>
                <SocialLinks size="w-6" gap="gap-4" className="ml-auto" />
              </div>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
