import { stations } from "@/content/stations";
import { stationMarkdown } from "@/lib/markdown";
import { site } from "@/lib/site";

export const dynamic = "force-static";

// /llms-full.txt — 모든 기사 전문을 출처와 함께 한 파일로.
export function GET() {
  const body = [`# ${site.name} — 기사 전문`, "", site.description, "", ...stations.map(stationMarkdown)].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
