import Image from "next/image";

/*
 * SNSの公式アイコン画像。
 *
 * サイト本体は色数を絞って組んでいるが、SNSアイコンだけは各社の公式画像を
 * そのまま置く。見慣れた見た目のほうが速く見つかるため、ここだけ意図的に外している。
 *
 * 元画像は public/images/social/ 配下に円形(透過)へ加工済みのPNGとして置いてある
 * (生成スクリプトはコミットしていない。差し替える場合は中心から見て最も内側まで
 * 不透明な半径を測ってから円形マスクをかけること。特にInstagramは角丸四角の
 * squircleで、辺の中点で外周に接しているため、そのまま半径w/2でマスクしないと
 * 角が削れずに残る)。
 */

// 共有時に付く計測パラメータ(?si= / ?igsi= / ?_t= など)は落とし、素のURLで置く
export const SOCIAL_LINKS = [
  { name: "YouTube", href: "https://youtube.com/@hellojazzacademy", src: "/images/social/youtube.png" },
  { name: "Instagram", href: "https://www.instagram.com/hellojazzacademy", src: "/images/social/instagram.png" },
  { name: "TikTok", href: "https://www.tiktok.com/@hellojazzacademy", src: "/images/social/tiktok.png" },
  { name: "LINE", href: "https://lin.ee/XbPZKgA", src: "/images/social/line.png" },
] as const;

/** SNSへの導線。アイコンだけを並べる */
export default function SocialLinks({
  size = "w-6",
  gap = "gap-4",
  className = "",
}: {
  size?: string;
  gap?: string;
  className?: string;
}) {
  return (
    <ul className={`flex items-center ${gap} ${className}`}>
      {SOCIAL_LINKS.map(({ name, href, src }) => (
        <li key={name}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={name}
            className="block transition-opacity duration-200 hover:opacity-65"
          >
            <Image
              src={src}
              alt=""
              width={160}
              height={160}
              className={`${size} shrink-0 rounded-full`}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
