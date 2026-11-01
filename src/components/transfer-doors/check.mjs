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
    compilerOptions: { target: ts.ScriptTarget.ES2022, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
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
assert.equal((html.match(/scope="row"/g) || []).length, 6);
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
assert.equal((seven.match(/scope="col"/g) || []).length, 5);
assert.equal((seven.match(/<td /g) || []).length, 8);
assert.equal((seven.match(/scope="row"/g) || []).length, 2);
assert(!render({ transfers: [], sources: [] }).includes("<table"));
const konkuk = render({ ...konkukUniv, anchorIds: ["seoulmetro-transfer-info"] });
for (const transfer of konkukUniv.transfers) {
  for (const value of [transfer.ride.direction, transfer.to.direction, transfer.car, transfer.time]) assert(konkuk.includes(value), value);
}
assert(konkuk.includes("2026-09-01 기준"));
assert.equal(konkukUniv.qna.some((q) => q.question.includes("어디서 내리면 빠른가")), false);
assert.match(konkukUniv.pin.text, /끝 칸에서 내리면 최대 2분 47초/);
assert(konkukUniv.dateModified.slice(0, 10) >= konkukUniv.corrections[0].date);
console.log("TransferDoors: six original rows, 60 cars, unique optional citations, source/car validation, unverified consist omitted, empty rows, corrected direction/time/date PASS");
