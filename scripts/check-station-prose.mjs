import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { registerHooks } from "node:module";

// Node 검사에서도 Next의 @/ 별칭과 확장자 없는 콘텐츠 import를 해석한다.
registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/") || specifier.startsWith(".")) {
    const url = specifier.startsWith("@/")
      ? new URL(`../src/${specifier.slice(2)}`, import.meta.url)
      : new URL(specifier, context.parentURL);
    for (const suffix of [".ts", "/index.ts"]) {
      const candidate = new URL(`${url.href}${suffix}`);
      if (existsSync(candidate)) return nextResolve(candidate.href, context);
    }
  }
  return nextResolve(specifier, context);
} });

const { stations } = await import("../src/content/stations/index.ts");
const { stationJsonLd } = await import("../src/lib/jsonld.ts");
const { articleEntries } = await import("../src/lib/article-index.ts");
const escape = (text) => text.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;");
const station = stations.find(item => item.slug === "konkuk-univ");
const html = readFileSync("out/station/konkuk-univ/index.html", "utf8");
const markdown = readFileSync("out/station/konkuk-univ/article.md", "utf8");
const llms = readFileSync("out/llms-full.txt", "utf8");
const rss = readFileSync("out/rss.xml", "utf8").split("<item>").find(item => item.includes("<link>https://www.stationkorea.com/station/konkuk-univ/</link>"));
for (const text of [station.question, station.answer, station.series.title, station.series.description, station.pin.text, ...station.corrections.flatMap(item => [item.before, item.after, item.reason]), ...station.body.flatMap(section => [section.heading, ...section.paragraphs.map(p => p.text)])]) {
  for (const [label, value] of [["HTML", html], ["Markdown", markdown], ["llms", llms], ["RSS", rss]]) {
    assert(value.includes(label === "HTML" || label === "RSS" ? escape(text) : text), `${label} missing: ${text}`);
  }
}
assert.equal(station.qna.length, 0);
assert(!stationJsonLd(station).some(item => item["@type"] === "FAQPage"), "prose is not an invisible FAQ");
for (const oldStation of stations.filter(item => item.slug !== station.slug)) {
  const faq = stationJsonLd(oldStation).find(item => item["@type"] === "FAQPage");
  if (oldStation.qna.length) assert.deepEqual(faq.mainEntity.map(q => q.name), oldStation.qna.map(q => q.question));
  else assert.equal(faq, undefined, "empty Q&A has no FAQ markup");
}
const entry = articleEntries.find(item => item.href === "/station/konkuk-univ/");
assert.deepEqual(entry.series, station.series);
assert.equal(entry.image.src, station.crossSection.src, "corrected illustration replaces old reel cover");
assert.equal(station.crossSection.aiGenerated, false);
assert(!rss.includes("AI 시각화 참고 이미지."), "numeric illustration is not AI generation");
assert(html.indexOf('aria-label="해설 본문"') < html.indexOf("<figure"));
assert(html.indexOf("</figure>") < html.indexOf('id="transfer-heading"'));
assert(!html.includes('aria-label="묻고 답하기"'));
assert.equal(station.transfers.length, 5);
assert(station.corrections.length >= 2);
assert(station.corrections.some(item => item.after.includes("환산 지표")));
console.log("PASS: prose/series parity, visible-only FAQ, preserved guidance/corrections, corrected cover and explanation order");
