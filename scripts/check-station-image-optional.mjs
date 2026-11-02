import assert from "node:assert/strict";
import { existsSync } from "node:fs";
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

const { stations, stationPath } = await import("../src/content/stations/index.ts");
const { absoluteUrl } = await import("../src/lib/site.ts");
const { stationJsonLd } = await import("../src/lib/jsonld.ts");
const { stationMarkdown } = await import("../src/lib/markdown.ts");
const { readingMinutes } = await import("../src/lib/reading-time.ts");
const { default: sitemap } = await import("../src/app/sitemap.ts");
const { GET } = await import("../src/app/rss.xml/route.ts");

const station = stations.find(item => item.slug === "jamsil");
const illustration = station.crossSection;
assert(illustration, "fixture starts with an existing illustration");
const withImage = { ...station, body: [{ heading: "해설", paragraphs: [] }] };
assert(stationMarkdown(withImage).includes(illustration.src));
assert.deepEqual(stationJsonLd(station).find(item => item["@type"] === "Article").image, [absoluteUrl(station.ogImage), absoluteUrl(illustration.src)]);

station.crossSection = undefined;
for (const body of [undefined, withImage.body]) {
  const fixture = { ...station, body };
  assert(!stationMarkdown(fixture).includes(illustration.src));
  assert.equal(readingMinutes(fixture), readingMinutes({ ...fixture, crossSection: { ...illustration, caption: "" } }));
}
assert.deepEqual(stationJsonLd(station).find(item => item["@type"] === "Article").image, [absoluteUrl(station.ogImage)]);
assert.equal(sitemap().find(item => item.url === absoluteUrl(stationPath(station))).images, undefined);
const rss = (await GET().text()).split("<item>").find(item => item.includes(`<link>${absoluteUrl(stationPath(station))}</link>`));
assert(rss);
assert(!rss.includes("<figure>"));
assert(!rss.includes(illustration.src));
assert(rss.includes("어디서 내리면 빠른가"), "guidance remains when the illustration is absent");
console.log("PASS: optional station illustration preserves OG and guidance without broken Markdown, RSS, sitemap or reading time");
