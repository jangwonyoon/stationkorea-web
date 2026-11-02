"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import { navItems } from "./nav";
import { sectionPath, type SectionLink } from "@/content/sections";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

// 얇은 헤더(48px): 제호 + 내비 3개(기사·노선·소개).
// 점진 향상: 정적 HTML에서는 sticky로 항상 보인다. JS가 돌면 아래로 스크롤할 때 숨고 위로 스크롤하면 돌아온다.
// 움직임 줄이기(reduce) 설정이면 숨기지 않는다. 헤더 안에 포커스가 있으면 숨기지 않는다.
const HEADER_HEIGHT = 48;
// 인앱 브라우저의 작은 흔들림·관성 스크롤에서 깜빡이지 않도록, 이만큼 한 방향으로 움직여야 상태를 바꾼다.
const DELTA = 12;

export function SiteHeader({ sections }: { sections: SectionLink[] }) {
  const pathname = usePathname();
  const hidden = useHideOnScroll(pathname);
  const [hash, setHash] = useState("");
  const menu = useRef<HTMLDetailsElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const closeMenu = () => { if (menu.current) menu.current.open = false; };

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    const outside = (event: PointerEvent) => { if (!menu.current?.contains(event.target as Node)) closeMenu(); };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menu.current?.open) {
        closeMenu();
        menu.current.querySelector("summary")?.focus();
      }
    };
    document.addEventListener("pointerdown", outside);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("pointerdown", outside); document.removeEventListener("keydown", escape); };
  }, []);

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 h-12 border-b border-rule bg-ground transition-transform duration-200 ease-out focus-within:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none ${
        hidden && !menuOpen ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="page-wrap relative flex h-full items-center justify-between gap-1 pr-1 md:pr-6">
        <Link href="/" className="inline-flex min-h-11 shrink-0 items-center brand-wordmark text-ink">
          {site.name}
        </Link>
        <div className="flex items-center">
          <nav aria-label="주 메뉴">
            <ul className="flex items-center">
              {navItems.map((item) => {
                const current = item.match(pathname ?? "/", hash);
                return (
                  <li key={item.label}>
                    {item.label === "기사" ? <details ref={menu} onToggle={event => setMenuOpen(event.currentTarget.open)} onBlur={event => { if (!event.currentTarget.contains(event.relatedTarget)) closeMenu(); }}>
                      <summary aria-current={current ?? undefined} className={`${buttonVariants({ variant: "ghost" })} cursor-pointer list-none gap-1 border-b-2 px-1 ${current ? "border-ink" : "border-transparent"}`}>기사 <span aria-hidden="true">⌄</span></summary>
                      <ul aria-label="기사 탐색" className="absolute inset-x-0 top-full z-50 border-b-2 border-ink bg-ground px-5 pb-4 pt-2 md:left-auto md:right-16 md:mt-1 md:w-90 md:max-w-full md:rounded-lg md:border md:p-2">
                        <li><Link href="/articles/" onClick={closeMenu} aria-current={pathname === "/articles/" || pathname === "/articles" ? "page" : undefined} className={`pressable flex min-h-13 items-center justify-between gap-3 rounded-lg border-b border-rule px-2 text-label hover:bg-slab ${pathname?.replace(/\/$/, "") === "/articles" ? "bg-slab" : ""}`}>전체 기사 <span className="text-caption">{sections.reduce((sum, section) => sum + section.count, 0)}</span></Link></li>
                        {sections.map(section => <li key={section.id}>{section.count ? <Link href={sectionPath(section.id)} onClick={closeMenu} aria-current={pathname?.replace(/\/$/, "") === sectionPath(section.id).replace(/\/$/, "") ? "page" : undefined} className={`pressable flex min-h-13 items-center justify-between gap-3 rounded-lg border-b border-rule px-2 text-label hover:bg-slab ${pathname?.replace(/\/$/, "") === sectionPath(section.id).replace(/\/$/, "") ? "bg-slab" : ""}`}><span><span className="block">{section.name}</span><span className="mt-1 block text-xs font-normal text-ink-3">{section.description}</span></span><span className="shrink-0 text-caption">{section.count}편</span></Link> : <span aria-disabled="true" className="flex min-h-13 items-center justify-between gap-3 border-b border-dashed border-rule px-2 text-label text-ink-3"><span><span className="block">{section.name}</span><span className="mt-1 block text-xs font-normal">{section.description}</span></span><span className="shrink-0 rounded-plate border border-dashed border-rule px-1 text-xs">준비 중</span></span>}</li>)}
                      </ul>
                    </details> : <Link
                      href={item.href}
                      onClick={() => setHash(item.href.includes("#") ? `#${item.href.split("#")[1]}` : "")}
                      aria-current={current ?? undefined}
                      className={`inline-flex min-h-11 min-w-11 items-center justify-center border-b-2 px-2 text-label text-ink ${
                        current ? "border-ink" : "border-transparent"
                      }`}
                    >
                      {item.label}
                    </Link>}
                  </li>
                );
              })}
            </ul>
          </nav>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

function useHideOnScroll(pathname: string): boolean {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    setHidden(false);
    let lastY = Math.max(0, window.scrollY);
    let frame = 0;

    const update = () => {
      frame = 0;
      const y = Math.max(0, window.scrollY);
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      // 맨 위 근처에서는 항상 보인다.
      if (y <= HEADER_HEIGHT) {
        setHidden(false);
        lastY = y;
        return;
      }
      // iOS 바닥 바운스(스크롤 값이 최대를 넘었다 돌아옴)는 방향 판정에서 뺀다.
      if (y >= maxY) {
        lastY = maxY;
        return;
      }
      const dy = y - lastY;
      if (Math.abs(dy) < DELTA) return;
      setHidden(dy > 0);
      lastY = y;
    };

    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return hidden;
}
