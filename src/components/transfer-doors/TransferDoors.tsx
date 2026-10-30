import { Table, TableCaption, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { firstCitations, SourceRefs } from "@/components/SourceRefs";
import { resolveSources } from "@/components/blocks/BlockSources";
import { LINE_BG, LineRoundel } from "@/components/line";
import type { Source, Transfer } from "@/content/types";

export type TransferDoorsProps = {
  transfers: Transfer[];
  sources: Source[];
  /** firstCitations로 배정한 첫 인용만 전달. 생략하면 ref id를 만들지 않는다. */
  anchorIds?: readonly string[];
};

/** 원자료 순서를 유지하며 탑승 노선 → 갈아탈 방면별로 묶는다. */
export function TransferDoors({ transfers, sources, anchorIds = [] }: TransferDoorsProps) {
  const groups = [...new Set(transfers.map((t) => t.ride.line))].flatMap((line) =>
    [...new Set(transfers.filter((t) => t.ride.line === line).map((t) => `${t.to.line}:${t.to.direction}`))].map((target) =>
      transfers.filter((t) => t.ride.line === line && `${t.to.line}:${t.to.direction}` === target),
    ),
  );
  const rows = groups.flat();
  const anchors = firstCitations(rows.map((t) => [t.sourceId])).map((ids) => ids.filter((id) => anchorIds.includes(id)));
  let rowIndex = 0;

  return (
    <div className="flex flex-col gap-8">
      {groups.map((group) => (
        <Table key={`${group[0].ride.line}:${group[0].to.line}:${group[0].to.direction}`} className="block w-full border-t-2 border-ink text-left">
          <TableCaption className="flex items-center gap-2 py-3 text-label text-ink">
            {group[0].ride.line}호선에서 <LineRoundel line={group[0].to.line} size="S" /> {group[0].to.direction}으로
          </TableCaption>
          <TableHeader className="sr-only"><TableRow><TableHead scope="col">타고 있는 열차</TableHead><TableHead scope="col">내릴 칸(호차-문)</TableHead><TableHead scope="col">소요 시간</TableHead><TableHead scope="col">기준일·출처</TableHead><TableHead scope="col">칸 위치 안내</TableHead></TableRow></TableHeader>
          <TableBody className="block">
            {group.map((t, i) => {
              const [{ src }] = resolveSources([t.sourceId], sources, "TransferDoors");
              const rowAnchors = anchors[rowIndex++];
              if (!/^(?:[1-9]|10)-[1-4]$/.test(t.car)) throw new Error(`TransferDoors: 칸 표지를 확인하세요: ${t.car}`);
              const [car, door] = t.car.split("-").map(Number);
              return (
                <TableRow key={i} className="grid grid-cols-3 items-center gap-x-3 border-b border-rule py-4">
                  <TableHead scope="row" className="col-span-3 mb-3 flex items-center gap-2 text-label break-keep">
                    <LineRoundel line={t.ride.line} size="S" /> {t.ride.direction} 열차
                  </TableHead>
                  <TableCell className="text-center">
                    <span className="inline-block rounded-plate border-2 border-plate-ink bg-plate px-3 py-1 text-2xl font-semibold text-plate-ink tabular-nums">{t.car}</span>
                  </TableCell>
                  <TableCell className="col-span-2 text-label tabular-nums">{t.time}</TableCell>
                  <TableCell className="col-span-3 mt-2 flex flex-wrap items-center text-caption">
                    {src.org} · {src.date}
                    <SourceRefs ids={[t.sourceId]} sources={sources} anchorIds={rowAnchors} />
                  </TableCell>
                  {/* shortcut: 편성이 확인된 2·4호선만 10칸 바 표시, 다른 노선은 편성 근거 확보 후 확장 */}
                  <TableCell className="col-span-3 mt-3">
                    {(t.ride.line === "2" || t.ride.line === "4") && (<>
                      <div aria-hidden="true" className="flex items-center gap-1">
                        <ol className="grid min-w-0 flex-1 grid-cols-10 gap-0.5">
                          {Array.from({ length: 10 }, (_, n) => 10 - n).map((n) => (
                            <li key={n} className={`flex min-w-0 flex-col items-center justify-center border py-1 text-xs text-plate-ink tabular-nums ${n === car ? `border-2 border-ink font-bold ${LINE_BG[t.ride.line]}` : "border-rule bg-plate"}`}>
                              <span>{n}</span>
                              <span className="flex h-4 items-center gap-0.5">{n === car && Array.from({ length: door }, (_, d) => <span key={d} className="size-0.5 rounded-full bg-plate-ink" />)}</span>
                            </li>
                          ))}
                        </ol>
                        <span>→</span>
                      </div>
                      <p className="mt-2 text-caption">진행 방향 맨 앞이 1번 칸 · {car}번 칸 {door}번 문</p>
                    </>)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      ))}
    </div>
  );
}
