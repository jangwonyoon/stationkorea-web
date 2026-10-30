// 역 기사(F안) 콘텐츠 형식. 2단계에서 reel-studio 발행 스킬이 이 형식으로 초안을 만든다.
import type { LineId } from "./lines";

export type { LineId } from "./lines";

/** 출처 한 건. 기관·자료명·기준일을 전문으로 적고, 공식 자료는 URL까지. 조사 방법(파일 ID·내려받기 절차)은 적지 않는다. */
export type Source = {
  id: string;
  org: string;
  title: string;
  /** 기준일 또는 발표일. 사람이 읽는 형태(예: "2026-06-30 기준", "2025-02-19 발표"). */
  date: string;
  url?: string;
};

/** 숫자·출처 카드. 기사마다 정확히 3개. */
export type Stat = {
  value: string;
  label: string;
  asOf: string;
  sourceIds: string[];
};

/** Q&A 한 항목. FAQPage 구조화 데이터와 1:1로 쓰이므로 답은 평문 단락으로 둔다. */
export type Qna = {
  question: string;
  answer: string[];
  sourceIds: string[];
};

/** 매거진 섹션. #갈아타다(역·환승 구조)·#걷다(출구별 동네·보행·생활)·#보다(랜드마크·공간)·#바뀌다(도시 변화·숫자 소식). */
export type StationSection = "transfer" | "walk" | "see" | "change";

/** 역명판. `line`은 기준 노선(앞뒤 역이 속한 노선)이고 Station.lines 안에 있어야 한다. */
export type StationSign = { line: LineId; prev: string; next: string; en: string };

/**
 * 하차 칸 한 행: 타고 있는 열차(노선·방면) → 갈아탈 열차(노선·방면) → 내릴 칸 + 소요 시간.
 * 원자료 행 여러 개가 같은 열차·같은 칸이면 한 행으로 합치고 방면은 "A·B 방면", 시간은 범위로 적는다.
 */
export type Transfer = {
  ride: { line: LineId; direction: string };
  to: { line: LineId; direction: string };
  /** 내릴 칸(호차-문). 예: "10-4". */
  car: string;
  /** 사람이 읽는 소요 시간. 예: "3분 24초", "3분 22~24초". */
  time: string;
  sourceId: string;
};

/** 풀쿼트 숫자 하나. */
export type PullQuote = { value: string; label: string; sourceIds: string[] };

export type Station = {
  slug: string;
  /** 역 해부 일련번호(릴스 게시 순). */
  no: number;
  name: string;
  /** 노선 id. 표시 문자열은 LINES[id].name. 첫 번째가 기준 노선. */
  lines: LineId[];
  section: StationSection;
  sign: StationSign;
  /** H1. 릴스 제목과 같은 질문. */
  question: string;
  /** <title>. 역 이름·숫자·질문을 앞에 둔다. */
  seoTitle: string;
  /** 첫 단락이자 meta description. 역 이름·노선·핵심 숫자·기준일을 담은 한 문장. */
  answer: string;
  /** 다음 기사 카드에 쓰는 짧은 질문("그럼 사당은 왜?" 뒤에 붙는 문장). */
  teaser: string;
  /** 3D 단면 이미지(4:5). v1의 `section` 필드가 섹션 구분으로 바뀌면서 이름을 옮겼다. */
  crossSection: { src: string; alt: string; caption: string };
  ogImage: string;
  stats: [Stat, Stat, Stat];
  pullQuote?: PullQuote;
  /** 하차 칸 요약 한 줄. 행 단위 값은 transfers. */
  pin: { text: string; sourceIds: string[] };
  /** 하차 칸 행. sourceId는 sources에 있어야 한다. */
  transfers: Transfer[];
  reel: { url: string; thumbnail: string; postedAt: string };
  qna: Qna[];
  sources: Source[];
  datePublished: string;
  dateModified: string;
  /** 숫자 정정 기록(SEO·GEO 규칙 19). 정정하면 dateModified도 같은 날로 올린다. 비어 있으면 숨긴다. */
  corrections?: { date: string; before: string; after: string; reason: string }[];
  /** 이 역을 가리키는 철도 소식(/news/). 비어 있으면 "최근 소식" 자리를 숨긴다. */
  news?: { href: string; title: string; date: string }[];
};
