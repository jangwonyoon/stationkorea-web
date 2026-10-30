import { Table, TableCaption, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import type { Source } from "@/content/types";
import { SourceRefs } from "../SourceRefs";
import { resolveSources } from "../blocks/BlockSources";
import type { CongestionSeries } from "./types";

export type CongestionChartProps = { series: CongestionSeries; sourceId: string; sources: Source[]; anchorIds?: readonly string[] };

export function CongestionChart({ series, sourceId, sources, anchorIds }: CongestionChartProps) {
  const [{ src }] = resolveSources([sourceId], sources, "열차 혼잡도");
  if (series.intervalMinutes !== 30 || !series.times.length || new Set(series.times).size !== series.times.length) throw new Error("혼잡도는 중복 없는 30분 시간대가 필요합니다");
  const minutes = series.times.map((time) => {
    if (!/^(?:[01]\d|2[0-3]):(?:00|30)$/.test(time)) throw new Error("혼잡도 시간은 HH:00 또는 HH:30이어야 합니다");
    const [hour, minute] = time.split(":").map(Number);
    return hour * 60 + minute;
  });
  if (minutes.some((m, i) => i > 0 && (m - minutes[i - 1] + 1440) % 1440 !== 30)) throw new Error("혼잡도 시간 간격은 30분이어야 합니다");
  for (const row of series.rows) {
    if (row.percentages.length !== series.times.length || row.percentages.some((v) => !Number.isFinite(v) || v < 0)) throw new Error("혼잡도 시간과 값의 수 또는 백분율을 확인하세요");
  }
  const ceiling = Math.max(100, Math.ceil(Math.max(0, ...series.rows.flatMap((r) => r.percentages)) / 50) * 50);
  return <section className="border-t-2 border-ink pt-4">
    <h2 className="text-h2">{series.station}역 열차는 언제 붐빌까</h2>
    <p className="mt-3 text-body">열차 정원 대비 승차 인원 비율(%). 30분 단위 평균이며, 역 안이나 주변 거리의 인파를 뜻하지 않습니다.</p>
    <p className="mt-2 text-caption">{src.org} · {src.title} · {src.date}<SourceRefs ids={[sourceId]} sources={sources} anchorIds={anchorIds} /></p>
    <a href={src.url} rel="noopener" className="inline-flex min-h-11 items-center text-caption underline">혼잡도 원자료 ↗</a>
    {(["평일", "토요일", "일요일"] as const).map((day) => {
      const rows = series.rows.filter((r) => r.day === day);
      return rows.length > 0 && <details key={day} open={day === "평일"} className="mt-4 border border-rule">
        <summary className="min-h-11 cursor-pointer px-4 py-3 text-label">{day} 열차 혼잡도</summary>
        <div className="space-y-6 p-4">{rows.map((row) => {
          const peak = Math.max(...row.percentages);
          const title = `${series.station}역 ${row.line} ${row.direction} · ${day}`;
          const step = 500 / series.times.length;
          return <figure key={`${row.line}-${row.direction}`}>
            <figcaption className="text-label">{title} · 30분 평균 (%)</figcaption>
            <svg viewBox="0 0 560 250" role="img" aria-label={`${title}. 시간대별 값은 아래 표에 있습니다.`} className="mt-3 w-full bg-plate text-plate-ink">
              {[0, 100, ceiling].filter((v, i, a) => a.indexOf(v) === i).map((v) => <g key={v}><line x1="46" y1={210 - v / ceiling * 180} x2="546" y2={210 - v / ceiling * 180} className="stroke-rule" strokeDasharray={v === 100 ? "3 3" : undefined} /><text x="40" y={215 - v / ceiling * 180} textAnchor="end" className="fill-current text-sm">{v}%</text></g>)}
              {row.percentages.map((v, i) => <rect key={series.times[i]} x={46 + i * step + 1} y={210 - v / ceiling * 180} width={Math.max(1, step - 2)} height={v / ceiling * 180} className={v === peak ? "fill-plate-ink" : "fill-plate-ink opacity-50"}><title>{`${series.times[i]} · ${v}%`}</title></rect>)}
              {series.times.map((t, i) => ((i % 6 === 0 && series.times.length - 1 - i >= 3) || i === series.times.length - 1) && <text key={t} x={46 + (i + 0.5) * step} y="236" textAnchor="middle" className="fill-current text-sm">{t}</text>)}
            </svg>
            <p className="mt-2 text-caption">가장 높은 시간: {series.times.filter((_, i) => row.percentages[i] === peak).join(" · ")} · {peak}%. 검은 막대로 표시했습니다.</p>
            <details className="mt-2"><summary className="min-h-11 cursor-pointer py-3 text-label">{title} 시간대별 수치 표</summary>
              <Table className="w-full border-collapse text-sm tabular-nums"><TableCaption className="py-3 text-left text-sm text-ink">{title} · 30분 평균 · {src.date} · {src.org}</TableCaption><TableHeader><TableRow><TableHead scope="col" className="border-b border-rule py-2 text-left">시간</TableHead><TableHead scope="col" className="border-b border-rule py-2 text-right">열차 혼잡도 (%)</TableHead></TableRow></TableHeader><TableBody>{series.times.map((t, i) => <TableRow key={t}><TableHead scope="row" className="border-b border-rule py-2 text-left font-normal">{t}</TableHead><TableCell className="border-b border-rule py-2 text-right">{row.percentages[i]}</TableCell></TableRow>)}</TableBody></Table>
            </details>
          </figure>;
        })}</div>
      </details>;
    })}
    {series.rows.length === 0 && <p className="mt-4 text-body">공개할 혼잡도 자료가 없습니다.</p>}
  </section>;
}
