import assert from "node:assert/strict";
import { chromium } from "playwright";

// Serve the production export, then run: node scripts/check-header-320.mjs BASE_URL
const base = process.argv[2];
assert(base, "BASE_URL is required");

const browser = await chromium.launch();
try {
  for (const width of [320, 360, 390, 768, 1280]) {
    for (const javaScriptEnabled of [true, false]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        javaScriptEnabled,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      let releaseFonts;
      const fontGate = new Promise(resolve => { releaseFonts = resolve; });
      await page.route("**/*.woff2", async route => {
        await fontGate;
        await route.continue();
      });

      const checkLayout = async label => {
        const layout = await page.evaluate(() => {
          const header = document.querySelector("header");
          const controls = [
            header.querySelector(":scope > div > a"),
            header.querySelector("summary"),
            ...header.querySelectorAll("nav > ul > li > a"),
            header.querySelector("button:not([hidden])"),
          ].filter(Boolean);
          return {
            documentWidth: document.documentElement.scrollWidth,
            headerWidth: header.scrollWidth,
            controls: controls.map(control => ({
              name: control.textContent.trim(),
              rect: control.getBoundingClientRect().toJSON(),
            })),
          };
        });
        assert.equal(layout.documentWidth, width, `${width}px ${label}: document overflow`);
        assert.equal(layout.headerWidth, width, `${width}px ${label}: header overflow`);
        for (const { name, rect } of layout.controls) {
          assert(rect.left >= 0 && rect.right <= width, `${width}px ${label}: ${name} clipped`);
          assert(rect.width >= 44 && rect.height >= 44, `${width}px ${label}: ${name} touch target`);
          assert(rect.top >= 0 && rect.bottom <= 48, `${width}px ${label}: ${name} wraps outside header`);
        }
      };

      try {
        await page.goto(new URL("/", base).href, { waitUntil: "domcontentloaded" });
        await checkLayout("fallback font");
        releaseFonts();
        await page.evaluate(() => document.fonts.ready);
        if (javaScriptEnabled) await page.getByRole("button", { name: "다크 모드" }).waitFor();

        for (const theme of ["light", "dark"]) {
          await page.evaluate(value => { document.documentElement.dataset.theme = value; }, theme);
          await checkLayout(`${theme} font loaded`);
          const menu = page.locator("header details");
          const trigger = menu.locator("summary");
          await trigger.focus();
          await page.keyboard.press("Enter");
          assert.notEqual(await menu.getAttribute("open"), null, `${width}px: menu opens`);
          await checkLayout(`${theme} menu open`);
          if (javaScriptEnabled) {
            await page.keyboard.press("Escape");
            assert.equal(await menu.getAttribute("open"), null, `${width}px: Escape closes menu`);
            assert(await trigger.evaluate(element => element === document.activeElement), `${width}px: focus restored`);
          } else {
            await page.keyboard.press("Enter");
            assert.equal(await menu.getAttribute("open"), null, `${width}px: native menu closes`);
          }
        }
      } finally {
        releaseFonts();
        await context.close();
      }
    }
  }
} finally {
  await browser.close();
}
console.log("PASS: header widths 320/360/390/768/1280, fallback/loaded fonts, themes, menu, keyboard, no-JS, reduced motion");
