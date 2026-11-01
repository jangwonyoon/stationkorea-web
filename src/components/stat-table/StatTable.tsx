import { Table, TableCaption, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import type { LineId, Source, Stat } from "@/content/types";
import { splitNumber } from "./split-number";

import { LINE_BORDER } from "@/components/line/lineClasses";

type Props = {
  stats: Stat[];
  /** 기사 출처 전체. 각주 번호는 이 배열의 순서(출처 목록 순서)와 같다. */
  sources: Source[];
  /** 윗선 노선색. 생략하면 기사 루트에서 덮어쓴 `--color-accent`를 쓴다. */
  accent?: LineId;
  /** 표 캡션(화면에서는 숨김, 스크린리더·검색용). */
  caption?: string;
};

/**
 * 숫자·출처 표. 숫자 3개를 하나의 <table>에 두어 숫자·설명·기준일·각주가 HTML 표 텍스트로 남는다.
 * 390: 행 3개(숫자 | 설명·기준일), md(768) 이상: 칸 3개 가로.
 * 각주 링크는 출처 목록 항목 `#src-<id>`로 가고, 출처 목록에서 돌아올 자리로 `id="ref-<id>"`를 가진다(표 안 첫 등장에만).
 */
export function StatTable({ stats, sources, accent, caption = "숫자와 출처" }: Props) {
  for (const stat of stats) {
    if (stat.sourceIds.length === 0) {
      throw new Error(`StatTable: "${stat.value}" requires at least one sourceId.`);
    }
  }
  const seen = new Set<string>();

  return (
    <Table
      className={`block w-full border-t-4 bg-plate text-plate-ink ${accent ? LINE_BORDER[accent] : "border-accent"}`}
    >
      <TableCaption className="sr-only">{caption}</TableCaption>
      <TableHeader className="sr-only"><TableRow>{["숫자", "내용", "기준일·출처"].map((label) => <TableHead key={label} scope="col">{label}</TableHead>)}</TableRow></TableHeader>
      <TableBody className="grid md:grid-cols-3">
        {stats.map((stat) => (
          <TableRow
            key={stat.value + stat.label}
            className="grid auto-cols-auto items-start gap-x-4 border-b border-rule px-5 py-4 last:border-b-0 md:flex md:flex-col md:gap-2 md:border-b-0 md:border-l md:px-0.5 md:py-6 md:first:border-l-0 xl:px-5"
          >
            <TableHead scope="row" className="row-span-2 text-right text-num md:text-left">
              {splitNumber(stat.value).map((part, i) =>
                part.num ? (
                  <span key={i}>{part.text}</span>
                ) : (
                  <span key={i} className="text-num-unit">
                    {part.text}
                  </span>
                ),
              )}
            </TableHead>
            <TableCell className="col-start-2 text-label">{stat.label}</TableCell>
            <TableCell className="col-start-2 flex flex-wrap items-center text-caption text-plate-ink/75">
              <span className="mr-1">{stat.asOf}</span>
              {stat.sourceIds.map((id) => {
                const n = sources.findIndex((s) => s.id === id) + 1;
                if (n === 0) {
                  throw new Error(`StatTable: "${stat.value}" references unknown sourceId "${id}".`);
                }
                const first = !seen.has(id);
                seen.add(id);
                return (
                  <a
                    key={id}
                    href={`#src-${id}`}
                    id={first ? `ref-${id}` : undefined}
                    aria-label={`출처 ${n}`}
                    className="group inline-flex size-11 items-center justify-center focus-visible:outline-plate-ink"
                  >
                    <span className="inline-flex h-5 min-w-5 items-center justify-center border border-plate-ink px-1 text-label text-plate-ink group-hover:bg-plate-ink group-hover:text-plate group-active:bg-plate-ink group-active:text-plate">
                      {n}
                    </span>
                  </a>
                );
              })}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
