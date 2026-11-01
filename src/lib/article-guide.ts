import type { MagazineArticle } from "../content/articles";

export function articleGuideSourceIds(article: Pick<MagazineArticle, "station" | "transfers">): string[] {
  return [...(article.station?.sourceIds ?? []), ...(article.transfers ?? []).flatMap((transfer) => [transfer.sourceId, ...(transfer.formation ? [transfer.formation.sourceId] : [])])];
}

export function validateArticleGuide(article: Pick<MagazineArticle, "slug" | "station" | "transfers" | "sources">): void {
  const station = article.station;
  const fail = (message: string): never => { throw new Error(`${article.slug}: ${message}`); };
  if (station && (!station.name || !station.sign.en || !station.sign.prev || !station.sign.next || !station.lines.includes(station.sign.line) || new Set(station.lines).size !== station.lines.length || !station.sourceIds.length)) fail("역명판의 역명·영문명·기준 노선·인접 역·출처를 확인하세요");
  const sources = new Map(article.sources.map((source) => [source.id, source]));
  if (sources.size !== article.sources.length) fail("출처 ID가 중복됩니다");
  for (const id of articleGuideSourceIds(article)) {
    const source = sources.get(id);
    if (!source?.url || !source.date) fail(`안내 출처의 URL·기준일이 필요합니다: ${id}`);
  }
  for (const transfer of article.transfers ?? []) {
    if (!station || !station.lines.includes(transfer.ride.line) || !station.lines.includes(transfer.to.line)) fail("안내 노선은 역명판의 노선에 포함되어야 합니다");
    if (!(transfer.car === "모든 칸" || /^(?:[1-9]|10)-[1-4]$/.test(transfer.car)) || !transfer.ride.direction || !transfer.to.direction || !transfer.time) fail("환승 방면·호차/문·참고 시간을 확인하세요");
    if (transfer.toCar && !(transfer.toCar === "모든 칸" || /^(?:[1-9]|10)-[1-4]$/.test(transfer.toCar))) fail("환승 승차 호차/문을 확인하세요");
    if (transfer.formation && (transfer.car === "모든 칸" || !Number.isInteger(transfer.formation.cars) || transfer.formation.cars < Number(transfer.car.split("-")[0]) || transfer.formation.cars > 10)) fail("호차와 편성 수가 맞지 않습니다");
  }
}
