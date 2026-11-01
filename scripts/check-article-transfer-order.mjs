import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const slugs = ["jamsil", "sadang", "konkuk-univ"];
const oldTransferQuestions = [
  "잠실역에서 8호선으로 갈아탈 때 어디서 내리면 빠른가요?",
  "사당역에서 갈아탈 때 어디서 내리면 빠른가요?",
  "건대입구역에서 갈아탈 때 어디서 내리면 빠른가요?",
];
const rss = await readFile("out/rss.xml", "utf8");

for (const slug of slugs) {
  const html = await readFile(`out/station/${slug}/index.html`, "utf8");
  const markdown = await readFile(`out/station/${slug}/article.md`, "utf8");
  const order = [
    html.indexOf('aria-label="묻고 답하기"'),
    html.indexOf('id="transfer-heading"'),
    html.indexOf('data-rail="next"'),
    html.indexOf('id="sources"'),
  ];
  assert(order.every((index) => index >= 0), `${slug}: all article sections exist`);
  assert(order.every((index, i) => i === 0 || order[i - 1] < index), `${slug}: HTML order`);

  const markdownTransfer = markdown.indexOf("## 어디서 내리면 빠른가");
  assert(markdownTransfer > markdown.indexOf("## ", markdown.indexOf("원문:")), `${slug}: markdown order`);
  assert(markdown.includes("| 타고 있는 열차 | 갈아탈 노선·방면 | 내릴 칸 | 소요 시간 | 기준일·출처 |"), `${slug}: markdown transfer table`);
  for (const question of oldTransferQuestions) {
    assert(!html.includes(question), `${slug}: duplicate HTML Q&A removed`);
    assert(!markdown.includes(question), `${slug}: duplicate Markdown Q&A removed`);
  }
  assert.equal((html.match(/id="ref-seoulmetro-transfer-info"/g) ?? []).length, 1, `${slug}: unique first citation anchor`);

  const item = rss.slice(rss.indexOf(`<link>https://www.stationkorea.com/station/${slug}/</link>`));
  assert(item.indexOf("묻고 답하기") < item.indexOf("어디서 내리면 빠른가") && item.indexOf("어디서 내리면 빠른가") < item.indexOf("<h2>출처</h2>"), `${slug}: RSS order`);
}

console.log("Article transfer order, duplicate Q&A, source anchors and RSS/Markdown synchronization PASS");
