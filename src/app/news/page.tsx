import type { Metadata } from "next";
import Link from "next/link";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { formatNewsDate, getAllNewsPosts } from "@/lib/news";

/*
 * お知らせ一覧。
 *
 * トップ・今池ページはどちらも「売るための組み方」だが、ここは違う。
 * 主役は個々の投稿ではなく時系列そのものなので、写真もCTAも置かず、
 * 日付+タイトルだけを罫線で束ねた索引として組む。
 * URLは旧WPの /news/ をそのまま引き継ぐ。
 */

const DESCRIPTION =
  "Hello Jazz Academyからのお知らせ一覧です。レッスンの休止・再開、料金改定、キャンペーンなど、これまでのご案内をまとめています。";

export const metadata: Metadata = {
  title: "お知らせ | Hello Jazz Academy",
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "Hello Jazz Academy",
    url: "https://www.hellojazzacademy.com/news/",
    title: "お知らせ | Hello Jazz Academy",
    description: DESCRIPTION,
  },
};

export default async function NewsIndex() {
  const posts = await getAllNewsPosts();

  return (
    <main id="top" className="flex-1">
      <section className="section-tight pt-28 md:pt-36">
        <div className="container-page">
          <Reveal>
            <SectionLabel>News</SectionLabel>
            <h1 className="heading mt-6">お知らせ</h1>
            <p className="lead measure mt-6">
              レッスンの休止・再開や料金改定、キャンペーンなどのご案内をまとめています。
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section pt-0 md:pt-0">
        <div className="container-page">
          <Reveal as="ul" delay={80} className="border-t border-rule">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/news/${post.slug}/`}
                  className="group flex flex-col gap-1.5 border-b border-rule py-6 transition-colors duration-200 hover:text-violet sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 md:py-7"
                >
                  <span className="flex items-baseline gap-6 sm:gap-8">
                    <span className="figure shrink-0 text-[0.8125rem] text-ink-faint sm:w-24">
                      {formatNewsDate(post.publishedAt)}
                    </span>
                    <span className="text-[0.9375rem] leading-8 md:text-base">{post.title}</span>
                  </span>
                  <span
                    aria-hidden="true"
                    className="figure hidden shrink-0 text-violet transition-transform duration-300 ease-out group-hover:translate-x-1 sm:block"
                  >
                    →
                  </span>
                </Link>
              </li>
            ))}
          </Reveal>
        </div>
      </section>
    </main>
  );
}
