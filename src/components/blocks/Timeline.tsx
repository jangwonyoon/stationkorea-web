import type { TimelineItem } from "@/content/types";

import { StatusBadge } from "./StatusBadge";

/** "2025-07-17" → "2025.7.17", "2025-07" → "2025.7", "2018" → "2018". */
export function formatDot(date: string): string {
  const match = /^(\d{4})(?:-(0[1-9]|1[0-2])(?:-(0[1-9]|[12]\d|3[01]))?)?$/.exec(date);
  if (!match || (match[3] && Number(match[3]) > new Date(Date.UTC(Number(match[1]), Number(match[2]), 0)).getUTCDate())) {
    throw new Error(`연표 날짜를 확인하세요: ${date}`);
  }
  return date
    .split("-")
    .map((p, i) => (i === 0 ? p : String(Number(p))))
    .join(".");
}

type Props = {
  /** 사업 이름. 예: "사당 복합환승센터". */
  title: string;
  items: TimelineItem[];
  headingAs?: "h2" | "h3";
};

/**
 * 진행 연표: 항목마다 "YYYY.M.D 기관 > 문서"와 원문 링크, 단계가 있으면 상태 배지.
 * 날짜 오름차순. 마크업은 <ol>과 <time>.
 */
export function Timeline({ title, items, headingAs: Heading = "h3" }: Props) {
  for (const item of items) {
    formatDot(item.date);
    if (!item.org.trim() || !item.doc.trim() || !/^https?:\/\//.test(item.url ?? "")) throw new Error(`연표 "${title}": 기관·문서·URL이 필요합니다`);
  }
  const sorted = [...items].sort((a, b) => a.date.localeCompare(b.date));
  return (
    <section className="border-t-2 border-ink pt-3">
      <Heading className="text-label">{title}</Heading>
      <ol className="mt-3 flex flex-col">
        {sorted.map((item) => (
          <li key={`${item.date}-${item.doc}`} className="flex flex-col gap-1 border-t border-rule py-3 first:border-t-0">
            <p className="text-label break-keep">
              <time dateTime={item.date} className="tabular-nums">
                {formatDot(item.date)}
              </time>{" "}
              {item.org}
              <span aria-hidden="true"> &gt; </span>
              <span className="sr-only">, </span>
              {item.doc}
            </p>
            {item.stage && (
              <div>
                <StatusBadge stage={item.stage} />
              </div>
            )}
            {item.summary && <p className="text-body">{item.summary}</p>}
            {item.url && (
              <a href={item.url} aria-label={`${item.org} ${item.doc} 원문 보기`} rel="noopener noreferrer" className="inline-flex min-h-11 items-center text-caption underline underline-offset-2">
                원문 보기 ↗
              </a>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
