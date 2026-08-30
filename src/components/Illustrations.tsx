/*
 * リソグラフ調のフラットイラスト集。
 *
 * ルール:
 *  - 版はロゴ由来の4色 + 紙 + 黒インクのみ。中間色やグラデーションは作らない。
 *  - 面は淡刷り(-soft)、輪郭と細部は黒インク。刷り版が1枚ずつ重なった見え方にする。
 *  - 粒状のテクスチャは各SVGに持たせず、画面全面の .paper-grain に一任する。
 */

const INK = "#1d1522";
const PAPER = "#f4f0e2";
const MAGENTA = "#e21bd5";
const VIOLET = "#6618d5";
const CYAN = "#72dafe";
const YELLOW = "#fadc46";
const MAGENTA_SOFT = "#f3a8ea";
const VIOLET_SOFT = "#b9a1ea";
const CYAN_SOFT = "#b6e9ff";
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

/** 鍵盤。白鍵8つ + 黒鍵5つの1オクターブ分 */
export function Keyboard({ className = "" }: IllustProps) {
  const whiteKeys = [0, 1, 2, 3, 4, 5, 6, 7];
  const blackKeys = [25, 50, 100, 125, 150];
  return (
    <svg viewBox="0 0 200 112" aria-hidden="true" className={className}>
      <rect x="0" y="0" width="200" height="16" rx="3" fill={VIOLET} />
      {whiteKeys.map((i) => (
        <rect
          key={i}
          x={i * 25}
          y="16"
          width="25"
          height="88"
          fill={PAPER}
          stroke={INK}
          strokeWidth="2.5"
        />
      ))}
      {blackKeys.map((x) => (
        <rect key={x} x={x - 8} y="16" width="16" height="52" rx="2" fill={INK} />
      ))}
      <rect x="0" y="104" width="200" height="8" rx="2" fill={INK} />
    </svg>
  );
}

/** 連桁でつないだ8分音符2つ */
export function BeamedNotes({ className = "" }: IllustProps) {
  return (
    <svg viewBox="0 0 104 112" aria-hidden="true" className={className}>
      <polygon points="35,8 92,20 92,34 35,22" fill={INK} />
      <rect x="35" y="14" width="6" height="72" fill={INK} />
      <rect x="86" y="24" width="6" height="68" fill={INK} />
      <ellipse cx="22" cy="86" rx="17" ry="12.5" fill={MAGENTA} transform="rotate(-18 22 86)" />
      <ellipse cx="73" cy="92" rx="17" ry="12.5" fill={VIOLET} transform="rotate(-18 73 92)" />
    </svg>
  );
}

/** 旗つきの8分音符1つ */
export function SingleNote({ className = "", color = CYAN }: IllustProps & { color?: string }) {
  return (
    <svg viewBox="0 0 76 112" aria-hidden="true" className={className}>
      <rect x="38" y="12" width="6" height="76" fill={INK} />
      <path d="M44 14c16 8 22 18 20 34 6-18-2-30-20-40z" fill={INK} />
      <ellipse cx="25" cy="88" rx="17" ry="12.5" fill={color} transform="rotate(-18 25 88)" />
    </svg>
  );
}

/** 楽譜。奥に1枚、手前に1枚。五線と音符が刷ってある */
export function SheetMusic({ className = "" }: IllustProps) {
  const staff = (y: number) => (
    <g key={y}>
      {[0, 1, 2, 3, 4].map((i) => (
        <line
          key={i}
          x1="14"
          x2="90"
          y1={y + i * 7}
          y2={y + i * 7}
          stroke={INK}
          strokeOpacity="0.4"
          strokeWidth="1.5"
        />
      ))}
    </g>
  );
  return (
    <svg viewBox="0 0 140 164" aria-hidden="true" className={className}>
      <g transform="rotate(-9 70 82)">
        <rect x="14" y="16" width="104" height="132" fill={CYAN_SOFT} stroke={INK} strokeWidth="2.5" />
      </g>
      <g transform="rotate(5 70 82)">
        <rect x="10" y="10" width="104" height="132" fill={PAPER} stroke={INK} strokeWidth="2.5" />
        <g transform="translate(0 12)">
          {staff(24)}
          {staff(72)}
          {staff(120)}
        </g>
        <ellipse cx="34" cy="49" rx="6" ry="4.5" fill={MAGENTA} transform="rotate(-18 34 49)" />
        <ellipse cx="56" cy="42" rx="6" ry="4.5" fill={INK} transform="rotate(-18 56 42)" />
        <ellipse cx="78" cy="56" rx="6" ry="4.5" fill={VIOLET} transform="rotate(-18 78 56)" />
        <ellipse cx="44" cy="97" rx="6" ry="4.5" fill={INK} transform="rotate(-18 44 97)" />
        <ellipse cx="70" cy="104" rx="6" ry="4.5" fill={YELLOW} transform="rotate(-18 70 104)" />
      </g>
    </svg>
  );
}

/** ヴィンテージのリボンマイク */
/** ヘッドホン */
export function Headphones({ className = "" }: IllustProps) {
  return (
    <svg viewBox="0 0 132 122" aria-hidden="true" className={className}>
      <path
        d="M20 84V64a46 46 0 0 1 92 0v20"
        fill="none"
        stroke={INK}
        strokeWidth="11"
        strokeLinecap="round"
      />
      <rect x="4" y="66" width="34" height="50" rx="16" fill={MAGENTA_SOFT} stroke={INK} strokeWidth="3" />
      <rect x="94" y="66" width="34" height="50" rx="16" fill={MAGENTA_SOFT} stroke={INK} strokeWidth="3" />
      <rect x="12" y="76" width="18" height="30" rx="9" fill={MAGENTA} />
      <rect x="102" y="76" width="18" height="30" rx="9" fill={MAGENTA} />
    </svg>
  );
}

/** DTM: ノートPCの画面にDAWのトラックが並んでいる */
export function Laptop({ className = "" }: IllustProps) {
  const tracks = [
    { y: 24, w: 84, fill: CYAN },
    { y: 38, w: 60, fill: YELLOW },
    { y: 52, w: 96, fill: MAGENTA },
    { y: 66, w: 44, fill: CYAN_SOFT },
  ];
  return (
    <svg viewBox="0 0 184 132" aria-hidden="true" className={className}>
      <rect x="22" y="4" width="140" height="94" rx="6" fill={INK} />
      <rect x="29" y="11" width="126" height="80" fill={VIOLET} />
      {/* トランスポートバー */}
      <rect x="29" y="11" width="126" height="9" fill={INK} fillOpacity="0.45" />
      <circle cx="36" cy="15.5" r="2.5" fill={MAGENTA} />
      <circle cx="45" cy="15.5" r="2.5" fill={YELLOW} />
      {tracks.map((t) => (
        <g key={t.y}>
          <rect x="34" y={t.y} width="20" height="8" rx="2" fill={PAPER} fillOpacity="0.35" />
          <rect x="58" y={t.y} width={t.w} height="8" rx="2" fill={t.fill} />
        </g>
      ))}
      {/* 再生位置 */}
      <line x1="112" y1="20" x2="112" y2="88" stroke={PAPER} strokeWidth="2" strokeOpacity="0.8" />
      <path d="M8 108h168l8 16H0z" fill={PAPER} stroke={INK} strokeWidth="3" strokeLinejoin="round" />
      <rect x="80" y="112" width="24" height="4" rx="2" fill={INK} fillOpacity="0.35" />
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

/** ミキサーのフェーダー。DTM/レコーディングの記号として使う */
export function Mixer({ className = "" }: IllustProps) {
  const strips = [
    { x: 22, knob: 44, fill: CYAN },
    { x: 52, knob: 72, fill: YELLOW },
    { x: 82, knob: 34, fill: MAGENTA },
    { x: 112, knob: 60, fill: VIOLET_SOFT },
  ];
  return (
    <svg viewBox="0 0 148 140" aria-hidden="true" className={className}>
      <rect x="4" y="4" width="140" height="132" rx="8" fill={INK} />
      {strips.map((s) => (
        <g key={s.x}>
          <circle cx={s.x + 7} cy="24" r="8" fill={PAPER} fillOpacity="0.85" />
          <line
            x1={s.x + 7}
            y1="24"
            x2={s.x + 7}
            y2="18"
            stroke={INK}
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <rect x={s.x + 4} y="42" width="6" height="78" rx="3" fill={PAPER} fillOpacity="0.2" />
          <rect x={s.x - 3} y={42 + s.knob} width="20" height="12" rx="3" fill={s.fill} />
        </g>
      ))}
    </svg>
  );
}

/** 五線の上を音符が跳ねていく帯。セクションの区切りに敷く */
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

/** セクション間を仕切る、刷り版のようなゆるい弧 */
export function Curve({
  className = "",
  flip = false,
}: IllustProps & {
  /** true で上下を反転し、下側のセクションへ食い込ませる */
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 1440 90"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <path d="M0 90C340 6 1100 6 1440 90Z" fill="currentColor" />
    </svg>
  );
}

/** 拍を刻むイコライザー。「いま音が鳴っている」ことのバッジに使う */
export function Equalizer({ className = "" }: IllustProps) {
  const bars = [
    { h: "h-2.5", delay: "0ms" },
    { h: "h-4", delay: "180ms" },
    { h: "h-3", delay: "360ms" },
    { h: "h-4", delay: "540ms" },
  ];
  return (
    <span aria-hidden="true" className={`inline-flex items-end gap-[3px] ${className}`}>
      {bars.map((b, i) => (
        <span
          key={i}
          className={`w-[3px] origin-bottom rounded-sm bg-current ${b.h} motion-safe:animate-[eq-bar_1100ms_ease-in-out_infinite]`}
          style={{ animationDelay: b.delay }}
        />
      ))}
    </span>
  );
}
