import type { MagazineArticle } from "../articles";
import { stationPhotos } from "../station-photos";

export const ddpHistoryWalk: MagazineArticle = {
  slug: "ddp-history-walk",
  image: stationPhotos["ddp-history-walk"],
  imagePlacement: "body",
  section: "see",
  question: "동대문디자인플라자 주변에서는 은빛 건물 말고 무엇을 볼 수 있을까?",
  answer: "동대문디자인플라자(DDP) 주변에서는 곡면 건축과 공원에 드러난 한양도성의 물길, 옛 운동장의 기억, 원단과 부자재를 거래하는 시장을 함께 보며 동대문을 서로 다른 시대와 쓰임이 겹친 동네로 이해할 수 있다.",
  answerSourceIds: ["ddp-architecture-zha", "ddp-museum-history", "ddp-ground-museum", "visitseoul-market"],
  station: {
    name: "동대문역사문화공원역",
    lines: ["2", "4", "5"],
    sign: { line: "2", prev: "을지로4가", next: "신당", en: "Dongdaemun History & Culture Park" },
    sourceIds: ["seoul-tourist-map-en-202603", "seoul-route-map-202509"],
  },
  body: [
    {
      heading: "건물 한 채보다 넓게 보는 DDP",
      paragraphs: [
        {
          text: "DDP를 볼 때 은빛 건물의 전체 모양부터 살피는 것은 자연스러운 출발이다. 자하 하디드가 설계한 이 건축물은 2014년 문을 열었다. 외관의 굽은 면을 따라 시선을 옮기면 건물 아래의 공간과 광장, 주변 공원으로 관심이 넓어진다. 정면 한 곳을 골라 보는 것과 건물의 표면이 땅과 만나는 부분을 살피는 것은 서로 다른 관람 방법이다.",
          sourceIds: [
            "seoul-history-2022",
            "ddp-architecture-zha"
          ]
        },
        {
          text: "설계사인 자하 하디드 아키텍츠는 발굴된 성벽과 유물을 공원·광장·도시에 연결하는 구성을 DDP의 핵심으로 설명한다. 공원과 건물의 경계를 이어 놓으려 했다는 설계 의도를 알고 보면 곡선의 독특함만큼 건물 사이에 남겨진 바깥 공간에도 눈길을 줄 수 있다. DDP의 건축을 이해하는 실마리가 외벽 안에만 있는 것은 아니다.",
          sourceIds: [
            "ddp-architecture-zha"
          ]
        },
        {
          text: "이곳을 둘러볼 때는 세 가지 질문을 따라 시선을 옮겨 볼 만하다. 새 건물 곁에 왜 오래된 돌 시설이 있을까. 운동장이 사라진 자리에는 무엇이 남았을까. 디자인을 전시하는 공간 바깥의 시장은 어떤 물건을 다룰까. 그 답을 찾아가면 DDP와 동대문역사문화공원, 주변 상가를 따로 떨어진 명소 목록보다 구체적으로 읽을 수 있다.",
          sourceIds: [
            "ddp-museum-history",
            "ddp-ground-museum",
            "visitseoul-market"
          ]
        }
      ],
      image: stationPhotos["ddp-history-walk"]
    },
    {
      heading: "두 개의 아치 아래, 성벽을 통과하던 물",
      paragraphs: [
        {
          text: "동대문역사문화공원에서는 이간수문을 눈여겨볼 만하다. 나란한 두 석조 아치와 그 아래 물이 지날 자리는 성곽을 보는 관점을 바꾼다. 도성의 성벽은 사람의 출입을 막거나 허용하는 경계인 동시에, 안쪽의 물을 밖으로 내보내야 하는 시설이었다. 서울역사박물관은 한양도성 동쪽의 수문을 배수와 방어를 함께 맡았던 시설로 설명한다.",
          sourceIds: [
            "ddp-museum-history",
            "ddp-igansu-photo"
          ]
        },
        {
          text: "지금의 DDP와 공원 자리는 한때 동대문운동장이 있던 땅이다. 2008~2009년 발굴 조사에서 성벽과 조선시대 건물 터 등이 확인됐다. 운동장 아래에 있던 땅의 역사는 발굴된 구조와 유물로 살펴볼 수 있다.",
          sourceIds: [
            "ddp-museum-history"
          ]
        },
        {
          text: "이 땅의 변화를 더 자세히 보고 싶다면 동대문역사관을 살펴볼 만하다. 공식 전시 안내는 바닥에 표시한 발굴 도면으로 이 땅의 변화를 보여준다고 설명한다. 작은 출토품 하나를 보고 그것이 나온 터의 배치도 함께 살펴볼 수 있다는 뜻이다. 이간수문에서는 물이 통과하던 구멍을, 역사관에서는 여러 시설이 놓였던 땅의 관계를 살펴보는 식으로 관심을 나눠 볼 수 있다.",
          sourceIds: [
            "ddp-museum-history"
          ]
        }
      ],
      image: stationPhotos["ddp-igansu"]
    },
    {
      heading: "경기장이 있던 자리를 떠올리는 방법",
      paragraphs: [
        {
          text: "DDP 이전의 공간을 이해할 때는 옛 운동장 사진 한 장이 도움이 된다. 2004년 기록사진에는 지금의 곡면 건물 대신 경기장들이 자리한다. 사진을 현재 풍경과 비교하면 건물이 바뀌었다는 사실뿐 아니라, 같은 땅을 사용하던 방식이 얼마나 달랐는지 생각해 볼 수 있다.",
          sourceIds: [
            "ddp-stadium-photo"
          ]
        },
        {
          text: "동대문운동장기념관은 그 공간을 이용했던 사람들의 시간을 다룬다. 운동장은 1925년 경성운동장으로 문을 연 뒤 서울운동장, 동대문운동장으로 이름이 달라졌다. 공식 전시 안내에는 경기 사진과 야구 장비, 철거 때 수습한 관람석 의자와 조명탑 라이트 등이 등장한다. 공원에서 유적을 보는 것과 달리, 이곳에서는 경기를 뛰고 관람하던 생활을 물건과 기록으로 이해할 수 있다.",
          sourceIds: [
            "ddp-ground-museum"
          ]
        },
        {
          text: "동대문역사관과 동대문운동장기념관의 이름이 비슷해도 관람의 초점은 다르다. 앞의 공간이 발굴 자료로 운동장 이전의 땅을 보여준다면 뒤의 공간은 그 위에 만들어진 체육시설의 역사를 다룬다. 두 곳을 함께 살펴보면 동대문이라는 장소의 역사를 조선시대 유적이나 현대 건축 어느 한쪽에서 끝내지 않게 된다.",
          sourceIds: [
            "ddp-museum-history",
            "ddp-ground-museum"
          ]
        }
      ],
      image: stationPhotos["ddp-stadium-2004"]
    },
    {
      heading: "시장에서는 완성된 옷 이전의 재료를 본다",
      paragraphs: [
        {
          text: "관심을 동대문종합시장까지 넓히면 관찰할 대상이 다시 달라진다. 종로 272에 있는 이 시장은 동대문역 쪽의 별도 목적지다. 서울관광재단은 1970년 문을 연 시장으로 소개하며 원단·부자재·액세서리·혼수 관련 품목을 취급하는 도매와 소매 점포들을 안내한다. DDP의 전시공간과 같은 건물 안에 있는 곳은 아니다.",
          sourceIds: [
            "visitseoul-market"
          ]
        },
        {
          text: "여기에서 눈여겨볼 것은 완성된 옷의 디자인에 앞서는 선택들이다. 어떤 원단을 쓰고 어떤 부자재를 더할지, 옷이나 생활용품을 이루는 재료의 종류에 관심을 두면 시장을 보는 질문도 달라진다. 물건을 구매할 계획이 없더라도 판매 품목의 차이를 따라 시장의 성격을 이해할 수 있다.",
          sourceIds: [
            "visitseoul-market"
          ]
        },
        {
          text: "DDP에서 디자인의 형태를 보고 시장에서 그 형태를 이루는 재료를 살피는 방식은 동대문을 이해하는 또 하나의 연결이다. 디자인을 전시하는 공간과 그 재료를 거래하는 공간에서 각각 무엇을 보여주는지 비교해 볼 수 있다.",
          sourceIds: [
            "visitseoul-market"
          ]
        }
      ],
      image: stationPhotos["ddp-market-fabrics"]
    },
    {
      heading: "빛을 보는 날에는 건축이 배경이 된다",
      paragraphs: [
        {
          text: "DDP에는 건축과 유적을 살펴보는 방문과 다른, 행사 날짜에 맞춘 문화생활도 있다. 서울시가 2026년 9월 발표한 기록에 따르면 그해 가을 서울라이트 DDP는 9월 3일부터 11일 동안 열렸다. 서울시 발표에 실린 당시 사진은 빛과 영상이 더해진 건물이 작품을 보여주는 바탕이 되는 장면을 전한다.",
          sourceIds: [
            "ddp-light365-2026",
            "seoul-light-2026-guide"
          ]
        },
        {
          text: "같은 발표는 어울림광장 유구전시장 일대의 상설 미디어아트 프로그램 ‘DDP 365라이트’도 소개했다. 계절 축제와 별도로 소개된 프로그램이다. 건물의 곡면을 살피던 시선이 빛과 영상으로 옮겨 가는 관람도 DDP를 보는 한 가지 방법이다.",
          sourceIds: [
            "ddp-light365-2026"
          ]
        },
        {
          text: "동대문에서 머물 이유는 하나의 전시나 사진 지점에만 있지 않다. DDP에서는 건물과 바깥 공간의 관계를, 이간수문과 역사관에서는 성벽과 물길의 관계를, 운동장기념관에서는 사람들이 모였던 장소의 시간을 볼 수 있다. 시장까지 관심을 넓히면 디자인을 이루는 재료가 거래되는 동네도 만난다. 서로 다른 대상에서 무엇을 볼지 알고 나면, 은빛 건물 한 장의 사진으로 끝나던 방문에 다음 목적지가 생긴다.",
          sourceIds: [
            "ddp-architecture-zha",
            "ddp-museum-history",
            "ddp-ground-museum",
            "visitseoul-market"
          ]
        }
      ]
    },
    {
      heading: "방문 전에 확인할 것",
      paragraphs: [
        {
          text: "동대문역사관과 동대문운동장기념관의 관람일·임시휴관은 각각의 공식 관람 안내에서 확인한다. DDP의 전시·행사와 야간 프로그램은 방문일의 공식 공지를 기준으로 고른다. 2026년 가을 서울라이트는 종료된 행사다. 동대문종합시장은 구역별 영업시간이 다르므로 관심 있는 품목의 영업일을 확인하면 목적을 정하기 쉽다.",
          sourceIds: [
            "ddp-history-visit",
            "ddp-ground-visit",
            "ddp-light365-2026",
            "visitseoul-market"
          ]
        }
      ]
    }
  ],
  sources: [
    { id: "seoul-tourist-map-en-202603", org: "서울특별시·서울관광재단", title: "2026 Seoul Tourist Map, 2쪽 Seoul Metro Map", date: "2026년 3월 게시본 · 2026-11-05 확인", url: "https://english.seoul.go.kr/wp-content/uploads/2026/03/2026_touristmap_EN.pdf" },
    { id: "seoul-route-map-202509", org: "서울특별시", title: "서울 지하철 노선도 (Route Map)", date: "2025년 9월 게시본 · 2026-11-05 확인", url: "https://english.seoul.go.kr/wp-content/uploads/2025/09/route-map.pdf" },
    { id: "ddp-museum-history", org: "서울역사박물관", title: "동대문역사관 전시소개", date: "게시일 미표시 · 2026-11-05 확인", url: "https://museum.seoul.go.kr/scwm/exhibition/ddmHistory/ddmExhGuide.jsp" },
    { id: "ddp-architecture-zha", org: "Zaha Hadid Architects", title: "Dongdaemun Design Plaza", date: "게시일 미표시 · 2026-11-05 확인", url: "https://www.zha.com/projects/architecture/dongdaemun-design-plaza?disclaimer=true" },
    { id: "ddp-ground-museum", org: "서울역사박물관", title: "동대문운동장기념관 전시소개", date: "게시일 미표시 · 2026-11-05 확인", url: "https://museum.seoul.go.kr/scwm/exhibition/ddmGround/ddmGExhGuide.jsp" },
    { id: "seoul-history-2022", org: "서울특별시 서울사랑", title: "동대문디자인플라자와 동대문", date: "2022년 9월 게시 · 2026-11-05 확인", url: "https://love.seoul.go.kr/articles/9023" },
    { id: "visitseoul-market", org: "서울관광재단", title: "동대문종합시장", date: "2014-11-08 게시 · 2026-09-10 수정 · 2026-11-05 확인", url: "https://english.visitseoul.net/area/DongdaemunShoppingComplex/ENP000170" },
    {id: "ddp-igansu-photo", org: "오모군 · Wikimedia Commons", title: "Igansumun Gate — 이간수문 기록사진", date: "2015-08-30 촬영 · 2026-11-05 확인", url: "https://commons.wikimedia.org/wiki/File:Igansumun_Gate.JPG"},
    {id: "ddp-stadium-photo", org: "pcamp · Wikimedia Commons", title: "Dongdaemun Stadium Aerial View — 동대문운동장 기록사진", date: "2004-10-18 촬영 · 2026-11-05 확인", url: "https://commons.wikimedia.org/wiki/File:Dongdaemun_Stadium_Aerial_View.jpg"},
    {id: "ddp-light365-2026", org: "서울특별시 내 손안에 서울", title: "매일 밤 빛나는 'DDP 365라이트'…", date: "2026-09-28 게시 · 2026-11-05 확인", url: "https://mediahub.seoul.go.kr/archives/2019492"},
    {id: "seoul-light-2026-guide", org: "서울특별시·서울디자인재단 콘텐츠운영팀", title: "서울라이트 DDP 2026 가을", date: "2026-09-02 수정 · 2026-09-03~09-13 행사 · 2026-11-05 확인", url: "https://news.seoul.go.kr/culture/archives/534071"},
    {id: "ddp-history-visit", org: "서울역사박물관·한양도성박물관", title: "동대문역사관 관람정보", date: "게시일 미표시 · 2026-11-05 확인", url: "https://museum.seoul.go.kr/scwm/exhibition/ddmHistory/ddmWatchInfo.jsp"},
    {id: "ddp-ground-visit", org: "서울역사박물관·한양도성박물관", title: "동대문운동장기념관 관람정보", date: "게시일 미표시 · 2026-11-05 확인", url: "https://museum.seoul.go.kr/scwm/exhibition/ddmGround/ddmGWatchInfo.jsp"},
  ],
  related: [
    { title: "신도림의 공연장·창작공간·물길을 함께 읽기", href: "/article/sindorim-cultural-spaces/" },
    { title: "동묘앞역은 왜 토·휴일 승하차가 더 많을까?", href: "/article/dongmyo-weekend/" },
  ],
  datePublished: "2026-11-05T00:00:00+09:00",
  dateModified: "2026-11-05T14:10:19+09:00",
};
