import type { Station } from "../types";

// 원천: reel-studio episodes/maeil-geugil/jamsil-transfer (facts.md·caption.txt·pin.txt·episode.json)
export const jamsil: Station = {
  slug: "jamsil",
  no: 1,
  name: "잠실역",
  lines: ["2", "8"],
  section: "transfer",
  sign: { line: "2", prev: "잠실새내", next: "잠실나루", en: "Jamsil" },
  question: "잠실역, 2호선에서 8호선까지 왜 이렇게 멀까?",
  seoTitle: "잠실역 2호선↔8호선 환승 200m, 왜 이렇게 멀까",
  answer:
    "잠실역 2호선과 8호선 승강장이 약 200m 떨어진 것은, 1996년에 개통한 8호선이 1980년부터 있던 2호선 바로 아래 대신 곧은 승강장을 놓으려고 송파구청 쪽으로 비켜 자리 잡았기 때문입니다.",
  teaser: "2호선에서 8호선까지 왜 200m나 걸을까?",
  crossSection: {
    src: "/images/station/jamsil-section.jpg",
    alt: "잠실역 단면 그림. 위층에 2호선 승강장, 아래로 송파대로 쪽으로 꺾여 나간 8호선 승강장과 두 노선을 잇는 계단·통로가 보인다.",
    caption: "잠실역사거리 아래 2호선(초록)과 송파대로 쪽으로 비켜 자리 잡은 8호선(분홍).",
  },
  ogImage: "/images/station/jamsil-og.jpg",
  stats: [
    {
      value: "약 200m",
      label: "2호선 승강장과 8호선 승강장 사이 거리",
      asOf: "2021-09 보도 기준",
      sourceIds: ["redaily-2021", "wiki-jamsil"],
    },
    {
      value: "156,177명",
      label: "2024년 하루 평균 승하차, 1~8호선 273개 역 중 1위",
      asOf: "2024년",
      sourceIds: ["seoulmetro-2024"],
    },
    {
      value: "4.2m → 8.3m",
      label: "환승통로 안 상가 3곳을 철거해 넓히는 통로 폭",
      asOf: "2026-04-07 발표",
      sourceIds: ["seoulmetro-2026-04"],
    },
  ],
  pin: {
    text: "반대쪽 끝 칸에서 내리면 최대 2분 47초를 더 걷습니다.",
    sourceIds: ["seoulmetro-transfer-info"],
  },
  transfers: [
    { ride: { line: "2", direction: "잠실새내 방면" }, to: { line: "8", direction: "몽촌토성·석촌 방면" }, car: "10-3", time: "3분 58초~4분 1초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "2", direction: "잠실나루 방면" }, to: { line: "8", direction: "몽촌토성·석촌 방면" }, car: "1-1", time: "4분 1~11초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "8", direction: "몽촌토성 방면" }, to: { line: "2", direction: "잠실새내·잠실나루 방면" }, car: "6-4", time: "4분 1초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "8", direction: "석촌 방면" }, to: { line: "2", direction: "잠실새내·잠실나루 방면" }, car: "1-1", time: "3분 58초~4분 11초", sourceId: "seoulmetro-transfer-info" },
  ],
  reel: {
    url: "https://www.instagram.com/reel/De8-ObmRYZk/",
    thumbnail: "/images/station/jamsil-reel.jpg",
    postedAt: "2026-10-26T18:35:00+09:00",
  },
  qna: [
    {
      question: "잠실역 2호선과 8호선은 왜 이런 구조가 됐나요?",
      answer: [
        "2호선 잠실역은 1980년 10월 31일, 8호선 잠실역은 16년 뒤인 1996년 11월 23일에 문을 열었습니다.",
        "두 노선은 잠실역사거리에서 방향을 크게 바꾸며 만납니다. 교차로 바로 아래에서 직결 환승하는 것이 이상적이었지만, 8호선 역은 곡선 대신 곧은 승강장을 택해 송파대로를 따라 송파구청 쪽에 치우쳐 자리 잡았고, 그만큼 환승통로가 길어졌습니다.",
        "두 노선 모두 상대식 승강장이며 긴 환승통로 2개로 이어집니다. 2호선 쪽 통로는 방향별로 나뉘어 있고, 8호선 쪽 통로에서는 맞은편 승강장으로 건너갈 수 있습니다.",
      ],
      sourceIds: ["redaily-2021", "wiki-jamsil"],
    },
    {
      question: "잠실역은 하루에 몇 명이 이용하나요?",
      answer: [
        "2024년 잠실역(2호선)은 하루 평균 156,177명이 타고 내려 서울 지하철 1~8호선 273개 역 가운데 1위였습니다. 2위는 홍대입구(150,369명), 3위는 강남(149,757명)입니다.",
        "강남역은 1997년부터 2022년까지 26년간 1위였고, 2023년에 잠실역이 자리를 넘겨받았습니다. 서울교통공사는 광역환승센터, 2024년 8호선 별내선 연장 개통에 따른 유입, 프로야구 흥행을 요인으로 들었습니다.",
        "2호선↔8호선 평일 환승 인원은 122,827명으로 서울교통공사 73개 환승역 가운데 10위입니다(2026년 6월 30일 기준).",
      ],
      sourceIds: ["seoulmetro-2024", "seoulmetro-transfer-count"],
    },
    {
      question: "잠실역 환승통로는 앞으로 무엇이 바뀌나요?",
      answer: [
        "서울시는 2025년 12월 4일 홍대입구·서울역·잠실·강남·신도림 5개 환승역의 혼잡 개선에 착수했습니다. 잠실역은 혼잡한 환승통로 공간을 재배치하고, 주요 혼잡 구간의 동선을 나누도록 안전펜스를 보강합니다.",
        "서울교통공사는 2026년 4월 7일, 환승통로 안 상가 3곳을 철거해 통로 폭을 4.2m에서 8.3m로 넓힌다고 발표했습니다. 상가 철거는 임대 계약이 끝나는 시점에 맞춰 진행합니다.",
      ],
      sourceIds: ["seoul-2025-12", "seoulmetro-2026-04"],
    },
  ],
  sources: [
    {
      id: "redaily-2021",
      org: "철도경제신문",
      title: "박준한 칼럼 「직선 승강장을 위해 환승통로가 길어진 잠실역」",
      date: "2021-09-29",
      url: "http://www.redaily.co.kr/news/articleView.html?idxno=2293",
    },
    {
      id: "wiki-jamsil",
      org: "위키백과",
      title: "잠실역",
      date: "2026-10 열람",
      url: "https://ko.wikipedia.org/wiki/%EC%9E%A0%EC%8B%A4%EC%97%AD",
    },
    {
      id: "seoulmetro-2024",
      org: "서울교통공사",
      title: "2024년 서울 지하철 1~8호선 수송 통계",
      date: "2025-02-19 발표",
      url: "https://www.datanews.co.kr/news/article.html?no=137249",
    },
    {
      id: "seoulmetro-transfer-count",
      org: "서울교통공사",
      title: "환승역 환승인원 정보",
      date: "2026-06-30 기준",
      url: "https://www.data.go.kr/data/15062858/fileData.do",
    },
    {
      id: "seoulmetro-transfer-info",
      org: "서울교통공사",
      title: "서울 도시철도 환승정보(환승 경로 안내)",
      date: "2026-09-01 기준",
      url: "https://www.data.go.kr/data/15098252/fileData.do",
    },
    {
      id: "seoul-2025-12",
      org: "서울특별시 교통실 도시철도과",
      title: "보도자료: 5개 혼잡 환승역 맞춤형 혼잡 개선 착수",
      date: "2025-12-04",
      url: "https://news.seoul.go.kr/traffic/archives/515812",
    },
    {
      id: "seoulmetro-2026-04",
      org: "서울교통공사",
      title: "잠실역 환승통로 상가 철거·통로 확장 발표(교통일보 보도)",
      date: "2026-04-07 발표",
      url: "https://www.tdaily.co.kr/news/view.php?idx=60632",
    },
  ],
  datePublished: "2026-10-29T09:00:00+09:00",
  dateModified: "2026-11-01T14:03:09+09:00",
};
