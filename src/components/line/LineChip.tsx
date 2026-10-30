import Link from "next/link";

import type { LineId } from "@/content/lines";

import { LineRoundel } from "./LineRoundel";

export type LineChipProps = {
  /** 원형 번호로 보일 노선. 첫 번째가 기준 노선. */
  lines: LineId[];
  /** 역·노선 이름("사당", "건대입구역"). */
  label: string;
  /** 원형 번호 크기. 기본 M(28px), 본문·표 안이면 S(20px). */
  size?: "M" | "S";
  /** 있으면 칩 전체가 링크(높이 44px 이상). disabled면 무시. */
  href?: string;
  /** 기사 없는 노선·역: 회색 + aria-disabled, 링크 아님. */
  disabled?: boolean;
  /** 바깥 요소에 붙는다. 배치용(margin 등)만 넘긴다. */
  className?: string;
};

/**
 * 노선 칩: 원형 번호 + 역·노선 이름. 홈 목록·다음 질문 카드용.
 * 스크린리더에는 "2호선 4호선 사당"으로 읽힌다. 카드 전체가 링크인 곳에서는 href 없이 쓴다(링크 중첩 금지).
 */
export function LineChip({ lines, label, size = "M", href, disabled = false, className }: LineChipProps) {
  const content = (
    <>
      <span className="inline-flex items-center gap-1">
        {lines.map((line) => (
          <LineRoundel key={line} line={line} size={size} disabled={disabled} />
        ))}
      </span>
      <span className={disabled ? "text-label text-ink-3" : "text-label"}>{label}</span>
    </>
  );

  if (href && !disabled) {
    return (
      <Link
        href={href}
        className={["pressable inline-flex min-h-11 items-center gap-2 rounded-plate px-2", className]
          .filter(Boolean)
          .join(" ")}
      >
        {content}
      </Link>
    );
  }

  return (
    <span
      aria-disabled={disabled || undefined}
      className={["inline-flex items-center gap-2", className].filter(Boolean).join(" ")}
    >
      {content}
    </span>
  );
}
