import type { MagazineArticle } from "../articles";
import { stationPhotos } from "../station-photos";

export const seongsuBranch: MagazineArticle = {
  slug: "seongsu-branch",
  image: stationPhotos["seongsu-branch"],
  section: "transfer",
  series: {
    title: "역을 파헤치다",
    description: "역의 연결 구조와 그 배경을 풀어, 같은 길을 다르게 움직이게 되는 이유를 설명합니다.",
  },
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
  answer: "성수역 2호선은 1980년 먼저 열린 신설동 방면 구간이 1983년 을지로입구 방면 연결 뒤 지선으로 분리되면서, 지금의 순환 구간과 신설동 방면 지선이 갈라지는 구조가 됐다.",
  answerSourceIds: ["SE1", "SE2"],
  body: [
    {
      heading: "지금, 두 갈래",
      figure: {
        kind: "seongsu-current",
        title: "그림 1 · 성수에서 순환 구간과 신설동 방면 지선이 만나는 관계를 살펴보세요.",
        caption: "성수역의 현재 두 갈래. 2025년 12월 노선도에 따른 비축척 관계도이며 실제 선로·승강장·지리 배치가 아닙니다. 순환 구간의 다른 역과 신정지선은 생략했습니다.",
        descriptions: ["순환 구간: 성수역을 지나는 2호선의 고리", "성수지선: 성수 → 용답 → 신답 → 용두 → 신설동"],
        sourceIds: ["guide-map", "guide-formation", "SE2"],
      },
      paragraphs: [
        {
          text: "성수역에서는 같은 2호선이라도 가는 길을 구분해야 한다. 성수를 지나는 고리 모양의 순환 구간과 신설동으로 이어지는 성수지선이 만나기 때문이다. 지선은 본선에서 갈라져 나가는 구간을 뜻한다. 서울시의 2025년 1월 31일 기준 운영 현황도 2호선의 순환 구간과 신설동~성수 지선을 나누어 적고 있다.",
          sourceIds: ["guide-map", "guide-formation"],
        },
        {
          text: "성수지선을 성수역에서부터 따라가면 용답, 신답, 용두를 지나 신설동에 닿는다. 성수를 포함한 다섯 역이 이어지는 길이다. 순환 구간은 성수에서 뚝섬 쪽과 건대입구 쪽으로 이어지고, 신설동 방면은 이 고리에서 갈라진다. 서울교통공사의 2025년 12월 노선도와 서울시의 2026년 9월 해설에서 확인되는 연결 관계다.",
          sourceIds: ["guide-map", "SE2"],
        },
      ],
    },
    {
      heading: "고리가 되기 전의 길",
      figure: {
        kind: "seongsu-history",
        title: "그림 2 · 신설동 방면 구간이 순환 완성보다 먼저 열렸다는 순서를 살펴보세요.",
        caption: "시기별 연결 변화. 해당 시기의 연결을 설명하는 역만 표시했습니다. 중간역·실제 지리·선로 배치와 다른 지선은 생략한 비축척 관계도입니다.",
        descriptions: [
          "1980년: 신설동~종합운동장 구간이 성수를 거쳐 먼저 열렸다. 아직 순환이 완성되지 않았다.",
          "1983년: 성수~을지로입구 구간이 연결되고 신설동 방면은 지선이 됐다. 점선은 종합운동장 이후 이미 개통된 구간의 생략 표시다.",
          "1984년: 2호선 순환이 완성됐다. 신설동 방면은 순환 구간에서 갈라지는 지선으로 남았다.",
        ],
        sourceIds: ["SE1", "SE2"],
      },
      scope: {
        known: "신설동 방면 구간이 먼저 열렸고, 성수에서 을지로입구 쪽으로 길이 이어진 뒤 순환 구간 밖 지선으로 남았다는 연결의 변화.",
        unknown: "왜 이 연결 방식을 택했는지, 당시 계획자가 무엇을 우선했는지까지 개통 연혁만으로 알 수는 없습니다.",
      },
      paragraphs: [
        {
          text: "2호선이 처음부터 큰 고리였던 것은 아니다. 1980년 신설동~종합운동장 구간이 성수역을 거쳐 먼저 열렸다. 그때 신설동 방면은 2호선의 한쪽 끝이었고, 지금의 순환선은 아직 완성되지 않았다.",
          sourceIds: ["SE1", "SE2"],
        },
        {
          text: "1983년 을지로입구~성수 구간이 열리면서 신설동 방면은 성수역에서 갈라지는 지선이 됐다. 이듬해인 1984년 을지로입구~서울대입구 구간까지 연결되며 2호선의 고리가 완성됐다. 지금의 신설동 방면 지선은 순환선이 완성된 뒤 새로 덧붙인 구간이 아니라, 순환 완성 전부터 운행하던 길이다.",
          sourceIds: ["SE1", "SE2"],
        },
      ],
    },
    {
      heading: "지금 확인할 행선지",
      paragraphs: [
        {
          text: "서울교통공사의 2026년 9월 1일 기준 열차운행시각표에서 성수지선의 열차는 성수와 신설동 사이를 오가는 것으로 기재돼 있다. 신설동 방면으로 가려면 2호선이라는 번호에 더해 행선지를 확인해야 한다. 노선도에서 지선의 경로를 확인하고, 탈 열차가 신설동 방면인지 역의 안내를 살핀다.",
          sourceIds: ["SE3", "guide-map"],
        },
        {
          text: "성수역의 두 갈래는 먼저 열린 신설동 방면 구간과 나중에 이어진 순환 구간이 만나는 자리다. 그 연결 변화를 알고 나면, 같은 2호선을 탈 때도 행선지를 따로 읽어야 하는 이유가 분명해진다.",
          sourceIds: ["SE1", "SE2", "guide-map"],
        },
      ],
    },
  ],
  sources: [
    { id: "guide-formation", org: "서울특별시 도시철도과", title: "서울지하철 현황 및 이용안내 — 2호선 순환·지선 구간과 조성칸수", date: "2025-01-31 기준", url: "https://news.seoul.go.kr/traffic/archives/1551?listPage=1" },
    { id: "guide-map", org: "서울교통공사", title: "수도권 지하철 노선도 4종(국영중일) — 역명·연결 관계", date: "2025-12-08 등록 · 국문 2025년 12월판", url: "https://www.data.go.kr/data/15120713/fileData.do" },
    { id: "guide-transfer", org: "서울교통공사", title: "서울 도시철도 환승정보", date: "2026-09-01 기준", url: "https://www.data.go.kr/data/15098252/fileData.do" },
    { id: "SE1", org: "서울역사박물관", title: "지하철 2호선 개통", date: "1983-12-17 기록 · 2018년 재수록", url: "https://museum.seoul.go.kr/archive/archiveNew/NR_archiveView.do?ctgryId=CTGRY766&fileId=H-TRNS-96101-768&fileSn=300&type=B&upperNodeId=CTGRY768" },
    { id: "SE2", org: "서울특별시", title: "충정로는 왜 충정로일까? 2호선 역명 따라 서울 역사 산책", date: "2026-09-23", url: "https://mediahub.seoul.go.kr/archives/2019486" },
    { id: "SE3", org: "서울교통공사", title: "서울 도시철도 열차운행시각표 — 성수지선 출발역·도착역", date: "2026-09-01 기준", url: "https://www.data.go.kr/data/15098251/fileData.do" },
  ],
  related: [
    { title: "건대입구역, 엘리베이터가 있어도 환승은 왜 따로 살펴야 할까?", href: "/station/konkuk-univ/" },
    { title: "잠실역, 2호선에서 8호선까지 왜 이렇게 멀까?", href: "/station/jamsil/" },
  ],
  datePublished: "2026-11-01T00:00:00+09:00",
  dateModified: "2026-11-02T22:24:34+09:00",
};
