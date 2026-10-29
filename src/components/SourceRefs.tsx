import type { Source } from "@/content/types";

/** 본문 옆 출처 각주 [1][2]. 번호는 기사 하단 출처 전문 목록의 순서와 같다. */
export function SourceRefs({ ids, sources }: { ids: string[]; sources: Source[] }) {
  return (
    <span className="ml-1 whitespace-nowrap text-xs text-neutral-500">
      {ids.map((id) => {
        const n = sources.findIndex((s) => s.id === id) + 1;
        return (
          <a key={id} href={`#src-${id}`} className="ml-0.5 underline-offset-2 hover:underline">
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
