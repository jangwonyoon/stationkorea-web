# 매일 그 길 웹 — 에이전트 작업 지침

인스타 릴스 채널 [매일 그 길](https://www.instagram.com/maeil.geugil/)(@maeil.geugil)의 웹 매거진. 서울 지하철 역을 3D 단면으로 뜯어 "왜 이렇게 됐나"를 공식 숫자로 설명하는 역 기사를 모바일 퍼스트로 싣는다. 이 레포는 **사이트와 콘텐츠만** 둔다. 영상·대본·facts 제작은 [reel-studio](https://github.com/jangwonyoon/reel-studio)(로컬 `~/reel-studio-plugin`, `~/reel-studio`)에서 별도 세션이 맡는다. 이 레포에서 영상 제작 명령을 돌리지 않는다.

## 먼저 읽을 것
- 설계 문서(승인본): reel-studio `docs/designs/maeil-geugil-web.md` (PR #43 브랜치 `docs/maeil-geugil-web-design`). 로컬 사본: `~/.gstack/projects/jangwonyoon-reel-studio/diego-work-main-20261028-design-20261028-172015.md`
- 와이어프레임: reel-studio `docs/designs/wireframes/` (gallery.html, `shot-F-*.png`가 확정안). 공개 페이지: https://claude.ai/code/artifact/dc314215-158a-4ea2-84c7-5ae7165a894e
- 채널 문서: reel-studio `docs/formats/maeil-geugil.md`

## 확정 결정
- **1단계 범위**: 역 기사 3개(잠실·사당·건대입구) + 홈 + 제작 문의 페이지 + 측정. 2주 실험으로 "웹에서 읽는가"를 잰다. 주변 핫플 큐레이션·실시간 최단 루트·하차 칸 조회 도구는 만들지 않는다.
- **기사 템플릿(F안 = A 기사형 + D Q&A)**, 모바일 순서: ① 눈썹 + 질문 제목(H1) + 한 문장 답 ② 3D 단면 이미지 ③ 숫자·출처 카드 3개 ④ 하차 칸 한 줄 ⑤ 릴스 썸네일 + 인스타 링크(임베드 스크립트 없음) ⑥ Q&A 3~4개(왜 이런 구조인가 / 어디서 내리면 빠른가 / 얼마나 타나 / 무엇이 바뀌나, 답마다 출처) ⑦ "그럼 OO은 왜?" 다음 기사 카드 ⑧ 출처 전문·제작 문의·AI 시각화 고지. 데스크톱은 본문 왼쪽, 숫자 카드·릴스·다음 기사 오른쪽 고정. 숫자 카드 3개가 없는 기사는 발행하지 않는다.
- **홈(E안)**: 역 이름이 아니라 질문 목록. 최신 기사 가로 1줄 + 3열 카드 + 노선 칩.
- **배포**: Vercel(Hobby로 시작, 제작 문의 페이지 공개 시 Pro 검토). 완전 정적(`output: "export"`).
- **SEO·GEO 최우선**: 본문·표·출처가 HTML에 있어야 한다. JSON-LD Article + FAQPage(Q&A와 1:1) + BreadcrumbList. robots.txt는 Googlebot·Yeti·Bingbot·GPTBot·OAI-SearchBot·PerplexityBot·ClaudeBot·Google-Extended 허용, `public/llms.txt`. canonical 지정, URL `/station/<역>/`. `<title>`은 역 이름·숫자·질문을 앞에. 숫자마다 기준일, 갱신 시 dateModified.
- **개인정보 수집 없음**: 쿠키·외부 임베드 스크립트·폼 금지. 문의는 이메일 주소 표기. 측정은 Umami Cloud(쿠키리스) 커스텀 이벤트: `next_click`, `read_end`(페이지뷰당 최초 1회, 라우트 전환마다 초기화), `return_visit`(localStorage에 첫 방문 시각·유입원만). 유입원은 UTM(`utm_source=instagram|community`).
- **출처**: 웹은 출처 전문(기관·자료명·기준일·URL). 조사 방법(CSV 파일 ID·내려받기 절차)은 적지 않는다.
- **AI 고지**: 3D 단면 영상 클립과 썸네일 배경만 AI 생성. 대본·숫자·출처는 사람이 썼다. 웹에서는 별도 고지 블록을 두지 않고 단면 이미지 캡션에 "AI 시각화 참고 이미지." 한 줄만 둔다(사용자 결정 2026-10-29).
- **디자인**: 비주얼은 사용자가 Claude Design으로 따로 확정한다. 그 전까지는 구조·시맨틱 HTML·반응형 배치만 만들고 색·서체에 공들이지 않는다.
- **확장 여지(구조만 비워 둠)**: 노선 허브 `/line/<노선>/`, 철도 소식 `/news/<날짜-슬러그>/`(숫자가 바뀌는 소식만, NewsArticle). 역 페이지의 "최근 소식" 자리는 비어 있으면 숨긴다.

## 콘텐츠 원천
- 기사 재료는 reel-studio의 `episodes/maeil-geugil/<편>/` 아래 `facts.md`(숫자·출처), `caption.txt`, `pin.txt`(하차 칸), `episode.json`(제목·permalink). 1단계는 손으로 옮기고, 자동 생성기는 3개 공개 뒤 2단계.
- 게시된 편과 permalink: 잠실 https://www.instagram.com/reel/De8-ObmRYZk/ , 사당 https://www.instagram.com/reel/De_BAeuiU93/ , 건대입구 https://www.instagram.com/reel/DfBF0puToTl/
- 이미지(단면 정지 이미지, 1200×630 OG, 9:16 릴스 썸네일)는 이 레포 `public/`에 커밋한다. 원본 렌더는 reel-studio 로컬 `compositions/maeil-geugil/<편>/renders/`에 있고 git에는 없다.

## 작업 규칙
- 답변은 한국어. 비유·과장 없이 사실 평서문.
- PR 먼저, 머지는 사용자가 말할 때만. push 출력은 필터링하지 않고 `git status -sb`로 반영 확인.
- `.env*`는 커밋하지 않는다. 도메인이 정해지면 Vercel 환경변수 `NEXT_PUBLIC_SITE_URL`.
- 커밋 전 `pnpm lint && pnpm build` 통과.

## 개발
```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # out/ 에 정적 사이트
```
