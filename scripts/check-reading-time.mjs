import assert from "node:assert/strict";
import { readingMinutes } from "../src/lib/reading-time.ts";
import { jamsil } from "../src/content/stations/jamsil.ts";
import { sadang } from "../src/content/stations/sadang.ts";
import { konkukUniv } from "../src/content/stations/konkuk-univ.ts";

const empty = { ...jamsil, question: "", answer: "", body: [], series: undefined, crossSection: { ...jamsil.crossSection, caption: "" }, stats: [], pin: { ...jamsil.pin, text: "" }, transfers: [], qna: [], comparison: undefined, pullQuote: undefined };
assert.equal(readingMinutes(empty), 1);
assert.equal(readingMinutes({ ...empty, answer: "가".repeat(500) }), 1);
assert.equal(readingMinutes({ ...empty, answer: "가".repeat(501) }), 2);
assert.equal(readingMinutes({ ...empty, body: [{ heading: "해설", paragraphs: [{ text: "가".repeat(500), sourceIds: [] }] }] }), 2);
assert.equal(readingMinutes({ ...empty, series: { title: "연재", description: "가".repeat(500) } }), 2);
assert.equal(readingMinutes({ ...empty, answer: " 가\n\t".repeat(500) }), 1);
assert.equal(readingMinutes({ ...empty, qna: [{ question: "질문", answer: ["가".repeat(500)], sourceIds: [] }] }), 2);
assert.equal(readingMinutes({ ...empty, answer: "가".repeat(500), sources: [{ ...jamsil.sources[0], url: `https://example.com/${"a".repeat(5000)}` }] }), 1);
const body = { ...empty, qna: [{ question: "", answer: ["가".repeat(500)], sourceIds: [] }] };
assert.equal(readingMinutes({ ...body, comparison: { title: "비교", columns: [], rows: [] } }), 2);
assert.equal(readingMinutes({ ...body, pullQuote: { value: "1", label: "숫자", sourceIds: [] } }), 2);
assert.equal(readingMinutes({ ...empty, comparison: { title: "가".repeat(1000), columns: [], rows: [] } }), 1);
assert.equal(readingMinutes({ ...empty, transferRoutes: [{ title: "미노출", steps: [{ kind: "walk", text: "가".repeat(5000) }] }], timelines: [{ title: "가".repeat(5000), items: [] }] }), 1);
for (const station of [jamsil, sadang, konkukUniv]) {
  const minutes = readingMinutes(station);
  assert.ok(Number.isInteger(minutes) && minutes >= 1);
  assert.ok(readingMinutes({ ...station, answer: station.answer + "가".repeat(500) }) > minutes);
  console.log(`${station.name}: 약 ${minutes}분`);
}
console.log("Reading time boundaries, rendered blocks and excluded metadata verified.");
