import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
const read = path => readFile(`out/${path}`, "utf8");
const home = await read("index.html");
assert(home.includes("STATION KOREA"));
assert(home.includes("영상으로 만나는"));
assert(home.includes("매일 그 길"));
assert(home.includes('href="/line/"'));
assert(!home.includes('STATION KOREA ×'));
const about = await read("about/index.html");
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
    const schema = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .flatMap(match => JSON.parse(match[1])).find(item => item["@type"] === "Article");
    assert.equal(schema.publisher.name, "STATION KOREA");
    assert((await read(`${type}/${slug}/article.md`)).includes("STATION KOREA"));
  }
}
assert(!(await readdir("out")).includes("docs"), "내부 문서 비공개");
console.log("Brand: HTML, channel, policy anchors, Article publisher, RSS, llms and Markdown verified.");
