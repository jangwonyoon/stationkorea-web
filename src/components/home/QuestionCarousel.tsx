"use client";

import { Children, useEffect, useId, useRef, useState, type ReactNode } from "react";

/** Server-rendered li children keep every question link available without JavaScript. */
export function QuestionCarousel({ children }: { children: ReactNode }) {
  const count = Children.count(children);
  const id = useId();
  const track = useRef<HTMLUListElement>(null);
  const [announcement, setAnnouncement] = useState("");
  const [position, setPosition] = useState({ first: 1, last: 1, overflow: false, start: true, end: false });

  useEffect(() => {
    const list = track.current;
    if (!list) return;
    const update = () => {
      const bounds = list.getBoundingClientRect();
      const visible = Array.from(list.children).flatMap((child, index) => {
        const rect = child.getBoundingClientRect();
        return rect.right > bounds.left + 1 && rect.left < bounds.right - 1 ? [index + 1] : [];
      });
      setPosition({
        first: visible[0] ?? 1,
        last: visible.at(-1) ?? 1,
        overflow: list.scrollWidth > list.clientWidth + 1,
        start: list.scrollLeft <= 1,
        end: list.scrollWidth - list.clientWidth - list.scrollLeft <= 1,
      });
    };
    update();
    list.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(list);
    return () => {
      list.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, [count]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setAnnouncement(`${count}개 중 ${position.first}번부터 ${position.last}번 질문`);
    }, 200);
    return () => window.clearTimeout(timer);
  }, [count, position.first, position.last]);

  function move(direction: number) {
    const list = track.current;
    if (!list) return;
    const first = list.firstElementChild as HTMLElement | null;
    if (!first) return;
    const offsets = Array.from(list.children, (child) => (child as HTMLElement).offsetLeft - first.offsetLeft);
    const target = direction > 0
      ? offsets.find((offset) => offset > list.scrollLeft + 1) ?? list.scrollWidth
      : offsets.findLast((offset) => offset < list.scrollLeft - 1) ?? 0;
    // Instant native scrolling also keeps rapid clicks and reduced motion deterministic.
    list.scrollTo({ left: target, behavior: "instant" });
  }

  if (!count) return null;

  return (
    <div className="mt-3" role="region" aria-label="최신 질문 캐러셀" aria-roledescription="캐러셀">
      <ul ref={track} id={id} onFocus={(event) => {
        const list = event.currentTarget;
        const card = event.target.closest("li");
        const first = list.firstElementChild as HTMLElement | null;
        if (!card || card.parentElement !== list || !first) return;
        const bounds = list.getBoundingClientRect();
        const focused = card.getBoundingClientRect();
        // A peek counts as visible to native focus scrolling; reserve the full 6px focus ring.
        if (focused.left < bounds.left + 6 || focused.right > bounds.right - 6) {
          list.scrollTo({ left: card.offsetLeft - first.offsetLeft, behavior: "instant" });
        }
      }} className="question-track scrollbar-none grid snap-x snap-mandatory scroll-p-2 grid-flow-col gap-4 overflow-x-auto p-2">
        {children}
      </ul>
      <span className="sr-only" aria-live="polite" aria-atomic="true">{announcement}</span>
      {position.overflow && (
        <div className="mt-2 flex items-center justify-end gap-2 text-ink">
          <span className="mr-2 text-caption" aria-live="off">
            {position.first === position.last ? position.first : `${position.first}–${position.last}`} / {count}
          </span>
          <button type="button" aria-label="이전 질문" aria-controls={id} disabled={position.start} onClick={() => move(-1)} className="pressable flex size-11 items-center justify-center rounded-plate border border-rule bg-ground hover:bg-slab disabled:cursor-default disabled:opacity-40">
            <span aria-hidden="true">←</span>
          </button>
          <button type="button" aria-label="다음 질문" aria-controls={id} disabled={position.end} onClick={() => move(1)} className="pressable flex size-11 items-center justify-center rounded-plate border border-rule bg-ground hover:bg-slab disabled:cursor-default disabled:opacity-40">
            <span aria-hidden="true">→</span>
          </button>
        </div>
      )}
    </div>
  );
}
