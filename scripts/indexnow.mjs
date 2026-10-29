// IndexNow 알림(Bing·네이버 등 참여 엔진에 전달). CLAUDE.md SEO·GEO 규칙 16.
// Vercel production 빌드 끝에 실행한다(vercel.json buildCommand). GitHub Actions는 쓰지 않는다.
// 지금 공개된 sitemap과 방금 빌드한 out/sitemap.xml을 비교해 새 URL과 lastmod가 바뀐 URL만 보낸다.
// 실패해도 빌드를 막지 않는다(로그만 남김).
//
// 사용: node scripts/indexnow.mjs            # 빌드 안에서: VERCEL_ENV=production일 때만 전송
//       node scripts/indexnow.mjs --all      # 로컬 수동: 공개된 sitemap의 모든 URL
//       node scripts/indexnow.mjs --dry-run  # 보낼 목록만 출력

import { readFile } from "node:fs/promises";

const SITE = process.env.SITE_URL ?? "https://www.stationkorea.com";
const KEY = "dddf0c7832ce22e8495ae93e168e1dcd"; // public/<KEY>.txt 와 같아야 한다
const args = process.argv.slice(2);
const all = args.includes("--all");
const dryRun = args.includes("--dry-run");

const parse = (xml) =>
  new Map(
    [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)]
      .map(([, block]) => [block.match(/<loc>(.*?)<\/loc>/)?.[1], block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1] ?? ""])
      .filter(([loc]) => loc),
  );

async function liveSitemap() {
  try {
    const res = await fetch(`${SITE}/sitemap.xml`);
    return res.ok ? parse(await res.text()) : new Map();
  } catch {
    return new Map();
  }
}

async function main() {
  const live = await liveSitemap();
  let urlList;
  if (all) {
    urlList = [...live.keys()];
  } else {
    if (process.env.VERCEL && process.env.VERCEL_ENV !== "production" && !dryRun) {
      console.log(`[indexnow] VERCEL_ENV=${process.env.VERCEL_ENV}: production이 아니라 보내지 않습니다.`);
      return;
    }
    const built = parse(await readFile(new URL("../out/sitemap.xml", import.meta.url), "utf8"));
    urlList = [...built].filter(([loc, lastmod]) => !live.has(loc) || live.get(loc) !== lastmod).map(([loc]) => loc);
  }

  if (urlList.length === 0) {
    console.log("[indexnow] 새로 생기거나 바뀐 URL이 없어 보내지 않습니다.");
    return;
  }
  console.log(`[indexnow] ${urlList.length}건:\n${urlList.join("\n")}`);
  if (dryRun) return;

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
  });
  // 200·202는 접수. 403은 키 파일 불일치, 422는 URL·host 불일치.
  console.log(`[indexnow] 응답: ${res.status} ${res.statusText}`);
}

main().catch((e) => console.log(`[indexnow] 실패(빌드는 계속): ${e.message}`));
