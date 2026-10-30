import type { Station } from "../types";
import { jamsil } from "./jamsil";
import { konkukUniv } from "./konkuk-univ";
import { sadang } from "./sadang";

/** 역 해부 일련번호 순. 다음 기사 카드는 이 순서를 따라 돌고, 마지막은 처음으로 돌아간다. */
export const stations: Station[] = [jamsil, sadang, konkukUniv].sort((a, b) => a.no - b.no);

for (const s of stations) {
  // 숫자 카드 3개 + 출처가 없는 기사는 발행하지 않는다(설계 문서 전제 1).
  const ids = new Set(s.sources.map((x) => x.id));
  const refs = [
    ...[...s.stats, s.pin, ...s.qna, ...(s.pullQuote ? [s.pullQuote] : [])].flatMap((x) => x.sourceIds),
    ...s.transfers.map((t) => t.sourceId),
  ];
  const missing = refs.filter((id) => !ids.has(id));
  if (s.stats.length !== 3 || missing.length > 0) {
    throw new Error(`${s.slug}: 숫자 카드 3개와 출처 연결이 필요합니다 (없는 출처: ${missing.join(", ")})`);
  }
  // 역명판 기준 노선과 하차 칸 행의 노선은 이 역의 노선이어야 한다.
  const usedLines = [s.sign.line, ...s.transfers.flatMap((t) => [t.ride.line, t.to.line])];
  const strayLines = usedLines.filter((id) => !s.lines.includes(id));
  if (strayLines.length > 0) {
    throw new Error(`${s.slug}: sign·transfers의 노선이 lines에 없습니다 (${[...new Set(strayLines)].join(", ")})`);
  }
}

export function getStation(slug: string): Station | undefined {
  return stations.find((s) => s.slug === slug);
}

export function getNextStation(slug: string): Station {
  const i = stations.findIndex((s) => s.slug === slug);
  return stations[(i + 1) % stations.length];
}

/** 최신순(웹 게시일, 같으면 릴스 게시일). */
export function latestStations(): Station[] {
  return [...stations].sort(
    (a, b) => b.datePublished.localeCompare(a.datePublished) || b.reel.postedAt.localeCompare(a.reel.postedAt),
  );
}

export function stationPath(s: Pick<Station, "slug">): string {
  return `/station/${s.slug}/`;
}
