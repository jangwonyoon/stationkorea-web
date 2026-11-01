# GEO 테스트 절차

AI 답변엔진(ChatGPT·Perplexity·Google AI Overviews/AI Mode·네이버 AI 브리핑/AI탭·Copilot)이 기사를 인용하는지 재는 절차. 결과는 [geo-log.md](./geo-log.md)에 적는다.

## 전제 (2026-10 리서치)

- AI 답변엔진은 일반 검색 색인에서 출처를 가져온다. 색인이 먼저, 인용은 그다음이다.
- Google은 llms.txt·마크다운 대체본을 쓰지 않는다고 밝혔다([AI optimization guide](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)). 로그 연구에서도 llms.txt 요청은 거의 없다([Ahrefs](https://ahrefs.com/blog/llmstxt-study/)). 이 사이트는 llms.txt·`article.md`를 유지하되 성과 지표로 쓰지 않는다.
- Google FAQ 리치결과는 2026-05에 종료됐다. FAQPage 마크업은 유지하되 Rich Results Test 대상이 아니다.
- 같은 질문도 답이 매번 다르다([SparkToro](https://sparktoro.com/blog/new-research-ais-are-highly-inconsistent-when-recommending-brands-or-products-marketers-should-take-care-when-tracking-ai-visibility/)). 질문마다 3회 실행한다.
- AI 유입은 Umami에서 일부만 잡힌다. ChatGPT는 `utm_source=chatgpt.com`을 붙이고([OpenAI](https://help.openai.com/en/articles/12627856)), Google AI·네이버 AI 브리핑은 일반 검색 유입과 구분되지 않는다. 숫자는 하한값으로 읽는다.

## 1. 공개 전·공개 당일 체크리스트

- [ ] [Schema.org Validator](https://validator.schema.org/)에서 기사 3개 오류 0
- [ ] [Rich Results Test](https://search.google.com/test/rich-results)에서 Article·BreadcrumbList 인식
- [ ] Google Search Console 등록, `https://www.stationkorea.com/sitemap.xml` 제출, 기사 3개 색인 요청
- [ ] Bing Webmaster Tools 등록(GSC 가져오기 가능), sitemap 제출
- [ ] 네이버 서치어드바이저 등록, sitemap 제출, 수집 요청
- [ ] AI 봇 User-Agent로 200 응답 확인(아래 명령)
- [ ] Vercel Firewall에서 AI Bots 관리 규칙이 Deny가 아닌지 확인
- [ ] `stationkorea.com` → `www.stationkorea.com` 308 리다이렉트 확인

```bash
for ua in Googlebot Bingbot Yeti GPTBot OAI-SearchBot ChatGPT-User PerplexityBot ClaudeBot Claude-SearchBot; do
  printf '%-16s ' "$ua"
  curl -s -o /dev/null -w '%{http_code}\n' -A "Mozilla/5.0 (compatible; $ua)" https://www.stationkorea.com/station/sadang/
done
```

## 2. 주간 기록 (매주 월요일, 15분)

[geo-log.md](./geo-log.md) "주간" 표에 한 줄씩 적는다.

| 항목 | 보는 곳 |
|---|---|
| 색인된 기사 수(Google·Bing·Naver) | GSC 페이지 색인 / Bing URL 검사 / 서치어드바이저 |
| Bing·Copilot 인용 수, 인용된 URL | Bing Webmaster Tools → AI Performance |
| Google 생성형 AI 노출 | GSC 생성형 AI 리포트(열려 있을 때만) |
| AI 봇 방문 | Vercel Firewall → Traffic 24시간, 봇 UA 상위 |
| AI 유입 방문 | Umami: 리퍼러 chatgpt.com·perplexity.ai·gemini.google.com·claude.ai·copilot.microsoft.com, `utm_source=chatgpt.com` |

## 3. 프롬프트 패널 (공개일 기준 D+14, D+42, D+84)

### 조건

- 로그아웃 또는 시크릿 창, 한국어, 한국 IP. 계정 기억(메모리)·개인화는 끈다.
- "출처를 달아 줘", "검색해서" 같은 검색 강제 문구를 넣지 않는다. 사람이 묻는 그대로 묻는다([Graphite](https://graphite.io/five-percent/research/do-not-force-search-prompt-tracking)).
- 핵심 엔진은 질문마다 새 대화로 3회, 확장 엔진은 1회 실행한다.

### 엔진

엔진별 출처 색인은 [seo-geo-strategy.md](./seo-geo-strategy.md) 매트릭스. 확장 엔진은 핵심 엔진과 다른 색인(Bing·Brave)을 쓰는 곳을 골랐다.

| 구분 | 엔진 | 출처 색인 | 비고 |
|---|---|---|---|
| 핵심 | ChatGPT | 자체 + 외부(Microsoft 포함) | 웹 검색이 자동으로 켜지는 기본 모드 |
| 핵심 | Perplexity | 자체 | 기본 모드 |
| 핵심 | Google AI Mode | Google | AI Overview가 뜨면 함께 기록 |
| 핵심 | 네이버 | 네이버 | 통합검색의 AI 브리핑 + AI탭 |
| 확장 | Microsoft Copilot | Bing | Bing AI Performance 리포트와 대조 |
| 확장 | Claude | Brave | 웹 검색 켠 상태 |
| 확장 | Gemini | Google | 기본 모드 |

### 질문 44개

기사와 1:1. 기사 제목을 바꾸면 이 표도 같은 PR에서 고친다.

| # | 기사 | 유형 | 질문 |
|---|---|---|---|
| J1 | 잠실 | 제목 | 잠실역, 2호선에서 8호선까지 왜 이렇게 멀까? |
| J2 | 잠실 | 구어 | 잠실역 2호선 8호선 환승 왜 이렇게 멀어? |
| J3 | 잠실 | 구어 | 잠실역 8호선 갈아타는 통로 왜 이렇게 길어? |
| J4 | 잠실 | 숫자 | 잠실역 2호선에서 8호선까지 환승 거리 몇 미터야? |
| S1 | 사당 | 제목 | 사당역, 환승 74m인데 왜 3분 넘게 걸릴까? |
| S2 | 사당 | 구어 | 사당역 2호선 4호선 환승할 때 왜 돌아가게 막아 놨어? |
| S3 | 사당 | 구어 | 사당역 환승통로에 펜스랑 셔터는 왜 있어? |
| S4 | 사당 | 숫자 | 사당역 2호선 4호선 환승 시간 얼마나 걸려? |
| K1 | 건대입구 | 제목 | 건대입구역 1,404m는 어떻게 계산됐을까? |
| K2 | 건대입구 | 구어 | 건대입구역에서 휠체어로 2호선 7호선 갈아타기 왜 어려워? |
| K3 | 건대입구 | 구어 | 건대입구역 2호선은 왜 지상에 있고 7호선은 지하야? |
| K4 | 건대입구 | 숫자 | 건대입구역 2호선 7호선 환승 거리 몇 미터야? |
| GU1 | 구리 | 제목 | 구리역에서 경의중앙선과 8호선은 어떻게 이어질까? |
| GU2 | 구리 | 구어 | 구리역 경의중앙선 8호선은 왜 높이가 달라? |
| GU3 | 구리 | 숫자 | 구리역 환승통로 에스컬레이터는 몇 미터야? |
| GU4 | 구리 | 구어 | 구리역 에스컬레이터 65m면 환승 거리도 65m야? |
| E1 | 고속터미널 | 제목 | 고속터미널역의 15cm와 314m는 무엇을 잰 숫자일까? |
| E2 | 고속터미널 | 구어 | 고속터미널역 3호선 9호선 15cm는 무슨 뜻이야? |
| E3 | 고속터미널 | 숫자 | 고속터미널역 7호선에서 9호선까지 최단 환승거리는 몇 미터야? |
| E4 | 고속터미널 | 구어 | 고속터미널역 314m인데 환승 시간이 왜 더 길게 안내돼? |
| SE1 | 성수 | 제목 | 성수역 2호선은 왜 두 갈래로 나뉠까? |
| SE2 | 성수 | 구어 | 성수역에서 2호선 신설동 가는 열차는 따로 있어? |
| SE3 | 성수 | 구어 | 성수지선이 먼저 생겼는데 왜 지선이야? |
| SE4 | 성수 | 연혁 | 성수역 2호선은 언제 순환선과 지선으로 나뉘었어? |
| DM1 | 동묘앞 | 제목 | 동묘앞역은 왜 토·휴일 승하차가 더 많을까? |
| DM2 | 동묘앞 | 구어 | 동묘앞역은 주말에 왜 사람이 많아? |
| DM3 | 동묘앞 | 숫자 | 동묘앞역 1호선 토·휴일 승하차는 평일보다 몇 명 많아? |
| DM4 | 동묘앞 | 구어 | 동묘앞역 주말 승하차가 늘어난 사람이 모두 벼룩시장에 간 거야? |
| GP1 | 김포공항 | 제목 | 김포공항역 서해선은 왜 주차장 자리 계획에서 환승 중심 위치로 바뀌었을까? |
| GP2 | 김포공항 | 구어 | 김포공항역 서해선은 왜 원래 계획했던 주차장 자리에 안 만들었어? |
| GP3 | 김포공항 | 설계 | 김포공항역 서해선 정거장 위치를 2017년에 바꾼 이유가 뭐야? |
| GP4 | 김포공항 | 구어 | 김포공항역 서해선은 다른 노선이랑 어떻게 갈아타게 계획했어? |
| IS1 | 이수 | 제목 | 이수역 환승 안내의 2분 23초와 5분 24초는 무엇이 다를까? |
| IS2 | 이수 | 구어 | 이수역 환승 2분 23초와 5분 24초는 같은 환승시간이야? |
| IS3 | 이수 | 숫자 | 이수역 4호선에서 7호선 내방 방면 환승 안내 시간은 몇 분이야? |
| IS4 | 이수 | 구어 | 이수역 환승 2분 23초는 실제 걸린 시간이야? |
| HD1 | 홍대입구 | 제목 | 홍대입구역 환승 355m, 어느 노선 사이를 잰 걸까? |
| HD2 | 홍대입구 | 구어 | 홍대입구역 355m는 공항철도 환승만을 말해? |
| HD3 | 홍대입구 | 숫자 | 홍대입구역 2호선에서 공항철도까지 최단 환승거리는 몇 미터야? |
| HD4 | 홍대입구 | 해석 | 홍대입구역 2017년 연구의 평면환산거리와 2026년 최단거리를 비교해도 돼? |
| DJ1 | 동작 | 제목 | 9호선 급행 개편, 동작역에서 무엇을 확인해야 하나? |
| DJ2 | 동작 | 구어 | 동작역 9호선 급행 시간표 11월 16일에 바뀌어? |
| DJ3 | 동작 | 방향 | 2026년 11월 16일부터 오전 5시 40분~7시에 9호선 급행·일반 운행 순서가 바뀔 예정인 방향은? |
| DJ4 | 동작 | 해석 | 9호선 급행 혼잡도 192.5%는 동작역에서 잰 값이야? |

### 기록

[geo-log.md](./geo-log.md) "패널" 표에 실행 1회당 한 줄. 인용 = 답변의 출처·링크에 `stationkorea.com` URL이 있음. 본문만 비슷하고 링크가 없으면 인용 아님. 스크린샷은 레포에 넣지 않는다.

## 4. 판정

| 시점 | 기준 |
|---|---|
| D+42 | Google·Bing·Naver 세 곳에 기사 3개 색인, AI 봇 방문 확인 |
| D+84 | 엔진 하나 이상에서 질문 하나 이상의 인용률 1/3 이상(3회 중 1회), 그리고 Bing AI Performance 인용 1건 이상 |

D+84에 미달이면 색인 실패인지(주간 표의 색인 수) 경쟁에서 밀린 것인지(패널의 경쟁 출처)를 나눠 적는다.
