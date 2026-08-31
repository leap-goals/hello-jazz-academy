/*
 * リソグラフ調のフラットイラスト。
 *
 * 新デザインは色数を絞った版面が基本だが、レコード・メトロノーム・五線の3点だけは
 * 「らしさ」を保つためにあえて残している。旧デザイン(リソグラフ調4色刷り)からの
 * 引き継ぎなので、色はサイト全体のトークンに縛らずこのファイル内で持つ。
 */

const INK = "#1d1522";
const PAPER = "#f4f0e2";
const MAGENTA = "#e21bd5";
const VIOLET = "#6618d5";
const YELLOW_SOFT = "#fceb95";

type IllustProps = {
  className?: string;
};

/** レコード。回転アニメーションは呼び出し側で `animate-spin-slow` を渡して掛ける */
export function Record({ className = "" }: IllustProps) {
  return (
    <svg viewBox="0 0 120 120" aria-hidden="true" className={className}>
      <circle cx="60" cy="60" r="58" fill={INK} />
      {[50, 44, 38, 32].map((r) => (
        <circle key={r} cx="60" cy="60" r={r} fill="none" stroke={PAPER} strokeOpacity="0.16" />
      ))}
      {/* 盤面の照り返し。1本の太い弧だけで艶を示す */}
      <path
        d="M16 38A50 50 0 0 1 62 10"
        fill="none"
        stroke={PAPER}
        strokeOpacity="0.22"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <circle cx="60" cy="60" r="24" fill={MAGENTA} />
      <path d="M60 36a24 24 0 0 1 0 48z" fill={VIOLET} />
      <circle cx="60" cy="60" r="24" fill="none" stroke={INK} strokeOpacity="0.35" />
      <circle cx="60" cy="60" r="4" fill={PAPER} />
    </svg>
  );
}

/** メトロノーム。振り子は呼び出し側でアニメーションさせない前提の静止画 */
export function Metronome({ className = "" }: IllustProps) {
  return (
    <svg viewBox="0 0 116 148" aria-hidden="true" className={className}>
      <path d="M58 6l40 126H18z" fill={YELLOW_SOFT} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <rect x="10" y="130" width="96" height="12" rx="3" fill={INK} />
      <rect x="45" y="46" width="26" height="80" fill={PAPER} stroke={INK} strokeWidth="2.5" />
      {/* 振り子。回転の軸は台座の支点(58,124)に合わせる */}
      <g
        className="motion-safe:animate-[pendulum_2200ms_ease-in-out_infinite]"
        style={{ transformBox: "view-box", transformOrigin: "58px 124px" }}
      >
        <line x1="58" y1="124" x2="64" y2="22" stroke={INK} strokeWidth="4" strokeLinecap="round" />
        <rect x="54" y="52" width="18" height="12" rx="2" fill={MAGENTA} stroke={INK} strokeWidth="2.5" />
      </g>
      <circle cx="58" cy="124" r="5" fill={INK} />
    </svg>
  );
}

/** 五線。暗い面(currentColorで淡く)に敷いて、印刷物としての気配を添える */
export function StaffLine({ className = "" }: IllustProps) {
  return (
    <svg viewBox="0 0 600 80" preserveAspectRatio="none" aria-hidden="true" className={className}>
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="0"
          x2="600"
          y1={20 + i * 10}
          y2={20 + i * 10}
          stroke="currentColor"
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}
