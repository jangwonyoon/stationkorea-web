// Run: node src/components/article/reading/self-check.mjs
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const Module = require("node:module");
const originalResolve = Module._resolveFilename;
Module._resolveFilename = function (name, ...args) {
  return originalResolve.call(this, name.startsWith("@/") ? resolve("src", name.slice(2)) : name, ...args);
};
for (const ext of [".ts", ".tsx"]) require.extensions[ext] = (module, filename) => {
  module._compile(ts.transpileModule(readFileSync(filename, "utf8"), {
    compilerOptions: { target: ts.ScriptTarget.ES2017, module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText, filename);
};
const { renderToStaticMarkup: render } = require("react-dom/server");
const { stations } = require("@/content/stations");
const { firstCitations } = require("@/components/SourceRefs");
const { QnaBlock, PullQuote, NextQuestion } = require("./index.ts");
const s = stations[1];
const ids = s.qna[0].sourceIds;
const [first, repeated] = firstCitations([ids, ids]);
const qna = render(QnaBlock({ index: 0, qna: s.qna[0], sources: s.sources, anchorIds: first }));
const quote = render(PullQuote({ value: "참고", label: "자료", sourceIds: ids, sources: s.sources, anchorIds: repeated }));
for (const id of ids) {
  assert.equal((qna + quote).split(`id="ref-${id}"`).length - 1, 1);
  assert(quote.includes(s.sources.find(source => source.id === id).date));
}
for (const sourceIds of [[], ["missing"]]) {
  assert.throws(() => render(QnaBlock({ index: 0, qna: { ...s.qna[0], sourceIds }, sources: s.sources })));
  assert.throws(() => render(PullQuote({ value: "참고", label: "자료", sourceIds, sources: s.sources })));
}
const next = render(NextQuestion({ next: stations[2], related: [stations[0], stations[2], stations[0]] }));
assert(next.includes('data-track="next_click"'));
assert(next.includes('data-to="/station/konkuk-univ/"'));
assert.equal((next.match(/loading="lazy"/g) ?? []).length, 2);
assert.equal((next.match(/href="\/station\/jamsil\/?"/g) ?? []).length, 1);
assert.equal((next.match(/href="\/station\/konkuk-univ\/?"/g) ?? []).length, 2);
assert(!next.includes('href="/station/sadang'));
assert(next.includes("건대입구는"));
console.log("C6 self-check PASS: invalid/empty sources fail, dates present, first-citation IDs unique, tracking contract, related deduplication and lazy images");
