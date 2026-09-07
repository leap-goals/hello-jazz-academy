import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

/*
 * 受講のご案内(FAQ)。
 *
 * もとはトップの1セクションだったが、LPが長くなったので独立させた。
 * トップの「入会までの流れ」の下からここへ送り出している。
 *
 * 組み方は他の下層ページとも変える。ここは索引なので、
 * 見出しと罫線だけの1本の版面に、開閉できる質問を積む。
 */

const DESCRIPTION =
  "Hello Jazz Academyのオンラインジャズピアノレッスンについて、教材・ZoomやFaceTimeの設定・レッスンスケジュール・キャンセルポリシー・休会と退会のご案内をまとめています。";

const TITLE = "受講のご案内（よくあるご質問） | Hello Jazz Academy";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "article",
    locale: "ja_JP",
    siteName: "Hello Jazz Academy",
    url: "https://www.hellojazzacademy.com/faq/",
    title: TITLE,
    description: DESCRIPTION,
  },
};

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


// 構造化データは画面に出ている質問と回答をそのまま使う
const FAQ_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_GROUPS.flatMap((group) =>
    group.items.map((item) => ({
      "@type": "Question",
      name: item.title,
      acceptedAnswer: { "@type": "Answer", text: item.paragraphs.join("\n") },
    })),
  ),
};

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


export default function Faq() {
  return (
    <main id="top" className="flex-1">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(FAQ_JSON_LD) }}
      />

      {/* ============================== HERO ============================== */}
      <section className="section-tight pt-28 md:pt-36">
        <div className="container-page">
          <Reveal className="measure">
            <SectionLabel>Guide</SectionLabel>
            <h1 className="heading mt-6">受講のご案内</h1>
            <p className="lead mt-8">
              教材や機材の準備から、スケジュール・キャンセル・休会や退会の扱いまで、受講にあたってよくいただくご質問をまとめました。
            </p>
          </Reveal>
        </div>
      </section>

      {/* =============================== FAQ =============================== */}
      <section className="section pt-0 md:pt-0">
        <div className="container-page">
          <div className="mx-auto max-w-3xl border-t border-ink pt-10">
            {FAQ_GROUPS.map((group, gi) => (
              <Reveal key={group.label} delay={gi * 60} className="mt-12 first:mt-0">
                {/* 和文の小見出しは字送りを詰める。欧文ラベルと同じ組みにすると読めなくなる */}
                <h2 className="text-[0.8125rem] font-medium tracking-[0.06em] text-ink-faint">
                  {group.label}
                </h2>
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
    </main>
  );
}
