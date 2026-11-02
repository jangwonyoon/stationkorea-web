import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import ts from "typescript";
import { chromium } from "playwright";
import AxeBuilder from "@axe-core/playwright";

const require = createRequire(import.meta.url);
const utils = { exports: {} };
new Function("require", "module", "exports", ts.transpileModule(
  readFileSync(new URL("../src/lib/utils.ts", import.meta.url), "utf8"),
  { compilerOptions: { module: ts.ModuleKind.CommonJS } },
).outputText)(require, utils, utils.exports);
assert.equal(utils.exports.cn("text-label text-ink", "text-plate-ink"), "text-label text-plate-ink");
assert.equal(utils.exports.cn("text-h1 text-ink", "text-body"), "text-ink text-body");
assert.equal(utils.exports.cn("min-w-0 basis-full", "question-slide"), "min-w-0 question-slide");

const baseURL = process.env.BASE_URL ?? "http://localhost:3250";
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH,
});
try {
  for (const width of [360, 390, 1280]) {
    for (const colorScheme of ["light", "dark"]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme, reducedMotion: "reduce" });
      const page = await context.newPage();
      await page.goto(baseURL);
      const theme = page.getByRole("button", { name: "다크 모드", exact: true });
      await theme.waitFor({ state: "visible" });
      assert.equal(await theme.getAttribute("aria-pressed"), String(colorScheme === "dark"));
      await page.emulateMedia({ colorScheme: colorScheme === "dark" ? "light" : "dark" });
      await page.waitForFunction((expected) => document.querySelector('button[aria-label="다크 모드"]').getAttribute("aria-pressed") === expected, String(colorScheme !== "dark"));
      await page.emulateMedia({ colorScheme });
      await page.waitForFunction((expected) => document.querySelector('button[aria-label="다크 모드"]').getAttribute("aria-pressed") === expected, String(colorScheme === "dark"));
      await theme.focus();
      await page.keyboard.press("Space");
      assert.equal(await theme.getAttribute("aria-pressed"), String(colorScheme !== "dark"));
      await page.keyboard.press("Enter");
      assert.equal(await theme.getAttribute("aria-pressed"), String(colorScheme === "dark"));
      const carousel = page.getByRole("region", { name: "최신 질문 캐러셀" });
      const links = carousel.getByRole("link");
      assert.equal(await links.count(), 3);
      const layout = await carousel.evaluate((el) => {
        const viewport = el.querySelector('[data-slot="carousel-content"]').getBoundingClientRect();
        const cards = [...el.querySelectorAll("li")].map((card) => {
          const box = card.getBoundingClientRect();
          return { left: box.left, right: box.right, top: box.top, width: box.width };
        });
        return { viewport: { left: viewport.left, right: viewport.right, width: viewport.width }, cards };
      });
      if (width < 768) {
        assert(layout.cards[0].width < layout.viewport.width - 32, `mobile next-card peek: ${JSON.stringify(layout)}`);
        assert(layout.cards[1].left < layout.viewport.right - 6, "next card must peek initially");
      } else {
        assert.equal(await carousel.getByRole("button").count(), 0, `desktop three cards must fit: ${JSON.stringify(layout)}`);
        assert(layout.cards.every((card) => card.top === layout.cards[0].top && card.left >= layout.viewport.left + 6 && card.right <= layout.viewport.right - 6));
        assert(Math.max(...layout.cards.map((card) => card.width)) - Math.min(...layout.cards.map((card) => card.width)) < 1);
      }
      if (width < 768) {
        const prev = carousel.getByRole("button", { name: "이전 질문", exact: true });
        const next = carousel.getByRole("button", { name: "다음 질문", exact: true });
        await next.waitFor();
        assert(await prev.isDisabled());
        await next.focus();
        const y = await page.evaluate(() => scrollY);
        for (let i = 0; i < 3; i++) if (await next.isEnabled()) await page.keyboard.press(i % 2 ? "Space" : "Enter");
        assert(await next.isDisabled());
        assert.equal(await page.evaluate(() => scrollY), y);
        await page.keyboard.press("Shift+Tab");
        assert(await prev.evaluate((el) => el === document.activeElement));
      }
      for (const link of await links.all()) {
        await link.focus();
        const geometry = await link.evaluate((el) => {
          const viewport = el.closest('[data-slot="carousel-content"]').getBoundingClientRect();
          const card = el.getBoundingClientRect();
          return { left: card.left - viewport.left, right: viewport.right - card.right };
        });
        assert(geometry.left >= 6 && geometry.right >= 6, JSON.stringify({ width, geometry }));
      }
      for (const control of await page.getByRole("button").all()) {
        if (!await control.isVisible()) continue;
        const box = await control.boundingBox();
        assert(box.width >= 44 && box.height >= 44);
      }
      assert.deepEqual((await new AxeBuilder({ page }).analyze()).violations, []);
      await context.close();
    }
  }
  for (const path of ["/line/2/", "/about/"]) for (const width of [390, 1280]) for (const colorScheme of ["light", "dark"]) {
    const context = await browser.newContext({ viewport: { width, height: 900 }, colorScheme });
    const page = await context.newPage();
    await page.goto(new URL(path, baseURL).href);
    assert.deepEqual((await new AxeBuilder({ page }).analyze()).violations, []);
    if (path.startsWith("/line")) {
      const breadcrumb = page.getByRole("navigation", { name: "현재 위치" });
      assert.equal(await breadcrumb.locator('[aria-current="page"]').count(), 1);
      assert.equal(await breadcrumb.locator('[aria-current="page"]').evaluate((el) => el.tagName), "SPAN");
    }
    await context.close();
  }
  if (process.env.FIXTURE_URL) {
    for (const width of [360, 390, 1280]) {
      const context = await browser.newContext({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
      const page = await context.newPage();
      await page.goto(process.env.FIXTURE_URL);
      for (const count of [0, 1, 6]) {
        const section = page.locator(`[data-carousel-count="${count}"]`);
        assert.equal(await section.getByRole("link").count(), count);
        if (count === 0) assert.equal(await section.getByRole("region").count(), 0);
        if (count === 1) assert.equal(await section.getByRole("button").count(), 0);
        if (count === 6) {
          const next = section.getByRole("button", { name: "다음 질문", exact: true });
          await next.waitFor();
          for (let i = 0; i < count; i++) if (await next.isEnabled()) await next.click();
          assert(await next.isDisabled());
        }
        for (const link of await section.getByRole("link").all()) {
          await link.focus();
          const visible = await link.evaluate((el) => {
            const viewport = el.closest('[data-slot="carousel-content"]').getBoundingClientRect();
            const card = el.getBoundingClientRect();
            return card.left >= viewport.left + 6 && card.right <= viewport.right - 6;
          });
          assert(visible, `${count} items at ${width}: focused card clipped`);
        }
      }
      await context.close();
    }
  }
  const noJSContext = await browser.newContext({ javaScriptEnabled: false, hasTouch: true, viewport: { width: 390, height: 844 } });
  const noJS = await noJSContext.newPage();
  await noJS.goto(baseURL);
  const carousel = noJS.getByRole("region", { name: "최신 질문 캐러셀" });
  assert.equal(await carousel.getByRole("link").count(), 3);
  assert(await carousel.locator('[data-slot="carousel-content"]').evaluate((el) => getComputedStyle(el).overflowX === "auto"));
  assert(await carousel.locator('[data-slot="carousel-content"]').evaluate((el) => getComputedStyle(el).touchAction === "auto"));
  const track = carousel.locator('[data-slot="carousel-content"]');
  const box = await track.boundingBox();
  const touch = await noJSContext.newCDPSession(noJS);
  const y = box.y + box.height / 2;
  await touch.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: box.x + box.width - 24, y }] });
  for (let step = 1; step <= 8; step++) {
    await touch.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: box.x + box.width - 24 - step * 30, y }] });
  }
  await touch.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  assert(await track.evaluate((el) => el.scrollLeft > 0), "native touch swipe must work without JavaScript");
  await noJSContext.close();
  console.log("shadcn: cn typography, theme keyboard/state, carousel edges/focus/no-JS, 44px controls and axe passed");
} finally {
  await browser.close();
}
