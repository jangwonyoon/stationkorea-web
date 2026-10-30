# 매일 그 길 웹 — 에이전트 작업 지침

인스타 릴스 채널 [매일 그 길](https://www.instagram.com/maeil.geugil/)(@maeil.geugil)의 웹 매거진. 서울 지하철 역을 3D 단면으로 뜯어 "왜 이렇게 됐나"를 공식 숫자로 설명하는 역 기사를 모바일 퍼스트로 싣는다. 이 레포는 **사이트와 콘텐츠만** 둔다. 영상·대본·facts 제작은 [reel-studio](https://github.com/jangwonyoon/reel-studio)(로컬 `~/reel-studio-plugin`, `~/reel-studio`)에서 별도 세션이 맡는다. 이 레포에서 영상 제작 명령을 돌리지 않는다.

## 먼저 읽을 것
- 설계 문서(승인본): reel-studio `docs/designs/maeil-geugil-web.md` (PR #43 브랜치 `docs/maeil-geugil-web-design`). 로컬 사본: `~/.gstack/projects/jangwonyoon-reel-studio/diego-work-main-20261028-design-20261028-172015.md`
- 와이어프레임: reel-studio `docs/designs/wireframes/` (gallery.html, `shot-F-*.png`가 확정안). 공개 페이지: https://claude.ai/code/artifact/dc314215-158a-4ea2-84c7-5ae7165a894e
- 채널 문서: reel-studio `docs/formats/maeil-geugil.md`
- GEO 테스트: [docs/geo-test.md](docs/geo-test.md)(절차·질문 12개·판정 기준), 결과는 [docs/geo-log.md](docs/geo-log.md)에 추가. 설계 문서의 "2·6·12주 질문 5개" 계획과 성공 기준을 이 문서가 대체한다. 기사를 추가하거나 제목을 바꾸면 질문 표를 같은 PR에서 고친다.

## 확정 결정
- **1단계 범위**: 역 기사 3개(잠실·사당·건대입구) + 홈 + 제작 문의 페이지 + 측정. 2주 실험으로 "웹에서 읽는가"를 잰다. 주변 핫플 큐레이션·실시간 최단 루트·하차 칸 조회 도구는 만들지 않는다.
- **기사 템플릿(F안 = A 기사형 + D Q&A)**, 모바일 순서: ① 눈썹 + 질문 제목(H1) + 한 문장 답 ② 3D 단면 이미지 ③ 숫자·출처 카드 3개 ④ 하차 칸 한 줄 ⑤ 릴스 썸네일 + 인스타 링크(임베드 스크립트 없음) ⑥ Q&A 3~4개(왜 이런 구조인가 / 어디서 내리면 빠른가 / 얼마나 타나 / 무엇이 바뀌나, 답마다 출처) ⑦ "그럼 OO은 왜?" 다음 기사 카드 ⑧ 출처 전문·제작 문의·AI 시각화 고지. 데스크톱은 본문 왼쪽, 숫자 카드·릴스·다음 기사 오른쪽 고정. 숫자 카드 3개가 없는 기사는 발행하지 않는다.
- **홈(E안)**: 역 이름이 아니라 질문 목록. 최신 기사 가로 1줄 + 3열 카드 + 노선 칩.
- **배포**: Vercel(Hobby로 시작, 제작 문의 페이지 공개 시 Pro 검토). 완전 정적(`output: "export"`).
- **SEO·GEO 최우선**: 아래 "SEO·GEO 개발 규칙"이 모든 PR에 적용된다. GEO는 특정 회사가 아니라 생성형 AI 답변 전체(ChatGPT·Google AI Overviews/AI Mode·Gemini·Perplexity·Copilot·Claude·Meta AI·Apple·Grok·네이버 AI 브리핑/AI탭 등)를 대상으로 한다. 근거·엔진별 매트릭스·로드맵은 [docs/seo-geo-strategy.md](docs/seo-geo-strategy.md).
- **개인정보 수집 없음**: 쿠키·외부 임베드 스크립트·폼 금지. 문의는 이메일 주소 표기. 측정은 Umami Cloud(쿠키리스) 커스텀 이벤트: `next_click`, `read_end`(페이지뷰당 최초 1회, 라우트 전환마다 초기화), `return_visit`(localStorage에 첫 방문 시각·유입원만, 첫 방문 24시간 뒤~14일 안 1회), `ai_referral`(AI 답변엔진 리퍼러·`utm_source=chatgpt.com` 세션당 1회, engine 속성). 유입원은 UTM(`utm_source=instagram|community`). 외부에 거는 링크는 bit.ly 같은 외부 단축 URL 대신 자체 짧은 주소를 쓴다: 인스타 프로필 `stationkorea.com/ig`(→ `/?utm_source=instagram&utm_medium=profile`), 커뮤니티 `stationkorea.com/c`(→ `/?utm_source=community`). `vercel.json` redirects, 307이라 목적지를 바꿀 수 있다(사용자 결정 2026-10-29). 구현은 `src/components/Analytics.tsx`, 스크립트는 `data-domains="www.stationkorea.com"`으로 production만 집계. 측정 범위는 `/about/` "방문 통계와 개인정보"에 공개하고, 측정을 바꾸면 그 문구도 같은 PR에서 고친다.
- **GA4·AdSense 도입 시점(사용자 결정 2026-10-29)**: 지금은 Umami만 쓴다. GA4는 2주 실험이 통과("웹에서 읽힌다")하고 2단계(자동 생성)를 시작할 때 개인정보처리방침 페이지와 함께 붙이고, 이때 위 "개인정보 수집 없음"을 고친다. AdSense는 기사 20~30개 이상·운영 3개월 이상·처리방침/문의/소개 페이지 완비·예상 수익이 Vercel Pro($20/월)를 넘을 때 신청하며, Pro 전환과 `ads.txt`를 같이 한다. 근거: GA4만 되는 연령·성별·관심사는 Google 로그인 사용자 기반이라 인스타 인앱 유입·소규모 트래픽에서는 거의 비어 있고, 유입원·AI 리퍼러·지역·기기는 Umami로 되며, 검색어는 Search Console·서치어드바이저에서 본다.
- **출처**: 웹은 출처 전문(기관·자료명·기준일·URL). 조사 방법(CSV 파일 ID·내려받기 절차)은 적지 않는다.
- **AI 고지**: 3D 단면 영상 클립과 썸네일 배경만 AI 생성. 대본·숫자·출처는 사람이 썼다. 웹에서는 별도 고지 블록을 두지 않고 단면 이미지 캡션에 "AI 시각화 참고 이미지." 한 줄만 둔다(사용자 결정 2026-10-29).
- **디자인**: 비주얼은 사용자가 Claude Design으로 따로 확정한다. 그 전까지는 구조·시맨틱 HTML·반응형 배치만 만들고 색·서체에 공들이지 않는다.
- **확장 여지(구조만 비워 둠)**: 노선 허브 `/line/<노선>/`, 철도 소식 `/news/<날짜-슬러그>/`(숫자가 바뀌는 소식만, NewsArticle). 역 페이지의 "최근 소식" 자리는 비어 있으면 숨긴다.

## 콘텐츠 원천
- 기사 재료는 reel-studio의 `episodes/maeil-geugil/<편>/` 아래 `facts.md`(숫자·출처), `caption.txt`, `pin.txt`(하차 칸), `episode.json`(제목·permalink). 1단계는 손으로 옮기고, 자동 생성기는 3개 공개 뒤 2단계.
- 게시된 편과 permalink: 잠실 https://www.instagram.com/reel/De8-ObmRYZk/ , 사당 https://www.instagram.com/reel/De_BAeuiU93/ , 건대입구 https://www.instagram.com/reel/DfBF0puToTl/
- 이미지(단면 정지 이미지, 1200×630 OG, 9:16 릴스 썸네일)는 이 레포 `public/`에 커밋한다. 원본 렌더는 reel-studio 로컬 `compositions/maeil-geugil/<편>/renders/`에 있고 git에는 없다.

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

## 개발
```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # out/ 에 정적 사이트
```
