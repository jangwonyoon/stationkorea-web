import type { AroundSource, CongestionRow, Place, SadangExit } from "./types";

export const sadangSources = {
  "price": {
    "agency": "행정안전부",
    "title": "착한가격업소 현황",
    "url": "https://www.data.go.kr/data/3045247/fileData.do",
    "license": "이용허락범위 제한 없음",
    "asOf": "2026-09-30"
  },
  "dongjak": {
    "agency": "서울특별시 동작구",
    "title": "모범음식점 지정 현황",
    "url": "https://data.seoul.go.kr/dataList/OA-10602/S/1/datasetView.do",
    "license": "공공누리 1유형: 출처표시",
    "asOf": "2026-10-30"
  },
  "seocho": {
    "agency": "서울특별시 서초구",
    "title": "모범음식점 지정 현황",
    "url": "https://data.seoul.go.kr/dataList/OA-11064/S/1/datasetView.do",
    "license": "공공누리 1유형: 출처표시",
    "asOf": "2026-10-30"
  },
  "gwanak": {
    "agency": "서울특별시 관악구",
    "title": "모범음식점 지정 현황",
    "url": "https://data.seoul.go.kr/dataList/OA-11526/S/1/datasetView.do",
    "license": "공공누리 1유형: 출처표시",
    "asOf": "2026-10-30"
  },
  "congestion": {
    "agency": "서울교통공사",
    "title": "지하철혼잡도정보",
    "url": "https://www.data.go.kr/data/15071311/fileData.do",
    "license": "이용허락범위 제한 없음",
    "asOf": "2026-09-30"
  }
} satisfies Record<string, AroundSource>;

// 후보 검토·현장 도보 측정 전 초안. 현재 영업 여부나 추천 순위를 뜻하지 않는다.
export const sadangReview = { candidates: "pending", walkingMeasurement: "pending", exitMapping: "pending" } as const;

export const sadangPlaces: Place[] = [
{
  "id": "sadang-01",
  "name": "남미플랜트랩",
  "designation": {
    "agency": "행정안전부",
    "name": "착한가격업소",
    "year": null,
    "source": sadangSources.price
  },
  "menu": {
    "name": "치즈야채피자",
    "priceWon": 19000,
    "asOf": "2026-09-30"
  },
  "exit": null,
  "walkMinutes": null,
  "address": "서울특별시 서초구 방배천로4안길 55 (방배동) 2층",
  "maps": {
    "naver": "https://map.naver.com/p/search/%EB%82%A8%EB%AF%B8%ED%94%8C%EB%9E%9C%ED%8A%B8%EB%9E%A9%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%84%9C%EC%B4%88%EA%B5%AC%20%EB%B0%A9%EB%B0%B0%EC%B2%9C%EB%A1%9C4%EC%95%88%EA%B8%B8%2055%20%28%EB%B0%A9%EB%B0%B0%EB%8F%99%29%202%EC%B8%B5",
    "kakao": "https://map.kakao.com/link/search/%EB%82%A8%EB%AF%B8%ED%94%8C%EB%9E%9C%ED%8A%B8%EB%9E%A9%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%84%9C%EC%B4%88%EA%B5%AC%20%EB%B0%A9%EB%B0%B0%EC%B2%9C%EB%A1%9C4%EC%95%88%EA%B8%B8%2055%20%28%EB%B0%A9%EB%B0%B0%EB%8F%99%29%202%EC%B8%B5"
  },
  "asOf": "2026-09-30"
},
{
  "id": "sadang-02",
  "name": "배꼽시계",
  "designation": {
    "agency": "행정안전부",
    "name": "착한가격업소",
    "year": null,
    "source": sadangSources.price
  },
  "menu": {
    "name": "우렁쌈밥",
    "priceWon": 9000,
    "asOf": "2026-09-30"
  },
  "exit": null,
  "walkMinutes": null,
  "address": "서울특별시 동작구 동작대로7길 80 1층",
  "maps": {
    "naver": "https://map.naver.com/p/search/%EB%B0%B0%EA%BC%BD%EC%8B%9C%EA%B3%84%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%8F%99%EC%9E%91%EA%B5%AC%20%EB%8F%99%EC%9E%91%EB%8C%80%EB%A1%9C7%EA%B8%B8%2080%201%EC%B8%B5",
    "kakao": "https://map.kakao.com/link/search/%EB%B0%B0%EA%BC%BD%EC%8B%9C%EA%B3%84%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%8F%99%EC%9E%91%EA%B5%AC%20%EB%8F%99%EC%9E%91%EB%8C%80%EB%A1%9C7%EA%B8%B8%2080%201%EC%B8%B5"
  },
  "asOf": "2026-09-30"
},
{
  "id": "sadang-03",
  "name": "한울갈비",
  "designation": {
    "agency": "서울특별시 동작구",
    "name": "모범음식점",
    "year": 2019,
    "source": sadangSources.dongjak
  },
  "menu": {
    "name": "돼지갈비",
    "priceWon": null,
    "asOf": "2026-10-30"
  },
  "exit": null,
  "walkMinutes": null,
  "address": "서울특별시 동작구 동작대로1길 9, (사당동)",
  "maps": {
    "naver": "https://map.naver.com/p/search/%ED%95%9C%EC%9A%B8%EA%B0%88%EB%B9%84%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%8F%99%EC%9E%91%EA%B5%AC%20%EB%8F%99%EC%9E%91%EB%8C%80%EB%A1%9C1%EA%B8%B8%209%2C%20%28%EC%82%AC%EB%8B%B9%EB%8F%99%29",
    "kakao": "https://map.kakao.com/link/search/%ED%95%9C%EC%9A%B8%EA%B0%88%EB%B9%84%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%8F%99%EC%9E%91%EA%B5%AC%20%EB%8F%99%EC%9E%91%EB%8C%80%EB%A1%9C1%EA%B8%B8%209%2C%20%28%EC%82%AC%EB%8B%B9%EB%8F%99%29"
  },
  "asOf": "2026-10-30"
},
{
  "id": "sadang-04",
  "name": "참치마니아",
  "designation": {
    "agency": "서울특별시 동작구",
    "name": "모범음식점",
    "year": 2021,
    "source": sadangSources.dongjak
  },
  "menu": {
    "name": "참치",
    "priceWon": null,
    "asOf": "2026-10-30"
  },
  "exit": null,
  "walkMinutes": null,
  "address": "서울특별시 동작구 동작대로7길 12, 2층 (사당동)",
  "maps": {
    "naver": "https://map.naver.com/p/search/%EC%B0%B8%EC%B9%98%EB%A7%88%EB%8B%88%EC%95%84%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%8F%99%EC%9E%91%EA%B5%AC%20%EB%8F%99%EC%9E%91%EB%8C%80%EB%A1%9C7%EA%B8%B8%2012%2C%202%EC%B8%B5%20%28%EC%82%AC%EB%8B%B9%EB%8F%99%29",
    "kakao": "https://map.kakao.com/link/search/%EC%B0%B8%EC%B9%98%EB%A7%88%EB%8B%88%EC%95%84%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EB%8F%99%EC%9E%91%EA%B5%AC%20%EB%8F%99%EC%9E%91%EB%8C%80%EB%A1%9C7%EA%B8%B8%2012%2C%202%EC%B8%B5%20%28%EC%82%AC%EB%8B%B9%EB%8F%99%29"
  },
  "asOf": "2026-10-30"
},
{
  "id": "sadang-05",
  "name": "속초바다야",
  "designation": {
    "agency": "서울특별시 서초구",
    "name": "모범음식점",
    "year": 2018,
    "source": sadangSources.seocho
  },
  "menu": {
    "name": "모둠회",
    "priceWon": null,
    "asOf": "2026-10-30"
  },
  "exit": null,
  "walkMinutes": null,
  "address": "서울특별시 서초구 방배천로2길 12, 1층 (방배동)",
  "maps": {
    "naver": "https://map.naver.com/p/search/%EC%86%8D%EC%B4%88%EB%B0%94%EB%8B%A4%EC%95%BC%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%84%9C%EC%B4%88%EA%B5%AC%20%EB%B0%A9%EB%B0%B0%EC%B2%9C%EB%A1%9C2%EA%B8%B8%2012%2C%201%EC%B8%B5%20%28%EB%B0%A9%EB%B0%B0%EB%8F%99%29",
    "kakao": "https://map.kakao.com/link/search/%EC%86%8D%EC%B4%88%EB%B0%94%EB%8B%A4%EC%95%BC%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%84%9C%EC%B4%88%EA%B5%AC%20%EB%B0%A9%EB%B0%B0%EC%B2%9C%EB%A1%9C2%EA%B8%B8%2012%2C%201%EC%B8%B5%20%28%EB%B0%A9%EB%B0%B0%EB%8F%99%29"
  },
  "asOf": "2026-10-30"
},
{
  "id": "sadang-06",
  "name": "원당감자탕",
  "designation": {
    "agency": "서울특별시 서초구",
    "name": "모범음식점",
    "year": 2017,
    "source": sadangSources.seocho
  },
  "menu": {
    "name": "감자탕",
    "priceWon": null,
    "asOf": "2026-10-30"
  },
  "exit": null,
  "walkMinutes": null,
  "address": "서울특별시 서초구 방배천로4길 9, 2층 3층 (방배동)",
  "maps": {
    "naver": "https://map.naver.com/p/search/%EC%9B%90%EB%8B%B9%EA%B0%90%EC%9E%90%ED%83%95%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%84%9C%EC%B4%88%EA%B5%AC%20%EB%B0%A9%EB%B0%B0%EC%B2%9C%EB%A1%9C4%EA%B8%B8%209%2C%202%EC%B8%B5%203%EC%B8%B5%20%28%EB%B0%A9%EB%B0%B0%EB%8F%99%29",
    "kakao": "https://map.kakao.com/link/search/%EC%9B%90%EB%8B%B9%EA%B0%90%EC%9E%90%ED%83%95%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EC%84%9C%EC%B4%88%EA%B5%AC%20%EB%B0%A9%EB%B0%B0%EC%B2%9C%EB%A1%9C4%EA%B8%B8%209%2C%202%EC%B8%B5%203%EC%B8%B5%20%28%EB%B0%A9%EB%B0%B0%EB%8F%99%29"
  },
  "asOf": "2026-10-30"
},
{
  "id": "sadang-07",
  "name": "계성치킨",
  "designation": {
    "agency": "서울특별시 관악구",
    "name": "모범음식점",
    "year": 2023,
    "source": sadangSources.gwanak
  },
  "menu": null,
  "exit": null,
  "walkMinutes": null,
  "address": "서울특별시 관악구 남현길 18, (남현동)",
  "maps": {
    "naver": "https://map.naver.com/p/search/%EA%B3%84%EC%84%B1%EC%B9%98%ED%82%A8%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B4%80%EC%95%85%EA%B5%AC%20%EB%82%A8%ED%98%84%EA%B8%B8%2018%2C%20%28%EB%82%A8%ED%98%84%EB%8F%99%29",
    "kakao": "https://map.kakao.com/link/search/%EA%B3%84%EC%84%B1%EC%B9%98%ED%82%A8%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B4%80%EC%95%85%EA%B5%AC%20%EB%82%A8%ED%98%84%EA%B8%B8%2018%2C%20%28%EB%82%A8%ED%98%84%EB%8F%99%29"
  },
  "asOf": "2026-10-30"
},
{
  "id": "sadang-08",
  "name": "태양수산",
  "designation": {
    "agency": "서울특별시 관악구",
    "name": "모범음식점",
    "year": 2024,
    "source": sadangSources.gwanak
  },
  "menu": {
    "name": "생선회",
    "priceWon": null,
    "asOf": "2026-10-30"
  },
  "exit": null,
  "walkMinutes": null,
  "address": "서울특별시 관악구 남현1길 19, (남현동)",
  "maps": {
    "naver": "https://map.naver.com/p/search/%ED%83%9C%EC%96%91%EC%88%98%EC%82%B0%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B4%80%EC%95%85%EA%B5%AC%20%EB%82%A8%ED%98%841%EA%B8%B8%2019%2C%20%28%EB%82%A8%ED%98%84%EB%8F%99%29",
    "kakao": "https://map.kakao.com/link/search/%ED%83%9C%EC%96%91%EC%88%98%EC%82%B0%20%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B4%80%EC%95%85%EA%B5%AC%20%EB%82%A8%ED%98%841%EA%B8%B8%2019%2C%20%28%EB%82%A8%ED%98%84%EB%8F%99%29"
  },
  "asOf": "2026-10-30"
},
];

// 공식 출구별 시설 자료는 제공 종료되어 배정 근거로 사용하지 않는다.
export const sadangExits: { exit: SadangExit; placeIds: string[]; status: "pending" }[] = [
  { exit: 1, placeIds: [], status: "pending" },
  { exit: 2, placeIds: [], status: "pending" },
  { exit: 3, placeIds: [], status: "pending" },
  { exit: 4, placeIds: [], status: "pending" },
  { exit: 5, placeIds: [], status: "pending" },
  { exit: 6, placeIds: [], status: "pending" },
  { exit: 7, placeIds: [], status: "pending" },
  { exit: 8, placeIds: [], status: "pending" },
  { exit: 9, placeIds: [], status: "pending" },
  { exit: 10, placeIds: [], status: "pending" },
  { exit: 11, placeIds: [], status: "pending" },
  { exit: 12, placeIds: [], status: "pending" },
  { exit: 13, placeIds: [], status: "pending" },
  { exit: 14, placeIds: [], status: "pending" },
];

export const sadangCongestion = {
  source: sadangSources.congestion,
  station: "사당",
  intervalMinutes: 30,
  description: "30분간 해당 역을 통과한 모든 열차의 평균 혼잡도. 열차 정원 대비 승차 인원 비율(%), 좌석만 차면 34%. 역 내부나 주변 거리의 인파를 나타내지 않는다.",
  times: ["05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30", "00:00", "00:30"],
  rows: [
    {"day": "평일", "line": "2호선", "stationNumber": "226", "direction": "내선", "percentages": [16.5, 15.4, 16.7, 26.0, 29.6, 41.3, 31.6, 28.0, 19.2, 27.7, 22.7, 20.5, 30.2, 31.6, 36.8, 41.3, 40.5, 43.0, 51.0, 64.5, 70.3, 76.0, 82.9, 100.4, 122.4, 124.3, 122.0, 102.4, 71.1, 67.4, 70.8, 73.7, 99.1, 95.0, 71.8, 58.9, 32.7, 25.3, 19.7]},
    {"day": "평일", "line": "2호선", "stationNumber": "226", "direction": "외선", "percentages": [88.2, 62.7, 68.3, 105.9, 124.3, 144.8, 144.5, 135.5, 82.3, 68.8, 74.7, 46.9, 47.3, 47.5, 48.5, 52.4, 50.1, 40.0, 39.0, 40.9, 39.7, 42.1, 43.4, 42.6, 46.2, 50.2, 49.3, 31.2, 29.7, 24.8, 23.3, 32.2, 27.1, 24.2, 23.8, 22.6, 15.1, 11.4, 4.6]},
    {"day": "평일", "line": "4호선", "stationNumber": "433", "direction": "상선", "percentages": [20.6, 36.2, 31.5, 48.4, 64.4, 91.0, 53.6, 54.6, 45.5, 35.0, 36.8, 45.7, 28.5, 39.0, 33.8, 32.8, 35.0, 34.0, 41.7, 34.4, 29.6, 37.2, 37.9, 45.8, 44.7, 47.9, 51.2, 27.8, 22.3, 17.3, 16.9, 19.0, 18.5, 24.2, 18.6, 15.0, 9.0, 4.5, 7.6]},
    {"day": "평일", "line": "4호선", "stationNumber": "433", "direction": "하선", "percentages": [18.1, 25.1, 15.5, 18.5, 29.8, 38.8, 19.6, 19.7, 13.0, 18.4, 15.4, 14.6, 12.0, 17.0, 20.8, 19.5, 23.4, 24.3, 23.1, 31.2, 29.8, 36.5, 52.3, 56.2, 51.5, 53.0, 68.3, 31.3, 37.0, 23.7, 28.4, 23.8, 37.2, 27.2, 27.9, 30.6, 10.2, 14.8, 0.0]},
    {"day": "토요일", "line": "2호선", "stationNumber": "226", "direction": "내선", "percentages": [15.9, 15.5, 10.6, 9.7, 13.5, 21.9, 22.6, 21.0, 26.0, 32.1, 33.6, 30.4, 45.3, 48.7, 40.3, 53.9, 51.0, 45.5, 61.3, 51.1, 57.8, 67.4, 80.7, 67.1, 68.2, 65.0, 74.3, 65.3, 61.7, 63.7, 77.5, 88.3, 72.2, 92.7, 75.4, 58.8, 55.5, 0.0, 0.0]},
    {"day": "토요일", "line": "2호선", "stationNumber": "226", "direction": "외선", "percentages": [50.6, 38.5, 36.4, 35.2, 47.2, 62.5, 79.2, 88.5, 83.4, 77.7, 70.1, 73.1, 76.9, 69.8, 73.6, 79.2, 62.3, 64.4, 71.2, 60.7, 62.2, 68.9, 66.9, 52.5, 53.2, 46.0, 38.7, 32.9, 24.2, 30.0, 28.2, 26.6, 25.7, 24.0, 26.8, 25.0, 20.1, 0.0, 0.0]},
    {"day": "토요일", "line": "4호선", "stationNumber": "433", "direction": "상선", "percentages": [21.1, 17.1, 18.1, 15.8, 27.6, 35.4, 37.4, 48.8, 42.6, 58.5, 69.7, 55.2, 59.6, 47.6, 49.9, 61.3, 41.8, 60.8, 49.1, 45.9, 52.4, 48.6, 47.2, 58.9, 41.6, 58.4, 37.4, 34.0, 36.1, 25.2, 27.5, 33.9, 27.5, 33.5, 24.8, 30.6, 0.0, 0.0, 0.0]},
    {"day": "토요일", "line": "4호선", "stationNumber": "433", "direction": "하선", "percentages": [15.7, 14.9, 11.3, 7.5, 11.1, 22.7, 23.6, 45.2, 39.9, 41.0, 41.9, 27.1, 41.3, 32.7, 21.8, 35.3, 22.8, 38.2, 29.9, 29.2, 36.8, 33.0, 37.8, 43.6, 31.1, 42.0, 32.8, 29.3, 38.0, 36.2, 34.5, 56.4, 33.3, 43.5, 26.4, 33.0, 37.4, 41.4, 0.0]},
    {"day": "일요일", "line": "2호선", "stationNumber": "226", "direction": "내선", "percentages": [12.8, 10.9, 8.2, 6.8, 9.4, 14.1, 13.4, 18.4, 20.4, 24.3, 23.0, 19.9, 27.9, 26.8, 24.9, 33.6, 38.6, 32.9, 39.8, 37.1, 37.4, 51.3, 47.2, 50.7, 49.6, 48.9, 57.2, 52.6, 48.4, 57.7, 53.0, 61.0, 65.3, 60.8, 47.8, 37.2, 31.4, 0.0, 0.0]},
    {"day": "일요일", "line": "2호선", "stationNumber": "226", "direction": "외선", "percentages": [24.1, 20.4, 19.8, 22.4, 29.2, 34.2, 42.3, 56.0, 58.3, 53.0, 50.2, 51.5, 57.4, 47.8, 55.5, 59.6, 52.4, 46.7, 49.0, 39.5, 37.6, 47.9, 41.7, 35.2, 37.9, 35.0, 29.9, 26.7, 20.3, 24.0, 19.1, 20.8, 17.0, 14.7, 18.0, 14.2, 13.4, 0.0, 0.0]},
    {"day": "일요일", "line": "4호선", "stationNumber": "433", "direction": "상선", "percentages": [10.5, 9.0, 10.5, 10.7, 16.8, 22.7, 20.6, 33.3, 32.8, 41.1, 47.0, 35.1, 38.4, 33.1, 35.6, 43.0, 30.1, 41.1, 31.7, 32.1, 32.2, 30.4, 31.4, 37.7, 28.4, 49.0, 31.9, 25.9, 28.7, 21.6, 21.0, 23.6, 16.7, 18.3, 14.6, 19.2, 0.0, 0.0, 0.0]},
    {"day": "일요일", "line": "4호선", "stationNumber": "433", "direction": "하선", "percentages": [8.4, 11.0, 7.8, 6.2, 9.4, 17.6, 18.3, 38.5, 35.4, 33.2, 33.3, 20.7, 30.4, 22.7, 16.2, 25.4, 17.2, 27.9, 21.5, 21.5, 25.5, 21.8, 25.1, 33.5, 21.4, 30.4, 23.2, 20.4, 29.3, 27.6, 23.1, 34.9, 22.3, 25.8, 13.6, 16.3, 15.7, 17.3, 0.0]},
  ] satisfies CongestionRow[],
};
