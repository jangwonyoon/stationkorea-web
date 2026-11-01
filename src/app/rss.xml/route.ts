import { lineName } from "@/content/lines";
import { latestStations, stationPath } from "@/content/stations";
import type { Station } from "@/content/types";
import { absoluteUrl, site } from "@/lib/site";
import { articlePath, articles, type MagazineArticle } from "@/content/articles";

export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// 네이버는 RSS에 이미지 링크를 포함한 본문 전체를 권장한다. 화면 기사와 같은 순서·내용으로 만든다.
function fullContent(s: Station): string {
  const n = (id: string) => s.sources.findIndex((x) => x.id === id) + 1;
  const refs = (ids: string[]) => ids.map((id) => `[${n(id)}]`).join("");
  return [
    `<p>${escape(s.answer)}</p>`,
    `<figure><img src="${absoluteUrl(s.crossSection.src)}" alt="${escape(s.crossSection.alt)}"/><figcaption>${escape(s.crossSection.caption)} AI 시각화 참고 이미지.</figcaption></figure>`,
    "<h2>숫자</h2><table><thead><tr><th>숫자</th><th>내용</th><th>기준일</th><th>출처</th></tr></thead><tbody>",
    ...s.stats.map(
      (st) => `<tr><td>${escape(st.value)}</td><td>${escape(st.label)}</td><td>${escape(st.asOf)}</td><td>${refs(st.sourceIds)}</td></tr>`,
    ),
    "</tbody></table>",
    ...s.qna.map(
      (q) => `<h2>${escape(q.question)}</h2>${q.answer.map((p) => `<p>${escape(p)}</p>`).join("")}<p>출처: ${refs(q.sourceIds)}</p>`,
    ),
    `<h2>어디서 내리면 빠른가</h2><p>${escape(s.pin.text)} ${refs(s.pin.sourceIds)}</p>`,
    "<table><thead><tr><th>타고 있는 열차</th><th>갈아탈 노선·방면</th><th>내릴 칸</th><th>소요 시간</th><th>기준일·출처</th></tr></thead><tbody>",
    ...s.transfers.map((t) => {
      const source = s.sources.find((item) => item.id === t.sourceId);
      if (!source) throw new Error(`RSS: transfer source missing: ${t.sourceId}`);
      return `<tr><td>${escape(`${lineName(t.ride.line)} ${t.ride.direction}`)}</td><td>${escape(`${lineName(t.to.line)} ${t.to.direction}`)}</td><td>${escape(t.car)}</td><td>${escape(t.time)}</td><td>${escape(source.date)} ${refs([t.sourceId])}</td></tr>`;
    }),
    "</tbody></table>",
    "<h2>출처</h2><ol>",
    ...s.sources.map(
      (src) =>
        `<li>${escape(`${src.org}, ${src.title}, ${src.date}`)}${src.url ? ` <a href="${escape(src.url)}">${escape(src.url)}</a>` : ""}</li>`,
    ),
    "</ol>",
    `<p><a href="${s.reel.url}">인스타그램 ${site.instagramHandle} 릴스로 보기</a></p>`,
  ].join("");
}

function fullArticleContent(article: MagazineArticle): string {
  const reference = (ids: string[]) => ids.map((id) => `[${article.sources.findIndex((source) => source.id === id) + 1}]`).join("");
  return [
    `<p>${escape(article.answer)} ${reference(article.answerSourceIds)}</p>`,
    ...(article.image ? [`<figure><img src="${absoluteUrl(article.image.src)}" alt="${escape(article.image.alt)}"/><figcaption>${escape(article.image.caption)}</figcaption></figure>`] : []),
    ...article.body.flatMap((section) => [
      `<h2>${escape(section.heading)}</h2>`,
      ...section.paragraphs.map((paragraph) => `<p>${escape(paragraph.text)} ${reference(paragraph.sourceIds)}</p>`),
    ]),
    "<h2>이어 읽기</h2><ul>",
    ...article.related.map((related) => `<li><a href="${absoluteUrl(related.href)}">${escape(related.title)}</a></li>`),
    "</ul><h2>출처</h2><ol>",
    ...article.sources.map((source) => `<li>${escape(`${source.org}, ${source.title}, ${source.date}`)}${source.url ? ` <a href="${escape(source.url)}">${escape(source.url)}</a>` : ""}</li>`),
    "</ol>",
    ...(article.corrections?.length ? ["<h2>정정 기록</h2><ul>", ...article.corrections.map((item) => `<li>${escape(item.date)}: ${escape(item.before)} → ${escape(item.after)}. ${escape(item.reason)}</li>`), "</ul>"] : []),
  ].join("");
}

// /rss.xml — 네이버 서치어드바이저 RSS 제출용. 최신순.
export function GET() {
  const entries = [
    ...latestStations().map((station) => ({
      title: station.question,
      answer: station.answer,
      date: station.datePublished,
      url: absoluteUrl(stationPath(station)),
      content: fullContent(station),
      categories: station.lines.map((line) => lineName(line)),
    })),
    ...articles.map((article) => ({
      title: article.question,
      answer: article.answer,
      date: article.datePublished,
      url: absoluteUrl(articlePath(article)),
      content: fullArticleContent(article),
      categories: [{ transfer: "갈아타다", walk: "걷다", see: "보다", change: "바뀌다" }[article.section]],
    })),
  ].sort((a, b) => b.date.localeCompare(a.date));
  const items = entries.map((entry) => {
    return [
      "<item>",
      `<title>${escape(entry.title)}</title>`,
      `<link>${entry.url}</link>`,
      `<guid isPermaLink="true">${entry.url}</guid>`,
      `<description>${escape(entry.answer)}</description>`,
      `<content:encoded><![CDATA[${entry.content.replaceAll("]]>", "]]&gt;")}]]></content:encoded>`,
      `<pubDate>${new Date(entry.date).toUTCString()}</pubDate>`,
      ...entry.categories.map((category) => `<category>${escape(category)}</category>`),
      "</item>",
    ].join("");
  });
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">',
    "<channel>",
    `<title>${escape(site.name)}</title>`,
    `<link>${absoluteUrl("/")}</link>`,
    `<description>${escape(site.description)}</description>`,
    "<language>ko</language>",
    `<atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml"/>`,
    ...items,
    "</channel>",
    "</rss>",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
