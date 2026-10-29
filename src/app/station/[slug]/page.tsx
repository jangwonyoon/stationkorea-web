import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/JsonLd";
import { formatDate, SourceRefs, withTopic } from "@/components/SourceRefs";
import { getNextStation, getStation, stationPath, stations } from "@/content/stations";
import { stationJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return stations.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const s = getStation((await params).slug);
  if (!s) return {};
  const path = stationPath(s);
  return {
    title: s.seoTitle,
    description: s.answer,
    keywords: [s.name, ...s.lines, `${s.name} 환승`, "서울 지하철", "환승통로"],
    alternates: { canonical: path },
    openGraph: {
      type: "article",
      url: path,
      title: s.question,
      description: s.answer,
      publishedTime: s.datePublished,
      modifiedTime: s.dateModified,
      images: [{ url: s.ogImage, width: 1200, height: 630, alt: s.section.alt }],
    },
    twitter: { card: "summary_large_image", title: s.question, description: s.answer, images: [s.ogImage] },
  };
}

// 기사 템플릿(F안). 모바일 순서 ①~⑧은 order-*로, 데스크톱은 숫자·릴스·다음 기사를 오른쪽 열에 고정한다.
// DOM은 본문을 먼저 두어 크롤러와 스크린리더가 질문 → 답 → 본문 순으로 읽게 한다.
export default async function StationPage({ params }: Props) {
  const s = getStation((await params).slug);
  if (!s) notFound();
  const next = getNextStation(s.slug);
  const lineLabel = s.lines.join("·");

  return (
    <>
      <JsonLd data={stationJsonLd(s)} />
      <nav aria-label="현재 위치" className="mx-auto max-w-6xl px-4 pt-4 text-sm text-neutral-500">
        <ol className="flex gap-1">
          <li>
            <Link href="/" className="hover:underline">
              {site.name}
            </Link>
          </li>
          <li aria-hidden>›</li>
          <li aria-current="page">{s.name}</li>
        </ol>
      </nav>

      <article className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-6 lg:grid lg:grid-cols-[minmax(0,1fr)_20rem] lg:gap-x-12">
        {/* ① 눈썹 + 질문 제목 + 한 문장 답 */}
        <header className="order-1 lg:col-start-1">
          <p className="text-sm text-neutral-500">
            {site.name} · 역 해부 {String(s.no).padStart(2, "0")} · {lineLabel}
          </p>
          <h1 className="mt-2 text-[22px] font-bold leading-snug break-keep sm:text-3xl">{s.question}</h1>
          <p className="mt-4 text-lg leading-relaxed break-keep">{s.answer}</p>
          <p className="mt-3 text-xs text-neutral-500">
            <time dateTime={s.datePublished}>{formatDate(s.datePublished)}</time> 게시
            {s.dateModified !== s.datePublished && (
              <>
                {" "}
                · <time dateTime={s.dateModified}>{formatDate(s.dateModified)}</time> 숫자 갱신
              </>
            )}
          </p>
        </header>

        {/* ② 3D 단면 이미지(고정 비율로 레이아웃 이동 없음) */}
        <figure className="order-2 lg:col-start-1 lg:max-w-xl">
          <div className="relative aspect-[4/5] w-full overflow-hidden rounded-lg bg-neutral-100">
            <Image src={s.section.src} alt={s.section.alt} fill priority sizes="(min-width: 1024px) 36rem, 100vw" className="object-cover" />
          </div>
          <figcaption className="mt-2 text-sm text-neutral-600">
            {s.section.caption} <span className="text-neutral-500">AI 시각화 참고 이미지.</span>
          </figcaption>
        </figure>

        {/* ④ 하차 칸 한 줄 */}
        <section aria-labelledby="pin" className="order-4 rounded-lg border border-neutral-200 p-4 lg:col-start-1">
          <h2 id="pin" className="text-sm font-semibold">
            어디서 내리면 빠른가
          </h2>
          <p className="mt-1 leading-relaxed break-keep">
            {s.pin.text}
            <SourceRefs ids={s.pin.sourceIds} sources={s.sources} />
          </p>
        </section>

        {/* ⑥ Q&A — FAQPage 구조화 데이터와 1:1 */}
        <section aria-label="묻고 답하기" className="order-6 flex flex-col gap-8 lg:col-start-1">
          {s.qna.map((q, i) => (
            <section key={q.question} aria-labelledby={`q${i + 1}`}>
              <h2 id={`q${i + 1}`} className="text-xl font-bold leading-snug break-keep">
                {q.question}
              </h2>
              {q.answer.map((para, j) => (
                <p key={j} className="mt-3 leading-relaxed break-keep">
                  {para}
                  {j === q.answer.length - 1 && <SourceRefs ids={q.sourceIds} sources={s.sources} />}
                </p>
              ))}
            </section>
          ))}
        </section>

        {/* 최근 소식(/news/) — 비어 있으면 숨긴다 */}
        {s.news && s.news.length > 0 && (
          <section aria-labelledby="news" className="order-6 lg:col-start-1">
            <h2 id="news" className="text-lg font-bold">
              최근 소식
            </h2>
            <ul className="mt-2 list-disc pl-5">
              {s.news.map((n) => (
                <li key={n.href}>
                  <Link href={n.href} className="underline">
                    {n.title}
                  </Link>{" "}
                  <time dateTime={n.date} className="text-sm text-neutral-500">
                    {formatDate(n.date)}
                  </time>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ⑧ 출처 전문 · 제작 문의 · AI 시각화 고지 (read_end 측정 지점) */}
        <footer id="sources" className="order-8 border-t border-neutral-200 pt-6 text-sm lg:col-start-1">
          <h2 className="text-base font-bold">출처</h2>
          <ol className="mt-3 flex list-decimal flex-col gap-2 pl-5">
            {s.sources.map((src) => (
              <li key={src.id} id={`src-${src.id}`} className="break-keep">
                {src.org}, {src.title}, {src.date}
                {src.url && (
                  <>
                    {". "}
                    <a href={src.url} rel="noopener" className="break-all text-neutral-600 underline">
                      {src.url}
                    </a>
                  </>
                )}
              </li>
            ))}
          </ol>
          <h2 className="mt-6 text-base font-bold">AI 시각화 고지</h2>
          <p className="mt-2 text-neutral-600 break-keep">{site.aiNotice}</p>
          <h2 className="mt-6 text-base font-bold">제작 문의</h2>
          <p className="mt-2 text-neutral-600 break-keep">
            역 한 곳의 해부 기사와 릴스를 함께 제작합니다. 인스타그램{" "}
            <a href={site.instagram} className="underline">
              {site.instagramHandle}
            </a>{" "}
            DM으로 문의해 주세요.
          </p>
        </footer>

        {/* 사이드: 모바일에서는 contents로 풀려 ③⑤⑦ 자리에 끼고, 데스크톱에서는 오른쪽에 고정된다 */}
        <aside className="contents lg:sticky lg:top-6 lg:col-start-2 lg:row-span-6 lg:row-start-1 lg:flex lg:flex-col lg:gap-6 lg:self-start">
          {/* ③ 숫자·출처 카드 3개 */}
          <section aria-labelledby="numbers" className="order-3">
            <h2 id="numbers" className="sr-only">
              숫자로 보는 {s.name}
            </h2>
            <table className="w-full border-separate border-spacing-y-3 text-left">
              <caption className="sr-only">
                {s.name} {lineLabel} 핵심 숫자와 기준일, 출처
              </caption>
              <thead className="sr-only">
                <tr>
                  <th scope="col">숫자</th>
                  <th scope="col">내용</th>
                  <th scope="col">기준일·출처</th>
                </tr>
              </thead>
              <tbody>
                {s.stats.map((st) => (
                  <tr key={st.value} className="flex flex-col rounded-lg border border-neutral-200 p-4">
                    <th scope="row" className="text-2xl font-bold">
                      {st.value}
                    </th>
                    <td className="mt-1 break-keep">{st.label}</td>
                    <td className="mt-2 text-xs text-neutral-500">
                      {st.asOf}
                      <SourceRefs ids={st.sourceIds} sources={s.sources} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* ⑤ 릴스 썸네일 + 인스타 링크(임베드 스크립트 없음) */}
          <section aria-labelledby="reel" className="order-5">
            <h2 id="reel" className="sr-only">
              릴스 영상
            </h2>
            <a href={s.reel.url} rel="noopener" className="flex items-center gap-4 rounded-lg border border-neutral-200 p-3 hover:bg-neutral-50">
              <Image src={s.reel.thumbnail} alt={`${s.name} 릴스 썸네일`} width={96} height={171} className="h-auto w-24 shrink-0 rounded" />
              <span>
                <span className="block font-semibold">1분 영상으로 보기</span>
                <span className="mt-1 block text-sm text-neutral-600">인스타그램 {site.instagramHandle} 릴스</span>
              </span>
            </a>
          </section>

          {/* ⑦ 다음 기사: 역 이름이 아니라 다음 질문 */}
          <section aria-labelledby="next" className="order-7">
            <h2 id="next" className="text-sm text-neutral-500">
              다음 질문
            </h2>
            <Link href={stationPath(next)} className="mt-2 block rounded-lg border border-neutral-900 p-4 hover:bg-neutral-50">
              <span className="block text-lg font-bold break-keep">
                그럼 {withTopic(next.name.replace(/역$/, ""))} 왜?
              </span>
              <span className="mt-1 block break-keep text-neutral-700">{next.teaser}</span>
            </Link>
          </section>
        </aside>
      </article>
    </>
  );
}
