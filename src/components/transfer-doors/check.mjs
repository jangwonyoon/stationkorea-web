import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { renderToStaticMarkup } from "react-dom/server";
import React from "react";
import { createRequire } from "node:module";
const dependency = createRequire(import.meta.url);
const root = path.resolve(import.meta.dirname, "../../..");
function load(file) {
  const filename = path.join(root, file);
  const output = ts.transpileModule(fs.readFileSync(filename, "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX },
  }).outputText;
  const mod = { exports: {} };
  new Function("require", "exports", output)((id) => {
    if (id.startsWith("@/")) id = path.join(root, "src", id.slice(2));
    else if (id.startsWith(".")) id = path.resolve(path.dirname(filename), id);
    else return dependency(id);
    const relative = path.relative(root, id);
    const next = [relative + ".ts", relative + ".tsx", relative + "/index.ts"].find((p) => fs.existsSync(path.join(root, p)));
    return load(next);
  }, mod.exports);
  return mod.exports;
}
const { TransferDoors } = load("src/components/transfer-doors/TransferDoors.tsx");
const { sadang } = load("src/content/stations/sadang.ts");
const { konkukUniv } = load("src/content/stations/konkuk-univ.ts");
const render = (props) => renderToStaticMarkup(React.createElement(TransferDoors, props));
const html = render({ ...sadang, anchorIds: ["seoulmetro-transfer-info"] });
assert.equal((html.match(/<tr /g) || []).length, 6);
assert.equal((html.match(/id="ref-seoulmetro-transfer-info"/g) || []).length, 1);
assert.equal((html.match(/grid-cols-10/g) || []).length, 6);
assert.equal((html.match(/<li /g) || []).length, 60);
for (const transfer of sadang.transfers) {
  assert(html.includes(transfer.car));
  assert(html.includes(transfer.time));
  assert(html.includes(transfer.ride.direction));
  assert(html.includes(transfer.to.direction));
}
assert(!render(sadang).includes('id="ref-'));
assert.throws(() => render({ transfers: sadang.transfers, sources: [] }), /출처/);
assert.throws(() => render({ ...sadang, transfers: [{ ...sadang.transfers[0], car: "0-1" }] }), /칸 표지/);
const seven = render({ ...konkukUniv, transfers: konkukUniv.transfers.filter((t) => t.ride.line === "7") });
assert(!seven.includes("grid-cols-10"));
assert(!render({ transfers: [], sources: [] }).includes("<table"));
for (const text of [konkukUniv.pin.text, konkukUniv.qna[1].answer[0]]) {
  for (const value of ["자양", "8-3", "3분 44초", "어린이대공원", "7-3", "5분 25초", "성수", "3-2", "2026-09-01"]) assert(text.includes(value), value);
}
assert.equal(konkukUniv.dateModified.slice(0, 10), konkukUniv.corrections[0].date);
console.log("TransferDoors: six original rows, 60 cars, unique optional citations, source/car validation, unverified consist omitted, empty rows, corrected direction/time/date PASS");
