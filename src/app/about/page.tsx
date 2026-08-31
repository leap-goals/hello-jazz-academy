import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";

/*
 * 教室について。
 *
 * 他の2ページとは違う組み方を選ぶ。
 *   トップ   … ラベル左・中身右の2カラム、暗い面はレッスン紹介に置く
 *   今池     … 写真+横組みのヒーロー、暗い面は料金に置く
 *   このページ … 1本の狭い版面だけで進む、見出しと会社概要だけの簡潔な作り。暗い面は置かない
 *
 * 会社概要は「教室名・代表・創業・事業内容・URL」のみを掲載し、
 * 旧IRページ(商号・決算公告など)の内容は法人成りするタイミングまで反映しない。
 */

const DESCRIPTION =
  "Hello Jazz Academy（ハロージャズ・アカデミー）の教室概要です。代表・創業・事業内容などをご案内します。";

export const metadata: Metadata = {
  title: "教室について | Hello Jazz Academy",
  description: DESCRIPTION,
  openGraph: {
    type: "article",
    locale: "ja_JP",
    siteName: "Hello Jazz Academy",
    url: "https://www.hellojazzacademy.com/about/",
    title: "教室について | Hello Jazz Academy",
    description: DESCRIPTION,
    images: [{ url: "/images/teacher-risaki.jpeg" }],
  },
};

const PROFILE_ROWS = [
  { en: "Name", body: "Hello Jazz Academy（ハロージャズ・アカデミー）" },
  { en: "Founder", body: "河地里咲" },
  { en: "Founded", body: "2020年8月1日" },
  { en: "Business", body: "楽器指導、セミナー・ワークショップ、アプリ制作、音楽教室の運営" },
  { en: "URL", body: "https://www.hellojazzacademy.com/" },
];

export default function About() {
  return (
    <main id="top" className="flex-1">
      {/* ============================== HERO ============================== */}
      <section className="section-tight pt-28 md:pt-36">
        <div className="container-page">
          <Reveal className="measure mx-auto text-center">
            <SectionLabel>About</SectionLabel>
            <h1 className="heading mt-6">教室について</h1>
          </Reveal>
        </div>
      </section>

      {/* ============================= PROFILE ============================= */}
      <section id="profile" className="section pt-0 md:pt-0">
        <div className="container-page lg:grid lg:grid-cols-[minmax(0,4fr)_minmax(0,7fr)] lg:gap-12">
          <Reveal>
            <SectionLabel>Profile</SectionLabel>
            <h2 className="heading mt-6">教室概要</h2>
          </Reveal>

          <Reveal delay={100} className="mt-10 lg:mt-2">
            <dl className="border-t border-rule">
              {PROFILE_ROWS.map((row) => (
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

      {/* ============================ LESSON LINK ============================ */}
      <section className="section-tight pt-0 md:pt-0">
        <div className="container-page">
          <Reveal>
            <Link
              href="/#lesson"
              className="group flex flex-col gap-6 border-y border-rule py-10 transition-colors duration-200 hover:border-violet md:flex-row md:items-center md:justify-between md:py-12"
            >
              <span className="block">
                <span className="eyebrow block">Lesson</span>
                <span className="heading mt-4 block">
                  オンラインジャズピアノレッスンを
                  <br className="hidden md:block" />
                  見てみる。
                </span>
              </span>
              <span className="link-quiet shrink-0">
                レッスンの内容を見る
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
    </main>
  );
}
