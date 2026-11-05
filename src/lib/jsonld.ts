import { lineName, type LineId } from "@/content/lines";
import type { Station } from "@/content/types";
import { stationPath } from "@/content/stations";
import { articlePath, type MagazineArticle } from "@/content/articles";
import { absoluteUrl, site } from "@/lib/site";

// logo는 Claude Design에서 로고가 나오면 추가한다(SEO·GEO 규칙 6).
const publisher = {
  "@type": "Organization",
  name: site.name,
  url: absoluteUrl("/"),
  email: site.email,
  sameAs: [site.instagram],
};

const author = {
  "@type": "Person",
  name: site.author.name,
  url: absoluteUrl(site.author.path),
  description: site.author.bio,
};

/** /about/: AboutPage + 운영 주체·저자. */
export function aboutJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    url: absoluteUrl("/about/"),
    inLanguage: "ko-KR",
    about: publisher,
    mainEntity: author,
  };
}

/** 홈: WebSite + 질문 목록(ItemList). */
export function homeJsonLd(items: { name: string; url: string }[]) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: site.name,
      alternateName: [site.koreanName, "스테이션 코리아", "StationKorea"],
      url: absoluteUrl("/"),
      description: site.description,
      inLanguage: "ko-KR",
      publisher,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: "대표 기사와 최근 기사",
      itemListElement: items.map(item => ({ ...item, url: absoluteUrl(item.url) })).map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        ...item,
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
      image: [absoluteUrl(s.photo?.src ?? s.ogImage), ...(s.crossSection ? [absoluteUrl(s.crossSection.src)] : [])],
      datePublished: s.datePublished,
      dateModified: s.dateModified,
      inLanguage: "ko-KR",
      author,
      publisher,
      mainEntityOfPage: url,
      about: [
        { "@type": "SubwayStation", name: s.name, containedInPlace: { "@type": "City", name: "서울" } },
        ...s.lines.map((line) => ({ "@type": "Thing", name: `서울 지하철 ${lineName(line)}` })),
      ],
      citation: s.sources.map((src) => ({
        "@type": "CreativeWork",
        name: src.title,
        publisher: { "@type": "Organization", name: src.org },
        ...(src.url ? { url: src.url } : {}),
      })),
      // 릴스는 페이지에서 재생하지 않고 인스타로 링크만 하므로 VideoObject를 넣지 않는다(Google 동영상 가이드).
      sameAs: [s.reel.url],
    },
    ...(s.qna.length ? [{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: s.qna.map((q) => ({
        "@type": "Question",
        name: q.question,
        acceptedAnswer: { "@type": "Answer", text: q.answer.join(" ") },
      })),
    }] : []),
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

export function articleJsonLd(article: MagazineArticle) {
  const url = absoluteUrl(articlePath(article));
  return [
    {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: article.question,
      description: article.answer,
      datePublished: article.datePublished,
      dateModified: article.dateModified,
      inLanguage: "ko-KR",
      author,
      publisher,
      mainEntityOfPage: url,
      ...(article.image ? { image: [absoluteUrl(article.image.src)] } : {}),
      citation: article.sources.map((source) => ({
        "@type": "CreativeWork",
        name: source.title,
        publisher: { "@type": "Organization", name: source.org },
        ...(source.url ? { url: source.url } : {}),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.name, item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: article.question, item: url },
      ],
    },
  ];
}

/** 노선 허브: 화면에 실린 역 기사만 나열한다. */
export function lineJsonLd(line: LineId, list: { href: string; title: string }[]) {
  const url = absoluteUrl(`/line/${line}/`);
  return [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: lineName(line),
      url,
      inLanguage: "ko-KR",
      mainEntity: { "@id": `${url}#questions` },
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "@id": `${url}#questions`,
      name: "이 노선의 기사",
      itemListElement: list.map((entry, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: entry.title,
        url: absoluteUrl(entry.href),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: site.name, item: absoluteUrl("/") },
        { "@type": "ListItem", position: 2, name: "노선", item: absoluteUrl("/line/") },
        { "@type": "ListItem", position: 3, name: lineName(line), item: url },
      ],
    },
  ];
}

/** 정적 기사 목록에 실제 표시된 항목만 설명한다. */
export function archiveJsonLd(title: string, description: string, path: string, entries: { href: string; title: string }[]) {
  return {
    "@context": "https://schema.org", "@type": "CollectionPage", name: title,
    description, url: absoluteUrl(path), inLanguage: "ko-KR",
    mainEntity: { "@type": "ItemList", numberOfItems: entries.length,
      itemListElement: entries.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.title, url: absoluteUrl(entry.href) })) },
  };
}
