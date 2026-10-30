"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/** SSR 순서를 유지하고, 데스크톱에서 떨어진 세 블록을 한 레일처럼 고정한다. */
export function ArticleLayout({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const [naturalRail, setNaturalRail] = useState(false);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const media = window.matchMedia("(min-width: 1280px)");
    const rails = [...element.querySelectorAll<HTMLElement>(":scope > [data-rail]")];
    const blocks = rails.map((rail) => rail.firstElementChild as HTMLElement);
    let active = true;
    const measure = () => {
      if (!active) return;
      if (!media.matches) {
        setReady(false);
        return;
      }
      const gap = parseFloat(getComputedStyle(element).columnGap);
      const heights = blocks.map((block) => block.getBoundingClientRect().height);
      const total = heights.reduce((sum, height) => sum + height, 0) + gap * (blocks.length - 1);
      let offset = 0;
      rails.forEach((rail, index) => {
        // 예외: 콘텐츠 높이에 의존하는 위치만 런타임 CSS 변수로 전달한다.
        rail.style.setProperty("--rail-offset", `${offset}px`);
        rail.style.setProperty("--rail-top", `${gap + offset}px`);
        rail.style.setProperty("--rail-bottom", `${total - offset - heights[index]}px`);
        offset += heights[index] + gap;
      });
      setReady(true);
    };
    const observer = new ResizeObserver(measure);
    blocks.forEach((block) => observer.observe(block));
    observer.observe(element);
    media.addEventListener("change", measure);
    document.fonts.ready.then(measure);
    measure();
    return () => {
      active = false;
      observer.disconnect();
      media.removeEventListener("change", measure);
    };
  }, []);

  // 키보드로 레일에 진입한 기사는 자연 스크롤을 유지해 이후 포인터 클릭도 이동하지 않는다.
  return (
    <div ref={root} onFocusCapture={(event) => {
      if (!naturalRail && event.target.closest("[data-rail]") && event.target.matches(":focus-visible")) setNaturalRail(true);
    }} className={`relative page-grid [&>*]:col-span-4 md:[&>*]:col-span-6 md:[&>*]:col-start-2 xl:[&>*]:col-span-7 xl:[&>*]:col-start-1 ${ready ? "xl:[&>[data-rail]]:pointer-events-none xl:[&>[data-rail]]:absolute xl:[&>[data-rail]]:inset-x-0 xl:[&>[data-rail]]:top-0 xl:[&>[data-rail]]:bottom-(--rail-bottom) xl:[&>[data-rail]]:col-span-4 xl:[&>[data-rail]]:col-start-9 xl:[&>[data-rail]]:m-0 xl:[&>[data-rail]]:pt-(--rail-offset) xl:[&>[data-rail]>div]:pointer-events-auto xl:[&>[data-rail]>div]:top-(--rail-top) xl:[&:has([data-rail]_:focus-visible)>[data-rail]>div]:static" : ""} ${ready && naturalRail ? "xl:[&>[data-rail]>div]:static" : "xl:[&>[data-rail]>div]:sticky"}`}>
      {children}
    </div>
  );
}
