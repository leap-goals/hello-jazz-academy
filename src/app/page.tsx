import Image from "next/image";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import FloatingIllust from "@/components/FloatingIllust";
import NewsTicker from "@/components/NewsTicker";
import { Metronome, Record, StaffLine } from "@/components/Illustrations";
import PaymentBrands from "@/components/PaymentBrands";
import SectionLabel from "@/components/SectionLabel";
import { riseDelay } from "@/components/motion";
import { IMAIKE_PATH, TRIAL_FORM_URL } from "@/components/SiteHeader";
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

// 新着順の先頭6件だけを送る。ティッカーは「最新のお知らせ」の索引で、全件表示は/news/の役目
const TICKER_POSTS = getAllNewsPosts()
  .slice(0, 6)
  .map(({ slug, title, date }) => ({ slug, title, date }));

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
    major: { label: "ジャズ", percent: 60 },
    minor: { label: "ポップス", percent: 40 },
  },
];

// 体験 → 入会 → 月謝 の順。受講を検討する人が払う順番でそのまま並べる
// 体験レッスンは補助的な項目として小さく、入会金はバッジのように軽く見せる
const PRICES = [
  { label: "体験レッスン（45分）", price: "¥3,000", unit: null, tag: null, variant: "compact" as const },
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

// 教材・機材・規約は読み物というより「必要になったとき引く」情報なので、
// 見出しだけを並べて畳んでおき、必要な項目だけ開ける形にする
const FAQ_GROUPS = [
  {
    label: "教材",
    items: [
      {
        title: "教材について",
        paragraphs: [
          "レッスン時に講師から楽譜をpdfで共有させていただき、用意してもらうように指示することもございます。レッスン前に、印刷したり、タブレットで見れるように準備しておきましょう。",
          "その他の教材につきましては、講師から指定のものを生徒様に購入して頂く場合もございます。",
        ],
      },
    ],
  },
  {
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
    label: "受講のご案内",
    items: [
      {
        title: "レッスンスケジュール",
        paragraphs: [
          "レッスンは固定の曜日・時間帯もしくは、毎月予約制で隔週月2回のペースで行います。一度決定したスケジュールを基本としますが、やむを得ない事情でご都合がつかない場合、月に1回まで無料で振替が可能です。振替をご希望の場合は、前日までにご相談いただければ対応が可能ですが、振替がご希望の場合にはお早めにお知らせください。",
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

/** 開閉できる質問1件。marker は縦棒を畳んで + を − に変えるだけに留める */
function Question({ title, paragraphs }: { title: string; paragraphs: string[] }) {
  return (
    <details className="group border-b border-rule [&_summary::-webkit-details-marker]:hidden">
      <summary className="flex cursor-pointer list-none items-start gap-5 py-5 transition-colors duration-200 hover:text-violet">
        <span className="flex-1 text-[0.9375rem] font-medium leading-7 md:text-base">{title}</span>
        <span aria-hidden="true" className="relative mt-2.5 h-3 w-3 shrink-0">
          <span className="absolute left-0 top-1/2 h-px w-full -translate-y-1/2 bg-current" />
          <span className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-current transition-transform duration-300 ease-out group-open:scale-y-0" />
        </span>
      </summary>
      <div className="measure flex flex-col gap-4 pb-7">
        {paragraphs.map((text) => (
          <p key={text} className="body-text">
            {text}
          </p>
        ))}
      </div>
    </details>
  );
}

export default function Home() {
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
              <NewsTicker posts={TICKER_POSTS} />
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
                  現在は休業中のため、対面・オンラインともに新規レッスンの受付を休止しています。再開の際は「お知らせ」でご案内します。
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
                    className={`flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 border-b border-rule ${
                      row.variant === "compact" ? "py-5" : "py-6"
                    }`}
                  >
                    <dt
                      className={`flex items-center gap-3 ${
                        row.variant === "compact"
                          ? "text-sm text-ink-soft md:text-[0.9375rem]"
                          : "text-[0.9375rem] md:text-base"
                      }`}
                    >
                      {row.label}
                      {row.tag ? (
                        <span className="rounded-full bg-violet-tint px-2.5 py-1 text-[0.6875rem] font-medium text-violet">
                          {row.tag}
                        </span>
                      ) : null}
                    </dt>
                    <dd
                      className={`figure text-ink ${
                        row.variant === "compact" ? "text-xl md:text-2xl" : "text-3xl md:text-[2.25rem]"
                      }`}
                    >
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
            <p className="lead measure mt-6">体験レッスン　受講料¥3,000</p>
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
        </div>
      </section>

      {/* =============================== FAQ =============================== */}
      <section id="faq" className="section">
        <div className="container-page lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12">
          <Reveal>
            <SectionLabel>Guide</SectionLabel>
            <h2 className="heading mt-6">受講のご案内</h2>
          </Reveal>

          <div className="mt-10 lg:mt-2">
            {FAQ_GROUPS.map((group, gi) => (
              <Reveal key={group.label} delay={gi * 60} className="mt-12 first:mt-0">
                {/* 和文の小見出しは字送りを詰める。欧文ラベルと同じ組みにすると読めなくなる */}
                <h3 className="text-[0.8125rem] font-medium tracking-[0.06em] text-ink-faint">
                  {group.label}
                </h3>
                <div className="mt-4 border-t border-rule">
                  {group.items.map((item) => (
                    <Question key={item.title} title={item.title} paragraphs={item.paragraphs} />
                  ))}
                </div>
              </Reveal>
            ))}
          </div>
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

      {/* ============================= ACCESS ============================= */}
      <section id="access" className="section pt-0 md:pt-0">
        <div className="container-page lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12">
          <Reveal>
            <SectionLabel>Access</SectionLabel>
            <h2 className="heading mt-6">アクセス</h2>
          </Reveal>
          <Reveal delay={100} className="mt-10 lg:mt-2">
            <dl className="border-t border-rule">
              {[
                { en: "Base", body: "天白教室（名古屋市天白区）" },
                { en: "Online", body: "Zoom / FaceTime（全国・海外から受講可能）" },
                {
                  en: "In person",
                  body: "今池教室（名古屋市千種区）／月1回・2027年3月までの期間限定",
                },
              ].map((row) => (
                <div
                  key={row.en}
                  className="flex flex-col gap-1.5 border-b border-rule py-5 sm:flex-row sm:gap-8"
                >
                  <dt className="eyebrow eyebrow-faint shrink-0 pt-1.5 sm:w-28">{row.en}</dt>
                  <dd className="text-[0.9375rem] leading-8">{row.body}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
