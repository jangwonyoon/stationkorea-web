import type { Station } from "../types";
import { stationPhotos } from "../station-photos";

// 원천: reel-studio episodes/maeil-geugil/konkuk-transfer (facts.md·caption.txt·pin.txt·episode.json)
export const konkukUniv: Station = {
  slug: "konkuk-univ",
  photo: stationPhotos["konkuk-univ"],
  no: 3,
  name: "건대입구역",
  lines: ["2", "7"],
  section: "transfer",
  sign: { line: "2", prev: "성수", next: "구의", en: "Konkuk Univ." },
  question: "건대입구역, 엘리베이터가 있어도 환승은 왜 따로 살펴야 할까?",
  seoTitle: "건대입구역 2·7호선, 승강장 접근과 휠체어 환승의 차이",
  answer: "서울시의 2025년 12월 발표에서 건대입구역 2·7호선의 승강장 접근과 휠체어 환승 개선은 별개로 다뤄졌으므로, 엘리베이터로 승강장에 갈 수 있다는 사실만으로 두 노선 사이 환승 경로까지 알 수는 없다.",
  teaser: "승강장까지 가는 길과 두 노선을 갈아타는 길을 나누어 봅니다.",
  crossSection: {
    aiGenerated: false,
    src: "/images/station/konkuk-univ-section.jpg",
    alt: "2022년 연구 보도의 건대입구역 일반 환승거리 77m와 교통약자 환승시간에 가정한 보행속도 0.78m/s를 곱한 환산 지표 1,404m를 구분한 설명 그림.",
    caption: "건대입구역 2·7호선 환승 연구 보도의 두 수치. 1,404m는 시간에서 환산한 지표이며 현재 실제 이동 경로의 길이가 아닙니다(2022년 기준).",
  },
  ogImage: "/images/station/konkuk-univ-og.jpg",
  stats: [
    {
      value: "77m",
      label: "2호선↔7호선 일반 환승거리",
      asOf: "2022년 조사 기준",
      sourceIds: ["khan-2022"],
    },
    {
      value: "1,404m",
      label: "교통약자 환승시간에 가정한 보행속도 0.78m/s를 곱한 환산 지표. 실제 보행 경로 길이는 미확인",
      asOf: "2022년 조사 기준",
      sourceIds: ["khan-2022"],
    },
    {
      value: "108,888명",
      label: "평일 환승 인원, 서울교통공사 73개 환승역 중 11위",
      asOf: "2026-06-30 기준",
      sourceIds: ["seoulmetro-transfer-count"],
    },
  ],
  pin: {"text": "하차 위치는 자료 기준일의 경로별 안내입니다. 시간은 개인 걸음걸이에 따라 달라지는 참고값이며, 엘리베이터 이용 경로의 시간으로 확인한 값은 아닙니다.", "sourceIds": ["seoulmetro-transfer-info"]},
  transfers: [
    { ride: { line: "2", direction: "구의 방면" }, to: { line: "7", direction: "자양 방면" }, car: "8-3", time: "3분 44초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "2", direction: "구의 방면" }, to: { line: "7", direction: "어린이대공원 방면" }, car: "7-3", time: "5분 25초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "2", direction: "성수 방면" }, to: { line: "7", direction: "자양·어린이대공원 방면" }, car: "3-2", time: "3분 49초~5분 35초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "7", direction: "자양 방면" }, to: { line: "2", direction: "구의·성수 방면" }, car: "1-1", time: "3분 44~49초", sourceId: "seoulmetro-transfer-info" },
    { ride: { line: "7", direction: "어린이대공원 방면" }, to: { line: "2", direction: "구의·성수 방면" }, car: "8-4", time: "5분 25~35초", sourceId: "seoulmetro-transfer-info" },
  ],
  reel: {
    url: "https://www.instagram.com/reel/DfBF0puToTl/",
    thumbnail: "/images/station/konkuk-univ-reel.jpg",
    postedAt: "2026-10-28T09:00:00+09:00",
    notice: "영상의 1,400m 표시는 실제 이동 경로를 잰 값이 아닙니다.",
  },
  series: {"title": "역을 파헤치다", "description": "역의 연결 구조와 그 배경을 풀어, 같은 길을 다르게 움직이게 되는 이유를 설명합니다."},
  body: [
    {
      "heading": "승강장에 도착하는 것과 갈아타는 것",
      "paragraphs": [
        {
          "text": "‘1역사 1동선’은 교통약자가 엘리베이터를 이용해 지상에서 승강장까지 다른 사람의 도움 없이 이동할 수 있는 길을 뜻한다. 이 기준이 확인하는 것은 역 바깥과 승강장 사이의 연결이다. 환승할 때는 여기에 다른 노선 승강장까지 이어지는 길이 필요하다. 서울시의 2025년 12월 발표도 엘리베이터 동선 확보와 환승 개선을 별도 단계로 구분한다.",
          "sourceIds": [
            "seoul-access-2025"
          ]
        },
        {
          "text": "건대입구의 과거 사례는 두 연결이 어떻게 달라지는지 보여 준다. 2022년 연구를 소개한 경향신문 보도에서 연구자는 휠체어로 7호선에서 2호선으로 갈아타는 길을 설명했다. 지하의 7호선 승강장에서 지상으로 올라온 뒤 바깥 도로와 횡단보도를 지나 다시 지상 위 2호선 승강장으로 올라가는 동선이었다. 승강장의 높이 차이와 함께, 두 승강장 사이에서 역 바깥을 거친다는 점을 보여 준다.",
          "sourceIds": [
            "khan-2022"
          ]
        }
      ]
    },
    {
      "heading": "1,404m는 무엇을 계산한 값인가",
      "paragraphs": [
        {
          "text": "이 보도는 건대입구의 일반 환승거리 77m와 교통약자 환승거리 1,404m를 함께 제시했다. 보도에 따르면 1,404m는 교통약자 환승지도에 적힌 시간에 장애인 보행속도로 가정한 초속 0.78m를 곱해 거리로 환산한 지표다. 바닥을 따라 경로를 직접 잰 길이가 아니다.",
          "sourceIds": [
            "khan-2022"
          ]
        },
        {
          "text": "그러므로 77m와 1,404m를 나란히 놓고 실제 길이도 약 18배라고 읽을 수는 없다. 바깥을 거치는 동선의 설명과 시간에서 환산한 수치는 서로 다른 정보를 전한다. 이 기사에서는 당시 원 경로도와 계산의 상세 대응, 현재 실제 이동거리까지는 확인하지 못했다.",
          "sourceIds": [
            "khan-2022"
          ]
        }
      ]
    },
    {
      "heading": "바깥을 거치는 환승을 개선하려는 계획",
      "paragraphs": [
        {
          "text": "서울시는 2025년 12월 휠체어 이용자의 환승을 개선하는 방안으로 건대입구를 내부 환승통로 신설 대상안에 포함했다. 각 노선의 승강장에 도착할 수 있도록 하는 데서 더 나아가, 노선 사이를 연결하는 길을 개선하겠다는 계획이다.",
          "sourceIds": [
            "seoul-access-2025"
          ]
        },
        {
          "text": "이 발표를 새 환승통로가 이미 열렸다는 안내로 읽어서는 안 된다. 이 기사에서 확인한 것은 대상안에 포함됐다는 사실이며, 건대입구의 공사 완료 여부와 현재 이용 가능한 전체 경로는 확인하지 못했다. 엘리베이터를 이용해 갈아탈 때는 아래 일반 환승 안내의 칸·시간과 별도로, 이용할 수 있는 경로와 시설 운영 상태를 확인해야 한다.",
          "sourceIds": [
            "seoul-access-2025",
            "seoulmetro-transfer-info"
          ]
        }
      ]
    }
  ],
  qna: [],
  sources: [
    {"id": "seoul-access-2025", "org": "서울특별시 교통실 도시철도과", "title": "서울 지하철 全역사 엘리베이터 설치 완료… 환승은 짧게, 시민 일상은 더 길게", "date": "2025-12-29", "url": "https://www.seoul.go.kr/news/news_report.do?nttNo=449358"},
    {
      id: "khan-2022",
      org: "경향신문",
      title: "「투명장벽의 도시①」(정예원 연구·무의 교통약자 환승지도 인용)",
      date: "2022-10-05",
      url: "https://www.khan.co.kr/article/202210051114011",
    },
    {
      id: "seoulmetro-transfer-count",
      org: "서울교통공사",
      title: "환승역 환승인원 정보",
      date: "2026-06-30 기준",
      url: "https://www.data.go.kr/data/15062858/fileData.do",
    },
    {
      id: "seoulmetro-transfer-info",
      org: "서울교통공사",
      title: "서울 도시철도 환승정보(환승 경로 안내)",
      date: "2026-09-01 기준",
      url: "https://www.data.go.kr/data/15098252/fileData.do",
    },
  ],
  datePublished: "2026-10-29T09:00:00+09:00",
  dateModified: "2026-11-02T22:24:34+09:00",
  corrections: [
    {"date": "2026-11-02", "before": "반대쪽 끝 칸에서 내리면 최대 2분 47초를 더 걷습니다.", "after": "하차 위치는 자료 기준일의 경로별 안내입니다. 시간은 개인 걸음걸이에 따라 달라지는 참고값이며, 엘리베이터 이용 경로의 시간으로 확인한 값은 아닙니다.", "reason": "인용한 서울교통공사 환승정보에서 반대쪽 끝 칸 하차에 따른 추가시간 2분 47초의 산정 근거를 확인하지 못해 해당 수치를 삭제하고 자료의 이용 범위를 안내했습니다."},
    {
      date: "2026-11-01",
      before: "휠체어 환승의 실제 이동 경로가 1,404m이며 일반 경로보다 물리적으로 18배 길다",
      after: "2022년 연구 보도의 1,404m는 환승시간에 가정한 보행속도 0.78m/s를 곱한 환산 지표. 실제 이동 경로 길이와 현재 경로는 확인하지 못함",
      reason: "보도에 명시된 산정법을 반영하고 실제 보행거리처럼 읽히는 제목·본문·그림을 정정",
    },
    {
      date: "2026-10-30",
      before: "7호선 자양 방면 1-1, 2호선 구의 방면 8-3에서 내리면 환승 3분 44초",
      after: "2호선 구의 방면에서 7호선 자양 방면은 8-3(3분 44초), 어린이대공원 방면은 7-3(5분 25초). 2호선 성수 방면은 3-2(3분 49초~5분 35초). 7호선 자양 방면은 1-1(3분 44~49초), 어린이대공원 방면은 8-4(5분 25~35초)",
      reason: "갈아탈 방면 구분과 반대 방면 칸·시간 누락을 서울교통공사 환승정보(2026-09-01 기준)로 정정",
    },
  ],
};
