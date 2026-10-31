import { SourceRefs } from "@/components/SourceRefs";
import { resolveSources } from "@/components/blocks/BlockSources";
import type { Source } from "@/content/types";

export type ReadingSourcesProps = {
  sourceIds: string[];
  sources: Source[];
  /** firstCitations가 이 블록에 배정한 첫 인용 ID만 전달한다. */
  anchorIds?: readonly string[];
};

export function ReadingSources({ sourceIds, sources, anchorIds }: ReadingSourcesProps) {
  const refs = resolveSources(sourceIds, sources, "읽기 블록");
  return (
    <div className="mt-3 flex flex-wrap gap-x-3 text-caption">
      {refs.map(({ src }) => <span key={src.id}>
        <SourceRefs ids={[src.id]} sources={sources} anchorIds={anchorIds} /> {src.date}
      </span>)}
    </div>
  );
}
