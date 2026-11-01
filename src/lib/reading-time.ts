import type { Station } from "@/content/types";
import type { MagazineArticle } from "@/content/articles";

// 공백 제외 500자/분은 이 사이트의 추정 기준이며, 독자의 실제 속도를 측정한 값은 아니다.
const CHARACTERS_PER_MINUTE = 500;

export function readingMinutes(station: Station): number {
  const text = [
    station.question,
    station.answer,
    station.crossSection.caption,
    ...station.stats.flatMap((stat) => [stat.value, stat.label]),
    station.pin.text,
    ...station.transfers.flatMap((transfer) => [transfer.ride.direction, transfer.to.direction, transfer.car, transfer.time]),
    ...station.qna.flatMap((qna) => [qna.question, ...qna.answer]),
  ];
  if (station.qna.length > 0) {
    const quote = station.pullQuote ?? station.stats[0];
    if (quote) text.push(quote.value, quote.label);
    if (station.comparison) {
      text.push(station.comparison.title, ...station.comparison.columns);
      text.push(...station.comparison.rows.flatMap((row) => [row.label, ...row.values, row.note ?? ""]));
    }
  }
  // shortcut: 현재 기사에 미노출인 단계·연표는 제외, 기사 렌더러가 해당 블록을 표시할 때 집계도 확장한다.
  return Math.max(1, Math.ceil(Array.from(text.join("").replace(/\s/g, "")).length / CHARACTERS_PER_MINUTE));
}

export function articleReadingMinutes(article: MagazineArticle): number {
  const text = [article.question, article.answer, ...(article.station ? [article.station.name, article.station.sign.en, article.station.sign.prev, article.station.sign.next] : []), ...(article.transfers ?? []).flatMap((transfer) => [transfer.ride.direction, transfer.to.direction, transfer.car, transfer.toCar ?? "", transfer.time]), ...article.body.flatMap((section) => [section.heading, ...section.paragraphs.map((paragraph) => paragraph.text)])];
  return Math.max(1, Math.ceil(Array.from(text.join("").replace(/\s/g, "")).length / CHARACTERS_PER_MINUTE));
}
