import type { MagazineArticle } from "../articles";

export const dongmyoWeekend: MagazineArticle = {
  slug: "dongmyo-weekend",
  section: "walk",
  question: "동묘앞역은 왜 토·휴일 승하차가 더 많을까?",
  answer: "서울교통공사가 집계한 2026년 상반기 1호선 동묘앞역의 토·휴일 하루 평균 승하차는 28,785명으로 평일보다 9,112명(46.3%) 많았고, 공사는 인근 벼룩시장 방문 수요를 배경으로 분석했다.",
  answerSourceIds: ["D1"],
  station: {"name": "동묘앞역", "lines": ["1", "6"], "sign": {"line": "1", "prev": "신설동", "next": "동대문", "en": "Dongmyo"}, "sourceIds": ["station-sign-map", "station-sign-en"]},
  transfers: [
    {"ride": {"line": "1", "direction": "동대문 방면"}, "to": {"line": "6", "direction": "창신 방면"}, "car": "2-4", "toCar": "7-3", "time": "3분 33초", "sourceId": "station-guide-route", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "1", "direction": "동대문 방면"}, "to": {"line": "6", "direction": "신당 방면"}, "car": "2-4", "toCar": "2-3", "time": "3분 33초", "sourceId": "station-guide-route", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "1", "direction": "신설동 방면"}, "to": {"line": "6", "direction": "창신 방면"}, "car": "9-1", "toCar": "7-3", "time": "3분 36초", "sourceId": "station-guide-route", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "1", "direction": "신설동 방면"}, "to": {"line": "6", "direction": "신당 방면"}, "car": "9-1", "toCar": "2-3", "time": "3분 36초", "sourceId": "station-guide-route", "formation": {"cars": 10, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "6", "direction": "창신 방면"}, "to": {"line": "1", "direction": "신설동 방면"}, "car": "2-3", "toCar": "2-4", "time": "3분 36초", "sourceId": "station-guide-route", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "6", "direction": "신당 방면"}, "to": {"line": "1", "direction": "동대문 방면"}, "car": "7-3", "toCar": "9-1", "time": "3분 33초", "sourceId": "station-guide-route", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "6", "direction": "신당 방면"}, "to": {"line": "1", "direction": "신설동 방면"}, "car": "7-3", "toCar": "2-4", "time": "3분 36초", "sourceId": "station-guide-route", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
    {"ride": {"line": "6", "direction": "창신 방면"}, "to": {"line": "1", "direction": "동대문 방면"}, "car": "2-3", "toCar": "9-1", "time": "3분 33초", "sourceId": "station-guide-route", "formation": {"cars": 8, "sourceId": "station-guide-formation"}},
  ],
  body: [
    {
      heading: "환승역 곁의 벼룩시장",
      paragraphs: [
        {
          text: "2005년 1호선 동묘앞역이 문을 열기 전, 서울시는 새 역으로 기존 6호선과 갈아타기가 쉬워질 것이라고 안내했다. 두 노선이 만나는 역이지만 이번 주말 승하차 수치는 역 전체의 합계가 아니다. 서울교통공사의 표에서 46.3%는 1호선 동묘앞역을 가리킨다.",
          sourceIds: ["D2", "D1"],
        },
        {
          text: "역 가까이에는 의류와 신발, 시계, 전자제품 등을 구경할 수 있는 동묘 벼룩시장이 있다. 서울 공식 관광정보는 평일에는 장이 부분적으로 열리고 주말에는 하루 종일 열린다고 소개한다. 공사는 이 시장을 찾는 수요가 토·휴일 역 이용 증가에 영향을 준 것으로 해석했다.",
          sourceIds: ["D3", "D1"],
        },
      ],
    },
    {
      heading: "46.3%는 하루 평균의 차이",
      paragraphs: [
        {
          text: "공사는 2026년 1월부터 6월까지 평일 120일과 토·휴일 61일을 나눠 하루 평균 승하차를 비교했다. 1호선 동묘앞역은 평일 19,673명, 토·휴일 28,785명이다. 두 평균의 차이 9,112명을 평일 평균으로 나누면 46.3%가 된다. 모든 토·휴일에 같은 수만큼 더 이용했다는 뜻은 아니다.",
          sourceIds: ["D1"],
        },
        {
          text: "이 표가 보여 주는 것은 1호선 동묘앞역의 승하차 집계다. 어느 시간대 승강장이 붐볐는지, 승객 가운데 몇 명이 시장을 방문했는지는 이 수치로 알 수 없다. 토·휴일 승하차가 많다는 관찰과 그 배경을 시장 방문으로 본 공사의 해석을 구분해 읽어야 한다.",
          sourceIds: ["D1"],
        },
      ],
    },
  ],
  sources: [
    {"id": "station-guide-formation", "org": "서울특별시", "title": "서울지하철 현황 및 이용안내 — 노선별 조성칸수", "date": "2025-01-31 기준", "url": "https://news.seoul.go.kr/traffic/archives/1551?listPage=1"},
    {"id": "station-sign-map", "org": "서울교통공사", "title": "사이버스테이션 노선도 — 역명·노선·인접역", "date": "2026-11-01 확인", "url": "https://www.seoulmetro.co.kr/kr/cyberStation.do?menuIdx=538"},
    {"id": "station-sign-en", "org": "서울특별시", "title": "2026 Seoul Tourist Map — 영문 역명", "date": "2026년판 · 2026-11-01 확인", "url": "https://english.seoul.go.kr/wp-content/uploads/2026/03/2026_touristmap_EN.pdf"},
    {"id": "station-guide-route", "org": "서울교통공사", "title": "서울 도시철도 환승정보", "date": "2026-09-01 기준", "url": "https://www.data.go.kr/data/15098252/fileData.do"},

    { id: "D1", org: "서울교통공사", title: "'보물찾기 명소' 동묘앞역, 평일 대비 주말 승객 증가율 가장 높았다(원 보도자료 HWPX 첨부)", date: "2026-07-23 발표 · 2026년 1~6월 집계", url: "https://www.kric.go.kr/jsp/board/portal/sub01/railNewsDetail.jsp?p_id1=M01060101&p_id2=719179&p_id3=2026.07.24&pageNo=2" },
    { id: "D2", org: "서울시", title: "서울 지하철이 편리하고 안전해진다(1호선 동묘앞역 개통 안내)", date: "2005-12-08", url: "https://mediahub.seoul.go.kr/archives/149687" },
    { id: "D3", org: "서울관광재단", title: "동묘 벼룩시장", date: "2026-08-07 수정", url: "https://korean.visitseoul.net/shopping/%EB%8F%99%EB%AC%98-%EB%B2%BC%EB%A3%A9%EC%8B%9C%EC%9E%A5-KR/KOP009646" },
  ],
  related: [
    { title: "구리역에서 경의중앙선과 8호선은 어떻게 이어질까?", href: "/article/guri-escalator/" },
    { title: "건대입구역, 엘리베이터가 있어도 환승은 왜 따로 살펴야 할까?", href: "/station/konkuk-univ/" },
  ],
  datePublished: "2026-11-01T00:00:00+09:00",
  dateModified: "2026-11-01T16:16:28+09:00",
};
