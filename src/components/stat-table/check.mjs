import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { createRequire } from "node:module";
const loadDependency = createRequire(import.meta.url);
function load(file) {
  const output = ts.transpileModule(fs.readFileSync(`${import.meta.dirname}/${file}`, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const mod = { exports: {} };
  new Function("require", "exports", output)((id) => id === "./split-number" ? load("split-number.ts") : loadDependency(id), mod.exports);
  return mod.exports;
}
const { splitNumber } = load("split-number.ts");
for (const value of ["3분22초", "3분 22초", "160,478명", "약 200m", "4.2m → 8.3m", "", "단위만"]) {
  assert.equal(splitNumber(value).map((part) => part.text).join(""), value);
}
assert.deepEqual(splitNumber("3분22초"), [
  { text: "3", num: true }, { text: "분", num: false },
  { text: "22", num: true }, { text: "초", num: false },
]);
const { StatTable } = load("StatTable.tsx");
const html = renderToStaticMarkup(React.createElement(StatTable, {
  stats: ["1m", "2m", "3m"].map((value) => ({ value, label: "설명", asOf: "2026년", sourceIds: ["known"] })),
  sources: [{ id: "known" }], accent: "2",
}));
assert.equal((html.match(/id="ref-known"/g) || []).length, 1);
assert.equal((html.match(/href="#src-known"/g) || []).length, 3);
for (const [sourceIds, expected] of [
  [[], /StatTable: "1m" requires at least one sourceId/],
  [["missing"], /StatTable: "1m" references unknown sourceId "missing"/],
  [["known", "missing"], /StatTable: "1m" references unknown sourceId "missing"/],
]) {
  assert.throws(() => renderToStaticMarkup(React.createElement(StatTable, {
    stats: [{ value: "1m", label: "설명", asOf: "2026년", sourceIds }],
    sources: [{ id: "known" }],
  })), expected);
}
assert(!html.includes("출처 0"));
assert.equal((html.match(/<th /g) || []).length, 3);
assert.equal((html.match(/<td /g) || []).length, 6);
console.log("StatTable: number round-trip, units, unique first citation, empty/unknown sources rejected, semantic cells PASS");
