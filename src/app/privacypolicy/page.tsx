import type { Metadata } from "next";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { TRIAL_FORM_URL } from "@/components/SiteHeader";

/*
 * プライバシーポリシー。
 * ABOUTと同じく、1本の狭い版面だけで進む簡潔な作り。暗い面は置かない。
 * 本文はユーザー指定の文言をそのまま掲載する(言い回しは変えない)。
 */

const DESCRIPTION = "Hello Jazz Academyのプライバシーポリシーです。個人情報の取扱いについてご案内します。";

export const metadata: Metadata = {
  title: "プライバシーポリシー | Hello Jazz Academy",
  description: DESCRIPTION,
  openGraph: {
    type: "article",
    locale: "ja_JP",
    siteName: "Hello Jazz Academy",
    url: "https://www.hellojazzacademy.com/privacypolicy/",
    title: "プライバシーポリシー | Hello Jazz Academy",
    description: DESCRIPTION,
  },
};

const SECTIONS = [
  {
    heading: "1. 取得する個人情報",
    lead: "当教室は、お問い合わせ、体験レッスンのお申し込み、および入会手続き等の際に、以下の個人情報を取得することがあります。",
    items: [
      "氏名、フリガナ",
      "住所、電話番号、メールアドレス",
      "年齢、生年月日（または学年）",
      "その他、レッスン実施や各種手続に必要な情報",
    ],
  },
  {
    heading: "2. 個人情報の利用目的",
    lead: "取得した個人情報は、以下の目的で利用いたします。",
    items: [
      "お問い合わせや体験レッスンのお申し込みに対する回答および連絡",
      "レッスンのスケジュール管理、案内、および運営業務",
      "受講料の請求および決済確認",
      "発表会やイベント等に関するご案内および連絡",
      "サービス向上や運営改善のための分析",
    ],
  },
  {
    heading: "3. 個人情報の第三者提供",
    lead: "当教室は、次に掲げる場合を除き、あらかじめご本人の同意を得ることなく第三者に個人情報を提供することはありません。",
    items: [
      "法令に基づく場合",
      "人の生命、身体または財産の保護のために必要がある場合であって、本人の同意を得ることが困難であるとき",
      "業務委託先に対し、利用目的の達成に必要な範囲内で個人情報の取扱いの全部または一部を委託する場合",
    ],
  },
  {
    heading: "4. 個人情報の安全管理",
    body: "当教室は、個人情報の漏洩、滅失または毀損を防止するため、適切な安全管理措置を講じます。",
  },
  {
    heading: "5. 個人情報の開示・訂正・削除",
    body: "ご本人から個人情報の開示、訂正、追加、削除、利用停止のご要望があった場合は、本人確認を行った上で、速やかに対応いたします。",
  },
  {
    heading: "7. プライバシーポリシーの変更",
    body: "当教室は、法令の変更や運営方針の見直しに伴い、本ポリシーを改定することがあります。変更後のプライバシーポリシーは、本ウェブサイトに掲載した時点から効力を生じるものとします。",
  },
];

const CONTACT_ROWS = [
  { en: "Name", body: "Hello Jazz Academy" },
  { en: "Director", body: "河地 里咲" },
  { en: "Address", body: "愛知県名古屋市天白区" },
  { en: "Contact", body: "お問い合わせフォーム", href: TRIAL_FORM_URL },
];

export default function PrivacyPolicy() {
  return (
    <main id="top" className="flex-1">
      {/* ============================== HERO ============================== */}
      <section className="section-tight pt-28 md:pt-36">
        <div className="container-page">
          <Reveal className="measure mx-auto text-center">
            <SectionLabel>Privacy</SectionLabel>
            <h1 className="heading mt-6">プライバシーポリシー</h1>
          </Reveal>
        </div>
      </section>

      {/* ============================= BODY ============================= */}
      <section className="section pt-0 md:pt-0">
        <div className="container-page">
          <div className="measure mx-auto border-t border-rule pt-10">
            <p className="body-text">
              Hello Jazz Academy（以下、「当教室」といいます。）は、お客様の個人情報の取扱いについて、以下のとおりプライバシーポリシー（以下、「本ポリシー」といいます。）を定め、適切な保護に努めます。
            </p>

            {SECTIONS.slice(0, 3).map((section) => (
              <div key={section.heading} className="mt-10">
                <h2 className="subheading">{section.heading}</h2>
                <p className="body-text mt-3">{section.lead}</p>
                <ul className="body-text mt-3 list-disc space-y-1.5 pl-5">
                  {section.items!.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}

            {SECTIONS.slice(3, 5).map((section) => (
              <div key={section.heading} className="mt-10">
                <h2 className="subheading">{section.heading}</h2>
                <p className="body-text mt-3">{section.body}</p>
              </div>
            ))}

            <div className="mt-10">
              <h2 className="subheading">6. お問い合わせ窓口</h2>
              <p className="body-text mt-3">
                当教室の個人情報の取扱いに関するお問い合わせは、下記までご連絡ください。
              </p>
              <dl className="mt-5 border-t border-rule">
                {CONTACT_ROWS.map((row) => (
                  <div
                    key={row.en}
                    className="flex flex-col gap-1.5 border-b border-rule py-4 sm:flex-row sm:gap-8"
                  >
                    <dt className="eyebrow eyebrow-faint shrink-0 pt-1 sm:w-28">{row.en}</dt>
                    <dd className="body-text">
                      {row.href ? (
                        <a
                          href={row.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-quiet"
                        >
                          {row.body}
                        </a>
                      ) : (
                        row.body
                      )}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="mt-10">
              <h2 className="subheading">{SECTIONS[5].heading}</h2>
              <p className="body-text mt-3">{SECTIONS[5].body}</p>
            </div>

            <p className="caption mt-10 border-t border-rule pt-6">
              制定日：2020年8月1日
              <br />
              最終改定日：2026年9月6日
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
