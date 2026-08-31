/**
 * セクションの頭に置く欧文ラベル。
 *
 * 段組みのどこから新しい話が始まるかを示すためだけのもので、読ませる文字ではない。
 * 大きさ・太さ・字送りは globals.css の .eyebrow に固定してあり、
 * ここで変えられるのは色(=いまどのページにいるか)だけにしている。
 *   violet  … トップ(オンラインレッスン)
 *   magenta … 今池の対面レッスン
 *   cyan    … 暗い面の上。白地では薄すぎて読めないため、そこ以外では使わない
 *   faint   … 主張させたくない補助的な見出し
 */
export default function SectionLabel({
  children,
  tone = "violet",
  className = "",
}: {
  children: string;
  tone?: "violet" | "magenta" | "cyan" | "faint";
  className?: string;
}) {
  const toneClass = {
    violet: "",
    magenta: "eyebrow-magenta",
    cyan: "eyebrow-cyan",
    faint: "eyebrow-faint",
  }[tone];

  return <p className={`eyebrow ${toneClass} ${className}`}>{children}</p>;
}
