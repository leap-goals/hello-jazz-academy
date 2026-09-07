import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FloatingIllust from "@/components/FloatingIllust";
import NewsTicker from "@/components/NewsTicker";
import { Metronome, Record, StaffLine } from "@/components/Illustrations";
import PaymentBrands from "@/components/PaymentBrands";
import SectionLabel from "@/components/SectionLabel";
import { riseDelay } from "@/components/motion";
import {
  BOOKS_PATH,
  CHORD_TOOL_PATH,
  FAQ_PATH,
  IMAIKE_PATH,
  TRIAL_FORM_URL,
} from "@/components/SiteHeader";
import { INSTAGRAM_ICON, LINE_ICON } from "@/components/snsIconData";
import { getAllNewsPosts } from "@/lib/news";

/*
 * トップ(オンラインレッスン)。
 *
 * 組み方の原則は3つだけ。
 *   1. 面を分けるのは地色と1本の罫線。枠で囲わない、影を落とさない
 *   2. 見出し・本文・注記の3段階だけで階層をつくる。中間の大きさを増やさない
 *   3. 左に欧文ラベル、右に中身。この位置関係を全セクションで崩さない
 * ページの主色はバイオレット。暗い面は「オンラインレッスン」の1章だけに置き、
 * そこがこのページの山だと分かるようにしている。
 */

const AUDIENCE = [
  "教室に通う時間がない",
  "ジャムセッションに挑戦したい",
  "新しい趣味を見つけたい",
  "独学での練習に伸び悩んでいる",
  "アレンジや即興ができるようになりたい",
];

const FEATURES = [
  {
    title: "世界中どこからでも",
    body: [
      "ZOOM または FaceTime を使用したオンラインレッスンで、世界中どこからでも受講可能！",
      "仕事後の夜や朝の出掛ける前など、お好きな時間に待ち時間なくレッスンを受けられるのがオンラインレッスンの魅力です。",
    ],
  },
  {
    title: "一人ひとりの成長に合ったカリキュラム",
    body: [
      "作曲や耳コピ、ハーモナイズした手書き楽譜の添削をはじめ、ご自宅での練習もサポートいたします！",
      "初心者の方もゼロから丁寧に指導。それぞれの目標やペースを大切にし、オーダーメイドのカリキュラムで学べます。",
    ],
  },
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
    major: { label: "ジャズ", percent: 70 },
    minor: { label: "ポップス", percent: 30 },
  },
];

// 入会 → 月謝 の順。体験レッスンの料金は「入会までの流れ」側にバッジ表示するため、料金表には載せない
// 入会金はバッジのように軽く見せる
const PRICES = [
  { label: "入会金（事務手数料）", price: "¥5,000", unit: null, tag: null, variant: "badge" as const },
  {
    label: "オンラインレッスン（月2回・大人）",
    price: "¥12,000",
    unit: "/ 月　45分",
    tag: "人気",
    variant: "main" as const,
  },
  {
    label: "オンラインレッスン（月2回・学生）",
    price: "¥10,000",
    unit: "/ 月　45分",
    tag: null,
    variant: "main" as const,
  },
];

// 申し込みフォーム以外の接点。文言はユーザー指定のものをそのまま置く
// LINEのURLは問い合わせ用の導線として指定されたもので、フッターのアイコン列とは別に持つ
// SNS以外(教則本・ツール)は配布アイコンが無いので、markで指定した印を同じ寸法で置いて行頭を揃える
const SOCIAL_CTA = [
  {
    en: "LINE",
    src: LINE_ICON,
    mark: null,
    title: "公式LINEでお問い合わせ受付中！",
    body: "レッスンや空き状況のご確認など、公式LINEよりお気軽にお問い合わせください。",
    button: "公式LINEを開く",
    href: "https://lin.ee/9RXKZZhd",
  },
  {
    en: "Instagram",
    src: INSTAGRAM_ICON,
    mark: null,
    title: "Instagramでも発信中！",
    body: "レッスンの様子や最新のお知らせ、演奏動画などをInstagramで更新しています。ぜひフォローしてチェックしてみてください！",
    button: "Instagramを見る",
    href: "https://www.instagram.com/hellojazzacademy",
  },
  {
    en: "Books",
    src: null,
    mark: "books" as const,
    title: "おすすめ教則本＆必読書10選",
    body: "定番の「黒本」やマーク・レヴィンの理論書から、グルーヴや脳科学・脱力を学べる書籍まで、レベル・目的別にまとめました。",
    button: "教則本を見る",
    href: BOOKS_PATH,
  },
  {
    en: "Tool",
    src: null,
    mark: "tool" as const,
    title: "コード・スケールアナライザー",
    body: "このコードで使える音は何？がわかるツール「コード・スケールアナライザー」をご用意してます。練習にどうぞご活用ください！",
    button: "ツールを開く",
    href: CHORD_TOOL_PATH,
  },
];

/**
 * SNS以外の項目に置く印。SNSの丸アイコンと寸法を合わせ、行頭を揃えるためだけのもの。
 *   tool  … 鍵盤を3本の白い帯で
 *   books … 開いた本を見開きの2面で
 */
function IconMark({ kind }: { kind: "tool" | "books" }) {
  return (
    <svg viewBox="0 0 96 96" aria-hidden="true" className="w-7 shrink-0 text-violet">
      <circle cx="48" cy="48" r="48" fill="currentColor" />
      {kind === "tool" ? (
        <g fill="#fff">
          <rect x="26" y="30" width="11" height="36" rx="2" />
          <rect x="42" y="30" width="11" height="36" rx="2" />
          <rect x="58" y="30" width="11" height="36" rx="2" />
        </g>
      ) : (
        <g fill="none" stroke="#fff" strokeWidth="5" strokeLinejoin="round">
          <path d="M48 34c-6-5-14-6-21-5v34c7-1 15 0 21 5" />
          <path d="M48 34c6-5 14-6 21-5v34c-7-1-15 0-21 5" />
          <path d="M48 34v34" />
        </g>
      )}
    </svg>
  );
}

// 旧サイト(online.md)の文言をそのまま採用。体験レッスンの料金だけ現行の45分¥3,000に更新している
const FLOW_STEPS = [
  {
    title: "フォームよりお申し込み",
    body: "体験レッスンをご希望の方は、問い合わせフォームからお申し込みください。お申し込み確認後、希望の連絡方法に基づいて、アンケートと日程調整のご連絡を差し上げます。",
  },
  {
    title: "メールを確認",
    body: "ご登録いただいたメールアドレス宛に、体験レッスンの料金を簡単に決済できるウェブ決済(体験レッスン費用¥3,000)の案内をお送りします。お支払いが確認され次第、予約が確定しますので、メールを必ずご確認ください。",
  },
  {
    title: "体験レッスン当日",
    body: "レッスン開始時間になりましたら、事前にお伝えしたZOOMリンクにアクセスし、マイクとカメラをオンにしてください。Facetimeをご利用の場合は、講師からの通話をお待ちください。初めての方でも安心してご参加いただけます。",
  },
  {
    title: "入会申し込み",
    body: "体験レッスン終了後、入会申し込みフォームをお送りいたします。入会手続きが完了次第、初回レッスンの日程や詳細をご案内いたします。",
  },
];

export default async function Home() {
  // 新着順の先頭6件だけを送る。ティッカーは「最新のお知らせ」の索引で、全件表示は/news/の役目
  const posts = await getAllNewsPosts();
  const tickerPosts = posts
    .slice(0, 6)
    .map(({ slug, title, publishedAt }) => ({ slug, title, publishedAt }));

  return (
    <main id="top" className="flex-1">
      {/* ============================== HERO ============================== */}
      {/*
        主役は文字の大きさと余白。写真やイラストで埋めることはしないが、
        天からインクが降りて紙に沈む水彩のウォッシュと、レコードだけは
        このサイトの「顔」として残している。
      */}
      <section className="relative flex min-h-[88svh] flex-col overflow-hidden pb-16 pt-28 md:pb-24 md:pt-36">
        <div
          aria-hidden="true"
          className="speckle-fade pointer-events-none absolute inset-x-0 top-0 h-[34vh]"
          style={{ "--speckle-color": "var(--color-violet)" } as React.CSSProperties}
        />
        <FloatingIllust
          className="right-[-1.5rem] top-[9vh] w-28 md:right-[6%] md:top-[11vh] md:w-48"
          speed={0.3}
          driftMs={9000}
        >
          <Record className="w-full motion-safe:animate-spin-slow" />
        </FloatingIllust>

        <div className="container-page relative flex flex-1 flex-col">
          <div className="my-auto w-full">
            <div className="rise">
              <SectionLabel>Online jazz piano lesson</SectionLabel>
            </div>
            <h1 className="display rise mt-7 md:mt-9" style={riseDelay(70)}>
              自宅ではじめる、
              <br />
              オンラインジャズピアノ。
            </h1>
            <p className="lead measure rise mt-7 md:mt-9" style={riseDelay(140)}>
              キッズから大人ビギナーまで、ジャズ専門ならではの知識と経験でサポートします！音楽で人とつながり、バンドセッションが何倍も楽しくなるジャズピアノの魅力を体験してみませんか？
            </p>
            <div
              className="rise mt-9 flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-7 md:mt-11"
              style={riseDelay(210)}
            >
              <a
                href={TRIAL_FORM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                体験レッスンに申し込む
                <span className="btn-note">45min ¥3,000</span>
              </a>
              <a href="#lesson" className="link-quiet">
                レッスンの内容を見る
              </a>
            </div>

            <div className="rise mt-12 md:mt-16" style={riseDelay(270)}>
              <NewsTicker posts={tickerPosts} />
            </div>
          </div>
        </div>
      </section>

      {/* ============================= ABOUT ============================= */}
      {/* 唯一の「読ませる」ブロック。字間と行間を広げて、読む速度を落とす */}
      <section className="relative overflow-hidden section bg-paper-soft">
        <FloatingIllust
          className="right-[-2rem] top-14 w-28 md:right-[8%] md:w-36"
          speed={0.3}
          rotate={9}
          driftMs={8000}
          driftDelayMs={500}
        >
          <Metronome className="w-full" />
        </FloatingIllust>

        <div className="container-page relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <SectionLabel>About</SectionLabel>
          </Reveal>
          <div className="mx-auto mt-12 max-w-2xl space-y-8 text-center md:mt-16">
            <Reveal>
              <p className="heading">音楽で人々とコミュニケイトする</p>
            </Reveal>
            <Reveal delay={80}>
              <p className="heading">正解のない音楽だからこそ楽しい</p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================ FOR YOU ============================ */}
      <section id="lesson" className="section">
        <div className="container-page lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12">
          <Reveal>
            <SectionLabel>For you</SectionLabel>
            <h2 className="heading mt-6">こんな方におすすめ</h2>
          </Reveal>

          <Reveal as="ul" delay={100} className="mt-10 border-t border-rule lg:mt-2">
            {AUDIENCE.map((text) => (
              <li
                key={text}
                className="border-b border-rule py-5 text-[0.9375rem] leading-8 md:py-6 md:text-lg"
              >
                {text}
              </li>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ========================= ONLINE LESSON ========================= */}
      {/* ページの中で唯一の暗い面。ここがオンラインレッスンの本題 */}
      <section className="surface-ink section relative overflow-hidden">
        <StaffLine className="pointer-events-none absolute inset-x-0 bottom-8 h-20 w-full text-paper opacity-20" />
        <div className="container-page relative">
          <Reveal className="max-w-3xl">
            <SectionLabel tone="cyan">Online lesson</SectionLabel>
            <h2 className="heading mt-6 text-paper">
              スマホ1台で、
              <br />
              自宅が音楽教室になる。
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-x-12 gap-y-10 sm:grid-cols-2 md:mt-20 md:gap-y-14">
            {FEATURES.map((f, i) => (
              <Reveal key={f.title} delay={i * 70} className="border-t border-paper/20 pt-6">
                <h3 className="subheading text-paper">{f.title}</h3>
                {f.body.map((paragraph) => (
                  <p key={paragraph} className="body-text mt-3.5">
                    {paragraph}
                  </p>
                ))}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================== STUDENTS =========================== */}
      <section id="students" className="section">
        <div className="container-page">
          <Reveal>
            <SectionLabel>Students</SectionLabel>
            <h2 className="heading mt-6">生徒さんの割合</h2>
          </Reveal>

          <div className="mt-12 grid gap-14 md:mt-16 md:grid-cols-2 md:gap-20">
            {RATIOS.map((r, i) => (
              <Reveal key={r.title} delay={i * 100}>
                <h3 className="subheading">{r.title}</h3>

                <p className="mt-6 flex items-baseline gap-3">
                  <span className="figure text-[3.25rem] leading-none text-violet md:text-[4rem]">
                    {r.major.percent}
                    <span className="text-[0.4em] align-baseline">%</span>
                  </span>
                  <span className="text-sm font-medium">{r.major.label}</span>
                </p>

                {/* 数字が主役。棒は「どちらが多いか」を一目で分かるようにするだけ */}
                <div
                  className="mt-6 h-1.5 w-full overflow-hidden rounded-full bg-rule"
                  role="img"
                  aria-label={`${r.major.label} ${r.major.percent}パーセント、${r.minor.label} ${r.minor.percent}パーセント`}
                >
                  <div
                    className="h-full rounded-full bg-violet"
                    style={{ width: `${r.major.percent}%` }}
                  />
                </div>

                <div className="mt-3.5 flex items-baseline justify-between">
                  <span className="caption">
                    {r.major.label} {r.major.percent}%
                  </span>
                  <span className="caption">
                    {r.minor.label} {r.minor.percent}%
                  </span>
                </div>

                {r.note ? <p className="caption mt-5">{r.note}</p> : null}
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========================== INSTRUCTOR ========================== */}
      <section id="teacher" className="section bg-paper-soft">
        <div className="container-page">
          <Reveal>
            <SectionLabel>Instructor</SectionLabel>
            <h2 className="heading mt-6">講師紹介</h2>
          </Reveal>

          {/* コルテス・ポール */}
          <article className="mt-14 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-start md:gap-12 md:mt-20">
            <Reveal>
              <div className="media relative aspect-4/5 w-full">
                <Image
                  src="/images/teacher-paul-portrait.jpeg"
                  alt="コルテス・ポール先生"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>

            <div className="mt-9 md:mt-0">
              <Reveal delay={80}>
                <span className="inline-flex items-center gap-2 rounded-full bg-violet-tint px-3.5 py-1.5 text-xs font-medium text-violet">
                  <span className="h-1.5 w-1.5 rounded-full bg-violet" />
                  オンラインレッスン受付中
                </span>
                <h3 className="heading mt-5">コルテス・ポール</h3>
                <p className="eyebrow eyebrow-faint mt-3.5">PAUL CORTEZ — BILINGUAL (JP / EN)</p>
              </Reveal>
              <Reveal delay={140}>
                <p className="body-text measure mt-7">
                  幼少期から音楽に親しみ、11歳からギターを始め、ポップスやブルースを中心に演奏。高校卒業後にジャズピアノと出会い、後藤浩二氏に師事。さらに、Peter
                  Martin氏から学び、音楽の幅を広げる。現在はジャズを中心に、名古屋のライブハウスや四日市ジャズフェスティバルなどのイベントに出演するほか、オリジナル曲の作曲にも積極的に取り組んでいる。
                </p>
                <p className="body-text measure mt-5">
                  英語でのレッスンも可能です。英語を学びながらジャズも学びたい方にも。
                </p>

                {/*
                  今池の対面レッスンを担当しているのはポール先生。
                  講師を見て興味を持った人がそのまま辿れるよう、プロフィール直下に導線を置く。
                */}
                <Link
                  href={IMAIKE_PATH}
                  className="group mt-8 flex items-center justify-between gap-6 rounded-2xl border border-rule bg-paper p-6 transition-colors duration-200 hover:border-violet md:p-7"
                >
                  <span className="block">
                    <span className="eyebrow block">In person — Imaike</span>
                    <span className="subheading mt-3 block">
                      今池（千種区）での対面レッスンも担当しています
                    </span>
                    <span className="caption mt-2 block">
                      月1回・60分マンツーマン／単発受講OK・2027年3月までの期間限定
                    </span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="figure shrink-0 text-xl text-violet transition-transform duration-300 ease-out group-hover:translate-x-1"
                  >
                    →
                  </span>
                </Link>
              </Reveal>
            </div>
          </article>

          {/* 河地里咲 */}
          <article className="mt-16 md:grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:items-start md:gap-12 md:mt-24">
            <Reveal className="md:order-2">
              <div className="media relative aspect-4/5 w-full">
                <Image
                  src="/images/teacher-risaki.jpeg"
                  alt="河地里咲先生"
                  fill
                  sizes="(min-width: 768px) 40vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            </Reveal>

            <div className="mt-9 md:order-1 md:mt-0">
              <Reveal delay={80}>
                <span className="inline-flex items-center gap-2 rounded-full border border-rule-strong px-3.5 py-1.5 text-xs font-medium text-ink-soft">
                  <span className="h-1.5 w-1.5 rounded-full bg-ink-faint" />
                  受付休止中
                </span>
                <h3 className="heading mt-5">河地里咲</h3>
                <p className="eyebrow eyebrow-faint mt-3.5">Risaki Kawachi</p>
              </Reveal>
              {/* 旧サイト本文からの書き起こし(WebFetchで現行公開ページを確認済み) */}
              <Reveal delay={140}>
                <p className="body-text measure mt-7">
                  4歳からエレクトーンを始め、その後ピアノへと進む。名古屋音楽大学の音楽療法学科に初めは進学するも、本格的にジャズを学ぶために2年目でジャズポピュラーコース、ジャズピアノ専攻へと転科。在学中、ジャズ、即興、作曲アレンジの分野で著名な水野修平氏に師事。さらに、馬淵明彦氏からダルクローズリトミックを学び、幼児教育への理解を一層深める。現在は、ハロージャズアカデミーの主宰兼講師。
                </p>
                <p className="body-text measure mt-6 border-l border-rule-strong pl-5">
                  現在は、対面・オンラインともに新規レッスンの受付を休止しています。再開の際は「お知らせ」でご案内します。
                </p>
              </Reveal>
            </div>
          </article>
        </div>
      </section>

      {/* ============================= PRICE ============================= */}
      <section id="price" className="section">
        <div className="container-page lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12">
          <Reveal>
            <SectionLabel>Price</SectionLabel>
            <h2 className="heading mt-6">料金</h2>
          </Reveal>

          <div className="mt-10 lg:mt-2">
            <Reveal as="dl" className="border-t border-rule">
              {PRICES.map((row) =>
                row.variant === "badge" ? (
                  <div
                    key={row.label}
                    className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b border-rule py-5"
                  >
                    <dt className="text-[0.9375rem] text-ink-soft md:text-base">{row.label}</dt>
                    <dd>
                      <span className="figure inline-flex items-center rounded-full border border-rule-strong px-4 py-1.5 text-base text-ink">
                        {row.price}
                      </span>
                    </dd>
                  </div>
                ) : (
                  <div
                    key={row.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule py-6"
                  >
                    <dt className="flex items-center gap-3 text-[0.9375rem] md:text-base">
                      {row.label}
                      {row.tag ? (
                        <span className="rounded-full bg-violet-tint px-2.5 py-1 text-[0.6875rem] font-medium text-violet">
                          {row.tag}
                        </span>
                      ) : null}
                    </dt>
                    <dd className="figure text-3xl text-ink md:text-[2.25rem]">
                      {row.price}
                      {row.unit ? (
                        <span className="ml-2 font-body text-sm text-ink-faint">{row.unit}</span>
                      ) : null}
                    </dd>
                  </div>
                ),
              )}
            </Reveal>

            <Reveal delay={120}>
              <PaymentBrands
                className="mt-10 border-t border-rule pt-8"
                label="メールでお送りするSquareの請求書から、各カードでお支払いいただけます。"
              />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ============================== FLOW ============================== */}
      {/* ここだけは順序そのものが情報なので、番号を打つ */}
      <section id="flow" className="section bg-paper-soft">
        <div className="container-page">
          <Reveal>
            <SectionLabel>Flow</SectionLabel>
            <h2 className="heading mt-6">入会までの流れ</h2>
            <div className="lead measure mt-6 flex flex-wrap items-center gap-3">
              <span>体験レッスン　受講料</span>
              <span className="figure inline-flex items-center rounded-full border border-rule-strong px-4 py-1.5 text-base text-ink">
                ¥3,000
              </span>
            </div>
            <p className="caption measure mt-3">
              ※ご入会の場合、体験レッスン受講料は入会金より差し引かせていただきます。
            </p>
          </Reveal>

          <ol className="mt-12 grid gap-x-10 gap-y-9 md:mt-16 md:grid-cols-4 md:gap-x-8">
            {FLOW_STEPS.map((s, i) => (
              <Reveal key={s.title} as="li" delay={i * 80} className="border-t border-ink pt-5">
                <span className="figure block text-2xl leading-none text-violet">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="subheading mt-4">{s.title}</h3>
                <p className="body-text mt-3">{s.body}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={340} className="mt-14 border-t border-rule pt-7 md:mt-20">
            <p className="eyebrow">FAQ</p>
            <Link href={FAQ_PATH} className="link-quiet group mt-4 inline-flex">
              受講のご案内（よくあるご質問）
              <span
                aria-hidden="true"
                className="figure text-violet transition-transform duration-300 ease-out group-hover:translate-x-1"
              >
                →
              </span>
            </Link>
          </Reveal>
        </div>
      </section>

      {/* ============================ IN PERSON ============================ */}
      <section id="imaike" className="section-tight">
        <div className="container-page">
          <Reveal>
            <Link
              href={IMAIKE_PATH}
              className="group flex flex-col gap-6 border-y border-rule py-10 transition-colors duration-200 hover:border-violet md:flex-row md:items-center md:justify-between md:py-12"
            >
              <span className="block">
                <span className="eyebrow block">In person</span>
                <span className="heading mt-4 block">
                  月に一度、今池（千種区）での
                  <br className="hidden md:block" />
                  対面レッスンも実施中。
                </span>
                <span className="caption mt-3 block">2027年3月までの期間限定です。</span>
              </span>
              <span className="link-quiet shrink-0">
                今池のレッスンを見る
                <span
                  aria-hidden="true"
                  className="figure text-violet transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </section>


      {/* ============================== SOCIAL ============================== */}
      {/* 申し込みフォーム(フッター)の手前に、もっと軽い接点を2つ置く */}
      <section id="follow" className="section pt-0 md:pt-0">
        <div className="container-page">
          <Reveal>
            <SectionLabel>Follow</SectionLabel>
          </Reveal>

          <ul className="mt-10 grid gap-x-12 gap-y-10 md:mt-12 md:grid-cols-2">
            {SOCIAL_CTA.map((s, i) => (
              <Reveal as="li" key={s.en} delay={i * 80} className="border-t border-rule pt-6">
                <div className="flex items-center gap-3">
                  {s.mark ? (
                    <IconMark kind={s.mark} />
                  ) : (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      src={s.src!}
                      alt=""
                      width={96}
                      height={96}
                      className="w-7 shrink-0 rounded-full"
                    />
                  )}
                  <p className="eyebrow">{s.en}</p>
                </div>
                <h3 className="subheading mt-4">{s.title}</h3>
                <p className="body-text measure mt-3">{s.body}</p>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary btn-sm mt-6"
                >
                  {s.button}
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>
    </main>
  );
}
