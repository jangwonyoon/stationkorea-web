import assert from "node:assert/strict";
import fs from "node:fs";
import ts from "typescript";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const { resolve } = require("node:path");
const Module = require("node:module");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...args) {
  return originalResolve.call(this, name.startsWith("@/") ? resolve("src", name.slice(2)) : name, ...args);
};
for (const ext of [".ts", ".tsx"]) require.extensions[ext] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText, filename);
};
const load = (file) => require(`./${file}`);
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
assert.equal((html.match(/scope="col"/g) || []).length, 3);
assert.equal((html.match(/scope="row"/g) || []).length, 3);
for (const label of ["숫자", "내용", "기준일·출처"]) assert(html.includes(`>${label}</th>`));
assert.equal((html.match(/<td /g) || []).length, 6);
console.log("StatTable: number round-trip, units, unique first citation, empty/unknown sources rejected, semantic cells PASS");
