// 헤더 내비 3개(시안 v1: 질문·노선·소개). 링크 대상은 정적 HTML에 그대로 들어가 JS 없이 동작한다.
// - 질문: 홈 질문 목록(src/app/page.tsx의 id="all"). 홈 개편(P2 #34)에서 id가 바뀌면 여기도 고친다.
// - 노선: 노선 허브(/line/)가 생기기 전까지 홈 노선 영역(id="lines"). P4 머지 후 "/line/"로 바꾼다.
export type NavItem = {
  label: string;
  href: string;
  // 현재 위치 판정: 이 경로 접두사 중 하나로 시작하면 현재 항목이다.
  match: (pathname: string, hash: string) => "page" | "location" | null;
};

const normalize = (p: string) => (p.endsWith("/") ? p : `${p}/`);

export const navItems: NavItem[] = [
  {
    label: "질문",
    href: "/#all",
    match: (p, hash) => {
      const path = normalize(p);
      if (path === "/") return hash === "#lines" ? null : "location";
      return path.startsWith("/station/") ? "location" : null;
    },
  },
  {
    label: "노선",
    href: "/#lines",
    match: (p, hash) =>
      normalize(p).startsWith("/line/") || (normalize(p) === "/" && hash === "#lines") ? "location" : null,
  },
  {
    label: "소개",
    href: "/about/",
    match: (p) => (normalize(p) === "/about/" ? "page" : null),
  },
];
