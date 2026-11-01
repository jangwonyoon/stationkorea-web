export type NavItem = {
  label: string;
  href: string;
  // 현재 위치 판정: 이 경로 접두사 중 하나로 시작하면 현재 항목이다.
  match: (pathname: string, hash: string) => "page" | "location" | null;
};

const normalize = (p: string) => (p.endsWith("/") ? p : `${p}/`);

export const navItems: NavItem[] = [
  {
    label: "기사",
    href: "/articles/",
    match: (p, hash) => {
      const path = normalize(p);
      if (path === "/articles/") return "page";
      if (path === "/" && (hash === "#all" || hash === "#new-articles")) return "location";
      return ["/station/", "/article/", "/section/"].some(prefix => path.startsWith(prefix)) ? "location" : null;
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
