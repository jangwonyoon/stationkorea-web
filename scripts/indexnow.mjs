// IndexNow 알림(Bing·네이버 등 참여 엔진에 전달). production 배포 성공 뒤 GitHub Action이 실행한다.
// 배포된 sitemap에서 lastmod가 최근 N일 안인 URL만 보낸다. 바뀌지 않은 URL을 반복해 보내지 않기 위해서다.
// 사용: node scripts/indexnow.mjs [--days 7] [--all] [--dry-run]

const SITE = process.env.SITE_URL ?? "https://www.stationkorea.com";
const KEY = "dddf0c7832ce22e8495ae93e168e1dcd"; // public/<KEY>.txt 와 같아야 한다
const args = process.argv.slice(2);
const days = Number(args[args.indexOf("--days") + 1]) || 7;
const all = args.includes("--all");
const dryRun = args.includes("--dry-run");

const xml = await (await fetch(`${SITE}/sitemap.xml`)).text();
const entries = [...xml.matchAll(/<url>([\s\S]*?)<\/url>/g)].map(([, block]) => ({
  loc: block.match(/<loc>(.*?)<\/loc>/)?.[1],
  lastmod: block.match(/<lastmod>(.*?)<\/lastmod>/)?.[1],
}));
const since = Date.now() - days * 24 * 60 * 60 * 1000;
const urlList = entries
  .filter((e) => e.loc && (all || (e.lastmod && Date.parse(e.lastmod) >= since)))
  .map((e) => e.loc);

if (urlList.length === 0) {
  console.log(`최근 ${days}일 안에 바뀐 URL이 없어 보내지 않습니다.`);
  process.exit(0);
}
console.log(`IndexNow ${urlList.length}건:\n${urlList.join("\n")}`);
if (dryRun) process.exit(0);

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({
    host: new URL(SITE).host,
    key: KEY,
    keyLocation: `${SITE}/${KEY}.txt`,
    urlList,
  }),
});
// 200·202는 접수. 403은 키 파일 불일치, 422는 URL·host 불일치.
console.log(`응답: ${res.status} ${res.statusText}`);
if (res.status !== 200 && res.status !== 202) process.exit(1);
