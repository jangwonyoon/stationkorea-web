import Image from "next/image";
import Link from "next/link";
import { linePath, publishedLines } from "@/app/line/data";
import { ArticleCards } from "@/components/articles/ArticleCards";
import { articleEntries, sectionLinks } from "@/lib/article-index";
import { sections, sectionPath } from "@/content/sections";
import { JsonLd } from "@/components/JsonLd";
import { LineChip, LineRoundel } from "@/components/line";
import { Button } from "@/components/ui/button";
import { LINES, type LineId } from "@/content/lines";
import { latestStations, stationPath } from "@/content/stations";
import { homeJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { readingMinutes } from "@/lib/reading-time";

export default function Home() {
  const latest = latestStations();
  const cover = latest[0];
  const recent = articleEntries.slice(0, 4);

  return (
    <>
      <JsonLd data={homeJsonLd([{ name: cover.question, url: stationPath(cover) }, ...recent.map(entry => ({ name: entry.title, url: entry.href }))])} />
      <div className="page-wrap py-8 md:py-12">
        <header className="grid gap-6 border-b-2 border-ink pb-8 xl:grid-cols-2 xl:items-end">
          <p className="text-display">{site.name}</p>
          <div>
            <h1 className="text-lead">매일 지나는 그 역, 왜 이렇게 생겼을까</h1>
            <p className="mt-2 text-body">{site.description}</p>
            <p className="mt-3 text-caption">{site.instagramHandle} 공식 웹사이트</p>
          </div>
        </header>

        <section aria-labelledby="cover-question" className="mt-8 grid gap-8 md:mt-12 md:grid-cols-2 md:items-center xl:gap-16">
          <div className="md:order-2">
            <p className="text-label">이번 질문 · #{sections.find((section) => section.id === cover.section)?.name} · 역 해부 {String(cover.no).padStart(2, "0")}</p>
            <p className="mt-2 text-caption">읽는 데 약 {readingMinutes(cover)}분</p>
            <div className="mt-3"><LineChip lines={cover.lines} label={cover.name} /></div>
            <h2 id="cover-question" className="mt-4 text-h1 break-keep">
              <Link href={stationPath(cover)} className="pressable block rounded-xl underline-offset-4 hover:underline">{cover.question}</Link>
            </h2>
            <p className="mt-4 text-body text-ink-2">{cover.answer}</p>
            <Button asChild variant="outline" className="mt-6">
              <Link href={stationPath(cover)}>답 읽기 <span aria-hidden="true">→</span></Link>
            </Button>
          </div>
          <figure className="min-w-0 md:order-1">
            <Link href={stationPath(cover)} aria-label={`${cover.question} 답 읽기`} className="pressable relative block aspect-4/5 overflow-hidden rounded-xl bg-slab">
              <Image src={cover.crossSection.src} alt={cover.crossSection.alt} fill priority sizes="(min-width: 1280px) 568px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 40px)" className="object-cover" />
            </Link>
            <figcaption className="mt-2 text-caption">{cover.crossSection.caption} AI 시각화 참고 이미지.</figcaption>
          </figure>
        </section>

        <nav aria-label="매거진 섹션" className="mt-16 md:mt-24">
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {sectionLinks.map((section) => {
              const available = section.count > 0;
              const content = <><span className="text-h2">#{section.name}</span><span className="mt-2 text-caption">{section.description}</span><span className="mt-4 text-label">{available ? `기사 ${section.count}편 →` : "준비 중"}</span></>;
              return (
                <li key={section.id}>
                  {available ? <Link href={sectionPath(section.id)} className="pressable flex h-full flex-col border-t-2 border-ink p-4 hover:bg-slab">{content}</Link> : <span aria-disabled="true" className="flex h-full flex-col border-t border-rule p-4 text-ink-3">{content}</span>}
                </li>
              );
            })}
          </ul>
        </nav>

        <section id="new-articles" aria-labelledby="all" className="mt-16 scroll-mt-16 md:mt-24">
          <h2 id="all" className="scroll-mt-16 border-b-2 border-ink pb-4 text-h2">최근 기사</h2>
          <ArticleCards entries={recent} />
          <Button asChild variant="outline" className="mt-6"><Link href="/articles/">전체 기사 {articleEntries.length}편 보기 <span aria-hidden="true">→</span></Link></Button>
        </section>

        <div className="mt-16 grid gap-16 md:mt-24 md:grid-cols-2 md:gap-12">
          <section aria-labelledby="lines">
            <h2 id="lines" className="scroll-mt-16 border-b-2 border-ink pb-4 text-h2">노선별로 보기</h2>
            <ul className="mt-6 flex flex-wrap gap-4">
              {(Object.keys(LINES) as LineId[]).map((line) => (
                <li key={line}><LineRoundel line={line} size="L" href={publishedLines.includes(line) ? linePath(line) : undefined} disabled={!publishedLines.includes(line)} /></li>
              ))}
            </ul>
            <p className="mt-4 text-caption">기사가 있는 노선부터 읽어보세요. 나머지 노선은 준비 중입니다.</p>
          </section>
          <section aria-labelledby="channel" className="rounded-xl bg-slab p-6">
            <h2 id="channel" className="text-h2">한 편의 기사에서 시작하는 질문</h2>
            <p className="mt-4 text-body">{site.name}은 익숙한 길과 공간을 질문으로 읽는 매거진입니다. 서울 지하철에서 시작해 이동과 동네의 구조를 출처와 함께 설명합니다.</p>
            <Button asChild className="mt-6"><a href={site.instagram} target="_blank" rel="noopener noreferrer">인스타그램 <span aria-hidden="true">↗</span><span className="sr-only"> (새 창)</span></a></Button>
          </section>
        </div>
      </div>
    </>
  );
}
