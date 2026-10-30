import type { Source } from "@/content/types";
import { refAnchor, srcAnchor } from "@/components/SourceRefs";

export function SourceList({ sources }: { sources: readonly Source[] }) {
  return (
    <section id="sources" aria-labelledby="sources-heading" className="scroll-mt-16 border-t-2 border-ink pt-4">
      <h2 id="sources-heading" className="text-h2">출처</h2>
      <ol className="mt-4 text-caption">
        {sources.map((source, index) => (
          <li key={source.id} id={srcAnchor(source.id)} className="flex scroll-mt-16 gap-3 border-b border-rule py-3 target:bg-slab">
            <span className="w-6 shrink-0 tabular-nums">{index + 1}</span>
            <div className="min-w-0 flex-1 break-words">
              <p>{source.org}. {source.title}. {source.date}.</p>
              <div className="flex flex-wrap gap-x-4">
                {source.url && <a href={source.url} className="inline-flex min-h-11 items-center underline underline-offset-2" rel="noopener noreferrer">원문 보기</a>}
                <a href={`#${refAnchor(source.id)}`} aria-label={`출처 ${index + 1} 본문으로`} className="inline-flex min-h-11 items-center underline underline-offset-2">본문으로 ↑</a>
              </div>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
