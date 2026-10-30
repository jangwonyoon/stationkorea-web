import { Hahmlet, IBM_Plex_Sans_KR } from "next/font/google";

// 서체는 빌드 때 받아 out/에 셀프 호스팅한다(런타임에 fonts.googleapis.com 요청 없음).
// next/font의 subsets 목록에 "korean"이 없다(Hahmlet: latin·latin-ext·vietnamese, Plex Sans KR: latin·latin-ext).
// 한글 글리프는 Google CSS의 unicode-range 조각으로 모두 받아지고, 브라우저가 화면에 나온 글자의 조각만 내려받는다.
// latin 조각만 preload하면 한글 페이지에서는 대부분 쓰이지 않으므로 preload: false로 둔다.
// display: swap + adjustFontFallback(기본값)으로 대체 서체 크기를 보정해 CLS를 줄인다.

export const hahmlet = Hahmlet({
  weight: ["600", "700"],
  display: "swap",
  preload: false,
  variable: "--font-hahmlet",
  fallback: ["AppleMyungjo", "Batang", "Noto Serif KR", "serif"],
});

export const plexSansKr = IBM_Plex_Sans_KR({
  weight: ["400", "500", "600"],
  display: "swap",
  preload: false,
  variable: "--font-plex-sans-kr",
  fallback: ["Apple SD Gothic Neo", "Malgun Gothic", "Noto Sans KR", "system-ui", "sans-serif"],
});
