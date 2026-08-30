"use client";

import { useId } from "react";

/*
 * SNSの公式ロゴ。
 *
 * サイト本体は「ロゴ由来の4版だけで刷る」というルールで作っているが、
 * SNSアイコンは各社のブランド色そのままで置く。見慣れた色のほうが速く見つかるため、
 * ここだけは意図的にリソの版から外している。
 *
 * Instagramはグラデーションを使うのでSVG内にdefsを持つ。
 * 同じページに複数置いてもid衝突しないよう、useIdで実体ごとに振り直す。
 */

// 共有時に付く計測パラメータ(?si= / ?igsi= / ?_t= など)は落とし、素のURLで置く
export const SOCIAL_LINKS = [
  { name: "YouTube", href: "https://youtube.com/@hellojazzacademy", Icon: YouTubeIcon },
  { name: "Instagram", href: "https://www.instagram.com/hellojazzacademy", Icon: InstagramIcon },
  { name: "TikTok", href: "https://www.tiktok.com/@hellojazzacademy", Icon: TikTokIcon },
  { name: "LINE", href: "https://lin.ee/XbPZKgA", Icon: LineIcon },
] as const;

type IconProps = { className?: string };

export function YouTubeIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        fill="#FF0000"
        d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 3.9 12 3.9 12 3.9s-7.5 0-9.4.5A3 3 0 0 0 .5 6.5 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.5Z"
      />
      <path fill="#fff" d="M9.6 15.6 15.8 12 9.6 8.4Z" />
    </svg>
  );
}

export function InstagramIcon({ className = "" }: IconProps) {
  // url(#…) から参照するため、useIdのブラケット類は落として英数字だけにする
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const warm = `ig-warm-${uid}`;
  const cool = `ig-cool-${uid}`;

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <defs>
        {/* 左下から黄→橙→紫。公式のグラデーションの向きに合わせる */}
        <radialGradient id={warm} cx="0.28" cy="1.05" r="1.15">
          <stop offset="0.05" stopColor="#FFDD55" />
          <stop offset="0.28" stopColor="#FF902F" />
          <stop offset="0.6" stopColor="#F0446F" />
          <stop offset="1" stopColor="#C837AB" />
        </radialGradient>
        {/* 左上に差す青を重ねる */}
        <radialGradient id={cool} cx="0.1" cy="-0.05" r="0.9">
          <stop offset="0" stopColor="#3771C8" />
          <stop offset="1" stopColor="#3771C8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="24" height="24" rx="6.4" fill={`url(#${warm})`} />
      <rect width="24" height="24" rx="6.4" fill={`url(#${cool})`} />
      <rect
        x="5"
        y="5"
        width="14"
        height="14"
        rx="4.2"
        fill="none"
        stroke="#fff"
        strokeWidth="1.7"
      />
      <circle cx="12" cy="12" r="3.4" fill="none" stroke="#fff" strokeWidth="1.7" />
      <circle cx="16.7" cy="7.3" r="1.05" fill="#fff" />
    </svg>
  );
}

export function TikTokIcon({ className = "" }: IconProps) {
  // 同じ字形を3枚、少しずつずらして刷り重ねる(シアン→ピンク→黒)
  const glyph =
    "M16.7 5.9A4.3 4.3 0 0 1 15.6 3h-3.1v12.4a2.6 2.6 0 1 1-1.8-2.5V9.7a5.7 5.7 0 0 0-.8-.1 5.7 5.7 0 1 0 5.7 5.7V8.9a7.3 7.3 0 0 0 4.3 1.4V7.2a4.3 4.3 0 0 1-3.2-1.3Z";

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path d={glyph} fill="#25F4EE" transform="translate(-1 -0.9)" />
      <path d={glyph} fill="#FE2C55" transform="translate(1 0.9)" />
      <path d={glyph} fill="#111014" />
    </svg>
  );
}

export function LineIcon({ className = "" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <rect width="24" height="24" rx="6.4" fill="#06C755" />
      {/*
        吹き出しは円ではなく、上下が平らな横長のスタジアム形。
        丸くするとiMessageに見えてしまうので、ここでLINEらしさが決まる。
        しっぽは左下に別パスで足し、白同士を重ねて一体に見せる。
      */}
      <rect x="3.4" y="4.7" width="17.2" height="10.8" rx="5.4" fill="#fff" />
      <path d="M9 14.8h3.4L9.4 19.2Z" fill="#fff" />
    </svg>
  );
}

/**
 * SNSへの導線。アイコンだけを並べる置き方が基本で、
 * `withLabels` を立てるとサービス名を添えた縦並びになる(フッター用)。
 */
export default function SocialLinks({
  size = "w-5",
  gap = "gap-4",
  withLabels = false,
  labelClassName = "",
  className = "",
}: {
  size?: string;
  gap?: string;
  withLabels?: boolean;
  labelClassName?: string;
  className?: string;
}) {
  return (
    <ul className={`flex items-center ${withLabels ? "flex-col items-start" : ""} ${gap} ${className}`}>
      {SOCIAL_LINKS.map(({ name, href, Icon }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="flex items-center gap-3 transition-opacity duration-200 hover:opacity-70"
          >
            <Icon className={`${size} shrink-0`} />
            {withLabels ? (
              <span className={`font-en text-sm tracking-[0.18em] ${labelClassName}`}>{name}</span>
            ) : null}
          </a>
        </li>
      ))}
    </ul>
  );
}
