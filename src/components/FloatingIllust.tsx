"use client";

import { useEffect, useRef } from "react";

type FloatingIllustProps = {
  children: React.ReactNode;
  /** 配置。絶対配置のためのTailwindクラスをそのまま渡す */
  className?: string;
  /** スクロール量に対する追従の強さ。0で固定、1で画面1つ分ずれる */
  speed?: number;
  /** 静止時の傾き(deg) */
  rotate?: number;
  /** ふわふわ上下する周期(ms)。0で無効 */
  driftMs?: number;
  driftDelayMs?: number;
};

/**
 * 紙面に散らしたイラスト1点分のラッパー。
 * 外側でスクロール追従(パララックス)、内側で傾きと上下のドリフトを担当し、
 * transformの取り合いが起きないよう役割を階層で分けている。
 */
export default function FloatingIllust({
  children,
  className = "",
  speed = 0.12,
  rotate = 0,
  driftMs = 7000,
  driftDelayMs = 0,
}: FloatingIllustProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || speed === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      // 画面中央を0とした進行度。上下に出るほど大きくずれる
      const progress = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      el.style.transform = `translate3d(0, ${(-progress * speed * 100).toFixed(2)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [speed]);

  return (
    <div ref={ref} aria-hidden="true" className={`pointer-events-none absolute ${className}`}>
      <div
        className={driftMs > 0 ? "motion-safe:animate-drift" : undefined}
        style={{ animationDuration: `${driftMs}ms`, animationDelay: `${driftDelayMs}ms` }}
      >
        <div style={{ transform: `rotate(${rotate}deg)` }}>{children}</div>
      </div>
    </div>
  );
}
