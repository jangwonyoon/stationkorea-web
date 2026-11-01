import Link from "next/link";
import { sections } from "@/content/sections";
import type { ArticleEntry } from "@/lib/article-index";

export function ArticleCards({ entries }: { entries: ArticleEntry[] }) {
  return <ul className="mt-6 grid gap-4 md:grid-cols-2">
    {entries.map(entry => <li key={entry.href}>
      <Link href={entry.href} className="pressable block h-full rounded-xl border border-rule p-5 hover:bg-slab">
        <p className="text-label">#{sections.find(section => section.id === entry.section)?.name} · 읽는 데 약 {entry.minutes}분</p>
        <h3 className="mt-3 font-serif text-xl font-semibold break-keep">{entry.title}</h3>
        <p className="mt-3 line-clamp-3 text-body text-ink-2">{entry.answer}</p>
        <span className="mt-4 block text-label underline underline-offset-4">기사 읽기 <span aria-hidden="true">→</span></span>
      </Link>
    </li>)}
  </ul>;
}
