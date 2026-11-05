import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { registerHooks } from "node:module";

registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/") || specifier.startsWith(".")) {
    const url = specifier.startsWith("@/") ? new URL(`../src/${specifier.slice(2)}`, import.meta.url) : new URL(specifier, context.parentURL);
    for (const suffix of [".ts", "/index.ts"]) {
      const candidate = new URL(`${url.href}${suffix}`);
      if (existsSync(candidate)) return nextResolve(candidate.href, context);
    }
  }
  return nextResolve(specifier, context);
} });

const { articles } = await import("../src/content/articles.ts");
const { stations } = await import("../src/content/stations/index.ts");
const { GET } = await import("../src/app/rss.xml/route.ts");
const items = (xml) => [...xml.matchAll(/<item>(.*?)<\/item>/gs)].map((match) => match[1]);
const content = (item) => item.match(/<content:encoded><!\[CDATA\[(.*?)\]\]><\/content:encoded>/s)[1];
const metadata = (xml) => items(xml).map((item) => ["link", "guid", "pubDate"].map((tag) => item.match(new RegExp(`<${tag}[^>]*>(.*?)</${tag}>`))[1]));
const feed = await GET().text();
assert.equal(readFileSync("out/rss.xml", "utf8"), feed, "exported RSS matches route");
assert.equal(items(feed).length, articles.length + stations.length);
if (process.argv[2]) {
  const before = readFileSync(process.argv[2], "utf8");
  assert.deepEqual(metadata(feed), metadata(before), "URLs, dates and ordering stay unchanged");
  const stationItems = (xml) => items(xml).filter((item) => /<link>[^<]*\/station\//.test(item));
  assert.deepEqual(stationItems(feed), stationItems(before), "Station items stay byte-for-byte unchanged");
}
const seongsu = articles.find((article) => article.slug === "seongsu-branch");
const seongsuContent = content(items(feed).find((item) => item.includes("<link>https://www.stationkorea.com/article/seongsu-branch/</link>")));
assert(seongsuContent.includes(seongsu.image.src) && seongsuContent.includes(seongsu.image.source), "역 사진과 출처가 RSS에 함께 표시된다");
const gimpoContent = content(items(feed).find((item) => item.includes("<link>https://www.stationkorea.com/article/gimpo-extension-status/</link>")));
assert(gimpoContent.includes("<h2>공식 자료로 확인한 사업 흐름</h2><ol>"), "김포 연장 기사 연표가 RSS에 포함된다");
assert(gimpoContent.indexOf("2026-03-10") < gimpoContent.indexOf("2026-09-18"), "김포 연표는 날짜순으로 표시된다");
const gimpoMarkdown = readFileSync("out/article/gimpo-extension-status/article.md", "utf8");
assert(gimpoMarkdown.includes("## 공식 자료로 확인한 사업 흐름") && gimpoMarkdown.indexOf("2026-03-10") < gimpoMarkdown.indexOf("2026-09-18"), "김포 연표가 Markdown에도 날짜순으로 포함된다");
for (const text of [seongsu.series.title, seongsu.series.description, ...seongsu.body.flatMap((section) => [
  ...(section.figure ? [section.figure.title, ...section.figure.descriptions, section.figure.caption] : []),
  ...(section.scope ? [section.scope.known, section.scope.unknown] : []),
]), ...seongsu.transfers.flatMap((transfer) => [transfer.car, transfer.time, seongsu.sources.find((source) => source.id === transfer.sourceId).date])]) {
  assert(seongsuContent.includes(text), `Seongsu RSS missing: ${text}`);
}

const originalArticles = [...articles];
const unsafe = '<tag attr="value">& ]]>';
const escaped = "&lt;tag attr=&quot;value&quot;&gt;&amp; ]]&gt;";
const fixture = {
  ...structuredClone(seongsu),
  image: undefined,
  question: unsafe,
  answer: unsafe,
  answerSourceIds: ["route"],
  series: { title: `series ${unsafe}`, description: `introduction ${unsafe}` },
  body: [{ heading: "body", paragraphs: [{ text: "paragraph", sourceIds: ["route"] }],
    figure: { kind: "seongsu-current", title: `figure ${unsafe}`, descriptions: [`description ${unsafe}`], caption: `caption ${unsafe}`, sourceIds: ["formation"] },
    scope: { known: `known ${unsafe}`, unknown: `unknown ${unsafe}` },
  }],
  transfers: [{ ride: { line: "2", direction: `ride ${unsafe}` }, to: { line: "2", direction: `to ${unsafe}` }, car: "1-1", toCar: "2-2", time: `time ${unsafe}`, sourceId: "route", formation: { cars: 4, sourceId: "formation" } }],
  sources: [
    { id: "route", org: `route org ${unsafe}`, title: "route source", date: `route date ${unsafe}`, url: 'https://example.com/?a=1&b="2"' },
    { id: "formation", org: `formation org ${unsafe}`, title: "formation source", date: `formation date ${unsafe}` },
  ],
};
try {
  articles.splice(0, articles.length, fixture);
  const fixtureFeed = await GET().text();
  const html = content(items(fixtureFeed).find((item) => item.includes("<link>https://www.stationkorea.com/article/seongsu-branch/</link>")));
  for (const prefix of ["series", "introduction", "figure", "description", "caption", "known", "unknown", "ride", "to", "time", "route org", "route date", "formation org", "formation date"]) {
    assert(html.includes(`${prefix} ${escaped}`), `${prefix} is HTML escaped`);
  }
  assert(fixtureFeed.includes(`<title>${escaped}</title>`), "XML title is escaped");
  assert(fixtureFeed.includes(`<description>${escaped}</description>`), "XML description is escaped");
  assert(!html.includes(unsafe) && !html.includes("]]>"), "content cannot inject HTML or close CDATA");
  assert(html.includes('href="https://example.com/?a=1&amp;b=&quot;2&quot;"'), "source URL attribute is escaped");
  assert(html.includes(`caption ${escaped} [2]</figcaption>`), "figure source numbers match source list");
  assert(html.includes(`route date ${escaped} [1]</td>`), "transfer date and source stay together");
  assert(html.includes(`formation date ${escaped}) [2]`), "formation basis retains its own source");
  assert(html.includes("4칸 편성") && html.includes("승차 위치 2-2"));
  assert(html.includes("표의 시간은 자료 기준일의 경로별 참고값입니다. 실제 이동 시간은 보행 속도와 혼잡에 따라 달라집니다."));
  const order = ["series ", "<p>&lt;tag", "<h2>body", "paragraph", "<figure>", "<dl>", "어디서 내리면 빠른가", "이어 읽기", "<h2>출처"];
  for (let index = 1; index < order.length; index++) assert(html.indexOf(order[index - 1]) < html.indexOf(order[index]), `reading order: ${order[index]}`);

  delete fixture.transfers[0].formation;
  delete fixture.transfers[0].toCar;
  let absent = content(items(await GET().text()).find((item) => item.includes("<link>https://www.stationkorea.com/article/seongsu-branch/</link>")));
  assert(!absent.includes("칸 편성") && !absent.includes("승차 위치"));
  delete fixture.series;
  delete fixture.body[0].figure;
  delete fixture.body[0].scope;
  for (const transfers of [undefined, []]) {
    fixture.transfers = transfers;
    absent = content(items(await GET().text()).find((item) => item.includes("<link>https://www.stationkorea.com/article/seongsu-branch/</link>")));
    for (const marker of ["연재:", "<figure>", "<dl>", "어디서 내리면 빠른가", "<table>"]) assert(!absent.includes(marker), `absent optional block: ${marker}`);
    assert(absent.includes("paragraph") && absent.includes("<h2>출처"));
  }
  fixture.transfers = [{ ...seongsu.transfers[0], sourceId: "missing" }];
  assert.throws(() => GET(), /transfer source missing/);
  fixture.transfers[0].sourceId = "route";
  fixture.transfers[0].formation = { cars: 4, sourceId: "missing" };
  assert.throws(() => GET(), /formation source missing/);
} finally {
  articles.splice(0, articles.length, ...originalArticles);
}
console.log("PASS: RSS entries match published articles, exported content, article timeline parity, Seongsu explanations, optional blocks/order, transfer basis, escaping and missing-source guards");
