// Run: node src/components/blocks/self-check.mjs
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
const require = createRequire(import.meta.url);
const ts = require("typescript");
for (const ext of [".ts", ".tsx"]) require.extensions[ext] = (module, filename) => {
  module._compile(ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2017, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText, filename);
};
const { renderToStaticMarkup: render } = require("react-dom/server");
const { resolveSources } = require("./BlockSources.tsx");
const { TransferSteps } = require("./TransferSteps.tsx");
const { CompareTable } = require("./CompareTable.tsx");
const { Timeline, formatDot } = require("./Timeline.tsx");
const { StatusBadge, STAGES } = require("./StatusBadge.tsx");
const source = { id: "s", org: "기관", title: "문서", date: "2026-10-30 기준", url: "https://example.com" };
assert.equal(resolveSources(["s", "s"], [source], "검증").length, 1);
for (const ids of [[], ["missing"]]) assert.throws(() => resolveSources(ids, [source], "검증"));
for (const field of ["org", "title", "date", "url"]) assert.throws(() => resolveSources(["s"], [{ ...source, [field]: " " }], "검증"));
const props = { title: "환승", steps: [{ kind: "walk", text: "통로" }], sources: [source] };
assert(!render(TransferSteps(props)).includes("<sup"));
assert(!render(TransferSteps(props)).includes("기준"));
const measured = (measure) => render(TransferSteps({ ...props, steps: [{ ...props.steps[0], measure }] }));
assert.throws(() => measured({ time: "1분", asOf: source.date, sourceIds: [] }));
assert.throws(() => measured({ distance: "1m", asOf: "", sourceIds: ["s"] }));
assert(measured({ time: "1분", asOf: source.date, sourceIds: ["s"] }).includes("1분"));
assert.throws(() => render(CompareTable({ title: "비교", columns: ["A"], rows: [{ label: "층", values: ["1", "2"], sourceIds: ["s"] }], sources: [source] })));
assert.throws(() => render(CompareTable({ title: "비교", columns: ["A"], rows: [{ label: "층", values: ["1"], sourceIds: [] }], sources: [source] })));
assert.equal(formatDot("2024-02-29"), "2024.2.29");
assert.equal(formatDot("2025-07"), "2025.7");
for (const date of ["", "2025-13", "2025-02-29", "2025-04-31"]) assert.throws(() => formatDot(date));
assert.throws(() => Timeline({ title: "연표", items: [{ date: "2025", org: "기관", doc: "문서" }] }));
for (const stage of STAGES) assert(render(StatusBadge({ stage })).includes(stage));
console.log("M4 self-check PASS: citations, dates, unknown measurements, row shape, timeline metadata, all stages");
