import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import PaymentBrands from "@/components/PaymentBrands";
import SectionLabel from "@/components/SectionLabel";
import { StaffLine } from "@/components/Illustrations";
import { riseDelay } from "@/components/motion";
import { IMAIKE_FORM_URL } from "@/components/SiteHeader";

/*
 * 今池(千種区)の対面スポットレッスンLP。
 *
 * 色・書体・罫線・余白のとり方はトップと同じシステムを使う。
 * 違えるのは「組み方」と「主色」の2つだけ。
 *   主色  … トップはバイオレット、こちらはマゼンタ。押せるものの色も入れ替える
 *   ヒーロー … トップは文字だけの全画面。こちらは写真と並べた横組みで、高さも抑える
 *   暗い面 … トップはレッスン紹介に置く。こちらは料金に置く(このページの決め手が価格のため)
 *   本文の並び … トップは「ラベル左・中身右」。こちらは見出しを段の頭に置いて2列で流す
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

// 見出しと欧文ラベルは旧サイト(imaike_jazzpiano_lesson.md)の「01 / FLEXIBLE」等をそのまま引き継ぐ
const POINTS = [
  {
    en: "Flexible",
    title: "単発（スポット）受講OK",
    body: "継続の契約はありません。「今月だけ」「一度だけ」でも歓迎です。通えるときに、通えるぶんだけ。",
  },
  {
    en: "Intensive",
    title: "60分じっくりマンツーマン指導",
    body: "いま抱えている課題も、弾きたい曲も。ひとりぶんの60分を、まるごと使います。",
  },
  {
    en: "Access",
    title: "今池駅より徒歩3分",
    body: "地下鉄東山線・桜通線の今池駅からすぐ。仕事帰りや、お出かけのついでにも立ち寄れます。",
  },
  {
    en: "Quality",
    title: "グランドピアノ完備のスタジオ",
    body: "響きのある部屋で、生ピアノの手ごたえを確かめられます。タッチもペダルも、その場で直せます。",
  },
  {
    en: "Schedule",
    title: "毎月1回開催",
    body: "開催日はお申し込みの際にご案内します。受講経験のある方へはLINEでもお知らせします。",
  },
  {
    en: "English available",
    title: "英語でのピアノレッスンもOK",
    body: "音楽の専門用語を英語で覚えたり、英会話を楽しみながら弾いたり。日本語・英語どちらでも。",
  },
];

const PRICES = [
  { label: "一般", minutes: "60分", price: "¥10,000" },
  { label: "中学生以下", minutes: "60分", price: "¥8,500" },
  { label: "中学生以下", minutes: "30分", price: "¥4,250" },
];

// 旧サイト(imaike_jazzpiano_lesson.md)の文言をそのまま採用
const GUIDES = [
  {
    en: "Cancel policy",
    title: "キャンセルポリシー",
    body: "レッスンより2日前までにご連絡いただいた場合は、振替または全額返金が可能です。それ以降は基本的には振替対応とさせていただきますが、キャンセルされる場合は50%の返金となります。",
  },
  {
    en: "Payment",
    title: "お支払い方法",
    body: "クレジットカード決済のみとなります。ご登録のメールアドレス宛にウェブ決済のできる請求書を月初めにお送りいたします。レッスン当日までにお支払いいただけますようお願いいたします。",
  },
  {
    en: "For repeaters",
    title: "受講経験がある方へ",
    body: "一度でも当教室のレッスンを受講されたことのある方は、申し込みフォームの記入は不要です。LINEにて直接ご連絡ください。",
  },
];

const ACCESS_ROWS = [
  { en: "Place", body: "今池のスタジオ（名古屋市千種区・グランドピアノ完備）" },
  { en: "Access", body: "地下鉄 東山線・桜通線「今池」駅より徒歩3分" },
  { en: "Schedule", body: "毎月1回（2026年5月〜2027年3月の期間限定）" },
  { en: "Lesson", body: "60分マンツーマン／単発受講OK・英語対応可" },
];

export default function ImaikeLesson() {
  return (
    <main id="top" className="flex-1">
      {/* ============================== HERO ============================== */}
      {/* トップと違い、ここは全画面にしない。写真と文字を並べた横組みで始める */}
      <section className="pb-16 pt-28 md:pb-24 md:pt-40">
        <div className="container-page md:grid md:grid-cols-[1.35fr_1fr] md:items-center md:gap-12">
          <div>
            <div className="rise">
              <SectionLabel tone="magenta">In-person spot lesson — Imaike, Nagoya</SectionLabel>
            </div>
            <h1 className="display-compact rise mt-7 md:mt-9" style={riseDelay(70)}>
              月に一度、
              <br />
              今池で向かい合う60分。
            </h1>
            <p
              className="rise mt-7 inline-flex items-center gap-2 rounded-full bg-magenta-tint px-3.5 py-1.5 text-xs font-medium text-magenta"
              style={riseDelay(140)}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
              2026.05 — 2027.03 期間限定
            </p>
            <p className="lead measure rise mt-6" style={riseDelay(200)}>
              「定期的に通うのは難しいけれど、対面でしっかり学びたい」。そんな方のための、1回から受けられるスポットレッスンです。グランドピアノのあるスタジオで、コルテス・ポール先生とじっくり向かい合いましょう。
            </p>
            <div
              className="rise mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7"
              style={riseDelay(260)}
            >
              <a
                href={IMAIKE_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-magenta"
              >
                レッスンを申し込む
                <span className="btn-note">60min ¥10,000</span>
              </a>
              <a href="#price" className="link-quiet">
                料金を見る
              </a>
            </div>
          </div>

          <div className="rise mt-12 md:mt-0" style={riseDelay(140)}>
            <div className="media relative aspect-4/3 w-full">
              <Image
                src="/images/teacher-paul.jpeg"
                alt="グランドピアノを演奏するコルテス・ポール先生"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                priority
                className="object-cover"
              />
            </div>
            <p className="caption mt-4">ポール先生による対面スポットレッスン</p>
          </div>
        </div>
      </section>

      {/* ============================== ABOUT ============================== */}
      {/* トップのABOUTは中央揃えの一段組み。こちらは見出しと本文を左右に振る */}
      <section className="section bg-paper-soft">
        <div className="container-page lg:grid lg:grid-cols-[1fr_1.3fr] lg:gap-12">
          <Reveal>
            <SectionLabel tone="magenta">About</SectionLabel>
            <p className="heading mt-6">
              同じ部屋で、
              <br />
              同じピアノに向かう。
            </p>
          </Reveal>

          <div className="mt-10 space-y-9 lg:mt-0">
            {[
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
              <Reveal key={bi} delay={bi * 70}>
                <p className="prose-quiet">
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

      {/* ============================== POINT ============================== */}
      <section id="point" className="section">
        <div className="container-page">
          <Reveal className="md:flex md:items-end md:justify-between md:gap-14">
            <div>
              <SectionLabel tone="magenta">Point</SectionLabel>
              <h2 className="heading mt-6">
                今池のレッスン、
                <br />
                6つのこと。
              </h2>
            </div>
            <p className="lead measure mt-6 md:mt-0">
              入会金も、毎週の予定合わせも要りません。受けたい月に1回だけ申し込む——それがこのレッスンのかたちです。
            </p>
          </Reveal>

          <ul className="mt-12 md:mt-16 md:grid md:grid-cols-2 md:gap-x-14">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={(i % 2) * 70} className="border-t border-rule">
                <div className="py-7">
                  <p className="eyebrow eyebrow-magenta">{p.en}</p>
                  <h3 className="subheading mt-3">{p.title}</h3>
                  <p className="body-text mt-3">{p.body}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ============================ INSTRUCTOR ============================ */}
      {/* トップは大きな縦位置の写真。こちらは小さく添えるだけに留める */}
      <section id="teacher" className="section-tight">
        <div className="container-page">
          <div className="border-t border-rule pt-12 lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12 lg:pt-16">
            <Reveal>
              <SectionLabel tone="magenta">Instructor</SectionLabel>
              <div className="mt-7 flex items-center gap-5">
                <div className="media relative h-20 w-20 shrink-0 rounded-full md:h-24 md:w-24">
                  <Image
                    src="/images/teacher-paul-portrait.jpeg"
                    alt="コルテス・ポール先生"
                    fill
                    sizes="96px"
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h2 className="heading">コルテス・ポール</h2>
                  <p className="eyebrow eyebrow-faint mt-3">Paul Cortez</p>
                </div>
              </div>
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-magenta-tint px-3.5 py-1.5 text-xs font-medium text-magenta">
                <span className="h-1.5 w-1.5 rounded-full bg-magenta" />
                今池・対面レッスン 受付中
              </p>
            </Reveal>

            <Reveal delay={100} className="mt-9 lg:mt-0">
              <p className="body-text measure">
                幼少期から音楽に親しみ、11歳からギターを始め、ポップスやブルースを中心に演奏。高校卒業後にジャズピアノと出会い、後藤浩二氏に師事。さらに、Peter
                Martin氏から学び、音楽の幅を広げる。現在はジャズを中心に、名古屋のライブハウスや四日市ジャズフェスティバルなどのイベントに出演するほか、オリジナル曲の作曲にも積極的に取り組んでいる。
              </p>
              <p className="body-text measure mt-6 border-l border-rule-strong pl-5">
                日本語・英語どちらでもレッスンが可能です。
                <span className="caption mt-1 block">
                  Lessons available in both Japanese and English.
                </span>
              </p>
              <Link href="/#lesson" className="link-quiet group mt-8">
                オンラインレッスンはこちら
                <span
                  aria-hidden="true"
                  className="figure text-magenta transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================== PRICE ============================== */}
      {/* このページの決め手は価格。トップと違い、暗い面をここに置く */}
      <section id="price" className="surface-ink section relative overflow-hidden">
        <StaffLine className="pointer-events-none absolute inset-x-0 bottom-8 h-20 w-full text-paper opacity-20" />
        <div className="container-page relative lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12">
          <Reveal>
            <SectionLabel tone="cyan">Price</SectionLabel>
            <h2 className="heading mt-6 text-paper">料金</h2>
            <p className="lead measure mt-6">
              いずれも1回あたりの料金です。入会金・継続の契約はありません。
            </p>
          </Reveal>

          <div className="mt-10 lg:mt-0">
            <Reveal delay={80}>
              {/* 決済ブランドの画像は黒のワードマークを含むため、暗い面には直接置けない */}
              <div className="rounded-2xl bg-paper p-6 text-ink md:p-9">
                <dl>
                  {PRICES.map((row, i) => (
                    <div
                      key={`${row.label}-${row.minutes}`}
                      className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 py-5 ${
                        i === 0 ? "pt-0" : "border-t border-rule"
                      }`}
                    >
                      <dt className="text-[0.9375rem] md:text-base">
                        {row.label}
                        <span className="figure ml-3 text-sm text-ink-faint">{row.minutes}</span>
                      </dt>
                      <dd className="figure text-3xl text-ink md:text-[2.25rem]">{row.price}</dd>
                    </div>
                  ))}
                </dl>
                <PaymentBrands
                  className="mt-6 border-t border-rule pt-7"
                  label="月初めにお送りする請求書から、各カードでお支払いいただけます。"
                />
              </div>
            </Reveal>

            <Reveal delay={140}>
              <p className="caption measure mt-7">
                お支払いはクレジットカード決済のみとなります。月初めにウェブ決済のできる請求書をメールでお送りしますので、レッスン当日までにお支払いください。
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================== GUIDE ============================== */}
      <section id="policy" className="section">
        <div className="container-page">
          <Reveal>
            <SectionLabel tone="magenta">Guide</SectionLabel>
            <h2 className="heading mt-6">受講のご案内</h2>
          </Reveal>

          <div className="mt-12 grid gap-x-12 gap-y-9 md:mt-16 md:grid-cols-3">
            {GUIDES.map((g, i) => (
              <Reveal key={g.title} delay={i * 70} className="border-t border-rule pt-6">
                <p className="eyebrow eyebrow-magenta">{g.en}</p>
                <h3 className="subheading mt-3">{g.title}</h3>
                <p className="body-text mt-3">{g.body}</p>
              </Reveal>
            ))}
          </div>

          {/* 期間限定であることは、このページで一番伝わってほしい約束 */}
          <Reveal delay={160} className="mt-14 md:mt-20">
            <div className="flex flex-col gap-5 border-y border-magenta py-10 md:flex-row md:items-center md:justify-between md:gap-12 md:py-12">
              <div>
                <p className="eyebrow eyebrow-magenta">Limited period</p>
                <p className="heading mt-4">
                  2026年5月から2027年3月までの、
                  <br className="hidden lg:block" />
                  期間限定レッスンです。
                </p>
              </div>
              <p className="caption measure shrink-0 md:max-w-xs">
                お会いできる月は多くありません。気になっている方は、どうぞお早めに。
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================== ACCESS ============================== */}
      <section id="access" className="section pt-0 md:pt-0">
        <div className="container-page lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12">
          <Reveal>
            <SectionLabel tone="magenta">Access</SectionLabel>
            <h2 className="heading mt-6">会場とスケジュール</h2>
          </Reveal>
          <Reveal delay={100} className="mt-10 lg:mt-2">
            <dl className="border-t border-rule">
              {ACCESS_ROWS.map((row) => (
                <div
                  key={row.en}
                  className="flex flex-col gap-1.5 border-b border-rule py-5 sm:flex-row sm:gap-8"
                >
                  <dt className="eyebrow eyebrow-faint shrink-0 pt-1.5 sm:w-28">{row.en}</dt>
                  <dd className="text-[0.9375rem] leading-8">{row.body}</dd>
                </div>
              ))}
            </dl>
            <p className="caption mt-6">
              開催日と会場の詳しい場所は、お申し込みの際にご案内します。
            </p>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
