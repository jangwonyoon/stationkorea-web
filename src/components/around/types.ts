/** M1 데이터와 구조적으로 호환하며, 미병합 콘텐츠 모듈에는 의존하지 않는다. */
export interface Place {
  id: string;
  name: string;
  designation: { agency: string; name: string; year: number | null; source: { url: string; asOf: string } };
  menu: { name: string; priceWon: number | null; asOf: string } | null;
  exit: number | null;
  walkMinutes: number | null;
  address: string;
  maps: { naver: string; kakao: string };
  asOf: string;
  editorNote?: string;
}
export interface CongestionSeries {
  station: string;
  intervalMinutes: number;
  description: string;
  times: string[];
  rows: { day: "평일" | "토요일" | "일요일"; line: string; direction: string; percentages: number[] }[];
}
