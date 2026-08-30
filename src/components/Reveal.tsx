"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** 立ち上がりの遅延(ms)。並んだ要素をずらして出すのに使う */
  delay?: number;
  /** 立ち上がる前に何px下げておくか */
  y?: number;
  /** 罫線用。フェードではなく左から線を引く動きになる */
  variant?: "fade" | "rule";
  as?: "div" | "section" | "li" | "p" | "span" | "h2" | "h3";
};

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 30,
  variant = "fade",
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    // IntersectionObserverが使えない/既に画面内にある場合も必ず表示状態へ倒す
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      // thresholdは0。ファーストビュー下端にかかった要素が
      // 「一部しか見えていない」という理由で出そびれないようにする。
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  const base = variant === "rule" ? "rule-draw" : "reveal";

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`${base} ${visible ? "is-visible" : ""} ${className}`}
      style={
        {
          "--reveal-delay": `${delay}ms`,
          "--reveal-y": `${y}px`,
        } as React.CSSProperties
      }
    >
      {children}
    </Tag>
  );
}
