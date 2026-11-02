import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/article/meta/Breadcrumb";
import { LineRoundel } from "@/components/line";
import { JsonLd } from "@/components/JsonLd";
import { lineName } from "@/content/lines";
import { stationPhotos } from "@/content/station-photos";
import { archiveJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";
import { publishedLines, linePath, lineArticles } from "./data";

const title = "노선으로 찾기";
const description = "기사가 있는 노선에서 역과 길, 동네의 이야기를 찾아보세요.";
export const metadata: Metadata = {
  title, description, alternates: { canonical: "/line/" },
  openGraph: { title, description, type: "website", url: "/line/", images: [stationPhotos["seongsu-branch"].src] },
};

export default function LinesPage() {
  return <div className="page-wrap py-8 md:py-12">
    <JsonLd data={archiveJsonLd(title, description, "/line/", publishedLines.map(id => ({ href: linePath(id), title: lineName(id) })))} />
    <Breadcrumb items={[{ name: site.name, href: "/" }, { name: "노선" }]} />
    <header className="mt-8 border-b-2 border-ink pb-6">
      <h1 className="text-h1">{title}</h1>
      <p className="mt-4 text-body text-ink-2">{description} 현재 {publishedLines.length}개 노선에 기사가 있습니다.</p>
    </header>
    <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {publishedLines.map(id => <li key={id}>
        <Link href={linePath(id)} className="pressable flex min-h-11 h-full flex-wrap items-center gap-3 rounded-xl border border-rule p-5 hover:bg-slab">
          <LineRoundel line={id} size="M" />
          <h2 className="text-label">{lineName(id)}</h2>
          <span className="ml-auto text-caption">기사 {lineArticles(id).length}편 <span aria-hidden="true">→</span></span>
        </Link>
      </li>)}
    </ul>
  </div>;
}
