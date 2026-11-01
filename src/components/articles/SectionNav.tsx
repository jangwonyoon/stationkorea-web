import Link from "next/link";
import { sectionPath } from "@/content/sections";
import type { StationSection } from "@/content/types";
import { articleEntries, sectionLinks } from "@/lib/article-index";

export function SectionNav({ current }: { current?: StationSection }) {
  const items = [{ id: undefined, name: "전체", href: "/articles/", count: articleEntries.length }, ...sectionLinks.map(s => ({ ...s, href: sectionPath(s.id) }))];
  return <nav aria-label="기사 카테고리" className="lg:sticky lg:top-16 lg:w-50 lg:shrink-0 lg:self-start"><ul className="flex flex-wrap gap-2 lg:flex-col">
    {items.map(item => <li key={item.name}>{item.count ? <Link href={item.href} aria-current={current === item.id ? "page" : undefined} className={`pressable flex min-h-11 items-center justify-between gap-2 rounded-lg border px-3 text-label ${current === item.id ? "border-ink bg-ink text-ground active:text-ink" : "border-rule hover:bg-slab"}`}>{item.name}<span className={`text-sm font-normal ${current === item.id ? "" : "text-ink-3"}`}>{item.count}</span></Link> : <span aria-disabled="true" className="flex min-h-11 items-center justify-between gap-2 rounded-lg border border-dashed border-rule px-3 text-label text-ink-3">{item.name}<span className="text-sm font-normal">준비 중</span></span>}</li>)}
  </ul></nav>;
}
