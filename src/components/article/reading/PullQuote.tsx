import { ReadingSources, type ReadingSourcesProps } from "./ReadingSources";

export type PullQuoteProps = ReadingSourcesProps & { value: string; label: string };

/** 콘텐츠에 별도 asOf가 없으므로 연결된 출처의 기준일을 숫자와 함께 표시한다. */
export function PullQuote({ value, label, sourceIds, sources, anchorIds }: PullQuoteProps) {
  return (
    <aside className="my-12 bg-slab p-6 md:p-8">
      <p className="text-num break-words">{value}</p>
      <p className="mt-3 text-body break-words">{label}</p>
      <ReadingSources sourceIds={sourceIds} sources={sources} anchorIds={anchorIds} />
    </aside>
  );
}
