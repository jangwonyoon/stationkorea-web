import Image from "next/image";
import Link from "next/link";
import { sections } from "@/content/sections";
import type { ArticleEntry } from "@/lib/article-index";
import { ArticlePlace } from "./ArticlePlace";

export function ArticleCards({ entries, variant = "list" }: { entries: ArticleEntry[]; variant?: "recent" | "list" }) {
  const recent = variant === "recent";
  return <ul className={recent ? "mt-4 grid md:grid-cols-2 md:gap-4 lg:grid-cols-4 lg:gap-5" : "divide-y divide-rule border-b border-rule"}>
    {entries.map(entry => <li key={entry.href} className={recent ? "min-w-0 border-b border-rule md:border-0" : "min-w-0"}>
      <Link href={entry.href} className={`pressable group flex h-full gap-4 py-5 hover:bg-slab ${recent ? "md:flex-col md:rounded-xl md:border md:border-rule md:p-5 md:hover:border-ink" : "rounded-lg"}`}>
        <div className="flex min-w-0 flex-1 flex-col">
          <p className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm">
            <span className="font-semibold">#{sections.find(section => section.id === entry.section)?.name}</span>
            <span className="text-ink-3">읽는 데 약 {entry.minutes}분</span>
          </p>
          <h3 className="mt-2 font-serif text-lg font-semibold leading-snug break-keep underline-offset-4 group-hover:underline md:text-xl">{entry.title}</h3>
          <p className={`mt-2 text-sm leading-relaxed text-ink-2 line-clamp-2 ${recent ? "md:mb-6 md:line-clamp-3" : "md:line-clamp-none"}`}>{entry.answer}</p>
          <div className={`mt-auto flex items-center justify-between gap-2 pt-3 ${recent ? "md:min-h-20 md:border-t md:border-rule" : ""}`}>
            <ArticlePlace entry={entry} />
            <span className="ml-auto shrink-0 text-sm font-semibold"><span className="sr-only">기사 읽기</span><span aria-hidden="true">→</span></span>
          </div>
        </div>
        {entry.image && <span className={`relative aspect-4/5 w-18 shrink-0 self-start overflow-hidden rounded-lg bg-slab ${recent ? "md:order-first md:aspect-video md:w-full" : "md:w-24"}`}>
          <Image src={entry.image.src} alt={entry.image.alt} fill sizes={recent ? "(min-width: 1280px) 246px, (min-width: 1024px) calc(25vw - 66px), (min-width: 768px) calc(50vw - 72px), 72px" : "(min-width: 768px) 96px, 72px"} className="object-cover" />
        </span>}
      </Link>
    </li>)}
  </ul>;
}
