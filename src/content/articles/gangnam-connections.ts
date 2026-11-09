import type { MagazineArticle } from "../articles";
import type { StationPhoto } from "../station-photos";

const kukkiwonGate: StationPhoto = {
  src: "/images/station/kukkiwon-main-gate-20260818.jpg",
  alt: "‘국기원’ 편액과 푸른 기와 모양 지붕을 단 흰 문, 그 아래로 이어지는 도로",
  caption: "2026년 8월 18일 촬영한 국기원의 문. 원본에 차량 번호판 제거 처리가 있으며 추가 수정은 하지 않았습니다.",
  width: 1600,
  height: 1382,
  artist: "LucaPagani7",
  source: "https://commons.wikimedia.org/wiki/File:Kukkiwon_Main_Gate_2026.jpg",
  license: "CC0 1.0",
  licenseUrl: "https://creativecommons.org/publicdomain/zero/1.0/",
  provider: "Wikimedia Commons",
};

export const gangnamConnections: MagazineArticle = {
  slug: "gangnam-connections",
  image: kukkiwonGate,
  section: "see",
  question: "강남역 곁의 도서관과 국기원은 무엇을 보여줄까?",
  answer: "강남역에서 찾을 수 있는 국립어린이청소년도서관은 책을 읽고 이야기를 만드는 공간이고 국기원은 태권도의 수련과 국제대회 역사를 기념관과 기념비로 살펴보는 목적지다.",
  answerSourceIds: ["G1", "G5", "G7"],
  station: {
    name: "강남역",
    lines: ["2", "shinbundang"],
    sign: { line: "2", prev: "역삼", next: "교대", en: "Gangnam" },
    sourceIds: ["seoul-tourist-map-en-202603", "seoul-route-map-202509"],
  },
  body: [
    {
      heading: "읽는 자리와 작가의 서가",
      paragraphs: [
        { text: "국립어린이청소년도서관을 어린이의 책장만 있는 곳으로 생각하면 방문 목적이 좁아진다. 1층 어린이자료실에는 유아와 초등학교 저학년을 위한 자료뿐 아니라 외국 아동서와 자녀양육서도 있다. 그림책을 고르는 ‘그림책 나라’, 편하게 읽는 ‘뒹굴뒹굴 책방’, 소리 내어 책을 읽어 줄 수 있는 ‘이야기방’은 같은 독서에도 서로 다른 자리가 필요하다는 것을 보여준다. 혼자 글을 읽는 일과 누군가에게 이야기를 들려주는 일을 한 가지 자세로 묶지 않은 구성이다.", sourceIds: ["G1"] },
        { text: "3층 연구자료실에서는 시선이 책의 독자에서 책을 만든 사람과 문학으로 옮겨간다. 국내외 아동문학상 수상작과 여러 나라의 그림책·동화책, 아동문학 연구자료를 함께 살펴볼 수 있다. 강소천·마해송·윤석중 등 아동문학가의 개인문고도 마련돼 있다. 어린이와 함께 온 보호자뿐 아니라 그림책과 아동문학을 읽고 싶은 성인에게도 머물 이유가 생긴다. 작가의 이름으로 묶인 자료와 여러 나라의 책을 함께 찾아 읽으면 특정 작가나 표현 방식을 더 살펴볼 수 있다.", sourceIds: ["G1", "G2"] },
      ],
    },
    {
      heading: "책을 읽은 다음에는 이야기를 만드는 공간이 있다",
      paragraphs: [
        { text: "도서관의 다른 역할은 창작 공간에서 드러난다. 1층 꿈창작실에는 손으로 만드는 활동을 위한 공간과 디지털 제작 장비를 활용하는 공간이 구분돼 있다. 2층 희망창작실에는 청소년 자료와 함께 디지털 미디어 창작 공간이 있고 ‘공간 상상’은 1인 미디어 제작을 위한 공간으로 소개된다. 자료를 읽는 공간과 이용자가 자기 콘텐츠를 만들어 보는 공간을 함께 갖췄다.", sourceIds: ["G1", "G3"] },
        { text: "책과 창작의 관계는 개관 20주년 특별전 「북적북적(BOOK的BOOK積) 20년: 우리가 자란 시간, 우리가 그릴 미래」에서도 살펴볼 수 있다. 2026년 11월 9일 확인한 도서관 안내에 명시된 전시 기간은 2026년 6월 26일부터 11월 30일까지이며 장소는 2층 전시실이다. 전시는 도서관의 지난 활동과 인기도서, 자체 개발한 다국어 동화 콘텐츠와 증강현실 책카드, AI를 활용한 동화 만들기 등을 함께 다룬다. 인기도서의 기록과 읽기·창작 콘텐츠를 비교하면 책을 모아 온 도서관의 역할과 이야기를 다루는 방식도 함께 살펴볼 수 있다.", sourceIds: ["G3", "G4"] },
      ],
    },
    {
      heading: "국기원에서는 도장과 국제대회의 역사가 만난다",
      paragraphs: [
        { text: "같은 테헤란로7길에 있는 국기원에서는 태권도의 역사를 살펴볼 수 있다. 도서관이 책과 기록으로 문화를 전한다면 국기원은 태권도 지도자 양성과 승품·단 심사 등을 맡는 기관이다. 기념관과 기념비에서는 수련과 국제대회, 자격 제도가 함께 놓인 국기원의 역사를 읽을 수 있다.", sourceIds: ["G5", "G7", "G11", "G12"] },
        { text: "국기원은 1972년 11월 30일 태권도 중앙도장으로 개원했다. 이듬해에는 이곳에서 제1회 세계태권도선수권대회가 열렸고 같은 해 말 국기원장 명의의 단증 발급이 시작됐다. 중앙도장 개원, 국제대회 개최, 단증 발급을 함께 보면 국기원이 수련과 대회, 자격을 잇는 기관으로 자리 잡는 과정을 읽을 수 있다. 건물 주변의 제1회 세계태권도선수권대회 개최 기념비와 시드니올림픽 정식 종목 채택 기념비에서도 서로 다른 시기의 사건을 기념한다는 점을 살펴볼 수 있다.", sourceIds: ["G5", "G7"] },
      ],
    },
    {
      heading: "시범은 수련과 다른 방식으로 태권도를 보여준다",
      paragraphs: [
        { text: "태권도를 관객에게 보여주는 활동 역시 별도로 발전했다. 국기원 태권도시범단은 1974년 9월 6일 창단됐으며 국내외 시범과 해외 인사 방문 등의 자리에서 활동해 왔다. 관객 앞에서 선보이는 시범은 수련이나 승품·단 심사와 목적이 다르다.", sourceIds: ["G6"] },
      ],
    },
    {
      heading: "방문 전에 확인할 것",
      paragraphs: [
        { text: "국립어린이청소년도서관은 강남구 테헤란로7길 21에 있다. 이용시간은 09:00~18:00이며 매월 둘째·넷째 월요일과 일요일을 제외한 관공서 공휴일 등에 쉰다. 설·추석 연휴 중 일요일은 휴관하고 어린이날은 개관한다. 2026년 11월 9일은 정기휴관일이므로 전시 기간에 포함돼 있어도 이날 방문할 수 있는 것은 아니다. 처음 자료실을 이용한다면 회원가입·이용증 발급과 연령별 신분 확인 서류를 확인한다.", sourceIds: ["G2"] },
        { text: "자료를 읽으려면 도서관 안에서 머물 시간을 잡는 편이 좋다. 자료는 관내 이용이 원칙이며 서고의 외국아동자료에는 정기이용증 소지자를 위한 별도 개인대출 제도가 있다. 처음에는 관외대출 신청서와 본인확인이 필요하고 일부 자료는 대출이 제한된다. 찾는 책이 서가에 놓여 있는지, 신청해야 꺼내 주는 자료인지도 확인해야 한다. 보존서고 자료는 신청 당일 이용할 수 없으므로 검색 결과의 이용 장소와 신청 안내를 먼저 살펴보자.", sourceIds: ["G2", "G10"] },
        { text: "창작 장비나 프로그램을 이용하려면 활동별 대상과 신청 조건을 확인한다. 20주년 전시도 정해진 기간에만 안내된 행사이므로 종료 뒤에는 다음 전시 일정을 살펴봐야 한다.", sourceIds: ["G1", "G3", "G13"] },
        { text: "도서관은 강남역 12번 출구에서 오는 일반 보행 경로를 안내한다. 이 경로에는 계단이 있으며 별도로 역삼문화공원 제1호 공영주차장 엘리베이터 이용도 안내한다. 필요한 접근 방법은 도서관의 최신 안내를 확인하는 편이 좋다.", sourceIds: ["G8"] },
        { text: "국기원 주소는 테헤란로7길 32다. 서울관광재단의 2026년 10월 27일 수정 안내는 기념관을 무료 관람으로 소개하며 월~목 09:00~18:30, 금요일 09:00~16:00, 점심시간 11:30~13:00 미운영으로 적고 있다. 주말·공휴일과 국기원 휴원일은 피하고 방문 전에 기념관 개방 여부를 국기원에 확인한다. 이 시간은 서울관광재단의 기념관 관람 안내다. 기념관 방문과 수련·심사 참가, 시범공연 관람은 각각의 안내를 확인해야 하며 공연이 목적이라면 날짜와 관람 대상이 명시된 별도 공지를 찾아야 한다.", sourceIds: ["G7", "G9"] },
      ],
    },
  ],
  sources: [
    { id: "seoul-tourist-map-en-202603", org: "서울특별시·서울관광재단", title: "2026 Seoul Tourist Map, 2쪽 Seoul Metro Map", date: "2026년 3월 게시본 · 2026-11-09 확인", url: "https://english.seoul.go.kr/wp-content/uploads/2026/03/2026_touristmap_EN.pdf" },
    { id: "seoul-route-map-202509", org: "서울특별시", title: "서울 지하철 노선도 (Route Map)", date: "2025년 9월 게시본 · 2026-11-09 확인", url: "https://english.seoul.go.kr/wp-content/uploads/2025/09/route-map.pdf" },
    { id: "G1", org: "국립어린이청소년도서관", title: "층별안내", date: "게시일 미표시 · 2026-11-09 확인", url: "https://www.nlcy.go.kr/NLCY/contents/C50301000000.do" },
    { id: "G2", org: "국립어린이청소년도서관", title: "도서관이용안내", date: "게시일 미표시 · 2026-11-09 확인", url: "https://www.nlcy.go.kr/NLCY/contents/C50201000000.do" },
    { id: "G3", org: "국립어린이청소년도서관", title: "전시", date: "전시 기간 2026-06-26~11-30 · 2026-11-09 확인", url: "https://www.nlcy.go.kr/NLCY/contents/C41100000000.do" },
    { id: "G4", org: "국립어린이청소년도서관", title: "개관 20주년 기념 ‘꿈을 읽다, 미래를 펼치다’ 행사 개최", date: "2026-06-25 게시 · 2026-11-09 확인", url: "https://www.nlcy.go.kr/NLCY/contents/C40601000000.do?id=1121597&schBcid=nlcy_normal03&schM=view" },
    { id: "G5", org: "국기원", title: "1970년대 연혁", date: "1972~1974년 사건 기록 · 2026-11-09 확인", url: "https://kukkiwon.or.kr/base/contents/view?contentsNo=62&menuLevel=3&menuNo=55" },
    { id: "G6", org: "국기원", title: "태권도시범단 소개", date: "창단일 1974-09-06 · 2026-11-09 확인", url: "https://kukkiwon.or.kr/base/contents/view?contentsNo=47&menuLevel=3&menuNo=46" },
    { id: "G7", org: "서울관광재단 Visit Seoul", title: "국기원", date: "2015-12-02 제작 · 2026-10-27 수정 · 2026-11-09 확인", url: "https://korean.visitseoul.net/entertainment/%EA%B5%AD%EA%B8%B0%EC%9B%90/KOP002925" },
    { id: "G8", org: "국립어린이청소년도서관", title: "찾아오시는길", date: "게시일 미표시 · 2026-11-09 확인", url: "https://www.nlcy.go.kr/NLCY/contents/C50500000000.do" },
    { id: "G9", org: "국기원", title: "오시는 길", date: "게시일 미표시 · 2026-11-09 확인", url: "https://kukkiwon.or.kr/base/contents/view?contentsNo=44&menuLevel=2&menuNo=78" },
    { id: "G10", org: "국립어린이청소년도서관", title: "외국아동자료 개인대출안내", date: "게시일 미표시 · 2026-11-09 확인", url: "https://www.nlcy.go.kr/NLCY/contents/C11301000000.do" },
    { id: "G11", org: "국기원", title: "태권도지도자양성", date: "게시일 미표시 · 2026-11-09 확인", url: "https://kukkiwon.or.kr/base/contents/view?contentsNo=45&menuLevel=2&menuNo=57" },
    { id: "G12", org: "국기원", title: "승품·단 심사", date: "게시일 미표시 · 2026-11-09 확인", url: "https://kukkiwon.or.kr/base/contents/view?contentsNo=40&menuLevel=2&menuNo=56" },
    { id: "G13", org: "국립어린이청소년도서관", title: "프로그램 신청", date: "게시일 미표시 · 2026-11-09 확인", url: "https://www.nlcy.go.kr/NLCY/contents/C20100000000.do" },
  ],
  related: [
    { title: "홍대입구역의 세 노선은 어떻게 이어질까?", href: "/article/hongdae-transfer/" },
    { title: "고속터미널역의 15cm와 314m는 무엇을 잰 숫자일까?", href: "/article/express-terminal/" },
  ],
  datePublished: "2026-11-09T00:00:00+09:00",
  dateModified: "2026-11-09T00:00:00+09:00",
};
