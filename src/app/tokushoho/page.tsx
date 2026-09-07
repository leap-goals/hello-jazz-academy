import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { FAQ_PATH, IMAIKE_PATH, TRIAL_FORM_URL } from "@/components/SiteHeader";

/*
 * 特定商取引法に基づく表記。
 * プライバシーポリシーと同じ、1本の狭い版面だけで進む簡潔な作り。暗い面は置かない。
 *
 * 個人事業(河地里咲名義)のため、電話番号・所在地の番地等は常時公開せず、
 * 「請求があれば遅滞なく開示する」形にしている。これは特商法上認められた
 * 個人運営者向けの一般的な扱いであり、省略ではなく法令に沿った記載方法。
 */

const DESCRIPTION =
  "Hello Jazz Academyの特定商取引法に基づく表記です。事業者情報、料金、お支払い方法、キャンセルポリシーなどをご案内します。";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | Hello Jazz Academy",
  description: DESCRIPTION,
  openGraph: {
    type: "article",
    locale: "ja_JP",
    siteName: "Hello Jazz Academy",
    url: "https://www.hellojazzacademy.com/tokushoho/",
    title: "特定商取引法に基づく表記 | Hello Jazz Academy",
    description: DESCRIPTION,
  },
};

export default function Tokushoho() {
  const rows: { en: string; body: React.ReactNode }[] = [
    { en: "Seller", body: "Hello Jazz Academy" },
    { en: "Director", body: "河地 里咲" },
    { en: "Address", body: "愛知県名古屋市天白区（ご請求をいただいた場合には、遅滞なく開示いたします）" },
    { en: "Tel", body: "ご請求をいただいた場合には、遅滞なく開示いたします。" },
    {
      en: "Contact",
      body: (
        <a
          href={TRIAL_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="link-quiet"
        >
          お問い合わせフォーム
        </a>
      ),
    },
    {
      en: "Price",
      body: (
        <>
          体験レッスン ¥3,000（45分）。継続レッスンの料金は
          <Link href="/#price" className="link-quiet mx-1">
            オンラインレッスンの料金
          </Link>
          および
          <Link href={`${IMAIKE_PATH}#price`} className="link-quiet mx-1">
            今池の対面レッスンの料金
          </Link>
          をご覧ください。
        </>
      ),
    },
    { en: "Extra fee", body: "商品代金以外に必要な料金はありません。ご利用の通信費・機材等はお客様のご負担となります。" },
    { en: "Payment", body: "クレジットカード決済（Square請求書によるオンライン決済）" },
    {
      en: "Timing",
      body: "体験レッスンはお申し込み後にお送りする請求書にてレッスン当日までにお支払いください。継続レッスンは月初めにお送りする請求書の指定期日までにお支払いください。",
    },
    {
      en: "Delivery",
      body: "お申し込み・お支払いの確認後、日程を調整のうえレッスンを提供します。",
    },
    {
      en: "Cancellation",
      body: (
        <>
          キャンセル・振替の扱いは
          <Link href={FAQ_PATH} className="link-quiet mx-1">
            受講のご案内（よくあるご質問）
          </Link>
          および各レッスンページの記載に準じます。レッスンはその場でお届けする役務のため、実施後の返金はいたしかねます。
        </>
      ),
    },
    {
      en: "Environment",
      body: "Zoom またはFaceTimeを利用できるインターネット環境、カメラ・マイクを備えた端末が必要です。",
    },
  ];

  return (
    <main id="top" className="flex-1">
      {/* ============================== HERO ============================== */}
      <section className="section-tight pt-28 md:pt-36">
        <div className="container-page">
          <Reveal className="measure mx-auto text-center">
            <SectionLabel>Legal</SectionLabel>
            <h1 className="heading mt-6">特定商取引法に基づく表記</h1>
          </Reveal>
        </div>
      </section>

      {/* ============================= BODY ============================= */}
      <section className="section pt-0 md:pt-0">
        <div className="container-page">
          <div className="measure mx-auto border-t border-rule pt-10">
            <dl>
              {rows.map((row) => (
                <div
                  key={row.en}
                  className="flex flex-col gap-1.5 border-b border-rule py-5 sm:flex-row sm:gap-8"
                >
                  <dt className="eyebrow eyebrow-faint shrink-0 pt-1 sm:w-28">{row.en}</dt>
                  <dd className="body-text">{row.body}</dd>
                </div>
              ))}
            </dl>

            <p className="caption mt-10 border-t border-rule pt-6">最終改定日：2026年9月7日</p>
          </div>
        </div>
      </section>
    </main>
  );
}
