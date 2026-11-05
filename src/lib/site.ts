export const site = {
  name: "STATION KOREA",
  koreanName: "스테이션코리아",
  channelName: "매일 그 길",
  tagline: "역에서 시작해, 길과 동네와 도시를 읽습니다.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.stationkorea.com",
  description:
    "교통과 공간의 구조, 그 주변의 생활과 변화를 이야기하는 웹매거진입니다.",
  instagram: "https://www.instagram.com/maeil.geugil/",
  instagramHandle: "@maeil.geugil",
  email: "stationkorea.official@gmail.com",
  // Umami Cloud(US) 웹사이트 ID. HTML에 그대로 노출되는 공개 값이다.
  umamiWebsiteId: "82982143-23ab-4f87-b891-bc364d0b5ac3",
  // 바이라인·Article author(SEO·GEO 규칙 6·18). 저자 소개는 /about/#author.
  author: {
    name: "윤장원",
    bio: "철도역과 길의 구조를 출처와 함께 설명하는 웹 개발자. STATION KOREA의 글과 자료를 확인합니다.",
    path: "/about/#author",
  },
};

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
