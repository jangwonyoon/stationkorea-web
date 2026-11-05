import type { MagazineArticle } from "../articles";
import { stationPhotos } from "../station-photos";

export const gongdeokConnections: MagazineArticle = {
  slug: "gongdeok-connections",
  image: stationPhotos["gongdeok-connections"],
  section: "transfer",
  question: "공덕역의 네 노선은 지하에서 어떻게 연결될까?",
  answer: "공덕역은 5·6호선 쪽 승강장과 경의중앙선·공항철도 쪽 승강장이 옆으로 나뉘어 연결된 역으로, 공항철도에 갈아타려면 층을 바꾸는 이동과 두 공간 사이의 이동을 함께 생각해야 한다.",
  answerSourceIds: [
    "G1"
  ],
  station: {"name": "공덕역", "lines": ["5", "6", "gyeongui-jungang", "arex"], "sign": {"line": "5", "prev": "마포", "next": "애오개", "en": "Gongdeok"}, "sourceIds": ["seoul-tourist-map-en-202603", "seoul-route-map-202509"]},
  transfers: [
  {
    "ride": {
      "line": "5",
      "direction": "마포 방면"
    },
    "to": {
      "line": "arex",
      "direction": "홍대입구 방면"
    },
    "car": "1-1",
    "toCar": "6-1",
    "time": "8분 34초",
    "sourceId": "G4"
  },
  {
    "ride": {
      "line": "5",
      "direction": "마포 방면"
    },
    "to": {
      "line": "arex",
      "direction": "서울역 방면"
    },
    "car": "1-1",
    "toCar": "1-4",
    "time": "7분 38초",
    "sourceId": "G4"
  },
  {
    "ride": {
      "line": "5",
      "direction": "애오개 방면"
    },
    "to": {
      "line": "arex",
      "direction": "홍대입구 방면"
    },
    "car": "8-4",
    "toCar": "6-1",
    "time": "8분 34초",
    "sourceId": "G4"
  },
  {
    "ride": {
      "line": "5",
      "direction": "애오개 방면"
    },
    "to": {
      "line": "arex",
      "direction": "서울역 방면"
    },
    "car": "8-4",
    "toCar": "1-4",
    "time": "7분 38초",
    "sourceId": "G4"
  }
],
  body: [
    {
      heading: "층수만으로는 그릴 수 없는 역",
      paragraphs: [
        {
          text: "공덕이라는 이름 아래 모인 네 노선이 모두 한 지점에서 위아래로 포개져 있는 것은 아니다. 2026년 11월 5일 확인한 공항철도의 공식 구내도를 보면 5·6호선이 만나는 공간이 한쪽에, 경의중앙선과 공항철도가 놓인 공간이 다른 쪽에 있고 그 사이를 통로가 잇는다. 노선도에서는 하나의 환승역이지만, 역 안에서는 다음 열차가 있는 공간까지 이동하는 과정이 필요하다.",
          sourceIds: [
            "G1"
          ]
        },
        {
          text: "승강장이 있는 층도 다르다. 서울교통공사의 2025년 8월 14일 기준 역사심도 자료에서 5호선은 지하 3층, 6호선은 지하 2층이다. 공항철도 안내도에는 경의중앙선 승강장이 지하 2층, 공항철도 승강장이 지하 5층으로 표시된다. 여기서 6호선과 경의중앙선이 모두 지하 2층이라는 사실은 같은 승강장을 쓴다는 뜻이 아니다. 서로 떨어진 두 공간의 층수 표시가 같다는 뜻이다.",
          sourceIds: [
            "G2",
            "G3"
          ]
        },
        {
          text: "5호선에서 공항철도로 갈 때는 ‘지하 3층에서 지하 5층으로 내려간다’는 말만으로 길을 설명하기 어렵다. 어느 통로로 공항철도 쪽으로 건너가는지도 알아야 한다. 층수는 승강장이 있는 층을 알려 주지만, 그곳까지 연결되는 길 전체를 보여 주지는 않는다. 구내도의 두 공간과 연결 통로를 함께 보는 이유다. 이 배치만으로 통로를 그렇게 설계한 이유까지 알 수 있는 것은 아니다.",
          sourceIds: []
        }
      ]
    },
    {
      heading: "같은 환승역에서도 도착할 승강장이 다르다",
      paragraphs: [
        {
          text: "공덕역의 환승 안내 시간은 갈아탈 열차의 방향에 따라 구분된다. 서울교통공사의 2026년 9월 1일 기준 환승정보는 내리는 열차의 방향뿐 아니라 내릴 문과 갈아탈 승강장의 문을 구분한다. 5호선 마포 방면 1-1 또는 애오개 방면 8-4에서 내려 공항철도로 가는 안내는 서울역 방면 1-4까지 7분 38초, 홍대입구 방면 6-1까지 8분 34초다. 1-1처럼 붙인 숫자는 열차의 호차와 출입문 번호를 뜻한다. 두 값은 지정된 문 사이를 이동하는 안내 시간이며, 개인의 걸음걸이와 속도에 따라 달라지는 참고값이다.",
          sourceIds: [
            "G4"
          ]
        },
        {
          text: "공항철도는 방향별 승강장이 선로 양옆으로 나뉜 상대식 구조다. ‘공항철도에 도착했다’는 것과 ‘내가 탈 방향의 승강장에 도착했다’는 것을 구별해야 한다. 서울역으로 갈 것인지, 홍대입구를 지나 공항 쪽으로 갈 것인지에 따라 따라갈 안내가 달라진다.",
          sourceIds: [
            "G1"
          ]
        }
      ]
    },
    {
      heading: "지하의 철도는 지상에 숲길을 남겼다",
      paragraphs: [
        {
          text: "공덕에서 철도의 자리를 읽는 일은 개찰구 밖에서도 이어진다. 한국철도시설공단은 2019년 설명자료에서 경의선 지하화로 생긴 선로 위 공간을 서울시와의 협약에 따라 공원으로 활용했다고 밝혔다. 지하에 열차가 다니는 공간을 만들면서 지상 철도 부지의 쓰임도 바뀌었다. 이 변화는 환승통로의 설계 이유와는 별개지만, 공덕에서 철도와 동네가 만나는 방식을 보여 준다.",
          sourceIds: [
            "G5"
          ]
        },
        {
          text: "서울시 경의선숲길 안내는 신수·대흥·염리동 구간을 찾는 역으로 공덕역을 들고, 새창고개·원효로 구간도 공덕역에서 이어진다고 설명한다. 공원은 2012년 대흥동 구간부터 조성돼 2016년 전체 구간이 갖춰졌다. 공덕은 열차 사이를 옮겨 가는 곳이면서, 옛 철도 부지를 따라 동네를 걷기 시작하는 곳이기도 하다. 승강장에서는 다음 노선과 방향을, 지상에서는 숲길의 어느 구간으로 갈지를 구분하면 같은 역의 서로 다른 길이 보인다.",
          sourceIds: [
            "G6"
          ]
        }
      ]
    },
    {
      heading: "이용 전에 확인할 것",
      paragraphs: [
        {
          text: "공항철도 환승은 노선 이름과 함께 서울역·홍대입구 방면 표지를 확인한다. 안내 시간은 열차 대기 시간을 포함한 여행 시간이나 엘리베이터 경로의 소요시간으로 사용하지 않는다.",
          sourceIds: []
        },
        {
          text: "경의선숲길 관리사무소의 안내 주소는 서울 마포구 새창로 37, 공덕역 10번 출구다. 목적 구간에 따라 공원 지도를 먼저 확인한다.",
          sourceIds: [
            "G6"
          ]
        }
      ]
    }
  ],
  sources: [
    {"id": "seoul-tourist-map-en-202603", "org": "서울특별시·서울관광재단", "title": "2026 Seoul Tourist Map, 2쪽 Seoul Metro Map", "date": "2026년 3월 게시본 · 2026-11-05 확인", "url": "https://english.seoul.go.kr/wp-content/uploads/2026/03/2026_touristmap_EN.pdf"},
    {"id": "seoul-route-map-202509", "org": "서울특별시", "title": "서울 지하철 노선도 (Route Map)", "date": "2025년 9월 게시본 · 2026-11-05 확인", "url": "https://english.seoul.go.kr/wp-content/uploads/2025/09/route-map.pdf"},

    {
      id: "G1",
      org: "공항철도",
      title: "공덕역 주요시설·비상대피로 구내도",
      date: "게시일 미표시 · 2026-11-05 확인",
      url: "https://www.airportrailroad.com/train/normal/info/020"
    },
    {
      id: "G2",
      org: "서울교통공사",
      title: "역사심도정보",
      date: "2025-08-14 기준 · 2026-11-05 확인",
      url: "https://www.data.go.kr/data/15071319/fileData.do"
    },
    {
      id: "G3",
      org: "공항철도",
      title: "공덕역 비상대피로 구내도",
      date: "게시일 미표시 · 2026-11-05 확인",
      url: "https://www.airportrailroad.com/common/images/contents/cont_03_04_02_09.jpg"
    },
    {
      id: "G4",
      org: "서울교통공사",
      title: "서울 도시철도 환승정보",
      date: "2026-09-01 기준 · 2026-11-05 확인",
      url: "https://www.data.go.kr/data/15098252/fileData.do"
    },
    {
      id: "G5",
      org: "한국철도시설공단(현 국가철도공단)",
      title: "공덕역 경의선 용지 개발 관련 보도참고자료",
      date: "2019-04-23 발표 · 2026-11-05 확인",
      url: "https://www.kr.or.kr/boardCnts/view.do?boardID=52&boardSeq=1111940"
    },
    {
      id: "G6",
      org: "서울시",
      title: "경의선숲길 공원소개·구간별 이용 안내",
      date: "게시일 미표시 · 2026-11-05 확인",
      url: "https://parks.seoul.go.kr/content.do?key=2604300008"
    }
  ],
  related: [
    {
      title: "홍대입구역의 세 노선은 어떻게 이어질까?",
      href: "/article/hongdae-transfer/"
    },
    {
      title: "이수역 환승 안내의 2분 23초와 5분 24초는 무엇이 다를까?",
      href: "/article/isu-guide-times/"
    }
  ],
  datePublished: "2026-11-05T00:00:00+09:00",
  dateModified: "2026-11-05T00:00:00+09:00"
};
