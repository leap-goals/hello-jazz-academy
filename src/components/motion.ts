/**
 * ヒーローの読み込みアニメーション(.rise)の遅延を渡す。
 *
 * 折り返し地点より上は、スクロール監視(Reveal)ではなくCSSアニメーションで出す。
 * JSの実行を待たないので、ハイドレーションが遅れても見出しが消えたままにならない。
 * 遅延は上の要素から70msずつ程度に留め、1秒かからず読み終えられる状態にする。
 */
export function riseDelay(ms: number): React.CSSProperties {
  return { "--rise-delay": `${ms}ms` } as React.CSSProperties;
}
