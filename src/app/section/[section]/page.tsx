import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticleArchive } from "@/components/articles/ArticleArchive";
import { articleEntries, publishedSections } from "@/lib/article-index";
import { sectionPath } from "@/content/sections";
type Props = { params: Promise<{ section: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return publishedSections.map(s => ({ section: s.id })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section: id } = await params;
  const section = publishedSections.find(s => s.id === id);
  if (!section) return {};
  return { title: section.name, description: section.description, alternates: { canonical: sectionPath(section.id) }, openGraph: { type: "website", title: section.name, description: section.description, url: sectionPath(section.id) } };
}
export default async function SectionPage({ params }: Props) {
  const { section: id } = await params;
  const section = publishedSections.find(s => s.id === id);
  if (!section) notFound();
  return <ArticleArchive title={`#${section.name}`} description={section.description} path={sectionPath(section.id)} section={section.id} entries={articleEntries.filter(entry => entry.section === section.id)} />;
}
