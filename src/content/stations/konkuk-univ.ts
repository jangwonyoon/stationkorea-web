import type { Station } from "../types";

// 원천: reel-studio episodes/maeil-geugil/konkuk-transfer (facts.md·caption.txt·pin.txt·episode.json)
export const konkukUniv: Station = {
  slug: "konkuk-univ",
  no: 3,
  name: "건대입구역",
  lines: ["2", "7"],
  section: "transfer",
  sign: { line: "2", prev: "성수", next: "구의", en: "Konkuk Univ." },
  question: "건대입구역 1,404m는 어떻게 계산됐을까?",
  seoTitle: "건대입구역 2·7호선 교통약자 환승거리 1,404m의 계산법",
  answer:
    "2022년 건대입구역 2·7호선 환승 연구 보도에서 교통약자 거리 1,404m는 실제 경로를 직접 잰 길이가 아니라 환승시간에 장애인 보행속도로 가정한 0.78m/s를 곱한 환산값입니다.",
  teaser: "1,404m는 실제 이동한 길이일까?",
  crossSection: {
    src: "/images/station/konkuk-univ-section.jpg",
    alt: "2022년 연구 보도의 건대입구역 일반 환승거리 77m와 교통약자 환승시간에 가정한 보행속도 0.78m/s를 곱한 환산 지표 1,404m를 구분한 설명 그림.",
    caption: "건대입구역 2·7호선 환승 연구 보도의 두 수치. 1,404m는 시간에서 환산한 지표이며 현재 실제 이동 경로의 길이가 아닙니다(2022년 기준).",
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
      label: "교통약자 환승시간에 가정한 보행속도 0.78m/s를 곱한 환산 지표. 실제 보행 경로 길이는 미확인",
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
    text: "반대쪽 끝 칸에서 내리면 최대 2분 47초를 더 걷습니다.",
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
    notice: "영상의 1,400m 표시는 실제 이동 경로를 잰 값이 아닙니다.",
  },
  qna: [
    {
      question: "건대입구역 1,404m는 실제 휠체어 이동거리인가요?",
      answer: [
        "2022년 연구를 소개한 경향신문 보도는 건대입구역 2·7호선의 일반 환승거리 77m와 교통약자 환승거리 1,404m를 제시했습니다. 보도에 따르면 1,404m는 환승지도에 적힌 시간에 장애인 보행속도로 가정한 0.78m/s를 곱한 평면환산 값입니다.",
        "따라서 1,404m를 건대입구역에서 직접 잰 휠체어 이동 경로의 길이로 읽을 수 없습니다. 77m와의 약 18배 차이도 실제 이동 경로가 물리적으로 18배 길다는 뜻으로 단정할 수 없습니다.",
        "같은 보도에서 연구자는 당시 7호선 지하 승강장에서 바깥 도로와 횡단보도를 거쳐 2호선 지상 승강장으로 가는 동선을 설명했습니다. 이 동선과 1,404m 계산의 상세 대응은 원 경로도로 확인하지 못했습니다. 현재 이용 가능한 환승 경로와 실제 길이도 이 기사에서 확인하지 않았습니다.",
      ],
      sourceIds: ["khan-2022"],
    },
    {
      question: "건대입구역 2·7호선 평일 환승 인원은 몇 명인가요?",
      answer: [
        "2호선↔7호선 평일 환승 인원은 108,888명으로 서울교통공사 73개 환승역 가운데 11위입니다(2026년 6월 30일 기준).",
      ],
      sourceIds: ["seoulmetro-transfer-count"],
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
  ],
  datePublished: "2026-10-29T09:00:00+09:00",
  dateModified: "2026-11-01T15:15:00+09:00",
  corrections: [
    {
      date: "2026-11-01",
      before: "휠체어 환승의 실제 이동 경로가 1,404m이며 일반 경로보다 물리적으로 18배 길다",
      after: "2022년 연구 보도의 1,404m는 환승시간에 가정한 보행속도 0.78m/s를 곱한 환산 지표. 실제 이동 경로 길이와 현재 경로는 확인하지 못함",
      reason: "보도에 명시된 산정법을 반영하고 실제 보행거리처럼 읽히는 제목·본문·그림을 정정",
    },
    {
      date: "2026-10-30",
      before: "7호선 자양 방면 1-1, 2호선 구의 방면 8-3에서 내리면 환승 3분 44초",
      after: "2호선 구의 방면에서 7호선 자양 방면은 8-3(3분 44초), 어린이대공원 방면은 7-3(5분 25초). 2호선 성수 방면은 3-2(3분 49초~5분 35초). 7호선 자양 방면은 1-1(3분 44~49초), 어린이대공원 방면은 8-4(5분 25~35초)",
      reason: "갈아탈 방면 구분과 반대 방면 칸·시간 누락을 서울교통공사 환승정보(2026-09-01 기준)로 정정",
    },
  ],
};
