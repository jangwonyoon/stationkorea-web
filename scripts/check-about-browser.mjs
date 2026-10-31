import assert from "node:assert/strict";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

// Run against a built static export: node scripts/check-about-browser.mjs http://localhost:3000/about/
const url = new URL(process.argv[2] ?? "http://localhost:3000/about/");
if (url.pathname === "/") url.pathname = "/about/";
const browser = await chromium.launch({
  ...(process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE
    ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE }
    : {}),
});
const anchors = ["about-transfer-title", "about-walk-title", "about-see-title", "about-change-title", "author", "sources-policy", "corrections", "ai", "privacy", "contact", "articles"];
const motionSelector = '.transit-train, .transit-bus, section[aria-labelledby="transit-network-title"] figure';

async function staticMotion(page) {
  await page.waitForFunction((selector) => [...document.querySelectorAll(selector)].every((element) => getComputedStyle(element).transform === "none"), motionSelector);
}

async function visibleContent(page) {
  await page.locator("#transit-story-title").waitFor({ state: "visible" });
  assert.equal(await page.locator("h1").count(), 1);
  for (const id of ["transit-story-title", "transit-network-title", ...anchors]) {
    const heading = page.locator(`#${id}`);
    assert.equal(await heading.count(), 1, `unique heading: ${id}`);
    assert.ok(await heading.isVisible(), `visible heading: ${id}`);
  }
  assert.equal(await page.locator('.transit-train svg[aria-hidden="true"], .transit-bus svg[aria-hidden="true"]').count(), 2);
  assert.equal(await page.locator("article img:not([alt]), article img[alt='']").count(), 0);
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), "no horizontal overflow");
}

try {
  for (const scenario of [
    { name: "desktop", viewport: { width: 1280, height: 900 }, colorScheme: "light" },
    { name: "mobile", viewport: { width: 390, height: 844 }, colorScheme: "dark" },
    { name: "reduced", viewport: { width: 1280, height: 900 }, reducedMotion: "reduce" },
    { name: "short", viewport: { width: 1280, height: 600 } },
    { name: "no-js", viewport: { width: 1280, height: 900 }, javaScriptEnabled: false },
    { name: "images-failed", viewport: { width: 768, height: 900 } },
  ]) {
    const { name, ...options } = scenario;
    const context = await browser.newContext(options);
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    if (name === "images-failed") {
      await page.route("**/images/**", (route) => route.abort());
    }
    await page.goto(url.href, { waitUntil: "networkidle" });
    await visibleContent(page);

    if (name === "desktop") {
      const train = page.locator(".transit-train");
      await page.locator("#transit-story-title").scrollIntoViewIfNeeded();
      await page.waitForFunction(() => getComputedStyle(document.querySelector(".transit-train")).transform !== "none");
      const before = await train.evaluate((element) => getComputedStyle(element).transform);
      await page.evaluate(() => window.scrollBy(0, 200));
      await page.waitForFunction((previous) => getComputedStyle(document.querySelector(".transit-train")).transform !== previous, before);
      await page.emulateMedia({ reducedMotion: "reduce" });
      await staticMotion(page);
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.setViewportSize({ width: 390, height: 844 });
      await staticMotion(page);
      await visibleContent(page);
      await page.setViewportSize({ width: 1280, height: 900 });
      await page.waitForFunction(() => getComputedStyle(document.querySelector(".transit-train")).transform !== "none");
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(url.href);
      // Keyboard activation must land below the persistent reduced-motion header.
      const start = page.getByRole("link", { name: "매거진 둘러보기" });
      await start.focus();
      await page.keyboard.press("Enter");
      await page.waitForURL("**/#transit-story-title");
      const heroBox = await page.locator("#transit-story-title").boundingBox();
      assert.ok(heroBox.y >= 48, "hero anchor clears site header");
      await page.goBack();
      assert.equal(new URL(page.url()).hash, "", "native anchor back navigation");
      for (const id of anchors) {
        if (id.startsWith("about-")) {
          await page.goto(`${url.href}#${id}`);
        } else {
          await page.getByRole("navigation", { name: "소개 목차" }).locator(`a[href="#${id}"]`).click();
        }
        await page.waitForFunction((anchor) => document.getElementById(anchor).getBoundingClientRect().top >= 48 && document.getElementById(anchor).getBoundingClientRect().top < innerHeight, id);
      }
      await page.locator('section[aria-labelledby="articles"] a').first().click();
      await page.waitForURL((target) => target.pathname !== url.pathname);
      await page.locator("#transit-story-title").waitFor({ state: "detached" });
      await page.goBack();
      await page.waitForURL((target) => target.pathname === url.pathname);
      await visibleContent(page);
      await staticMotion(page);
    } else {
      await staticMotion(page);
    }

    if (name === "desktop" || name === "mobile" || name === "reduced") {
      await page.evaluate(() => window.scrollTo(0, 0));
      const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
      assert.deepEqual(violations.map(({ id, nodes }) => ({ id, targets: nodes.map(({ target }) => target) })), [], `${name}: axe violations`);
    }
    assert.deepEqual(errors, [], `${name}: browser exceptions`);
    console.log(`PASS ${name}`);
    await context.close();
  }
} finally {
  await browser.close();
}
