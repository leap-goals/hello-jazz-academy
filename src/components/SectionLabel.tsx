/**
 * セクション見出しの欧文ラベル。全ページで同じ組みを使う。
 *
 * tone はページの主版に合わせて使い分ける:
 *   violet/cyan … トップ(オンラインレッスン)
 *   magenta      … 今池の対面レッスン
 */
export default function SectionLabel({
  children,
  tone = "violet",
}: {
  children: string;
  tone?: "violet" | "cyan" | "magenta" | "yellow";
}) {
  const color = {
    violet: "text-violet",
    cyan: "text-cyan",
    magenta: "text-magenta",
    yellow: "text-brand-yellow",
  }[tone];

  return (
    <p className={`flex items-center gap-3 font-en text-xs tracking-[0.28em] md:text-sm ${color}`}>
      <span className="h-px w-8 bg-current" />
      {children}
    </p>
  );
}
