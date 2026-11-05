import type { MagazineArticle } from "../articles";
import { stationPhotos } from "../station-photos";

export const seoulStationConnections: MagazineArticle = {
  slug: "seoul-station-connections",
  image: stationPhotos["seoul-station-connections"],
  section: "transfer",
  question: "서울역에서는 왜 공항철도 일반열차로 갈아탈 때 동서와 위아래를 함께 이동할까?",
  answer: "서울역에서 1·4호선과 철길 반대쪽의 공항철도 일반열차를 잇는 길은 지하 3층 환승 연결부에서 지하 7층 승강장까지 이어져 동서 이동과 수직 이동이 함께 필요하다.",
  answerSourceIds: ["S1", "S4"],
  station: {"name": "서울역", "lines": ["1", "4", "gyeongui-jungang", "arex", "gtx-a"], "sign": {"line": "1", "prev": "시청", "next": "남영", "en": "Seoul Station"}, "sourceIds": ["seoul-tourist-map-en-202603", "seoul-route-map-202509", "molit-gtxa-operation-20250227"]},
  body: [
    {
      heading: "같은 이름 아래 서로 다른 높이",
      paragraphs: [
        {
          text: "서울역이라는 이름만으로는 갈아타는 길을 그리기 어렵다. 지상에서 열차를 타는 서울역과 지하철 서울역, 공항철도 서울역은 서로 이어져도 출발점과 도착점의 위치와 층이 다르다. 공항철도 공식 안내도를 보면 이 차이가 구체적으로 드러난다. 일반열차 표를 사는 곳과 1·4호선으로 이어지는 통로는 지하 3층에 있고, 일반열차와 직통열차의 승강장은 지하 7층에 있다. 환승통로에 들어섰다고 곧바로 공항철도 열차 앞에 도착하는 구조가 아니다. 연결부를 지난 뒤에도 승강장이 있는 층까지 이동해야 한다.",
          sourceIds: ["S1"]
        },
        {
          text: "이때 수평으로 건너는 이유와 아래로 내려가는 이유를 나누어 보면 동선이 읽힌다. 서울시 매체에 실린 시민기자 한우진의 2015년 해설은 1·4호선이 서울역 동쪽, 공항철도가 서쪽에 있다고 설명한다. 국토교통부가 같은 해 공개한 조감도에는 지상의 철도 선로 아래로 두 시설을 잇는 통로가 표시돼 있다. 서로 떨어진 역 시설을 잇는 길을 따라 동서로 건너고, 공항철도 승강장의 높이에 맞추어 내려간다. 지하 3층의 연결부와 지하 7층의 승강장은 이 이동의 서로 다른 지점이다.",
          sourceIds: ["S4", "S8"]
        }
      ]
    },
    {
      heading: "지상 대합실을 거치던 길에 지하 연결이 더해졌다",
      paragraphs: [
        {
          text: "지금의 연결은 처음부터 갖추어진 것이 아니다. 국토교통부가 2015년 3월 발표한 자료에 따르면, 이전에는 1·4호선에서 내린 승객이 개찰구를 나와 서울역 대합실을 통과한 뒤 공항철도로 이동해야 했다. 이미 지하에 내려와 있던 사람이 다시 지상의 철도역을 거쳐 다른 지하역으로 들어가는 순서였다.",
          sourceIds: ["S2"]
        },
        {
          text: "2015년 3월 28일 개통한 지하 환승통로는 이 중 지상 대합실을 거치는 부분을 바꾸었다. 무빙워크와 에스컬레이터, 엘리베이터를 설치한 통로가 두 철도 시설을 지하에서 연결했다. 통로가 생긴 뒤에는 개찰구 밖의 대합실을 돌아가지 않고 두 지하역 사이를 이동하게 됐다. 동서로 건너는 길은 지하로 바뀌었지만 공항철도 일반열차를 타려면 여전히 연결부에서 승강장까지 내려가야 한다.",
          sourceIds: ["S2", "S3", "S1"]
        }
      ]
    },
    {
      heading: "철길을 건너는 문제는 역 밖에도 이어진다",
      paragraphs: [
        {
          text: "서울역의 동서를 잇는 일은 환승객만의 문제로 끝나지 않는다. 서울기록원은 옛 서울역고가도로가 철도를 횡단하고 서울역 동서를 연결하던 시설이었다고 설명한다. 이 고가는 2015년 12월 차량 통제에 들어갔고, 2017년 보행공간으로 시민에게 개방됐다. 지하 환승통로가 열차 사이를 잇는 동안, 지상에서는 기존 도로를 사람들이 걷는 길로 바꾸는 별도의 변화가 진행된 셈이다.",
          sourceIds: ["S5"]
        },
        {
          text: "서울시의 2020년 소개에서 서울로7017은 서울역과 만리동광장, 문화역서울284 등을 걸어서 접하는 길로 설명된다. 문화역서울284 역시 사용을 마친 역 건물에 새 쓰임을 더한 장소다. 문화역서울284 홈페이지 연혁에 따르면 구 서울역사는 2004년 철도역 영업을 마쳤고, 2011년 복합문화공간으로 문을 열었다. 옛 역 건물을 보러 오는 사람과 기차를 갈아타는 사람은 서울역이라는 같은 장소를 향해도 최종 목적지가 다르다.",
          sourceIds: ["S6", "S7"]
        },
        {
          text: "서울역 안팎에는 철길을 가로지르는 길이 서로 다른 높이에 놓여 있다. 지하 환승통로는 노선과 노선을 잇고, 고가 보행길은 철길 양쪽의 동네와 문화공간을 잇는다. 공항철도로 갈아타는 길에서 드러나는 동서의 연결 문제는 역 밖을 걷는 길에도 이어진다.",
          sourceIds: ["S2", "S5", "S6"]
        }
      ]
    },
    {
      heading: "이용 전에 확인할 것",
      paragraphs: [
        {
          text: "공항철도 일반열차와 직통열차는 승차권 구입 장소가 다르다. 공항철도는 서울역 직통열차 고객안내센터를 지하 2층으로 안내하며, 일반열차 표사는 곳은 지하 3층 안내도에 표시한다. 엘리베이터가 필요한 이동은 현장 승강기 안내와 역무실의 안내를 따른다.",
          sourceIds: ["S9", "S1"]
        }
      ]
    }
  ],
  sources: [
    {"id": "seoul-tourist-map-en-202603", "org": "서울특별시·서울관광재단", "title": "2026 Seoul Tourist Map, 2쪽 Seoul Metro Map", "date": "2026년 3월 게시본 · 2026-11-05 확인", "url": "https://english.seoul.go.kr/wp-content/uploads/2026/03/2026_touristmap_EN.pdf"},
    {"id": "seoul-route-map-202509", "org": "서울특별시", "title": "서울 지하철 노선도 (Route Map)", "date": "2025년 9월 게시본 · 2026-11-05 확인", "url": "https://english.seoul.go.kr/wp-content/uploads/2025/09/route-map.pdf"},
    {"id": "molit-gtxa-operation-20250227", "org": "국토교통부·경기도교통정보센터", "title": "GTX-A가 더욱 편리해집니다", "date": "2025-02-27 발표 · 2026-11-05 확인", "url": "https://gits.gg.go.kr/web/newboard/3386.do?idx=196356932&mode=view&pageIndex=1&pageUnit=8&schBcode=&schCon=&schStr=&schType=list"},

    {
      id: "S1",
      org: "공항철도",
      title: "서울역 — 역 정보 및 층별 안내",
      date: "게시일 미표기 · 2026-11-05 확인",
      url: "https://www.airportrailroad.com/train/normal/info/010/0"
    },
    {
      id: "S2",
      org: "국토교통부·대한민국 정책브리핑",
      title: "서울역 지하철~공항철도 환승통로 개통",
      date: "2015-03-24 발표 · 2026-11-05 확인",
      url: "https://m.korea.kr/briefing/policyBriefingView.do?newsId=148792948"
    },
    {
      id: "S3",
      org: "대한민국 정책브리핑·정책기자 전형",
      title: "출퇴근 시간, 서울역 환승통로가 선사해준 ‘7분’",
      date: "2015-04-06 발행 · 2026-11-05 확인",
      url: "https://www.korea.kr/news/policyNewsView.do?newsId=148793298"
    },
    {
      id: "S4",
      org: "서울시 내 손안에 서울·시민기자 한우진",
      title: "서울역서 공항철도 갈아타기 쉬워졌어요",
      date: "2015-05-06 발행 · 2020-12-28 수정 · 2026-11-05 확인",
      url: "https://mediahub.seoul.go.kr/archives/866696"
    },
    {
      id: "S5",
      org: "서울기록원",
      title: "서울역고가도로 — 관리번호 GEOL-00583",
      date: "게시일 미표기 · 2026-11-05 확인",
      url: "https://archives.seoul.go.kr/authority/GEOL-00583"
    },
    {
      id: "S6",
      org: "서울시",
      title: "Seoullo 7017",
      date: "2020-07-08 게시 · 2026-11-05 확인",
      url: "https://english.seoul.go.kr/seoullo-7017/"
    },
    {
      id: "S7",
      org: "문화역서울284",
      title: "소개·연혁",
      date: "게시일 미표기 · 2026-11-05 확인",
      url: "https://www.seoul284.org/cms/content/view/253"
    },
    {
      id: "S8",
      org: "국토교통부",
      title: "서울역 환승통로 변경 전후 조감도",
      date: "2015-03-24 공개 · 2026-11-05 확인",
      url: "https://www.korea.kr/newsWeb/resources/attaches/2015.03/24/996479.jpg"
    },
    {
      id: "S9",
      org: "공항철도",
      title: "직통열차 소개",
      date: "게시일 미표기 · 2026-11-05 확인",
      url: "https://www.airportrailroad.com/train/express/introduce"
    }
  ],
  related: [
    {
      title: "홍대입구역의 세 노선은 어떻게 이어질까?",
      href: "/article/hongdae-transfer/"
    },
    {
      title: "김포공항역 서해선은 왜 주차장 자리 계획에서 환승 중심 위치로 바뀌었을까?",
      href: "/article/gimpo-plan-change/"
    }
  ],
  datePublished: "2026-11-05T00:00:00+09:00",
  dateModified: "2026-11-05T00:00:00+09:00"
};
