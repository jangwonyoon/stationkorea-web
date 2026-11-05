import type { MagazineArticle } from "../articles";
import { stationPhotos } from "../station-photos";

export const wangsimniNeighborhood: MagazineArticle = {
  slug: "wangsimni-neighborhood",
  image: stationPhotos["wangsimni-neighborhood"],
  section: "transfer",
  question: "왕십리역의 네 노선은 동네와 어떻게 연결될까?",
  answer: "왕십리역은 서울 안의 지하철과 수도권을 잇는 철도가 만나는 환승역이면서, 출구 밖 광장과 성동구청 일대로 사람들이 들어가는 입구이기도 하다.",
  answerSourceIds: [
    "W1",
    "W2",
    "W6"
  ],
  station: {"name": "왕십리역", "lines": ["2", "5", "gyeongui-jungang", "suin-bundang"], "sign": {"line": "2", "prev": "상왕십리", "next": "한양대", "en": "Wangsimni"}, "sourceIds": ["seoul-tourist-map-en-202603", "seoul-route-map-202509"]},
  body: [
    {
      heading: "다른 열차로 갈아타는 곳, 동네로 나가는 곳",
      paragraphs: [
        {
          text: "왕십리역에서는 두 가지 이동을 나눠 볼 수 있다. 하나는 역 안에서 다른 노선으로 갈아타는 이동이고, 다른 하나는 개찰구를 나와 주변 시설로 향하는 이동이다. 같은 역에 도착해도 다음 목적지가 열차인지, 동네 안의 장소인지에 따라 필요한 안내가 달라진다.",
          sourceIds: [
            "W1",
            "W2"
          ]
        },
        {
          text: "왕십리역은 2호선·5호선·경의중앙선·수인분당선이 만나는 역이다. 서울시의 2026년 행사 관광 가이드북에 실린 노선도에서도 네 노선의 연결을 확인할 수 있다.",
          sourceIds: [
            "W1"
          ]
        },
        {
          text: "성동구청 안에 사무실을 둔 성동구지역사회보장협의체는 홈페이지에서 왕십리역 4번 출구를 방문 경로로 안내한다. 환승객에게 왕십리역은 다음 열차를 타는 곳이고 구청을 방문하는 사람에게는 동네로 나가는 출발점이다. 환승 노선만 확인해서는 방문할 건물까지의 길이 끝나지 않는 이유다.",
          sourceIds: [
            "W2"
          ]
        }
      ]
    },
    {
      heading: "분당선이 왕십리까지 오면서 달라진 연결",
      paragraphs: [
        {
          text: "네 노선의 연결은 처음부터 한꺼번에 갖춰진 것이 아니다. 국토교통부의 분당선 사업 설명에 따르면, 분당 택지개발과 함께 추진된 철도는 수서~오리, 선릉~수서, 왕십리~선릉 등의 구간으로 나뉘어 단계적으로 열렸다. 이 가운데 왕십리~선릉 구간이 개통한 해는 2012년이다. 분당에서 서울 강남으로 이어지던 철도의 연결이 왕십리까지 확장된 과정이다.",
          sourceIds: [
            "W3"
          ]
        },
        {
          text: "왕십리에서는 분당 방면으로 이어지는 환승 선택지가 추가됐다. 서울 안에서 타고 온 지하철과 분당 방면 철도를 왕십리에서 이어 탈 수 있게 됐다. 왕십리 자체가 목적지인 사람은 여기서 내려 출구 밖으로 이동한다.",
          sourceIds: [
            "W1",
            "W3"
          ]
        },
        {
          text: "서울시가 2013년 왕십리 출발 공항버스 개통 계획을 알릴 때도 이 역을 2·5호선, 분당선, 국철이 교차하는 곳으로 소개했다. 철도끼리의 환승에 더해 역 앞 도로에서 다른 교통수단으로 이어지는 성격을 당시 행정자료에서도 읽을 수 있다. 이 기록은 왕십리가 교통 거점으로 활용된 과정을 보여준다.",
          sourceIds: [
            "W5"
          ]
        }
      ]
    },
    {
      heading: "역 앞 광장까지 보아야 보이는 왕십리",
      paragraphs: [
        {
          text: "역 바깥에는 왕십리광장이 있다. 서울시가 2021년에 게재한 현장 기사에는 광장이 민자역사 바로 앞에 있고, 주변에 성동구청과 성동구의회, 성동경찰서가 모여 있다고 기록돼 있다. 역 건물과 광장, 공공기관을 함께 놓고 보면 왕십리가 열차를 바꾸는 장소와 지역 생활의 목적지를 함께 품고 있다는 점이 드러난다.",
          sourceIds: [
            "W6"
          ]
        },
        {
          text: "환승객에게 중요한 것은 다음 열차를 타는 승강장이다. 구청에 가는 사람에게는 출구와 지상 보행로가 중요하다. 광장을 찾는 사람에게는 역에서 바깥 공간으로 이어지는 관계가 먼저다. 왕십리역의 역할은 네 노선의 개수만으로 설명되지 않는다. 여러 지역을 이어 주는 철도와, 그 철도에서 내려 동네로 들어가는 길이 한 장소에서 만난다는 데 있다.",
          sourceIds: [
            "W1",
            "W2",
            "W6"
          ]
        }
      ]
    },
    {
      heading: "방문 전에 확인할 정보",
      paragraphs: [
        {
          text: "성동구지역사회보장협의체 홈페이지는 왕십리역 4번 출구를 안내한다. 계단 이용이 어렵다면 역의 교통약자 이동 안내와 목적지의 접근 안내를 별도로 확인해야 한다.",
          sourceIds: [
            "W2"
          ]
        }
      ]
    }
  ],
  sources: [
    {"id": "seoul-tourist-map-en-202603", "org": "서울특별시·서울관광재단", "title": "2026 Seoul Tourist Map, 2쪽 Seoul Metro Map", "date": "2026년 3월 게시본 · 2026-11-05 확인", "url": "https://english.seoul.go.kr/wp-content/uploads/2026/03/2026_touristmap_EN.pdf"},
    {"id": "seoul-route-map-202509", "org": "서울특별시", "title": "서울 지하철 노선도 (Route Map)", "date": "2025년 9월 게시본 · 2026-11-05 확인", "url": "https://english.seoul.go.kr/wp-content/uploads/2025/09/route-map.pdf"},

    {
      id: "W1",
      org: "서울특별시",
      title: "행사 관광 가이드북 — 56쪽 서울 지하철 노선도",
      date: "2026년 자료 · 지도 자체 기준일 미표시 · 2026-11-05 확인",
      url: "https://english.seoul.go.kr/wp-content/uploads/2026/03/guidebook_ko.pdf"
    },
    {
      id: "W2",
      org: "성동구지역사회보장협의체",
      title: "오시는 길",
      date: "게시일 미표시 · 2026-11-05 확인",
      url: "https://www.sdcssc.org/page/intro/location"
    },
    {
      id: "W3",
      org: "국토교통부",
      title: "왕십리∼수원 복선전철 전 구간 30일 개통",
      date: "2013-11-28 발표 · 2026-11-05 확인",
      url: "https://www.korea.kr/news/policyNewsView.do?newsId=148770512"
    },
    {
      id: "W5",
      org: "서울특별시 버스정책과",
      title: "4.9(화) 왕십리역~인천국제공항 오가는 6010번 버스 개통",
      date: "2013-03-29 수정 · 2026-11-05 확인",
      url: "https://news.seoul.go.kr/traffic/archives/9463"
    },
    {
      id: "W6",
      org: "서울특별시 내 손안에 서울 · 김윤경 시민기자",
      title: "왕십리광장에는 있다, 느리고 빠른 두 가지!",
      date: "2021-02-18 발행 · 2026-11-05 확인",
      url: "https://mediahub.seoul.go.kr/archives/2000520"
    }
  ],
  related: [
    {
      title: "성수역 2호선은 왜 두 갈래로 나뉠까?",
      href: "/article/seongsu-branch/"
    },
    {
      title: "구리역에서 경의중앙선과 8호선은 어떻게 이어질까?",
      href: "/article/guri-escalator/"
    }
  ],
  datePublished: "2026-11-05T00:00:00+09:00",
  dateModified: "2026-11-05T00:00:00+09:00"
};
