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
  /** 내릴 칸(호차-문). 예: "10-4". 공식 원자료의 All은 "모든 칸". */
  car: string;
  /** 원자료의 갈아탈 열차 승차 위치. */
  toCar?: string;
  /** 사람이 읽는 소요 시간. 예: "3분 24초", "3분 22~24초". */
  time: string;
  sourceId: string;
  /** 편성 근거가 있을 때만 칸 위치를 그린다. */
  formation?: { cars: number; sourceId: string };
};

/** 풀쿼트 숫자 하나. */
export type PullQuote = { value: string; label: string; sourceIds: string[] };

/** 비교표 한 행. "구분 | A | B"의 구분(label)과 열마다 값. 행 단위로 출처를 단다(SEO·GEO 규칙 2). */
export type ComparisonRow = {
  label: string;
  /** columns와 같은 순서·같은 개수. */
  values: string[];
  sourceIds: string[];
  /** 출처 성격 등 짧은 덧붙임. 예: "층수는 나무위키 단독 자료". */
  note?: string;
};

/** 비교표(#갈아타다·#바뀌다). 첫 열 머리는 "구분"으로 고정, columns는 비교 대상(예: "2호선", "4호선"). */
export type Comparison = {
  /** 표 제목(<caption>). */
  title: string;
  columns: string[];
  rows: ComparisonRow[];
};

/**
 * 환승 스텝 한 단계. 내림 → 계단·통로 → 갈아탐.
 * 시간·거리는 출처가 확인된 값만 `measure`에 넣는다. 확인 안 된 값은 넣지 않고, 없으면 화면에 표시하지 않는다.
 */
export type TransferStep = {
  kind: "alight" | "walk" | "board";
  /** 단계 설명. 예: "4호선 총신대입구 방면 열차 10-4에서 내립니다." */
  text: string;
  measure?: {
    /** 사람이 읽는 시간. 예: "1분 2초". */
    time?: string;
    /** 사람이 읽는 거리. 예: "74m". */
    distance?: string;
    asOf: string;
    sourceIds: string[];
  };
};

/** 환승 경로 하나(예: "4호선 → 2호선 방배 방면"). */
export type TransferRoute = { title: string; steps: TransferStep[] };

/** 사업 진행 단계(신호등 4단계). 화면에는 색과 함께 단계 이름을 쓴다. */
export type ProjectStage = "구상" | "계획" | "설계" | "시공";

/** 진행 연표 한 항목. 화면 형식 "YYYY.M.D 기관 > 문서" + URL. */
export type TimelineItem = {
  /** ISO 날짜. 일까지 모르면 "YYYY-MM" 또는 "YYYY". */
  date: string;
  org: string;
  /** 문서·발표 이름. */
  doc: string;
  url: string;
  /** 이 항목 시점의 사업 단계. */
  stage?: ProjectStage;
  /** 한 문장 요약. */
  summary?: string;
};

/** 진행 연표 하나(사업 단위). */
export type Timeline = { title: string; items: TimelineItem[] };

/** 목록에 쓰는 선택적 릴스 표지. 본문 이미지와 구분하며 글자가 잘리지 않게 전체를 표시한다. */
export type ReelCover = { src: string; alt: string; caption: string; width: number; height: number };

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
  cover?: ReelCover;
  ogImage: string;
  stats: [Stat, Stat, Stat];
  pullQuote?: PullQuote;
  /** 하차 칸 요약 한 줄. 행 단위 값은 transfers. */
  pin: { text: string; sourceIds: string[] };
  /** 하차 칸 행. sourceId는 sources에 있어야 한다. */
  transfers: Transfer[];
  reel: { url: string; thumbnail: string; postedAt: string; notice?: string };
  qna: Qna[];
  sources: Source[];
  datePublished: string;
  dateModified: string;
  /** 숫자 정정 기록(SEO·GEO 규칙 19). 정정하면 dateModified도 같은 날로 올린다. 비어 있으면 숨긴다. */
  corrections?: { date: string; before: string; after: string; reason: string }[];
  /** 비교표(#갈아타다·#바뀌다). 비어 있으면 숨긴다. sourceIds는 sources에 있어야 한다. */
  comparison?: Comparison;
  /** 환승 스텝(#갈아타다). 단계별 시간·거리가 확인된 역만 넣는다. 비어 있으면 숨긴다. */
  transferRoutes?: TransferRoute[];
  /** 진행 연표(#바뀌다). 비어 있으면 숨긴다. */
  timelines?: Timeline[];
  /** 이 역을 가리키는 철도 소식(/news/). 비어 있으면 "최근 소식" 자리를 숨긴다. */
  news?: { href: string; title: string; date: string }[];
};
