import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { registerHooks } from "node:module";
registerHooks({ resolve(specifier, context, next) {
  if (specifier.startsWith("@/") || specifier.startsWith(".")) {
    const url = specifier.startsWith("@/") ? new URL(`../src/${specifier.slice(2)}`, import.meta.url) : new URL(specifier, context.parentURL);
    for (const suffix of [".ts", "/index.ts"]) {
      const candidate = new URL(`${url.href}${suffix}`);
      if (existsSync(candidate)) return next(candidate.href, context);
    }
  }
  return next(specifier, context);
} });
const { articleEntries } = await import("../src/lib/article-index.ts");
const { publishedLines, lineArticles, lineLastModified } = await import("../src/app/line/data.ts");
const read = path => readFileSync(`out/${path}`, "utf8");
const sitemap = read("sitemap.xml");
assert.deepEqual([...publishedLines].sort(), [...new Set(articleEntries.flatMap(entry => entry.lines))].sort());
assert.equal(publishedLines.length, 13);
for (const id of publishedLines) {
  const entries = lineArticles(id);
  assert(entries.length > 0);
  assert.equal(lineLastModified(id), entries.map(entry => entry.modified).sort().at(-1));
  const html = read(`line/${id}/index.html`);
  const links = [...html.matchAll(/href="(\/(?:article|station)\/[^"/]+\/)"/g)].map(match => match[1]);
  assert.deepEqual(links, entries.map(entry => entry.href), `${id}: exact article links/order`);
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].flatMap(match => JSON.parse(match[1]));
  const list = schemas.find(schema => schema["@type"] === "ItemList");
  assert.deepEqual(list.itemListElement.map(entry => new URL(entry.url).pathname), links);
  assert(html.includes(`rel="canonical" href="https://www.stationkorea.com/line/${id}/"`));
  assert(sitemap.includes(`/line/${id}/`));
  assert(read("line/index.html").includes(`href="/line/${id}/"`));
}
for (const id of ["2", "4", "7", "8"]) assert(existsSync(`out/line/${id}/index.html`));
assert(sitemap.includes("https://www.stationkorea.com/line/</loc>"));
console.log("PASS: 13 actual lines, exact article coverage/order/schema, existing paths, canonical/sitemap");
