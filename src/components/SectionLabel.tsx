/**
 * セクションの頭に置く欧文ラベル。
 *
 * 段組みのどこから新しい話が始まるかを示すためだけのもので、読ませる文字ではない。
 * 大きさ・太さ・字送りは globals.css の .eyebrow に固定してあり、
 * ここで変えられるのは色(=いまどのページにいるか)だけにしている。
 *   violet       … 白地の上(トップ・今池とも)
 *   violet-light … 暗い面の上。violetのままでは沈むので薄い側へ振る
 *   magenta      … ロゴ由来の第2版。現在どのページでも使っていない
 *   cyan         … 暗い面の上。白地では薄すぎて読めないため、そこ以外では使わない
 *   faint        … 主張させたくない補助的な見出し
 */
export default function SectionLabel({
  children,
  tone = "violet",
  className = "",
}: {
  children: string;
  tone?: "violet" | "violet-light" | "magenta" | "cyan" | "faint";
  className?: string;
}) {
  const toneClass = {
    violet: "",
    "violet-light": "eyebrow-violet-light",
    magenta: "eyebrow-magenta",
    cyan: "eyebrow-cyan",
    faint: "eyebrow-faint",
  }[tone];

  return <p className={`eyebrow ${toneClass} ${className}`}>{children}</p>;
}
