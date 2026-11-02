import type { Station } from "../types";

// 원천: reel-studio episodes/maeil-geugil/sadang-transfer (facts.md·caption.txt·pin.txt·episode.json)
export const sadang: Station = {
  slug: "sadang",
  no: 2,
  name: "사당역",
  lines: ["2", "4"],
  section: "transfer",
  sign: { line: "2", prev: "방배", next: "낙성대", en: "Sadang" },
  question: "사당역에서 2호선으로 갈아탈 때, 왜 방면부터 확인해야 할까?",
  seoTitle: "사당역 4호선에서 2호선 환승, 방배·낙성대 방면을 먼저 보는 이유",
  answer: "사당역 지하 2층의 2호선 승강장은 방배·낙성대 방면으로 나뉘고, 지하 3층 4호선에서 갈아탈 때 서울교통공사가 안내하는 하차 위치도 갈아탈 방면에 따라 다르다(환승정보 2026년 9월 1일 기준).",
  teaser: "같은 4호선에서 내려도 갈아탈 2호선 방면에 따라 안내 하차 위치가 다르다.",
  ogImage: "/images/station/sadang-og.jpg",
  stats: [
    {
      value: "74m",
      label: "2호선↔4호선 최단 환승거리(초당 1.2m 기준 계산 1분 2초)",
      asOf: "2026-08-31 기준",
      sourceIds: ["seoulmetro-distance"],
    },
    {
      value: "3분 22초",
      label: "4호선 남태령 방면↔2호선 방배 방면 참고시간",
      asOf: "2026-09-01 기준",
      sourceIds: ["seoulmetro-transfer-info"],
    },
    {
      value: "160,478명",
      label: "평일 환승 인원, 서울교통공사 73개 환승역 중 6위",
      asOf: "2026-06-30 기준",
      sourceIds: ["seoulmetro-transfer-count"],
    },
  ],
  pin: {"text": "하차 위치는 서울교통공사가 안내하는 최단 환승경로 기준이다. 소요시간은 개인 걸음걸이와 속도에 따라 달라지는 참고값이다. 엘리베이터를 이용하는 환승 경로는 별도 확인이 필요하다.", "sourceIds": ["seoulmetro-transfer-info"]},
  transfers: [
    { ride: { line: "4", direction: "총신대입구 방면" }, to: { line: "2", direction: "방배 방면" }, car: "10-4", time: "3분 24초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "4", direction: "남태령 방면" }, to: { line: "2", direction: "방배 방면" }, car: "1-1", time: "3분 22초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "4", direction: "총신대입구 방면" }, to: { line: "2", direction: "낙성대 방면" }, car: "4-2", time: "1분 55초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "4", direction: "남태령 방면" }, to: { line: "2", direction: "낙성대 방면" }, car: "7-3", time: "1분 51초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "2", direction: "방배 방면" }, to: { line: "4", direction: "총신대입구·남태령 방면" }, car: "6-3", time: "3분 22~24초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "2", direction: "낙성대 방면" }, to: { line: "4", direction: "총신대입구·남태령 방면" }, car: "5-3", time: "1분 51~55초", sourceId: "seoulmetro-transfer-info" },
  ],
  reel: {
    notice: "기존 영상의 74m는 최단 환승거리이며, 3분 22초는 4호선 남태령 방면과 2호선 방배 방면 사이의 참고시간입니다. 두 값은 같은 경로와 조건인지 확인되지 않아 통제에 따른 지연으로 비교할 수 없습니다.",
    url: "https://www.instagram.com/reel/De_BAeuiU93/",
    thumbnail: "/images/station/sadang-reel.jpg",
    postedAt: "2026-10-27T13:38:00+09:00",
  },
  series: {"title": "역을 파헤치다", "description": "역의 연결 구조와 그 배경을 풀어, 같은 길을 다르게 움직이게 되는 이유를 설명합니다."},
  body: [
    {
      "heading": "위층의 두 승강장, 아래층의 한 승강장",
      "paragraphs": [
        {
          "text": "사당역 2호선과 4호선은 한 층 차이로 만난다. 서울교통공사 안내도에서 2호선 승강장은 지하 2층, 4호선 승강장은 지하 3층에 있다. 두 노선의 승강장 모양은 다르다. 2호선은 선로 양쪽에 방배 방면과 낙성대 방면 승강장이 따로 있는 상대식이고, 4호선은 두 선로 사이에 승강장 하나가 놓인 섬식이다.",
          "sourceIds": [
            "seoulmetro-map-2",
            "seoulmetro-map-4"
          ]
        },
        {
          "text": "4호선에서 내리면 총신대입구 방면 열차와 남태령 방면 열차의 승객이 같은 승강장을 이용한다. 그러나 위층의 2호선으로 갈아탈 때는 목적지에 맞는 승강장으로 나뉜다. 공식 안내도에는 2호선 방배 방면으로 이어지는 연결이 4호선 승강장의 남태령 쪽 끝에, 낙성대 방면으로 이어지는 연결은 그와 다른 위치에 표시돼 있다. ‘2호선 갈아타는 곳’에서 방배·낙성대라는 방면까지 읽어야 하는 이유다.",
          "sourceIds": [
            "seoulmetro-map-2",
            "seoulmetro-map-4"
          ]
        }
      ]
    },
    {
      "heading": "같은 열차에서도 갈아탈 방면에 따라 하차 안내가 다르다",
      "paragraphs": [
        {
          "text": "사당역에 도착하기 전에는 지금 탄 열차와 갈아탈 열차의 방면을 함께 확인한다. 서울교통공사의 2026년 9월 1일 기준 환승정보는 4호선 총신대입구 방면 열차에서 2호선 방배 방면으로 갈아탈 때는 10-4, 낙성대 방면으로 갈아탈 때는 4-2를 최단 환승경로의 하차 위치로 안내한다. 같은 열차를 타고 와도 갈아탈 2호선의 방면에 따라 안내 위치가 다르다.",
          "sourceIds": [
            "seoulmetro-transfer-info"
          ]
        },
        {
          "text": "반대편 선로를 달려오는 4호선 남태령 방면 열차는 하차 안내가 다르다. 방배 방면으로 갈 때는 1-1, 낙성대 방면으로 갈 때는 7-3이다. 먼저 지금 탄 4호선 열차의 방면을 찾고, 다음으로 갈아탈 2호선의 방면을 고르면 된다. ‘4호선에서 2호선으로’라는 노선 번호만으로는 안내 하차 위치를 하나로 정할 수 없다.",
          "sourceIds": [
            "seoulmetro-transfer-info"
          ]
        }
      ]
    },
    {
      "heading": "74m는 모든 환승 경로의 길이가 아니다",
      "paragraphs": [
        {
          "text": "사당역의 최단 환승거리는 74m다. 서울교통공사의 2026년 8월 31일 기준 거리 자료에 있는 값이며, 함께 적힌 1분 2초는 74m를 초당 1.2m의 보행속도로 나눈 계산값이다. 이 자료는 2호선과 4호선 사이의 최단거리를 제시하지만 방배·낙성대 방면이나 하차 문은 구분하지 않는다.",
          "sourceIds": [
            "seoulmetro-distance"
          ]
        },
        {
          "text": "2026년 9월 1일 기준 문 위치별 환승정보는 방면에 따라 다른 시간을 제시한다. 2호선 방배 방면과 4호선 사이에는 3분 22~24초, 낙성대 방면과 4호선 사이에는 1분 51~55초다. 이 가운데 3분 22초는 4호선 남태령 방면과 2호선 방배 방면 사이의 안내값이다. 이 값들은 개인 걸음걸이와 속도에 따라 달라지는 참고시간이다. 두 자료만으로는 74m와 3분 22초를 같은 길의 거리와 실제 소요시간으로 짝지어 통로 통제 때문에 생긴 지연으로 설명할 수 없다. 사당역에서 안내 하차 위치를 찾을 때는 방면별 환승표를 읽어야 한다.",
          "sourceIds": [
            "seoulmetro-transfer-info",
            "seoulmetro-distance"
          ]
        }
      ]
    }
  ],
  qna: [],
  sources: [
    {
      "id": "seoulmetro-distance",
      "org": "서울교통공사",
      "title": "환승역 거리·소요시간 정보",
      "date": "2026-08-31 기준",
      "url": "https://www.data.go.kr/data/15044419/fileData.do"
    },
    {
      "id": "seoulmetro-transfer-info",
      "org": "서울교통공사",
      "title": "서울 도시철도 환승정보(환승 경로 안내)",
      "date": "2026-09-01 기준",
      "url": "https://www.data.go.kr/data/15098252/fileData.do"
    },
    {
      "id": "seoulmetro-transfer-count",
      "org": "서울교통공사",
      "title": "환승역 환승인원 정보",
      "date": "2026-06-30 기준",
      "url": "https://www.data.go.kr/data/15062858/fileData.do"
    },
    {
      "id": "seoulmetro-map-2",
      "org": "서울교통공사",
      "title": "2호선 사당역 역 이용 및 비상대피 안내도",
      "date": "개정일 미표기 · 2026-11-02 확인",
      "url": "https://www.seoulmetro.co.kr/common/resources/cyber/fileView3.jsp?fileName=station_0226.jpg"
    },
    {
      "id": "seoulmetro-map-4",
      "org": "서울교통공사",
      "title": "4호선 사당역 역 이용 안내도 및 비상대피로",
      "date": "개정일 미표기 · 2026-11-02 확인",
      "url": "https://www.seoulmetro.co.kr/common/resources/cyber/fileView3.jsp?fileName=station_0433.jpg"
    }
  ],
  datePublished: "2026-10-29T09:00:00+09:00",
  dateModified: "2026-11-02T21:21:45+09:00",
  corrections: [
    {"date": "2026-11-02", "before": "74m인데 3분 22초인 것은 펜스·셔터로 돌아가게 하기 때문이라는 설명", "after": "74m는 최단거리이며 문 위치별 참고시간과 같은 조건의 값인지 확인되지 않아 통제에 따른 지연이라는 설명 삭제", "reason": "거리 자료의 계산값과 방면별 환승 참고시간을 같은 경로의 값으로 연결한 설명을 바로잡았다."},
    {"date": "2026-11-02", "before": "보행 1분 2초, 막힘 없이 걸을 때 기준, 끝 칸에서 최대 2분 47초 추가", "after": "초당 1.2m 기준 계산 1분 2초, 걸음걸이·속도에 따라 달라지는 참고시간으로 구분하고 근거를 확인하지 못한 추가시간 삭제", "reason": "서울교통공사 자료의 정의에 맞게 계산값과 참고시간을 구분했다."},
    {"date": "2026-11-02", "before": "현재형 펜스·셔터 통제와 출퇴근 시간 폐쇄 안내", "after": "현행 운영시간 안내 삭제", "reason": "근거로 사용한 자료는 2021년 칼럼과 사진이며 현재 운영 여부와 시간을 확인하지 못했다."},
    {"date": "2026-11-02", "before": "지상 59층·2034년 완공 목표를 현재 계획으로 소개한 미래 Q&A", "after": "현재 확정 계획으로 제시한 안내 삭제", "reason": "2025년 보도의 계획을 현재 확정안처럼 제시한 표현을 바로잡았다. 2034년 목표가 공식 폐기됐다는 뜻은 아니다."},
    {
      date: "2026-10-30",
      before: "2호선 낙성대 방면은 4-2, 7-3",
      after: "2호선 낙성대 방면으로는 총신대입구 방면 열차 4-2, 남태령 방면 열차 7-3",
      reason: "4호선 열차 방면 구분 누락, 서울교통공사 환승정보 원자료로 확인",
    },
  ],
};
