# 노선 탐색의 폰트 교체 시 레이아웃 이동

관련 이슈: #69, #44. 전체 LCP 목표는 아직 미완료다.

## 원인과 변경

13개 노선을 `flex-wrap`으로 배치하면 한글 폰트가 도착하면서 글자 폭이 바뀌고 탐색 행이 늘어났다. 412px에서 폰트 지연 회귀 검사로 4행·200px → 5행·252px을 재현했다. 이 이동이 아래 기사 목록을 밀었다. Lighthouse는 네 노선에서 CLS 0.16 이상을 기록했다.

탐색을 고정 열 수의 반응형 그리드로 바꿨다. 모바일 2열, 640px부터 3열, 768px부터 4열, 1280px부터 7열이다. 문자 노선 배지에 이미 있는 이름은 옆에 반복하지 않는다. 링크·현재 위치·노선색·서체·기사 원고는 유지한다.

`check-line-font-stability.mjs`는 폰트 응답을 보류한 뒤 조각별로 다르게 지연시켜 내려받는다. ResizeObserver로 중간 변화까지 감시한다. 320/390/412/768/1280px에서 탐색의 행·높이·링크 13개·44px 터치 높이·링크 간 겹침·탐색 폭을 검사한다. 기존 코드는 412px 행 변화에서 실패하고 수정본은 통과했다.

## 측정

원본 기준은 9030a19, 수정본은 이 PR의 노선 페이지 변경이다. 통합 기준 75788f1은 문서만 바뀌어 앱 코드는 같은 기준이다. 요약 원본은 [line-navigation-performance.json](./line-navigation-performance.json)에 있다.

- Lighthouse 13.5.0, Chromium headless shell 1248(156.0.8078.4), 412×823/DPR1.75.
- 기본 simulate RTT150ms/1638.4kbps/CPU4x, 페이지별 순차 1회.
- 로컬 Python HTTP 서버, 텍스트 gzip level6. TLS/CDN 없음. Umami 등 외부 요청을 차단하지 않았다.
- 다른 에이전트의 빌드가 끝난 뒤 측정했다. 공유 호스트 benchmarkIndex는 기준 3940.5–4116.5, 수정 3867.5–4101이다.

| 경로 | LCP 전→후(ms) | CLS 전→후 | 접근성 전→후 |
| --- | ---: | ---: | ---: |
| /line/2/ | 5412→2259 | 0.16914→0.00156 | 100→100 |
| /line/4/ | 2262→2407 | 0.16915→0.00162 | 100→100 |
| /line/7/ | 2166→1808 | 0.16914→0.00160 | 100→100 |
| /line/8/ | 1960→2168 | 0.16327→0.00158 | 100→100 |

전후 LCP 대상은 모두 노선 소개 문단 `header > p.text-body`다. 고정 열 배치로 첫 화면 구성이 달라졌고 각 1회 모사 측정이므로 LCP 개선의 인과효과로 주장하지 않는다. CLS 원인은 별도의 지연 폰트 회귀 검사로 확인했다. production 필드 데이터가 아니다.

기준 9페이지 중 홈 LCP 2368ms, 잠실 2787ms, 사당 2630ms, 건대입구 2707ms, 소개 6840ms였다. 모든 페이지 접근성은 100이었다. 기존 한글 폰트 CSS의 렌더 차단 조사와 비노선 페이지 LCP 개선은 #69에 남긴다. 무압축 CDP의 홈/전체 기사/사당 중앙값 3664/3764/4188ms와 gzip Lighthouse 값을 섞어 비교하지 않는다.

## 검증·재현

```sh
pnpm lint && pnpm build
node scripts/check-line-coverage.mjs
node scripts/check-line-font-stability.mjs http://127.0.0.1:3266
CHROME_PATH=/Users/diego/Library/Caches/ms-playwright/chromium_headless_shell-1248/chrome-headless-shell-mac-arm64/chrome-headless-shell lighthouse http://127.0.0.1:3266/line/2/ --only-categories=performance,accessibility --output=json --output-path=/tmp/line-2.json --chrome-flags='--headless --no-sandbox --disable-dev-shm-usage'
```

위 주소는 `out/`을 제공하는 gzip 서버다. 이번 로컬 서버는 `/tmp/station69-server.py OUT_DIR PORT`, 일괄 실행은 `/tmp/station69-lighthouse.py`와 `-after.py`를 사용했다. 원본 Lighthouse JSON은 `/tmp/station69-before-*.json`, `/tmp/station69-after-*.json`에 보존했다. 서버·브라우저 버전·압축·throttling을 동일하게 맞춰 비교한다.

390×844·768×900·1280×900, 라이트/다크, 2호선·김포골드라인 12개 화면의 이미지·콘솔·가로 넘침과 모바일 axe를 확인했다. 키보드 노선 링크·현재 위치·뒤로 가기·reduced-motion·JavaScript 없는 링크도 확인했다. PNG/MP4는 PR에 직접 첨부한다.

320px에서는 기존 사이트 헤더의 닫힌 기사 메뉴가 페이지 scrollWidth 349px(폰트 후 344px)을 만들어 별도 수정이 필요하다. 이번 회귀 검사의 320px 통과는 노선 탐색만 뜻한다. 전체 페이지 가로 넘침은 390px 이상에서 검사한다. 실제 음성 스크린리더 탐색은 실행하지 않았다.

## 채택하지 않은 안

서체·글리프를 제거하거나 폰트 굵기를 줄이지 않았다. Next.js의 [실험적 inlineCss](https://nextjs.org/docs/15/app/api-reference/config/next-config-js/inlineCss)는 로컬 후보 빌드에서 홈 HTML gzip 11KB→147KB, 사당 27KB→163KB로 커졌고 공식 문서도 production 사용을 권장하지 않아 적용하지 않았다. 추가 패키지와 런타임 로직은 없다.
