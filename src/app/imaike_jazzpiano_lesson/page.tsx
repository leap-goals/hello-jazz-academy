import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FloatingIllust from "@/components/FloatingIllust";
import PaymentBrands from "@/components/PaymentBrands";
import SectionLabel from "@/components/SectionLabel";
import { IMAIKE_FORM_URL } from "@/components/SiteHeader";
import {
  BeamedNotes,
  Curve,
  Equalizer,
  Headphones,
  Keyboard,
  Record,
  SheetMusic,
  SingleNote,
  StaffLine,
} from "@/components/Illustrations";

/*
 * 今池(千種区)の対面スポットレッスンLP。
 *
 * 紙・インク・明朝というデザインシステムはトップと共有しつつ、
 * 組み方は「一枚のフライヤー(チラシ)」に寄せてトップと差をつけている。
 *   - ヒーローは全画面ではなく、写真を組み込んだ横並びの版面
 *   - 帯は紙ではなくインクベタに黄の活字
 *   - 料金は半券(チケット)のカードに切り取り線を入れる
 *   - 濃い面はトップの「特徴」ではなく「料金」に置く
 * 色もトップのバイオレット+シアン(オンライン)に対し、マゼンタ+イエロー(対面)で刷る。
 * URLは旧WPの /imaike_jazzpiano_lesson/ をそのまま引き継ぐ。
 */

export const metadata: Metadata = {
  title: "今池の対面ジャズピアノレッスン | Hello Jazz Academy",
  description:
    "名古屋・今池で月1回開催する、コルテス・ポール講師の対面ジャズピアノレッスン。単発（スポット）受講OK、60分マンツーマン、グランドピアノ完備のスタジオ。今池駅より徒歩3分、英語でのレッスンにも対応。2027年3月までの期間限定です。",
  openGraph: {
    type: "article",
    locale: "ja_JP",
    siteName: "Hello Jazz Academy",
    url: "https://www.hellojazzacademy.com/imaike_jazzpiano_lesson/",
    title: "今池の対面ジャズピアノレッスン | Hello Jazz Academy",
    description:
      "月に一度、今池で向かい合う60分。単発受講OK・グランドピアノ完備・今池駅より徒歩3分。コルテス・ポール講師による対面ジャズピアノレッスン（2027年3月までの期間限定）。",
  },
};

const BAND_WORDS = [
  "SPOT LESSON",
  "単発受講OK",
  "60分マンツーマン",
  "グランドピアノ",
  "今池駅 徒歩3分",
  "英語対応可",
];

const POINTS = [
  {
    en: "FLEXIBLE",
    title: "単発（スポット）受講OK",
    body: "継続の契約はありません。「今月だけ」「一度だけ」でも歓迎です。通えるときに、通えるぶんだけ。",
  },
  {
    en: "INTENSIVE",
    title: "60分じっくりマンツーマン",
    body: "いま抱えている課題も、弾きたい曲も。ひとりぶんの60分を、まるごと使います。",
  },
  {
    en: "ACCESS",
    title: "今池駅より徒歩3分",
    body: "地下鉄東山線・桜通線の今池駅からすぐ。仕事帰りや、お出かけのついでにも立ち寄れます。",
  },
  {
    en: "QUALITY",
    title: "グランドピアノ完備のスタジオ",
    body: "響きのある部屋で、生ピアノの手ごたえを確かめられます。タッチもペダルも、その場で直せます。",
  },
  {
    en: "SCHEDULE",
    title: "毎月1回の開催",
    body: "開催日はお申し込みの際にご案内します。受講経験のある方へはLINEでもお知らせします。",
  },
  {
    en: "ENGLISH",
    title: "英語でのレッスンもOK",
    body: "音楽の専門用語を英語で覚えたり、英会話を楽しみながら弾いたり。日本語・英語どちらでも。",
  },
];

const PRICES = [
  { label: "一般", minutes: "60分", price: "¥10,000" },
  { label: "中学生以下", minutes: "60分", price: "¥8,500" },
  { label: "中学生以下", minutes: "30分", price: "¥4,250" },
];

const GUIDES = [
  {
    en: "CANCEL POLICY",
    title: "キャンセルポリシー",
    body: "レッスンの2日前までにご連絡いただいた場合は、振替または全額返金が可能です。それ以降は基本的に振替での対応とさせていただき、キャンセルされる場合は50%の返金となります。",
  },
  {
    en: "PAYMENT",
    title: "お支払い方法",
    body: "クレジットカード決済のみとなります。ご登録のメールアドレス宛に、月初めにウェブ決済のできる請求書をお送りしますので、レッスン当日までにお支払いください。",
  },
  {
    en: "FOR REPEATERS",
    title: "受講経験がある方へ",
    body: "一度でも当教室のレッスンを受講されたことのある方は、お申し込みフォームの記入は不要です。LINEにて直接ご連絡ください。",
  },
];

const ACCESS_ROWS = [
  { en: "PLACE", body: "今池のスタジオ（名古屋市千種区・グランドピアノ完備）" },
  { en: "ACCESS", body: "地下鉄 東山線・桜通線「今池」駅より徒歩3分" },
  { en: "SCHEDULE", body: "毎月1回（2026年5月〜2027年3月の期間限定）" },
  { en: "LESSON", body: "60分マンツーマン／単発受講OK・英語対応可" },
];

export default function ImaikeLesson() {
  return (
    <main id="top" className="flex-1">
      {/* ===================== HERO（一枚のフライヤーとして組む） ===================== */}
      <section className="relative overflow-hidden px-4 pb-16 pt-32 md:px-8 md:pb-24 md:pt-40">
        <div
          aria-hidden="true"
          className="speckle-fade pointer-events-none absolute inset-x-0 top-0 h-[30vh]"
          style={{ "--speckle-color": "var(--color-magenta)" } as React.CSSProperties}
        />

        {/* 版面の外側だけに散らす。見出しと写真の間には何も置かない
            (狭い画面ではヘッダーのボタンと重なるため出さない) */}
        <FloatingIllust
          className="right-[3%] top-[11vh] hidden w-16 md:block"
          speed={0.4}
          rotate={-12}
          driftMs={6800}
        >
          <Record className="w-full motion-safe:animate-spin-slow" />
        </FloatingIllust>
        <FloatingIllust
          className="bottom-[-2.5rem] left-[-4rem] w-52 md:bottom-[-3rem] md:left-[-3rem] md:w-72"
          speed={0.14}
          rotate={9}
          driftMs={11000}
        >
          <Keyboard className="w-full" />
        </FloatingIllust>

        <div className="relative mx-auto w-full max-w-6xl md:grid md:grid-cols-12 md:items-center md:gap-12">
          <div className="md:col-span-7">
            <Reveal>
              {/* 狭い端末で2行に折れないよう、字送りは幅に応じて詰める */}
              <p className="font-en text-xs tracking-[0.2em] text-magenta md:text-sm md:tracking-[0.32em]">
                IN-PERSON SPOT LESSON — IMAIKE, NAGOYA
              </p>
            </Reveal>
            <Reveal delay={110} y={40}>
              {/* 「今池で向かい合う60分。」が iPhone 幅(390px)で1行に収まるサイズに留める */}
              <h1 className="mt-7 font-display text-[1.95rem] font-bold leading-[1.62] tracking-wide text-ink md:mt-9 md:text-[3.5rem] md:leading-[1.52]">
                月に一度、
                <br />
                今池で向かい合う60分。
              </h1>
            </Reveal>
            <Reveal delay={200}>
              <p className="mt-7 inline-flex items-center gap-3 border-2 border-ink bg-brand-yellow px-5 py-2 font-body text-xs font-bold text-ink md:text-sm">
                <Equalizer className="text-ink" />
                2026.05 — 2027.03 期間限定
              </p>
            </Reveal>
            <Reveal delay={260}>
              <p className="mt-7 max-w-xl font-body text-sm leading-9 text-ink-soft md:text-base md:leading-10">
                「定期的に通うのは難しいけれど、対面でしっかり学びたい」。
                そんな方のための、1回から受けられるスポットレッスンです。
                グランドピアノのあるスタジオで、コルテス・ポール先生とじっくり向かい合いましょう。
              </p>
            </Reveal>
            <Reveal
              delay={330}
              className="mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7"
            >
              <a
                href={IMAIKE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary text-base"
              >
                レッスンを申し込む
                <span className="font-en text-sm font-medium text-paper/75">60min ¥10,000</span>
              </a>
              <a
                href="#price"
                className="font-en text-sm tracking-[0.16em] text-ink underline decoration-violet/50 underline-offset-[6px] transition-opacity duration-200 hover:opacity-55"
              >
                VIEW PRICE
              </a>
            </Reveal>
          </div>

          {/* 刷り上がった写真を1枚、版ズレを添えて貼る */}
          <Reveal delay={180} y={44} className="relative mt-14 md:col-span-5 md:mt-0">
            <div className="relative rotate-[-1.5deg]">
              <div
                aria-hidden="true"
                className="absolute inset-0 translate-x-3 translate-y-3 bg-magenta-soft"
              />
              <div className="relative aspect-[4/3] w-full overflow-hidden border-2 border-ink">
                <Image
                  src="/images/teacher-paul.jpeg"
                  alt="グランドピアノを演奏するコルテス・ポール先生"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  priority
                  className="object-cover"
                />
              </div>
            </div>
            <p className="tategaki absolute -right-11 top-2 hidden font-body text-[0.7rem] tracking-[0.3em] text-ink-soft lg:block">
              ポール先生による対面スポットレッスン
            </p>
          </Reveal>
        </div>
      </section>

      {/* ================== インクベタの帯（トップは紙、こちらは黒） ================== */}
      <div className="relative overflow-hidden bg-ink py-4">
        <div className="flex w-max motion-safe:animate-marquee" aria-hidden="true">
          {[0, 1].map((copy) => (
            <div key={copy} className="flex items-center">
              {BAND_WORDS.map((word, i) => (
                <span key={`${copy}-${word}`} className="flex items-center">
                  <span className="whitespace-nowrap px-6 font-en text-sm tracking-[0.26em] text-brand-yellow md:px-9 md:text-base">
                    {word}
                  </span>
                  <SingleNote
                    className="w-3.5 shrink-0 md:w-4"
                    color={["#fadc46", "#e21bd5", "#72dafe", "#fadc46"][i % 4]}
                  />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ===================== ABOUT（罫紙に貼った一枚の紙） ===================== */}
      <section className="relative overflow-hidden bg-paper-deep px-4 py-20 md:px-8 md:py-28">
        <FloatingIllust
          className="right-[-2.5rem] top-10 w-28 md:right-[4%] md:w-36"
          speed={0.26}
          rotate={11}
          driftMs={8600}
        >
          <SheetMusic className="w-full" />
        </FloatingIllust>

        <Reveal className="relative mx-auto max-w-3xl" y={38}>
          <div className="relative rotate-[-0.5deg] border-2 border-ink bg-paper px-6 py-12 md:px-16 md:py-16">
            <span
              aria-hidden="true"
              className="absolute -top-3 left-1/2 h-6 w-24 -translate-x-1/2 rotate-[-1deg] bg-yellow-soft/80"
            />
            <SectionLabel tone="magenta">ABOUT</SectionLabel>
            <div className="mt-10 space-y-9">
              {[
                ["同じ部屋で、同じピアノに向かう。"],
                [
                  "画面越しには、渡しきれないものがあります。",
                  "鍵盤の底までの深さ、ペダルの重み、",
                  "隣で鳴った音への、返事のはやさ。",
                ],
                [
                  "月に一度で、かまいません。",
                  "向かい合って弾く60分が、",
                  "そのあとのひと月の練習を変えます。",
                ],
                ["毎週通わなくても大丈夫。", "気になった月だけ、ふらりとお越しください。"],
              ].map((block, bi) => (
                <p
                  key={bi}
                  className="font-body text-[0.95rem] leading-[2.5] tracking-wide text-ink md:text-lg md:leading-[2.5]"
                >
                  {block.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* ============ POINT（トップの黒地グリッドに対し、紙地の番号組み） ============ */}
      <section id="point" className="relative overflow-hidden bg-paper px-4 py-20 md:px-8 md:py-28">
        <FloatingIllust
          className="left-[-3rem] bottom-16 hidden w-36 md:block"
          speed={0.2}
          rotate={-12}
          driftMs={9800}
        >
          <Headphones className="w-full" />
        </FloatingIllust>

        <div className="relative mx-auto max-w-6xl">
          <Reveal className="md:flex md:items-end md:justify-between md:gap-12">
            <div>
              <SectionLabel tone="magenta">POINT</SectionLabel>
              <h2 className="mt-6 font-display text-2xl font-bold leading-[1.7] text-ink md:text-4xl md:leading-[1.6]">
                今池のレッスン、
                <br />
                6つのこと。
              </h2>
            </div>
            <p className="mt-6 max-w-md font-body text-sm leading-8 text-ink-soft md:mt-0">
              入会金も、毎週の予定合わせも要りません。受けたい月に1回だけ申し込む——
              それがこのレッスンのかたちです。
            </p>
          </Reveal>

          <ul className="mt-12 md:mt-16 md:grid md:grid-cols-2 md:gap-x-14">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p.en} delay={(i % 2) * 90} className="border-t border-ink/20">
                <div className="flex gap-5 py-7 md:gap-8">
                  <span className="font-en text-2xl leading-none text-magenta md:text-3xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="flex-1">
                    <p className="font-en text-[0.7rem] tracking-[0.24em] text-ink-soft">{p.en}</p>
                    <h3 className="mt-2 font-display text-lg font-bold leading-[1.6] text-ink md:text-xl">
                      {p.title}
                    </h3>
                    <p className="mt-3 font-body text-sm leading-8 text-ink-soft">{p.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ======================== INSTRUCTOR ======================== */}
      <section id="teacher" className="relative overflow-hidden bg-paper px-4 pb-20 md:px-8 md:pb-28">
        <div className="relative mx-auto max-w-6xl border-t-2 border-ink pt-14 md:grid md:grid-cols-12 md:gap-12 md:pt-20">
          <Reveal className="md:col-span-5">
            <SectionLabel tone="magenta">INSTRUCTOR</SectionLabel>
            <div className="mt-8 flex items-center gap-5">
              <div className="relative h-24 w-24 shrink-0 rotate-[-3deg] overflow-hidden border-2 border-ink md:h-28 md:w-28">
                <Image
                  src="/images/teacher-paul-portrait.jpeg"
                  alt="コルテス・ポール先生"
                  fill
                  sizes="112px"
                  className="object-cover object-top"
                />
              </div>
              <div>
                <h2 className="font-display text-2xl font-bold text-ink md:text-3xl">
                  コルテス・ポール
                </h2>
                <p className="mt-2 font-en text-xs tracking-[0.2em] text-ink-soft md:text-sm">
                  PAUL CORTEZ
                </p>
              </div>
            </div>
            <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-yellow px-4 py-1.5 font-body text-xs font-bold text-ink">
              <Equalizer className="text-ink" />
              今池・対面レッスン 受付中
            </p>
          </Reveal>

          <Reveal delay={140} className="mt-10 md:col-span-7 md:mt-0">
            <p className="font-body text-sm leading-9 text-ink-soft md:text-base md:leading-10">
              幼少期から音楽に親しみ、11歳からギターを始め、ポップスやブルースを中心に演奏。高校卒業後にジャズピアノと出会い、後藤浩二氏に師事。さらにPeter
              Martin氏から学び、音楽の幅を広げる。現在はジャズを中心に、名古屋のライブハウスや四日市ジャズフェスティバルなどのイベントに出演するほか、オリジナル曲の作曲にも積極的に取り組んでいる。
            </p>
            <p className="mt-7 border-l-2 border-magenta pl-5 font-body text-sm leading-9 text-ink">
              日本語・英語どちらでもレッスンが可能です。
              <span className="mt-1 block font-en text-xs tracking-[0.12em] text-ink-soft">
                Lessons available in both Japanese and English.
              </span>
            </p>
            <Link
              href="/#lesson"
              className="group mt-8 inline-flex items-center gap-3 font-en text-sm tracking-[0.16em] text-ink"
            >
              ONLINE LESSON
              <span className="font-body text-xs text-ink-soft">オンラインレッスンはこちら</span>
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-300 ease-out group-hover:translate-x-1">
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* =================== PRICE（半券としての料金表） =================== */}
      <section id="price" className="relative">
        <Curve className="block h-12 w-full text-ink md:h-20" />
        <div className="relative overflow-hidden bg-ink px-4 pb-24 pt-8 text-paper md:px-8 md:pb-32">
          <StaffLine className="pointer-events-none absolute inset-x-0 bottom-8 h-20 w-full text-paper opacity-20" />

          <div className="relative mx-auto max-w-4xl">
            <Reveal>
              <SectionLabel tone="yellow">PRICE</SectionLabel>
              <h2 className="mt-6 font-display text-2xl font-bold leading-[1.7] text-paper md:text-4xl">
                料金
              </h2>
            </Reveal>

            {/* 切り取り線と丸穴で、1回券の半券に見立てる */}
            <Reveal delay={120} y={38} className="mt-12 md:mt-16">
              <div className="relative border-2 border-paper bg-paper text-ink">
                <div className="px-6 py-8 md:px-12 md:py-10">
                  <p className="font-en text-xs tracking-[0.26em] text-magenta">
                    ADMIT ONE — SPOT LESSON
                  </p>
                  <dl className="mt-6">
                    {PRICES.map((row) => (
                      <div
                        key={`${row.label}-${row.minutes}`}
                        className="flex flex-wrap items-baseline justify-between gap-3 border-t border-ink/20 py-5 first:border-t-0 first:pt-0"
                      >
                        <dt className="font-body text-sm text-ink md:text-base">
                          {row.label}
                          <span className="ml-3 font-en text-xs tracking-[0.14em] text-ink-soft">
                            {row.minutes}
                          </span>
                        </dt>
                        <dd className="font-en text-3xl font-semibold text-ink md:text-4xl">
                          {row.price}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                {/* 切り取り線 */}
                <div className="relative border-t-2 border-dashed border-ink/40">
                  <span
                    aria-hidden="true"
                    className="absolute -left-4 -top-3.5 h-7 w-7 rounded-full bg-ink"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute -right-4 -top-3.5 h-7 w-7 rounded-full bg-ink"
                  />
                </div>

                <div className="px-6 py-6 md:px-12">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <p className="font-body text-xs leading-7 text-ink-soft">
                      いずれも1回あたりの料金です。入会金・継続の契約はありません。
                    </p>
                    <p className="font-en text-xs tracking-[0.24em] text-ink">60 MIN / 1 LESSON</p>
                  </div>
                  {/* 半券の中は紙地なので、決済ブランドはここに刷る */}
                  <PaymentBrands
                    className="mt-6 border-t border-ink/15 pt-6"
                    label="月初めにお送りする請求書から、各カードでお支払いいただけます。"
                  />
                </div>
              </div>
            </Reveal>

            <Reveal delay={220}>
              <p className="mt-8 font-body text-xs leading-7 text-paper/70">
                お支払いはクレジットカード決済のみとなります。月初めにウェブ決済のできる請求書をメールでお送りしますので、レッスン当日までにお支払いください。
              </p>
            </Reveal>
          </div>
        </div>
        <Curve className="block h-12 w-full rotate-180 text-ink md:h-20" />
      </section>

      {/* ==================== GUIDE（フライヤーの注意書き） ==================== */}
      <section id="policy" className="relative overflow-hidden bg-paper px-4 py-20 md:px-8 md:py-28">
        <div className="relative mx-auto max-w-6xl">
          <Reveal>
            <SectionLabel tone="magenta">GUIDE</SectionLabel>
            <h2 className="mt-6 font-display text-2xl font-bold leading-[1.7] text-ink md:text-4xl">
              受講のご案内
            </h2>
          </Reveal>

          <div className="mt-12 grid gap-6 md:mt-16 md:grid-cols-3">
            {GUIDES.map((g, i) => (
              <Reveal key={g.en} delay={i * 100} className="border border-ink/25 bg-paper-deep p-6 md:p-7">
                <p className="font-en text-[0.7rem] tracking-[0.24em] text-magenta">{g.en}</p>
                <h3 className="mt-3 font-display text-base font-bold text-ink md:text-lg">
                  {g.title}
                </h3>
                <p className="mt-3 font-body text-sm leading-8 text-ink-soft">{g.body}</p>
              </Reveal>
            ))}
          </div>

          {/* 期間限定であることは、このページで一番伝わってほしい約束 */}
          <Reveal delay={200} className="mt-12 md:mt-16">
            {/* 黄地に黄のイラストは沈むため、ここは黒盤のレコードを置く */}
            <div className="flex flex-col gap-6 border-2 border-ink bg-brand-yellow px-6 py-9 md:flex-row md:items-center md:gap-10 md:px-12 md:py-11">
              <Record className="w-14 shrink-0 motion-safe:animate-spin-slow md:w-16" />
              <div>
                <p className="font-en text-xs tracking-[0.26em] text-ink">LIMITED PERIOD</p>
                <p className="mt-4 font-display text-lg font-bold leading-[1.8] text-ink md:text-2xl">
                  2026年5月から2027年3月までの、期間限定レッスンです。
                </p>
                <p className="mt-3 font-body text-sm leading-8 text-ink/75">
                  お会いできる月は多くありません。気になっている方は、どうぞお早めに。
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ========================== ACCESS ========================== */}
      <section id="access" className="relative overflow-hidden bg-paper px-4 pb-24 md:px-8 md:pb-32">
        <FloatingIllust
          className="right-[-2.5rem] bottom-4 hidden w-32 md:block"
          speed={0.2}
          rotate={13}
          driftMs={9400}
        >
          <BeamedNotes className="w-full" />
        </FloatingIllust>

        <div className="relative mx-auto max-w-6xl md:grid md:grid-cols-12 md:gap-12">
          <Reveal className="md:col-span-5">
            <SectionLabel tone="magenta">ACCESS</SectionLabel>
            <h2 className="mt-6 font-display text-2xl font-bold leading-[1.7] text-ink md:text-3xl">
              会場とスケジュール
            </h2>
          </Reveal>
          <Reveal delay={120} className="mt-8 md:col-span-7 md:mt-2">
            <dl className="border-t border-rule">
              {ACCESS_ROWS.map((row) => (
                <div key={row.en} className="flex gap-6 border-b border-rule py-5">
                  <dt className="w-24 shrink-0 font-en text-xs tracking-[0.2em] text-ink-soft">
                    {row.en}
                  </dt>
                  <dd className="font-body text-sm leading-8 text-ink">{row.body}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 font-body text-xs leading-7 text-ink-soft">
              開催日と会場の詳しい場所は、お申し込みの際にご案内します。
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
