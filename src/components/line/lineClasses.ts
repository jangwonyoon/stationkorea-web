import type { LineId } from "@/content/lines";

/*
 * 노선별 Tailwind 클래스 정적 맵. Tailwind는 소스에 그대로 적힌 클래스만 생성하므로
 * `bg-line-${id}`처럼 문자열을 조합하지 않고 이 맵에서 고른다.
 * 값은 F1(#24) 토큰(globals.css @theme)이고, 채움 위 숫자색 토큰은 LINES[id].onColor와 같다
 * (white = #FFFFFF, ink = #191B1D).
 */

/** 노선색 면. */
export const LINE_BG: Record<LineId, string> = {
  "1": "bg-line-1",
  "2": "bg-line-2",
  "3": "bg-line-3",
  "4": "bg-line-4",
  "5": "bg-line-5",
  "6": "bg-line-6",
  "7": "bg-line-7",
  "8": "bg-line-8",
  "9": "bg-line-9",
  "gyeongui-jungang": "bg-line-gyeongui-jungang",
  "arex": "bg-line-arex",
  "seohae": "bg-line-seohae",
  "gimpo-goldline": "bg-line-gimpo-goldline",
  "suin-bundang": "bg-line-suin-bundang",
  "shinbundang": "bg-line-shinbundang",
  "gtx-a": "bg-line-gtx-a",
};

/** 노선색 채움 위 글자색. */
export const LINE_TEXT_ON: Record<LineId, string> = {
  "1": "text-on-line-1",
  "2": "text-on-line-2",
  "3": "text-on-line-3",
  "4": "text-on-line-4",
  "5": "text-on-line-5",
  "6": "text-on-line-6",
  "7": "text-on-line-7",
  "8": "text-on-line-8",
  "9": "text-on-line-9",
  "gyeongui-jungang": "text-on-line-gyeongui-jungang",
  "arex": "text-on-line-arex",
  "seohae": "text-on-line-seohae",
  "gimpo-goldline": "text-on-line-gimpo-goldline",
  "suin-bundang": "text-on-line-suin-bundang",
  "shinbundang": "text-on-line-shinbundang",
  "gtx-a": "text-on-line-gtx-a",
};

/** 노선색 선. */
export const LINE_BORDER: Record<LineId, string> = {
  "1": "border-line-1",
  "2": "border-line-2",
  "3": "border-line-3",
  "4": "border-line-4",
  "5": "border-line-5",
  "6": "border-line-6",
  "7": "border-line-7",
  "8": "border-line-8",
  "9": "border-line-9",
  "gyeongui-jungang": "border-line-gyeongui-jungang",
  "arex": "border-line-arex",
  "seohae": "border-line-seohae",
  "gimpo-goldline": "border-line-gimpo-goldline",
  "suin-bundang": "border-line-suin-bundang",
  "shinbundang": "border-line-shinbundang",
  "gtx-a": "border-line-gtx-a",
};
