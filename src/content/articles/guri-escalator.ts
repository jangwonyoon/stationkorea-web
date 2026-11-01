import type { MagazineArticle } from "../articles";

export const guriEscalator: MagazineArticle = {
  slug: "guri-escalator",
  section: "transfer",
  station: {
    name: "구리역",
    lines: ["8", "gyeongui-jungang"],
    sign: { line: "8", prev: "동구릉", next: "장자호수공원", en: "Guri" },
    sourceIds: ["guide-map", "guide-transfer"],
  },
  transfers: [
    { ride: { line: "8", direction: "동구릉 방면" }, to: { line: "gyeongui-jungang", direction: "양원 방면" }, car: "6-1", toCar: "6-1", time: "43초", sourceId: "guide-transfer", formation: { cars: 6, sourceId: "guide-formation" } },
    { ride: { line: "8", direction: "동구릉 방면" }, to: { line: "gyeongui-jungang", direction: "도농 방면" }, car: "6-1", toCar: "1-1", time: "43초", sourceId: "guide-transfer", formation: { cars: 6, sourceId: "guide-formation" } },
    { ride: { line: "8", direction: "장자호수공원 방면" }, to: { line: "gyeongui-jungang", direction: "양원 방면" }, car: "6-1", toCar: "6-1", time: "43초", sourceId: "guide-transfer", formation: { cars: 6, sourceId: "guide-formation" } },
    { ride: { line: "8", direction: "장자호수공원 방면" }, to: { line: "gyeongui-jungang", direction: "도농 방면" }, car: "6-1", toCar: "6-1", time: "43초", sourceId: "guide-transfer", formation: { cars: 6, sourceId: "guide-formation" } },
  ],
  question: "구리역에서 경의중앙선과 8호선은 어떻게 이어질까?",
  answer: "구리역에서는 고가의 경의중앙선과 지하의 8호선을 갈아타며, 경기도가 2026년 8월 확인한 환승통로 에스컬레이터는 길이 65m, 수직 높이 30m다.",
  answerSourceIds: ["G1", "G2", "G3"],
  body: [
    {
      heading: "같은 이름 아래 다른 높이",
      paragraphs: [
        {
          text: "구리시는 2020년 역사 계획에서 경의중앙선 고가역과 새 지하역사를 연결하는 구조를 설명했다. 2024년 8월 10일 별내선이 문을 열면서 구리역은 경의중앙선과 8호선의 환승역이 됐다. 같은 이름의 역이지만 두 노선의 승강장은 서로 다른 높이에 놓여 있다.",
          sourceIds: ["G1", "G2"],
        },
        {
          text: "고가에서 지하로 내려가는 환승에서는 평면상의 거리만으로 이동을 설명하기 어렵다. 층을 바꾸는 구간이 있고, 그 구간에 긴 에스컬레이터가 놓였다. 경기도의 2026년 현장점검 자료에 적힌 65m는 이 설비의 길이, 30m는 설비가 잇는 수직 높이다. 두 값 모두 열차에서 열차까지의 전체 보행거리를 뜻하지 않는다.",
          sourceIds: ["G3"],
        },
      ],
    },
    {
      heading: "65m를 환승 시간으로 바꿀 수는 없다",
      paragraphs: [
        {
          text: "에스컬레이터에 닿기 전과 내린 뒤에도 이동이 이어진다. 대기와 걷는 속도도 사람마다 다르다. 따라서 65m만으로 몇 분에 갈아탈 수 있는지, 어느 칸에서 내리는 것이 빠른지 계산할 수 없다. 구리역의 숫자는 환승통로에서 높이를 바꾸는 설비의 규모를 알려 준다. 실제 하차 위치와 승강기 경로는 역의 최신 안내를 확인해야 한다.",
          sourceIds: ["G3"],
        },
      ],
    },
  ],
  sources: [
    { id: "guide-formation", org: "경기도", title: "지하철 8호선 연장 별내선 개통 안내 — 6량 1편성", date: "2024-07-11 게시 · 2024-08-10 개통 안내", url: "https://gits.gg.go.kr/web/newboard/3386.do?idx=194416773&mode=view" },
    { id: "guide-map", org: "서울교통공사", title: "수도권 지하철 노선도 — 역명·영문명·환승노선", date: "2025-09-29 자료", url: "https://data.seoul.go.kr/dataList/OA-22535/F/1/datasetView.do" },
    { id: "guide-transfer", org: "서울교통공사", title: "서울 도시철도 환승정보", date: "2026-09-01 기준", url: "https://www.data.go.kr/data/15098252/fileData.do" },
    { id: "G1", org: "구리시", title: "BN3 정거장 관련 공식 답변", date: "2020년 계획 설명", url: "https://www.guri.go.kr/petitions/selectPolicyWebView.do?key=2456&pcyNo=2&searchArea=&searchCtgryCode=&searchOrder=NEW&type=ANSC" },
    { id: "G2", org: "구리시", title: "별내선 개통 공지", date: "2024-07-31 게시 · 2024-08-10 개통 안내", url: "https://www.guri.go.kr/www/selectBbsNttView.do?bbsNo=36&integrDeptCode=&key=380&nttNo=113614&pageIndex=40&searchCnd=all&searchCtgry=&searchKrwd=" },
    { id: "G3", org: "경기도", title: "8호선 별내선 구리역 환승통로 현장점검 보도자료", date: "2026-08-26 현장점검", url: "https://gnews.gg.go.kr/briefing/brief_gongbo_view.do?BS_CODE=S017&number=71298" },
  ],
  related: [
    { title: "잠실역, 2호선에서 8호선까지 왜 이렇게 멀까?", href: "/station/jamsil/" },
    { title: "사당역, 환승 74m인데 왜 3분 넘게 걸릴까?", href: "/station/sadang/" },
  ],
  datePublished: "2026-11-01T00:00:00+09:00",
  dateModified: "2026-11-01T16:15:25+09:00",
};
