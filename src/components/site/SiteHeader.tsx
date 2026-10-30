"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { navItems } from "./nav";

// 얇은 헤더(48px): 제호 + 내비 3개(질문·노선·소개).
// 점진 향상: 정적 HTML에서는 sticky로 항상 보인다. JS가 돌면 아래로 스크롤할 때 숨고 위로 스크롤하면 돌아온다.
// 움직임 줄이기(reduce) 설정이면 숨기지 않는다. 헤더 안에 포커스가 있으면 숨기지 않는다.
const HEADER_HEIGHT = 48;
// 인앱 브라우저의 작은 흔들림·관성 스크롤에서 깜빡이지 않도록, 이만큼 한 방향으로 움직여야 상태를 바꾼다.
const DELTA = 12;

export function SiteHeader() {
  const pathname = usePathname();
  const hidden = useHideOnScroll(pathname);
  const [hash, setHash] = useState("");

  useEffect(() => {
    const updateHash = () => setHash(window.location.hash);
    updateHash();
    window.addEventListener("hashchange", updateHash);
    return () => window.removeEventListener("hashchange", updateHash);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-40 h-12 border-b border-rule bg-ground transition-transform duration-200 ease-out focus-within:translate-y-0 motion-reduce:translate-y-0 motion-reduce:transition-none ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="page-wrap flex h-full items-center justify-between gap-4">
        <Link href="/" className="inline-flex min-h-11 items-center font-serif text-lg font-bold text-ink">
          {site.name}
        </Link>
        <nav aria-label="주 메뉴">
          <ul className="flex items-center">
            {navItems.map((item) => {
              const current = item.match(pathname ?? "/", hash);
              return (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    onClick={() => setHash(item.href.includes("#") ? `#${item.href.split("#")[1]}` : "")}
                    aria-current={current ?? undefined}
                    className={`inline-flex min-h-11 min-w-11 items-center justify-center border-b-2 px-2 text-label text-ink ${
                      current ? "border-ink" : "border-transparent"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
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
