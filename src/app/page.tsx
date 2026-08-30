import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FloatingIllust from "@/components/FloatingIllust";
import SectionLabel from "@/components/SectionLabel";
import { IMAIKE_PATH } from "@/components/SiteHeader";
import {
  BeamedNotes,
  Curve,
  Equalizer,
  Headphones,
  Keyboard,
  Laptop,
  Metronome,
  Microphone,
  Mixer,
  Record,
  SheetMusic,
  SingleNote,
  StaffLine,
} from "@/components/Illustrations";

const AUDIENCE = [
  { text: "教室に通う時間がない", en: "NO TIME" },
  { text: "ジャムセッションに挑戦したい", en: "SESSION" },
  { text: "新しい趣味を見つけたい", en: "NEW HOBBY" },
  { text: "独学での練習に伸び悩んでいる", en: "PLATEAU" },
  { text: "アレンジや即興ができるようになりたい", en: "IMPROVISE" },
];

const FEATURES = [
  {
    en: "ANYWHERE",
    title: "世界中どこからでも",
    body: "ZoomまたはFaceTimeを使用。仕事後の夜も、出かける前の朝も、移動時間ゼロで受けられます。",
    illust: <Laptop className="w-full" />,
  },
  {
    en: "TAILORED",
    title: "オーダーメイドの内容",
    body: "耳コピ、作曲、ハーモナイズした手書き楽譜の添削まで。目標とペースに合わせて組み立てます。",
    illust: <SheetMusic className="w-full" />,
  },
  {
    en: "SUPPORT",
    title: "レッスン外もLINEで",
    body: "自宅での練習中に出てきた疑問は、いつでも質問できます。次のレッスンまで一人にしません。",
    illust: <Headphones className="w-full" />,
  },
  {
    en: "FLEXIBLE",
    title: "月2回・振替あり",
    body: "曜日と時間は固定制。ご都合がつかない場合は、前日までのご相談で月1回まで無料で振替できます。",
    illust: <Metronome className="w-full" />,
  },
];

const MARQUEE_WORDS = [
  "ONLINE JAZZ PIANO",
  "アドリブ",
  "コードワーク",
  "スイング",
  "セッション",
  "耳コピ",
  "作曲・アレンジ",
];

// 教室案内資料より。数字は「初心者でも大丈夫」を裏づける根拠として置いている
const RATIOS = [
  {
    title: "初心者と経験者の割合",
    note: "入会希望者の半数が音楽初心者",
    major: { label: "初心者", percent: 70 },
    minor: { label: "経験者", percent: 30 },
  },
  {
    title: "ジャズを学ぶ割合",
    note: null,
    major: { label: "ジャズ", percent: 60 },
    minor: { label: "ポップス", percent: 40 },
  },
];

const FLOW_STEPS = [
  {
    en: "APPLY",
    title: "フォームより お申し込み",
    body: "申し込み確認後、ご希望の連絡方法より、日程調整のご連絡を差し上げます。",
  },
  {
    en: "MAIL",
    title: "メールを確認",
    body: "入力したメールアドレス宛に体験レッスンの料金を簡単にウェブ決済可能な請求書をお送りします。お支払い確認後、予約が完了となります。",
  },
  {
    en: "LESSON",
    title: "体験レッスン当日",
    body: "レッスンの開始時間になったら、ZOOMにアクセスし、マイクとカメラをオンにしてください。Facetimeの場合は、講師より通話致します。",
  },
  {
    en: "JOIN",
    title: "入会申し込み",
    body: "体験レッスン終了後、入会申し込みフォームを送らせて頂きます。その後、初回レッスンのご案内をささせて頂きます。",
  },
];

// 教材・機材・規約は読み物というより「必要になったとき引く」情報なので、
// 見出しだけを並べて畳んでおき、必要な項目だけ開ける形にする
const FAQ_GROUPS = [
  {
    en: "MATERIALS",
    label: "教材",
    items: [
      {
        title: "教室の楽譜データライブラリー",
        paragraphs: [
          "入会後、教室で楽譜共有しているGoogle Driveのリンクをお送りします。様々な楽譜を豊富に用意してますので、ご自由にご利用ください。",
          "また、レッスン時にこちらのフォルダから楽譜を用意してもらうように指示することもございます。レッスン前に、印刷したり、タブレットで見れるように準備しておきましょう。",
          "その他の教材につきましては、講師から指定のものを生徒様に購入して頂く場合もございます。",
        ],
      },
    ],
  },
  {
    en: "SETUP",
    label: "オンラインレッスンの注意点",
    items: [
      {
        title: "スマホやタブレットの配置について",
        paragraphs: [
          "テレビ通話用のスマホまたは、タブレット、パソコンは、ピアノから横からの画角で配置していただけると、姿勢やフォームの指導がスムーズです。",
          "スマホスタンドなどは、特に指定はございませんが脚立タイプが使用しやすいです。",
        ],
      },
      {
        title: "ZOOMの設定について",
        paragraphs: [
          "マイクとカメラはオンにして頂き、「ミュージシャン用オリジナルサウンド」をオンにする必要があります。",
          "1.＜ミュージシャン用のオリジナルサウンド＞に○をつけます。",
          "2.＜高忠実度音楽モード＞と＜エコー除去＞にチェックが入っている状態にします。",
        ],
      },
      {
        title: "FaceTimeについて",
        paragraphs: [
          "Apple端末をご利用の方には、FaceTimeでのご利用をお願いしております。音の遅延が少なく、スムーズにレッスンを進められるためです。",
          "FaceTimeが使える端末は、iPhone 4以降（iOS 4以降を搭載）、iPad 2以降・iPad mini（初代以降）、Macです。",
        ],
      },
    ],
  },
  {
    en: "GUIDE",
    label: "受講のご案内",
    items: [
      {
        title: "レッスンスケジュール",
        paragraphs: [
          "レッスンは固定の曜日・時間帯で隔週月2回のペースで行います。一度決定したスケジュールを基本としますが、やむを得ない事情でご都合がつかない場合、月に1回まで無料で振替が可能です。振替をご希望の場合は、前日までにご相談いただければ対応が可能ですが、振替対応が難しい場合もございますので、振替がご希望の場合にはお早めにお知らせください。",
          "なお、当日のキャンセルについては振替ができず、キャンセル料が発生しますのでご注意ください。スムーズなレッスン運営のため、ご理解いただけますと幸いです。",
        ],
      },
      {
        title: "キャンセルポリシー",
        paragraphs: [
          "講師都合によるキャンセルに関しては、無料でのキャンセル、払い戻し、振替で対応いたします。ただし、当日欠席には100%キャンセル料が発生します（返金不可）。",
          "体調不良等がある場合には、前日までにご連絡いただければ振替対応させていただきます。ご理解とご協力をお願いいたします。",
          "また、毎月2回でのコースにおいて、試験やお仕事、ご旅行など1回のレッスンしか受講できない月においては、年4回までキャンセルが可能です。その場合は、1回分のレッスン料金の請求になります。",
        ],
      },
      {
        title: "休会について",
        paragraphs: [
          "休会につきましては、2ヶ月以内の場合レッスン枠を確保し手続きなどは不要で休会が可能です。2ヶ月以上、無期限の場合は、退会の手続きが必要です。場合によってはレッスン枠を確保した上で休会も可能ですので、まずはご相談ください。",
          "再入会の際には、入会費はかかりません。",
        ],
      },
      {
        title: "退会について",
        paragraphs: [
          "退会をご希望の場合、その旨を講師にご連絡頂き、退会希望月の前月末日までに退会フォームのご提出をお願いいたします。",
          "例えば、4月末日をもって退会をご希望の場合は、3月末日までに退会フォームを完了していただく必要があります。",
          "ご提出が上記の期限を過ぎた場合、残念ながら次月分の月謝が発生いたします。この点につきましては、教室の運営上の規定に基づいており、どうかご了承ください。",
        ],
      },
    ],
  },
];

/** 割合のドーナツ。数字が主役なので、環は輪郭だけを担わせる */
function Donut({ percent }: { percent: number }) {
  const radius = 52;
  const circumference = 2 * Math.PI * radius;

  return (
    <svg viewBox="0 0 140 140" className="w-full" role="presentation">
      <circle
        cx="70"
        cy="70"
        r={radius}
        fill="none"
        stroke="var(--color-violet)"
        strokeWidth="20"
      />
      <circle
        cx="70"
        cy="70"
        r={radius}
        fill="none"
        stroke="var(--color-magenta)"
        strokeWidth="20"
        strokeDasharray={`${(percent / 100) * circumference} ${circumference}`}
        transform="rotate(-90 70 70)"
      />
    </svg>
  );
}

function Badge({ tone, children }: { tone: "open" | "paused"; children: React.ReactNode }) {
  if (tone === "open") {
    return (
      <span className="inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-1.5 font-body text-xs font-bold text-ink">
        <Equalizer className="text-ink" />
        {children}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-ink px-4 py-1.5 font-body text-xs font-bold text-ink">
      <span className="h-1.5 w-1.5 rounded-full bg-ink" />
      {children}
    </span>
  );
}

export default function Home() {
  return (
    <main id="top" className="flex-1">
      {/* ============================ HERO ============================ */}
      <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-4 pb-20 pt-28 md:px-8 md:pb-24 md:pt-32">
        {/* 天からインクが降ってきて紙に吸われる、リソの刷り始め */}
        <div
          aria-hidden="true"
          className="speckle-fade pointer-events-none absolute inset-x-0 top-0 h-[34vh]"
          style={{ "--speckle-color": "var(--color-violet)" } as React.CSSProperties}
        />

        {/* 見出しの版面を避け、イラストは右側と外周に寄せて散らす */}
        <FloatingIllust className="right-[-2rem] top-[12vh] w-32 md:right-[5%] md:w-52" speed={0.3} driftMs={9000}>
          <Record className="w-full motion-safe:animate-spin-slow" />
        </FloatingIllust>
        <FloatingIllust
          className="right-[42%] top-[9vh] w-14 md:right-[27%] md:w-24"
          speed={0.45}
          rotate={-14}
          driftMs={6400}
          driftDelayMs={400}
        >
          <BeamedNotes className="w-full" />
        </FloatingIllust>
        <FloatingIllust
          className="bottom-[30vh] right-[8%] w-10 md:bottom-[34vh] md:right-[15%] md:w-16"
          speed={0.36}
          rotate={16}
          driftMs={7200}
          driftDelayMs={900}
        >
          <SingleNote className="w-full" />
        </FloatingIllust>
        <FloatingIllust
          className="bottom-[-3rem] right-[-4rem] w-64 md:bottom-[-4rem] md:right-[-2rem] md:w-[22rem]"
          speed={0.16}
          rotate={-8}
          driftMs={11000}
        >
          <Keyboard className="w-full" />
        </FloatingIllust>
        <FloatingIllust
          className="left-[2%] top-[30vh] hidden w-24 md:block"
          speed={0.24}
          rotate={9}
          driftMs={8400}
          driftDelayMs={1200}
        >
          <Microphone className="w-full" />
        </FloatingIllust>

        <div className="relative mx-auto w-full max-w-6xl">
          <Reveal>
            <p className="font-en text-xs tracking-[0.34em] text-violet md:text-sm">
              ONLINE JAZZ PIANO LESSON
            </p>
          </Reveal>
          <Reveal delay={120} y={40}>
            <h1 className="mt-8 font-display text-[2.15rem] font-bold leading-[1.62] tracking-wide text-ink md:mt-10 md:text-[4.1rem] md:leading-[1.5]">
              自宅ではじめる、
              <br />
              オンラインジャズピアノ。
            </h1>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 max-w-lg font-body text-sm leading-9 text-ink-soft md:text-base md:leading-10">
              譜面のとおりに弾けたその先に、ジャズがあります。
              コードの上を歩き、その日の気分でメロディを変える。
              名古屋発のオンラインレッスンで、初心者もゼロから始められます。
            </p>
          </Reveal>
          <Reveal delay={340} className="mt-10 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-4 rounded-full bg-magenta px-8 py-4 text-paper transition-transform duration-300 ease-out hover:-translate-y-1"
            >
              <span className="font-display text-base font-bold">体験レッスンに申し込む</span>
              <span className="font-en text-sm text-paper/80">30min ¥1,500</span>
            </a>
            <a
              href="#lesson"
              className="font-en text-sm tracking-[0.16em] text-ink underline decoration-violet/50 underline-offset-[6px] transition-opacity duration-200 hover:opacity-55"
            >
              VIEW LESSON
            </a>
          </Reveal>
        </div>

        {/* スクロールの合図 */}
        <div
          aria-hidden="true"
          className="absolute bottom-6 left-4 flex flex-col items-center gap-3 md:left-8"
        >
          <span className="tategaki font-en text-[0.65rem] tracking-[0.3em] text-ink-soft">SCROLL</span>
          <span className="block h-12 w-px bg-ink-soft/50" />
        </div>
      </section>

      {/* ========================= MANIFESTO ========================= */}
      <section className="paper-rule relative overflow-hidden bg-paper-deep px-4 py-24 md:px-8 md:py-36">
        <FloatingIllust
          className="left-[-3rem] top-16 w-32 md:left-[6%] md:w-44"
          speed={0.22}
          rotate={-12}
          driftMs={9600}
        >
          <SheetMusic className="w-full" />
        </FloatingIllust>
        <FloatingIllust
          className="right-[-2rem] top-40 w-28 md:right-[8%] md:w-36"
          speed={0.3}
          rotate={9}
          driftMs={8000}
          driftDelayMs={500}
        >
          <Metronome className="w-full" />
        </FloatingIllust>
        <FloatingIllust
          className="bottom-16 left-[8%] hidden w-32 md:block md:w-40"
          speed={0.26}
          rotate={14}
          driftMs={10400}
          driftDelayMs={1100}
        >
          <Mixer className="w-full" />
        </FloatingIllust>

        <div className="relative mx-auto max-w-2xl text-center">
          <Reveal>
            <SectionLabel>ABOUT</SectionLabel>
          </Reveal>
          <div className="mt-12 space-y-12 md:mt-16">
            {[
              [
                "楽譜のとおりに弾くのは、少しだけ得意になった。",
                "でも、その先にある“自由”は、どこにあるんだろう。",
              ],
              [
                "ジャズは、譜面の外側にある音楽です。",
                "コードの上を歩き、その日の気分でメロディを変えて、",
                "隣で鳴っている音に、返事をする。",
              ],
              [
                "難しそうに聞こえますか。",
                "大丈夫、はじまりはたった二つの和音からです。",
              ],
              [
                "Hello Jazz Academy は、",
                "その最初の一音を、いっしょに鳴らす場所です。",
              ],
            ].map((block, bi) => (
              <Reveal key={bi} delay={bi * 90}>
                <p className="font-body text-[0.95rem] leading-[2.6] tracking-wide text-ink md:text-lg md:leading-[2.6]">
                  {block.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== 流れる音符の帯 ===================== */}
      <div className="relative overflow-hidden border-y border-rule bg-paper py-5">
        <div className="flex w-max motion-safe:animate-marquee" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {MARQUEE_WORDS.map((word, i) => (
                <span key={`${copy}-${word}`} className="flex items-center">
                  <span className="whitespace-nowrap px-6 font-en text-sm tracking-[0.24em] text-ink md:px-10 md:text-base">
                    {word}
                  </span>
                  <SingleNote
                    className="w-3.5 shrink-0 md:w-4"
                    color={["#e21bd5", "#6618d5", "#72dafe", "#fadc46"][i % 4]}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ========================= AUDIENCE ========================= */}
      <section id="lesson" className="relative overflow-hidden bg-paper px-4 py-24 md:px-8 md:py-32">
        {/* 見出し下の余白を埋める。右側のリストには重ねない */}
        <FloatingIllust
          className="bottom-10 left-[4%] hidden w-44 md:block"
          speed={0.2}
          rotate={-12}
          driftMs={9200}
        >
          <Headphones className="w-full" />
        </FloatingIllust>

        <div className="relative mx-auto max-w-6xl md:grid md:grid-cols-12 md:gap-x-12">
          <div className="md:col-span-5">
            <Reveal>
              <SectionLabel>FOR YOU</SectionLabel>
              <h2 className="mt-6 font-display text-2xl font-bold leading-[1.7] text-ink md:text-4xl md:leading-[1.6]">
                こんな方に
                <br />
                おすすめです
              </h2>
            </Reveal>
          </div>

          <ul className="mt-12 md:col-span-7 md:mt-2">
            {AUDIENCE.map((item, i) => (
              <Reveal as="li" key={item.text} delay={i * 80} className="border-t border-rule last:border-b">
                <div className="flex items-baseline gap-5 py-6 md:gap-8">
                  <span className="font-en text-sm text-violet md:text-base">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-body text-base leading-8 text-ink md:text-xl">{item.text}</span>
                  <span className="ml-auto hidden font-en text-xs tracking-[0.2em] text-ink-soft md:block">
                    {item.en}
                  </span>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ========================= FEATURES ========================= */}
      <section className="relative">
        <Curve className="block h-12 w-full text-ink md:h-20" />
        <div className="relative overflow-hidden bg-ink px-4 pb-24 pt-8 text-paper md:px-8 md:pb-32">
          {/* 五線は本文にかからないよう、セクション下端の余白に流す */}
          <StaffLine className="pointer-events-none absolute inset-x-0 bottom-8 h-20 w-full text-paper opacity-20" />

          <div className="relative mx-auto max-w-6xl">
            <Reveal>
              <SectionLabel tone="cyan">ONLINE LESSON</SectionLabel>
              <h2 className="mt-6 max-w-2xl font-display text-2xl font-bold leading-[1.7] text-paper md:text-4xl md:leading-[1.6]">
                スマホ1台で、
                <br />
                自宅が音楽教室になる。
              </h2>
              <p className="mt-8 max-w-xl font-body text-sm leading-9 text-paper/70 md:text-base">
                レッスンはZoomまたはFaceTime。画面越しでも、手元・音・リズムはきちんと見えます。
                現在の生徒さんは初心者が約7割。ゼロから安心して始められる環境です。
              </p>
            </Reveal>

            <div className="mt-16 grid gap-x-10 gap-y-14 sm:grid-cols-2">
              {FEATURES.map((f, i) => (
                <Reveal key={f.en} delay={i * 110} className="flex gap-6">
                  <div className="w-20 shrink-0 md:w-28">{f.illust}</div>
                  <div className="flex-1 border-t border-paper/20 pt-4">
                    <p className="font-en text-xs tracking-[0.24em] text-cyan">{f.en}</p>
                    <h3 className="mt-3 font-display text-lg font-bold text-paper md:text-xl">
                      {f.title}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-8 text-paper/70">{f.body}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
        <Curve className="block h-12 w-full rotate-180 text-ink md:h-20" />
      </section>

      {/* ========================= STUDENTS ========================= */}
      <section id="students" className="relative overflow-hidden bg-paper px-4 py-20 md:px-8 md:py-28">
        <div className="relative mx-auto max-w-5xl">
          <Reveal>
            <SectionLabel>STUDENTS</SectionLabel>
            <h2 className="mt-6 font-display text-2xl font-bold leading-[1.7] text-ink md:text-4xl">
              生徒さんの割合
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-12 md:mt-16 md:grid-cols-2 md:gap-16">
            {RATIOS.map((r, i) => (
              <Reveal key={r.title} delay={i * 120}>
                <h3 className="border-b border-rule pb-4 text-center font-body text-sm text-ink md:text-base">
                  {r.title}
                </h3>
                <div className="mt-8 flex items-center justify-center gap-5 md:gap-7">
                  <div className="shrink-0 text-right">
                    <p className="font-display text-base font-bold text-ink md:text-lg">
                      {r.minor.label}
                    </p>
                    <p className="font-en text-xl text-ink-soft md:text-2xl">{r.minor.percent}%</p>
                  </div>
                  <div className="w-28 shrink-0 md:w-36">
                    <Donut percent={r.major.percent} />
                  </div>
                  <div className="shrink-0">
                    <p className="font-display text-base font-bold text-ink md:text-lg">
                      {r.major.label}
                    </p>
                    <p className="font-en text-xl text-ink-soft md:text-2xl">{r.major.percent}%</p>
                  </div>
                </div>
                {r.note ? (
                  <p className="mt-6 text-center font-body text-xs leading-7 text-ink-soft">
                    {r.note}
                  </p>
                ) : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== INSTRUCTORS ======================== */}
      <section id="teacher" className="relative overflow-hidden bg-paper px-4 py-20 md:px-8 md:py-28">
        <FloatingIllust
          className="left-[-3rem] top-1/3 hidden w-36 md:block"
          speed={0.24}
          rotate={-10}
          driftMs={9800}
        >
          <BeamedNotes className="w-full" />
        </FloatingIllust>

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>INSTRUCTOR</SectionLabel>
            <h2 className="mt-6 font-display text-2xl font-bold leading-[1.7] text-ink md:text-4xl">
              講師紹介
            </h2>
          </Reveal>

          {/* コルテス・ポール */}
          <article className="mt-16 md:mt-24 md:grid md:grid-cols-12 md:items-start md:gap-12">
            <Reveal className="md:col-span-5" y={44}>
              <div className="relative rotate-[-2deg]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 translate-x-3 translate-y-3 bg-cyan-soft"
                />
                <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-ink">
                  <Image
                    src="/images/teacher-paul-portrait.jpeg"
                    alt="コルテス・ポール先生"
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Reveal>

            <div className="mt-10 md:col-span-7 md:mt-0">
              <Reveal delay={120}>
                <Badge tone="open">オンラインレッスン受付中</Badge>
                <h3 className="mt-6 font-display text-2xl font-bold text-ink md:text-3xl">
                  コルテス・ポール
                </h3>
                <p className="mt-2 font-en text-sm tracking-[0.2em] text-ink-soft">
                  PAUL CORTEZ — BILINGUAL (JP / EN)
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 font-body text-sm leading-9 text-ink-soft md:text-base md:leading-10">
                  幼少期から音楽に親しみ、11歳からギターを始め、ポップスやブルースを中心に演奏。高校卒業後にジャズピアノと出会い、後藤浩二氏に師事。さらにPeter
                  Martin氏から学び、音楽の幅を広げる。現在はジャズを中心に、名古屋のライブハウスや四日市ジャズフェスティバルなどのイベントに出演するほか、オリジナル曲の作曲にも積極的に取り組んでいる。
                </p>
                <p className="mt-6 font-body text-sm leading-9 text-ink-soft md:text-base">
                  英語でのレッスンも可能です。英語を学びながらジャズも学びたい方にも。
                </p>

                {/*
                  今池の対面レッスンを担当しているのはポール先生。
                  講師を見て興味を持った人がそのまま辿れるよう、プロフィール直下に導線を置く。
                */}
                <Link
                  href={IMAIKE_PATH}
                  className="group mt-8 flex flex-wrap items-center justify-between gap-5 border-2 border-ink bg-yellow-soft px-6 py-5 transition-transform duration-300 ease-out hover:-translate-y-1"
                >
                  <span className="block">
                    <span className="flex items-center gap-2 font-en text-xs tracking-[0.24em] text-magenta">
                      <Equalizer className="text-magenta" />
                      IN PERSON — IMAIKE
                    </span>
                    <span className="mt-3 block font-display text-base font-bold leading-[1.7] text-ink md:text-lg">
                      今池（千種区）での対面レッスンも担当しています
                    </span>
                    <span className="mt-2 block font-body text-xs leading-6 text-ink-soft">
                      月1回・60分マンツーマン／単発受講OK・2027年3月までの期間限定
                    </span>
                  </span>
                  <span className="ml-auto flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 ease-out group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </article>

          {/* 河地里咲 */}
          <article className="mt-24 md:mt-32 md:grid md:grid-cols-12 md:items-start md:gap-12">
            <Reveal className="md:col-span-5 md:order-2" y={44}>
              <div className="relative rotate-[2deg]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 -translate-x-3 translate-y-3 bg-magenta-soft"
                />
                <div className="relative aspect-[4/5] w-full overflow-hidden border-2 border-ink">
                  <Image
                    src="/images/teacher-risa.jpeg"
                    alt="河地里咲先生"
                    fill
                    sizes="(min-width: 768px) 40vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>
              </div>
            </Reveal>

            <div className="mt-10 md:col-span-7 md:order-1 md:mt-0">
              <Reveal delay={120}>
                <Badge tone="paused">受付休止中</Badge>
                <h3 className="mt-6 font-display text-2xl font-bold text-ink md:text-3xl">
                  河地 里咲
                </h3>
                <p className="mt-2 font-en text-sm tracking-[0.2em] text-ink-soft">
                  RISA KAWACHI — FOUNDER
                </p>
              </Reveal>
              <Reveal delay={200}>
                <p className="mt-8 font-body text-sm leading-9 text-ink-soft md:text-base md:leading-10">
                  4歳からエレクトーンを始め、その後ピアノへと進む。名古屋音楽大学の音楽療法学科に進学するも、本格的にジャズを学ぶために2年目でジャズポピュラーコース・ジャズピアノ専攻へ転科。在学中、ジャズ・即興・作曲アレンジの分野で著名な水野修平氏に師事。さらに馬淵明彦氏からダルクローズ・リトミックを学び、幼児教育への理解を一層深める。現在はハロージャズアカデミーの主宰兼講師。
                </p>
                <p className="mt-6 border-l-2 border-magenta pl-5 font-body text-sm leading-9 text-ink">
                  現在は休業中のため、対面・オンラインともに新規レッスンの受付を休止しています。再開の際は「お知らせ」でご案内します。
                </p>
              </Reveal>
            </div>
          </article>
        </div>
      </section>

      {/* =========================== PRICE =========================== */}
      <section id="price" className="paper-rule relative overflow-hidden bg-paper-deep px-4 py-24 md:px-8 md:py-32">
        <FloatingIllust
          className="bottom-6 left-[-5rem] hidden w-72 md:block"
          speed={0.18}
          rotate={8}
          driftMs={10800}
        >
          <Keyboard className="w-full" />
        </FloatingIllust>

        <div className="relative mx-auto max-w-4xl">
          <Reveal>
            <SectionLabel>PRICE</SectionLabel>
            <h2 className="mt-6 font-display text-2xl font-bold leading-[1.7] text-ink md:text-4xl">
              料金
            </h2>
          </Reveal>

          <div className="mt-12 md:mt-16">
            {[
              { label: "体験レッスン（30分）", price: "¥1,500", unit: null, tag: null },
              {
                label: "オンラインレッスン（月2回・大人）",
                price: "¥12,000",
                unit: "/ 月",
                tag: "人気",
              },
              {
                label: "オンラインレッスン（月2回・学生）",
                price: "¥10,000",
                unit: "/ 月",
                tag: null,
              },
            ].map((row, i) => (
              <Reveal key={row.label} delay={i * 90} className="border-t border-ink/25 last:border-b">
                <div className="flex flex-wrap items-baseline justify-between gap-3 py-7">
                  <div className="flex items-center gap-3">
                    <p className="font-body text-sm text-ink md:text-base">{row.label}</p>
                    {row.tag ? (
                      <span className="rounded-full bg-brand-yellow px-3 py-0.5 font-body text-xs font-bold text-ink">
                        {row.tag}
                      </span>
                    ) : null}
                  </div>
                  <p className="font-en text-3xl font-semibold text-ink md:text-4xl">
                    {row.price}
                    {row.unit ? (
                      <span className="ml-2 font-body text-sm font-normal text-ink-soft">
                        {row.unit}
                      </span>
                    ) : null}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={280}>
            <p className="mt-8 font-body text-xs leading-7 text-ink-soft">
              お支払いはSquare請求書にて承っております。レッスンは固定の曜日・時間で隔週（月2回）。
              月1回まで無料で振替が可能です（前日までにご相談ください）。
            </p>
          </Reveal>
        </div>
      </section>

      {/* =========================== FLOW =========================== */}
      <section id="flow" className="relative overflow-hidden bg-paper px-4 py-24 md:px-8 md:py-32">
        <FloatingIllust
          className="right-[-3rem] top-16 hidden w-32 md:block"
          speed={0.16}
          rotate={10}
          driftMs={9200}
        >
          <SingleNote className="w-full" />
        </FloatingIllust>

        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel>FLOW</SectionLabel>
            <h2 className="mt-6 font-display text-2xl font-bold leading-[1.7] text-ink md:text-4xl">
              入会までの流れ
            </h2>
            <p className="mt-6 font-display text-lg font-bold text-ink md:text-xl">
              体験レッスン　受講料¥1,500
            </p>
          </Reveal>

          {/* 4ステップは順序そのものが情報なので、番号を打って一列に並べる */}
          <ol className="mt-12 grid gap-8 md:mt-16 md:grid-cols-4 md:gap-6">
            {FLOW_STEPS.map((s, i) => (
              <Reveal key={s.en} as="li" delay={i * 100} className="border-t-2 border-ink pt-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-en text-2xl font-semibold text-violet md:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-en text-[0.7rem] tracking-[0.24em] text-ink-soft">
                    {s.en}
                  </span>
                </div>
                <h3 className="mt-4 font-display text-base font-bold text-ink md:text-lg">
                  {s.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-8 text-ink-soft">{s.body}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ============================ FAQ ============================ */}
      <section
        id="faq"
        className="paper-rule relative overflow-hidden bg-paper-deep px-4 py-24 md:px-8 md:py-32"
      >
        <FloatingIllust
          className="left-[-4rem] bottom-10 hidden w-40 md:block"
          speed={0.2}
          rotate={-12}
          driftMs={10200}
        >
          <Metronome className="w-full" />
        </FloatingIllust>

        <div className="relative mx-auto max-w-4xl">
          <Reveal>
            <SectionLabel>FAQ</SectionLabel>
            <h2 className="mt-6 font-display text-2xl font-bold leading-[1.7] text-ink md:text-4xl">
              受講のご案内
            </h2>
          </Reveal>

          <Reveal delay={120} className="mt-10 md:mt-14">
            <div className="flex flex-col gap-4 border-2 border-ink bg-brand-yellow px-6 py-7 md:flex-row md:items-center md:gap-8 md:px-10 md:py-8">
              <Record className="w-12 shrink-0 motion-safe:animate-spin-slow md:w-14" />
              <p className="font-display text-base font-bold leading-[1.8] text-ink md:text-xl">
                月に一回振替無料 / 年4回までキャンセルOK
              </p>
            </div>
          </Reveal>

          {FAQ_GROUPS.map((group, gi) => (
            <Reveal key={group.en} delay={gi * 80} className="mt-12 md:mt-16">
              <div className="flex items-baseline gap-4">
                <p className="font-en text-[0.7rem] tracking-[0.24em] text-violet">{group.en}</p>
                <h3 className="font-display text-base font-bold text-ink md:text-lg">
                  {group.label}
                </h3>
              </div>

              <div className="mt-5 border-t border-ink/25">
                {group.items.map((item) => (
                  <details
                    key={item.title}
                    className="group border-b border-ink/25 [&_summary::-webkit-details-marker]:hidden"
                  >
                    <summary className="flex cursor-pointer list-none items-center gap-4 py-5 font-display text-sm font-bold text-ink transition-opacity duration-200 hover:opacity-60 md:text-base">
                      <span className="flex-1">{item.title}</span>
                      {/* 十字を45度回すと×になる。開閉の状態がそのまま形になる */}
                      <span
                        aria-hidden="true"
                        className="relative h-4 w-4 shrink-0 transition-transform duration-300 ease-out group-open:rotate-45"
                      >
                        <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-ink" />
                        <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-ink" />
                      </span>
                    </summary>
                    <div className="flex flex-col gap-4 pb-7 pr-8">
                      {item.paragraphs.map((text) => (
                        <p key={text} className="font-body text-sm leading-8 text-ink-soft">
                          {text}
                        </p>
                      ))}
                    </div>
                  </details>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ========================== IMAIKE ========================== */}
      <section id="imaike" className="relative overflow-hidden bg-paper px-4 py-20 md:px-8 md:py-24">
        <div className="mx-auto max-w-6xl">
          <Reveal className="flex flex-col gap-6 border-y-2 border-ink py-10 md:flex-row md:items-center md:justify-between md:py-12">
            <div className="flex items-start gap-6">
              <Metronome className="w-14 shrink-0 md:w-16" />
              <div>
                <SectionLabel>IN PERSON</SectionLabel>
                <p className="mt-4 font-display text-lg font-bold leading-[1.8] text-ink md:text-2xl">
                  月に一度、今池（千種区）での
                  <br className="hidden md:block" />
                  対面レッスンも実施中。
                </p>
                <p className="mt-3 font-body text-sm leading-8 text-ink-soft">
                  2027年3月までの期間限定です。
                </p>
              </div>
            </div>
            <Link
              href={IMAIKE_PATH}
              className="group inline-flex shrink-0 items-center gap-3 font-en text-sm tracking-[0.2em] text-ink"
            >
              VIEW MORE
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ========================== ACCESS ========================== */}
      <section id="access" className="relative overflow-hidden bg-paper px-4 pb-24 md:px-8 md:pb-32">
        <FloatingIllust
          className="left-[-2rem] bottom-0 hidden w-32 md:block"
          speed={0.2}
          rotate={-14}
          driftMs={9400}
        >
          <Mixer className="w-full" />
        </FloatingIllust>

        <div className="relative mx-auto max-w-6xl md:grid md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-5">
            <SectionLabel>ACCESS</SectionLabel>
            <h2 className="mt-6 font-display text-2xl font-bold leading-[1.7] text-ink md:text-3xl">
              アクセス
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-8 md:col-span-7 md:mt-2">
            <dl className="border-t border-rule">
              <div className="flex gap-6 border-b border-rule py-5">
                <dt className="w-24 shrink-0 font-en text-xs tracking-[0.2em] text-ink-soft">BASE</dt>
                <dd className="font-body text-sm leading-8 text-ink">天白教室（名古屋市天白区）</dd>
              </div>
              <div className="flex gap-6 border-b border-rule py-5">
                <dt className="w-24 shrink-0 font-en text-xs tracking-[0.2em] text-ink-soft">ONLINE</dt>
                <dd className="font-body text-sm leading-8 text-ink">
                  Zoom / FaceTime（全国・海外から受講可能）
                </dd>
              </div>
              <div className="flex gap-6 border-b border-rule py-5">
                <dt className="w-24 shrink-0 font-en text-xs tracking-[0.2em] text-ink-soft">IN PERSON</dt>
                <dd className="font-body text-sm leading-8 text-ink">
                  今池教室（名古屋市千種区）／月1回・2027年3月までの期間限定
                </dd>
              </div>
            </dl>
            <p className="mt-6 font-body text-xs leading-7 text-ink-soft">
              現在はオンラインレッスンを中心に活動しています。
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
