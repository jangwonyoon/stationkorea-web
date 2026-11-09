import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { registerHooks } from "node:module";

registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/") || specifier.startsWith(".")) {
    const url = specifier.startsWith("@/") ? new URL(`../src/${specifier.slice(2)}`, import.meta.url) : new URL(specifier, context.parentURL);
    for (const suffix of [".ts", "/index.ts"]) {
      const candidate = new URL(`${url.href}${suffix}`);
      if (existsSync(candidate)) return nextResolve(candidate.href, context);
    }
  }
  return nextResolve(specifier, context);
} });
const { articles, articlePath } = await import("../src/content/articles.ts");
const { stations, stationPath } = await import("../src/content/stations/index.ts");
const { site, absoluteUrl } = await import("../src/lib/site.ts");
const escape = text => text.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("'", "&#x27;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
const read = path => readFileSync(`out/${path}`, "utf8");
const jsonLd = html => [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)].flatMap(match => JSON.parse(match[1]));
const sitemap = read("sitemap.xml"), rss = read("rss.xml"), full = read("llms-full.txt"), llms = read("llms.txt");
const entries = [...articles.map(data => ({ data, path: articlePath(data), magazine: true })), ...stations.map(data => ({ data, path: stationPath(data), magazine: false }))];
const canonicalUrls = new Set();
for (const { data, path, magazine } of entries) {
  const html = read(`${path.slice(1)}index.html`), md = read(`${path.slice(1)}article.md`), url = absoluteUrl(path);
  const rendered = html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/)?.[1].replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/g, "") ?? "";
  assert.equal((rendered.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${path}: one H1`);
  assert.equal((html.match(/rel="canonical"/g) ?? []).length, 1, `${path}: one canonical`);
  assert(html.includes(`rel="canonical" href="${url}"`), `${path}: canonical`);
  assert(!canonicalUrls.has(url)); canonicalUrls.add(url);
  assert(html.includes(`property="og:url" content="${url}"`));
  assert(html.includes('property="og:site_name" content="STATION KOREA"'));
  assert(html.includes('property="og:locale" content="ko_KR"'));
  assert(html.includes(`name="description" content="${escape(data.answer)}"`));
  assert(!/name="robots"[^>]*content="[^"]*(?:noindex|nosnippet)/.test(html));
  assert(!html.includes('name="keywords"'));
  assert(rendered.includes(escape(data.question)) && rendered.includes(escape(data.answer)), `${path}: static text`);
  for (const section of data.body ?? []) for (const paragraph of section.paragraphs) {
    assert(rendered.includes(escape(paragraph.text)), `${path}: HTML paragraph`);
    assert(md.includes(paragraph.text) && full.includes(paragraph.text), `${path}: Markdown parity`);
    assert(rss.includes(escape(paragraph.text)), `${path}: RSS parity`);
  }
  const nodes = jsonLd(html), article = nodes.find(node => node["@type"] === "Article");
  assert(article && nodes.some(node => node["@type"] === "BreadcrumbList"));
  assert.equal(article.headline, data.question); assert.equal(article.description, data.answer);
  assert.equal(article.datePublished, data.datePublished); assert.equal(article.dateModified, data.dateModified);
  assert.equal(article.mainEntityOfPage, url); assert.equal(article.author.url, absoluteUrl(site.author.path));
  assert.equal(article.publisher.logo.url, absoluteUrl("/logo.png"));
  assert.deepEqual(article.publisher.sameAs, [site.instagram]);
  assert(!nodes.some(node => ["VideoObject", "Dataset"].includes(node["@type"])));
  assert(md.includes(`[${site.author.name}](${absoluteUrl(site.author.path)})`));
  const related = magazine ? data.related : stations.filter(other => other.slug !== data.slug).map(other => ({ href: stationPath(other) }));
  assert(related.length >= 2);
  for (const link of related) {
    assert(html.includes(`href="${link.href}"`), `${path}: related HTML ${link.href}`);
    assert(md.includes(absoluteUrl(link.href)), `${path}: related Markdown`);
    assert(existsSync(`out${link.href}index.html`), `${path}: related target`);
  }
  const expectedImage = magazine ? data.image?.src : data.photo?.src ?? data.ogImage;
  for (const attribute of ['property="og:image"', 'name="twitter:image"']) {
    if (expectedImage) assert(html.includes(`${attribute} content="${absoluteUrl(expectedImage)}"`), `${path}: relevant share image`);
    else assert(!html.includes(attribute), `${path}: no inherited unrelated image`);
  }
  for (const source of data.sources) if (source.url) assert(html.includes(`href="${escape(source.url)}"`), `${path}: source URL`);
  assert(sitemap.includes(`<loc>${url}</loc>`) && rss.includes(`<link>${url}</link>`) && llms.includes(url));
}
assert.equal((rss.match(/<item>/g) ?? []).length, entries.length);
assert(!sitemap.includes("article.md") && !sitemap.includes("llms"));
for (const match of sitemap.matchAll(/<loc>(.*?)<\/loc>/g)) {
  const url = new URL(match[1]); assert.equal(url.origin, site.url); assert(url.pathname.endsWith("/"));
  assert(existsSync(`out${url.pathname}index.html`), `sitemap target ${url.pathname}`);
}
assert(read("robots.txt").includes("User-Agent: *\nAllow: /"));
assert(existsSync("out/logo.png"));
const homeSite = jsonLd(read("index.html")).find(node => node["@type"] === "WebSite");
assert(homeSite.alternateName.includes(site.koreanName));
const config = JSON.parse(readFileSync("vercel.json", "utf8"));
for (const type of ["article", "station"]) assert(config.headers.some(rule => rule.source === `/${type}/:slug/article.md` && rule.headers.some(header => header.key === "Link" && header.value === `<${site.url}/${type}/:slug/>; rel="canonical"`)));
console.log(`PASS: ${entries.length} articles — static text, metadata, Article/Breadcrumb, publisher, sources, related links, sitemap, RSS, Markdown and robots.`);
