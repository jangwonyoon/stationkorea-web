import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { Breadcrumb } from "@/components/article/meta/Breadcrumb";
import { LineRoundel } from "@/components/line";
import { LINE_BG, LINE_BORDER } from "@/components/line/lineClasses";
import { lineName } from "@/content/lines";
import { lineJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { linePath, lineArticles, publishedLines } from "../data";

export const dynamicParams = false;

export function generateStaticParams() {
  return publishedLines.map((id) => ({ id }));
}

function publishedLine(id: string) {
  const line = publishedLines.find((line) => line === id);
  if (!line) notFound();
  return line;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const line = publishedLine((await params).id);
  const title = `${lineName(line)} 기사`;
  const description = `${site.name}에 발행된 ${lineName(line)} 관련 기사를 모았습니다. 역과 길, 동네의 이야기를 읽습니다.`;
  return {
    title,
    description,
    alternates: { canonical: linePath(line) },
    openGraph: { title, description, url: linePath(line), type: "website" },
  };
}

export default async function LinePage({ params }: { params: Promise<{ id: string }> }) {
  const line = publishedLine((await params).id);
  const articles = lineArticles(line);
  return (
    <div className="page-wrap py-8 md:py-12 xl:py-16">
      <JsonLd data={lineJsonLd(line, articles)} />
      <Breadcrumb items={[{ name: site.name, href: "/" }, { name: "노선", href: "/line/" }, { name: lineName(line) }]} />
      <nav aria-label="기사가 있는 노선" className="mt-6">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7">
          {publishedLines.map((id) => (
            <li key={id}>
              <Link href={linePath(id)} aria-current={id === line ? "page" : undefined} className="pressable inline-flex min-h-11 items-center gap-2 border-b-2 border-transparent px-1 aria-[current=page]:border-ink">
                <LineRoundel line={id} />
                {/^[1-9]$/.test(id) && <span className="text-label">{lineName(id)}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <header className="mt-12 flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
        <h1 className="text-h1 flex items-center gap-3"><LineRoundel line={line} size="L" />{lineName(line)}</h1>
        <p className="text-body max-w-lg text-ink-2">{lineName(line)} 관련 기사 {articles.length}편입니다. 최신 게시일순이며, 인접 역 순서나 전체 노선도를 뜻하지 않습니다.</p>
      </header>
      <section aria-labelledby="questions" className="mt-12 xl:mt-16">
        <h2 id="questions" className="text-label mb-6">이 노선의 기사</h2>
        <ol className="xl:grid xl:grid-cols-3 xl:gap-6">
          {articles.map((entry) => (
            <li key={entry.href} className="relative pb-8 pl-10 xl:pt-12 xl:pl-0">
              <span aria-hidden="true" className={`absolute top-0 bottom-0 left-3 w-2 xl:right-0 xl:bottom-auto xl:left-0 xl:h-3 xl:w-full ${LINE_BG[line]}`} />
              <span aria-hidden="true" className="absolute top-5 left-1 size-6 rounded-full border-3 border-ink bg-plate xl:top-0 xl:left-5" />
              <Link href={entry.href} className={`pressable block min-h-11 border-b border-rule pb-6 xl:h-full xl:rounded-xl xl:border-t-2 xl:border-b-0 xl:bg-plate xl:p-6 xl:text-plate-ink xl:active:text-ink ${LINE_BORDER[line]}`}>
                <span className="flex flex-wrap items-center gap-3"><strong className="text-h2">{entry.place ?? lineName(line)}</strong><span className="flex flex-wrap items-center gap-1"><span className="sr-only">함께 다루는 노선:</span>{entry.lines.filter(id => id !== line).map(id => <LineRoundel key={id} line={id} size="S" />)}</span></span>
                <span className="text-lead mt-3 block">{entry.title}</span>
                <span className="mt-2 block text-sm">읽는 데 약 {entry.minutes}분</span>
                <span className="text-label mt-4 inline-flex min-h-11 items-center underline underline-offset-4">답 읽기 →</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <Link href="/articles/" className="pressable text-label mt-8 flex min-h-11 items-center justify-between border-y border-ink py-3">전체 기사 보기 <span aria-hidden="true">→</span></Link>
    </div>
  );
}
