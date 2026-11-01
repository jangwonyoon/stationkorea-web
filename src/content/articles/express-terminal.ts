import type { MagazineArticle } from "../articles";

export const expressTerminal: MagazineArticle = {
  slug: "express-terminal",
  section: "transfer",
  question: "고속터미널역의 15cm와 314m는 무엇을 잰 숫자일까?",
  answer: "고속터미널역의 15cm는 2009년 준공한 9호선 공사에서 기존 3호선 터널과 공사 구간이 가장 가까웠던 간격이고, 314m는 2026년 8월 31일 기준 7호선과 9호선의 최단 환승거리다.",
  answerSourceIds: ["E1", "E2"],
  body: [
    {
      heading: "터널 사이 간격과 사람의 이동거리",
      paragraphs: [
        {
          text: "9호선 고속터미널역을 지을 때 기존 3호선 터널과 9호선 공사 구간이 가장 가까운 곳은 15cm 떨어져 있었다. 시공사가 남긴 이 수치는 2009년 준공한 공사의 구조물 간격이다. 승강장 사이 거리도, 사람이 걸어야 할 길이도 아니다.",
          sourceIds: ["E2"],
        },
        {
          text: "서울교통공사가 공개한 2026년 8월 31일 기준 7호선과 9호선의 최단 환승거리는 314m다. 앞의 15cm와는 비교 대상부터 다르다. 하나는 3호선 터널과 9호선 공사 구간의 최인접 간격, 다른 하나는 7호선과 9호선 사이의 환승 경로다. 구조물이 가까웠다는 사실만으로 승객의 환승 동선이 짧다고 말할 수는 없다.",
          sourceIds: ["E1", "E2"],
        },
      ],
    },
    {
      heading: "‘4분 22초’는 실제 걸은 시간이 아니다",
      paragraphs: [
        {
          text: "같은 최단거리 자료에 적힌 4분 22초는 314m를 초당 1.2m로 나눠 계산한 예상 시간이다. 서울교통공사의 별도 환승 안내에는 7호선에서 9호선으로 갈아타는 네 경로의 참고 시간이 하차 위치와 방향에 따라 8분 53초부터 9분 17초까지 나온다(2026년 9월 1일 기준). 두 자료가 제시하는 시간의 기준이 다르므로, 어느 하나를 모든 승객의 실제 소요 시간으로 읽으면 안 된다.",
          sourceIds: ["E1", "E3"],
        },
        {
          text: "고속터미널역에서 15cm는 공사 중 구조물 사이, 314m는 7호선과 9호선 사이의 최단 환승 경로를 가리킨다. 숫자만 비교하기 전에 ‘무엇과 무엇 사이’를 쟀는지 확인해야 한다.",
          sourceIds: ["E1", "E2"],
        },
      ],
    },
  ],
  sources: [
    { id: "E1", org: "서울교통공사", title: "환승역거리 소요시간 정보", date: "2026-08-31 기준", url: "https://www.data.go.kr/data/15044419/fileData.do" },
    { id: "E2", org: "쌍용건설", title: "9호선 고속터미널역 923공구", date: "2009-07 준공 기록", url: "https://www.ssyenc.com/kr/business/masterpiece/seoul-923-subway-station" },
    { id: "E3", org: "서울교통공사", title: "서울 도시철도 환승정보", date: "2026-09-01 기준", url: "https://www.data.go.kr/data/15098252/fileData.do" },
  ],
  related: [
    { title: "구리역에서 경의중앙선과 8호선은 어떻게 이어질까?", href: "/article/guri-escalator/" },
    { title: "잠실역, 2호선에서 8호선까지 왜 이렇게 멀까?", href: "/station/jamsil/" },
  ],
  datePublished: "2026-11-01T00:00:00+09:00",
  dateModified: "2026-11-01T00:00:00+09:00",
};
