import { LineRoundel, LINE_BG } from "@/components/line";
import { lineName } from "@/content/lines";
import type { Station, Transfer } from "@/content/types";
import { stationSignDirections } from "@/lib/station-sign";

export type StationSignProps = {
  station: Pick<Station, "name" | "lines" | "sign">;
  transfers?: Transfer[];
};

/** 가로는 기준 노선의 인접 역, 세로는 공식 환승 안내에 확인된 방면이다. */
export function StationSign({ station, transfers = [] }: StationSignProps) {
  const { name, lines, sign } = station;
  const displayName = name.replace(/역$/, "");
  const { crossings, branches } = stationSignDirections(lines, sign, transfers);
  const orderedLines = [sign.line, ...crossings.map(({ line }) => line)];
  const crossingLabel = crossings.map(({ line, directions }) => `${lineName(line)}${directions.length ? ` ${directions.join("·")}` : " 환승"}`).join(", ");
  const labelClass = "relative rounded-plate border border-plate-ink bg-plate px-2 py-1 text-xs leading-5 font-semibold md:px-3 md:text-sm";

  return (
    <div
      data-station-sign
      role="img"
      aria-label={`${name} 역명판. ${lineName(sign.line)} 이전 역 ${sign.prev}, 다음 역 ${sign.next}${crossingLabel ? `, ${crossingLabel}` : ""}${branches.length ? `, ${branches.join(", ")}` : ""}`}
      className="relative overflow-hidden rounded-plate bg-slab text-plate-ink"
    >
      <div aria-hidden="true" className="relative grid gap-2 px-2 py-2 md:block md:h-95 md:p-0">
        <span className={`absolute inset-x-0 top-1/2 h-3 -translate-y-1/2 origin-left animate-band-draw motion-reduce:animate-none ${LINE_BG[sign.line]}`} />
        {crossings.length > 0 && <span className="absolute inset-y-0 left-1/2 flex -translate-x-1/2 gap-1">
          {crossings.map(({ line }) => <span key={line} className={`w-2 ${LINE_BG[line]}`} />)}
        </span>}
        <div className="relative z-10 flex min-h-8 flex-wrap justify-center gap-2 md:absolute md:inset-x-4 md:top-4">
          {crossings.filter(({ directions }) => directions.length).map(({ line, directions }) => <span key={line} className={labelClass}>
            <span className="inline-flex items-center gap-1.5"><LineRoundel line={line} size="S" /><span>↑ {directions[0]}</span></span>
          </span>)}
        </div>
        <div data-station-sign-panel className={`relative z-10 mx-auto flex min-h-24 w-full max-w-95 items-center justify-center gap-2 rounded-plate border-2 border-plate-ink bg-plate px-3 py-2 md:absolute md:top-1/2 md:left-1/2 md:min-h-49 md:w-80 md:-translate-x-1/2 md:-translate-y-1/2 md:flex-col md:gap-3 md:px-4 md:py-5 lg:w-95 ${orderedLines.length > 2 || displayName.length > 8 ? "flex-col" : ""}`}>
          <span className="flex max-w-full flex-wrap items-center justify-center gap-1.5 md:gap-2">
            {orderedLines.map((line) => <LineRoundel key={line} line={line} size="L" />)}
          </span>
          <span className="min-w-0">
            <span className={`block break-keep text-center font-serif text-2xl leading-tight font-bold md:text-3xl lg:leading-none ${displayName.length > 8 ? "lg:text-4xl" : "lg:text-station-name"}`}>{displayName}</span>
            <span className="block text-center text-xs leading-5 text-plate-ink md:text-sm">{sign.en}</span>
          </span>
        </div>
        <div className="relative z-10 flex justify-between gap-3 md:absolute md:inset-x-6 md:top-1/2 md:-translate-y-1/2">
          <span className={labelClass}>← {sign.prev}</span>
          <span className={`${labelClass} text-right`}>{sign.next} →</span>
        </div>
        <div className="relative z-10 flex min-h-8 flex-wrap justify-center gap-2 md:absolute md:inset-x-4 md:bottom-4">
          {crossings.filter(({ directions }) => directions.length).map(({ line, directions }) => <span key={line} className={labelClass}>
            <span className="inline-flex items-center gap-1.5"><LineRoundel line={line} size="S" /><span>↓ {directions[1]}</span></span>
          </span>)}
          {branches.map((direction) => <span key={direction} className={labelClass}>{direction}</span>)}
        </div>
      </div>
    </div>
  );
}
