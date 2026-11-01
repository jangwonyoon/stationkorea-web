import Link from "next/link";
import { sectionPath } from "@/content/sections";
import type { StationSection } from "@/content/types";
import { articleEntries, sectionLinks } from "@/lib/article-index";

export function SectionNav({ current }: { current?: StationSection }) {
  const items = [{ id: undefined, name: "전체", href: "/articles/", count: articleEntries.length }, ...sectionLinks.map(s => ({ ...s, href: sectionPath(s.id) }))];
  return <nav aria-label="기사 카테고리" className="mt-8"><ul className="flex flex-wrap gap-2">
    {items.map(item => <li key={item.name}>{item.count ? <Link href={item.href} aria-current={current === item.id ? "page" : undefined} className={`pressable inline-flex min-h-11 items-center gap-2 rounded-full border px-4 text-label ${current === item.id ? "border-ink bg-slab" : "border-rule hover:bg-slab"}`}>{item.name}<span className="text-caption">{item.count}</span></Link> : <span aria-disabled="true" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-rule px-4 text-label text-ink-3">{item.name}<span className="text-caption">준비 중</span></span>}</li>)}
  </ul></nav>;
}
