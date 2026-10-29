import type { MetadataRoute } from "next";
import { latestStations, stationPath, stations } from "@/content/stations";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl("/"), lastModified: latestStations()[0]?.dateModified, changeFrequency: "weekly", priority: 1 },
    ...stations.map((s) => ({
      url: absoluteUrl(stationPath(s)),
      lastModified: s.dateModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [absoluteUrl(s.section.src)],
    })),
  ];
}
