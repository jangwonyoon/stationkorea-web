import type { MagazineArticle } from "../articles";
import { stationPhotos } from "../station-photos";

export const sindorimCulturalSpaces: MagazineArticle = {
  slug: "sindorim-cultural-spaces",
  image: stationPhotos["sindorim-cultural-spaces"],
  section: "see",
  question: "신도림역의 지하통로와 철길 위에는 어떻게 문화공간이 생겼을까?",
  answer: "신도림역에는 테크노마트 방향 지하 1층 연결통로에 생활문화공간이 들어섰고, 철길 위 역사의 유휴공간을 활용해 창작실과 문화교실 등이 마련됐다.",
  answerSourceIds: ["S2", "S3", "S4"],
  station: {"name": "신도림역", "lines": ["1", "2"], "sign": {"line": "1", "prev": "영등포", "next": "구로", "en": "Sindorim"}, "sourceIds": ["seoul-tourist-map-en-202603", "seoul-route-map-202509"]},
  body: [
    {
      heading: "지하 통로와 철길 위 건물을 나누어 보면",
      paragraphs: [
        {
          text: "신도림역의 문화공간은 지하 연결통로와 철길 위 역사에 나뉘어 있다. 서울생활문화센터 신도림은 지하 1층에 있으며 서울시의 교통 안내는 3번 출구 쪽 지하 1층에서 테크노마트 방향 지하 연결통로로 가도록 설명한다. 반면 구로문화재단이 안내하는 문화철도959는 신도림역 3층에 있다. 한쪽은 역과 주변 시설을 잇는 지하의 길에, 다른 한쪽은 지상 철도역 건물 안에 자리한다.",
          sourceIds: ["S2", "S3"]
        },
        {
          text: "여기서 철길 위 역사는 ‘선상역사’라고 부른다. 선로 위에 걸쳐 지은 역 건물이라는 뜻이다. 구로구의 2015년 자료는 새 선상역사를 3층 규모의 1호선 역사로 소개한다. 그해 5월 완공과 함께 출입구가 늘고, 지상을 통해 역 남쪽과 북쪽 광장도 연결됐다. 열차 승객을 위한 출입 시설이 늘어나는 변화와 철길 양쪽을 잇는 변화가 함께 일어났다. 역 건물은 열차를 타러 들어가는 곳이면서 남쪽과 북쪽 광장을 연결하는 시설이기도 했다.",
          sourceIds: ["S1"]
        }
      ]
    },
    {
      heading: "지하에서 시작된 ‘고리’",
      paragraphs: [
        {
          text: "지하의 예술공간 ‘고리’는 선상역사가 완공되기 전인 2012년 여름 문을 열었다. 서울문화포털은 신도림역 지하통로에 고리를 열었다고 설명하고, 시설 위치는 3번 출구 쪽 테크노마트 방향 연결통로로 안내한다. 이름에는 지역과 생활문화예술인을 연결하려는 뜻을 담았다. 역과 주변 시설을 오가는 지하 연결통로 곁에 문화활동의 자리가 생겼다.",
          sourceIds: ["S2"]
        },
        {
          text: "고리는 문화예술 프로그램을 운영하다 2017년부터 시민예술가와 동아리의 활동을 지원하는 생활문화 사업을 본격화했고 2020년 서울생활문화센터 신도림이라는 이름으로 바뀌었다. 시민예술가와 동아리 지원은 주민이 직접 문화활동을 하는 공간으로서 센터의 역할을 보여준다. 역 주변에 작품을 보러 갈 장소를 두는 일에 더해, 주민이 모여 활동할 자리를 마련했다.",
          sourceIds: ["S2"]
        }
      ]
    },
    {
      heading: "역사의 남는 공간에는 창작실이 들어섰다",
      paragraphs: [
        {
          text: "철길 위 역사는 또 다른 방식으로 쓰임을 넓혔다. 구로문화재단은 문화철도959의 아트플랫폼을 지상역사 안의 유휴공간, 곧 사용하지 않던 공간을 활용해 예술가의 창작공간과 주민의 문화공간으로 조성한 곳이라고 설명한다. 구로구가 2017년 발표한 자료에도 그해 문화철도959를 개관했다는 기록이 있다.",
          sourceIds: ["S4", "S5"]
        },
        {
          text: "2026년 11월 5일 확인한 구로문화재단의 시설 안내에는 아트플랫폼, 문화교실, 959갤러리가 실려 있다. 이 구성은 작품을 만드는 일, 배우는 일, 전시하는 일을 한 건물 안에 두었다는 뜻이다. 2024년 11월 20일 발표한 2025년 입주작가 모집공고는 시민이나 어린이·청소년을 대상으로 문화예술 체험활동을 기획하고, 갤러리 기획전에 참여하는 일을 의무사항으로 제시했다. 예술가에게 창작공간을 제공하면서 시민을 위한 활동과 전시 참여도 요구했다. 이는 2025년 입주자를 대상으로 제시한 운영 조건이다.",
          sourceIds: ["S3", "S4"]
        }
      ]
    },
    {
      heading: "광장과 연결통로까지 넓어진 역의 쓰임",
      paragraphs: [
        {
          text: "변화는 역 건물 안에만 머물지 않았다. 구로구는 2017년 남측 광장의 신도림 오페라하우스를 정비하면서, 3번 출구 인근의 고리와 직접 이어지는 내부통로도 마련했다고 밝혔다. 당시 정비는 광장의 공연장과 지하 문화공간 사이에 길을 더한 변화였다. 지하통로 곁의 문화공간, 선상역사의 창작실, 남측 광장의 공연장은 역 주변의 서로 다른 공간을 활용한 사례다.",
          sourceIds: ["S5"]
        },
        {
          text: "신도림역에서 다른 열차로 이동하는 사람에게 역은 통과 지점이지만, 문화교실이나 전시를 찾는 사람에게는 도착 지점이다. 지하의 고리, 역 건물 안의 창작공간, 광장의 공연장은 이 일대에 찾아올 목적을 더한다. 각각의 조성 기록에서 드러나는 변화는 역과 주변 공간에 주민의 문화활동을 위한 자리를 마련해 온 과정이다.",
          sourceIds: ["S2", "S3", "S4", "S5"]
        }
      ]
    },
    {
      heading: "방문 전에 확인할 것",
      paragraphs: [
        {
          text: "서울생활문화센터 신도림은 3번 출구 쪽 지하 1층에서 테크노마트 방향으로 이어지는 통로에 있다. 문화철도959는 재단 시설 안내의 신도림역 3층을 기준으로 찾는다. 방문할 프로그램과 운영 일정은 각 시설의 공지에서 확인한다.",
          sourceIds: ["S2", "S3"]
        }
      ]
    }
  ],
  sources: [
    {"id": "seoul-tourist-map-en-202603", "org": "서울특별시·서울관광재단", "title": "2026 Seoul Tourist Map, 2쪽 Seoul Metro Map", "date": "2026년 3월 게시본 · 2026-11-05 확인", "url": "https://english.seoul.go.kr/wp-content/uploads/2026/03/2026_touristmap_EN.pdf"},
    {"id": "seoul-route-map-202509", "org": "서울특별시", "title": "서울 지하철 노선도 (Route Map)", "date": "2025년 9월 게시본 · 2026-11-05 확인", "url": "https://english.seoul.go.kr/wp-content/uploads/2025/09/route-map.pdf"},

    {
      id: "S1",
      org: "구로구",
      title: "구로구, 신도림역 선상역사 개통식(15.05.21)",
      date: "표제 2015-05-21 · 2015-05-22 게시 · 본문 개통식 2015-05-20 · 2026-11-05 확인",
      url: "https://www.guro.go.kr/www/selectBbsNttView.do?bbsNo=665&key=1793&nttNo=22076&pageIndex=689&pageUnit=10"
    },
    {
      id: "S2",
      org: "서울시 서울문화포털",
      title: "서울생활문화센터 신도림",
      date: "게시일 미표기 · 2026-11-05 확인",
      url: "https://culture.seoul.go.kr/night/sub/nightFac/view.do?facId=33"
    },
    {
      id: "S3",
      org: "구로문화재단",
      title: "신도림 문화철도959 — 시설 정보",
      date: "게시일 미표기 · 2026-11-05 확인",
      url: "https://guroartsvalley.or.kr/user/overall/overallArt9.do"
    },
    {
      id: "S4",
      org: "구로문화재단",
      title: "공고 제2024-94호 「2025년 문화철도959 입주작가 모집공고」 — 1쪽",
      date: "2024-11-20 발표 · 2025년 입주자 대상 · 2026-11-05 확인",
      url: "https://culture.seoul.go.kr/culture/cmmn/file/fileDown.do?atchFileId=41abb1a6a10644a897981fa5456af62a&bbsId=&fileSn=1&menuNo=200050"
    },
    {
      id: "S5",
      org: "구로구",
      title: "아시나요! 신도림 오페라하우스(17.08.22)",
      date: "2017-08-22 게시 · 2026-11-05 확인",
      url: "https://www.guro.go.kr/www/selectBbsNttView.do?bbsNo=665&key=1793&nttNo=23408&pageIndex=463&pageUnit=10"
    }
  ],
  related: [
    {
      title: "성수역 2호선은 왜 두 갈래로 나뉠까?",
      href: "/article/seongsu-branch/"
    },
    {
      title: "동묘앞역은 왜 토·휴일 승하차가 더 많을까?",
      href: "/article/dongmyo-weekend/"
    }
  ],
  datePublished: "2026-11-05T00:00:00+09:00",
  dateModified: "2026-11-05T00:00:00+09:00"
};
