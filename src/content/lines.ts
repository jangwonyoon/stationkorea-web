// 숫자 노선 색은 docs/design/v1/README.md 기준. 이름 노선은 안내용 근사색이며 공식 지정 hex가 아니다.

export type LineId = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "gyeongui-jungang" | "arex" | "seohae" | "gimpo-goldline";

export const LINES: Record<LineId, { name: string; color: string; onColor: "white" | "ink" }> = {
  "1": { name: "1호선", color: "#0052A4", onColor: "white" },
  "2": { name: "2호선", color: "#00A84D", onColor: "white" },
  "3": { name: "3호선", color: "#EF7C1C", onColor: "ink" },
  "4": { name: "4호선", color: "#00A5DE", onColor: "ink" },
  "5": { name: "5호선", color: "#996CAC", onColor: "white" },
  "6": { name: "6호선", color: "#CD7C2F", onColor: "ink" },
  "7": { name: "7호선", color: "#747F00", onColor: "white" },
  "8": { name: "8호선", color: "#E6186C", onColor: "white" },
  "9": { name: "9호선", color: "#BDB092", onColor: "ink" },
  "gyeongui-jungang": { name: "경의중앙선", color: "#77C4A3", onColor: "ink" },
  "arex": { name: "공항철도", color: "#0090D2", onColor: "ink" },
  "seohae": { name: "서해선", color: "#8FC31F", onColor: "ink" },
  "gimpo-goldline": { name: "김포골드라인", color: "#A17800", onColor: "white" },
};

/** 표시 문자열("2호선"). */
export function lineName(id: LineId): string {
  return LINES[id].name;
}
