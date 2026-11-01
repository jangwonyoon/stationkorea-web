import type { MagazineArticle } from "../articles";

export const gimpoPlanChange: MagazineArticle = {
  slug: "gimpo-plan-change",
  section: "transfer",
  question: "김포공항역 서해선은 왜 주차장 자리 계획에서 환승 중심 위치로 바뀌었을까?",
  answer: "국가철도공단은 2017년 김포공항역의 서해선 정거장을 공항 주차장 자리에 두려던 계획에서 김포도시철도와 9호선 사이로 바꿔 직접 환승을 가능하게 하려 했다고 밝혔다.",
  answerSourceIds: ["GP1"],
  body: [
    {
      heading: "처음 계획은 주차장 자리였다",
      paragraphs: [
        {
          text: "2017년 발표에서 새 정거장은 가칭 ‘DS01’로 불렸다. 당시 공단이 밝힌 원래 계획은 김포공항 주차장에 정거장을 놓고, 5호선과 9호선의 기존 연결통로를 통해 갈아타게 하는 것이었다. 같은 김포공항역에서 내리더라도 새 노선에 닿으려면 그 통로를 거치도록 구상한 셈이다.",
          sourceIds: ["GP1"],
        },
      ],
    },
    {
      heading: "갈아타는 길을 기준으로 자리를 옮겼다",
      paragraphs: [
        {
          text: "공단은 2017년 12월 정거장을 김포도시철도와 9호선 사이로 옮겨 직접 환승을 가능하게 하려는 설계를 마쳤다고 발표했다. 환승시간 단축은 공단이 당시 내건 기대 효과였다.",
          sourceIds: ["GP1"],
        },
        {
          text: "여기서 중요한 것은 ‘역까지 왔다’와 ‘다른 열차에 닿았다’가 다른 일이라는 점이다. 새 정거장을 어디에 놓는지에 따라 갈아타는 길도 달라진다. 다만 2017년 발표는 설계의 목적을 알려 줄 뿐, 오늘의 모든 환승 경로가 몇 분 걸리는지 측정한 자료는 아니다.",
          sourceIds: ["GP1"],
        },
      ],
    },
    {
      heading: "개통은 2023년, 시간 단축은 별개의 질문",
      paragraphs: [
        {
          text: "대곡과 소사를 잇는 서해선 구간은 2023년 7월 1일 문을 열었다. 국가철도공단은 개통 당시 김포공항역에서 5호선·9호선·공항철도·김포골드라인으로 갈아탈 수 있다고 안내했다. 새 노선이 더해지며 다섯 노선이 한 역에서 만난 것이다.",
          sourceIds: ["GP2"],
        },
        {
          text: "2017년의 위치 변경은 환승을 쉽게 하려는 설계 결정이었다. 그 발표만으로 현재 승강장의 정확한 위치나 사람마다 실제로 줄어든 시간을 단정할 수는 없다. 김포공항역을 이해할 때는 개통된 노선의 수와, 그 노선들 사이를 잇기 위해 왜 역의 자리를 다시 골랐는지를 구분해 볼 만하다.",
          sourceIds: ["GP1", "GP2"],
        },
      ],
    },
  ],
  sources: [
    { id: "GP1", org: "국가철도공단(당시 한국철도시설공단)", title: "대곡~소사 DS01정거장 교통 허브화 설계 완료", date: "2017-12-08 발표", url: "https://www.kr.or.kr/boardCnts/view.do?boardID=52&boardSeq=1109549&page=106" },
    { id: "GP2", org: "국가철도공단", title: "수도권, 철도허브 역할 위해 올해 2조 7,380억 원 투입", date: "2023-07-24 발표 · 2023-07-01 개통", url: "https://www.kr.or.kr/boardCnts/view.do?boardID=52&boardSeq=1118317&page=68" },
  ],
  related: [
    { title: "구리역에서 경의중앙선과 8호선은 어떻게 이어질까?", href: "/article/guri-escalator/" },
    { title: "잠실역, 2호선에서 8호선까지 왜 이렇게 멀까?", href: "/station/jamsil/" },
  ],
  datePublished: "2026-11-01T00:00:00+09:00",
  dateModified: "2026-11-01T00:00:00+09:00",
};
