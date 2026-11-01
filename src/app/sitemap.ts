import type { MetadataRoute } from "next";
import { latestStations, stationPath, stations } from "@/content/stations";
import { absoluteUrl } from "@/lib/site";
import { lineLastModified, linePath, publishedLines } from "@/app/line/data";
import { articlePath, articles } from "@/content/articles";

import { articleEntries, publishedSections } from "@/lib/article-index";
import { sectionPath } from "@/content/sections";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/articles/"), lastModified: articleEntries.map(e => e.modified).sort().at(-1), changeFrequency: "weekly", priority: 0.8 },
    ...publishedSections.map(section => ({ url: absoluteUrl(sectionPath(section.id)), lastModified: articleEntries.filter(e => e.section === section.id).map(e => e.modified).sort().at(-1), changeFrequency: "weekly" as const, priority: 0.7 })),
    { url: absoluteUrl("/"), lastModified: [latestStations()[0]?.dateModified, ...articles.map((article) => article.dateModified)].filter(Boolean).sort().at(-1), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about/"), changeFrequency: "monthly", priority: 0.5 },
    ...publishedLines.map((id) => ({ url: absoluteUrl(linePath(id)), lastModified: lineLastModified(id), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...stations.map((s) => ({
      url: absoluteUrl(stationPath(s)),
      lastModified: s.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [absoluteUrl(s.crossSection.src)],
    })),
    ...articles.map((article) => ({
      url: absoluteUrl(articlePath(article)),
      lastModified: article.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      ...(article.image ? { images: [absoluteUrl(article.image.src)] } : {}),
    })),
  ];
}
