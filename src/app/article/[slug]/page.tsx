import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { firstCitations, SourceRefs } from "@/components/SourceRefs";
import { Breadcrumb } from "@/components/article/meta/Breadcrumb";
import { Byline } from "@/components/article/meta/Byline";
import { Corrections } from "@/components/article/meta/Corrections";
import { SourceList } from "@/components/article/meta/SourceList";
import { articlePath, articles, getArticle } from "@/content/articles";
import { articleJsonLd } from "@/lib/jsonld";
import { articleMarkdownPath } from "@/lib/markdown";
import { articleReadingMinutes } from "@/lib/reading-time";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;
export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const article = getArticle((await params).slug);
  if (!article) return {};
  const path = articlePath(article);
  return {
    title: article.question,
    description: article.answer,
    alternates: { canonical: path, types: { "text/markdown": articleMarkdownPath(article), "application/rss+xml": "/rss.xml" } },
    openGraph: {
      type: "article", url: path, title: article.question, description: article.answer,
      publishedTime: article.datePublished, modifiedTime: article.dateModified,
      ...(article.image ? { images: [{ url: article.image.src, alt: article.image.alt }] } : {}),
    },
    twitter: { card: article.image ? "summary_large_image" : "summary", title: article.question, description: article.answer },
  };
}

export default async function MagazineArticlePage({ params }: Props) {
  const article = getArticle((await params).slug);
  if (!article) notFound();
  const citations = firstCitations([
    article.answerSourceIds,
    ...article.body.flatMap((section) => section.paragraphs.map((paragraph) => paragraph.sourceIds)),
  ]);
  let citationIndex = 1;
  const sectionName = { transfer: "갈아타다", walk: "걷다", see: "보다", change: "바뀌다" }[article.section];

  return <>
    <JsonLd data={articleJsonLd(article)} />
    <article className="page-wrap pb-16">
      <div className="pt-1"><Breadcrumb items={[{ name: site.name, href: "/" }, { name: article.question }]} /></div>
      <div className="mx-auto max-w-3xl">
        <header className="mt-8 border-t-2 border-ink pt-6">
          <p className="text-label">#{sectionName}</p>
          <h1 className="mt-4 text-h1 break-keep">{article.question}</h1>
          <p className="mt-5 text-lead">{article.answer}<SourceRefs ids={article.answerSourceIds} sources={article.sources} anchorIds={citations[0]} /></p>
          <div className="mt-4"><Byline author={site.author} published={article.datePublished} modified={article.dateModified} readingMinutes={articleReadingMinutes(article)} /></div>
        </header>
        {article.image && <figure className="mt-8">
          <Image src={article.image.src} alt={article.image.alt} width={article.image.width} height={article.image.height} priority sizes="(min-width: 768px) 768px, calc(100vw - 40px)" className="h-auto w-full rounded-xl" />
          <figcaption className="mt-2 text-caption">{article.image.caption}</figcaption>
        </figure>}
        <div className="mt-12 space-y-16">
          {article.body.map((section) => <section key={section.heading}>
            <h2 className="text-h2">{section.heading}</h2>
            <div className="mt-6 space-y-5">
              {section.paragraphs.map((paragraph) => {
                const anchors = citations[citationIndex++];
                return <p key={paragraph.text} className="text-body">{paragraph.text}<SourceRefs ids={paragraph.sourceIds} sources={article.sources} anchorIds={anchors} /></p>;
              })}
            </div>
          </section>)}
        </div>
        <nav aria-label="관련 기사" className="my-16 border-t-2 border-ink pt-4">
          <h2 className="text-h2">이어 읽기</h2>
          <ul className="mt-4 divide-y divide-rule">{article.related.map((related) => <li key={related.href}>
            <Link href={related.href} className="pressable block py-4 text-body underline underline-offset-4 hover:bg-slab">{related.title} <span aria-hidden="true">→</span></Link>
          </li>)}</ul>
        </nav>
        <SourceList sources={article.sources} />
        {article.corrections?.length ? <div className="mt-12"><Corrections items={article.corrections} /></div> : null}
        <p className="mt-8 text-caption">내용에 오류가 있으면 <Link href="/about/#corrections" className="underline">정정 정책과 연락처</Link>를 확인해 주세요.</p>
      </div>
    </article>
  </>;
}
