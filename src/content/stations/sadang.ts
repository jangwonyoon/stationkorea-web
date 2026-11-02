import type { Station } from "../types";

// 원천: reel-studio episodes/maeil-geugil/sadang-transfer (facts.md·caption.txt·pin.txt·episode.json)
export const sadang: Station = {
  slug: "sadang",
  no: 2,
  name: "사당역",
  lines: ["2", "4"],
  section: "transfer",
  cover: {
    src: "/images/station/sadang-cover.jpg",
    alt: "사당역 릴스 표지. 환승 74m인데 왜 3분 넘게?",
    caption: "사당역 2·4호선 환승을 다룬 릴스 표지. AI 시각화 참고 이미지.",
    width: 1080, height: 1920,
  },
  sign: { line: "2", prev: "방배", next: "낙성대", en: "Sadang" },
  question: "사당역, 환승 74m인데 왜 3분 넘게 걸릴까?",
  seoTitle: "사당역 2호선↔4호선 환승 74m인데 3분 22초, 왜 돌아가게 할까",
  answer:
    "사당역 2호선과 4호선의 최단 환승거리는 74m(서울교통공사, 2026-08-31 기준)지만, 좁은 계단에 출퇴근 환승객이 엉키지 않도록 방배 방면 통로에 펜스를 쳐 돌아가게 하고 간이 통로는 출근 시간에 셔터를 내리기 때문에, 공사 안내 기준 환승 시간은 방배 방면 3분 22초입니다.",
  teaser: "환승 74m인데 왜 3분 넘게 걸릴까?",
  crossSection: {
    src: "/images/station/sadang-section.jpg",
    alt: "사당역 단면 그림. 위층 2호선 승강장과 아래층 4호선 승강장 사이를 잇는 계단에 74m, 3:22 표시가 붙어 있다.",
    caption: "지하 2층 2호선(초록) 상대식 승강장과 지하 3층 4호선(하늘색) 섬식 승강장을 잇는 계단.",
  },
  ogImage: "/images/station/sadang-og.jpg",
  stats: [
    {
      value: "74m",
      label: "2호선↔4호선 최단 환승거리(보행 1분 2초)",
      asOf: "2026-08-31 기준",
      sourceIds: ["seoulmetro-distance"],
    },
    {
      value: "3분 22초",
      label: "공사 안내 환승 시간, 2호선 방배 방면↔4호선(낙성대 방면은 1분 51초)",
      asOf: "2026-09-01 기준",
      sourceIds: ["seoulmetro-transfer-info"],
    },
    {
      value: "160,478명",
      label: "평일 환승 인원, 서울교통공사 73개 환승역 중 6위",
      asOf: "2026-06-30 기준",
      sourceIds: ["seoulmetro-transfer-count"],
    },
  ],
  pin: {
    text: "표의 소요 시간은 가장 가까운 칸에서 내려 막힘 없이 걸을 때 기준입니다. 혼잡 시간대에는 더 걸릴 수 있습니다. 반대쪽 끝 칸에서 내리면 최대 2분 47초를 더 걷습니다.",
    sourceIds: ["seoulmetro-transfer-info"],
  },
  transfers: [
    { ride: { line: "4", direction: "총신대입구 방면" }, to: { line: "2", direction: "방배 방면" }, car: "10-4", time: "3분 24초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "4", direction: "남태령 방면" }, to: { line: "2", direction: "방배 방면" }, car: "1-1", time: "3분 22초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "4", direction: "총신대입구 방면" }, to: { line: "2", direction: "낙성대 방면" }, car: "4-2", time: "1분 55초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "4", direction: "남태령 방면" }, to: { line: "2", direction: "낙성대 방면" }, car: "7-3", time: "1분 51초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "2", direction: "방배 방면" }, to: { line: "4", direction: "총신대입구·남태령 방면" }, car: "6-3", time: "3분 22~24초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "2", direction: "낙성대 방면" }, to: { line: "4", direction: "총신대입구·남태령 방면" }, car: "5-3", time: "1분 51~55초", sourceId: "seoulmetro-transfer-info" },
  ],
  comparison: {
    title: "사당역 2호선과 4호선 비교",
    columns: ["2호선", "4호선"],
    rows: [
      { label: "사당역 개통", values: ["1983년 12월 17일", "1985년 10월 18일"], sourceIds: ["wiki-sadang"], note: "개통일은 위키백과 기준입니다." },
      { label: "승강장 형태", values: ["상대식", "섬식"], sourceIds: ["wiki-sadang", "redaily-2021-11"], note: "승강장 형태는 위키백과·철도경제신문 기준입니다." },
      {
        label: "승강장 층",
        values: ["지하 2층", "지하 3층"],
        sourceIds: ["namu-sadang"],
        note: "층수는 나무위키 단독 자료입니다.",
      },
    ],
  },
  reel: {
    url: "https://www.instagram.com/reel/De_BAeuiU93/",
    thumbnail: "/images/station/sadang-reel.jpg",
    postedAt: "2026-10-27T13:38:00+09:00",
  },
  qna: [
    {
      question: "사당역은 왜 눈앞의 계단을 막아 놓고 돌아가게 하나요?",
      answer: [
        "2호선 사당역은 1983년 12월 17일에 문을 열었고, 4호선은 1985년 10월 18일 사당까지 연장되며 종착역으로 들어와 환승역이 됐습니다. 1994년 과천선이 이어지며 4호선 사당역은 중간역이 됐습니다.",
        "2호선은 지하 2층 상대식 승강장, 4호선은 지하 3층 섬식 승강장입니다. 2호선은 선로를 건널 수 없어 반대편으로 가려면 4호선 승강장을 지나야 하고, 환승통로는 대합실을 거치지 않고 승강장끼리 바로 이어집니다. 방배 방면 통로는 하나뿐이고 올라가는 에스컬레이터만 있습니다.",
        "짧은 길은 폭이 좁아 출퇴근 때 환승객이 계단에서 엉킬 위험이 큽니다. 그래서 2호선 방배 방면 환승통로에는 긴 안전펜스를 쳐 한 바퀴 돌아 계단을 쓰게 했고, 4호선 승강장 가운데에서 2호선 낙성대 방면으로 바로 이어지는 좁은 간이 통로는 출퇴근 시간(아침은 9시까지)에 셔터를 내립니다. 돌아가는 길이 설계입니다.",
      ],
      sourceIds: ["redaily-2021-11", "wiki-sadang"],
    },
    {
      question: "사당역은 얼마나 붐비나요?",
      answer: [
        "평일 환승 인원은 160,478명으로 서울교통공사 73개 환승역 가운데 6위입니다(2026년 6월 30일 기준).",
        "2026년 10월 11~22일 12일간 하루 평균 138,019명(2호선 88,547명, 4호선 49,472명)이 교통카드로 타고 내렸습니다.",
        "2026년 2분기 1~8호선 혼잡도는 2호선 사당→방배 구간이 144.6%로 가장 높았습니다.",
      ],
      sourceIds: ["seoulmetro-transfer-count", "seoul-open-ridership", "molit-congestion-2026"],
    },
    {
      question: "사당역은 앞으로 무엇이 바뀌나요?",
      answer: [
        "방배동 사당주차장 부지의 사당 복합환승센터는 2009년에 시작했으나 개발사 부도로 10년 가까이 멈췄고, 2018년 공공 주도로 바뀌었습니다.",
        "2025년 7월 서울교통공사가 기본구상 용역에 들어갔으며, 지하 8층~지상 59층, 연면적 26만㎡ 규모로 2034년 완공을 목표로 합니다.",
      ],
      sourceIds: ["hankyung-2025-07"],
    },
  ],
  sources: [
    {
      id: "seoulmetro-distance",
      org: "서울교통공사",
      title: "환승역 거리·소요시간 정보",
      date: "2026-08-31 기준",
      url: "https://www.data.go.kr/data/15044419/fileData.do",
    },
    {
      id: "seoulmetro-transfer-info",
      org: "서울교통공사",
      title: "서울 도시철도 환승정보(환승 경로 안내)",
      date: "2026-09-01 기준",
      url: "https://www.data.go.kr/data/15098252/fileData.do",
    },
    {
      id: "seoulmetro-transfer-count",
      org: "서울교통공사",
      title: "환승역 환승인원 정보",
      date: "2026-06-30 기준",
      url: "https://www.data.go.kr/data/15062858/fileData.do",
    },
    {
      id: "seoul-open-ridership",
      org: "서울 열린데이터광장",
      title: "서울시 지하철 호선별 역별 승하차 인원 정보",
      date: "2026-10-11~22 집계",
      url: "https://data.seoul.go.kr/dataList/OA-12914/S/1/datasetView.do",
    },
    {
      id: "molit-congestion-2026",
      org: "국회 국토교통위원회(신성범 의원실) 국정감사 자료",
      title: "수도권 도시철도 혼잡도 2026년 2분기(철도경제신문 보도)",
      date: "2026-10",
      url: "https://www.redaily.co.kr/news/articleView.html?idxno=15877",
    },
    {
      id: "redaily-2021-11",
      org: "철도경제신문",
      title: "박준한 칼럼 「특정 시간대에만 개방하는 숨겨진 환승통로를 가진 사당역」",
      date: "2021-11-03",
      url: "https://www.redaily.co.kr/news/articleView.html?idxno=2427",
    },
    {
      id: "wiki-sadang",
      org: "위키백과",
      title: "사당역",
      date: "2026-10 열람",
      url: "https://ko.wikipedia.org/wiki/%EC%82%AC%EB%8B%B9%EC%97%AD",
    },
    {
      id: "hankyung-2025-07",
      org: "한국경제",
      title: "사당 복합환승센터 기본구상 보도",
      date: "2025-07-17",
      url: "https://www.hankyung.com/article/2025071752221",
    },
    {
      id: "namu-sadang",
      org: "나무위키",
      title: "사당역(기존 기사 층수 인용, 원문 미확인)",
      date: "2026-10-30 기존 기사 인용 기준",
      url: "https://namu.wiki/w/%EC%82%AC%EB%8B%B9%EC%97%AD",
    },
  ],
  datePublished: "2026-10-29T09:00:00+09:00",
  dateModified: "2026-11-01T14:03:09+09:00",
  corrections: [
    {
      date: "2026-10-30",
      before: "2호선 낙성대 방면은 4-2, 7-3",
      after: "2호선 낙성대 방면으로는 총신대입구 방면 열차 4-2, 남태령 방면 열차 7-3",
      reason: "4호선 열차 방면 구분 누락, 서울교통공사 환승정보 원자료로 확인",
    },
  ],
};
