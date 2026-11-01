import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { chromium } from "playwright";

// 정적 빌드와 로컬 서버가 필요하다. PNG/HTML을 배포하지 않고 기존 OG JPG만 갱신한다.
const base = process.argv[2] ?? "http://localhost:3246";
assert(["localhost", "127.0.0.1"].includes(new URL(base).hostname), "로컬 정적 서버 URL을 사용한다.");
const browser = await chromium.launch();
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, colorScheme: "light" });
  for (const slug of await readdir("out/station")) {
    const html = await readFile(`out/station/${slug}/index.html`, "utf8");
    const schema = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs)]
      .flatMap(match => JSON.parse(match[1])).find(item => item["@type"] === "Article");
    assert(schema?.headline && schema.publisher?.name, "기사 제목과 발행자 필요");
    const output = new URL(schema.image.find(src => src.endsWith("-og.jpg"))).pathname;
    assert(/^\/images\/station\/[a-z-]+-og\.jpg$/.test(output), "기존 역 OG 경로만 갱신");
    const lines = schema.about.filter(item => item["@type"] === "Thing").map(item => item.name.replace(/^서울 지하철 /, "")).join(" · ");
    await page.goto(`${base}/station/${slug}/`, { waitUntil: "networkidle" });
    await page.evaluate(async ({ headline, brand, lines }) => {
      const titleFont = getComputedStyle(document.querySelector("h1")).fontFamily;
      const sansFont = getComputedStyle(document.body).fontFamily;
      const root = getComputedStyle(document.documentElement);
      const card = document.createElement("div");
      // 공유 이미지 렌더 전용 크기. 사이트 런타임 스타일이나 새 디자인 토큰이 아니다.
      Object.assign(card.style, { position: "fixed", inset: "0", width: "1200px", height: "630px", boxSizing: "border-box", padding: "48px 64px", background: root.getPropertyValue("--color-ground"), color: root.getPropertyValue("--color-ink"), display: "flex", flexDirection: "column", fontFamily: sansFont, borderTop: `8px solid ${root.getPropertyValue("--color-ink")}` });
      const wordmark = document.createElement("p");
      wordmark.textContent = brand;
      Object.assign(wordmark.style, { margin: "0", fontSize: "26px", fontWeight: "700", letterSpacing: "0.06em" });
      const label = document.createElement("p");
      label.textContent = lines;
      Object.assign(label.style, { margin: "32px 0 16px", fontSize: "24px", color: root.getPropertyValue("--color-ink-2") });
      const title = document.createElement("h1");
      title.textContent = headline;
      Object.assign(title.style, { margin: "0", fontFamily: titleFont, fontWeight: "700", fontSize: "64px", lineHeight: "1.3", letterSpacing: "-0.02em", wordBreak: "keep-all" });
      const address = document.createElement("p");
      address.textContent = "stationkorea.com";
      Object.assign(address.style, { margin: "auto 0 0", paddingTop: "20px", borderTop: `1px solid ${root.getPropertyValue("--color-rule")}`, fontSize: "20px" });
      card.append(wordmark, label, title, address);
      document.body.replaceChildren(card);
      await document.fonts.ready;
      if (card.scrollHeight > 630) throw new Error("공유 이미지 글자 넘침");
    }, { headline: schema.headline, brand: schema.publisher.name, lines });
    await page.screenshot({ path: `public${output}`, type: "jpeg", quality: 90 });
    console.log(`Updated ${output}: ${schema.headline}`);
  }
} finally {
  await browser.close();
}
