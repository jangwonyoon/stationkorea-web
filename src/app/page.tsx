import Image from "next/image";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { lineName } from "@/content/lines";
import { latestStations, stationPath, stations } from "@/content/stations";
import type { Station } from "@/content/types";
import { homeJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

// 홈(E안): 역 이름이 아니라 질문 목록. 최신 기사 가로 1줄 + 3열 카드 + 노선 칩.
export default function Home() {
  const latest = latestStations().slice(0, 6);
  const lines = [...new Set(stations.flatMap((s) => s.lines))].sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <>
      <JsonLd data={homeJsonLd(stations)} />
      <div className="mx-auto max-w-6xl px-4 py-8">
        <h1 className="text-2xl font-bold break-keep sm:text-3xl">매일 지나는 그 역, 왜 이렇게 생겼을까</h1>
        <p className="mt-2 text-neutral-700 break-keep">{site.description}</p>

        <section aria-labelledby="latest" className="mt-8">
          <h2 id="latest" className="text-lg font-bold">
            최신 질문
          </h2>
          <ul className="-mx-4 mt-3 flex snap-x gap-4 overflow-x-auto px-4 pb-2">
            {latest.map((s) => (
              <li key={s.slug} className="w-72 shrink-0 snap-start">
                <QuestionCard station={s} withImage />
              </li>
            ))}
          </ul>
        </section>

        {/* 노선 허브(/line/<노선>/)가 생기면 칩을 링크로 바꾼다 */}
        <section aria-labelledby="lines" className="mt-8">
          <h2 id="lines" className="sr-only">
            노선
          </h2>
          <ul className="flex flex-wrap gap-2">
            {lines.map((line) => (
              <li key={line} className="rounded-full border border-neutral-300 px-3 py-1 text-sm">
                {lineName(line)} <span className="text-neutral-500">{stations.filter((s) => s.lines.includes(line)).length}</span>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="all" className="mt-8">
          <h2 id="all" className="text-lg font-bold">
            모든 질문
          </h2>
          <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {stations.map((s) => (
              <li key={s.slug}>
                <QuestionCard station={s} />
              </li>
            ))}
          </ul>
        </section>
      </div>
    </>
  );
}

function QuestionCard({ station: s, withImage = false }: { station: Station; withImage?: boolean }) {
  return (
    <Link href={stationPath(s)} className="flex h-full flex-col rounded-lg border border-neutral-200 p-4 hover:bg-neutral-50">
      {withImage && (
        <div className="relative -mx-4 -mt-4 mb-3 aspect-[1200/630] overflow-hidden rounded-t-lg bg-neutral-100">
          <Image src={s.ogImage} alt="" fill sizes="18rem" className="object-cover" />
        </div>
      )}
      <span className="text-xs text-neutral-500">
        역 해부 {String(s.no).padStart(2, "0")} · {s.name} · {s.lines.map(lineName).join("·")}
      </span>
      <span className="mt-1 text-lg font-bold leading-snug break-keep">{s.question}</span>
      <span className="mt-2 line-clamp-3 text-sm text-neutral-600 break-keep">{s.answer}</span>
    </Link>
  );
}
