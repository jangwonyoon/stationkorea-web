import { lineName } from "@/content/lines";
import { latestStations, stationPath } from "@/content/stations";
import type { Station } from "@/content/types";
import { absoluteUrl, site } from "@/lib/site";

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

// /rss.xml — 네이버 서치어드바이저 RSS 제출용. 최신순.
export function GET() {
  const items = latestStations().map((s) => {
    const url = absoluteUrl(stationPath(s));
    return [
      "<item>",
      `<title>${escape(s.question)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<description>${escape(s.answer)}</description>`,
      `<content:encoded><![CDATA[${fullContent(s).replaceAll("]]>", "]]&gt;")}]]></content:encoded>`,
      `<pubDate>${new Date(s.datePublished).toUTCString()}</pubDate>`,
      ...s.lines.map((line) => `<category>${escape(lineName(line))}</category>`),
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
