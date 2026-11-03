import type { MagazineArticle } from "../articles";
import { stationPhotos } from "../station-photos";

export const hongdaeTransfer: MagazineArticle = {
  slug: "hongdae-transfer",
  image: stationPhotos["hongdae-transfer"],
  section: "transfer",
  cover: {
    src: "/images/station/hongdae-transfer-cover.jpg",
    alt: "홍대입구역 릴스 표지에 ‘2호선에서 공항철도까지 8분’이라고 적혀 있다. 방향별 안내는 8분 28초부터 11분 46초까지 다르다.",
    caption: "릴스 표지의 ‘8분’은 산정 방식을 확인하지 못했습니다. 2026년 9월 1일 기준 방향별 참고 시간은 8분 28초~11분 46초입니다. AI 시각화 참고 이미지.",
    width: 1080, height: 1920,
  },
  station: {
    name: "홍대입구역",
    lines: ["2", "arex", "gyeongui-jungang"],
    sign: { line: "2", prev: "합정", next: "신촌", en: "Hongik Univ." },
    sourceIds: ["guide-map", "H2"],
  },
  transfers: [
    { ride: { line: "2", direction: "합정 방면" }, to: { line: "arex", direction: "공덕 방면" }, car: "6-3", toCar: "2-2", time: "11분 46초", sourceId: "H2", formation: { cars: 10, sourceId: "guide-formation" } },
    { ride: { line: "2", direction: "신촌 방면" }, to: { line: "arex", direction: "공덕 방면" }, car: "3-2", toCar: "2-1", time: "8분 28초", sourceId: "H2", formation: { cars: 10, sourceId: "guide-formation" } },
    { ride: { line: "2", direction: "신촌 방면" }, to: { line: "arex", direction: "디지털미디어시티 방면" }, car: "3-2", toCar: "5-3", time: "8분 31초", sourceId: "H2", formation: { cars: 10, sourceId: "guide-formation" } },
    { ride: { line: "2", direction: "합정 방면" }, to: { line: "arex", direction: "디지털미디어시티 방면" }, car: "8-2", toCar: "1-1", time: "10분 57초", sourceId: "H2", formation: { cars: 10, sourceId: "guide-formation" } },
  ],
  question: "홍대입구역의 세 노선은 어떻게 이어질까?",
  answer: "공항철도 홍대입구역 안내도에는 지하 2층의 2호선 방향 환승통로와 경의중앙선 대합실, 지하 1층의 경의중앙선 승강장, 대합실 아래의 공항철도 승강장이 표시돼 있다. 이 도면만으로 현재 환승길의 분기 지점은 알 수 없다. 서울교통공사의 2026년 8월 31일 기준 최단 이동거리는 2호선과 공항철도 사이 355m, 2호선과 경의중앙선 사이 305m다.",
  answerSourceIds: ["H0", "H0-pdf", "H1"],
  reel: {
    url: "https://www.instagram.com/reel/DfMsIvHRqjm/",
    thumbnail: "/images/station/hongdae-transfer-cover.jpg",
    postedAt: "2026-11-01T21:06:00+09:00",
    notice: "릴스 표지의 ‘8분’ 산정 방식은 확인되지 않았습니다. 2026년 9월 1일 기준 방향·출입문별 참고 시간은 8분 28초~11분 46초입니다.",
  },
  body: [
    {
      heading: "안내도가 보여 주는 연결",
      paragraphs: [
        {
          text: "공항철도 홍대입구역 안내도에서 2호선 승강장과 2호선 방향 환승통로는 지하 2층에 놓인다. 같은 층에 경의중앙선 대합실이 표시되고, 경의중앙선 승강장은 그 위인 지하 1층에 있다. 공항철도 승강장은 대합실 아래에 그려져 있다. 2호선 방향의 연결과 다른 두 승강장의 위아래 위치는 이 그림으로 읽을 수 있다. 하지만 비상대피로를 겸한 안내도이므로, 그림의 화살표를 평상시 환승 순서로 옮기거나 두 노선으로 가는 길의 분기 지점을 단정할 수는 없다.",
          sourceIds: ["H0", "H0-pdf"],
        },
      ],
    },
    {
      heading: "355m와 305m가 가리키는 길",
      paragraphs: [
        {
          text: "서울교통공사는 2026년 8월 31일 기준 자료에서 2호선과 공항철도의 노선 간 최단 이동거리를 355m, 2호선과 경의중앙선을 305m로 안내한다. 각각에 붙은 4분 56초와 4분 14초는 거리를 초당 1.2m로 나눈 예상시간이다. 자료에는 최단거리의 구체적인 출발점과 도착점이 적혀 있지 않다. 따라서 355m를 특정 통로의 길이나 모든 승객이 걷는 거리로 읽을 수 없다. 이 자료의 홍대입구역 행에는 공항철도와 경의중앙선 사이의 거리도 없다.",
          sourceIds: ["H1"],
        },
        {
          text: "다른 방식으로 길이를 잰 기록도 있다. 유혁·이장호의 2017년 연구는 공항철도 환승역 7곳의 86개 경로를 조사해 수평 이동과 계단, 에스컬레이터, 무빙워크의 영향을 반영한 ‘평면환산거리’로 비교했다. 연구가 홍대입구역에 제시한 공항철도와 경의중앙선 승강장 직접 연결 엘리베이터와 환승 개찰 방식 변경은 설치하거나 적용할 경우를 가정한 개선안이다. 지금 운영 중이라는 뜻은 아니다. 연구의 평면환산거리와 2026년의 노선 간 최단 이동거리는 정의와 시점이 달라, 두 값을 빼서 환승길의 변화를 계산할 수도 없다.",
          sourceIds: ["H3", "H1"],
        },
      ],
    },
    {
      heading: "하차 위치에 따라 달라지는 안내시간",
      paragraphs: [
        {
          text: "서울교통공사의 별도 자료는 2호선에서 공항철도로 갈 때, 2호선 열차의 방면과 하차 문, 갈아탈 공항철도 열차의 방면과 승차 문에 따라 참고 시간을 달리 안내한다. 아래 네 조건은 2026년 9월 1일 기준 최단 환승 경로의 출입문 위치와 참고 시간이며, 개인의 실제 소요시간은 걸음에 따라 달라진다. 자료 설명에는 열차 대기시간의 포함 여부와 시간 측정의 정확한 시작·끝 지점이 적혀 있지 않다.",
          sourceIds: ["H2"],
        },
        {
          text: "영상 표지에는 ‘2호선에서 공항철도까지 8분’이라고 적혀 있다. 아래 네 조건의 안내는 8분 28초부터 11분 46초까지이며, 표지의 ‘8분’을 어떤 방식으로 산정했는지는 확인되지 않았다. 또 355m 옆의 4분 56초는 일정한 보행 속도로 계산한 예상시간이다. 방향과 출입문별로 제시한 아래 참고 시간과 같은 측정값으로 비교할 수 없다.",
          sourceIds: ["H1", "H2"],
        },
      ],
    },
  ],
  sources: [
    { id: "guide-formation", org: "서울특별시 도시철도과", title: "서울지하철 현황 및 이용안내 — 2호선 순환선 조성칸수", date: "2025-01-31 기준", url: "https://news.seoul.go.kr/traffic/archives/1551?listPage=1" },
    { id: "guide-map", org: "서울교통공사", title: "수도권 지하철 노선도 — 역명·영문명·환승노선", date: "2025-09-29 자료", url: "https://data.seoul.go.kr/dataList/OA-22535/F/1/datasetView.do" },

    { id: "H0", org: "공항철도", title: "홍대입구역 정보·역이용안내도 및 비상대피로", date: "2026-11-03 확인 · 도면 게시·개정일 미표시", url: "https://www.airportrailroad.com/train/normal/info/030" },
    { id: "H0-pdf", org: "공항철도", title: "홍대입구역 비상대피로 PDF", date: "2026-11-03 확인 · 도면 게시·개정일 미표시", url: "https://www.airportrailroad.com/static/file/emergency_hongdae.pdf" },
    { id: "H1", org: "서울교통공사", title: "환승역거리 소요시간 정보", date: "2026-08-31 기준", url: "https://www.data.go.kr/data/15044419/fileData.do" },
    { id: "H2", org: "서울교통공사", title: "서울 도시철도 환승정보", date: "2026-09-01 기준", url: "https://www.data.go.kr/data/15098252/fileData.do" },
    { id: "H3", org: "유혁·이장호", title: "도시철도 환승편의성 개선방안 연구 — 공항철도 사례를 중심으로", date: "2017년 한국철도학회 추계학술대회", url: "https://railway.or.kr/Papers_Conference/201711/pdf/KSR2017A029.pdf" },
  ],
  related: [
    { title: "성수역 2호선은 왜 두 갈래로 나뉠까?", href: "/article/seongsu-branch/" },
    { title: "고속터미널역의 15cm와 314m는 무엇을 잰 숫자일까?", href: "/article/express-terminal/" },
  ],
  datePublished: "2026-11-01T00:00:00+09:00",
  dateModified: "2026-11-03T11:03:31+09:00",
  corrections: [
    {
      date: "2026-11-03",
      before: "릴스 표지의 ‘2호선에서 공항철도까지 8분’",
      after: "2호선에서 공항철도로 가는 방향·출입문별 참고 시간 8분 28초~11분 46초",
      reason: "표지의 8분 산정 방식은 확인되지 않았다. 서울교통공사의 2026년 9월 1일 자료에는 네 조건의 참고 시간이 각각 제시된다.",
    },
  ],
};
