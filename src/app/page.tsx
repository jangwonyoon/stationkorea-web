import Image from "next/image";
import Link from "next/link";
import { publishedLines } from "@/app/line/data";
import { ArticleCards } from "@/components/articles/ArticleCards";
import { ArticlePlace } from "@/components/articles/ArticlePlace";
import { articleEntries, sectionLinks } from "@/lib/article-index";
import { sections, sectionPath } from "@/content/sections";
import { JsonLd } from "@/components/JsonLd";
import { LineRoundel } from "@/components/line";
import { homeJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export default function Home() {
  const cover = articleEntries.find(entry => entry.href === "/article/seongsu-branch/") ?? articleEntries[0];
  const recent = articleEntries.filter(entry => entry.href !== cover?.href).slice(0, 4);
  const visible = cover ? [cover, ...recent] : recent;
  const browse = [
    { name: "전체 기사", description: "발행 순서대로 모두 보기", count: articleEntries.length, href: "/articles/" },
    ...sectionLinks.map(section => ({ ...section, href: sectionPath(section.id) })),
  ];

  return (
    <>
      <JsonLd data={homeJsonLd(visible.map(entry => ({ name: entry.title, url: entry.href })))} />
      <div className="page-wrap py-6 md:py-9 lg:py-12">
        <header className="grid gap-3 border-b-2 border-ink pb-6 md:grid-cols-2 md:items-end md:gap-10 lg:gap-16">
          <h1 className="font-serif text-2xl font-bold leading-snug break-keep md:text-3xl lg:text-4xl">{site.tagline}</h1>
          <p className="text-base leading-relaxed text-ink-2 lg:text-lg">{site.description}</p>
        </header>

        {cover && <section aria-labelledby="cover-question" className="mt-4">
          <Link href={cover.href} className="pressable group block rounded-xl border border-rule p-5 hover:border-ink hover:bg-slab md:px-7 md:py-8 lg:px-9">
            <div className="grid gap-5 md:grid-cols-2 md:items-center md:gap-10 lg:gap-14">
              <div className="min-w-0">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-3"><span className="font-semibold text-ink">대표 기사</span><span>#{sections.find(section => section.id === cover.section)?.name}</span>{cover.series && <span className="rounded-xs border border-ink px-1.5 font-semibold text-ink">{cover.series.title}</span>}<span>읽는 데 약 {cover.minutes}분</span></p>
                {cover.series && <p className="mt-2 text-sm leading-relaxed text-ink-2">{cover.series.description}</p>}
                {(cover.place || cover.lines.length > 0) && <div className="mt-4"><ArticlePlace entry={cover} size="M" /></div>}
                <h2 id="cover-question" className="mt-4 text-h1 break-keep underline-offset-4 group-hover:underline">{cover.title}</h2>
              </div>
              <div className="min-w-0">
                <p className="text-body text-ink-2">{cover.answer}</p>
                <span className="mt-5 flex min-h-11 items-center justify-between gap-3 border-t border-rule pt-3 text-label">기사 읽기 <span aria-hidden="true">→</span></span>
                {cover.image && <figure className="mt-5">
                  <div className={`relative mx-auto w-full overflow-hidden rounded-lg bg-slab ${cover.image.kind === "reel-cover" ? "aspect-9/16 max-w-56" : "aspect-4/5 max-w-xs"}`}>
                    <Image src={cover.image.src} alt={cover.image.alt} fill priority sizes={cover.image.kind === "reel-cover" ? "224px" : "(min-width: 768px) 320px, calc(100vw - 82px)"} className="object-contain" />
                  </div>
                  <figcaption className="mt-2 text-caption">{cover.image.caption}{cover.image.kind === "cross-section" ? " AI 시각화 참고 이미지." : ""}</figcaption>
                </figure>}
              </div>
            </div>
          </Link>
        </section>}

        <section id="new-articles" aria-labelledby="all" className="mt-12 scroll-mt-16">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 border-b-2 border-ink pb-3">
            <h2 id="all" className="scroll-mt-16 text-h2">최근 기사</h2>
            <Link href="/articles/" className="inline-flex min-h-11 items-center text-label underline underline-offset-4">전체 기사 {articleEntries.length}편 <span aria-hidden="true" className="ml-2">→</span></Link>
          </div>
          <ArticleCards entries={recent} variant="recent" />
        </section>

        <section aria-labelledby="browse-title" className="mt-12">
          <h2 id="browse-title" className="border-b-2 border-ink pb-3 text-h2">기사 둘러보기</h2>
          <nav aria-label="매거진 섹션" className="mt-3">
            <ul className="grid md:grid-cols-2 md:gap-5 lg:grid-cols-5">
              {browse.map(section => {
                const content = <><span className="font-semibold md:text-lg">{section.name}</span><span className="text-sm text-ink-3 md:mt-2">{section.description}</span><span className="ml-auto text-label md:mt-auto md:ml-0 md:pt-6">{section.count ? `${section.count}편 →` : "준비 중"}</span></>;
                return <li key={section.href} className={`min-w-0 ${section.href === "/articles/" ? "md:col-span-2 lg:col-span-1" : ""}`}>
                  {section.count ? <Link href={section.href} className="pressable flex h-full flex-wrap items-center gap-x-3 gap-y-1 border-b border-rule py-4 hover:bg-slab md:flex-col md:items-start md:border-t-2 md:border-b-0 md:border-t-ink">{content}</Link> : <span aria-disabled="true" className="flex h-full flex-wrap items-center gap-x-3 gap-y-1 border-b border-rule py-4 text-ink-3 md:flex-col md:items-start md:border-t md:border-b-0 md:border-dashed">{content}</span>}
                </li>;
              })}
            </ul>
          </nav>
        </section>

        <section aria-labelledby="lines" className="mt-12">
          <h2 id="lines" className="scroll-mt-16 border-b-2 border-ink pb-3 text-h2">노선으로 찾기</h2>
          <Link href="/line/" className="pressable mt-4 block rounded-xl border border-rule p-4 hover:border-ink hover:bg-slab">
            <span className="flex flex-wrap items-center gap-1.5">{publishedLines.map(line => <LineRoundel key={line} line={line} size="M" />)}</span>
            <span className="mt-3 flex flex-wrap items-center justify-between gap-3"><span className="text-sm text-ink-2">기사가 있는 노선 {publishedLines.length}개</span><span className="text-label">노선 목록 <span aria-hidden="true">→</span></span></span>
          </Link>
        </section>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          <section aria-labelledby="principles-title" className="rounded-xl bg-slab p-5 md:p-6">
            <p className="text-label text-ink-3">{site.name}</p>
            <h2 id="principles-title" className="mt-3 font-serif text-lg font-semibold leading-relaxed">숫자마다 출처와 기준일을 붙이고, 틀린 내용은 고친 날짜와 함께 바로잡습니다.</h2>
            <Link href="/about/#sources-policy" className="mt-3 inline-flex min-h-11 items-center text-label underline underline-offset-4">소개와 원칙 보기 <span aria-hidden="true" className="ml-2">→</span></Link>
          </section>
          <section aria-labelledby="channel-title" className="rounded-xl bg-slab p-5 md:p-6">
            <p className="text-label text-ink-3">영상 채널</p>
            <h2 id="channel-title" className="mt-3 font-serif text-lg font-semibold leading-relaxed">역과 길에 던지는 질문을 짧은 영상으로 만납니다.</h2>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex min-h-11 items-center text-label underline underline-offset-4">영상으로 만나는 {site.channelName} <span aria-hidden="true" className="ml-2">↗</span><span className="sr-only"> (새 창)</span></a>
          </section>
        </div>
      </div>
    </>
  );
}
