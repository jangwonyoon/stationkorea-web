export const site = {
  name: "매일 그 길",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://stationkorea.com",
  description:
    "서울 지하철 역을 3D 단면으로 뜯어 공식 숫자로 설명합니다. 역 이름이 아니라 궁금한 질문으로 고르세요.",
  instagram: "https://www.instagram.com/maeil.geugil/",
  instagramHandle: "@maeil.geugil",
};

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
