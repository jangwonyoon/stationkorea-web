import type { ComparisonRow, Source } from "@/content/types";

import { BlockSources, RefMarks, resolveSources } from "./BlockSources";

type Props = {
  /** 표 제목(<caption>). */
  title: string;
  /** 비교 대상 머리. 첫 열 "구분"은 컴포넌트가 붙인다. */
  columns: string[];
  rows: ComparisonRow[];
  /** 기사 sources. 각주 번호와 블록 안 출처 줄에 쓴다. */
  sources: Source[];
};

/**
 * 비교표 "구분 | A | B". 데스크톱(md↑)은 표, 모바일은 행마다 세로로 쌓는다.
 * 마크업은 항상 <table>이라 JS 없이 HTML에 표 텍스트가 있다.
 */
export function CompareTable({ title, columns, rows, sources }: Props) {
  const where = `비교표 "${title}"`;
  for (const r of rows) {
    resolveSources(r.sourceIds, sources, where);
    if (r.values.length !== columns.length) {
      throw new Error(`${where} 행 "${r.label}": 값 ${r.values.length}개, 열 ${columns.length}개`);
    }
  }
  const notes = rows.filter((r) => r.note);
  return (
    <figure className="border-t-2 border-ink">
      <table className="block w-full border-collapse md:table">
        <caption className="block pt-3 text-left text-label md:table-caption">{title}</caption>
        <thead className="sr-only md:not-sr-only md:table-header-group">
          <tr>
            <th scope="col" className="py-3 pr-4 text-left text-label">
              구분
            </th>
            {columns.map((c) => (
              <th key={c} scope="col" className="py-3 pr-4 text-left text-label">
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="block md:table-row-group">
          {rows.map((r) => (
            <tr key={r.label} className="block border-t border-rule py-3 md:table-row md:py-0">
              <th scope="row" className="block text-left text-label md:table-cell md:py-3 md:pr-4">
                {r.label}
                <RefMarks ids={r.sourceIds} sources={sources} where={where} />
              </th>
              {r.values.map((v, i) => (
                <td key={columns[i]} className="mt-1 flex gap-3 text-body md:mt-0 md:table-cell md:py-3 md:pr-4">
                  <span aria-hidden="true" className="w-16 shrink-0 text-ink-3 md:hidden">
                    {columns[i]}
                  </span>
                  <span>{v}</span>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <figcaption className="border-t border-rule">
        {notes.length > 0 && (
          <ul className="mt-3 flex flex-col gap-1">
            {notes.map((r) => (
              <li key={r.label} className="text-caption break-keep">
                {r.label}: {r.note}
              </li>
            ))}
          </ul>
        )}
        <BlockSources ids={rows.flatMap((r) => r.sourceIds)} sources={sources} where={where} />
      </figcaption>
    </figure>
  );
}
