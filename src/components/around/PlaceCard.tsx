import type { Source } from "@/content/types";
import { SourceRefs, formatDate } from "../SourceRefs";
import { resolveSources } from "../blocks/BlockSources";
import type { Place } from "./types";

export type PlaceCardProps = {
  place: Place;
  number: number;
  sourceId: string;
  sources: Source[];
  anchorIds?: readonly string[];
  /** 메뉴와 지정 자료가 다를 때 별도 출처. */
  menuSourceId?: string;
  /** 현장 확인한 도보 시간의 기준일과 출처. null 시간에는 불필요. */
  walking?: { asOf: string; sourceId: string };
};

export function PlaceCard({ place, number, sourceId, sources, anchorIds, menuSourceId = sourceId, walking }: PlaceCardProps) {
  const ids = [...new Set([sourceId, ...(place.menu ? [menuSourceId] : []), ...(place.walkMinutes !== null ? [walking?.sourceId ?? ""] : [])])];
  const resolved = resolveSources(ids, sources, place.name);
  if (resolved[0].src.url !== place.designation.source.url) throw new Error(`${place.name}: 지정 자료와 출처 URL이 다릅니다`);
  if (place.walkMinutes !== null && (place.exit === null || !walking?.asOf || !Number.isFinite(place.walkMinutes) || place.walkMinutes < 0)) throw new Error(`${place.name}: 도보 시간의 출구·기준일·출처가 필요합니다`);
  if (place.menu?.priceWon !== null && place.menu?.priceWon !== undefined && (!Number.isFinite(place.menu.priceWon) || place.menu.priceWon < 0 || !place.menu.asOf)) throw new Error(`${place.name}: 메뉴 가격과 기준일을 확인하세요`);
  const links = [["네이버 지도", place.maps.naver, "https://map.naver.com/p/search/"], ["카카오맵", place.maps.kakao, "https://map.kakao.com/link/search/"]];
  for (const [, url, prefix] of links) if (!url.startsWith(prefix) || url.length === prefix.length) throw new Error(`${place.name}: 지도 검색 URL을 확인하세요`);
  return (
    <article id={place.id} className="scroll-mt-16 border-t-2 border-ink bg-plate p-4 text-plate-ink md:p-6">
      <div className="flex flex-wrap items-center gap-2 text-label">
        <span className="inline-flex size-7 items-center justify-center rounded-full bg-plate-ink text-plate">{number}</span>
        {place.exit !== null && <span className="inline-flex min-h-7 min-w-7 items-center justify-center bg-exit px-1">{place.exit}<span className="sr-only">번 출구</span></span>}
        {place.exit !== null && place.walkMinutes !== null && <span>{place.exit}번 출구에서 걸어서 {place.walkMinutes}분</span>}
      </div>
      {walking && place.walkMinutes !== null && <p className="mt-2 text-sm">도보 확인 {formatDate(walking.asOf)}</p>}
      <h3 className="mt-3 text-h2">{place.name}</h3>
      <div className="mt-3 inline-block border border-plate-ink p-3 text-sm">
        <p className="font-semibold">{place.designation.agency} · {place.designation.name}</p>
        <p>{place.designation.year !== null && <>{place.designation.year}년 지정 · </>}{formatDate(place.designation.source.asOf)} 기준</p>
      </div>
      <dl className="mt-4 border-t border-rule text-sm">
        {place.menu && <div className="grid grid-cols-3 gap-3 border-b border-rule py-3"><dt>대표 메뉴</dt><dd className="col-span-2 break-keep">{place.menu.name}{place.menu.priceWon !== null && <> · {place.menu.priceWon.toLocaleString("ko-KR")}원</>}<br />{formatDate(place.menu.asOf)} 기준</dd></div>}
        <div className="grid grid-cols-3 gap-3 border-b border-rule py-3"><dt>주소</dt><dd className="col-span-2 break-keep">{place.address}</dd></div>
      </dl>
      <p className="mt-3 bg-ground p-3 text-sm text-ink">자료 기준 {formatDate(place.asOf)}<SourceRefs ids={ids} sources={sources} anchorIds={anchorIds} /></p>
      {place.editorNote && <aside className="mt-3 border-t border-dashed border-rule pt-3"><p className="text-sm">에디터 메모</p><p className="mt-2 font-serif text-base leading-relaxed break-keep">{place.editorNote}</p></aside>}
      <div className="mt-4 grid grid-cols-2 gap-2">{links.map(([label, url]) => <a key={label} href={url} rel="noopener" className="flex min-h-11 items-center justify-center border border-plate-ink px-2 text-label underline-offset-2 hover:underline focus-visible:outline-plate-ink">{label}<span className="sr-only">에서 {place.name} 검색</span> ↗</a>)}</div>
    </article>
  );
}
