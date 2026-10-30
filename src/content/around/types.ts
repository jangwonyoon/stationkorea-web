export interface AroundSource {
  agency: string;
  title: string;
  url: string;
  license: string;
  asOf: string;
}

export type SadangExit = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;

export interface Place {
  id: string;
  name: string;
  designation: {
    agency: string;
    name: string;
    year: number | null;
    source: AroundSource;
  };
  menu: { name: string; priceWon: number | null; asOf: string } | null;
  exit: SadangExit | null;
  walkMinutes: number | null;
  address: string;
  maps: { naver: string; kakao: string };
  asOf: string;
  editorNote?: string;
}

export interface CongestionRow {
  day: "평일" | "토요일" | "일요일";
  line: "2호선" | "4호선";
  stationNumber: string;
  direction: "내선" | "외선" | "상선" | "하선";
  percentages: number[];
}
