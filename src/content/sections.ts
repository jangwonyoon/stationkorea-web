import type { StationSection } from "./types";

export const sections: { id: StationSection; name: string; description: string }[] = [
  { id: "transfer", name: "갈아타다", description: "역과 환승 구조를 살펴봅니다." },
  { id: "walk", name: "걷다", description: "출구 너머 동네와 보행, 생활을 읽습니다." },
  { id: "see", name: "보다", description: "랜드마크와 공간을 새로운 시선으로 봅니다." },
  { id: "change", name: "바뀌다", description: "도시와 노선, 숫자가 달라지는 이유를 살펴봅니다." },
];
export const sectionPath = (id: StationSection) => `/section/${id}/`;
export type SectionLink = (typeof sections)[number] & { count: number };
