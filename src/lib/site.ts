export const site = {
  name: "매일 그 길",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://staionkorea.com",
  description:
    "서울 지하철 역을 3D 단면으로 뜯어 공식 숫자로 설명합니다. 역 이름이 아니라 궁금한 질문으로 고르세요.",
  instagram: "https://www.instagram.com/maeil.geugil/",
  instagramHandle: "@maeil.geugil",
  aiNotice:
    "3D 단면 이미지·영상 클립과 릴스 썸네일 배경은 공개자료를 바탕으로 AI로 생성한 참고 시각화이며, 실제 구조·치수와 다를 수 있습니다. 대본·숫자·출처는 사람이 썼습니다.",
};

export function absoluteUrl(path: string): string {
  return new URL(path, site.url).toString();
}
