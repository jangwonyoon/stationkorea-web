import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";

registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier.startsWith(".") || specifier.startsWith("@/")) {
    const url = specifier.startsWith("@/") ? new URL(`../src/${specifier.slice(2)}`, import.meta.url) : new URL(specifier, context.parentURL);
    for (const suffix of [".ts", "/index.ts"]) {
      const candidate = new URL(`${url.href}${suffix}`);
      if (existsSync(candidate)) return nextResolve(candidate.href, context);
    }
  }
  return nextResolve(specifier, context);
} });

const { stationSignDirections } = await import("../src/lib/station-sign.ts");
const { stations } = await import("../src/content/stations/index.ts");
const { articles } = await import("../src/content/articles.ts");
const sadang = stations.find((station) => station.slug === "sadang");
assert.deepEqual(stationSignDirections(sadang.lines, sadang.sign, sadang.transfers).crossings, [{ line: "4", directions: ["총신대입구 방면", "남태령 방면"] }]);
const fixtures = (directions) => directions.map((direction) => ({ ride: { line: "2", direction: "방배 방면" }, to: { line: "4", direction } }));
for (const directions of [[], ["A 방면"], ["A·B 방면"], ["A 방면", "B 방면", "C 방면"]]) {
  assert.deepEqual(stationSignDirections(["2", "4"], sadang.sign, fixtures(directions)).crossings[0].directions, [], "두 개의 명시된 개별 방면이 아니면 라벨 생략");
}
assert.deepEqual(stationSignDirections(["2", "4"], sadang.sign, fixtures(["A 방면", "B 방면", "A·B 방면", "A 방면"])).crossings[0].directions, ["A 방면", "B 방면"]);

for (const article of [...stations, ...articles.filter((article) => article.station)]) {
  const station = article.station ?? article;
  const { crossings, branches } = stationSignDirections(station.lines, station.sign, article.transfers);
  assert.equal(crossings.length, station.lines.length - 1);
  for (const crossing of crossings) {
    assert([0, 2].includes(crossing.directions.length));
    for (const direction of crossing.directions) {
      assert(direction.endsWith(" 방면"));
      assert(article.transfers.some((transfer) => [transfer.ride, transfer.to].some((endpoint) => endpoint.line === crossing.line && endpoint.direction === direction)));
    }
  }
  if (article.slug === "gimpo-plan-change") assert.deepEqual(crossings.filter((crossing) => crossing.directions.length).map((crossing) => crossing.line), ["seohae"]);
  if (article.slug === "hongdae-transfer") assert.deepEqual(crossings.filter((crossing) => crossing.directions.length).map((crossing) => crossing.line), ["arex"]);
  if (article.slug === "seongsu-branch") {
    assert.deepEqual(crossings, []);
    assert.deepEqual(branches, ["용답 방면 · 성수지선"]);
  }
}
console.log("Station sign: 11 article guides, explicit two-direction pairs, unknown routes omitted, Seongsu branch retained PASS");
