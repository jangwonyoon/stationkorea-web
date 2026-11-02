import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeongsuDiagrams } from "@/components/article/SeongsuDiagrams";
import { StationSign } from "@/components/station-sign/StationSign";
import { ReelLink } from "@/components/article/reading/ReelLink";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { TransferDoors } from "@/components/transfer-doors/TransferDoors";
import { articleGuideSourceIds } from "@/lib/article-guide";
import { JsonLd } from "@/components/JsonLd";
import { firstCitations, SourceRefs } from "@/components/SourceRefs";
import { Breadcrumb } from "@/components/article/meta/Breadcrumb";
import { Byline } from "@/components/article/meta/Byline";
import { Corrections } from "@/components/article/meta/Corrections";
import { SourceList } from "@/components/article/meta/SourceList";
import { articlePath, articles, getArticle } from "@/content/articles";
import { lineName } from "@/content/lines";
import { linePath } from "@/app/line/data";
import { articleJsonLd } from "@/lib/jsonld";
import { articleMarkdownPath } from "@/lib/markdown";
import { articleReadingMinutes } from "@/lib/reading-time";
import { absoluteUrl, site } from "@/lib/site";

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
    article.station?.sourceIds ?? [],
    article.answerSourceIds,
    ...article.body.flatMap((section) => [...section.paragraphs.map((paragraph) => paragraph.sourceIds), ...(section.figure ? [section.figure.sourceIds] : [])]),
    articleGuideSourceIds({ transfers: article.transfers }),
  ]);
  let citationIndex = 2;
  const sectionName = { transfer: "갈아타다", walk: "걷다", see: "보다", change: "바뀌다" }[article.section];
  const breadcrumb = [
    { name: site.name, href: "/" },
    ...(article.station ? [
      { name: lineName(article.station.sign.line), href: linePath(article.station.sign.line) },
      { name: article.station.name },
    ] : [{ name: article.question }]),
  ];
  const jsonLd = articleJsonLd(article).map((node) => node["@type"] === "BreadcrumbList" ? {
    ...node,
    itemListElement: breadcrumb.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name,
      item: absoluteUrl(item.href ?? articlePath(article)),
    })),
  } : node);

  return <>
    <JsonLd data={jsonLd} />
    <article className="page-wrap pb-16">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
        <Breadcrumb items={breadcrumb} />
        <p className="text-label">#{sectionName}</p>
      </div>
      {article.station && <div><StationSign station={article.station} transfers={article.transfers} /><p className="mt-2 text-caption">역명·노선 안내<SourceRefs ids={article.station.sourceIds} sources={article.sources} anchorIds={citations[0]} /></p></div>}
      <div className="mt-8 xl:mt-12">
      <ArticleLayout key={article.slug}>
        <header>
          {article.series && <div className="mb-5">
            <p className="text-label"><span className="mr-3 text-ink-3">#{sectionName}</span><span className="border border-ink px-2 py-1">{article.series.title}</span></p>
            <p className="mt-3 text-caption">{article.series.description}</p>
          </div>}
          <h1 className="text-h1 break-keep xl:text-article-title">{article.question}</h1>
          <p className="mt-5 text-lead">{article.answer}<SourceRefs ids={article.answerSourceIds} sources={article.sources} anchorIds={citations[1]} /></p>
          <div className="mt-4"><Byline author={site.author} published={article.datePublished} modified={article.dateModified} readingMinutes={articleReadingMinutes(article)} /></div>
        </header>
        {article.image && <figure className="mt-8">
          <Image src={article.image.src} alt={article.image.alt} width={article.image.width} height={article.image.height} priority sizes="(min-width: 1280px) 690px, (min-width: 768px) calc(75vw - 53px), calc(100vw - 40px)" className="h-auto w-full rounded-xl" />
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
            {section.figure && <figure className="mt-8 border-t border-ink pt-4">
              <p className="text-label">{section.figure.title}</p>
              <SeongsuDiagrams kind={section.figure.kind} descriptions={section.figure.descriptions} />
              <figcaption className="mt-4 text-caption">{section.figure.caption}<SourceRefs ids={section.figure.sourceIds} sources={article.sources} anchorIds={citations[citationIndex++]} /></figcaption>
              {section.figure.kind === "seongsu-current" && <div className="mt-3 bg-slab p-4 text-sm leading-relaxed">
                <p className="font-semibold">그림을 글로</p>
                <ul className="mt-2 list-disc space-y-1 pl-5">{section.figure.descriptions.map((description) => <li key={description}>{description}</li>)}</ul>
              </div>}
            </figure>}
            {section.scope && <dl className="mt-6 grid divide-y divide-rule border border-rule text-sm leading-relaxed md:grid-cols-2 md:divide-x md:divide-y-0">
              <div className="p-4"><dt className="font-semibold">이 순서로 알 수 있는 것</dt><dd className="mt-2">{section.scope.known}</dd></div>
              <div className="p-4"><dt className="font-semibold">이 자료로는 알 수 없는 것</dt><dd className="mt-2">{section.scope.unknown}</dd></div>
            </dl>}
          </section>)}
        </div>
        {!!article.transfers?.length && <section className="mt-16" aria-labelledby="transfer-guide">
          <h2 id="transfer-guide" className="mb-6 text-h2">어디서 내리면 빠른가</h2>
          <p className="mb-6 text-caption">표의 시간은 자료 기준일의 경로별 참고값입니다. 실제 이동 시간은 보행 속도와 혼잡에 따라 달라집니다.</p>
          <TransferDoors transfers={article.transfers} sources={article.sources} anchorIds={citations.at(-1)} legacyFormation={false} collapsible />
        </section>}
        {article.reel && <div data-rail="reel" className="mt-12"><div><ReelLink reel={article.reel} title={article.question} /></div></div>}
        <div data-rail="next" className="my-16"><div><nav aria-label="관련 기사" className="border-t-2 border-ink pt-4">
          <h2 className="text-h2">이어 읽기</h2>
          <ul className="mt-4 divide-y divide-rule">{article.related.map((related) => <li key={related.href}>
              <Link href={related.href} className="pressable flex items-start justify-between gap-3 py-4 text-body underline underline-offset-4 hover:bg-slab"><span>{related.title}</span><span aria-hidden="true" className="shrink-0">→</span></Link>
          </li>)}</ul>
        </nav></div></div>
        <SourceList sources={article.sources} />
        {article.corrections?.length ? <div className="mt-12"><Corrections items={article.corrections} /></div> : null}
        <p className="mt-8 text-caption">내용에 오류가 있으면 <Link href="/about/#corrections" className="underline">정정 정책과 연락처</Link>를 확인해 주세요.</p>
      </ArticleLayout>
      </div>
    </article>
  </>;
}
