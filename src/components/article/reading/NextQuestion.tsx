import Image from "next/image";
import Link from "next/link";
import { withTopic } from "@/components/SourceRefs";
import { LineChip } from "@/components/line";
import { stationPath } from "@/content/stations";
import type { Station } from "@/content/types";
import { readingMinutes } from "@/lib/reading-time";

export type NextQuestionProps = { next: Station; related: Station[] };

export function NextQuestion({ next, related }: NextQuestionProps) {
  const questions = related.filter((station, index) => related.findIndex((item) => item.slug === station.slug) === index).slice(0, 2);
  return (
    <section aria-label="다음 궁금증">
      <Link href={stationPath(next)} data-track="next_click" data-to={stationPath(next)} className="pressable flex min-h-32 flex-col rounded-xl border border-ink bg-plate p-6 text-plate-ink active:text-ink">
        <span className="text-label">다음 궁금증</span>
        <span className="mt-3 text-h2 break-words">그럼 {withTopic(next.name.replace(/역$/, ""))} 왜?</span>
        <span className="mt-2 text-body break-words">{next.teaser}</span>
        <span className="mt-2 text-sm">읽는 데 약 {readingMinutes(next)}분</span>
        <span className="mt-4 flex items-center justify-between gap-3">
          <LineChip lines={next.lines} label={next.name} />
          <span aria-hidden="true" className="text-2xl">→</span>
        </span>
      </Link>
      {questions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-label">관련 질문</h2>
          <ul className="mt-3 divide-y divide-rule">
            {questions.map((station) => (
              <li key={station.slug}>
                <Link href={stationPath(station)} className="pressable flex min-h-11 items-center gap-4 py-4">
                  {station.crossSection && <Image src={station.crossSection.src} alt={station.crossSection.alt} width={88} height={88} loading="lazy" className="size-22 shrink-0 rounded-lg object-cover" />}
                  <span className="min-w-0">
                    <span className="block text-body break-words">{station.question}</span>
                    <LineChip lines={station.lines} label={station.name} className="mt-3" />
                    <span className="mt-2 block text-caption">읽는 데 약 {readingMinutes(station)}분</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
