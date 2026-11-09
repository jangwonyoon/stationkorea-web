import { lineName } from "@/content/lines";
import type { Station } from "@/content/types";
import { stationPath, stations } from "@/content/stations";
import { absoluteUrl, site } from "@/lib/site";
import { articlePath, type MagazineArticle } from "@/content/articles";
import { stationPhotoCredit } from "@/content/station-photos";

// AI 답변엔진용 기사 마크다운. HTML과 같은 콘텐츠에서 만들어 어긋나지 않게 한다.
export function stationMarkdown(s: Station): string {
  const n = (id: string) => s.sources.findIndex((x) => x.id === id) + 1;
  const refs = (ids: string[]) => ids.map((id) => `[${n(id)}]`).join("");
  return [
    `# ${s.question}`,
    "",
    `${site.name} · 역 해부 ${String(s.no).padStart(2, "0")} · ${s.name} · ${s.lines.map(lineName).join("·")}`,
    `글: [${site.author.name}](${absoluteUrl(site.author.path)})`,
    `원문: ${absoluteUrl(stationPath(s))}`,
    `게시: ${s.datePublished.slice(0, 10)} · 숫자 갱신: ${s.dateModified.slice(0, 10)}`,
    "",
    ...(s.series ? [`연재: ${s.series.title}`, s.series.description, ""] : []),
    `${s.answer}${s.answerSourceIds?.length ? ` ${refs(s.answerSourceIds)}` : ""}`,
    "",
    ...(s.photo ? [`![${s.photo.alt}](${absoluteUrl(s.photo.src)})`, "", s.photo.caption, stationPhotoCredit(s.photo), ""] : []),
    "## 숫자",
    "",
    "| 숫자 | 내용 | 기준일 | 출처 |",
    "|---|---|---|---|",
    ...s.stats.map((st) => `| ${st.value} | ${st.label} | ${st.asOf} | ${refs(st.sourceIds)} |`),
    "",
    ...(s.body ?? []).flatMap((section) => [`## ${section.heading}`, "", ...section.paragraphs.flatMap((paragraph) => [`${paragraph.text} ${refs(paragraph.sourceIds)}`, ""])]),
    ...s.qna.flatMap((q) => [`## ${q.question}`, "", ...q.answer.map((p) => `${p}\n`), `출처: ${refs(q.sourceIds)}`, ""]),
    ...(s.body && s.crossSection ? [`![${s.crossSection.alt}](${absoluteUrl(s.crossSection.src)})`, "", s.crossSection.caption, ""] : []),
    ...(s.transfers.length ? ["## 어디서 내리면 빠른가",
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
    ""] : []),
    "## 이어 읽기", "",
    ...stations.filter((station) => station.slug !== s.slug).map((station) => `- [${station.question}](${absoluteUrl(stationPath(station))})`),
    "",
    "## 출처",
    "",
    ...s.sources.map((src, i) => `${i + 1}. ${src.org}, ${src.title}, ${src.date}${src.url ? `. ${src.url}` : ""}`),
    "",
    ...(s.corrections?.length ? ["## 정정 기록", "", ...s.corrections.map((item) => `- ${item.date}: ${item.before} → ${item.after}. ${item.reason}`), ""] : []),
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
    `${site.name}`,
    ...(article.series ? [`연재: ${article.series.title}`, article.series.description] : []),
    `글: [${site.author.name}](${absoluteUrl(site.author.path)})`,
    `원문: ${absoluteUrl(articlePath(article))}`,
    `게시: ${article.datePublished.slice(0, 10)} · 갱신: ${article.dateModified.slice(0, 10)}`,
    ...(article.station ? ["", `역명판: ${article.station.name} (${article.station.sign.en}) · ${article.station.lines.map(lineName).join("·")}`, `${lineName(article.station.sign.line)}: ${article.station.sign.prev} ← ${article.station.name} → ${article.station.sign.next} ${reference(article.station.sourceIds)}`] : []),
    "", `${article.answer} ${reference(article.answerSourceIds)}`, "",
    ...(article.image && article.imagePlacement !== "body" ? [`![${article.image.alt}](${absoluteUrl(article.image.src)})`, "", article.image.caption, stationPhotoCredit(article.image), ""] : []),
    ...article.body.flatMap((section) => [
      `## ${section.heading}`, "",
      ...section.paragraphs.flatMap((paragraph) => [`${paragraph.text} ${reference(paragraph.sourceIds)}`, ""]),
      ...(section.image ? [`![${section.image.alt}](${absoluteUrl(section.image.src)})`, "", section.image.caption, stationPhotoCredit(section.image), ""] : []),
      ...(section.comparison ? [section.comparison.title, "", `| 구분 | ${section.comparison.columns.join(" | ")} |`, `|---|${section.comparison.columns.map(() => "---").join("|")}|`, ...section.comparison.rows.map((row) => `| ${row.label} | ${row.values.join(" | ")} |`), "", ...section.comparison.rows.map((row) => `${row.label}: ${row.note ?? ""} ${reference(row.sourceIds)}`), ""] : []),
      ...(section.visual ? [`![${section.visual.alt}](${absoluteUrl(section.visual.src)})`, "", `${section.visual.caption} ${reference([section.visual.sourceId])} · [${section.visual.license.name}](${section.visual.license.url})`, ""] : []),
      ...(section.figure ? [section.figure.title, "", ...section.figure.descriptions.map((text) => `- ${text}`), "", `${section.figure.caption} ${reference(section.figure.sourceIds)}`, ""] : []),
      ...(section.scope ? [`알 수 있는 것: ${section.scope.known}`, `알 수 없는 것: ${section.scope.unknown}`, ""] : []),
    ]),
    ...(article.timelines?.flatMap((timeline) => [
      `## ${timeline.title}`, "",
      ...timeline.items.slice().sort((a, b) => a.date.localeCompare(b.date)).flatMap((item) => [`### ${item.date} · ${item.org} · ${item.doc}`, "", ...(item.summary ? [item.summary, ""] : []), `[원문](${item.url})`, ""]),
    ]) ?? []),
    ...(article.transfers?.length ? ["## 어디서 내리면 빠른가", "", "표의 시간은 자료 기준일의 경로별 참고값입니다. 실제 이동 시간은 보행 속도와 혼잡에 따라 달라집니다.", "", "| 타고 있는 열차 | 갈아탈 노선·방면 | 내릴 칸(호차-문) | 참고 시간 | 기준일·출처 |", "|---|---|---|---|---|", ...article.transfers.map((transfer) => {
      const source = article.sources.find((item) => item.id === transfer.sourceId)!;
      const formationSource = transfer.formation ? article.sources.find((item) => item.id === transfer.formation!.sourceId)! : undefined;
      const formation = transfer.formation ? ` · ${transfer.formation.cars}칸 편성 (${formationSource!.org} · ${formationSource!.date}) ${reference([transfer.formation.sourceId])}` : "";
      return `| ${lineName(transfer.ride.line)} ${transfer.ride.direction} | ${lineName(transfer.to.line)} ${transfer.to.direction}${transfer.toCar ? ` · 승차 위치 ${transfer.toCar}` : ""} | ${transfer.car}${formation} | ${transfer.time} | ${source.org} · ${source.date} ${reference([transfer.sourceId])} |`;
    }), ""] : []),
    ...(article.reel ? [`릴스 영상: ${article.reel.url}`, ""] : []),
    "## 이어 읽기", "", ...article.related.map((related) => `- [${related.title}](${absoluteUrl(related.href)})`), "",
    "## 출처", "", ...article.sources.map((source, index) => `${index + 1}. ${source.org}, ${source.title}, ${source.date}${source.url ? `. ${source.url}` : ""}`), "",
    ...(article.corrections?.length ? ["## 정정 기록", "", ...article.corrections.map((item) => `- ${item.date}: ${item.before} → ${item.after}. ${item.reason}`), ""] : []),
  ].join("\n");
}
