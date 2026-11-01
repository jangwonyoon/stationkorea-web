import { articles, articlePath } from "@/content/articles";
import { stations, stationPath } from "@/content/stations";
import { sections } from "@/content/sections";
import type { StationSection } from "@/content/types";
import { articleReadingMinutes, readingMinutes } from "./reading-time";

export type ArticleEntry = {
  href: string;
  title: string;
  answer: string;
  section: StationSection;
  published: string;
  modified: string;
  minutes: number;
};

// 게시 시각이 같으면 등록 순서를 유지한다. 수정일로 최신 기사를 바꾸지 않는다.
export const articleEntries: ArticleEntry[] = [
  ...articles.map(a => ({ href: articlePath(a), title: a.question, answer: a.answer, section: a.section, published: a.datePublished, modified: a.dateModified, minutes: articleReadingMinutes(a) })),
  ...stations.map(s => ({ href: stationPath(s), title: s.question, answer: s.answer, section: s.section, published: s.datePublished, modified: s.dateModified, minutes: readingMinutes(s) })),
].sort((a, b) => b.published.localeCompare(a.published));

export const sectionLinks = sections.map(section => ({ ...section, count: articleEntries.filter(article => article.section === section.id).length }));
export const publishedSections = sectionLinks.filter(section => section.count > 0);
