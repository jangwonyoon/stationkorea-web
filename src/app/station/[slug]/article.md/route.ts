import { getStation, stations } from "@/content/stations";
import { stationMarkdown } from "@/lib/markdown";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return stations.map((s) => ({ slug: s.slug }));
}

// /station/<slug>/article.md — 같은 기사의 마크다운 버전(HTML에서 rel=alternate로 가리킨다).
export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const s = getStation((await params).slug);
  if (!s) return new Response("Not found", { status: 404 });
  return new Response(stationMarkdown(s), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
