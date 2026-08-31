"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import SectionLabel from "@/components/SectionLabel";

export type TickerPost = { slug: string; title: string; date: string };

// src/lib/news.tsのformatNewsDateと同じ整形だが、node:fsを使うserver専用モジュールを
// クライアントコンポーネントからimportするとTurbopackがバンドルに失敗するためここに複製する
function formatNewsDate(isoLike: string): string {
  return isoLike.slice(0, 10).replaceAll("-", ".");
}

/*
 * 旧サイトにあった「お知らせ」ティッカー。トップのヒーロー内、CTAボタンの下に置く。
 * 1件を数秒表示し、下から上へ送って次の見出しに替える。
 */
const INTERVAL_MS = 4200;

export default function NewsTicker({ posts }: { posts: TickerPost[] }) {
  const [index, setIndex] = useState(0);
  const paused = useRef(false);

  useEffect(() => {
    if (posts.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = setInterval(() => {
      if (!paused.current) setIndex((i) => (i + 1) % posts.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [posts.length]);

  if (posts.length === 0) return null;

  return (
    <div
      className="flex items-center gap-4 border-t border-rule pt-5 md:gap-6"
      onMouseEnter={() => {
        paused.current = true;
      }}
      onMouseLeave={() => {
        paused.current = false;
      }}
    >
      <SectionLabel className="shrink-0">News</SectionLabel>
      <div className="relative h-10 flex-1 overflow-hidden">
        <ul
          className="absolute inset-x-0 top-0 transition-transform duration-500 ease-out"
          style={{ transform: `translateY(-${index * 100}%)` }}
        >
          {posts.map((post) => (
            <li key={post.slug} className="flex h-10 items-center">
              <Link
                href={`/news/${post.slug}/`}
                className="flex min-w-0 items-baseline gap-3 text-[0.8125rem] text-ink-soft transition-colors duration-200 hover:text-violet md:gap-4 md:text-sm"
              >
                <span className="figure shrink-0 text-ink-faint">
                  {formatNewsDate(post.date)}
                </span>
                <span className="truncate">{post.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
