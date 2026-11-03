import type { Station } from "../types";
import { stationPhotos } from "../station-photos";

export const jamsil: Station = {
  slug: "jamsil",
  photo: stationPhotos["jamsil"],
  no: 1,
  name: "잠실역",
  lines: ["2", "8"],
  section: "transfer",
  sign: { line: "2", prev: "잠실새내", next: "잠실나루", en: "Jamsil" },
  question: "잠실역 2호선과 8호선은 어떻게 연결되나?",
  seoTitle: "잠실역 2·8호선 환승통로와 개선 발표",
  answer: "잠실역 2호선과 8호선은 환승통로로 연결되며, 서울시는 2025년 12월 4일 통로 공간 재배치와 안전펜스 보강을 발표했다.",
  answerSourceIds: ["seoul-2025-12"],
  teaser: "잠실역 2·8호선 환승통로에는 어떤 개선이 발표됐을까?",
  ogImage: "/images/station/jamsil-photo.jpg",
  stats: [
    { value: "1980년", label: "잠실을 지나는 2호선 신설동~종합운동장 구간 개통", asOf: "1980-10-31 개통", sourceIds: ["seoul-history"] },
    { value: "1996년", label: "8호선 잠실~모란 구간 개통", asOf: "1996-11-23 개통", sourceIds: ["seoul-history"] },
    { value: "2025년", label: "서울시의 잠실 환승통로 공간 재배치·안전펜스 보강 발표", asOf: "2025-12-04 발표", sourceIds: ["seoul-2025-12"] },
  ],
  pin: { text: "", sourceIds: [] },
  // shortcut: 잠실 환승정보 원본 행을 확인할 때까지 하차 안내를 숨김, 행 대조 후 복원
  transfers: [],
  reel: {
    notice: "기존 영상의 약 200m와 승강장 위치 선정 이유는 원측정 자료와 당시 설계 기록을 확인하지 못했습니다. 이 기사에서는 해당 단정을 삭제했습니다.",
    url: "https://www.instagram.com/reel/De8-ObmRYZk/",
    thumbnail: "/images/station/jamsil-reel.jpg",
    postedAt: "2026-10-26T18:35:00+09:00",
  },
  body: [
    {
      heading: "서로 다른 때에 들어온 두 노선",
      paragraphs: [
        { text: "서울역사편찬원의 『서울 2천년사』 제36권에 따르면, 잠실을 지나는 2호선 신설동~종합운동장 구간은 1980년 10월 31일 개통했다. 8호선 잠실~모란 구간은 1996년 11월 23일 개통했다. 같은 책은 8호선이 잠실에서 2호선과 만나 송파대로를 따라 남하하도록 계획됐다고 기록한다.", sourceIds: ["seoul-history"] },
        { text: "개통 연혁은 두 노선이 잠실에 들어온 순서를 알려준다. 다만 이 기록만으로 승강장의 위치를 정한 이유나 환승통로의 보행거리를 설명할 수는 없다.", sourceIds: ["seoul-history"] },
      ],
    },
    {
      heading: "발표된 통로 개선",
      paragraphs: [
        { text: "서울시는 2025년 12월 잠실역 환승통로의 공간을 재배치하고 안전펜스를 보강하겠다고 발표했다.", sourceIds: ["seoul-2025-12"] },
        { text: "2026년 4월 뉴스핌과 교통일보는 서울교통공사가 통로 안 상가 세 곳을 철거하고 통로 폭을 4.2m에서 8.3m로 넓힐 계획을 발표했다고 전했다. 두 수치는 걷는 거리가 아니라 기존 폭과 계획 폭이다.", sourceIds: ["newspim-2026-04", "tdaily-2026-04"] },
        { text: "발표된 개선책을 완료된 공사로 읽을 수는 없다. 확인된 자료에는 통로 확장의 완료일과 현재 폭이 없다. 잠실역에서 갈아탈 때는 방문 시점의 역내 환승 안내를 확인해야 한다.", sourceIds: ["seoul-2025-12", "newspim-2026-04", "tdaily-2026-04"] },
      ],
    },
  ],
  qna: [],
  sources: [
    { id: "seoul-history", org: "서울역사편찬원", title: "『서울 2천년사』 제36권, 158·168~169쪽", date: "2016-12-20 발행", url: "https://history.seoul.go.kr/ebook/getFile/prACysRcyFR/pdf" },
    { id: "seoul-2025-12", org: "서울특별시 교통실", title: "5개 혼잡 환승역 맞춤형 혼잡 개선 착수", date: "2025-12-04 발표", url: "https://news.seoul.go.kr/traffic/archives/515812" },
    { id: "newspim-2026-04", org: "뉴스핌", title: "서울교통공사, 홍대입구역 등 혼잡역사 5곳 '맞춤형 공간 개선' 추진", date: "2026-04-07 보도", url: "https://ir.newspim.com/news/view/20260407000854" },
    { id: "tdaily-2026-04", org: "교통일보", title: "서울 지하철 혼잡 5개 역사 뜯어고친다…잠실역 환승통로 폭 두 배로", date: "2026-04-08 보도", url: "https://www.tdaily.co.kr/news/view.php?idx=60632" },
  ],
  datePublished: "2026-10-29T09:00:00+09:00",
  dateModified: "2026-11-03T10:57:01+09:00",
  corrections: [
    { date: "2026-11-03", before: "2호선과 8호선 승강장 사이가 약 200m이며 곧은 승강장을 놓기 위해 8호선 위치를 비켰다는 설명", after: "측정 범위와 당시 설계 기록을 확인하지 못해 거리·설계 목적 단정을 삭제", reason: "칼럼·위키의 설명을 공식 측정·설계 근거로 확인할 수 없었다." },
    { date: "2026-11-03", before: "2024년 하루 평균 승하차 156,177명과 통로 폭 4.2m→8.3m를 숫자 카드로 표시", after: "검증된 구간 개통일과 2025년 개선 발표일로 카드 교체; 2026년 폭은 보도에 나온 계획으로 본문에서 한정", reason: "현재 환승 구조를 설명하는 데 필요한 근거 범위와 발표·완료 단계를 구분했다." },
    { date: "2026-11-03", before: "반대쪽 끝 칸에서 내리면 최대 2분 47초를 더 걷는다는 안내와 방향별 하차 칸·시간", after: "잠실역 환승정보 원본 행과 산식을 확인할 때까지 하차 칸·시간 안내를 내림", reason: "공공데이터 목록 설명만으로 각 행의 값과 추가시간을 검증할 수 없었다." },
  ],
};
