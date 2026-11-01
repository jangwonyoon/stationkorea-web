import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { registerHooks } from 'node:module';
import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';

registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier.startsWith('@/') || specifier.startsWith('.')) {
    const url = specifier.startsWith('@/') ? new URL(`../src/${specifier.slice(2)}`, import.meta.url) : new URL(specifier, context.parentURL);
    for (const suffix of ['.ts', '/index.ts']) {
      const candidate = new URL(`${url.href}${suffix}`);
      if (existsSync(candidate)) return nextResolve(candidate.href, context);
    }
  }
  return nextResolve(specifier, context);
} });
const { getArticle } = await import('../src/content/articles.ts');
const { articleReadingMinutes } = await import('../src/lib/reading-time.ts');
const { articleEntries } = await import('../src/lib/article-index.ts');
const article = getArticle('seongsu-branch');
const figures = article.body.flatMap(section => section.figure ? [section.figure] : []);
assert.equal(figures.length, 2);
assert.equal(figures[1].descriptions.length, 3);
assert.deepEqual(articleEntries.find(entry => entry.href === '/article/seongsu-branch/').series, article.series);
const expanded = structuredClone(article);
expanded.body[0].figure.descriptions.push('가'.repeat(500));
assert.equal(articleReadingMinutes(expanded), articleReadingMinutes(article) + 1, 'figure text is included in reading estimate');
const markdown = readFileSync('out/article/seongsu-branch/article.md', 'utf8');
const llms = readFileSync('out/llms-full.txt', 'utf8');
for (const figure of figures) for (const text of [figure.title, figure.caption, ...figure.descriptions]) {
  assert(markdown.includes(text), `markdown missing ${text}`);
  assert(llms.includes(text), `llms missing ${text}`);
}
const base = process.argv[2] ?? 'http://127.0.0.1:3270';
const browser = await chromium.launch();
try {
  for (const width of [390, 768, 1280]) for (const colorScheme of ['light', 'dark']) {
    const context = await browser.newContext({ viewport: { width, height: width === 390 ? 844 : 900 }, colorScheme, reducedMotion: 'reduce' });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.goto(base, { waitUntil: 'networkidle' });
    const cover = page.locator('section[aria-labelledby="cover-question"]');
    assert.equal(await cover.locator('a').getAttribute('href'), '/article/seongsu-branch/');
    assert((await cover.innerText()).includes('역을 파헤치다'));
    const recent = page.locator('#new-articles');
    assert.equal(await recent.locator('li').count(), 4);
    assert.equal(await page.locator('main a[href="/article/seongsu-branch/"]').count(), 1);
    await cover.locator('a').focus(); await page.keyboard.press('Enter');
    await page.waitForURL('**/article/seongsu-branch/');
    await page.evaluate(() => document.fonts.ready);
    const bodyText = await page.locator('main').innerText();
    for (const figure of figures) for (const text of figure.descriptions) assert(bodyText.includes(text));
    assert(!/資料必要|자료 필요|검토용|원고 필요|대표 =|편집 제안/.test(bodyText));
    assert.equal(await page.locator('main figure').count(), 2);
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
    const diagramTextSizes = await page.locator('main figure svg text').evaluateAll(nodes => nodes.filter(node => node.getBoundingClientRect().width > 0).map(node => parseFloat(getComputedStyle(node).fontSize) * Math.abs(node.getScreenCTM().a)));
    assert(diagramTextSizes.every(size => size >= 13), `diagram labels must remain legible at ${width}: ${Math.min(...diagramTextSizes)}`);
    const ids = await page.locator('[id]').evaluateAll(elements => elements.map(e => e.id));
    assert.equal(ids.length, new Set(ids).size, 'unique source and figure IDs');
    for (const href of await page.locator('main a[href^="#"]').evaluateAll(links => links.map(a => a.getAttribute('href')))) assert(ids.includes(href.slice(1)), href);
    const contentEnd = await page.locator('main figure').last().boundingBox();
    const guide = page.locator('#transfer-guide');
    assert((await guide.boundingBox()).y > contentEnd.y + contentEnd.height, 'guide follows explanation');
    const details = page.locator('section[aria-labelledby="transfer-guide"] details').first();
    assert.notEqual(await details.getAttribute('open'), null);
    await details.locator('summary').focus(); await page.keyboard.press('Enter');
    assert.equal(await details.getAttribute('open'), null);
    await page.keyboard.press('Enter');
    const jsonLd = (await page.locator('script[type="application/ld+json"]').allTextContents()).flatMap(JSON.parse);
    const schema = jsonLd.find(node => node['@type'] === 'Article');
    assert.equal(schema.dateModified, article.dateModified);
    assert.equal(schema.headline, await page.locator('h1').innerText());
    const axe = await new AxeBuilder({page}).analyze();
    assert.deepEqual(axe.violations.map(v => ({id:v.id, targets:v.nodes.map(n=>n.target)})), []);
    assert.deepEqual(errors, []);
    await context.close();
  }
  const context = await browser.newContext({ javaScriptEnabled:false, viewport:{width:390,height:844} });
  const page = await context.newPage();
  await page.goto(base);
  await page.locator('section[aria-labelledby="cover-question"] a').click();
  await page.waitForURL('**/article/seongsu-branch/');
  assert.equal(await page.locator('main figure').count(), 2);
  assert((await page.locator('main').innerText()).includes(figures[1].descriptions[2]));
  await page.getByRole('navigation',{name:'관련 기사'}).getByRole('link').first().click();
  await page.goBack(); await page.waitForURL('**/article/seongsu-branch/');
  await context.close();
} finally { await browser.close(); }
console.log('PASS: series selection/no duplication, 6 viewports/themes, figures/citations/static consumers, keyboard/no-JS, axe, reading estimate');
