# STATION KOREA 웹 — 에이전트 작업 지침

웹사이트 이름은 **STATION KOREA**, 인스타그램·영상 채널 이름은 [매일 그 길](https://www.instagram.com/maeil.geugil/)(@maeil.geugil)이다. 두 이름을 동등하게 병기하거나 ×로 결합하지 않는다. 이동·길·공간·변화를 다루며, 현재는 서울 지하철 역의 구조를 단면 이미지와 공식 숫자로 설명하는 기사에서 출발한다. 서울 지하철은 현재 콘텐츠의 범위이며 매거진 전체의 지역·주제 제한이 아니다. 이 레포는 **사이트와 콘텐츠만** 둔다. 영상·대본·facts 제작은 [reel-studio](https://github.com/jangwonyoon/reel-studio)(로컬 `~/reel-studio-plugin`, `~/reel-studio`)에서 별도 세션이 맡는다. 이 레포에서 영상 제작 명령을 돌리지 않는다.

## 먼저 읽을 것
- 설계 문서(승인본): reel-studio `docs/designs/maeil-geugil-web.md` (PR #43 브랜치 `docs/maeil-geugil-web-design`). 로컬 사본: `~/.gstack/projects/jangwonyoon-reel-studio/diego-work-main-20261028-design-20261028-172015.md`
- 와이어프레임: reel-studio `docs/designs/wireframes/` (gallery.html, `shot-F-*.png`가 확정안). 공개 페이지: https://claude.ai/code/artifact/dc314215-158a-4ea2-84c7-5ae7165a894e
- 채널 문서: reel-studio `docs/formats/maeil-geugil.md`
- GEO 테스트: [docs/geo-test.md](docs/geo-test.md)(절차·질문 표·판정 기준), 결과는 [docs/geo-log.md](docs/geo-log.md)에 추가. 설계 문서의 "2·6·12주 질문 5개" 계획과 성공 기준을 이 문서가 대체한다. 기사를 추가하거나 제목을 바꾸면 질문 표를 같은 PR에서 고친다.

## 확정 결정
- **성수 이후 기존 역 해설 확장(2026-11-02, #78)**: 확인된 구조와 접근·환승의 관계를 소제목이 있는 해설 본문으로 설명할 수 있다. 기존 역 URL·역명판·노선 번호·수치의 정의·정정 기록은 보존한다. 본문 전체를 Q&A로 강제하지 않고 화면에 남은 질문/답만 FAQ로 마크업한다. 역사·미래·도식은 근거와 설명 필요가 있을 때만 추가하며, 일반 하차 안내와 교통약자 경로를 구분한다.
- **역을 파헤치다 성수 시범(2026-11-02)**: 갈아타다 메뉴 안의 연재로 유지하고 첫 시범 성수를 홈 대표로 소개한다. 현재 연결 → 개통 과정 → 행선지의 흐름과 출처 있는 비축척 관계도를 사용한다. 그림은 실제 선로·지리·승강장 배치가 아니며 생략 범위를 표시한다. 연재 번호·새 모음 URL·미확인 미래 사업 예시는 추가하지 않는다. 하차 안내는 본문 뒤에 유지한다.
- **역 기사 상세 공통 디자인(2026-11-01, #146)**: `Article-1280.dc.html`의 전체 폭 역명판·중앙 흰 역명 상자·노선 교차 표현을 기존 `/station/`과 역 정보가 있는 `/article/` 모두에 적용한다. 본문과 오른쪽 보조 정보는 역명판 아래에서 함께 시작한다. “기존 역명판 유지”는 낡은 배치 유지가 아니라 노선색·번호·확인된 안내 데이터 보존을 뜻한다. 모바일은 라벨과 중앙 판이 겹치지 않게 재배치한다. 환승 방면은 기존 근거가 있는 값만 표시하고 시안의 사당 정보를 다른 역에 복사하지 않는다. 원본의 옛 제호·미확인 수치·자리표시·하차 안내 위치는 현재 승인된 콘텐츠/본문 뒤 안내 기준을 대체하지 않는다.
- **브랜드 승인(2026-11-01)**: 원본 A안(STATION KOREA 주 표기)을 채택했다. “stationkorea.com은 주소로만”이라는 이전 규칙을 대체한다. 웹 기사와 영상은 각각 독립적으로 읽고 볼 수 있는 콘텐츠이며, 영상이 기사 발행의 선행 조건이 아니다. 서울 지하철에 한정하지 않되 전국·세계 보도나 미래 발행 일정을 약속하지 않는다. 새 심벌은 미확정이다.
- **소개·매거진 방향(사용자 결정 2026-10-31)**: #갈아타다·#걷다·#보다·#바뀌다의 기존 의미를 유지하며 이동·길·공간·변화를 소개한다. 현재 공개된 서울 역 기사와 앞으로 다룰 수 있는 범위를 구분하고, 전국·세계 보도나 발행 일정을 약속하지 않는다. 소개 페이지는 인상적인 스크롤 경험을 허용하되 기존 단면 이미지의 단순 확대를 대표 연출로 삼지 않는다. 소개에는 사용 조건을 확인한 실제 사진과 전철·버스 측면 일러스트와 공개된 실제 노선도를 쓴다(사용자 결정 2026-11-01). 화면의 완성도를 우선하며, 필요한 라이브러리 사용을 허용한다. 사실로 보이는 가상 노선·수치·연결은 만들지 않는다. 기존 정책 앵커와 접근성·정적 HTML의 읽기 흐름을 유지한다.
- **초기 공개 범위(2026-10-29 기록)**: 역 기사 3개(잠실·사당·건대입구)에서 시작했다. 현재 발행 범위는 통합 기사 목록을 기준으로 하며, 이 초기 계획을 기사 수나 주제의 상한으로 사용하지 않는다. 2주 실험으로 "웹에서 읽는가"를 잰다. 실시간 최단 루트·하차 칸 조회 도구는 만들지 않는다.
- **매거진 확장(사용자 결정 2026-10-30)**: 역 주변 먹거리·장소 큐레이션을 더한다. 웹 제호는 아래 2026-11-01 A안 승인에 따라 STATION KOREA로 변경하며, 섹션은 #갈아타다(역·환승 구조)·#걷다(출구별 동네·보행·생활, 먹거리 포함)·#보다(랜드마크·공간)·#바뀌다(도시 변화·새 노선·숫자가 바뀌는 소식) 4개(사용자 결정 2026-10-30). 장소는 공식 지정·집계에 이름이 오른 곳만(백년가게·착한가격업소·모범음식점 등), 카드마다 지정 기관·기준일. 네이버 플레이스·카카오맵·다른 매체의 사진·리뷰·메뉴·문장은 쓰지 않고, AI 음식·장소 사진은 쓰지 않는다. 지도 SDK는 임베드하지 않고 정적 출구 다이어그램 + 네이버 지도·카카오맵 링크로 한다. 계획·데이터 출처·경쟁 지형은 [docs/magazine-plan.md](docs/magazine-plan.md).
- **2주 실험 재시작(사용자 결정 2026-10-29)**: 디자인 개편 배포일을 새 D+0으로 다시 센다. 그 전 데이터는 기준선(v1)으로 따로 보고하고, Umami 이벤트에 `tpl` 속성(v1/v2)을 붙여 구분한다.
- **기사 템플릿(F안 = A 기사형 + D Q&A)**, 모바일 순서: ① 눈썹 + 질문 제목(H1) + 한 문장 답 ② 3D 단면 이미지 ③ 숫자·출처 카드 3개 ④ 하차 칸 한 줄 ⑤ 릴스 썸네일 + 인스타 링크(임베드 스크립트 없음) ⑥ Q&A 3~4개(왜 이런 구조인가 / 어디서 내리면 빠른가 / 얼마나 타나 / 무엇이 바뀌나, 답마다 출처) ⑦ "그럼 OO은 왜?" 다음 기사 카드 ⑧ 출처 전문·제작 문의·AI 시각화 고지. 데스크톱은 본문 왼쪽, 숫자 카드·릴스·다음 기사 오른쪽 고정. 숫자 카드 3개가 없는 기사는 발행하지 않는다.
- **릴스 전 독립 기사(#100·#101·#106, 2026-11-01)**: `/article/<slug>/`는 검증된 해설 본문을 릴스보다 먼저 발행할 수 있다. 역 해부 F안의 숫자 카드 3개·단면·하차 칸·릴스 URL은 이 기사 형식에 강제하지 않는다. 공개 수치에는 같은 문단의 기준일·출처를 붙이고, 없는 영상·사진·실용 경로를 만들어 넣지 않는다. 신규 기사의 날짜는 실제 웹 게시일로 관리한다.
- **홈·탐색(A안 승인, 2026-11-01)**: 첫 문장 “역에서 시작해, 길과 동네와 도시를 읽습니다.”, 보조 문장 “교통과 공간의 구조, 그 주변의 생활과 변화를 이야기하는 웹매거진입니다.” 전체 발행 글에서 대표 기사를 선택하며 이미지는 선택 사항이다. 대표를 제외한 최근 기사 최대 4편, 모바일 행/중간 2열/넓은 4열. 헤더는 STATION KOREA / 기사 / 노선 / 소개 / 테마 전환. 전체·섹션 목록은 독립 주소를 쓰고 빈 섹션은 준비 중으로 표시한다. 영상 연결은 “영상으로 만나는 매일 그 길 ↗”. 상세 근거는 [디자인 결정](docs/design/station-korea/decision.md).
- **배포**: Vercel(Hobby로 시작, 제작 문의 페이지 공개 시 Pro 검토). 완전 정적(`output: "export"`).
- **SEO·GEO 최우선**: 아래 "SEO·GEO 개발 규칙"이 모든 PR에 적용된다. GEO는 특정 회사가 아니라 생성형 AI 답변 전체(ChatGPT·Google AI Overviews/AI Mode·Gemini·Perplexity·Copilot·Claude·Meta AI·Apple·Grok·네이버 AI 브리핑/AI탭 등)를 대상으로 한다. 근거·엔진별 매트릭스·로드맵은 [docs/seo-geo-strategy.md](docs/seo-geo-strategy.md).
- **개인정보 수집 없음**: 쿠키·외부 임베드 스크립트·폼 금지. 문의는 이메일 주소 표기. 측정은 Umami Cloud(쿠키리스) 커스텀 이벤트: `next_click`, `read_end`(페이지뷰당 최초 1회, 라우트 전환마다 초기화), `return_visit`(localStorage에 첫 방문 시각·유입원·중복 집계 방지 표시, 첫 방문 24시간 뒤~14일 안 1회), `ai_referral`(AI 답변엔진 리퍼러·`utm_source=chatgpt.com` 세션당 1회, sessionStorage에 중복 집계 방지 표시, engine 속성). 유입원은 UTM(`utm_source=instagram|community`). 외부에 거는 링크는 bit.ly 같은 외부 단축 URL 대신 자체 짧은 주소를 쓴다: 인스타 프로필 `stationkorea.com/ig`(→ `/?utm_source=instagram&utm_medium=profile`), 커뮤니티 `stationkorea.com/c`(→ `/?utm_source=community`). `vercel.json` redirects, 307이라 목적지를 바꿀 수 있다(사용자 결정 2026-10-29). 구현은 `src/components/Analytics.tsx`, 스크립트는 `data-domains="www.stationkorea.com"`으로 production만 집계. 측정 범위는 `/about/` "방문 통계와 개인정보"에 공개하고, 측정을 바꾸면 그 문구도 같은 PR에서 고친다.
- **GA4·AdSense 도입 시점(사용자 결정 2026-10-29)**: 지금은 Umami만 쓴다. GA4는 2주 실험이 통과("웹에서 읽힌다")하고 2단계(자동 생성)를 시작할 때 개인정보처리방침 페이지와 함께 붙이고, 이때 위 "개인정보 수집 없음"을 고친다. AdSense는 기사 20~30개 이상·운영 3개월 이상·처리방침/문의/소개 페이지 완비·예상 수익이 Vercel Pro($20/월)를 넘을 때 신청하며, Pro 전환과 `ads.txt`를 같이 한다. 근거: GA4만 되는 연령·성별·관심사는 Google 로그인 사용자 기반이라 인스타 인앱 유입·소규모 트래픽에서는 거의 비어 있고, 유입원·AI 리퍼러·지역·기기는 Umami로 되며, 검색어는 Search Console·서치어드바이저에서 본다.
- **출처**: 웹은 출처 전문(기관·자료명·기준일·URL). 조사 방법(CSV 파일 ID·내려받기 절차)은 적지 않는다.
- **AI 고지**: 3D 단면 영상 클립과 썸네일 배경만 AI 생성. 대본·숫자·출처는 사람이 썼다. 웹에서는 별도 고지 블록을 두지 않고 단면 이미지 캡션에 "AI 시각화 참고 이미지." 한 줄만 둔다(사용자 결정 2026-10-29).
- **디자인**: 비주얼은 사용자가 Claude Design으로 확정한다. 요청 프롬프트는 [docs/design-brief.md](docs/design-brief.md)(모바일 퍼스트, 지하철 안내 체계 아트 디렉션). 시안이 확정되면 토큰·컴포넌트를 이 레포로 옮긴다. 2026-11-01 원본 A안의 주 표기와 별도 프로토타입의 홈·탐색 구조를 승인했다. 비교안·폐기안·해시 라우팅·고정 숫자·중복 HTML은 구현하지 않는다. 기존 서체·노선색·역명판·본문 뒤 하차 안내는 유지한다.
- **확장 여지(구조만 비워 둠)**: 노선 허브 `/line/<노선>/`, 철도 소식 `/news/<날짜-슬러그>/`(숫자가 바뀌는 소식만, NewsArticle). 역 페이지의 "최근 소식" 자리는 비어 있으면 숨긴다.

## 콘텐츠 원천
- 기존 영상과 연결할 때 기사 재료는 reel-studio의 `episodes/maeil-geugil/<편>/` 아래 `facts.md`(숫자·출처), `caption.txt`, `pin.txt`(하차 칸), `episode.json`(제목·permalink)을 참고한다. 원 공공 출처를 대조하고, 릴스 대본을 그대로 기사로 옮기지 않는다. 독립 기사는 영상 자료나 릴스 발행을 기다릴 필요가 없으며 해설 본문과 근거로 발행 여부를 판단한다.
- 게시된 편과 permalink: 잠실 https://www.instagram.com/reel/De8-ObmRYZk/ , 사당 https://www.instagram.com/reel/De_BAeuiU93/ , 건대입구 https://www.instagram.com/reel/DfBF0puToTl/
- 이미지(단면 정지 이미지, 1200×630 OG, 9:16 릴스 썸네일)는 이 레포 `public/`에 커밋한다. 원본 렌더는 reel-studio 로컬 `compositions/maeil-geugil/<편>/renders/`에 있고 git에는 없다.
- **철도 리서치 때 함께 확인할 곳(사용자 요청 2026-10-30)**: 역·노선을 조사할 때 아래 두 곳에 같은 주제 글이 있는지 먼저 본다. 둘 다 교통평론가 한우진 운영.
  - [미래철도DB](https://frdb2.ivyro.net/index.html): 계획 노선 스펙표·진행 연표. 국토교통부 고시번호 같은 1차 출처를 찾는 색인으로 쓴다.
  - [한우진의 교통평론](https://blog.naver.com/ianhan): 역 구조 해설. 우리가 무엇을 더할 수 있는지(공식 숫자·기준일·단면) 가늠하는 경쟁 기준이자, 네이버 AI 브리핑에서 인용되는 선점자.
  - 두 곳의 숫자는 원 공공 출처에서 직접 확인한 뒤에만 쓰고, 사진·배선도·문장은 쓰지 않는다(ⓒ 표기). 인용이 필요하면 출처를 밝힌다.

## SEO·GEO 개발 규칙 (사용자 결정 2026-10-29, 모든 PR에 적용)

AI 답변엔진 대부분은 기존 검색 색인에서 출처를 가져온다(Google·Bing·네이버, Claude는 Brave). 그래서 색인 확보와 인용되기 쉬운 구조가 GEO의 대부분이다. 규칙을 바꾸려면 근거를 [docs/seo-geo-strategy.md](docs/seo-geo-strategy.md)에 먼저 적는다.

**콘텐츠 구조**
1. 기사의 H1은 질문, 첫 문단은 한 문장 답이다. 답에는 역·노선·핵심 숫자·기준일이 들어가고 JS 없이 HTML에 있다.
2. 숫자 카드·표·Q&A에 나오는 모든 수치는 같은 블록에 기준일과 출처 링크를 가진다. 출처 없는 숫자는 발행하지 않는다.
3. Q&A 답 하나는 앞 문맥 없이 읽혀도 뜻이 통해야 한다. 주어(역 이름)와 숫자를 생략하지 않는다.
4. `<title>`·H1·description에 키워드를 반복해 채우지 않는다. 역 이름은 title에 한 번.

**구조화 데이터**
5. JSON-LD 값(headline, FAQ 질문·답, 날짜, author)은 화면 텍스트와 일치한다. 화면에 없는 내용을 마크업에만 넣지 않는다.
6. Article `author`는 Person(name + 사이트 안 저자 페이지 url), `publisher` Organization은 `logo`와 `sameAs`(인스타)를 가진다.
7. `dateModified`는 숫자·출처·본문이 실제로 바뀐 커밋에서만 올리고, 화면에 수정일을 표시한다. 날짜만 바꾸지 않는다.
8. 페이지에서 재생하지 않는 영상에 VideoObject를, 내려받을 데이터 파일이 없는 표에 Dataset을 쓰지 않는다.

**기술 SEO**
9. 첫 화면 단면 이미지만 `priority`, 나머지는 lazy. 모든 이미지는 내용을 설명하는 `alt`와 의미 있는 파일명을 가진다.
10. canonical·내부 링크·sitemap·OG·RSS·JSON-LD의 URL은 `https://www.stationkorea.com` 기준, 슬래시로 끝나는 한 형식으로 통일한다.
11. 기사별 `.md`·llms 계열 파일은 HTML의 대체본이다. `.md`는 `vercel.json` headers로 `Link: <HTML URL>; rel="canonical"`을 보내고 sitemap에 넣지 않는다. llms 계열은 유지하되 성과 지표로 쓰지 않는다.
12. 각 기사는 관련 기사(같은 노선·같은 주제)를 본문에서 2개 이상 링크한다. 3단계부터 노선 허브를 breadcrumb 상위에 둔다.

**크롤러·색인**
13. robots.txt와 Vercel Firewall/Bot Protection은 검색·사용자 요청 봇을 막지 않는다: Googlebot, Bingbot, Yeti, OAI-SearchBot, ChatGPT-User, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Applebot, meta-webindexer, meta-externalfetcher, xAI-Grok. `nosnippet`·`max-snippet:0`을 쓰지 않는다.
14. 학습용 봇(GPTBot, ClaudeBot, Google-Extended, Applebot-Extended, Meta-ExternalAgent, CCBot)도 기본 허용한다. 막으려면 이 파일에 결정을 기록한다. Google-Extended를 막으면 Gemini grounding에서 빠질 수 있다.
15. Googlebot을 막는 규칙을 어떤 경로에도 두지 않는다. Brave(Claude의 검색 백엔드)는 Googlebot 규칙을 따른다.
16. 내용이 바뀐 URL은 production 배포 뒤 IndexNow로 알린다(Bing·네이버 등 참여 엔진에 전달). 키 파일은 `public/`.
17. sitemap.xml과 rss.xml은 Google Search Console·Bing Webmaster Tools·네이버 서치어드바이저 세 곳에 제출된 상태를 유지한다. 새 URL 종류(`/line/`, `/news/`)가 생기면 sitemap에 같은 PR에서 넣는다.

**신뢰(E-E-A-T)**
18. 모든 기사에 화면에 보이는 바이라인(저자 페이지 링크)이 있다. `/about/`에 운영 주체·출처 정책·정정 정책·AI 사용 범위·연락 이메일을 둔다. 제작 공정(도구·절차·데이터 처리·파이프라인)은 사이트·공개 문서에 쓰지 않는다(사용자 결정 2026-10-30).
19. 숫자를 정정하면 기사 하단 "정정 기록"에 날짜·이전 값·새 값·사유를 남긴다.

**2단계 자동 생성 가드레일**
20. 자동 생성 초안은 숫자·출처 카드 3개(출처마다 기관·자료명·기준일·URL), 사람 검수자·검수일, 그 역에만 해당하는 질문과 구조 설명이 없으면 빌드를 실패시킨다. `noindex`로 우회해 발행하지 않는다. title·description·alt·JSON-LD도 검수 대상이다(Google scaled content abuse 정책). 공개 속도는 검수 속도에 맞추고 페이지 수 목표를 두지 않는다.

**PR 체크리스트** (기능 PR 본문에 결과를 적는다)
- `pnpm build` 뒤 `out/` HTML에 H1·첫 문단 답·숫자 표·출처 목록이 있다.
- 바꾼 페이지의 JSON-LD가 Schema.org Validator 오류 0이고, 새 페이지 종류는 Rich Results Test를 통과한다.
- 새 URL은 sitemap·RSS·내부 링크에 들어갔고 canonical이 규칙 10 형식이다.
- 배포 뒤 `curl -I`로 200·canonical·리다이렉트를, AI 봇 UA로 200을 확인한다(`docs/geo-test.md` 명령).
- 기사 추가·제목 변경 시 `docs/geo-test.md` 질문 표를 같은 PR에서 고친다.

## 작업 규칙
- 답변은 한국어. 비유·과장 없이 사실 평서문.
- 브랜치: 기능 브랜치 → `develop`(PR) → `main`(릴리스 PR). Vercel은 `main` 머지 때만 production 배포한다(`vercel.json`).
- PR 먼저, 머지는 사용자가 말할 때만. push 출력은 필터링하지 않고 `git status -sb`로 반영 확인.
- `.env*`는 커밋하지 않는다. 도메인이 정해지면 Vercel 환경변수 `NEXT_PUBLIC_SITE_URL`.
- 커밋 전 `pnpm lint && pnpm build` 통과.
- 스타일은 Tailwind CSS v4 유틸리티 클래스로만. 토큰은 globals.css @theme/@utility에서 정의하고, 컴포넌트에서 별도 CSS 파일·CSS 모듈·인라인 style·임의값 클래스를 쓰지 않는다(예외는 PR에 이유를 적음).

## 개발
```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # out/ 에 정적 사이트
```
