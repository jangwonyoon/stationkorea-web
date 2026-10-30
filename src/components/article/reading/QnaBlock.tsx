import type { Qna } from "@/content/types";
import { ReadingSources, type ReadingSourcesProps } from "./ReadingSources";

export type QnaBlockProps = Omit<ReadingSourcesProps, "sourceIds"> & { index: number; qna: Qna };

/** index는 0부터 시작한다. Q&A 사이에 풀쿼트를 넣어도 각 블록의 간격을 유지한다. */
export function QnaBlock({ index, qna, sources, anchorIds }: QnaBlockProps) {
  return (
    <section className="my-12 border-t border-rule pt-6">
      <p className="mb-3 text-label text-ink-3 tabular-nums">{String(index + 1).padStart(2, "0")}</p>
      <h2 className="text-h2 break-words">{qna.question}</h2>
      <div className="mt-4 space-y-4 text-body break-words">
        {qna.answer.map((paragraph, i) => <p key={i}>{paragraph}</p>)}
      </div>
      <ReadingSources sourceIds={qna.sourceIds} sources={sources} anchorIds={anchorIds} />
    </section>
  );
}
