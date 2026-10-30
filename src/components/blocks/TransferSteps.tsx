import type { Source, TransferStep } from "@/content/types";

import { BlockSources, RefMarks, resolveSources } from "./BlockSources";

const KIND_LABEL: Record<TransferStep["kind"], string> = {
  alight: "내림",
  walk: "계단·통로",
  board: "갈아탐",
};

type Props = {
  /** 경로 이름. 예: "4호선 → 2호선 방배 방면". */
  title: string;
  steps: TransferStep[];
  sources: Source[];
  /** 제목 태그. 놓이는 섹션에 맞춘다. */
  headingAs?: "h2" | "h3";
};

/**
 * 환승 스텝: 내림 → 계단·통로 → 갈아탐을 순서 목록(<ol>)으로.
 * 시간·거리는 measure가 있는 단계만 표시한다(확인 안 된 값은 표시하지 않는다).
 */
export function TransferSteps({ title, steps, sources, headingAs: Heading = "h3" }: Props) {
  const where = `환승 스텝 "${title}"`;
  const measured = steps.filter((step) => step.measure?.time?.trim() || step.measure?.distance?.trim());
  for (const { measure } of measured) {
    if (!measure?.asOf.trim() || !/\d{4}/.test(measure.asOf)) throw new Error(`${where}: 측정 기준일이 필요합니다`);
    resolveSources(measure.sourceIds, sources, where);
  }
  return (
    <section className="border-t-2 border-ink pt-3">
      <Heading className="text-label">{title}</Heading>
      <ol className="mt-3 flex flex-col">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3 border-t border-rule py-3 first:border-t-0">
            <span className="w-6 shrink-0 text-label tabular-nums">{i + 1}</span>
            <div className="flex min-w-0 flex-col gap-1">
              <span className="text-label">{KIND_LABEL[step.kind]}</span>
              <p className="text-body">{step.text}</p>
              {step.measure && (step.measure.time?.trim() || step.measure.distance?.trim()) && (
                <p className="text-caption">
                  {[step.measure.time, step.measure.distance].filter(Boolean).join(" · ")}
                  {" · "}
                  {step.measure.asOf}
                  <RefMarks ids={step.measure.sourceIds} sources={sources} where={where} />
                </p>
              )}
            </div>
          </li>
        ))}
      </ol>
      {measured.length > 0 && <BlockSources ids={measured.flatMap((s) => s.measure!.sourceIds)} sources={sources} where={where} />}
    </section>
  );
}
