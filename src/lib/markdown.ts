import { lineName } from "@/content/lines";
import type { Station } from "@/content/types";
import { stationPath } from "@/content/stations";
import { absoluteUrl, site } from "@/lib/site";
import { articlePath, type MagazineArticle } from "@/content/articles";

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
    ...s.qna.flatMap((q) => [`## ${q.question}`, "", ...q.answer.map((p) => `${p}\n`), `출처: ${refs(q.sourceIds)}`, ""]),
    "## 어디서 내리면 빠른가",
    "",
    `${s.pin.text} ${refs(s.pin.sourceIds)}`,
    "",
    "| 타고 있는 열차 | 갈아탈 노선·방면 | 내릴 칸 | 소요 시간 | 기준일·출처 |",
    "|---|---|---|---|---|",
    ...s.transfers.map((t) => {
      const source = s.sources.find((item) => item.id === t.sourceId);
      if (!source) throw new Error(`stationMarkdown: transfer source missing: ${t.sourceId}`);
      return `| ${lineName(t.ride.line)} ${t.ride.direction} | ${lineName(t.to.line)} ${t.to.direction} | ${t.car} | ${t.time} | ${source.date} [${n(t.sourceId)}] |`;
    }),
    "",
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

export function articleMarkdownPath(article: Pick<MagazineArticle, "slug">): string {
  return `${articlePath(article)}article.md`;
}

export function articleMarkdown(article: MagazineArticle): string {
  const reference = (ids: string[]) => ids.map((id) => `[${article.sources.findIndex((source) => source.id === id) + 1}]`).join("");
  return [
    `# ${article.question}`, "",
    `원문: ${absoluteUrl(articlePath(article))}`,
    `게시: ${article.datePublished.slice(0, 10)} · 갱신: ${article.dateModified.slice(0, 10)}`,
    "", `${article.answer} ${reference(article.answerSourceIds)}`, "",
    ...(article.image ? [`![${article.image.alt}](${absoluteUrl(article.image.src)})`, "", article.image.caption, ""] : []),
    ...article.body.flatMap((section) => [`## ${section.heading}`, "", ...section.paragraphs.flatMap((paragraph) => [`${paragraph.text} ${reference(paragraph.sourceIds)}`, ""])]),
    "## 이어 읽기", "", ...article.related.map((related) => `- [${related.title}](${absoluteUrl(related.href)})`), "",
    "## 출처", "", ...article.sources.map((source, index) => `${index + 1}. ${source.org}, ${source.title}, ${source.date}${source.url ? `. ${source.url}` : ""}`), "",
    ...(article.corrections?.length ? ["## 정정 기록", "", ...article.corrections.map((item) => `- ${item.date}: ${item.before} → ${item.after}. ${item.reason}`), ""] : []),
  ].join("\n");
}
