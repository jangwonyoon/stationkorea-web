import type { MagazineArticle } from "../articles";

export const hongdaeTransfer: MagazineArticle = {
  slug: "hongdae-transfer",
  section: "transfer",
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
  question: "홍대입구역 환승 355m, 어느 노선 사이를 잰 걸까?",
  answer: "서울교통공사가 2026년 8월 31일 기준으로 제시한 355m는 2호선과 공항철도 사이의 최단 환승거리다. 같은 자료에서 2호선과 경의중앙선 사이는 305m이므로 역 전체의 거리로 읽을 수 없다.",
  answerSourceIds: ["H1"],
  body: [
    {
      heading: "세 노선이 만나면 ‘환승거리’도 하나가 아니다",
      paragraphs: [
        {
          text: "홍대입구역에서는 2호선·공항철도·경의중앙선 사이를 갈아탈 수 있다. 세 노선이 만나면 2호선↔공항철도, 2호선↔경의중앙선, 공항철도↔경의중앙선처럼 출발점과 도착점의 조합도 여럿이다. 환승거리는 역 이름에 붙은 하나의 길이가 아니라 그중 한 노선 쌍의 경로에 붙은 값이다. ‘홍대입구에서는 누구나 355m를 걷는다’고 말할 수 없는 이유다.",
          sourceIds: ["H1", "H3"],
        },
        {
          text: "같은 노선 쌍을 골라도 출발 열차의 방면과 하차 위치에 따라 안내가 세분된다. 공사는 2호선에서 공항철도로 가는 네 조건의 참고 시간을 따로 제시한다(2026년 9월 1일 기준). 그래서 노선 쌍의 최단거리 355m를 모든 승객의 보행거리나 도착 시간으로 바꿔 말할 수 없다.",
          sourceIds: ["H1", "H2"],
        },
      ],
    },
    {
      heading: "길이를 읽는 방식도 여럿이다",
      paragraphs: [
        {
          text: "환승을 한 숫자로 줄이기 어렵다는 점은 과거 연구에서도 드러난다. 2017년 연구진은 공항철도 환승역 7곳의 86개 경로를 조사하고, 수평 길이에 계단·에스컬레이터·무빙워크의 영향을 반영한 ‘평면환산거리’로 경로를 비교했다. 홍대입구역의 공항철도↔2호선과 공항철도↔경의중앙선도 각각 분석했다. 2017년 연구의 평균 평면환산거리와 2026년 공사가 제시한 최단 이동거리는 정의와 조사 시점이 다르므로, 같은 ‘미터’라고 빼서 변화를 계산할 수 없다.",
          sourceIds: ["H3", "H1"],
        },
        {
          text: "공사가 355m 옆에 적은 4분 56초는 그 거리를 초당 1.2m로 나눈 계산상 예상시간이다. 실제로 걸어 잰 시간이 아니며, 별도 환승 안내의 경로별 참고 시간과도 정의가 다르다. 홍대입구역에서 길을 찾을 때는 ‘환승거리’라는 숫자보다 먼저 갈아탈 노선과 방면을 확인해야 한다.",
          sourceIds: ["H1", "H2"],
        },
      ],
    },
  ],
  sources: [
    { id: "guide-formation", org: "서울특별시 도시철도과", title: "서울지하철 현황 및 이용안내 — 2호선 순환선 조성칸수", date: "2025-01-31 기준", url: "https://news.seoul.go.kr/traffic/archives/1551?listPage=1" },
    { id: "guide-map", org: "서울교통공사", title: "수도권 지하철 노선도 — 역명·영문명·환승노선", date: "2025-09-29 자료", url: "https://data.seoul.go.kr/dataList/OA-22535/F/1/datasetView.do" },

    { id: "H1", org: "서울교통공사", title: "환승역거리 소요시간 정보", date: "2026-08-31 기준", url: "https://www.data.go.kr/data/15044419/fileData.do" },
    { id: "H2", org: "서울교통공사", title: "서울 도시철도 환승정보", date: "2026-09-01 기준", url: "https://www.data.go.kr/data/15098252/fileData.do" },
    { id: "H3", org: "유혁·이장호", title: "도시철도 환승편의성 개선방안 연구 — 공항철도 사례를 중심으로", date: "2017년 한국철도학회 추계학술대회", url: "https://railway.or.kr/Papers_Conference/201711/pdf/KSR2017A029.pdf" },
  ],
  related: [
    { title: "성수역 2호선은 왜 두 갈래로 나뉠까?", href: "/article/seongsu-branch/" },
    { title: "고속터미널역의 15cm와 314m는 무엇을 잰 숫자일까?", href: "/article/express-terminal/" },
  ],
  datePublished: "2026-11-01T00:00:00+09:00",
  dateModified: "2026-11-01T16:15:25+09:00",
};
