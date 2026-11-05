import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = path => readFileSync(`out/${path}`, 'utf8');
const cards = html => [...html.matchAll(/href="(\/(?:article|station)\/[^"/]+\/)"/g)].map(match => match[1]);
const all = cards(read('articles/index.html'));
assert.equal(new Set(all).size, all.length, '목록 중복');
assert(all.includes('/station/konkuk-univ/') && all.includes('/article/dongjak-express/'), '두 기사 형식 보존');
const home = read('index.html');
const recent = home.split('id="new-articles"')[1].split('</section>')[0];
const featuredHref = '/article/seongsu-branch/';
const expectedRecent = all.filter(href => href !== featuredHref).slice(0, 4);
assert.deepEqual(cards(recent), expectedRecent, '대표를 제외한 홈 최근4와 전체 정렬 일치');
const featured = home.split('aria-labelledby="cover-question"')[1].split('</section>')[0];
assert.deepEqual(cards(featured), [featuredHref], '성수 시범을 대표로 선택, 링크 하나');
assert(featured.includes('/generated/seongsu-photo-'), '현재 대표 기사의 실사 사진');
assert(!cards(recent).includes(cards(featured)[0]), '대표와 최근 목록 중복 없음');
const homeSchema = [...home.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].flatMap(m => JSON.parse(m[1])).find(x => x['@type'] === 'ItemList');
assert.deepEqual(homeSchema.itemListElement.map(x => new URL(x.url).pathname), [featuredHref, ...expectedRecent], '홈 JSON-LD는 실제 대표와 최근 기사만 포함');
const groups = ['transfer','walk','see','change'];
const union = [];
for (const id of groups) {
  const html = read(`section/${id}/index.html`);
  const links = cards(html);
  assert(links.length > 0);
  union.push(...links);
  const schema = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map(m => JSON.parse(m[1])).find(x => x['@type'] === 'CollectionPage');
  assert.deepEqual(schema.mainEntity.itemListElement.map(x => new URL(x.url).pathname), links, '화면/JSON-LD 일치');
  assert(html.includes(`rel="canonical" href="https://www.stationkorea.com/section/${id}/"`));
  assert(read('sitemap.xml').includes(`/section/${id}/`));
}
assert.deepEqual(union.sort(), [...all].sort(), '섹션 누락·중복 없음');
assert(existsSync('out/section/see/index.html'));
assert(read('sitemap.xml').includes('/section/see/'));
assert(home.includes('id="all"') && home.includes('id="lines"'), '기존 앵커 보존');
const archive = read('articles/index.html');
for (const slug of ['jamsil', 'sadang', 'konkuk-univ', 'express-terminal', 'hongdae']) {
  assert(archive.includes(`/generated/${slug}-photo-`), `${slug}: 실사 사진 우선`);
}
const hongdae = read('article/hongdae-transfer/index.html');
const reel = 'https://www.instagram.com/reel/DfMsIvHRqjm/';
assert(hongdae.includes(`href="${reel}"`) && hongdae.includes('data-rail="reel"'), '홍대 재게시 릴스를 공통 보조 정보에 연결');
assert(hongdae.includes('dateTime="2026-11-01T21:06:00+09:00"'), '릴스 게시일은 기사 발행일과 구분');
assert(read('article/hongdae-transfer/article.md').includes(reel), '마크다운 영상 링크 일치');
assert(read('rss.xml').includes(reel), 'RSS 영상 링크 일치');
assert(!hongdae.includes('VideoObject') && !hongdae.includes('<iframe'), '외부 링크를 재생 가능한 영상으로 마크업하지 않음');
console.log(`Archive checks passed: ${all.length} articles, latest 4, 4 sections, canonical/JSON-LD/sitemap`);
