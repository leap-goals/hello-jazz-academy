"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BeamedNotes, Equalizer, Keyboard, Record } from "@/components/Illustrations";

/*
 * ページ内アンカーの中身はページごとに違うため、ナビはページ単位で持ち替える。
 * hrefはすべて絶対パス + ハッシュで書く。同一ページならその場でスクロールし、
 * 別ページならページ遷移してから該当セクションへ飛ぶ。
 */
export const IMAIKE_PATH = "/imaike_jazzpiano_lesson/";

// 別アプリ(vanilla JSの単体ツール)として public/tools/ に配置しているため、
// Next.jsのLinkによるソフトナビゲーションは使わずタブで開く
export const CHORD_TOOL_PATH = "/tools/chord-scale-analyzer";

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
  const [scrolled, setScrolled] = useState(false);
  const isImaike = usePathname().startsWith(IMAIKE_PATH.replace(/\/$/, ""));
  const navLinks = isImaike ? IMAIKE_NAV : HOME_NAV;
  const cta = isImaike
    ? {
        en: "BOOK A LESSON",
        label: "レッスンを申し込む",
        price: "60min ¥10,000",
        href: `${IMAIKE_PATH}#contact`,
      }
    : { en: "TRIAL LESSON", label: "体験レッスンに申し込む", price: "30min ¥1,500", href: "/#contact" };

  // ヒーローの上では紙の地に溶かし、スクロール後だけ帯として立ち上げる
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ease-out ${
          scrolled && !open ? "border-b border-rule bg-paper" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8 md:py-4">
          <Link href="/" className="relative z-10 flex items-center" onClick={() => setOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="Hello Jazz Academy"
              width={459}
              height={246}
              priority
              className="h-9 w-auto md:h-11"
            />
          </Link>

          <div className="flex items-center gap-3 md:gap-5">
            <Link
              href={cta.href}
              className="hidden items-center gap-2 border-b border-ink pb-1 font-en text-sm tracking-[0.18em] text-ink transition-opacity duration-200 hover:opacity-55 md:inline-flex"
            >
              <Equalizer className="text-magenta" />
              {cta.en}
            </Link>

            <button
              type="button"
              aria-label={open ? "メニューを閉じる" : "メニューを開く"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-ink transition-transform duration-300 ease-out hover:scale-105 md:h-14 md:w-14"
            >
              <span className="relative block h-4 w-6">
                <span
                  className={`absolute left-0 h-px w-full bg-paper transition-all duration-300 ease-out ${
                    open ? "top-1/2 rotate-45" : "top-0"
                  }`}
                />
                <span
                  className={`absolute left-0 top-1/2 h-px w-full bg-paper transition-opacity duration-200 ease-out ${
                    open ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute left-0 h-px w-full bg-paper transition-all duration-300 ease-out ${
                    open ? "top-1/2 -rotate-45" : "top-full"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 全画面メニュー。紙をめくって現れる面として扱う */}
      <div
        className={`fixed inset-0 z-40 overflow-hidden bg-paper transition-[opacity,visibility] duration-500 ease-out ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <div className="paper-rule absolute inset-0 opacity-60" aria-hidden="true" />

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

        <nav className="relative flex h-full flex-col justify-center px-6 md:px-16">
          <ul className="mx-auto w-full max-w-3xl">
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
            className="mx-auto mt-10 w-full max-w-3xl transition-opacity duration-500"
            style={{ opacity: open ? 1 : 0, transitionDelay: open ? "520ms" : "0ms" }}
          >
            <Link
              href={cta.href}
              onClick={() => setOpen(false)}
              className="inline-flex items-center gap-3 rounded-full bg-magenta px-7 py-3.5 text-paper transition-opacity duration-200 hover:opacity-85"
            >
              <span className="font-display text-base font-bold">{cta.label}</span>
              <span className="font-en text-sm opacity-80">{cta.price}</span>
            </Link>
            <p className="mt-6 font-en text-xs tracking-[0.2em] text-ink-soft">
              HELLO JAZZ ACADEMY — {isImaike ? "IN PERSON, IMAIKE" : "ONLINE JAZZ PIANO"}
            </p>
          </div>
        </nav>
      </div>
    </>
  );
}
