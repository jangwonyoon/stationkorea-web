import type { MagazineArticle } from "../articles";

export const seongsuBranch: MagazineArticle = {
  slug: "seongsu-branch",
  section: "transfer",
  station: {
    name: "성수역",
    lines: ["2"],
    sign: { line: "2", prev: "뚝섬", next: "건대입구", en: "Seongsu" },
    sourceIds: ["guide-map", "guide-transfer"],
  },
  transfers: [
    { ride: { line: "2", direction: "건대입구 방면" }, to: { line: "2", direction: "용답 방면 · 성수지선" }, car: "10-4", toCar: "1-1", time: "3분 32초", sourceId: "guide-transfer", formation: { cars: 10, sourceId: "guide-formation" } },
    { ride: { line: "2", direction: "뚝섬 방면" }, to: { line: "2", direction: "용답 방면 · 성수지선" }, car: "모든 칸", toCar: "모든 칸", time: "5초", sourceId: "guide-transfer" },
  ],
  question: "성수역 2호선은 왜 두 갈래로 나뉠까?",
  answer: "성수역은 1980년 열린 신설동 방면 구간과 1983년 열린 을지로입구 방면 구간이 갈라지는 곳이다. 지금은 같은 2호선 표시 아래 순환선 열차와 성수지선 열차가 서로 다른 길로 간다.",
  answerSourceIds: ["SE1", "SE2"],
  body: [
    {
      heading: "지선이 먼저 열린 길이었다",
      paragraphs: [
        {
          text: "2호선이 처음부터 큰 고리였던 것은 아니다. 1980년 신설동~종합운동장 구간이 성수역을 거쳐 먼저 열렸다. 그때 신설동 방면은 2호선의 한쪽 끝이었고, 지금의 순환선은 아직 완성되지 않았다.",
          sourceIds: ["SE1", "SE2"],
        },
        {
          text: "1983년 을지로입구~성수 구간이 열리면서 신설동 방면은 성수역에서 갈라지는 지선이 됐다. 지선은 한 노선에서 가지처럼 뻗는 구간을 뜻한다. 2호선의 고리는 이듬해인 1984년에 완성됐다. 성수지선이라는 이름만 보면 나중에 덧붙은 길 같지만, 실제로는 더 먼저 운행한 구간이다.",
          sourceIds: ["SE1", "SE2"],
        },
      ],
    },
    {
      heading: "같은 2호선, 다른 행선지",
      paragraphs: [
        {
          text: "현재 성수역에서는 순환선 열차와 성수지선 열차가 모두 2호선 표시를 쓴다. 성수지선 열차는 성수에서 용답·신답·용두를 거쳐 신설동으로 향한다. 순환선 열차에 계속 앉아 있으면 신설동에 닿지 않는다.",
          sourceIds: ["SE2"],
        },
        {
          text: "성수역을 지날 때 필요한 구분은 호선 번호보다 행선지다. 신설동으로 가려면 열차와 승강장에 적힌 행선지를 확인해야 한다. 같은 2호선이라는 표시가 서로 다른 경로를 가리키는 이유가 성수역의 개통 순서에 남아 있다.",
          sourceIds: ["SE2"],
        },
      ],
    },
  ],
  sources: [
    { id: "guide-formation", org: "서울특별시 도시철도과", title: "서울지하철 현황 및 이용안내 — 2호선 순환선 조성칸수", date: "2025-01-31 기준", url: "https://news.seoul.go.kr/traffic/archives/1551?listPage=1" },
    { id: "guide-map", org: "서울교통공사", title: "수도권 지하철 노선도 — 역명·영문명·환승노선", date: "2025-09-29 자료", url: "https://data.seoul.go.kr/dataList/OA-22535/F/1/datasetView.do" },
    { id: "guide-transfer", org: "서울교통공사", title: "서울 도시철도 환승정보", date: "2026-09-01 기준", url: "https://www.data.go.kr/data/15098252/fileData.do" },
    { id: "SE1", org: "서울역사박물관", title: "지하철 2호선 개통", date: "1983-12-17 기록 · 2018년 재수록", url: "https://museum.seoul.go.kr/archive/archiveNew/NR_archiveView.do?ctgryId=CTGRY766&fileId=H-TRNS-96101-768&fileSn=300&type=B&upperNodeId=CTGRY768" },
    { id: "SE2", org: "서울특별시", title: "충정로는 왜 충정로일까? 2호선 역명 따라 서울 역사 산책", date: "2026-09-23", url: "https://mediahub.seoul.go.kr/archives/2019486" },
  ],
  related: [
    { title: "건대입구역 1,404m는 어떻게 계산됐을까?", href: "/station/konkuk-univ/" },
    { title: "잠실역, 2호선에서 8호선까지 왜 이렇게 멀까?", href: "/station/jamsil/" },
  ],
  datePublished: "2026-11-01T00:00:00+09:00",
  dateModified: "2026-11-01T16:15:25+09:00",
};
