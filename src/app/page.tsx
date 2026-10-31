import Image from "next/image";
import Link from "next/link";
import { linePath, publishedLines } from "@/app/line/data";
import { QuestionCarousel } from "@/components/home/QuestionCarousel";
import { JsonLd } from "@/components/JsonLd";
import { LineChip, LineRoundel } from "@/components/line";
import { Button } from "@/components/ui/button";
import { LINES, type LineId } from "@/content/lines";
import { latestStations, stationPath, stations } from "@/content/stations";
import type { StationSection } from "@/content/types";
import { homeJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

const sections: { id: StationSection; name: string; description: string }[] = [
  { id: "transfer", name: "갈아타다", description: "역·환승 구조" },
  { id: "walk", name: "걷다", description: "출구별 동네·보행·생활" },
  { id: "see", name: "보다", description: "랜드마크·공간" },
  { id: "change", name: "바뀌다", description: "도시 변화·새 노선·숫자 소식" },
];

export default function Home() {
  const latest = latestStations();
  const cover = latest[0];

  return (
    <>
      <JsonLd data={homeJsonLd(stations)} />
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
            <div className="mt-3"><LineChip lines={cover.lines} label={cover.name} /></div>
            <h2 id="cover-question" className="mt-4 text-h1 break-keep">{cover.question}</h2>
            <p className="mt-4 text-body text-ink-2">{cover.answer}</p>
            <Button asChild variant="outline" className="mt-6">
              <Link href={stationPath(cover)}>답 읽기 <span aria-hidden="true">→</span></Link>
            </Button>
          </div>
          <figure className="min-w-0 md:order-1">
            <Link href={stationPath(cover)} aria-label={`${cover.question} 답 읽기`} className="pressable relative block aspect-4/5 overflow-hidden bg-slab">
              <Image src={cover.crossSection.src} alt={cover.crossSection.alt} fill priority sizes="(min-width: 1280px) 568px, (min-width: 768px) calc(50vw - 48px), calc(100vw - 40px)" className="object-cover" />
            </Link>
            <figcaption className="mt-2 text-caption">{cover.crossSection.caption} AI 시각화 참고 이미지.</figcaption>
          </figure>
        </section>

        <nav aria-label="매거진 섹션" className="mt-16 md:mt-24">
          <ul className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {sections.map((section) => {
              const available = stations.some((station) => station.section === section.id);
              const content = <><span className="text-h2">#{section.name}</span><span className="mt-2 text-caption">{section.description}</span><span className="mt-4 text-label">{available ? "질문 보기 →" : "준비 중"}</span></>;
              return (
                <li key={section.id}>
                  {available ? <a href="#all" className="pressable flex h-full flex-col border-t-2 border-ink p-4 hover:bg-slab">{content}</a> : <span aria-disabled="true" className="flex h-full flex-col border-t border-rule p-4 text-ink-3">{content}</span>}
                </li>
              );
            })}
          </ul>
        </nav>

        <section aria-labelledby="all" className="mt-16 md:mt-24">
          <h2 id="all" className="scroll-mt-16 border-b-2 border-ink pb-4 text-h2">최근 질문</h2>
          <QuestionCarousel>
            {latest.map((station) => (
              <li key={station.slug} className="min-w-0 snap-start">
                <Link href={stationPath(station)} className="pressable flex h-full items-start gap-3 border-b border-rule py-4 hover:bg-slab">
                  <div className="relative aspect-square w-20 shrink-0 overflow-hidden bg-slab">
                    <Image src={station.crossSection.src} alt={station.crossSection.alt} fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="min-w-0">
                    <LineChip lines={station.lines} label={station.name} size="S" />
                    <h3 className="mt-3 font-serif text-lg font-semibold break-keep">{station.question}</h3>
                  </div>
                </Link>
              </li>
            ))}
          </QuestionCarousel>
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
          <section aria-labelledby="channel" className="bg-slab p-6">
            <h2 id="channel" className="text-h2">릴스에서 보고, 여기서 끝까지</h2>
            <p className="mt-4 text-body">{site.name}은 서울 지하철 역을 질문으로 읽는 매거진입니다. 인스타그램에서 본 역의 구조를 공식 숫자와 출처로 더 자세히 살펴보세요.</p>
            <Button asChild className="mt-6"><a href={site.instagram} target="_blank" rel="noopener noreferrer">인스타그램 <span aria-hidden="true">↗</span><span className="sr-only"> (새 창)</span></a></Button>
          </section>
        </div>
      </div>
    </>
  );
}
