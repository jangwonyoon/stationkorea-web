import type { MagazineArticle } from "../articles";
import { stationPhotos } from "../station-photos";

const sindorimPhoto = {
  ...stationPhotos["sindorim-cultural-spaces"],
  caption: "신도림역 철길과 승강장, 주변 건물. 2020-08-08 촬영. 문화철도959의 전시나 활동 장면은 아닙니다.",
};

export const sindorimCulturalSpaces: MagazineArticle = {
  slug: "sindorim-cultural-spaces",
  image: sindorimPhoto,
  imagePlacement: "body",
  section: "see",
  question: "신도림역 문화철도959에서는 무엇을 보고, 어떤 수업에 참여할 수 있을까?",
  answer: "문화철도959는 신도림역 선상역사 3층의 959갤러리와 문화교실에서 전시와 신청형 수업을 안내한다. 2026년 11월 5일 확인 당시 송유리 전시는 11월 2일부터 19일까지 일정으로 진행 중이었고, 4분기 문화교실 접수는 끝난 상태였다.",
  answerSourceIds: ["sindorim-facility", "sindorim-song-exhibition", "sindorim-quarterly-class"],
  station: { name: "신도림역", lines: ["1", "2"], sign: { line: "1", prev: "영등포", next: "구로", en: "Sindorim" }, sourceIds: ["seoul-tourist-map-en-202603", "seoul-route-map-202509"] },
  body: [
    {
      heading: "철길 위 역사의 3층에 갤러리와 문화교실이 있다",
      paragraphs: [
        {
          text: "문화철도959는 신도림역 1호선 선상역사 3층에 있다. 선상역사는 철길 위를 가로질러 놓은 역 건물이다. 구로문화재단은 이곳의 아트플랫폼과 문화교실, 959갤러리를 시설로 안내한다. 이 정보로 확인할 수 있는 것은 공간의 위치와 쓰임이다. 갤러리가 늘 열려 있는지, 역을 지나던 사람이 실제로 작품을 보는지는 시설 안내만으로 알 수 없다.",
          sourceIds: ["sindorim-facility"],
        },
        {
          text: "구로구의 2015년 자료는 새 선상역사가 문을 열면서 역 남쪽과 북쪽 광장을 지상으로 연결했다고 기록한다. 신도림역에는 철길 위 역사와 광장, 지하 연결통로처럼 서로 다른 자리가 있다. 문화시설 안내를 이 공간들과 함께 읽으면, 열차를 타는 시설 안팎에 전시와 수업, 공연을 위한 공간이 따로 마련된 구성을 볼 수 있다. 이것은 시설과 조성 기록을 나란히 읽은 설명이며, 문화공간이 이동이나 동네 생활을 어떻게 바꾸었는지를 입증하는 자료는 아니다.",
          sourceIds: ["sindorim-station-opening", "sindorim-opera-facility"],
        },
      ],
      image: sindorimPhoto,
    },
    {
      heading: "전시는 날짜가 있고 관람 조건은 따로 확인해야 한다",
      paragraphs: [
        {
          text: "구로문화재단은 송유리의 《The Secret Passage》를 2026년 11월 2일부터 19일까지 문화철도959에서 여는 일정으로 안내했다. 재단 소개에 따르면 작품은 《안네의 일기》 속 인물에게 다른 가능성을 상상하는 질문에서 출발한다. 이 전시는 11월 5일 확인 당시 일정상 진행 중이었다.",
          sourceIds: ["sindorim-song-exhibition"],
        },
        {
          text: "다음 전시로는 홍승희의 《방황하는 경로》가 11월 23일부터 12월 11일까지 예정돼 있었다. 재단은 미로와 움직임, 선택을 작품의 주제로 소개했다. 두 일정은 각각 별도의 전시다. 한 전시를 관람하고 다음 전시까지 연이어 볼 수 있다는 뜻은 아니다.",
          sourceIds: ["sindorim-hong-exhibition"],
        },
        {
          text: "전시 상세 페이지의 관람시간은 ‘00:00’으로 표시돼 있고 휴관일은 적혀 있지 않았다. 이 표기를 24시간 관람이나 휴관일 없음으로 해석할 수는 없다. 요금과 예약 여부도 확인되지 않았다. 날짜가 지난 뒤에는 위 일정이 현재 전시를 뜻하지 않으므로, 방문 전 구로문화재단의 최신 전시 공지에서 관람 가능 시간과 조건을 확인해야 한다.",
          sourceIds: ["sindorim-song-exhibition", "sindorim-hong-exhibition"],
        },
      ],
    },
    {
      heading: "수업은 모집 기간과 수업 기간이 다르다",
      paragraphs: [
        {
          text: "문화철도959의 문화교실은 완성된 작품을 보는 갤러리와 달리, 회차에 신청해 직접 만드는 프로그램을 안내한다. 2026년 단기 문화교실 공지에는 사진 인화, 손그림, 펀치니들, 테라리움 등의 과정이 실렸다. 이 공지의 모집 기간은 10월 23일까지였고, 수업 일정은 11월 9일부터 12월 4일까지인 회차도 포함했다. 모집이 끝난 뒤에도 공지에 적힌 수업 기간은 이어질 수 있으므로, 수업 일정만 보고 신청할 수 있다고 판단하면 안 된다.",
          sourceIds: ["sindorim-short-class"],
        },
        {
          text: "별도의 2026년 4분기 문화교실은 10월 12일부터 12월 18일까지 운영 일정으로 안내됐고 접수 기간은 9월 28일에 끝났다. 단기반과 분기 문화교실은 서로 다른 공고다. 문화교실을 방문 목적으로 삼으려면 관심 있는 프로그램의 모집 상태, 수업 날짜, 대상과 재료비를 각각 확인해야 한다. 과거 공고는 다음 모집이나 현재 잔여석을 보장하지 않는다.",
          sourceIds: ["sindorim-quarterly-class"],
        },
      ],
    },
    {
      heading: "공연장은 상설 공연표가 아니다",
      paragraphs: [
        {
          text: "신도림오페라하우스는 남측 광장에 있는 야외극장과 지하 소극장으로 안내된다. 시설 이름만으로 오페라가 상설 공연된다고 볼 수는 없다. 공연이나 영화 상영을 보려면 개별 행사 날짜가 있는지 확인해야 한다.",
          sourceIds: ["sindorim-opera-facility"],
        },
        {
          text: "서울문화포털의 2024년 서울축제지도에는 신도림오페라하우스에서 10월 4일부터 5일까지 열릴 스트릿댄스 행사가 예정 프로그램으로 실렸다. 구로문화재단은 2025년 6월 25일 인디영화 상영 일정도 공지했다. 두 기록은 서로 다른 시기의 행사 안내다. 둘만으로 축제가 실제 열렸거나 매년 반복된다고 단정할 수 없고, 정기 상영일이 계속된다고 볼 수도 없다. 2026년 11월 5일 확인 범위에서 다음 회차 일정은 찾지 못했다.",
          sourceIds: ["sindorim-2024-festival", "sindorim-2025-film"],
        },
      ],
    },
    {
      heading: "신도림의 문화공간은 서로 다른 자리에 생겼다",
      paragraphs: [
        {
          text: "역 주변 문화공간의 기록은 한 시점의 대규모 변화라기보다 여러 공간에 기능이 더해진 과정을 보여 준다. 서울문화포털 자료는 지하 연결통로의 예술공간 ‘고리’가 2012년 문을 열고, 2017년 생활문화 사업을 확대했으며, 2020년 서울생활문화센터 신도림으로 이름이 바뀐 이력을 기록한다. 구로구는 2015년 선상역사와 남북 광장 연결을 안내했고, 문화철도959는 역사 안에서 창작실·문화교실·갤러리를 운영 시설로 소개한다.",
          sourceIds: ["sindorim-gori-history", "sindorim-station-opening", "sindorim-facility"],
        },
        {
          text: "고리의 현재 운영과 개방 여부는 확인되지 않았다. 따라서 지금 찾아갈 장소나 프로그램으로 안내하지 않는다. 확인할 수 있는 것은 지하 통로에서 시작된 과거의 공간 이력뿐이다. 이 기록과 현재 문화철도959의 시설 안내, 오페라하우스의 행사 공지를 구분해서 보면 신도림에서는 전시를 보고, 모집 회차에 맞춰 수업을 신청하고, 일정이 발표된 날 공연장을 찾는 선택지가 각각 다른 방식으로 마련돼 있음을 알 수 있다.",
          sourceIds: ["sindorim-gori-history", "sindorim-facility", "sindorim-opera-facility"],
        },
        {
          text: "신도림에서 문화생활을 계획할 때는 한 번의 동선에 모든 공간을 넣기보다 보고 싶은 프로그램과 날짜를 먼저 고르는 편이 정확하다. 문화철도959 전시는 기간과 관람 조건을, 문화교실은 모집과 회차를, 오페라하우스는 개별 공연·상영 공지를 확인해야 한다.",
          sourceIds: ["sindorim-facility", "sindorim-short-class", "sindorim-opera-facility"],
        },
      ],
    },
  ],
  sources: [
    { id: "seoul-tourist-map-en-202603", org: "서울특별시·서울관광재단", title: "2026 Seoul Tourist Map, 2쪽 Seoul Metro Map", date: "2026년 3월 게시본 · 2026-11-05 확인", url: "https://english.seoul.go.kr/wp-content/uploads/2026/03/2026_touristmap_EN.pdf" },
    { id: "seoul-route-map-202509", org: "서울특별시", title: "서울 지하철 노선도 (Route Map)", date: "2025년 9월 게시본 · 2026-11-05 확인", url: "https://english.seoul.go.kr/wp-content/uploads/2025/09/route-map.pdf" },
    { id: "sindorim-station-opening", org: "구로구", title: "구로구, 신도림역 선상역사 개통식(15.05.21)", date: "표제 2015-05-21 · 2015-05-22 게시 · 개통식 2015-05-20 · 정식 개통 2015-05-23 자료 구분 · 2026-11-05 확인", url: "https://www.guro.go.kr/www/selectBbsNttView.do?bbsNo=665&key=1793&nttNo=22076&pageIndex=689&pageUnit=10" },
    { id: "sindorim-facility", org: "구로문화재단", title: "신도림 문화철도959 — 시설 정보", date: "게시일 미표기 · 2026-11-05 확인", url: "https://guroartsvalley.or.kr/user/overall/overallArt9.do" },
    { id: "sindorim-song-exhibition", org: "구로문화재단", title: "문화철도959 전시 상세 — 송유리 《The Secret Passage》 (displaySeq=406)", date: "전시 일정 2026-11-02~11-19 · 2026-11-05 확인", url: "https://www.guroartsvalley.or.kr/user/display/displayView.do?displaySeq=406&page=1" },
    { id: "sindorim-hong-exhibition", org: "구로문화재단", title: "문화철도959 전시 상세 — 홍승희 《방황하는 경로》 (displaySeq=407)", date: "전시 예정 2026-11-23~12-11 · 2026-11-05 확인", url: "https://www.guroartsvalley.or.kr/user/display/displayView.do?displaySeq=407&page=1" },
    { id: "sindorim-short-class", org: "구로문화재단", title: "2026 문화철도959 단기 문화교실 (etcSeq=3701)", date: "모집 2026-09-10~10-23 · 수업 일정은 공고 기준 · 2026-11-05 확인", url: "https://www.guroartsvalley.or.kr/user/bizetc/bizetcView.do?etcSeq=3701&page=1" },
    { id: "sindorim-quarterly-class", org: "구로문화재단", title: "2026년 4분기 문화교실 (programSeq=147)", date: "운영 일정 2026-10-12~12-18 · 접수 2026-09-07~09-28 · 2026-11-05 확인", url: "https://guroartsvalley.or.kr/user/bizprogram/view.do?programSeq=147" },
    { id: "sindorim-opera-facility", org: "구로문화재단", title: "신도림오페라하우스 — 시설 정보", date: "게시일 미표기 · 2026-11-05 확인", url: "https://www.guroartsvalley.or.kr/user/overall/overallArt8.do" },
    { id: "sindorim-2024-festival", org: "서울문화포털", title: "2024 서울축제지도 — 신도림오페라하우스 예정 프로그램", date: "행사 예정 2024-10-04~05 · 2026-11-05 확인", url: "https://culture.seoul.go.kr/culture/bbs/B0000000/view.do?menuNo=200050&nttId=13179&pageIndex=" },
    { id: "sindorim-2025-film", org: "구로문화재단", title: "신도림오페라하우스 인디영화 상영 공지 (etcSeq=3645)", date: "행사 일정 2025-06-25 · 2026-11-05 확인", url: "https://guroartsvalley.or.kr/user/bizetc/bizetcView.do?etcSeq=3645&page=1" },
    { id: "sindorim-gori-history", org: "서울문화포털", title: "서울생활문화센터 신도림 — 고리 공간 이력", date: "게시일 미표기 · 2026-11-05 확인", url: "https://culture.seoul.go.kr/night/sub/nightFac/view.do?facId=33" },
  ],
  related: [
    { title: "동대문디자인플라자 주변에서는 은빛 건물 말고 무엇을 볼 수 있을까?", href: "/article/ddp-history-walk/" },
    { title: "종로3가역에서 낙원상가와 종묘는 어느 출구로 나가야 할까?", href: "/article/jongno3-music-heritage/" },
  ],
  datePublished: "2026-11-05T00:00:00+09:00",
  dateModified: "2026-11-05T13:29:29+09:00",
};
