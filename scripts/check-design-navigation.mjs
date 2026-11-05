import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3236";
const sitemap = readFileSync("out/sitemap.xml", "utf8");
const paths = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(match => new URL(match[1]).pathname);
for (const path of paths) {
  const html = readFileSync(`out${path}index.html`, "utf8");
  assert.equal((html.match(/<h1(?:\s|>)/g) ?? []).length, 1, `${path}: one H1`);
  assert(html.includes(`rel="canonical" href="https://www.stationkorea.com${path}"`), `${path}: canonical`);
  for (const match of html.matchAll(/<a[^>]*href="(\/[^"?#]*)(?:[?#][^"]*)?"/g)) {
    const href = match[1];
    assert(existsSync(`out${href}`) || existsSync(`out${href}index.html`), `${path}: broken static link ${href}`);
  }
  const schemas = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].flatMap(match => JSON.parse(match[1]));
  assert(schemas.length, `${path}: structured data`);
  for (const schema of schemas) {
    assert.notEqual(schema["@type"], "VideoObject");
    if (schema["@type"] === "Article") assert.equal(schema.publisher.name, "STATION KOREA");
  }
}

const browser = await chromium.launch({ args: ["--disable-features=HttpsUpgrades,HttpsFirstModeV2,HttpsFirstBalancedMode"] });
try {
  for (const javaScriptEnabled of [true, false]) {
    const context = await browser.newContext({ viewport: { width: 390, height: 844 }, javaScriptEnabled, reducedMotion: "reduce" });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    await page.goto(base, { waitUntil: "networkidle" });
    assert.equal(await page.locator("h1").innerText(), "역에서 시작해, 길과 동네와 도시를 읽습니다.");
    const menu = page.locator("header details");
    const trigger = menu.locator("summary");
    await trigger.focus(); await page.keyboard.press("Enter");
    assert.notEqual(await menu.getAttribute("open"), null);
    if (javaScriptEnabled) {
      await page.keyboard.press("Escape");
      assert.equal(await menu.getAttribute("open"), null);
      assert(await trigger.evaluate(element => element === document.activeElement));
      await page.keyboard.press("Space");
      await page.mouse.click(10, 500);
      assert.equal(await menu.getAttribute("open"), null);
      await trigger.click();
    }
    await menu.getByRole("link", { name: /전체 기사/ }).click();
    await page.waitForURL("**/articles/");
    assert.equal(await menu.getAttribute("open"), null);
    await page.getByRole("navigation", { name: "기사 카테고리" }).getByRole("link", { name: /걷다/ }).click();
    await page.waitForURL("**/section/walk/");
    assert.equal(await page.locator('main a[aria-current="page"]').count(), 1);
    await page.locator('main a[href="/article/dongmyo-weekend/"]').click();
    await page.waitForURL("**/article/**");
    const original = page.url();
    const details = page.locator('section[aria-labelledby="transfer-guide"] details');
    assert.notEqual(await details.first().getAttribute("open"), null);
    for (let i = 1; i < await details.count(); i++) assert.equal(await details.nth(i).getAttribute("open"), null);
    await details.first().locator("summary").focus(); await page.keyboard.press("Space");
    assert.equal(await details.first().getAttribute("open"), null);
    await page.keyboard.press("Enter"); assert.notEqual(await details.first().getAttribute("open"), null);
    const related = page.getByRole("navigation", { name: "관련 기사" }).getByRole("link").first();
    const relatedHref = await related.getAttribute("href");
    await related.click(); await page.waitForURL(new URL(relatedHref, base).href);
    await page.goBack(); await page.waitForURL(original);
    if (javaScriptEnabled) {
      const theme = page.getByRole("button", { name: "다크 모드", exact: true });
      const before = await theme.getAttribute("aria-pressed"); await theme.click();
      assert.notEqual(await theme.getAttribute("aria-pressed"), before);
    }
    for (const path of paths) assert.equal((await page.request.get(base + path)).status(), 200, path);
    assert.deepEqual(errors, []);
    await context.close();
  }
} finally { await browser.close(); }
console.log(`PASS: ${paths.length} static routes/links/H1/canonical/schema; JS/no-JS reading journey, menu, guides, related/back, theme`);
