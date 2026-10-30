import type { Source } from "@/content/types";

/** sourceIds를 출처 목록에서 찾는다. 없는 id는 빌드를 실패시킨다(출처 없는 숫자는 발행하지 않는다). */
export function resolveSources(ids: string[], sources: Source[], where: string): { n: number; src: Source }[] {
  if (ids.length === 0) throw new Error(`${where}: 출처가 필요합니다`);
  return [...new Set(ids)].map((id) => {
    const i = sources.findIndex((s) => s.id === id);
    if (i < 0) throw new Error(`${where}: 출처 "${id}"가 sources에 없습니다`);
    const src = sources[i];
    if (![src.org, src.title, src.date, src.url].every((v) => v?.trim()) || !/\d{4}/.test(src.date) || !/^https?:\/\//.test(src.url ?? "")) {
      throw new Error(`${where}: 출처 "${id}"의 기관·자료명·기준일·URL을 확인하세요`);
    }
    return { n: i + 1, src };
  });
}

/**
 * 블록 안 출처 줄. 번호는 기사 하단 출처 전문 목록 순서와 같고, 기준일·URL을 같은 블록에 둔다(SEO·GEO 규칙 2).
 */
export function BlockSources({ ids, sources, where }: { ids: string[]; sources: Source[]; where: string }) {
  const list = resolveSources(ids, sources, where);
  if (list.length === 0) return null;
  return (
    <ul className="mt-3 flex flex-col gap-1">
      {list.map(({ n, src }) => (
        <li key={src.id} className="text-caption break-keep">
          <a href={`#src-${src.id}`} className="inline-flex min-h-11 min-w-11 items-center justify-center underline-offset-2 hover:underline">
            [{n}]
          </a>{" "}
          {src.org}, {src.title}, {src.date}
          {src.url && (
            <>
              {". "}
              <a href={src.url} rel="noopener" className="inline-flex min-h-11 items-center break-all underline">
                {src.url}
              </a>
            </>
          )}
        </li>
      ))}
    </ul>
  );
}

/** 본문 옆 각주 번호 [1][2]. 번호는 기사 하단 출처 전문 목록 순서. */
export function RefMarks({ ids, sources, where }: { ids: string[]; sources: Source[]; where: string }) {
  return (
    <span className="ml-1 whitespace-nowrap text-caption">
      {resolveSources(ids, sources, where).map(({ n, src }) => (
        <a key={src.id} href={`#src-${src.id}`} className="ml-0.5 inline-flex min-h-11 min-w-11 items-center justify-center underline-offset-2 hover:underline">
          [{n}]
        </a>
      ))}
    </span>
  );
}
