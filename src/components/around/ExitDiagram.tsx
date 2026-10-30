import type { Source } from "@/content/types";
import { SourceRefs } from "../SourceRefs";
import { resolveSources } from "../blocks/BlockSources";

type Point = { x: number; y: number };
export type DiagramExit = { exit: number; position?: Point; status?: "pending" | "verified" };
export type DiagramPlace = { id: string; name: string; number: number; exit: number | null; position?: Point };
export type ExitDiagramProps = {
  station: string;
  exits: DiagramExit[];
  places: DiagramPlace[];
  /** 위치 검증 자료. position은 400×300 도식 좌표, 북쪽이 위. */
  sourceIds?: string[];
  sources?: Source[];
  anchorIds?: readonly string[];
};

export function ExitDiagram({ station, exits, places, sourceIds = [], sources = [], anchorIds }: ExitDiagramProps) {
  const located = exits.filter((e) => e.status === "verified" && e.position);
  const pins = places.filter((p) => p.position && located.some((e) => e.exit === p.exit));
  const references = located.length ? resolveSources(sourceIds, sources, `${station} 출구 도식`) : [];
  for (const { position } of [...located, ...pins]) {
    if (!position || !Number.isFinite(position.x) || !Number.isFinite(position.y) || position.x < 24 || position.x > 376 || position.y < 24 || position.y > 276) throw new Error("도식 좌표는 테두리 안에 있어야 합니다");
  }
  return <figure>
    {located.length === 0 ? <p className="border border-rule bg-slab p-6 text-body">확인된 출구 위치 자료가 없어 {station}역 출구 도식을 표시하지 않습니다. 장소의 지도 링크에서 위치를 확인하세요.</p> : <>
      <svg viewBox="0 0 400 300" role="img" aria-label={`${station}역 출구와 장소 위치 도식`} className="w-full bg-plate text-plate-ink">
        <text x="16" y="20" className="fill-current text-sm">북 ↑</text>
        {located.map((e) => <g key={e.exit}><line x1="200" y1="150" x2={e.position!.x} y2={e.position!.y} className="stroke-rule" /><rect x={e.position!.x - 12} y={e.position!.y - 12} width="24" height="24" className="fill-exit" /><text x={e.position!.x} y={e.position!.y + 5} textAnchor="middle" className="fill-current text-sm font-semibold">{e.exit}</text></g>)}
        <rect x="160" y="128" width="80" height="44" className="fill-plate stroke-plate-ink" /><text x="200" y="155" textAnchor="middle" className="fill-current text-base font-semibold">{station}</text>
        {pins.map((p) => <g key={p.id}><circle cx={p.position!.x} cy={p.position!.y} r="14" className="fill-plate-ink" /><text x={p.position!.x} y={p.position!.y + 5} textAnchor="middle" className="fill-plate text-sm font-semibold">{p.number}</text></g>)}
      </svg>
      <ul className="divide-y divide-rule">{pins.map((p) => <li key={p.id}><a href={`#${p.id}`} className="flex min-h-11 items-center gap-3 text-label"><span>{p.number}</span><span>{p.name}</span><span className="ml-auto">{p.exit}번 출구</span></a></li>)}</ul>
    </>}
    <figcaption className="mt-3 text-caption">도식이며 축척이 맞지 않습니다. {references.map(({ src }) => `${src.org} · ${src.title} · ${src.date}`).join(" / ")} {located.length > 0 && <SourceRefs ids={sourceIds} sources={sources} anchorIds={anchorIds} />}</figcaption>
  </figure>;
}
