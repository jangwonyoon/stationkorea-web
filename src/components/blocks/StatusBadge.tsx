import type { ProjectStage } from "@/content/types";

export const STAGES: ProjectStage[] = ["구상", "계획", "설계", "시공"];

/**
 * 사업 진행 단계 배지(신호등 4단계). 채움 칸만으로 말하지 않도록 단계 이름을 글자로 쓰고,
 * 스크린리더에는 "진행 4단계 중 N단계"를 함께 읽힌다. 시각 스타일은 2차 시안에서 D1이 갱신한다.
 */
export function StatusBadge({ stage }: { stage: ProjectStage }) {
  const n = STAGES.indexOf(stage) + 1;
  return (
    <span className="inline-flex items-center gap-2 rounded-plate border border-ink px-2 py-1 text-label">
      <span aria-hidden="true" className="flex gap-0.5">
        {STAGES.map((s, i) => (
          <span key={s} className={i < n ? "size-2 bg-ink" : "size-2 border border-rule"} />
        ))}
      </span>
      <span>{stage}</span>
      <span className="sr-only">(진행 4단계 중 {n}단계)</span>
    </span>
  );
}
