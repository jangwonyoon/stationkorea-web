"use client";

import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [dark, setDark] = useState<boolean | null>(null);

  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => setDark(document.documentElement.dataset.theme
      ? document.documentElement.dataset.theme === "dark"
      : media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return (
    <button
      type="button"
      hidden={dark === null}
      aria-label="다크 모드"
      aria-pressed={dark ?? false}
      title={dark ? "라이트 모드로 전환" : "다크 모드로 전환"}
      className="size-11 shrink-0 rounded-plate text-xl text-ink hover:bg-slab active:bg-slab"
      onClick={() => {
        const next = !dark;
        document.documentElement.dataset.theme = next ? "dark" : "light";
        setDark(next);
      }}
    >
      <span aria-hidden="true">◐</span>
    </button>
  );
}
