import { LineRoundel } from "@/components/line";
import type { ArticleEntry } from "@/lib/article-index";

export function ArticlePlace({ entry, size = "S" }: { entry: Pick<ArticleEntry, "place" | "lines">; size?: "S" | "M" }) {
  if (!entry.place && !entry.lines.length) return null;
  return <span className="inline-flex flex-wrap items-center gap-1.5">
    {entry.lines.map(line => <LineRoundel key={line} line={line} size={size} />)}
    {entry.place && <span className="ml-1 text-sm font-semibold">{entry.place}</span>}
  </span>;
}
