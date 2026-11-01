# STATION KOREA (stationkorea-web)

역에서 시작해, 길과 동네와 도시를 읽습니다. 교통과 공간의 구조, 그 주변의 생활과 변화를 이야기하는 웹매거진입니다.

- 웹사이트: [STATION KOREA](https://www.stationkorea.com). `stationkorea.com`은 www 주소로 연결된다.
- 영상 채널: [매일 그 길](https://www.instagram.com/maeil.geugil/) · @maeil.geugil
- 기사는 영상 없이도 읽을 수 있다. 서울 지하철 기사에서 출발하지만 지역·교통수단을 매거진 전체의 제한으로 두지 않는다.
- 모든 수치는 출처·기준일과 함께 제시하고, 사실 정정에는 변경 기록을 남긴다.

## 개발

Next.js 15 App Router 정적 export, TypeScript, Tailwind CSS v4, 기존 shadcn/ui를 사용한다.

```bash
pnpm install
pnpm dev
pnpm lint
pnpm build
```

`NEXT_PUBLIC_SITE_URL` 기본값은 `https://www.stationkorea.com`이다. `out/`에 정적 HTML을 생성한다.

## 공개 경로

- `/`: 대표 기사와 중복을 제외한 최근 최대 4편
- `/articles/`: 전체 발행 기사
- `/section/<section>/`: 갈아타다·걷다·보다·바뀌다의 발행 기사 목록. 기사가 없는 섹션은 준비 중이다.
- `/station/<slug>/`, `/article/<slug>/`: 기존 역 기사와 독립 기사. 기사 URL을 유지한다.
- `/line/<id>/`: 실제 기사가 있는 노선의 목록
- `/about/`: 소개·운영자·출처·정정 정책·연락처

## 검색·접근성

핵심 본문과 링크는 JavaScript 없이 읽힌다. canonical·sitemap·RSS·JSON-LD·마크다운 대체본이 같은 콘텐츠를 가리킨다. `/llms.txt`, `/llms-full.txt`, `/rss.xml`을 제공한다. 한국어 서체·노선 번호·역명판과 키보드 탐색을 유지한다.

## 배포

작업 브랜치 → `develop` PR → `main` 릴리스 PR 순서다. Vercel은 `main` 머지에만 production을 배포한다. 커밋 전에 `pnpm lint && pnpm build`를 통과해야 한다.

## 기준 문서

- [CLAUDE.md](./CLAUDE.md): 작업 규칙과 확정 결정
- [디자인 결정](./docs/design/station-korea/decision.md): A안·프로토타입 적용 범위
- [디자인 토큰](./docs/design/v1/README.md)
- [SEO·GEO 검증](./docs/geo-test.md), [측정 기록](./docs/geo-log.md)
