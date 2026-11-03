import type { MagazineArticle } from "../articles";
import { stationPhotos } from "../station-photos";

export const expressTerminal: MagazineArticle = {
  slug: "express-terminal",
  image: stationPhotos["express-terminal"],
  section: "transfer",
  cover: {
    src: "/images/station/express-terminal-cover.jpg",
    alt: "고속터미널역 릴스 표지. 7호선에서 9호선 환승, 왜 이렇게 멀까?",
    caption: "고속터미널역 7·9호선 환승을 다룬 릴스 표지. AI 시각화 참고 이미지.",
    width: 1080, height: 1920,
  },
  question: "고속터미널역의 15cm와 314m는 무엇을 잰 숫자일까?",
  answer: "고속터미널역의 15cm는 2009년 준공한 9호선 공사에서 기존 3호선 터널과 공사 구간이 가장 가까웠던 간격이고, 314m는 2026년 8월 31일 기준 7호선과 9호선의 최단 환승거리다.",
  answerSourceIds: ["E1", "E2"],
  station: {"name": "고속터미널역", "lines": ["3", "7", "9"], "sign": {"line": "3", "prev": "잠원", "next": "교대", "en": "Express Bus Terminal"}, "sourceIds": ["station-sign-map", "station-sign-en"]},
  transfers: [
    {"ride": {"line": "3", "direction": "교대 방면"}, "to": {"line": "7", "direction": "내방 방면"}, "car": "2-3", "toCar": "2-3", "time": "4분 17초", "sourceId": "E3", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "3", "direction": "잠원 방면"}, "to": {"line": "7", "direction": "반포 방면"}, "car": "9-2", "toCar": "7-1", "time": "4분 6초", "sourceId": "E3", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "3", "direction": "잠원 방면"}, "to": {"line": "7", "direction": "내방 방면"}, "car": "7-2", "toCar": "2-3", "time": "4분 19초", "sourceId": "E3", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "3", "direction": "교대 방면"}, "to": {"line": "7", "direction": "반포 방면"}, "car": "9-2", "toCar": "7-1", "time": "6분 48초", "sourceId": "E3", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "3", "direction": "교대 방면"}, "to": {"line": "9", "direction": "신반포 방면"}, "car": "9-2", "toCar": "1-2", "time": "5분 1초", "sourceId": "E3", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "3", "direction": "잠원 방면"}, "to": {"line": "9", "direction": "사평 방면"}, "car": "4-3", "toCar": "5-1", "time": "3분 21초", "sourceId": "E3", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "3", "direction": "교대 방면"}, "to": {"line": "9", "direction": "사평 방면"}, "car": "9-2", "toCar": "5-1", "time": "5분 3초", "sourceId": "E3", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "3", "direction": "잠원 방면"}, "to": {"line": "9", "direction": "신반포 방면"}, "car": "2-3", "toCar": "1-2", "time": "5분 30초", "sourceId": "E3", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "7", "direction": "내방 방면"}, "to": {"line": "3", "direction": "교대 방면"}, "car": "7-1", "toCar": "7-2", "time": "4분 17초", "sourceId": "E3", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "7", "direction": "반포 방면"}, "to": {"line": "3", "direction": "잠원 방면"}, "car": "2-3", "toCar": "9-2", "time": "4분 6초", "sourceId": "E3", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "7", "direction": "반포 방면"}, "to": {"line": "3", "direction": "교대 방면"}, "car": "2-3", "toCar": "9-2", "time": "6분 48초", "sourceId": "E3", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "7", "direction": "내방 방면"}, "to": {"line": "3", "direction": "잠원 방면"}, "car": "7-1", "toCar": "2-3", "time": "4분 19초", "sourceId": "E3", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "7", "direction": "반포 방면"}, "to": {"line": "9", "direction": "신반포 방면"}, "car": "2-3", "toCar": "5-2", "time": "9분 13초", "sourceId": "E3", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "7", "direction": "내방 방면"}, "to": {"line": "9", "direction": "사평 방면"}, "car": "7-1", "toCar": "5-1", "time": "8분 53초", "sourceId": "E3", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "7", "direction": "내방 방면"}, "to": {"line": "9", "direction": "신반포 방면"}, "car": "7-1", "toCar": "1-2", "time": "9분 4초", "sourceId": "E3", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "7", "direction": "반포 방면"}, "to": {"line": "9", "direction": "사평 방면"}, "car": "2-3", "toCar": "5-1", "time": "9분 17초", "sourceId": "E3", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "9", "direction": "사평 방면"}, "to": {"line": "3", "direction": "교대 방면"}, "car": "1-2", "toCar": "4-3", "time": "5분 3초", "sourceId": "E3", "formation": {"cars": 6, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "9", "direction": "신반포 방면"}, "to": {"line": "3", "direction": "교대 방면"}, "car": "5-1", "toCar": "2-3", "time": "5분 1초", "sourceId": "E3", "formation": {"cars": 6, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "9", "direction": "사평 방면"}, "to": {"line": "3", "direction": "잠원 방면"}, "car": "1-2", "toCar": "9-2", "time": "3분 21초", "sourceId": "E3", "formation": {"cars": 6, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "9", "direction": "신반포 방면"}, "to": {"line": "3", "direction": "잠원 방면"}, "car": "5-1", "toCar": "9-2", "time": "5분 30초", "sourceId": "E3", "formation": {"cars": 6, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "9", "direction": "사평 방면"}, "to": {"line": "7", "direction": "반포 방면"}, "car": "5-2", "toCar": "7-1", "time": "9분 17초", "sourceId": "E3", "formation": {"cars": 6, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "9", "direction": "신반포 방면"}, "to": {"line": "7", "direction": "반포 방면"}, "car": "5-1", "toCar": "7-1", "time": "9분 13초", "sourceId": "E3", "formation": {"cars": 6, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "9", "direction": "신반포 방면"}, "to": {"line": "7", "direction": "내방 방면"}, "car": "5-1", "toCar": "2-3", "time": "9분 4초", "sourceId": "E3", "formation": {"cars": 6, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "9", "direction": "사평 방면"}, "to": {"line": "7", "direction": "내방 방면"}, "car": "1-2", "toCar": "2-3", "time": "8분 53초", "sourceId": "E3", "formation": {"cars": 6, "sourceId": "station-guide-formation"}},
  ],
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
        {
          text: "서울교통공사의 7호선 안내도에는 지하 3층 승강장과 지하 2층 대합실, 3·9호선 환승 표지가 보인다. 3호선 안내도에도 지하 2층의 7·9호선 환승 표지가 표시돼 있고, 서울시의 2020년 안내 영상은 이 구간을 두 노선을 잇는 환승통로로 설명한다. 다만 안내도와 당시 영상은 314m의 실제 계측 경로를 그린 자료가 아니어서, 어떤 계단이나 에스컬레이터를 거치는지는 확인할 수 없다.",
          sourceIds: ["E4", "E5", "E6"],
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
    {"id": "station-guide-formation", "org": "서울특별시", "title": "서울지하철 현황 및 이용안내 — 노선별 조성칸수", "date": "2025-01-31 기준", "url": "https://news.seoul.go.kr/traffic/archives/1551?listPage=1"},
    {"id": "station-sign-map", "org": "서울교통공사", "title": "사이버스테이션 노선도 — 역명·노선·인접역", "date": "2026-11-01 확인", "url": "https://www.seoulmetro.co.kr/kr/cyberStation.do?menuIdx=538"},
    {"id": "station-sign-en", "org": "서울특별시", "title": "2026 Seoul Tourist Map — 영문 역명", "date": "2026년판 · 2026-11-01 확인", "url": "https://english.seoul.go.kr/wp-content/uploads/2026/03/2026_touristmap_EN.pdf"},

    { id: "E1", org: "서울교통공사", title: "환승역거리 소요시간 정보", date: "2026-08-31 기준", url: "https://www.data.go.kr/data/15044419/fileData.do" },
    { id: "E2", org: "쌍용건설", title: "9호선 고속터미널역 923공구", date: "2009-07 준공 기록", url: "https://www.ssyenc.com/kr/business/masterpiece/seoul-923-subway-station" },
    { id: "E3", org: "서울교통공사", title: "서울 도시철도 환승정보", date: "2026-09-01 기준", url: "https://www.data.go.kr/data/15098252/fileData.do" },
    { id: "E4", org: "서울교통공사", title: "고속터미널역 7호선 역 이용 및 비상대피 안내도", date: "제작·갱신일 미표기 · 2026-11-03 확인", url: "https://www.seoulmetro.co.kr/common/resources/cyber/fileView.jsp?fileName=in_2736.jpg" },
    { id: "E5", org: "서울교통공사", title: "고속터미널역 3호선 역 이용 및 비상대피 안내도", date: "제작·갱신일 미표기 · 2026-11-03 확인", url: "https://www.seoulmetro.co.kr/common/resources/cyber/fileView.jsp?fileName=station_0329.jpg" },
    { id: "E6", org: "서울특별시 라이브서울", title: "소통방통 20.01.30. 목 1494회", date: "2020-01-29", url: "https://tv.seoul.go.kr/v/130284" },
  ],
  related: [
    { title: "구리역에서 경의중앙선과 8호선은 어떻게 이어질까?", href: "/article/guri-escalator/" },
    { title: "잠실역 2호선과 8호선은 어떻게 연결되나?", href: "/station/jamsil/" },
  ],
  datePublished: "2026-11-01T00:00:00+09:00",
  dateModified: "2026-11-03T12:55:48+09:00",
};
