import type { MagazineArticle } from "../articles";
import { stationPhotos } from "../station-photos";

export const isuGuideTimes: MagazineArticle = {
  slug: "isu-guide-times",
  image: stationPhotos["isu-guide-times"],
  section: "transfer",
  question: "이수역 환승 안내의 2분 23초와 5분 24초는 무엇이 다를까?",
  answer: "서울교통공사의 이수역 자료에서 2분 23초는 2026년 8월 기준 최단 환승거리 171m를 계산한 값이고, 5분 24초는 같은 해 9월 기준 4호선에서 7호선 내방 방면으로 갈아타는 한 경로의 참고 시간이다.",
  answerSourceIds: ["I1", "I2"],
  station: {"name": "총신대입구(이수)역", "lines": ["4", "7"], "sign": {"line": "4", "prev": "동작", "next": "사당", "en": "Chongshin Univ.(Isu)"}, "sourceIds": ["station-sign-map", "station-sign-en"]},
  transfers: [
    {"ride": {"line": "4", "direction": "동작 방면"}, "to": {"line": "7", "direction": "내방 방면"}, "car": "10-3", "toCar": "8-4", "time": "5분 17초", "sourceId": "I2", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "4", "direction": "동작 방면"}, "to": {"line": "7", "direction": "남성 방면"}, "car": "10-3", "toCar": "2-2", "time": "3분 44초", "sourceId": "I2", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "4", "direction": "사당 방면"}, "to": {"line": "7", "direction": "남성 방면"}, "car": "1-1", "toCar": "2-2", "time": "3분 48초", "sourceId": "I2", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "4", "direction": "사당 방면"}, "to": {"line": "7", "direction": "내방 방면"}, "car": "1-1", "toCar": "8-4", "time": "5분 24초", "sourceId": "I2", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "7", "direction": "내방 방면"}, "to": {"line": "4", "direction": "동작 방면"}, "car": "2-2", "toCar": "1-1", "time": "5분 17초", "sourceId": "I2", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "7", "direction": "남성 방면"}, "to": {"line": "4", "direction": "동작 방면"}, "car": "8-4", "toCar": "1-1", "time": "3분 44초", "sourceId": "I2", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "7", "direction": "남성 방면"}, "to": {"line": "4", "direction": "사당 방면"}, "car": "8-4", "toCar": "10-3", "time": "3분 48초", "sourceId": "I2", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "7", "direction": "내방 방면"}, "to": {"line": "4", "direction": "사당 방면"}, "car": "2-2", "toCar": "10-3", "time": "5분 24초", "sourceId": "I2", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
  ],
  body: [
    {
      heading: "총신대입구와 이수, 한 환승역의 두 표기",
      paragraphs: [
        {
          text: "서울교통공사의 두 자료에는 같은 환승역이 4호선 쪽은 총신대입구, 7호선 쪽은 이수로 적혀 있다. 역 이름이 달라 보여도 두 숫자는 모두 4호선과 7호선 사이의 환승을 설명한다. 차이는 자료가 설명하는 경로와 시간을 계산·안내하는 방식에 있다.",
          sourceIds: ["I1", "I2"],
        },
      ],
    },
    {
      heading: "최단거리에서 계산한 2분 23초",
      paragraphs: [
        {
          text: "공사가 2026년 8월 31일 기준으로 공개한 노선 사이 최단 이동거리는 171m다. 2분 23초는 이 거리를 초당 1.2m의 보행속도로 나눈 예상값이다. 누군가 실제로 걸어 잰 시간이 아니며, 출발 열차의 방면과 하차 문도 이 숫자에 담기지 않는다.",
          sourceIds: ["I1"],
        },
      ],
    },
    {
      heading: "방면과 하차 문에 따라 달라지는 안내",
      paragraphs: [
        {
          text: "2026년 9월 1일 기준의 별도 환승 안내는 4호선 열차에서 내려 7호선 내방 방면으로 갈 때 5분 17초 또는 5분 24초, 남성 방면으로 갈 때 3분 44초 또는 3분 48초를 제시한다. 출발 열차의 방면과 하차·승차 문이 다른 경로별 참고값이다.",
          sourceIds: ["I2"],
        },
        {
          text: "두 표의 시간 차이만으로 어느 계단이나 통로가 더 오래 걸리게 하는지는 알 수 없다. 이수역에서 2분 23초는 최단거리의 계산값이고, 5분 24초는 내방 방면으로 갈아타는 한 경우의 안내값이다. 둘 다 실제 소요 시간을 보장하지 않는다.",
          sourceIds: ["I1", "I2"],
        },
      ],
    },
  ],
  sources: [
    {"id": "station-guide-formation", "org": "서울특별시", "title": "서울지하철 현황 및 이용안내 — 노선별 조성칸수", "date": "2025-01-31 기준", "url": "https://news.seoul.go.kr/traffic/archives/1551?listPage=1"},
    {"id": "station-sign-map", "org": "서울교통공사", "title": "사이버스테이션 노선도 — 역명·노선·인접역", "date": "2026-11-01 확인", "url": "https://www.seoulmetro.co.kr/kr/cyberStation.do?menuIdx=538"},
    {"id": "station-sign-en", "org": "서울특별시", "title": "2026 Seoul Tourist Map — 영문 역명", "date": "2026년판 · 2026-11-01 확인", "url": "https://english.seoul.go.kr/wp-content/uploads/2026/03/2026_touristmap_EN.pdf"},

    { id: "I1", org: "서울교통공사", title: "환승역거리 소요시간 정보", date: "2026-08-31 기준", url: "https://www.data.go.kr/data/15044419/fileData.do" },
    { id: "I2", org: "서울교통공사", title: "서울 도시철도 환승정보", date: "2026-09-01 기준", url: "https://www.data.go.kr/data/15098252/fileData.do" },
  ],
  related: [
    { title: "고속터미널역의 15cm와 314m는 무엇을 잰 숫자일까?", href: "/article/express-terminal/" },
    { title: "사당역에서 2호선으로 갈아탈 때, 왜 방면부터 확인해야 할까?", href: "/station/sadang/" },
  ],
  datePublished: "2026-11-01T00:00:00+09:00",
  dateModified: "2026-11-02T22:24:34+09:00",
};
