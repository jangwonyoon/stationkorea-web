# SEO·GEO 전략

`CLAUDE.md`의 "SEO·GEO 개발 규칙"의 근거 문서. 2026-10-29 리서치 기준. 근거 유형: 공식(공식 문서) · 독립(독립 연구) · 벤더(업계·벤더 주장) · 보도.

GEO 대상은 생성형 AI 답변 전체다. 측정 절차는 [geo-test.md](./geo-test.md).

## 핵심 결론

1. 대부분의 AI 답변엔진은 기존 검색 색인에서 출처를 가져온다. Google AI Overviews·AI Mode·Gemini는 Google, Copilot은 Bing, Meta AI는 Bing·Google, ChatGPT는 자체 색인과 외부 제공자, Claude는 Brave, 에이닷은 Perplexity, 네이버 AI 브리핑은 네이버 색인이다. Google은 AI 기능에 "추가 요구사항이나 특수 최적화가 없다"고 쓴다[1]. Google·Bing·네이버 색인 확보와 Googlebot 허용(Brave가 따름)이 GEO의 대부분이다.
2. 콘텐츠 쪽 독립 근거는 GEO 논문(KDD 2024)이 거의 전부다. 통계·인용·출처 추가가 노출을 높였고 키워드 반복은 효과가 없었다[11]. 현재 템플릿(숫자·기준일·출처)은 이와 맞다. 단락 길이·표 형식의 효과를 통제 실험한 공개 연구는 없다.
3. 2단계 자동 생성의 가장 큰 위험은 Google scaled content abuse 정책이다[4]. Google은 AI 생성물에 대해 title·description·구조화 데이터·alt까지 사람이 사실 확인하라고 요구한다[2].
4. 1인 매체에 빠진 신뢰 신호는 바이라인·About·정정 정책·Organization logo다. Google은 바이라인을 강하게 권장하고, 실질 변경 없는 날짜 갱신을 경고한다[3].
5. llms.txt·`.md` 대체본은 유지비가 작아 두지만 효과는 기대하지 않는다(Google은 사용하지 않는다고 밝힘, Ahrefs 조사에서 llms.txt 97%가 요청 0건).

## 엔진별 매트릭스

| 엔진 | 출처 색인 | 검색·사용자 요청 UA · 학습 UA | 인용 링크 · 유입 식별 | 우리가 할 일 |
|---|---|---|---|---|
| ChatGPT 검색 | 자체 색인 + 외부 제공자(Microsoft 포함)[14][28] | OAI-SearchBot, ChatGPT-User · GPTBot | 있음 · `utm_source=chatgpt.com` | OAI-SearchBot 허용, Bing 색인 |
| Google AI Overviews / AI Mode | Google 색인[1] | Googlebot · Google-Extended(Search엔 영향 없음) | 있음 · Search Console에 합산 | 색인·스니펫 허용 유지 |
| Gemini 앱 | Google Search grounding[33], 앱 세부는 확인 불가 | Googlebot · Google-Extended | 있음 · 확인 불가 | Google-Extended 허용 유지 |
| Perplexity | 자체 색인 + 실시간 fetch[16] | PerplexityBot, Perplexity-User · 학습 없음(공식) | 있음 · perplexity.ai 리퍼러(관찰) | PerplexityBot 허용 |
| Microsoft Copilot | Bing 색인[21] | Bingbot · 확인 불가 | 있음 · 관찰 기반 | Bing 등록·IndexNow·AI Performance |
| Claude | Brave 색인(서브프로세서 등재)[18][19] | Claude-SearchBot, Claude-User · ClaudeBot | 있음 · 확인 불가 | Googlebot 허용(Brave가 따름), 제출 경로 없음 |
| Meta AI | Bing·Google 제휴(보도) + meta-webindexer[27] | meta-webindexer, meta-externalfetcher · Meta-ExternalAgent | 있음 · 확인 불가 | Bing 색인, meta-webindexer 허용 |
| Apple Siri / Apple Intelligence | Applebot 색인[26] | Applebot · Applebot-Extended | "포함될 수 있음" · 확인 불가 | Applebot 허용 |
| Grok | 자체 웹 검색 + X, 확인 불가[32] | xAI-Grok(벤더 보고) · 확인 불가 | 있음 · 확인 불가 | 허용 유지(우선순위 낮음) |
| DeepSeek | 공개되지 않은 외부 검색 API[31] | 공개 UA 없음 · CCBot 데이터 | 검색 시 있음 · 확인 불가 | 직접 할 일 없음 |
| 네이버 AI 브리핑 | 네이버 색인, 내부 UGC 비중 70~82%[25] | Yeti · AI 전용 봇 확인 안 됨 | 있음 · search.naver.com | 서치어드바이저, sitemap·RSS, IndexNow. 기대치 낮게 |
| 네이버 AI탭(HyperCLOVA X) | 네이버 내부 + 웹문서, 기준 비공개[24] | Yeti | 있음 · 확인 불가 | 위와 같음 |
| SKT 에이닷 | Perplexity 검색[29] | Perplexity와 같음 | 확인 불가 | Perplexity 조치로 충분 |
| 카카오톡 ChatGPT / 카나나 | ChatGPT는 OpenAI와 같음[30], 카나나는 확인 불가 | — | 확인 불가 | ChatGPT 조치. Daum 웹마스터도구는 별도 확인 |
| 뤼튼·라이너 | 공식 정보 없음 | 확인 불가 | 출처 표시 · 확인 불가 | 별도 조치 없음 |

확인되지 않은 것: ChatGPT 색인 구성 비율, Meta AI의 현재 Bing 사용 여부, 국내 서비스 검색 백엔드. 네이버 공식 가이드는 2차 자료로 확인했다.

## 현재 사이트 갭

| 우선 | 갭 | 작업량 | 상태 |
|---|---|---|---|
| P0 | Bing Webmaster Tools 등록 + sitemap (Copilot·Meta AI·ChatGPT 일부) | S | 대기 |
| P0 | IndexNow 키 파일 + production 배포 뒤 ping | S | 대기 |
| P0 | 네이버 서치어드바이저 등록, sitemap·RSS 제출 | S | 대기(RSS는 `feat/search-console-ready`) |
| P0 | Vercel Firewall·Bot Protection이 AI 봇을 막지 않는지 확인 | S | 대기 |
| P0 | Search Console 생성형 AI 노출 설정 확인(Google이 소유자 제어 테스트 중[10]) | S | 대기 |
| P1 | `/about/`, 저자 페이지, 바이라인, Article author Person+url | M | 결정 필요: 바이라인 이름(실명 또는 필명) |
| P1 | Organization `logo` | S | 로고 이미지 필요(Claude Design) |
| P1 | `.md` 대체본에 `Link rel=canonical` 헤더(`vercel.json` headers) | S | 대기 |
| P1 | 기사 간 본문 내부 링크 2개 이상, 수정일·정정 기록 표시 | M | 대기 |
| P1 | Umami AI 유입 분류(utm_source=chatgpt.com, perplexity·copilot·gemini·claude 리퍼러) | S | Umami 도입과 함께 |
| P2 | robots.txt에 사용자 요청 봇 명시(Claude-User, Perplexity-User, Applebot, meta-webindexer) | S | 기능 차이 없음, 문서화 목적 |
| P2 | 개인정보 처리 안내 페이지(쿠키 없음, Umami 고지) | S | 대기 |

완료: 질문 H1 + 한 문장 답, 숫자 표·기준일·출처 전문, Article·FAQPage·BreadcrumbList, sitemap(이미지 포함), canonical·www 통일, AI 봇 robots 허용, Search Console 도메인 속성 확인·sitemap 제출·색인 요청, VideoObject 제거(`feat/search-console-ready`).

## 로드맵

- **1단계(지금~2주)**: 갭 P0 전부 + Organization logo. 주 1회 [geo-test.md](./geo-test.md) 패널과 주간 기록. Bing AI Performance·Search Console 생성형 AI 리포트 확인.
- **2단계(자동 초안, 수십 역)**: 시작 전에 About·바이라인·규칙 20의 빌드 게이트를 먼저 만든다. 공개 속도는 사람 검수 속도에 맞춘다. 기사 간 본문 유사도 검사를 도입한다(임계값은 내부 기준). AI 엔진이 제3자 매체 언급(earned media)을 선호한다는 보고[12]에 따라 커뮤니티·언론에 공식 숫자 기반 기사가 인용되도록 알린다.
- **3단계(노선 허브·소식)**: `/line/<노선>/` 허브에 소속 기사 목록과 노선 단위 숫자 표, breadcrumb 연결. `/news/`는 NewsArticle과 2일 이내 기사만 담는 news sitemap[34]. 숫자가 바뀐 소식은 원 기사의 dateModified·정정 기록과 링크로 잇는다.

## 근거

1. Google, AI features and your website — https://developers.google.com/search/docs/appearance/ai-features (2025-12-10) 공식
2. Google, Using generative AI content — https://developers.google.com/search/docs/fundamentals/using-gen-ai-content (2026-10-01) 공식
3. Google, Creating helpful content — https://developers.google.com/search/docs/fundamentals/creating-helpful-content (2026-10-05) 공식
4. Google, Spam policies (scaled content abuse) — https://developers.google.com/search/docs/essentials/spam-policies 공식
5. Google, Article structured data — https://developers.google.com/search/docs/appearance/structured-data/article (2026-09-08) 공식
6. Google, Organization structured data — https://developers.google.com/search/docs/appearance/structured-data/organization 공식
7. Google, Dataset structured data — https://developers.google.com/search/docs/appearance/structured-data/dataset 공식
8. Google, Consolidate duplicate URLs (Link 헤더 canonical) — https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls 공식
9. Google, Structured data general guidelines — https://developers.google.com/search/docs/appearance/structured-data/sd-policies 공식
10. Google blog, New controls for website owners — https://blog.google/products-and-platforms/products/search/new-controls-website-owners/ (2026, 테스트) 공식
11. Aggarwal et al., GEO: Generative Engine Optimization, KDD 2024 — https://arxiv.org/abs/2311.09735 독립(동료심사). 기법별 수치는 원 논문 표로 확인
12. Chen et al., GEO: How to Dominate AI Search — https://arxiv.org/abs/2509.08919 (2025-09) 독립(프리프린트)
13. Seer Interactive, content recency 연구 — https://www.seerinteractive.com/insights/study-content-recencys-impact-on-ai-visibility-in-2026 벤더. 날짜만 바꾼 효과를 입증한 연구는 없음
14. OpenAI, Overview of OpenAI crawlers — https://developers.openai.com/api/docs/bots 공식
15. Anthropic, 크롤러 안내 — https://support.anthropic.com/en/articles/8896518 공식
16. Perplexity, Perplexity Crawlers — https://docs.perplexity.ai/docs/resources/perplexity-crawlers 공식
17. Cloudflare의 Perplexity 은닉 크롤링 지적 — https://www.searchenginejournal.com/cloudflare-delists-and-blocks-perplexity-from-crawling-websites/552899/ (2025-08) 보도, Perplexity 반박
18. Brave Search Crawler — https://search.brave.com/help/brave-search-crawler 공식
19. Simon Willison, Anthropic의 Brave 서브프로세서 등재 — https://simonwillison.net/2025/Mar/21/anthropic-use-brave/ 독립 관찰
20. MERJ, Brave 신규 페이지 발견 분석 — https://merj.com/blog/how-brave-search-discovers-new-pages 벤더
21. Bing, AI Performance 공개 프리뷰 — https://blogs.bing.com/webmaster/February-2026/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview (2026-02-10) 공식
22. Bing, IndexNow — https://www.bing.com/indexnow/getstarted 공식
23. 네이버 서치어드바이저 IndexNow — https://searchadvisor.naver.com/guide/indexnow-about (2023-07 지원) 공식, 2차 자료로 확인
24. 네이버, AI탭 베타 — https://www.navercorp.com/media/pressReleasesDetail?seq=34984 (2026-04-28) 공식
25. SEO NEWS, AI 브리핑 출처 분석 — https://seonews.co.kr/naver-ai-briefing-source-analysis-20260702/ (2026-07) 업계
26. Apple, About Applebot — https://support.apple.com/en-us/119829 공식
27. Meta, Web crawlers — https://developers.facebook.com/docs/sharing/webmasters/web-crawlers 공식
28. Peec AI, ChatGPT 자체 색인 — https://peec.ai/blog/chatgpt-built-its-own-search-index (2026-09) 벤더
29. SKT 뉴스룸, 퍼플렉시티 제휴 — https://news.sktelecom.com/206827 (2024) 공식
30. 뉴스1, 카카오톡 ChatGPT — https://www.news1.kr/it-science/general-it/5921420 (2025-09) 보도
31. AI Syndicate, DeepSeek 인용 — https://www.aisyndicate.com/blog/how-to-get-cited-by-deepseek/ 벤더
32. Promptwatch, Grok Search 봇 — https://promptwatch.com/bots/grok-search 벤더
33. Google, Grounding with Google Search — https://ai.google.dev/gemini-api/docs/google-search 공식(API 문서)
34. Google, News sitemap — https://developers.google.com/search/docs/crawling-indexing/sitemaps/news-sitemap 공식
35. Next.js discussion #17991 (export 시 headers 미적용) — https://github.com/vercel/next.js/discussions/17991 커뮤니티
36. 네이버 C-Rank·D.I.A. — 네이버 서치 블로그 공지(2차 자료). 블로그·카페 대상이며 웹문서 적용 여부는 확인 불가
