import { INSTAGRAM_ICON, LINE_ICON, TIKTOK_ICON, YOUTUBE_ICON } from "@/components/snsIconData";

/*
 * SNSの公式アイコン画像。
 *
 * サイト本体は色数を絞って組んでいるが、SNSアイコンだけは各社の公式画像を
 * そのまま置く。見慣れた見た目のほうが速く見つかるため、ここだけ意図的に外している。
 *
 * 画像はファイルではなくdata URIで持つ(理由と作り方は snsIconData.ts を参照)。
 * next/imageはURLを前提にした最適化・遅延読み込みのための部品なので、
 * 埋め込み済みのこれらには使わず素の<img>で置く。
 */

// 共有時に付く計測パラメータ(?si= / ?igsi= / ?_t= など)は落とし、素のURLで置く
export const SOCIAL_LINKS = [
  { name: "YouTube", href: "https://youtube.com/@hellojazzacademy", src: YOUTUBE_ICON },
  { name: "Instagram", href: "https://www.instagram.com/hellojazzacademy", src: INSTAGRAM_ICON },
  { name: "TikTok", href: "https://www.tiktok.com/@hellojazzacademy", src: TIKTOK_ICON },
  { name: "LINE", href: "https://lin.ee/XbPZKgA", src: LINE_ICON },
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
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={src}
              alt=""
              width={96}
              height={96}
              className={`${size} shrink-0 rounded-full`}
            />
          </a>
        </li>
      ))}
    </ul>
  );
}
