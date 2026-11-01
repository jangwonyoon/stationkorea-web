import assert from "node:assert/strict";
import { chromium } from "playwright";

// Serve a production export, then run: node scripts/check-line-font-stability.mjs BASE_URL
const base = process.argv[2];
assert(base, "BASE_URL is required");
const browser = await chromium.launch();
try {
  for (const width of [320, 390, 412, 768, 1280]) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    let release;
    const fontGate = new Promise(resolve => { release = resolve; });
    let fontRequest = 0;
    await page.route("**/*.woff2", async route => {
      const delay = (fontRequest++ % 5) * 80;
      await fontGate;
      await new Promise(resolve => setTimeout(resolve, delay));
      await route.continue();
    });
    try {
      await page.goto(new URL("/line/2/", base).href, { waitUntil: "domcontentloaded" });
      await page.waitForFunction(() => document.fonts.status === "loading");
      const measure = () => page.evaluate(() => {
        const nav = document.querySelector('nav[aria-label="기사가 있는 노선"]');
        const links = [...nav.querySelectorAll("a")];
        return {
          navHeight: nav.getBoundingClientRect().height,
          rows: [...new Set(links.map(link => Math.round(link.getBoundingClientRect().top)))].length,
          links: links.map(link => ({ href: link.getAttribute("href"), rect: link.getBoundingClientRect().toJSON() })),
          overflow: document.documentElement.scrollWidth > innerWidth,
        };
      });
      await page.evaluate(() => {
        window.navHeights = [];
        new ResizeObserver(entries => window.navHeights.push(entries[0].contentRect.height))
          .observe(document.querySelector('nav[aria-label="기사가 있는 노선"]'));
      });
      const before = await measure();
      release();
      await page.evaluate(() => document.fonts.ready);
      await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
      const after = await measure();
      const heights = await page.evaluate(() => window.navHeights);
      console.log(JSON.stringify({ width, before: { rows: before.rows, height: before.navHeight }, after: { rows: after.rows, height: after.navHeight } }));
      assert.equal(after.links.length, 13, `${width}: published line links`);
      assert.deepEqual(after.links.map(link => link.href), before.links.map(link => link.href));
      assert(heights.length > 0, `${width}: navigation resize was not observed`);
      assert(Math.max(...heights) - Math.min(...heights) <= 1, `${width}: navigation shifted while font subsets arrived`);
      assert.equal(after.rows, before.rows, `${width}: font swap changed navigation rows`);
      assert(Math.abs(after.navHeight - before.navHeight) <= 1, `${width}: font swap shifted navigation height`);
      assert(after.links.every(link => link.rect.height >= 44), `${width}: touch target height`);
      for (const phase of [before, after]) for (let i = 0; i < phase.links.length; i++) {
        const a = phase.links[i].rect;
        for (const { rect: b } of phase.links.slice(i + 1)) {
          assert(a.right <= b.left || b.right <= a.left || a.bottom <= b.top || b.bottom <= a.top, `${width}: overlapping line links`);
        }
      }
      assert([...before.links, ...after.links].every(link => link.rect.left >= 0 && link.rect.right <= width), `${width}: line navigation overflow`);
      // The existing site header overflows at 320px; this regression covers that width's line navigation only.
      if (width >= 390) assert(!before.overflow && !after.overflow, `${width}: horizontal overflow`);
    } finally { release(); await context.close(); }
  }
  console.log("PASS: delayed Korean fonts preserve 13 line links, row count, height, touch targets and line width (page width checked from 390px)");
} finally { await browser.close(); }
