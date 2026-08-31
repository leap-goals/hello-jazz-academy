"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SocialLinks from "@/components/SocialIcons";

/*
 * ページ内アンカーの中身はページごとに違うため、ナビはページ単位で持ち替える。
 * hrefはすべて絶対パス + ハッシュで書く。同一ページならその場でスクロールし、
 * 別ページならページ遷移してから該当セクションへ飛ぶ。
 *
 * ヘッダーはAppleのナビゲーションバーの作り方に倣う。
 *   - 面を持たない。最上部では紙にそのまま乗り、罫線も背景も出さない
 *   - スクロールしてはじめて、半透明+ぼかしの「材質」として立ち上がる。
 *     枠で囲うのではなく、下に髪の毛一本ぶんの罫線を引くだけ
 *   - 置くのはロゴ・申し込み・メニューの3つだけ
 */
export const IMAIKE_PATH = "/imaike_jazzpiano_lesson/";
export const NEWS_PATH = "/news/";
export const ABOUT_PATH = "/about/";

// 別アプリ(vanilla JSの単体ツール)として public/tools/ に配置しているため、
// Next.jsのLinkによるソフトナビゲーションは使わずタブで開く
export const CHORD_TOOL_PATH = "/tools/chord-scale-analyzer";

// 今池の対面レッスンの申し込みはHubSpotのフォームで受ける
export const IMAIKE_FORM_URL = "https://share.hsforms.com/1loLPVQtPQ1-NgA-F8kpuWwdtnw5";

// オンラインの体験レッスンの申し込みも同じくHubSpotのフォームで受ける
export const TRIAL_FORM_URL = "https://share-na2.hsforms.com/1S5stbn3TSFWNdjswTHg8Lwdtnw5";

type NavLink = { href: string; label: string; en: string; external?: boolean };

const HOME_NAV: NavLink[] = [
  { href: ABOUT_PATH, label: "教室について", en: "About" },
  { href: "/#lesson", label: "レッスンについて", en: "Lesson" },
  { href: "/#teacher", label: "講師紹介", en: "Instructor" },
  { href: "/#price", label: "料金", en: "Price" },
  { href: "/#flow", label: "入会までの流れ", en: "Flow" },
  { href: "/#faq", label: "受講のご案内", en: "Guide" },
  { href: IMAIKE_PATH, label: "今池の対面レッスン", en: "In person" },
  { href: "/#access", label: "アクセス", en: "Access" },
  { href: NEWS_PATH, label: "お知らせ", en: "News" },
  { href: CHORD_TOOL_PATH, label: "コード・スケール分析ツール", en: "Tool", external: true },
  { href: "/#contact", label: "お問い合わせ", en: "Contact" },
];

const IMAIKE_NAV: NavLink[] = [
  { href: `${IMAIKE_PATH}#point`, label: "レッスンの特徴", en: "Point" },
  { href: `${IMAIKE_PATH}#teacher`, label: "講師紹介", en: "Instructor" },
  { href: `${IMAIKE_PATH}#price`, label: "料金", en: "Price" },
  { href: `${IMAIKE_PATH}#policy`, label: "受講のご案内", en: "Guide" },
  { href: `${IMAIKE_PATH}#access`, label: "会場とスケジュール", en: "Access" },
  { href: ABOUT_PATH, label: "教室について", en: "About" },
  { href: NEWS_PATH, label: "お知らせ", en: "News" },
  { href: CHORD_TOOL_PATH, label: "コード・スケール分析ツール", en: "Tool", external: true },
  { href: "/", label: "オンラインレッスン", en: "Online" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isImaike = usePathname().startsWith(IMAIKE_PATH.replace(/\/$/, ""));
  const navLinks = isImaike ? IMAIKE_NAV : HOME_NAV;

  // ページごとに売っているものが違うので、申し込み先も文言も持ち替える
  const cta = isImaike
    ? {
        label: "レッスンを申し込む",
        price: "60min ¥10,000",
        href: IMAIKE_FORM_URL,
        className: "btn-magenta",
      }
    : {
        label: "体験レッスンに申し込む",
        price: "45min ¥3,000",
        href: TRIAL_FORM_URL,
        className: "btn-primary",
      };

  // 紙の上にいる間は何も出さない。動き出してはじめて材質を出す
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
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
      {/*
        面の出し方は3通り。
          メニューを開いている間 … 紙色でベタ塗り。項目が下を通り抜けても読めるようにする
          スクロール後          … 半透明+ぼかし。下の内容の気配だけを残す
          最上部               … 何も出さない
      */}
      <header
        className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ease-out ${
          open
            ? "border-transparent bg-paper"
            : scrolled
              ? "border-rule bg-paper/75 backdrop-blur-xl backdrop-saturate-150"
              : "border-transparent"
        }`}
      >
        <div className="container-page flex h-14 items-center justify-between gap-3 md:h-[4.5rem]">
          <Link
            href="/"
            aria-label="Hello Jazz Academy ホーム"
            className="shrink-0 transition-opacity duration-200 hover:opacity-70"
            onClick={() => setOpen(false)}
          >
            <Image
              src="/images/logo.png"
              alt="Hello Jazz Academy"
              width={1532}
              height={629}
              priority
              className="h-9 w-auto md:h-12"
            />
          </Link>

          {/*
            申し込みボタンはヒーロー・フッター・全画面メニューの3か所に既にあるため、
            常設のヘッダーはロゴとメニューの2つだけに絞る。
          */}
          <button
            type="button"
            aria-expanded={open}
            aria-label={open ? "メニューを閉じる" : "メニューを開く"}
            onClick={() => setOpen((v) => !v)}
            className="-mr-1 flex items-center gap-2.5 px-1 py-2 text-ink transition-opacity duration-200 hover:opacity-60"
          >
            {/* 3本線。開くと上下の2本が交差してばつ印になり、中央の1本は消える */}
            <span className="relative block h-3 w-[1.375rem]" aria-hidden="true">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ease-out ${
                  open ? "top-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current transition-opacity duration-200 ease-out ${
                  open ? "opacity-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all duration-300 ease-out ${
                  open ? "top-1/2 -rotate-45" : "top-full"
                }`}
              />
            </span>
            <span className="text-[0.8125rem] font-medium tracking-[0.06em]">
              {open ? "とじる" : "メニュー"}
            </span>
          </button>
        </div>
      </header>

      {/*
        全画面メニュー。装飾は置かず、罫線で仕切った索引として組む。
        項目名は本文より少し大きい程度に留め、数だけ並んでも威圧感が出ないようにする。
      */}
      <div
        id="site-menu"
        className={`fixed inset-0 z-40 overflow-y-auto bg-paper transition-[opacity,visibility] duration-300 ease-out ${
          open ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        <nav className="container-page flex min-h-full flex-col pb-12 pt-20 md:pb-16 md:pt-28">
          <div className="m-auto w-full max-w-2xl">
            <p className="eyebrow eyebrow-faint">Menu</p>

            <ul className="mt-6 border-t border-rule md:mt-8">
              {navLinks.map((link, i) => {
                const className =
                  "group flex items-center gap-4 border-b border-rule py-3 transition-colors duration-200 hover:text-violet md:py-4";
                const style = {
                  opacity: open ? 1 : 0,
                  transform: open ? "none" : "translateY(8px)",
                  transition: "opacity 420ms ease-out, transform 420ms ease-out",
                  transitionDelay: open ? `${80 + i * 35}ms` : "0ms",
                };
                const content = (
                  <>
                    <span className="text-[1.0625rem] font-medium leading-8 md:text-xl">
                      {link.label}
                    </span>
                    <span className="eyebrow eyebrow-faint ml-auto transition-colors duration-200 group-hover:text-violet">
                      {link.en}
                    </span>
                  </>
                );

                return (
                  <li key={link.href}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setOpen(false)}
                        className={className}
                        style={style}
                      >
                        {content}
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={className}
                        style={style}
                      >
                        {content}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>

            <div
              className="mt-9 flex flex-wrap items-center justify-between gap-6"
              style={{
                opacity: open ? 1 : 0,
                transition: "opacity 400ms ease-out",
                transitionDelay: open ? "380ms" : "0ms",
              }}
            >
              <a
                href={cta.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className={`btn ${cta.className}`}
              >
                {cta.label}
                <span className="btn-note">{cta.price}</span>
              </a>
              <SocialLinks size="w-6" gap="gap-4" />
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
