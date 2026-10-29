import type { Station } from "@/content/types";
import { stationPath } from "@/content/stations";
import { absoluteUrl, site } from "@/lib/site";

const publisher = {
  "@type": "Organization",
  name: site.name,
  url: site.url,
  sameAs: [site.instagram],
};

/** 홈: WebSite + 질문 목록(ItemList). */
export function homeJsonLd(list: Station[]) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      url: absoluteUrl("/"),
      description: site.description,
      inLanguage: "ko-KR",
      publisher,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "역 해부 질문 목록",
      itemListElement: list.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: s.question,
        url: absoluteUrl(stationPath(s)),
      })),
    },
  ];
}

/** 역 기사: Article + FAQPage(Q&A와 1:1) + BreadcrumbList. */
export function stationJsonLd(s: Station) {
  const url = absoluteUrl(stationPath(s));
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: s.question,
      description: s.answer,
      image: [absoluteUrl(s.ogImage), absoluteUrl(s.section.src)],
      datePublished: s.datePublished,
      dateModified: s.dateModified,
      inLanguage: "ko-KR",
      author: publisher,
      publisher,
      mainEntityOfPage: url,
      about: [
        { "@type": "SubwayStation", name: s.name, containedInPlace: { "@type": "City", name: "서울" } },
        ...s.lines.map((line) => ({ "@type": "Thing", name: `서울 지하철 ${line}` })),
      ],
      citation: s.sources.map((src) => ({
        "@type": "CreativeWork",
        name: src.title,
        publisher: { "@type": "Organization", name: src.org },
        ...(src.url ? { url: src.url } : {}),
      })),
      video: {
        "@type": "VideoObject",
        name: s.question,
        description: s.answer,
        thumbnailUrl: absoluteUrl(s.reel.thumbnail),
        uploadDate: s.reel.postedAt,
        url: s.reel.url,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.qna.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer.join(" ") },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.name, item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: s.name, item: url },
      ],
    },
  ];
}
