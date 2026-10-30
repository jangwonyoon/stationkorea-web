// 서울 지하철 1~9호선. 색과 채움 위 숫자색은 docs/design/v1/README.md "노선색과 원형 번호" 표 값.

export type LineId = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9";

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
};

/** 표시 문자열("2호선"). */
export function lineName(id: LineId): string {
  return LINES[id].name;
}
