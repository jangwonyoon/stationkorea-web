import type { MetadataRoute } from "next";
import { latestStations, stationPath, stations } from "@/content/stations";
import { absoluteUrl } from "@/lib/site";
import { lineLastModified, linePath, publishedLines } from "@/app/line/data";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), lastModified: latestStations()[0]?.dateModified, changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/about/"), changeFrequency: "monthly", priority: 0.5 },
    ...publishedLines.map((id) => ({ url: absoluteUrl(linePath(id)), lastModified: lineLastModified(id), changeFrequency: "monthly" as const, priority: 0.7 })),
    ...stations.map((s) => ({
      url: absoluteUrl(stationPath(s)),
      lastModified: s.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [absoluteUrl(s.crossSection.src)],
    })),
  ];
}
