import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { TRIAL_FORM_URL } from "@/components/SiteHeader";

/*
 * 教則本・必読書の紹介ページ。
 *
 * 他の下層ページとは違う組み方にする。
 *   教室について … 1本の狭い版面で、見出しと概要だけ
 *   今池       … 写真のヒーローと、2列で流す本文
 *   このページ   … 数字を打った小見出しで章立てし、書籍は罫線で区切って2列に流す。
 *                 冊数が多いので、読み物ではなく「引くための一覧」として組む
 *
 * Amazonへの外部リンクはすべて rel="sponsored nofollow noopener noreferrer" を付ける。
 */

const DESCRIPTION =
  "ジャズピアノの独学や上達に悩む方へ。定番の「黒本」やマーク・レヴィンの理論書から、グルーヴや脳科学・脱力を学べる書籍まで、厳選したおすすめ10冊をレベル別に解説します。";

const TITLE = "ジャズピアノおすすめ教則本＆書籍10選 | Hello Jazz Academy";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "article",
    locale: "ja_JP",
    siteName: "Hello Jazz Academy",
    url: "https://www.hellojazzacademy.com/jazz-piano-books/",
    title: TITLE,
    description: DESCRIPTION,
  },
};

type Book = {
  title: string;
  author?: string;
  summary: string;
  forWhom: string;
  links: { label: string; href: string }[];
};

type Category = { label: string; books: Book[] };

// 実践・理論編。h3の文言は仕様書の見出しをそのまま使う
const METHOD_BOOKS: Category[] = [
  {
    label: "【初心者必携】セッションの定番楽譜集",
    books: [
      {
        title: "ジャズ・スタンダード・バイブル（通称：黒本）",
        summary: "ジャズをやるなら全員必須の楽譜集。セッションやレッスンの共通言語。",
        forWhom: "これからセッションに参加したい方、定番曲を網羅したい方。",
        links: [{ label: "Amazonで詳細を見る", href: "https://link.amazon/B052fQBfp" }],
      },
    ],
  },
  {
    label: "【理論・ヴォイシング】モダンジャズ理論を体系的に学ぶ",
    books: [
      {
        title: "ザ・ジャズ・ピアノ・ブック",
        author: "マーク・レヴィン",
        summary:
          "ジャズピアノ理論の世界的ベストセラー。テンション、コード構造、スケール理論を体系的に網羅。",
        forWhom: "和音の仕組みやモダンジャズ理論を体系的に学びたい方。",
        links: [{ label: "Amazonで詳細を見る", href: "https://link.amazon/B0j8jVImK" }],
      },
      {
        title: "Drop 2 Book（ドロップ2・ブック）",
        author: "マーク・レヴィン",
        summary: "4パート・ハーモニーの基本「Drop 2」に特化した実践的ワークブック。",
        forWhom:
          "両手での豊かなヴォイシング表現や、ソロピアノの響きを補強したい方。（中級向け）",
        links: [{ label: "Amazonで詳細を見る", href: "https://link.amazon/B0dstf4IA" }],
      },
    ],
  },
  {
    label: "【アドリブ・フレージング】ジャズの「言い回し」を身につける",
    books: [
      {
        title: "Barry Harris Method",
        author: "バリー・ハリス",
        summary:
          "ビバップの巨匠バリー・ハリスによるビバップ・スケールやクロマチック・アプローチの真髄。",
        forWhom: "ビバップ特有のフレーズ回しやスウィング感を身体に叩き込みたい方。",
        links: [{ label: "Amazonで詳細を見る", href: "https://link.amazon/B0d77Ruka" }],
      },
      {
        title: "How to Improvise",
        author: "ハル・ガルパー",
        summary:
          "アドリブにおける「聴くこと」「メロディの構築」「前方への推進力」など、実践的メンタル＆フレージングアプローチ。",
        forWhom: "スケールをなぞるだけの形から脱却し、活きたアドリブを弾きたい方。（中級向け）",
        links: [{ label: "Amazonで詳細を見る", href: "https://link.amazon/B05H0Eueq" }],
      },
    ],
  },
  {
    label: "【伴奏・コンピング】バンド演奏で活きるアンサンブル技術",
    books: [
      {
        title: "How to Comp",
        author: "ハル・ガルパー",
        summary:
          "フロントの引き立て方、リズムの挟み方、インタラクティブな伴奏（コンピング）の技術。",
        forWhom: "バンド演奏やセッションで「良いコンピングが分からない」とお悩みの方。（中級向け）",
        links: [{ label: "Amazonで詳細を見る", href: "https://link.amazon/B01IPEjzy" }],
      },
    ],
  },
];

// 科学・身体論編
const SCIENCE_BOOKS: Category[] = [
  {
    label: "【グルーヴ・リズム】ジャズの「ノリ」を論理的に理解する",
    books: [
      {
        title: "ジャズノリをかがくする",
        summary: "なぜジャズのスウィング感やグルーヴが生まれるのかを科学的視点から分析。",
        forWhom: "「楽譜通り弾いてもジャズらしく聞こえない」と悩む方に。",
        links: [
          { label: "Amazon（Kindle / 単行本）", href: "https://link.amazon/B0awFNZ5V" },
          { label: "関連リンク", href: "https://link.amazon/B0j57wKdc" },
        ],
      },
    ],
  },
  {
    label: "【脳科学・神経】効率的な指の運動と上達の仕組み",
    books: [
      {
        title: "ピアニストの脳を科学する",
        author: "古屋晋一",
        summary:
          "ピアニストの高度な脳機能、超絶技巧を可能にするメカニズム、過度な練習による障害のリスクなどを解説。",
        forWhom: "効率的な手指のトレーニングや脳の働きに基づいた練習法を知りたい方。",
        links: [
          { label: "Amazon（Kindle版）", href: "https://link.amazon/B0acossIi" },
          { label: "Amazon（単行本）", href: "https://link.amazon/B0cUQuY8o" },
        ],
      },
    ],
  },
  {
    label: "【身体構造・脱力】無理のない奏法を手に入れる",
    books: [
      {
        title: "ピアニストなら知っておきたい「からだ」のこと（ボディ・マッピング）",
        author: "トーマス・マーク",
        summary:
          "解剖学的に正しい身体の使い方（ボディ・マッピング）を学び、脱力と自由な音色を手に入れる。",
        forWhom: "演奏中に腕や肩が疲れる・痛む方、脱力がうまくいかない方。",
        links: [{ label: "Amazonで詳細を見る", href: "https://link.amazon/B0gl5NL6B" }],
      },
    ],
  },
  {
    label: "【上達論・学習法】練習の質を高めるメンタル＆メカニズム",
    books: [
      {
        title: "天才はディープ・プラクティスと1万時間の法則でつくられる",
        author: "ダニエル・コイル",
        summary:
          "脳の「ミエリン（髄鞘）」を増強する練習（ディープ・プラクティス）がいかにスキルを定着させるかを解明。",
        forWhom: "上達のメカニズムを知りたい方に。",
        links: [
          { label: "Amazon（Kindle版）", href: "https://link.amazon/B01ZXRmMO" },
          { label: "Amazon（単行本）", href: "https://link.amazon/B00s3fc85" },
        ],
      },
    ],
  },
];

// 構造化データは画面に出ている内容だけで組む(見えないものを書くとGoogleの指針に反する)
const BOOK_LIST_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "上達を加速させる！ジャズピアノおすすめ教則本＆書籍",
  description: DESCRIPTION,
  itemListElement: [...METHOD_BOOKS, ...SCIENCE_BOOKS]
    .flatMap((c) => c.books)
    .map((book, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Book",
        name: book.title,
        url: book.links[0].href,
        ...(book.author ? { author: { "@type": "Person", name: book.author } } : {}),
      },
    })),
};

/** 書籍1冊分。罫線で区切るだけに留め、枠や影は置かない */
function BookEntry({ book }: { book: Book }) {
  return (
    <div className="border-t border-rule pt-6">
      {book.author ? <p className="eyebrow eyebrow-faint">{book.author}</p> : null}
      <h4 className={`subheading ${book.author ? "mt-3" : ""}`}>{book.title}</h4>
      <p className="body-text mt-3">{book.summary}</p>
      <p className="body-text mt-3 border-l border-rule-strong pl-4">
        <span className="font-medium text-ink">こんな人へ</span>
        <br />
        {book.forWhom}
      </p>
      <p className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
        {book.links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="sponsored nofollow noopener noreferrer"
            className="link-quiet group"
          >
            {link.label}
            <span
              aria-hidden="true"
              className="figure text-violet transition-transform duration-300 ease-out group-hover:translate-x-1"
            >
              →
            </span>
          </a>
        ))}
      </p>
    </div>
  );
}

/** 章1つ分。番号を打った小見出しの下に、書籍を2列で流す */
function CategoryBlock({ category, index }: { category: Category; index: number }) {
  return (
    <Reveal className="mt-14 first:mt-12 md:mt-20 md:first:mt-16">
      <h3 className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="figure text-2xl leading-none text-violet">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="subheading">{category.label}</span>
      </h3>
      <div className="mt-8 grid gap-x-12 gap-y-10 md:grid-cols-2">
        {category.books.map((book) => (
          <BookEntry key={book.title} book={book} />
        ))}
      </div>
    </Reveal>
  );
}

export default function JazzPianoBooks() {
  return (
    <main id="top" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(BOOK_LIST_JSON_LD) }}
      />

      {/* ============================== HERO ============================== */}
      <section className="section-tight pt-28 md:pt-36">
        <div className="container-page">
          <Reveal>
            <SectionLabel>Books</SectionLabel>
            <h1 className="heading mt-6">
              上達を加速させる！
              <br className="hidden md:block" />
              ジャズピアノおすすめ教則本＆書籍10選
            </h1>
            {/* ステマ規制(景表法)の表示。読者が本文より先に目にする位置に置く */}
            <p className="caption mt-6">本記事にはプロモーションが含まれています。</p>
            <p className="lead measure mt-6">
              「ジャズピアノを始めたいけれど、どの本を買えばいいかわからない」「譜面は読めるのにジャズらしい演奏にならない」と悩んでいるあなたに。
            </p>
          </Reveal>
        </div>
      </section>

      {/* ============================= METHOD ============================= */}
      <section id="method" className="section pt-0 md:pt-0">
        <div className="container-page">
          <Reveal className="border-t border-ink pt-10">
            <SectionLabel>Method books</SectionLabel>
            <h2 className="heading mt-6">
              【実践・理論】レベル・目的別ジャズピアノ教則本6選
            </h2>
          </Reveal>

          {METHOD_BOOKS.map((category, i) => (
            <CategoryBlock key={category.label} category={category} index={i} />
          ))}
        </div>
      </section>

      {/* ============================= SCIENCE ============================= */}
      <section id="science" className="section pt-0 md:pt-0">
        <div className="container-page">
          <Reveal className="border-t border-ink pt-10">
            <SectionLabel>Reading list</SectionLabel>
            <h2 className="heading mt-6">
              【科学・身体論】演奏と練習の効率を劇的に変える必読書4選
            </h2>
          </Reveal>

          {SCIENCE_BOOKS.map((category, i) => (
            <CategoryBlock key={category.label} category={category} index={i} />
          ))}
        </div>
      </section>

      {/* =============================== CTA =============================== */}
      <section id="lesson" className="section pt-0 md:pt-0">
        <div className="container-page">
          <Reveal className="border-t border-ink pt-10">
            <SectionLabel>Lesson</SectionLabel>
            <h2 className="heading mt-6">
              独学で限界を感じたら：
              <br className="hidden md:block" />
              教室での実践レッスンという選択肢
            </h2>
            <p className="lead measure mt-8">
              当教室では、これらの教則本や科学的アプローチを取り入れたオーダーメイドのレッスンを行っています。ぜひ、オンライン体験レッスンで疑問やお悩みをお聞かせください。
            </p>
          </Reveal>

          <Reveal delay={100} className="mt-9">
            <a
              href={TRIAL_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-primary"
            >
              体験レッスンを申し込む
              <span className="btn-note">45min ¥3,000</span>
            </a>
          </Reveal>
        </div>
      </section>
    </main>
  );
}
