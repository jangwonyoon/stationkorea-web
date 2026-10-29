# 매일 그 길 웹

인스타 릴스 채널 [매일 그 길](https://www.instagram.com/maeil.geugil/)의 웹 매거진. 서울 지하철 역을 3D 단면으로 뜯어 공식 숫자로 설명하는 역 기사를 모바일 퍼스트로 싣는다.

- 설계 문서: [reel-studio `docs/designs/maeil-geugil-web.md`](https://github.com/jangwonyoon/reel-studio/blob/docs/maeil-geugil-web-design/docs/designs/maeil-geugil-web.md)
- 와이어프레임: 같은 경로의 `docs/designs/wireframes/` (확정안 F: 기사형 + Q&A)
- 제작 파이프라인(대본·영상·facts.md)은 [reel-studio](https://github.com/jangwonyoon/reel-studio)에 있다. 이 레포는 사이트와 콘텐츠만 둔다.

## 원칙
- 완전 정적 HTML(`output: "export"`), Vercel 배포.
- 검색·생성엔진 노출(SEO·GEO) 최우선: 질문 제목 → 한 문장 답, HTML 표와 출처 전문, JSON-LD(Article·FAQPage), AI 크롤러 허용 robots, `llms.txt`.
- 개인정보 수집 없음: 쿠키·외부 임베드 스크립트·폼 없음. 측정은 Umami(쿠키리스).

## 개발
```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # out/ 에 정적 사이트
```
