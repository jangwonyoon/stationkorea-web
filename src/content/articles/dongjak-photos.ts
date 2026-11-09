import type { StationPhoto } from "../station-photos";

export const dongjakPhotos = {
  bridge: {
    src: "/images/station/dongjak-bridge-photo.jpg",
    alt: "한강 위로 동작대교의 파란 아치와 교각이 이어진다.",
    caption: "2010년 8월의 동작대교. 아치와 교각이 한강 위로 이어진 모습이다. 원본 파일: 「Dongjak Bridge.jpg」. 크기 조정·WebP 변환, 크롭·색보정 없음. 변환본에도 CC BY-SA 3.0 적용.",
    width: 1600,
    height: 1200,
    artist: "Bart0278",
    source: "https://commons.wikimedia.org/wiki/File:Dongjak_Bridge.jpg",
    license: "CC BY-SA 3.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
  },
  cemetery: {
    src: "/images/station/dongjak-cemetery-photo.jpg",
    alt: "국립서울현충원 묘역에서 줄지어 선 묘비와 그 사이의 수목, 32·33번 구역 표지가 보인다.",
    caption: "2012년 8월 5일의 국립서울현충원 묘역. 묘비 사이에 수목이 놓여 있다. 원본 파일: 「Seoul National Cemetery 5.jpg」. 크기 조정·WebP 변환, 크롭·색보정 없음. 변환본에도 CC BY-SA 2.0 적용.",
    width: 1600,
    height: 1063,
    artist: "Jordi Sanchez Teruel",
    source: "https://commons.wikimedia.org/wiki/File:Seoul_National_Cemetery_5.jpg",
    license: "CC BY-SA 2.0",
    licenseUrl: "https://creativecommons.org/licenses/by-sa/2.0/",
  },
} satisfies Record<string, StationPhoto>;
