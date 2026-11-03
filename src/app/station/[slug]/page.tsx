import type { Metadata } from "next";
import { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { firstCitations, formatDate, SourceRefs } from "@/components/SourceRefs";
import { Breadcrumb } from "@/components/article/meta/Breadcrumb";
import { Byline } from "@/components/article/meta/Byline";
import { Corrections } from "@/components/article/meta/Corrections";
import { SourceList } from "@/components/article/meta/SourceList";
import { NextQuestion, PullQuote, QnaBlock, ReelLink } from "@/components/article/reading";
import { CompareTable } from "@/components/blocks";
import { StationSign } from "@/components/station-sign";
import { StatTable } from "@/components/stat-table";
import { TransferDoors } from "@/components/transfer-doors";
import { Button } from "@/components/ui/button";
import { linePath } from "@/app/line/data";
import { lineName } from "@/content/lines";
import { getNextStation, getStation, stationPath, stations } from "@/content/stations";
import { stationJsonLd } from "@/lib/jsonld";
import { markdownPath } from "@/lib/markdown";
import { readingMinutes } from "@/lib/reading-time";
import { absoluteUrl, site } from "@/lib/site";
import { ArticleLayout } from "@/components/article/ArticleLayout";
import { StationPhotoCaption } from "@/components/article/StationPhotoCaption";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return stations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getStation((await params).slug);
  if (!s) return {};
  const path = stationPath(s);
  return {
    title: s.seoTitle,
    description: s.answer,
    keywords: [s.name, ...s.lines.map(lineName), `${s.name} 환승`, "서울 지하철", "환승통로"],
    // 페이지 alternates는 레이아웃 값을 덮어쓰므로 RSS도 다시 적는다.
    alternates: { canonical: path, types: { "text/markdown": markdownPath(s), "application/rss+xml": "/rss.xml" } },
    openGraph: {
      type: "article",
      url: path,
      title: s.question,
      description: s.answer,
      publishedTime: s.datePublished,
      modifiedTime: s.dateModified,
      images: [{ url: s.photo?.src ?? s.ogImage, width: s.photo?.width ?? 1200, height: s.photo?.height ?? 630, alt: s.photo?.alt ?? s.question }],
    },
    twitter: { card: "summary_large_image", title: s.question, description: s.answer, images: [s.photo?.src ?? s.ogImage] },
  };
}

export default async function StationPage({ params }: Props) {
  const s = getStation((await params).slug);
  if (!s) notFound();
  const next = getNextStation(s.slug);
  const quote = s.pullQuote ?? s.stats[0];
  const breadcrumb = [
    { name: site.name, href: "/" },
    { name: lineName(s.sign.line), href: linePath(s.sign.line) },
    { name: s.name },
  ];
  const jsonLd = stationJsonLd(s).map((node) => node["@type"] === "BreadcrumbList" ? {
    ...node,
    itemListElement: breadcrumb.map((item, index) => ({
      "@type": "ListItem", position: index + 1, name: item.name,
      item: absoluteUrl(item.href ?? stationPath(s)),
    })),
  } : node);
  const comparisonIds = s.comparison?.rows.flatMap((row) => row.sourceIds) ?? [];
  const [answerAnchors, , ...contentAnchors] = firstCitations([
    s.answerSourceIds ?? [],
    s.stats.flatMap((stat) => stat.sourceIds),
    ...(s.body ?? []).flatMap((section) => section.paragraphs.map((paragraph) => paragraph.sourceIds)),
    ...s.qna.flatMap((qna, index) => index === 0 ? [qna.sourceIds, comparisonIds, quote.sourceIds] : [qna.sourceIds]),
    s.pin.sourceIds,
    s.transfers.map((transfer) => transfer.sourceId),
  ]);
  const pinAnchors = contentAnchors.at(-2) ?? [];
  const transferAnchors = contentAnchors.at(-1) ?? [];
  const bodyCount = (s.body ?? []).reduce((count, section) => count + section.paragraphs.length, 0);
  const bodyAnchors = contentAnchors.slice(0, bodyCount);
  const readingAnchors = contentAnchors.slice(bodyCount, -2);
  let paragraphIndex = 0;

  const illustration = s.crossSection && (
    <figure className="mt-6">
      <div className="relative aspect-4/5 overflow-hidden bg-slab">
        <Image src={s.crossSection.src} alt={s.crossSection.alt} fill priority={!s.body} fetchPriority={s.body ? "auto" : "high"} sizes="(min-width: 1280px) 690px, (min-width: 768px) calc(75vw - 53px), calc(100vw - 40px)" className="object-cover" />
      </div>
      <figcaption className="mt-2 text-caption">{s.crossSection.caption}{s.crossSection.aiGenerated !== false && " AI 시각화 참고 이미지."}</figcaption>
    </figure>
  );

  return (
    <>
      <JsonLd data={jsonLd} />
      <article className="page-wrap pb-16">
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 py-3">
          <Breadcrumb items={breadcrumb} />
          <p className="text-label">#갈아타다 <span className="ml-3 text-ink-3">역 해부 {String(s.no).padStart(2, "0")}</span></p>
        </div>
        <StationSign station={s} transfers={s.transfers} />
        <div className="mt-8 xl:mt-12">
        <ArticleLayout key={s.slug}>
        <header>
          {s.series && <div className="mb-5">
            <p className="text-label"><span className="border border-ink px-2 py-1">{s.series.title}</span></p>
            <p className="mt-3 text-caption">{s.series.description}</p>
          </div>}
          <h1 className="text-h1 break-keep xl:text-article-title">{s.question}</h1>
          <p id="article-answer" className="mt-4 text-lead">{s.answer}{s.answerSourceIds?.length ? <SourceRefs ids={s.answerSourceIds} sources={s.sources} anchorIds={answerAnchors} /> : null}</p>
          <div className="mt-2"><Byline author={site.author} published={s.datePublished} modified={s.dateModified} readingMinutes={readingMinutes(s)} /></div>
        </header>
        {s.photo && <figure className="mt-8">
          <Image src={s.photo.src} alt={s.photo.alt} width={s.photo.width} height={s.photo.height} priority sizes="(min-width: 1280px) 690px, (min-width: 768px) calc(75vw - 53px), calc(100vw - 40px)" className="h-auto w-full rounded-xl" />
          <StationPhotoCaption photo={s.photo} />
        </figure>}
        {!s.body && illustration}
        <section data-rail="numbers" aria-label={`숫자로 보는 ${s.name}`} className="mt-8">
          <div className="xl:[&_tbody]:grid-cols-1 xl:[&_tr]:grid xl:[&_tr]:gap-y-0 xl:[&_tr]:border-l-0 xl:[&_tr]:border-b xl:[&_tr]:py-4 xl:[&_th]:text-right xl:[&_th]:text-4xl">
          <StatTable stats={s.stats} sources={s.sources} accent={s.sign.line} caption={`${s.name} 핵심 숫자와 기준일·출처`} reservedSourceIds={s.answerSourceIds} />
          </div>
        </section>
        <div data-rail="reel" className="mt-8"><div><ReelLink reel={s.reel} title={s.question} /></div></div>
        {s.body && <section aria-label="해설 본문" className="mt-12 space-y-16">
          {s.body.map((section) => <section key={section.heading}>
            <h2 className="text-h2">{section.heading}</h2>
            <div className="mt-6 space-y-5">{section.paragraphs.map((paragraph) => <p key={paragraph.text} className="text-body">
              {paragraph.text}<SourceRefs ids={paragraph.sourceIds} sources={s.sources} anchorIds={bodyAnchors[paragraphIndex++]} />
            </p>)}</div>
          </section>)}
        </section>}
        {!!s.qna.length && <section aria-label="묻고 답하기">
          {s.qna.map((qna, index) => (
            <Fragment key={qna.question}>
              <QnaBlock index={index} qna={qna} sources={s.sources} anchorIds={readingAnchors[index === 0 ? 0 : index + 2]} />
              {index === 0 && <>
                {s.comparison && <div>
                  <CompareTable {...s.comparison} sources={s.sources} />
                  <SourceRefs ids={readingAnchors[1]} sources={s.sources} anchorIds={readingAnchors[1]} />
                </div>}
                <PullQuote {...quote} sources={s.sources} anchorIds={readingAnchors[2]} />
                {!s.pullQuote && <p className="-mt-8 mb-12 px-6 text-caption md:px-8">{s.stats[0].asOf}</p>}
              </>}
            </Fragment>
          ))}
        </section>}
        {s.body && illustration}
        {!!s.transfers.length && <section aria-labelledby="transfer-heading" className="mt-16">
          <h2 id="transfer-heading" className="text-h2">어디서 내리면 빠른가</h2>
          <p className="mt-4 text-body">{s.pin.text}<SourceRefs ids={s.pin.sourceIds} sources={s.sources} anchorIds={pinAnchors} /></p>
          <div className="mt-6"><TransferDoors transfers={s.transfers} sources={s.sources} anchorIds={transferAnchors} /></div>
        </section>}
        {s.news && s.news.length > 0 && <section className="my-12" aria-labelledby="news-heading">
          <h2 id="news-heading" className="text-h2">최근 소식</h2>
          <ul className="mt-4 divide-y divide-rule">{s.news.map((news) => <li key={news.href} className="py-3">
            <Link href={news.href} className="inline-flex min-h-11 items-center text-body underline">{news.title}</Link>
            <time dateTime={news.date} className="ml-3 text-caption">{formatDate(news.date)}</time>
          </li>)}</ul>
        </section>}
        <div data-rail="next" className="my-16"><div><NextQuestion next={next} related={stations.filter((station) => station.slug !== s.slug)} /></div></div>
        <SourceList sources={s.sources} />
        <div className="mt-12"><Corrections items={s.corrections} /></div>
        <section aria-labelledby="contact-heading" className="mt-12 border-t-2 border-ink pt-4">
          <h2 id="contact-heading" className="text-h2">제작 문의</h2>
          <p className="mt-4 text-body">역 한 곳의 해부 기사와 릴스를 함께 제작합니다. 숫자가 틀렸다면 같은 주소로 알려 주세요.</p>
          <Button asChild variant="outline" className="mt-4"><a href={`mailto:${site.email}`}>제작 문의 {site.email}</a></Button>
          <p className="mt-3 text-caption"><Link href="/about/" className="inline-flex min-h-11 items-center underline">출처·정정 정책</Link></p>
        </section>
        </ArticleLayout>
        </div>
      </article>
    </>
  );
}
