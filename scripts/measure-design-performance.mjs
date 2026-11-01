import { createRequire } from 'node:module';
import assert from 'node:assert/strict';
import { writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

// Run in a built worktree: node scripts/measure-design-performance.mjs BASE_URL OUTPUT_JSON
const [baseURL, output] = process.argv.slice(2);
if (!baseURL || !output) throw Error('Usage: measure-design-performance.mjs BASE_URL OUTPUT_JSON (cwd: built worktree)');
const require = createRequire(path.resolve('package.json'));
const { chromium } = require('playwright');
const browser = await chromium.launch();
const result = {
  measuredAt: new Date().toISOString(),
  head: execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim(),
  worktree: process.cwd(), baseURL,
  environment: { node: process.version, chromium: browser.version(), playwright: require('playwright/package.json').version, os: `${os.platform()} ${os.release()} ${os.arch()}`, cpu: os.cpus()[0]?.model },
  conditions: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, colorScheme: 'light', reducedMotion: 'no-preference', cpuSlowdown: 4, cacheDisabled: true, networkLatencyMs: 150, downloadBitsPerSecond: 1600000, uploadBitsPerSecond: 750000, repetitions: 3, settleAfterLoadMs: 5000, scrollSteps: 12, scrollStepWaitMs: 250 },
  limitations: ['Local Python static server without gzip/Brotli or CDN/TLS; absolute transfer and LCP are not production predictions.', 'Headless Chromium on shared host; CPU throttling is simulated. No field data or INP measurement.', 'Third-party requests are not blocked; totals and JavaScript totals include them, with origins recorded separately.', 'Initial LCP is sampled after load+5s before scripted scrolling; CLS uses maximum session window, not a raw sum.'],
  runs: [],
};
function cls(entries) {
  let max = 0, value = 0, start = 0, previous = -Infinity;
  for (const entry of entries) {
    if (entry.startTime - previous > 1000 || entry.startTime - start > 5000) { value = 0; start = entry.startTime; }
    value += entry.value; max = Math.max(max, value); previous = entry.startTime;
  }
  return max;
}
function tasks(entries) { return { count: entries.length, totalMs: entries.reduce((sum,e) => sum + e.duration, 0), maxMs: Math.max(0, ...entries.map(e => e.duration)) }; }
try {
  for (const route of ['/', '/articles/', '/station/sadang/']) for (let repetition = 1; repetition <= 3; repetition++) {
    const context = await browser.newContext({ viewport: result.conditions.viewport, colorScheme: 'light', reducedMotion: 'no-preference', serviceWorkers: 'block' });
    const page = await context.newPage();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 150, downloadThroughput: 1600000 / 8, uploadThroughput: 750000 / 8, connectionType: 'cellular3g' });
    await cdp.send('Emulation.setCPUThrottlingRate', { rate: 4 });
    const requests = new Map(), errors = [], failures = [];
    cdp.on('Network.responseReceived', event => requests.set(event.requestId, { url: event.response.url, type: event.type, mimeType: event.response.mimeType, status: event.response.status, fromDiskCache: event.response.fromDiskCache, bytes: 0 }));
    cdp.on('Network.loadingFinished', event => { const request = requests.get(event.requestId); if (request) request.bytes = event.encodedDataLength; });
    cdp.on('Network.loadingFailed', event => failures.push({ type: event.type, errorText: event.errorText, canceled: event.canceled }));
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
    await page.addInitScript(() => {
      window.__perf = { lcp: [], shifts: [], tasks: [] };
      new PerformanceObserver(list => window.__perf.lcp.push(...list.getEntries().map(e => ({ startTime: e.startTime, size: e.size, tag: e.element?.tagName, text: e.element?.textContent?.slice(0, 120), url: e.url })))).observe({ type: 'largest-contentful-paint', buffered: true });
      new PerformanceObserver(list => window.__perf.shifts.push(...list.getEntries().filter(e => !e.hadRecentInput).map(e => ({ startTime: e.startTime, value: e.value })))).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver(list => window.__perf.tasks.push(...list.getEntries().map(e => ({ startTime: e.startTime, duration: e.duration })))).observe({ type: 'longtask', buffered: true });
    });
    const response = await page.goto(new URL(route, baseURL).href, { waitUntil: 'load', timeout: 120000 });
    await page.waitForTimeout(5000);
    const initial = await page.evaluate(() => ({ ...window.__perf, now: performance.now(), navigation: performance.getEntriesByType('navigation')[0].toJSON(), overflow: document.documentElement.scrollWidth > innerWidth }));
    const transferBeforeScroll = [...requests.values()].reduce((sum,request) => sum + request.bytes, 0);
    for (let step = 1; step <= 12; step++) { await page.evaluate(fraction => scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * fraction), step / 12); await page.waitForTimeout(250); }
    await page.waitForTimeout(1000);
    const final = await page.evaluate(() => window.__perf);
    const resources = [...requests.values()];
    const js = resources.filter(r => r.type === 'Script' || /javascript/.test(r.mimeType));
    const origins = {};
    for (const r of resources) { const origin = new URL(r.url).origin; origins[origin] = (origins[origin] ?? 0) + r.bytes; }
    const run = { route, repetition, status: response?.status(), lcpMs: initial.lcp.at(-1)?.startTime ?? null, lcpElement: initial.lcp.at(-1) ?? null, clsInitial: cls(initial.shifts), clsAfterScroll: cls(final.shifts), transferBytesInitial: transferBeforeScroll, transferBytes: resources.reduce((sum,r) => sum + r.bytes, 0), jsBytes: js.reduce((sum,r) => sum + r.bytes, 0), origins, longTasksInitial: tasks(initial.tasks), longTasksScroll: tasks(final.tasks.filter(t => t.startTime >= initial.now)), overflow: initial.overflow, errors, failures, resources };
    result.runs.push(run);
    writeFileSync(output, JSON.stringify(result, null, 2));
    console.log(JSON.stringify({ route, repetition, lcpMs: run.lcpMs, cls: run.clsAfterScroll, bytes: run.transferBytes, jsBytes: run.jsBytes, errors: errors.length }));
    await context.close();
  }
  const median = values => [...values].sort((a,b) => a-b)[Math.floor(values.length / 2)];
  result.medians = Object.fromEntries(['/', '/articles/', '/station/sadang/'].map(route => {
    const runs = result.runs.filter(run => run.route === route);
    assert.equal(runs.length, result.conditions.repetitions, `${route}: incomplete samples`);
    assert(runs.every(run => Number.isFinite(run.lcpMs)), `${route}: LCP was not observed; raw runs retained`);
    return [route, Object.fromEntries(['lcpMs', 'clsInitial', 'clsAfterScroll', 'transferBytesInitial', 'transferBytes', 'jsBytes'].map(key => [key, median(runs.map(run => run[key]))]))];
  }));
  writeFileSync(output, JSON.stringify(result, null, 2));
  console.log(JSON.stringify(result.medians, null, 2));
} finally { await browser.close(); }
