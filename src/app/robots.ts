import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// 검색엔진과 AI 답변엔진 크롤러를 모두 허용한다(인용되려면 열어야 한다).
export default function robots(): MetadataRoute.Robots {
  const agents = [
    "Googlebot", "Yeti", "Bingbot",
    "GPTBot", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "Claude-SearchBot", "Google-Extended",
  ];
  return {
    rules: [...agents.map((userAgent) => ({ userAgent, allow: "/" })), { userAgent: "*", allow: "/" }],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
