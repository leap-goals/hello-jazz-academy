import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import SectionLabel from "@/components/SectionLabel";
import { formatNewsDate, getAllNewsPosts, getNewsPostBySlug } from "@/lib/news";

/*
 * お知らせ詳細。
 * 本文は旧サイト(WPの'news'投稿)からの書き起こしをそのまま使い、言い回しは変えない。
 * 装飾は最小限にして、読み物としての体裁(見出し・日付・段落)だけを整える。
 */

export function generateStaticParams() {
  return getAllNewsPosts().map((post) => ({ slug: post.slug }));
}

// 完全静的エクスポートのため、ビルド時に生成したスラッグ以外は存在しないものとして扱う
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getNewsPostBySlug(slug);
  if (!post) return {};

  const title = `${post.title} | お知らせ | Hello Jazz Academy`;
  const description = post.metaDescription || post.paragraphs[0]?.slice(0, 110) || post.title;

  return {
    title,
    description,
    openGraph: {
      type: "article",
      locale: "ja_JP",
      siteName: "Hello Jazz Academy",
      url: post.link,
      title,
      description,
      publishedTime: post.date,
      modifiedTime: post.modified,
      images: post.featuredImage ? [{ url: post.featuredImage }] : undefined,
    },
  };
}

export default async function NewsPostPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const post = getNewsPostBySlug(slug);
  if (!post) notFound();

  return (
    <main id="top" className="flex-1">
      <article className="section-tight pt-28 md:pt-36">
        <div className="container-page">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <Link href="/news/" className="link-quiet group">
                <span
                  aria-hidden="true"
                  className="figure text-violet transition-transform duration-300 ease-out group-hover:-translate-x-1"
                >
                  ←
                </span>
                お知らせ一覧
              </Link>
            </Reveal>

            <Reveal delay={80} className="mt-8">
              <SectionLabel>News</SectionLabel>
              <p className="figure caption mt-4">{formatNewsDate(post.date)}</p>
              <h1 className="heading mt-3">{post.title}</h1>
            </Reveal>

            {post.featuredImage ? (
              <Reveal delay={140} className="media relative mt-10 aspect-4/3 w-full md:mt-14">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  sizes="(min-width: 768px) 42rem, 100vw"
                  className="object-cover"
                />
              </Reveal>
            ) : null}

            <Reveal
              delay={post.featuredImage ? 200 : 140}
              className="measure mt-10 flex flex-col gap-5 border-t border-rule pt-10 md:mt-14"
            >
              {post.paragraphs.map((paragraph, i) => (
                <p key={i} className="body-text whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </Reveal>

            <Reveal delay={260} className="mt-14 border-t border-rule pt-8 md:mt-20">
              <Link href="/news/" className="link-quiet group">
                お知らせ一覧に戻る
                <span
                  aria-hidden="true"
                  className="figure text-violet transition-transform duration-300 ease-out group-hover:translate-x-1"
                >
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </article>
    </main>
  );
}
