import { lineName } from "@/content/lines";
import type { Station } from "@/content/types";
import { stationPath } from "@/content/stations";
import { absoluteUrl, site } from "@/lib/site";

// AI 답변엔진용 기사 마크다운. HTML과 같은 콘텐츠에서 만들어 어긋나지 않게 한다.
export function stationMarkdown(s: Station): string {
  const n = (id: string) => s.sources.findIndex((x) => x.id === id) + 1;
  const refs = (ids: string[]) => ids.map((id) => `[${n(id)}]`).join("");
  return [
    `# ${s.question}`,
    "",
    `${site.name} · 역 해부 ${String(s.no).padStart(2, "0")} · ${s.name} · ${s.lines.map(lineName).join("·")}`,
    `원문: ${absoluteUrl(stationPath(s))}`,
    `게시: ${s.datePublished.slice(0, 10)} · 숫자 갱신: ${s.dateModified.slice(0, 10)}`,
    "",
    s.answer,
    "",
    "## 숫자",
    "",
    "| 숫자 | 내용 | 기준일 | 출처 |",
    "|---|---|---|---|",
    ...s.stats.map((st) => `| ${st.value} | ${st.label} | ${st.asOf} | ${refs(st.sourceIds)} |`),
    "",
    "## 어디서 내리면 빠른가",
    "",
    `${s.pin.text} ${refs(s.pin.sourceIds)}`,
    "",
    ...s.qna.flatMap((q) => [`## ${q.question}`, "", ...q.answer.map((p) => `${p}\n`), `출처: ${refs(q.sourceIds)}`, ""]),
    "## 출처",
    "",
    ...s.sources.map((src, i) => `${i + 1}. ${src.org}, ${src.title}, ${src.date}${src.url ? `. ${src.url}` : ""}`),
    "",
    `릴스 영상: ${s.reel.url}`,
    "",
  ].join("\n");
}

export function markdownPath(s: Pick<Station, "slug">): string {
  return `${stationPath(s)}article.md`;
}
