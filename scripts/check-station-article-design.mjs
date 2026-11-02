import assert from "node:assert/strict";
import { readFileSync, mkdirSync } from "node:fs";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const base = process.argv[2] ?? "http://localhost:3260";
const evidence = process.argv[3];
if (evidence) mkdirSync(evidence, { recursive: true });
const paths = [...readFileSync("out/sitemap.xml", "utf8").matchAll(/<loc>(.*?)<\/loc>/g)]
  .map(match => new URL(match[1]).pathname).filter(path => /^\/(station|article)\/[^/]+\/$/.test(path));
assert.equal(paths.length, 11);
const browser = await chromium.launch();
try {
  for (const width of [390, 768, 1280]) for (const colorScheme of ["light", "dark"]) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, colorScheme, reducedMotion: "reduce" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    for (const path of paths) {
      const response = await page.goto(base + path, { waitUntil: "networkidle" });
      assert.equal(response.status(), 200, path);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(await page.locator("h1").count(), 1, path);
      const schemas = await page.locator('script[type="application/ld+json"]').allTextContents();
      const breadcrumb = schemas.flatMap(text => JSON.parse(text)).find(node => node["@type"] === "BreadcrumbList");
      const visibleBreadcrumb = await page.getByRole("navigation", { name: "현재 위치" }).innerText();
      assert.equal(breadcrumb.itemListElement.length, 3, `${path}: station breadcrumb`);
      for (const item of breadcrumb.itemListElement) assert(visibleBreadcrumb.includes(item.name), `${path}: breadcrumb schema mismatch`);
      const sign = page.locator("[data-station-sign]");
      const panel = page.locator("[data-station-sign-panel]");
      assert.equal(await sign.count(), 1, path);
      const box = await sign.boundingBox(), plate = await panel.boundingBox();
      const article = await page.locator("main article").first().boundingBox();
      const title = await page.locator("h1").boundingBox();
      assert(box && plate && title && article, path);
      assert(Math.abs(box.x - article.x) <= 40, `${path}: hero alignment`);
      assert(plate.x >= box.x && plate.x + plate.width <= box.x + box.width + 1, `${path}: plate clipped`);
      assert(title.y >= box.y + box.height, `${path}: title must follow hero`);
      if (width === 1280) {
        assert.equal(Math.round(box.width), 1200, `${path}: full-width hero`);
        assert.equal(Math.round(box.height), 380, `${path}: desktop height`);
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, path);
      assert.deepEqual(await page.locator("img").evaluateAll(imgs => imgs.filter(img => img.complete && !img.naturalWidth).map(img => img.src)), [], path);
      if (width !== 768 && /sadang|gimpo-plan-change|isu-guide-times|seongsu-branch/.test(path)) {
        const result = await new AxeBuilder({ page }).analyze();
        assert.deepEqual(result.violations.map(item => ({ id: item.id, targets: item.nodes.map(node => node.target) })), [], path);
      }
      if (evidence && ((width === 390 && colorScheme === "light") || (width === 1280 && colorScheme === "dark"))) {
        await page.screenshot({ path: `${evidence}/${path.split("/").filter(Boolean).join("-")}-${width}.png` });
      }
    }
    assert.deepEqual(errors, []);
    await context.close();
  }
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 } });
  const page = await context.newPage();
  for (const path of paths) {
    await page.goto(base + path);
    assert.equal(await page.locator("[data-station-sign]").count(), 1);
    assert(await page.locator("h1").isVisible());
    assert(await page.locator("main a[href]").count() > 1);
  }
  await context.close();
} finally { await browser.close(); }
console.log("PASS: all 11 station articles, 66 responsive/theme layouts, representative axe checks, static/no-JS hero and navigation");
