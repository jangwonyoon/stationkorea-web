# 매일 그 길 웹 (stationkorea-web)

인스타그램 릴스 채널 [매일 그 길](https://www.instagram.com/maeil.geugil/)(@maeil.geugil)의 웹 매거진이다. 서울 지하철 역과 환승통로가 왜 지금 구조가 됐는지를 3D 단면과 공식 숫자로 설명하고, 숫자마다 출처 전문(기관·자료명·기준일·URL)을 적는다.

- 사이트: https://www.stationkorea.com (`stationkorea.com`은 www로 리다이렉트된다)
- 제작 파이프라인(대본·영상·facts.md)은 [reel-studio](https://github.com/jangwonyoon/reel-studio)에 있다. 이 레포는 사이트와 콘텐츠만 둔다.

## 기술 스택

- Next.js 15 App Router, `output: "export"` 완전 정적 HTML(`trailingSlash: true`)
- TypeScript, Tailwind CSS v4, ESLint
- pnpm, Vercel 배포

## 개발

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm lint
pnpm build   # out/ 에 정적 사이트
```

사이트 URL은 `NEXT_PUBLIC_SITE_URL`로 바꿀 수 있다. 없으면 `https://www.stationkorea.com`을 쓴다.

## 디렉터리 구조

```
src/
  app/
    page.tsx                         # 홈(질문 목록)
    station/[slug]/page.tsx          # 역 기사
    station/[slug]/article.md/       # 역 기사 마크다운 버전
    llms.txt/, llms-full.txt/        # LLM용 요약·전문
    sitemap.ts, robots.ts
  components/                        # JsonLd, SourceRefs
  content/
    types.ts                         # Station·Stat·Qna·Source 타입
    stations/                        # 역별 기사 모듈 + index.ts(등록·검증)
  lib/                               # site 설정, JSON-LD, 마크다운 변환
public/images/station/               # 단면·OG·릴스 썸네일 이미지
docs/                                # GEO 테스트 절차와 기록
```

## 기사 추가

1. `src/content/stations/<slug>.ts`에 `Station` 타입 모듈을 만든다. 재료는 reel-studio `episodes/maeil-geugil/<편>/`의 `facts.md`·`caption.txt`·`pin.txt`·`episode.json`이다.
2. `src/content/stations/index.ts`의 `stations` 배열에 등록한다. 순서는 `no`(역 해부 일련번호)로 정렬되고, 다음 기사 카드도 이 순서를 따른다.
3. 이미지를 `public/images/station/<slug>-section.jpg`(단면), `<slug>-og.jpg`(1200×630 OG), `<slug>-reel.jpg`(9:16 릴스 썸네일)로 넣는다.
4. `pnpm build`로 확인한다. 숫자 카드가 정확히 3개가 아니거나, 숫자 카드·하차 칸·Q&A의 `sourceIds`가 `sources`에 없는 id를 가리키면 빌드가 실패한다.

## 배포

- 브랜치 흐름: 작업 브랜치 → `develop`(PR) → `main`(릴리스 PR).
- Vercel 프로젝트 `stationkorea-web`은 `main` 머지만 배포한다(`vercel.json`의 `git.deploymentEnabled`). 다른 브랜치는 프리뷰 배포를 만들지 않는다.
- 커밋 전 `pnpm lint && pnpm build`가 통과해야 한다.

## SEO·GEO 요소

- 본문·숫자·출처를 클라이언트 렌더 없이 정적 HTML에 둔다.
- JSON-LD: 역 기사에 Article + FAQPage(Q&A와 1:1) + BreadcrumbList, 홈에 WebSite + ItemList.
- 페이지마다 canonical을 지정한다.
- `/sitemap.xml`
- `/robots.txt`: Googlebot·Yeti·Bingbot과 GPTBot·OAI-SearchBot·ChatGPT-User·PerplexityBot·ClaudeBot·Claude-SearchBot·Google-Extended를 허용한다.
- `/llms.txt`(기사 목록)와 `/llms-full.txt`(전체 기사 전문)
- `/station/<slug>/article.md`: 같은 기사의 마크다운 버전. HTML에서 `rel="alternate"`로 가리킨다.
- `/rss.xml`: 예정(아직 머지되지 않음).

## 문서

- [CLAUDE.md](./CLAUDE.md): 에이전트 작업 지침과 확정 결정
- [docs/geo-test.md](./docs/geo-test.md): GEO 테스트 절차
- [docs/geo-log.md](./docs/geo-log.md): GEO 측정 기록
- 설계 문서: [reel-studio `docs/designs/maeil-geugil-web.md`](https://github.com/jangwonyoon/reel-studio/blob/docs/maeil-geugil-web-design/docs/designs/maeil-geugil-web.md)
