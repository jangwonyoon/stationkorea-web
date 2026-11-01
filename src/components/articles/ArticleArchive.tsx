import { Breadcrumb } from "@/components/article/meta/Breadcrumb";
import { JsonLd } from "@/components/JsonLd";
import { ArticleCards } from "./ArticleCards";
import { SectionNav } from "./SectionNav";
import type { ArticleEntry } from "@/lib/article-index";
import type { StationSection } from "@/content/types";
import { archiveJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export function ArticleArchive({ title, description, path, entries, section }: { title: string; description: string; path: string; entries: ArticleEntry[]; section?: StationSection }) {
  return <div className="page-wrap py-8 md:py-12">
    <JsonLd data={archiveJsonLd(title, description, path, entries)} />
    <Breadcrumb items={[{ name: site.name, href: "/" }, ...(section ? [{ name: "전체 기사", href: "/articles/" }] : []), { name: title }]} />
    <header className="mt-8 border-b-2 border-ink pb-6"><h1 className="text-h1">{title}</h1><p className="mt-4 text-body text-ink-2">{description}</p></header>
    <SectionNav current={section} />
    <section className="mt-10" aria-labelledby="archive-list"><h2 id="archive-list" className="text-label">기사 {entries.length}편 · 최신 게시일순</h2><ArticleCards entries={entries} /></section>
  </div>;
}
