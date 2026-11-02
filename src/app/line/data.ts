import { LINES, type LineId } from "@/content/lines";
import { articleEntries } from "@/lib/article-index";

export const publishedLines = (Object.keys(LINES) as LineId[]).filter(id => articleEntries.some(entry => entry.lines.includes(id)));

export function linePath(id: LineId) {
  return `/line/${id}/`;
}

export function lineArticles(id: LineId) {
  return articleEntries.filter(entry => entry.lines.includes(id));
}

export function lineLastModified(id: LineId) {
  return lineArticles(id).map(entry => entry.modified).sort().at(-1);
}
