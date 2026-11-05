import { articles, articlePath, type MagazineArticle } from "@/content/articles";
import { stations, stationPath } from "@/content/stations";
import { sections } from "@/content/sections";
import type { LineId, StationSection } from "@/content/types";
import { articleReadingMinutes, readingMinutes } from "./reading-time";

export type ArticleEntry = {
  href: string;
  title: string;
  answer: string;
  section: StationSection;
  series?: MagazineArticle["series"];
  published: string;
  modified: string;
  minutes: number;
  place?: string;
  lines: LineId[];
  image?: { src: string; alt: string; caption: string; width?: number; height?: number; artist?: string; provider?: "Wikimedia Commons" | "Pixabay"; kind?: "reel-cover" | "cross-section" };
};

// 게시 시각이 같으면 등록 순서를 유지한다. 수정일로 최신 기사를 바꾸지 않는다.
export const articleEntries: ArticleEntry[] = [
  ...articles.map(a => ({
    href: articlePath(a), title: a.question, answer: a.answer, section: a.section, series: a.series,
    published: a.datePublished, modified: a.dateModified, minutes: articleReadingMinutes(a),
    place: a.station?.name, lines: a.station?.lines ?? [],
    image: a.image ?? (a.cover ? { ...a.cover, kind: "reel-cover" as const } : undefined),
  })),
  ...stations.map(s => ({
    href: stationPath(s), title: s.question, answer: s.answer, section: s.section, series: s.series,
    published: s.datePublished, modified: s.dateModified, minutes: readingMinutes(s),
    place: s.name, lines: s.lines,
    image: s.photo ?? (s.cover ? { ...s.cover, kind: "reel-cover" as const } : s.crossSection ? { ...s.crossSection, kind: "cross-section" as const } : undefined),
  })),
].sort((a, b) => b.published.localeCompare(a.published));

export const sectionLinks = sections.map(section => ({ ...section, count: articleEntries.filter(article => article.section === section.id).length }));
export const publishedSections = sectionLinks.filter(section => section.count > 0);
