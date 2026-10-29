import { latestStations, stationPath } from "@/content/stations";
import { absoluteUrl, site } from "@/lib/site";

export const dynamic = "force-static";

const escape = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// /rss.xml — 네이버 서치어드바이저 RSS 제출용. 최신순.
export function GET() {
  const items = latestStations().map((s) => {
    const url = absoluteUrl(stationPath(s));
    return [
      "<item>",
      `<title>${escape(s.question)}</title>`,
      `<link>${url}</link>`,
      `<guid isPermaLink="true">${url}</guid>`,
      `<description>${escape(s.answer)}</description>`,
      `<pubDate>${new Date(s.datePublished).toUTCString()}</pubDate>`,
      ...s.lines.map((line) => `<category>${escape(line)}</category>`),
      "</item>",
    ].join("");
  });
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
    "<channel>",
    `<title>${escape(site.name)}</title>`,
    `<link>${absoluteUrl("/")}</link>`,
    `<description>${escape(site.description)}</description>`,
    "<language>ko</language>",
    `<atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml"/>`,
    ...items,
    "</channel>",
    "</rss>",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
