import type { MagazineArticle } from "../articles";

export const gimpoExtensionStatus: MagazineArticle = {
  slug: "gimpo-extension-status",
  section: "change",
  question: "5호선 김포·검단 연장, 예타 통과 뒤 무엇이 정해졌나?",
  answer: "서울 5호선 김포·검단 연장은 예비타당성조사를 통과했지만, 역 위치와 노선은 아직 기본계획에서 정할 내용입니다. 인천시는 2026년 3월 10일 예타 통과를 발표했고, 9월 18일 철도과 답변에서는 경기도가 기본계획 수립 절차를 진행 중이라고 설명했습니다. 예타 통과가 곧 노선이나 역, 공사의 확정을 뜻하지는 않습니다.",
  answerSourceIds: ["incheon-march", "incheon-september"],
  body: [
    {
      heading: "노선도에 표시된 역은 확정됐을까?",
      paragraphs: [
        {
          text: "아직 확정된 역 목록으로 볼 수 없습니다. 김포시 사업 안내는 2024년 변경 계획의 노선과 정거장을 기본계획 단계에서 다시 검토할 내용으로 소개합니다. 인천시가 예타 통과 발표에 붙인 그림에도 ‘노선도(안)’이라고 적혀 있습니다. 지금 공개된 선형과 역 이름은 계획의 출발점이지, 완성된 노선도가 아닙니다.",
          sourceIds: ["gimpo-plan", "incheon-march"],
        },
        {
          text: "인천시는 사업이 완성되면 김포골드라인 혼잡과 출퇴근 여건이 나아질 것으로 전망했습니다. 다만 이는 기관이 제시한 기대 효과입니다. 실제 혼잡이나 이동 시간이 얼마나 달라질지는 측정된 결과가 아닙니다. 노선과 정거장이 정해지기 전에는 어느 동네의 이동이 얼마나 달라질지도 따져 보기 어렵습니다.",
          sourceIds: ["incheon-march", "incheon-september"],
        },
        {
          text: "지금 확인된 것은 예타 통과와 기본계획 수립 절차입니다. 역과 노선, 공사 기간, 재원은 기본계획에서 검토해 결정할 항목입니다. 사업이 실제로 어디까지 진행됐는지 판단할 때는 발표된 기대 효과와 확정된 계획을 구분해 읽어야 합니다.",
          sourceIds: ["incheon-september"],
        },
      ],
    },
  ],
  timelines: [{
    title: "공식 자료로 확인한 사업 흐름",
    items: [
      {
        date: "2026-03-10",
        org: "인천광역시",
        doc: "서울 5호선 김포·검단 연장 예비타당성조사 통과 발표",
        url: "https://www.incheon.go.kr/IC010205/view?repDt=2026-03-10&repSeq=DOM_0000000014309298",
        summary: "예비타당성조사 통과를 발표했습니다. 첨부 노선도는 ‘안’으로 표시돼 있습니다.",
      },
      {
        date: "2026-09-18",
        org: "인천광역시 철도과",
        doc: "기본계획 수립 절차와 후속 결정 항목에 관한 답변",
        url: "https://www.incheon.go.kr/cool/COOL010501/view?curPage=4&petitSn=2048971",
        summary: "경기도가 기본계획 절차를 진행 중이며, 노선·정거장·공사 기간·재원은 이 과정에서 검토해 결정한다고 설명했습니다.",
      },
    ],
  }],
  sources: [
    { id: "incheon-march", org: "인천광역시", title: "서울 5호선 김포·검단 연장 예비타당성조사 통과 발표", date: "2026-03-10 발표", url: "https://www.incheon.go.kr/IC010205/view?repDt=2026-03-10&repSeq=DOM_0000000014309298" },
    { id: "incheon-september", org: "인천광역시 철도과", title: "서울 5호선 김포·검단 연장 기본계획 관련 답변", date: "2026-09-18 답변", url: "https://www.incheon.go.kr/cool/COOL010501/view?curPage=4&petitSn=2048971" },
    { id: "gimpo-plan", org: "김포시", title: "서울5호선 김포연장 사업 안내", date: "2026-10-20 갱신", url: "https://www.gimpo.go.kr/portal/contents.do?key=11402" },
  ],
  related: [
    { title: "김포공항역 서해선은 왜 주차장 자리 계획에서 환승 중심 위치로 바뀌었을까?", href: "/article/gimpo-plan-change/" },
    { title: "9호선 급행 개편, 동작역에서 무엇을 확인해야 하나?", href: "/article/dongjak-express/" },
  ],
  datePublished: "2026-11-04T00:00:00+09:00",
  dateModified: "2026-11-04T00:00:00+09:00",
};
