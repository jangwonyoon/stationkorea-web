import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
const read = path => readFile(`out/${path}`, "utf8");
const jsonLd = html => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
  .flatMap(match => JSON.parse(match[1]));
const titleOf = html => html.match(/<title>(.*?)<\/title>/s)?.[1];
const iconSizes = "16x16 32x32 48x48 64x64";
function checkIcon(html) {
  const icons = [...html.matchAll(/<link\b[^>]*\brel="(?:icon|shortcut icon)"[^>]*>/g)];
  assert.equal(icons.length, 1, "대표 파비콘 링크 하나");
  assert(icons[0][0].includes('href="https://www.stationkorea.com/favicon.ico"'));
  assert(icons[0][0].includes('type="image/x-icon"'));
  assert(icons[0][0].includes(`sizes="${iconSizes}"`));
}
const home = await read("index.html");
const homeTitle = "STATION KOREA(스테이션코리아) — 길과 동네를 읽는 웹매거진";
assert.equal(titleOf(home), homeTitle);
assert(home.includes(`property="og:title" content="${homeTitle}"`));
assert(home.includes('property="og:site_name" content="STATION KOREA"'));
assert(home.includes('rel="canonical" href="https://www.stationkorea.com/"'));
assert(home.includes("역에서 시작해, 길과 동네와 도시를 읽습니다."));
const websites = jsonLd(home).filter(item => item["@type"] === "WebSite");
assert.equal(websites.length, 1);
assert.equal(websites[0].name, "STATION KOREA");
assert.equal(websites[0].publisher.name, "STATION KOREA");
assert.equal(websites[0].url, "https://www.stationkorea.com/");
assert.deepEqual(websites[0].alternateName, ["스테이션코리아", "스테이션 코리아", "StationKorea"]);
assert(home.includes("STATION KOREA"));
assert(home.includes("영상으로 만나는"));
assert(home.includes("매일 그 길"));
assert(home.includes('href="/line/"'));
assert(!home.includes('STATION KOREA ×'));
const about = await read("about/index.html");
for (const html of [home, about]) {
  checkIcon(html);
  const footer = html.match(/<footer\b[^>]*>(.*?)<\/footer>/s)?.[1].replace(/<!--.*?-->|<wbr\s*\/?>/gs, "");
  assert(footer?.includes("STATION KOREA(스테이션코리아)는 교통과 공간의 구조"));
  assert(html.includes('class="brand-wordmark"'));
}
assert(about.replace(/<!--.*?-->/gs, "").includes("STATION KOREA(스테이션코리아)는 역과 교통에서 출발해"));
const ico = await readFile("out/favicon.ico");
assert.equal(ico.readUInt16LE(0), 0);
assert.equal(ico.readUInt16LE(2), 1);
const frames = Array.from({ length: ico.readUInt16LE(4) }, (_, i) => {
  const offset = 6 + i * 16;
  return `${ico[offset] || 256}x${ico[offset + 1] || 256}`;
});
assert.equal(frames.join(" "), iconSizes);
assert((await read("icon.svg")).includes("<svg"));
for (const id of ["sources-policy", "corrections", "privacy", "author", "contact", "articles"]) {
  assert(about.includes(`id="${id}"`), `정책 앵커 ${id}`);
}
assert(!about.includes("숫자 카드 세 개를 갖추지 못한"));
assert(about.includes("영상 없이도 읽히도록"));
assert((await read("rss.xml")).includes("<channel>\n<title>STATION KOREA</title>"));
assert((await read("llms.txt")).startsWith("# STATION KOREA"));
assert((await read("llms-full.txt")).startsWith("# STATION KOREA"));
for (const type of ["article", "station"]) {
  for (const slug of await readdir(`out/${type}`)) {
    const html = await read(`${type}/${slug}/index.html`);
    checkIcon(html);
    assert(titleOf(html)?.endsWith("| STATION KOREA"));
    assert(!titleOf(html)?.includes("스테이션코리아"));
    const schema = jsonLd(html).find(item => item["@type"] === "Article");
    assert.equal(schema.publisher.name, "STATION KOREA");
    assert((await read(`${type}/${slug}/article.md`)).includes("STATION KOREA"));
  }
}
assert(!(await readdir("out")).includes("docs"), "내부 문서 비공개");
console.log("Brand: Korean name, WebSite aliases, single favicon, channel, policy anchors, Article publisher, RSS, llms and Markdown verified.");
