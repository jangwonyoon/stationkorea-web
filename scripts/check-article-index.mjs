import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";

// Node 검사에서도 Next의 @/ 별칭과 확장자 없는 콘텐츠 import를 해석한다.
registerHooks({ resolve(specifier, context, nextResolve) {
  if (specifier.startsWith("@/") || specifier.startsWith(".")) {
    const url = specifier.startsWith("@/")
      ? new URL(`../src/${specifier.slice(2)}`, import.meta.url)
      : new URL(specifier, context.parentURL);
    for (const suffix of [".ts", "/index.ts"]) {
      const candidate = new URL(`${url.href}${suffix}`);
      if (existsSync(candidate)) return nextResolve(candidate.href, context);
    }
  }
  return nextResolve(specifier, context);
} });

const { articles, articlePath } = await import("../src/content/articles.ts");
const { stations, stationPath } = await import("../src/content/stations/index.ts");
const { articleReadingMinutes, readingMinutes } = await import("../src/lib/reading-time.ts");
const publishedCount = articles.length + stations.length;
assert.equal(publishedCount, 11, "현재 발행 기사 수");

// 장소·노선·이미지가 없는 일반 기사도 등록 순서와 게시일만으로 목록에 들어간다.
const plainArticle = { ...articles[0], slug: "display-fixture", station: undefined, transfers: undefined, image: undefined, cover: undefined, reel: undefined, dateModified: "2099-01-01" };
const fixtureCover = { src: "/cover-fixture.jpg", alt: "표지 전체", caption: "영상 표지", width: 1080, height: 1920 };
const fixtureImage = { src: "/body-fixture.jpg", alt: "본문 이미지", caption: "본문 설명", width: 800, height: 1000 };
const coverArticle = { ...plainArticle, slug: "display-cover-fixture", cover: fixtureCover, image: fixtureImage };
const bodyArticle = { ...plainArticle, slug: "display-image-fixture", image: fixtureImage };
articles.push(plainArticle, coverArticle, bodyArticle);
// 이 프로세스 안에서만 표지 있는 역/이미지 없는 역을 만들어 fallback을 검증한다.
stations[0].cover = fixtureCover;
stations[1].cover = undefined;
stations[1].crossSection = undefined;
const { articleEntries, sectionLinks } = await import("../src/lib/article-index.ts");
assert.equal(articleEntries.length, publishedCount + 3);
assert.equal(new Set(articleEntries.map(entry => entry.href)).size, articleEntries.length);
assert.equal(sectionLinks.reduce((sum, section) => sum + section.count, 0), articleEntries.length);
assert.deepEqual(articleEntries.map(entry => entry.href), [
  ...articles.map(article => ({ href: articlePath(article), date: article.datePublished })),
  ...stations.map(station => ({ href: stationPath(station), date: station.datePublished })),
].sort((a, b) => b.date.localeCompare(a.date)).map(entry => entry.href));

for (const article of articles) {
  const entry = articleEntries.find(item => item.href === articlePath(article));
  assert.equal(entry.title, article.question);
  assert.equal(entry.answer, article.answer);
  assert.equal(entry.published, article.datePublished);
  assert.equal(entry.modified, article.dateModified);
  assert.equal(entry.minutes, articleReadingMinutes(article));
  assert.equal(entry.place, article.station?.name);
  assert.deepEqual(entry.lines, article.station?.lines ?? []);
  assert.deepEqual(entry.image, article.image ?? (article.cover ? { ...article.cover, kind: "reel-cover" } : undefined));
}
for (const station of stations) {
  const entry = articleEntries.find(item => item.href === stationPath(station));
  assert.equal(entry.title, station.question);
  assert.equal(entry.answer, station.answer);
  assert.equal(entry.published, station.datePublished);
  assert.equal(entry.modified, station.dateModified);
  assert.equal(entry.minutes, readingMinutes(station));
  assert.equal(entry.place, station.name);
  assert.deepEqual(entry.lines, station.lines);
  assert.deepEqual(entry.image, station.photo ?? (station.cover ? { ...station.cover, kind: "reel-cover" } : station.crossSection ? { ...station.crossSection, kind: "cross-section" } : undefined));
}
assert.equal(articleEntries.find(entry => entry.href === stationPath(stations[1])).image, stations[1].photo, "실사 사진은 릴스 표지보다 우선");
assert.equal(articleEntries.find(entry => entry.href === articlePath(plainArticle)).image, undefined, "이미지 없는 대표·목록 허용");
assert.equal(articleEntries.find(entry => entry.href === articlePath(coverArticle)).image.src, fixtureImage.src, "실사 사진은 릴스 표지보다 우선");
assert.equal(articleEntries.find(entry => entry.href === articlePath(bodyArticle)).image.src, fixtureImage.src, "표지가 없으면 기존 본문 이미지 사용");
assert.deepEqual(articleEntries.find(entry => entry.href === articlePath(plainArticle)).lines, []);
assert(articleEntries.findIndex(entry => entry.href === articlePath(plainArticle)) > articleEntries.findIndex(entry => entry.href === articlePath(articles[0])), "동일 게시일 등록 순서 보존, 수정일로 끌어올리지 않음");
assert.equal(new Set(articleEntries.flatMap(entry => entry.lines)).size, 13, "실제 발행 글의 노선 집합");
console.log("Article index: 11 published entries, source parity, optional covers and image fallback, stable ordering and 13 lines PASS");
