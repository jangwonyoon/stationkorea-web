import { LineRoundel, LINE_BG } from "@/components/line";
import { lineName } from "@/content/lines";
import type { Station } from "@/content/types";

export type StationSignProps = {
  station: Pick<Station, "name" | "lines" | "sign">;
};

/** 기준 노선은 배열 순서와 관계없이 sign.line. 인접 역 이름은 링크가 아닌 안내 정보다. */
export function StationSign({ station }: StationSignProps) {
  const { name, lines, sign } = station;
  const transfers = lines.filter((line) => line !== sign.line);
  const orderedLines = [sign.line, ...transfers];

  return (
    <div
      role="img"
      aria-label={`${lineName(sign.line)} ${name}, 이전 역 ${sign.prev}, 다음 역 ${sign.next}${transfers.length ? `, 환승 ${transfers.map(lineName).join("·")}` : ""}`}
      className="rounded-plate bg-plate pt-2 pb-1 text-plate-ink xl:pt-6 xl:pb-4"
    >
      <div aria-hidden="true">
        <div className="flex min-h-11 flex-wrap items-center gap-2 px-3 xl:justify-center xl:gap-4">
          <span className="flex max-w-full flex-wrap gap-1">
            {orderedLines.map((line) => <LineRoundel key={line} line={line} size="L" />)}
          </span>
          <span className="min-w-0">
            <span className="block font-serif text-xl leading-tight font-semibold md:text-3xl">{name}</span>
            <span className="block text-xs leading-4 xl:text-sm">{sign.en}</span>
          </span>
        </div>
        <div className="relative flex h-5 items-center justify-center xl:mt-4 xl:h-8">
          <span className={`absolute inset-x-0 h-2.5 origin-left animate-band-draw motion-reduce:animate-none xl:h-3 ${LINE_BG[sign.line]}`} />
          <span className="absolute flex h-full gap-1">
            {transfers.map((line) => (
              <span key={line} className={`h-full w-2.5 ${LINE_BG[line]}`} />
            ))}
          </span>
          <span className="relative size-4 rounded-full border-2 border-plate-ink bg-plate xl:size-5" />
          <span className="absolute left-1/4 hidden size-4 -translate-x-1/2 rounded-full border-2 border-plate-ink bg-plate xl:block" />
          <span className="absolute right-1/4 hidden size-4 translate-x-1/2 rounded-full border-2 border-plate-ink bg-plate xl:block" />
        </div>
        <div className="flex justify-between gap-2 px-3 text-sm leading-5 xl:px-0">
          <span className="min-w-0 xl:w-1/2 xl:text-center">← {sign.prev}</span>
          <span className="min-w-0 text-right xl:w-1/2 xl:text-center">{sign.next} →</span>
        </div>
      </div>
    </div>
  );
}
