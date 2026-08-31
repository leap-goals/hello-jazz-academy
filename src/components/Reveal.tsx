"use client";

import { useEffect, useRef, useState } from "react";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** 立ち上がりの遅延(ms)。並んだ要素をわずかにずらすためだけに使う */
  delay?: number;
  as?: "div" | "section" | "article" | "li" | "p" | "ul" | "ol" | "dl";
};

/**
 * スクロールで一度だけ立ち上げる。
 * 動きの量と速さはCSS側(.reveal)に固定してあり、ここでは遅延しか変えられない。
 * 場所ごとに違う動きをさせないことが、そのまま画面の落ち着きになる。
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;

    // thresholdは0。ファーストビュー下端にかかった要素が
    // 「一部しか見えていない」という理由で出そびれないようにする。
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
