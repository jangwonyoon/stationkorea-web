import type { Station } from "@/content/types";

/** 크레딧에 기관 이름을 몇 곳까지 적을지. 나머지는 "외 N곳"으로 줄이고 전문은 출처 목록에 있다. */
const MAX_ORGS = 3;

export type CreditsData = {
  /** 출처 기관(중복 제거). 숫자 카드가 인용한 기관을 먼저, 나머지는 출처 목록 순서. */
  orgs: string[];
  /** 크레딧에 이름을 적는 기관. */
  shownOrgs: string[];
  /** 이름을 줄인 기관 수. */
  restCount: number;
  /** 숫자 카드 기준일의 최소~최대. 숫자 카드가 없으면 null. */
  asOf: { from: string; to: string } | null;
};

/** "2026-08-31 기준" → 2026-08-31, "2021-09 보도 기준" → 2021-09, "2024년" → 2024년. */
function parseAsOf(text: string): { key: string; label: string } {
  const m = text.match(/^(\d{4})(?:-(\d{2}))?(?:-(\d{2}))?(년)?(?=\s|$)/);
  if (!m) throw new Error(`기준일을 읽을 수 없습니다: ${text}`);
  const [, y, mo, d, nyeon] = m;
  const month = Number(mo ?? 1);
  const day = Number(d ?? 1);
  const date = new Date(Date.UTC(Number(y), month - 1, day));
  if (date.getUTCFullYear() !== Number(y) || date.getUTCMonth() !== month - 1 || date.getUTCDate() !== day) {
    throw new Error(`유효하지 않은 기준일: ${text}`);
  }
  const label = mo ? [y, mo, d].filter(Boolean).join("-") : `${y}${nyeon ? "년" : ""}`;
  return { key: `${y}${mo ?? "00"}${d ?? "00"}`, label };
}

/** 크레딧 3줄 값을 station.sources·stats에서 계산한다. 값을 지어내지 않는다. */
export function computeCredits(s: Pick<Station, "sources" | "stats">): CreditsData {
  const statIds = new Set(s.stats.flatMap((st) => st.sourceIds));
  for (const id of statIds) {
    if (!s.sources.some((src) => src.id === id)) throw new Error(`숫자 출처가 없습니다: ${id}`);
  }
  const ordered = [...s.sources.filter((src) => statIds.has(src.id)), ...s.sources.filter((src) => !statIds.has(src.id))];
  const orgs = [...new Set(ordered.map((src) => src.org))];

  const dates = s.stats
    .map((st) => parseAsOf(st.asOf))
    .sort((a, b) => a.key.localeCompare(b.key));

  return {
    orgs,
    shownOrgs: orgs.slice(0, MAX_ORGS),
    restCount: Math.max(0, orgs.length - MAX_ORGS),
    asOf: dates.length > 0 ? { from: dates[0].label, to: dates[dates.length - 1].label } : null,
  };
}
