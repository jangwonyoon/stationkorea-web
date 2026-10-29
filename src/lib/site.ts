export const site = {
  name: "매일 그 길",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stationkorea.com",
  description:
    "서울 지하철 역을 3D 단면으로 뜯어 공식 숫자로 설명합니다. 역 이름이 아니라 궁금한 질문으로 고르세요.",
  instagram: "https://www.instagram.com/maeil.geugil/",
  instagramHandle: "@maeil.geugil",
  email: "stationkorea.official@gmail.com",
  // Umami Cloud(US) 웹사이트 ID. HTML에 그대로 노출되는 공개 값이다.
  umamiWebsiteId: "82982143-23ab-4f87-b891-bc364d0b5ac3",
  // 바이라인·Article author(SEO·GEO 규칙 6·18). 저자 소개는 /about/#author.
  author: {
    name: "윤장원",
    bio: "서울 지하철 역 구조를 공식 자료로 뜯어보는 웹 개발자. 매일 그 길의 대본·숫자·출처를 쓰고 확인합니다.",
    path: "/about/#author",
  },
};

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
