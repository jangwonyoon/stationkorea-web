import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
const read = path => readFileSync(`out/${path}`, 'utf8');
const cards = html => [...html.matchAll(/href="(\/(?:article|station)\/[^"/]+\/)"/g)].map(match => match[1]);
const all = cards(read('articles/index.html'));
assert.equal(new Set(all).size, all.length, '목록 중복');
assert(all.includes('/station/konkuk-univ/') && all.includes('/article/dongjak-express/'), '두 기사 형식 보존');
const home = read('index.html');
const recent = home.split('id="new-articles"')[1].split('</section>')[0];
assert.deepEqual(cards(recent), all.slice(0, 4), '홈 최근4와 전체 정렬 일치');
const groups = ['transfer','walk','change'];
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
assert(!existsSync('out/section/see/index.html'));
assert(!read('sitemap.xml').includes('/section/see/'));
assert(home.includes('id="all"') && home.includes('id="lines"'), '기존 앵커 보존');
console.log(`Archive checks passed: ${all.length} articles, latest 4, 3 sections, canonical/JSON-LD/sitemap`);
