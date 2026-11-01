import { articles, getArticle } from "@/content/articles";
import { articleMarkdown } from "@/lib/markdown";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() { return articles.map((article) => ({ slug: article.slug })); }

export async function GET(_: Request, { params }: { params: Promise<{ slug: string }> }) {
  const article = getArticle((await params).slug);
  if (!article) return new Response("Not found", { status: 404 });
  return new Response(articleMarkdown(article), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
