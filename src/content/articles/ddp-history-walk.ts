import type { MagazineArticle } from "../articles";
import { stationPhotos } from "../station-photos";

export const ddpHistoryWalk: MagazineArticle = {
  slug: "ddp-history-walk",
  image: stationPhotos["ddp-history-walk"],
  section: "see",
  question: "동대문디자인플라자 주변에서는 은빛 건물 말고 무엇을 볼 수 있을까?",
  answer: "동대문디자인플라자(DDP) 주변에서는 곡선형 건축물뿐 아니라 옛 동대문운동장 터에서 확인된 한양도성 유구, 운동장 역사를 다루는 전시, 원단과 부자재를 취급하는 시장도 살펴볼 수 있다. 행사는 날짜에 따라 달라진다.",
  answerSourceIds: ["ddp-museum-history", "ddp-architecture-seoul", "ddp-ground-museum", "visitseoul-market", "seoul-light-2026"],
  station: {
    name: "동대문역사문화공원역",
    lines: ["2", "4", "5"],
    sign: { line: "2", prev: "을지로4가", next: "신당", en: "Dongdaemun History & Culture Park" },
    sourceIds: ["seoul-tourist-map-en-202603", "seoul-route-map-202509"],
  },
  body: [
    {
      heading: "건물의 곡면에서 공원으로 시선을 옮기면",
      paragraphs: [
        {
          text: "DDP는 자하 하디드가 설계한 곡선형 건축물이다. 설계 사무소는 DDP와 주변 성곽·발굴 유적을 공원과 광장에 잇는 ‘건축적 풍경’으로 설명한다. 이는 설계자의 설명이며 실제 보행 동선이나 현재 관람 조건을 안내하는 말은 아니다.",
          sourceIds: ["ddp-architecture-seoul", "ddp-architecture-zha"],
        },
        {
          text: "건물에서 공원 쪽으로 관찰 대상을 옮기면 서로 다른 시기의 흔적이 보인다. DDP와 동대문역사문화공원이 들어선 곳은 옛 동대문운동장 부지다. 2008년부터 2009년 사이 발굴 과정에서 한양도성의 성벽과 수문, 조선시대 건물 터와 유물이 확인됐다. 동대문역사관은 이 발굴 유적과 출토 유물을 다룬다.",
          sourceIds: ["ddp-museum-history"],
        },
      ],
    },
    {
      heading: "성벽의 수문과 운동장의 기억",
      paragraphs: [
        {
          text: "이간수문은 도성의 물을 성 밖으로 내보내던 시설이다. 서울역사박물관은 배수와 방어에 쓰인 수문으로 설명한다. 성벽만 보면 도성의 경계를 성곽으로만 생각하기 쉽지만, 이 수문은 물길을 통과시키는 시설도 성곽의 일부였음을 보여준다. 지금 확인할 수 있는 것은 발굴 뒤 정비된 유구와 박물관의 설명이다. 옛 수로가 현재도 작동한다고 볼 근거는 아니다.",
          sourceIds: ["ddp-museum-history"],
        },
        {
          text: "동대문역사관과 동대문운동장기념관은 다루는 시간이 다르다. 역사관은 운동장 부지에서 나온 유적과 유물을, 운동장기념관은 경성과 서울의 체육시설이었던 동대문운동장의 역사를 소개한다. 서울시가 2022년에 낸 안내는 야구장 조명탑과 공원으로 옮긴 성화대를 운동장의 흔적으로 기록했다. 그 자료는 현재 위치나 접근 가능 여부까지 보증하지 않는다.",
          sourceIds: ["ddp-museum-history", "ddp-ground-museum", "seoul-history-2022"],
        },
      ],
    },
    {
      heading: "옷을 이루는 재료를 파는 시장",
      paragraphs: [
        {
          text: "동대문종합시장은 DDP 내부의 전시 공간이 아니다. 서울관광재단은 이 시장에서 원단과 부자재, 액세서리, 혼수 관련 품목을 도·소매한다고 소개한다. 이 설명은 시장에서 무엇을 다루는지 알려주지만, 주변 상가가 실제로 옷을 생산하는 장소인지까지 입증하지는 않는다.",
          sourceIds: ["visitseoul-market"],
        },
        {
          text: "그래서 동대문 일대를 볼 때는 완성된 옷을 판매하는 상가와 원단·재료를 취급하는 시장, 건축과 디자인을 다루는 DDP를 한 종류의 공간으로 묶지 않는 편이 정확하다. 거래 품목과 방식은 상가마다 다르며 운영시간도 구역별로 달라질 수 있다.",
          sourceIds: ["visitseoul-market"],
        },
      ],
    },
    {
      heading: "행사는 일정이 공개된 날에",
      paragraphs: [
        {
          text: "서울시는 서울라이트 DDP의 2024년과 2025년 가을 회차를 안내했다. 2026년 회차는 9월 3일부터 13일까지 열렸고, 시는 종료 결과를 발표했다. 여러 해 행사가 열린 기록은 있지만 다음 회차가 같은 시기와 형식으로 열린다는 뜻은 아니다.",
          sourceIds: ["seoul-light-2024", "seoul-light-2025", "seoul-light-2026"],
        },
        {
          text: "행사 일정과 전시 내용은 해마다 달라질 수 있다. DDP에서 무엇을 볼지 정할 때 건축물과 유적은 장소에 관한 안내를, 전시와 빛 행사는 방문 날짜에 맞는 공식 공지를 확인한다. 동대문역사관의 전시·관람 정보도 방문 전에 별도 안내에서 확인할 수 있다.",
          sourceIds: ["seoul-light-2026", "ddp-museum-history"],
        },
      ],
    },
    {
      heading: "서로 다른 장면을 함께 보다",
      paragraphs: [
        {
          text: "DDP 주변을 읽는 방법은 하나가 아니다. 곡면 건축을 볼 수도 있고, 땅 아래에서 나온 도성의 흔적과 운동장의 기억을 살펴볼 수도 있다. 시장에서는 건축과 전시와 다른 방식으로 동네의 일을 만난다. 이 공간들이 한곳에 있다는 사실은 서로 다른 역사를 한 이야기로 합치기보다, 동대문이라는 이름 아래 나란히 놓인 장면을 비교해 볼 이유가 된다.",
          sourceIds: ["ddp-architecture-seoul", "ddp-museum-history", "visitseoul-market"],
        },
      ],
    },
  ],
  sources: [
    { id: "seoul-tourist-map-en-202603", org: "서울특별시·서울관광재단", title: "2026 Seoul Tourist Map, 2쪽 Seoul Metro Map", date: "2026년 3월 게시본 · 2026-11-05 확인", url: "https://english.seoul.go.kr/wp-content/uploads/2026/03/2026_touristmap_EN.pdf" },
    { id: "seoul-route-map-202509", org: "서울특별시", title: "서울 지하철 노선도 (Route Map)", date: "2025년 9월 게시본 · 2026-11-05 확인", url: "https://english.seoul.go.kr/wp-content/uploads/2025/09/route-map.pdf" },
    { id: "ddp-museum-history", org: "서울역사박물관", title: "동대문역사관 전시소개", date: "게시일 미표시 · 2026-11-05 확인", url: "https://museum.seoul.go.kr/scwm/exhibition/ddmHistory/ddmExhGuide.jsp" },
    { id: "ddp-architecture-seoul", org: "서울특별시", title: "동대문디자인플라자(DDP)", date: "게시일 미표시 · 2026-11-05 확인", url: "https://www.seoul.go.kr/policy/view.do?id=99&lan=KO" },
    { id: "ddp-architecture-zha", org: "Zaha Hadid Architects", title: "Dongdaemun Design Plaza", date: "게시일 미표시 · 2026-11-05 확인", url: "https://www.zha.com/projects/architecture/dongdaemun-design-plaza?disclaimer=true" },
    { id: "ddp-ground-museum", org: "서울역사박물관", title: "동대문운동장기념관 전시소개", date: "게시일 미표시 · 2026-11-05 확인", url: "https://museum.seoul.go.kr/scwm/exhibition/ddmGround/ddmGExhGuide.jsp" },
    { id: "seoul-history-2022", org: "서울특별시 서울사랑", title: "동대문디자인플라자와 동대문", date: "2022년 9월 게시 · 2026-11-05 확인", url: "https://love.seoul.go.kr/articles/9023" },
    { id: "visitseoul-market", org: "서울관광재단", title: "동대문종합시장", date: "2014-11-08 게시 · 2026-09-10 수정 · 2026-11-05 확인", url: "https://english.visitseoul.net/area/DongdaemunShoppingComplex/ENP000170" },
    { id: "seoul-light-2024", org: "서울특별시", title: "서울라이트 DDP 2024 가을 개막", date: "2024년 가을 행사 · 2026-11-05 확인", url: "https://tv.seoul.go.kr/v/9874a999191b493b8a7275496a20908e" },
    { id: "seoul-light-2025", org: "서울특별시", title: "서울라이트 DDP 2025 가을 행사 종료", date: "2025년 가을 행사 · 2026-11-05 확인", url: "https://mediahub.seoul.go.kr/archives/2015586" },
    { id: "seoul-light-2026", org: "서울특별시", title: "서울라이트 DDP 2026 가을 행사 결과", date: "2026-09-03~09-13 개최 · 2026-09-28 결과 게시 · 2026-11-05 확인", url: "https://www.seoul.go.kr/news/news_report.do?nttNo=467138&srchCtgry=466" },
  ],
  related: [
    { title: "신도림역에서 전시를 보고, 직접 만드는 수업에도 참여할 수 있을까?", href: "/article/sindorim-cultural-spaces/" },
    { title: "동묘앞역은 왜 토·휴일 승하차가 더 많을까?", href: "/article/dongmyo-weekend/" },
  ],
  datePublished: "2026-11-05T00:00:00+09:00",
  dateModified: "2026-11-05T13:25:13+09:00",
};
