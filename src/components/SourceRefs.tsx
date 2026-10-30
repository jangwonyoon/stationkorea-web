import type { Source } from "@/content/types";

/*
 * 출처 ↔ 각주 앵커 계약(C3 숫자 표·C5 출처 목록 공통).
 * - 출처 목록 항목: id="src-<sourceId>". 각주는 href="#src-<sourceId>"로 간다.
 * - 각주(돌아오는 자리): id="ref-<sourceId>". 출처 목록의 "본문으로"는 href="#ref-<sourceId>"로 돌아온다.
 * 한 페이지에서 같은 출처를 여러 번 인용하므로 ref-<id>는 첫 인용 한 곳에만 둔다(firstCitations).
 */
export const srcAnchor = (sourceId: string) => `src-${sourceId}`;
export const refAnchor = (sourceId: string) => `ref-${sourceId}`;

/**
 * 블록별 인용 id 목록(DOM 순서)을 받아, 각 블록이 ref-<id>를 가질 id만 돌려준다(출처마다 첫 인용 한 곳).
 * C3 숫자 표는 자체 ref id를 소유한다. 첫 반환값은 버려 stats 인용을 예약한다.
 * 예: const [, pinAnchors, ...qnaAnchors] = firstCitations([statIds, s.pin.sourceIds, ...s.qna.map((q) => q.sourceIds)])
 */
export function firstCitations(blocks: readonly (readonly string[])[]): string[][] {
  const seen = new Set<string>();
  return blocks.map((ids) =>
    ids.filter((id) => {
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    }),
  );
}

/**
 * 본문 옆 출처 각주 [1][2]. 번호는 기사 하단 출처 전문 목록의 순서와 같다.
 * anchorIds에 든 출처는 이 각주가 id="ref-<id>"를 가져 출처 목록에서 돌아오는 자리가 된다.
 */
export function SourceRefs({
  ids,
  sources,
  anchorIds,
}: {
  ids: string[];
  sources: Source[];
  anchorIds?: readonly string[];
}) {
  return (
    <span className="ml-1 whitespace-nowrap text-xs text-ink-3">
      {[...new Set(ids)].filter((id) => sources.some((source) => source.id === id)).map((id) => {
        const n = sources.findIndex((s) => s.id === id) + 1;
        return (
          <a
            key={id}
            id={anchorIds?.includes(id) ? refAnchor(id) : undefined}
            href={`#${srcAnchor(id)}`}
            aria-label={`출처 ${n}`}
            className="ml-0.5 inline-flex min-h-11 min-w-11 scroll-mt-16 items-center justify-center underline-offset-2 hover:underline target:bg-slab target:text-ink"
          >
            [{n}]
          </a>
        );
      })}
    </span>
  );
}

/** 받침 유무에 따라 은/는을 붙인다("사당은", "건대입구는"). */
export function withTopic(word: string): string {
  const code = word.charCodeAt(word.length - 1) - 0xac00;
  const hasFinal = code >= 0 && code < 11172 && code % 28 !== 0;
  return `${word}${hasFinal ? "은" : "는"}`;
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.slice(0, 10).split("-").map(Number);
  return `${y}년 ${m}월 ${d}일`;
}
