"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Umami(쿠키리스) 커스텀 이벤트. 개인 식별 정보는 보내지도 저장하지도 않는다.
// - next_click: 다음 질문 카드 클릭, 페이지뷰당 최초 1회
// - read_end: 출처 전문(#sources)이 화면에 들어옴, 페이지뷰당 최초 1회
// - return_visit: 첫 방문 24시간 뒤~14일 안 재방문, 1회. localStorage에는 첫 방문 시각·유입원만 둔다
// - ai_referral: AI 답변엔진에서 들어온 세션, 세션당 1회(GEO 측정, docs/geo-test.md)
// 페이지뷰·UTM·리퍼러는 Umami 스크립트가 자동 수집한다(클라이언트 라우트 전환 포함).

type Umami = { track: (event: string, data?: Record<string, string | number>) => void };
declare global {
  interface Window {
    umami?: Umami;
  }
}

const FIRST_KEY = "mgg:first";
const RETURN_SENT_KEY = "mgg:return_sent";
const AI_SENT_KEY = "mgg:ai_sent";
const DAY = 24 * 60 * 60 * 1000;

const AI_REFERRERS: [RegExp, string][] = [
  [/chatgpt\.com|chat\.openai\.com/, "chatgpt"],
  [/perplexity\.ai/, "perplexity"],
  [/gemini\.google\.com/, "gemini"],
  [/copilot\.microsoft\.com|bing\.com\/chat/, "copilot"],
  [/claude\.ai/, "claude"],
  [/meta\.ai/, "meta"],
  [/grok\.com|x\.ai/, "grok"],
  [/deepseek\.com/, "deepseek"],
  [/wrtn\.ai/, "wrtn"],
  [/liner\.com/, "liner"],
];

// 스크립트는 afterInteractive로 늦게 뜨므로 준비될 때까지 잠깐 기다렸다가 보낸다.
function track(event: string, data?: Record<string, string | number>) {
  let tries = 0;
  const send = () => {
    if (window.umami) window.umami.track(event, data);
    else if (tries++ < 20) setTimeout(send, 500);
  };
  send();
}

function storage(kind: "local" | "session"): Storage | null {
  try {
    return kind === "local" ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

function classifySource(): string {
  const utm = new URLSearchParams(window.location.search).get("utm_source");
  if (utm === "chatgpt.com") return "ai:chatgpt"; // ChatGPT 검색은 리퍼러 없이 UTM만 붙인다
  if (utm) return utm.slice(0, 40);
  const ref = document.referrer;
  if (!ref) return "direct";
  try {
    const host = new URL(ref).hostname;
    if (host === window.location.hostname) return "internal";
    for (const [re, name] of AI_REFERRERS) if (re.test(ref)) return `ai:${name}`;
    if (/instagram\.com/.test(host)) return "instagram";
    if (/google\./.test(host)) return "google";
    if (/naver\.com/.test(host)) return "naver";
    if (/bing\.com/.test(host)) return "bing";
    if (/daum\.net/.test(host)) return "daum";
    return host.slice(0, 60);
  } catch {
    return "unknown";
  }
}

export function Analytics() {
  const pathname = usePathname();

  // 세션·방문 단위 이벤트(첫 로드 1회).
  useEffect(() => {
    const local = storage("local");
    const session = storage("session");
    const source = classifySource();

    if (source.startsWith("ai:")) {
      if (session && !session.getItem(AI_SENT_KEY)) {
        session.setItem(AI_SENT_KEY, "1");
        track("ai_referral", { engine: source.replace(/^ai:/, ""), landing: window.location.pathname });
      }
    }

    if (!local) return;
    const raw = local.getItem(FIRST_KEY);
    if (!raw) {
      if (source !== "internal") local.setItem(FIRST_KEY, JSON.stringify({ t: Date.now(), src: source }));
      return;
    }
    try {
      const first = JSON.parse(raw) as { t: number; src: string };
      const age = Date.now() - first.t;
      if (age > DAY && age < 14 * DAY && !local.getItem(RETURN_SENT_KEY)) {
        local.setItem(RETURN_SENT_KEY, "1");
        track("return_visit", { first_source: first.src, days: Math.floor(age / DAY) });
      }
    } catch {
      local.removeItem(FIRST_KEY);
    }
  }, []);

  // 페이지뷰 단위 이벤트. 라우트가 바뀌면 플래그와 관찰자를 다시 만든다.
  useEffect(() => {
    let nextSent = false;
    let readSent = false;

    const onClick = (e: MouseEvent) => {
      const card = (e.target as Element | null)?.closest<HTMLElement>("[data-track='next_click']");
      if (!card || nextSent) return;
      nextSent = true;
      track("next_click", { from: pathname, to: card.dataset.to ?? "" });
    };
    document.addEventListener("click", onClick);

    let observer: IntersectionObserver | undefined;
    const target = document.getElementById("sources");
    if (target && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        if (readSent || !entries.some((en) => en.isIntersecting)) return;
        readSent = true;
        track("read_end", { path: pathname });
        observer?.disconnect();
      });
      observer.observe(target);
    }

    return () => {
      document.removeEventListener("click", onClick);
      observer?.disconnect();
    };
  }, [pathname]);

  return null;
}
