import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile("out/about/index.html", "utf8");
assert.equal((html.match(/<h1\b/g) ?? []).length, 1, "one visible page heading");
for (const id of ["transit-story-title", "transit-network-title", "perspectives", "about-transfer-title", "about-walk-title", "about-see-title", "about-change-title", "author", "sources-policy", "corrections", "ai", "privacy", "contact", "articles"]) {
  assert.equal((html.match(new RegExp(`id="${id}"`, "g")) ?? []).length, 1, `unique SSR anchor: ${id}`);
}
for (const text of ["매일 지나던 길을", "#갈아타다", "#걷다", "#보다", "#바뀌다", "이야기를 준비하고 있습니다", "서울의 철길", "부산의 골목", "서울 동대문디자인플라자", "서울로 7017 · 낮", "stationkorea.official@gmail.com"]) {
  assert.ok(html.includes(text), `SSR text: ${text}`);
}
for (const name of ["rail", "street", "space", "network", "change-day", "change-evening"]) {
  assert.match(html, new RegExp(`/images/about/generated/${name}-\\d+\\.webp`));
}
assert.match(html, /rel="canonical" href="https:\/\/www\.stationkorea\.com\/about\/"/);
const scripts = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)];
assert.equal(scripts.length, 1);
const schema = JSON.parse(scripts[0][1]);
assert.equal(schema["@type"], "AboutPage");
assert.equal(schema.url, "https://www.stationkorea.com/about/");
assert.equal(schema.mainEntity.url, "https://www.stationkorea.com/about/#author");
assert.ok(html.includes(schema.mainEntity.name));
assert.ok(html.includes(schema.mainEntity.description));
console.log("About SSR content, photo captions, policy anchors and JSON-LD verified.");
