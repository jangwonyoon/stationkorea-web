import Link from "next/link";

import { type LineId, lineName } from "@/content/lines";

import { LINE_BG, LINE_BORDER, LINE_TEXT_ON } from "./lineClasses";

export type LineRoundelSize = "L" | "M" | "S";

export type LineRoundelProps = {
  line: LineId;
  /** L 44px 채움(역명판·노선 허브 제목), M 28px 링(기사 목록·다음 질문), S 20px 링(본문·표 안). 기본 M. */
  size?: LineRoundelSize;
  /** 있으면 44×44 터치 영역의 링크가 된다. disabled면 무시. */
  href?: string;
  /** 기사 없는 노선: 회색 + aria-disabled, 링크 아님. */
  disabled?: boolean;
  /** 바깥 요소(링크면 링크, 아니면 원)에 붙는다. 배치용(margin 등)만 넘긴다. */
  className?: string;
};

const BASE = "inline-flex shrink-0 items-center justify-center rounded-full font-semibold leading-none tabular-nums";

const SIZE: Record<LineRoundelSize, string> = {
  L: "size-11 text-2xl",
  M: "size-7 border-3 text-sm",
  S: "size-5 border-2 text-xs",
};

function colorClasses(line: LineId, size: LineRoundelSize, disabled: boolean): string {
  if (size === "L") {
    // 채움: 노선색 면 + 채움 위 숫자색. 비활성은 회색(선) 면 + 먹.
    return disabled ? "bg-rule text-ink" : `${LINE_BG[line]} ${LINE_TEXT_ON[line]}`;
  }
  // 링: 흰 판 + 노선색 테두리 + 먹 숫자. 비활성은 판 회색 + 회색 테두리 + 먹3.
  return disabled ? "border-rule bg-slab text-ink-3" : `${LINE_BORDER[line]} bg-plate text-plate-ink`;
}

function cx(...parts: (string | false | undefined)[]): string {
  return parts.filter(Boolean).join(" ");
}

/**
 * 노선 원형 번호. 화면에는 숫자만, 스크린리더에는 "2호선"(role="img" + aria-label).
 * 노선색을 빼도(흑백·색각 차이) 숫자로 노선을 구분할 수 있다.
 */
export function LineRoundel({ line, size = "M", href, disabled = false, className }: LineRoundelProps) {
  const isLink = Boolean(href) && !disabled;
  const circle = (
    <span
      role={disabled ? "group" : "img"}
      aria-label={lineName(line)}
      aria-disabled={disabled || undefined}
      className={cx(BASE, SIZE[size], colorClasses(line, size, disabled), !isLink && className)}
    >
      {line}
    </span>
  );

  if (!href || disabled) return circle;

  // 링크: 원 크기와 관계없이 터치 영역 44×44. 눌림은 원 둘레에 판 회색(slab)이 비치고 1px 내려간다.
  return (
    <Link
      href={href}
      className={cx(
        "pressable inline-flex size-11 shrink-0 items-center justify-center rounded-full",
        size === "L" && "active:ring-4 active:ring-slab",
        className,
      )}
    >
      {circle}
    </Link>
  );
}
