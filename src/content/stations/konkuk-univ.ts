import type { Station } from "../types";

// 원천: reel-studio episodes/maeil-geugil/konkuk-transfer (facts.md·caption.txt·pin.txt·episode.json)
export const konkukUniv: Station = {
  slug: "konkuk-univ",
  no: 3,
  name: "건대입구역",
  lines: ["2", "7"],
  section: "transfer",
  sign: { line: "2", prev: "성수", next: "구의", en: "Konkuk Univ." },
  question: "건대입구역, 걸으면 77m인데 휠체어는 왜 1,400m일까?",
  seoTitle: "건대입구역 2호선↔7호선 환승 77m, 휠체어는 왜 1,404m일까",
  answer:
    "건대입구역은 2호선이 땅 위 약 15m 고가에, 7호선이 땅 밑 약 8m에 있어서, 걸으면 77m인 환승이 휠체어로는 지상으로 나와 횡단보도를 건너 다시 올라가는 1,404m, 18배가 됩니다(2022년 조사 기준).",
  teaser: "걸으면 77m인데 휠체어는 왜 1,400m일까?",
  crossSection: {
    src: "/images/station/konkuk-univ-section.jpg",
    alt: "건대입구역 단면 그림. 위쪽 고가 2호선 승강장과 아래쪽 7호선 쪽을 잇는 계단에 77m, 휠체어 경로에 1400m 표시가 붙어 있다.",
    caption: "땅 위 고가 2호선(초록)과 땅 밑 7호선(올리브). 계단 경로 77m와 휠체어 경로 1,400m.",
  },
  ogImage: "/images/station/konkuk-univ-og.jpg",
  stats: [
    {
      value: "77m",
      label: "2호선↔7호선 일반 환승거리",
      asOf: "2022년 조사 기준",
      sourceIds: ["khan-2022"],
    },
    {
      value: "1,404m",
      label: "같은 환승의 휠체어 경로, 일반의 18배(분석한 44개 역 58개 경로 중 차이 최대)",
      asOf: "2022년 조사 기준",
      sourceIds: ["khan-2022"],
    },
    {
      value: "108,888명",
      label: "평일 환승 인원, 서울교통공사 73개 환승역 중 11위",
      asOf: "2026-06-30 기준",
      sourceIds: ["seoulmetro-transfer-count"],
    },
  ],
  pin: {
    text: "건대입구역에서 2호선 구의 방면 열차는 7호선 자양 방면으로 갈 때 8-3(3분 44초), 어린이대공원 방면으로 갈 때 7-3(5분 25초)에서 내립니다. 2호선 성수 방면 열차는 3-2(3분 49초~5분 35초), 7호선 자양 방면 열차는 1-1(3분 44~49초), 어린이대공원 방면 열차는 8-4(5분 25~35초)에서 내립니다(서울교통공사, 2026-09-01 기준). 반대쪽 끝 칸에서 내리면 승강장 길이만큼 더 걸어 최대 2분 47초를 더 씁니다.",
    sourceIds: ["seoulmetro-transfer-info"],
  },
  transfers: [
    { ride: { line: "2", direction: "구의 방면" }, to: { line: "7", direction: "자양 방면" }, car: "8-3", time: "3분 44초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "2", direction: "구의 방면" }, to: { line: "7", direction: "어린이대공원 방면" }, car: "7-3", time: "5분 25초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "2", direction: "성수 방면" }, to: { line: "7", direction: "자양·어린이대공원 방면" }, car: "3-2", time: "3분 49초~5분 35초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "7", direction: "자양 방면" }, to: { line: "2", direction: "구의·성수 방면" }, car: "1-1", time: "3분 44~49초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "7", direction: "어린이대공원 방면" }, to: { line: "2", direction: "구의·성수 방면" }, car: "8-4", time: "5분 25~35초", sourceId: "seoulmetro-transfer-info" },
  ],
  reel: {
    url: "https://www.instagram.com/reel/DfBF0puToTl/",
    thumbnail: "/images/station/konkuk-univ-reel.jpg",
    postedAt: "2026-10-28T09:00:00+09:00",
  },
  qna: [
    {
      question: "건대입구역은 왜 휠체어로 갈아타면 1,400m를 가야 하나요?",
      answer: [
        "2호선 건대입구역은 1980년 10월 31일 신설동~종합운동장 구간 개통 때 '화양역'으로 문을 열었고 1985년 3월 1일 지금 이름이 됐습니다. 7호선은 1996년 10월 11일 장암~건대입구 구간의 종착역으로 들어왔고, 2000년 8월 1일 신풍 방면이 이어지며 중간역이 됐습니다.",
        "2호선은 지상 3층 고가역(땅 위 약 15m), 7호선은 지하역(땅 밑 약 8m)이며, 두 노선 모두 상대식 승강장입니다. 걷는 사람은 두 승강장 사이 계단으로 77m를 가지만, 휠체어 이용자는 지하 승강장에서 지상으로 올라와 바깥 도로를 따라 횡단보도를 건넌 뒤 다시 고가 승강장으로 올라가야 해 1,404m가 됩니다.",
        "서울교통공사 환승역 44개 역 58개 경로를 분석한 2022년 연구에서 일반 환승거리는 35~355m, 휠체어 환승거리는 234~1,404m였고 평균은 150m와 725m로 4.8배 차이였습니다. 차이가 가장 큰 곳이 건대입구역(18배)입니다. 2022년 조사 기준이라 이후 승강기 설치 등으로 경로가 바뀌었을 수 있습니다.",
      ],
      sourceIds: ["khan-2022", "wiki-konkuk", "namu-konkuk"],
    },
    {
      question: "건대입구역에서 갈아탈 때 어디서 내리면 빠른가요?",
      answer: [
        "건대입구역에서 2호선 구의 방면 열차는 7호선 자양 방면으로 갈 때 8-3(3분 44초), 어린이대공원 방면으로 갈 때 7-3(5분 25초)에서 내립니다. 2호선 성수 방면 열차는 3-2(3분 49초~5분 35초), 7호선 자양 방면 열차는 1-1(3분 44~49초), 어린이대공원 방면 열차는 8-4(5분 25~35초)에서 내립니다(서울교통공사, 2026-09-01 기준).",
        "반대쪽 끝 칸에서 내리면 승강장 길이만큼 더 걸어 최대 2분 47초가 더 듭니다.",
      ],
      sourceIds: ["seoulmetro-transfer-info"],
    },
    {
      question: "건대입구역은 하루에 몇 명이 이용하나요?",
      answer: [
        "2호선↔7호선 평일 환승 인원은 108,888명으로 서울교통공사 73개 환승역 가운데 11위입니다(2026년 6월 30일 기준).",
        "2024년에는 하루 평균 101,982명(2호선 74,632명, 7호선 27,350명)이 타고 내렸습니다.",
      ],
      sourceIds: ["seoulmetro-transfer-count", "namu-konkuk"],
    },
    {
      question: "건대입구역 휠체어 환승은 앞으로 바뀌나요?",
      answer: [
        "이 기사에서 확인한 자료에는 정해진 개선 일정이 없습니다.",
        "2022년 연구자는 국토교통부 「도시철도 정거장 및 환승·편의시설 설계지침」에 교통약자 환승 시간 기준(10~15분)을 넣자고 제안했습니다.",
      ],
      sourceIds: ["khan-2022"],
    },
  ],
  sources: [
    {
      id: "khan-2022",
      org: "경향신문",
      title: "「투명장벽의 도시①」(정예원 연구·무의 교통약자 환승지도 인용)",
      date: "2022-10-05",
      url: "https://www.khan.co.kr/article/202210051114011",
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
      id: "wiki-konkuk",
      org: "위키백과",
      title: "건대입구역",
      date: "2026-10 열람",
      url: "https://ko.wikipedia.org/wiki/%EA%B1%B4%EB%8C%80%EC%9E%85%EA%B5%AC%EC%97%AD",
    },
    {
      id: "namu-konkuk",
      org: "나무위키",
      title: "건대입구역(역사 구조·서울교통공사 승하차 인원 표)",
      date: "2026-10 열람",
      url: "https://namu.wiki/w/%EA%B1%B4%EB%8C%80%EC%9E%85%EA%B5%AC%EC%97%AD",
    },
  ],
  datePublished: "2026-10-29T09:00:00+09:00",
  dateModified: "2026-10-30T17:00:00+09:00",
  corrections: [
    {
      date: "2026-10-30",
      before: "7호선 자양 방면 1-1, 2호선 구의 방면 8-3에서 내리면 환승 3분 44초",
      after: "2호선 구의 방면에서 7호선 자양 방면은 8-3(3분 44초), 어린이대공원 방면은 7-3(5분 25초). 2호선 성수 방면은 3-2(3분 49초~5분 35초). 7호선 자양 방면은 1-1(3분 44~49초), 어린이대공원 방면은 8-4(5분 25~35초)",
      reason: "갈아탈 방면 구분과 반대 방면 칸·시간 누락을 서울교통공사 환승정보(2026-09-01 기준)로 정정",
    },
  ],
};
