import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/JsonLd";
import { stationPath, stations } from "@/content/stations";
import { aboutJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

const title = "소개·출처 정책";
const description = `${site.name}은 서울 지하철 역 구조를 공식 숫자와 출처로 설명하는 웹 매거진입니다. 운영자, 출처·정정 정책, AI 사용 범위, 연락처를 적습니다.`;

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/about/", types: { "application/rss+xml": "/rss.xml" } },
  openGraph: { title, description, url: "/about/", type: "website", locale: "ko_KR", siteName: site.name },
};

const sections = [
  ["author", "만드는 사람"],
  ["sources-policy", "출처 정책"],
  ["corrections", "정정 정책"],
  ["ai", "AI 사용 범위"],
  ["privacy", "방문 통계"],
  ["contact", "연락처"],
  ["articles", "지금까지의 질문"],
] as const;

// 신뢰 신호 페이지(SEO·GEO 규칙 18). 운영 주체·출처 정책·정정 정책·AI 사용 범위·연락처.
export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd()} />
      <article className="page-wrap py-8 text-body md:py-12 xl:py-16">
        <header className="page-grid items-end border-b-2 border-ink pb-8 md:pb-12">
          <h1 className="col-span-4 text-h1 md:col-span-8 xl:col-span-8">{site.name} 소개</h1>
          <p className="col-span-4 mt-4 text-ink-2 md:col-span-6 xl:col-span-4 xl:mt-0">
            {site.name}은 매일 지나는 서울 지하철 역이 왜 그런 구조가 됐는지를 공식 숫자와 출처로 설명하는 웹 매거진입니다. 인스타그램{" "}
            <a href={site.instagram} rel="noopener" className="inline-flex min-h-11 min-w-11 max-w-full items-center break-all underline underline-offset-4">
              {site.instagramHandle}
            </a>
            의 릴스와 짝을 이룹니다.
          </p>
        </header>

        <div className="page-grid pt-8 md:pt-12">
          <nav aria-label="소개 목차" className="col-span-4 mb-12 md:col-span-8 xl:col-span-3 xl:mb-0">
            <ul className="flex flex-wrap gap-x-6 xl:sticky xl:top-6 xl:block xl:border-t xl:border-ink">
              {sections.map(([id, label]) => (
                <li key={id} className="xl:border-b xl:border-rule">
                  <a href={`#${id}`} className="inline-flex min-h-11 min-w-11 items-center text-label underline underline-offset-4 xl:flex xl:py-3 xl:no-underline">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="col-span-4 min-w-0 space-y-16 md:col-span-6 md:col-start-2 md:space-y-24 xl:col-span-7 xl:col-start-5">
            <section aria-labelledby="author">
              <h2 id="author" className="scroll-mt-20 text-h2">
                만드는 사람
              </h2>
              <p className="mt-4 text-ink-2">
                <strong>{site.author.name}</strong>. {site.author.bio}
              </p>
            </section>

            {/* 제작 공정(도구·절차·데이터 처리 방법)은 공개하지 않는다. 신뢰 신호로 원칙만 둔다(사용자 결정 2026-10-30). */}
            <section aria-labelledby="sources-policy" className="border-t-2 border-ink pt-6">
              <h2 id="sources-policy" className="scroll-mt-20 text-h2">
                출처 정책
              </h2>
              <ul className="mt-4 list-disc space-y-4 pl-5 text-ink-2">
                <li>숫자는 공식 자료를 우선하고, 공식 자료가 없는 설명은 출처를 밝혀 씁니다.</li>
                <li>모든 숫자에 기준일을 붙이고, 기사 하단에 기관·자료명·기준일·URL을 전부 적습니다.</li>
                <li>출처가 붙은 숫자 카드 세 개를 갖추지 못한 기사는 발행하지 않습니다.</li>
                <li>공식 자료가 갱신되면 숫자를 고치고 기사의 갱신일을 올립니다. 내용이 바뀌지 않으면 날짜만 바꾸지 않습니다.</li>
              </ul>
            </section>

            <section aria-labelledby="corrections" className="border-t-2 border-ink pt-6">
              <h2 id="corrections" className="scroll-mt-20 text-h2">
                정정 정책
              </h2>
              <p className="mt-4 text-ink-2">
                숫자나 사실이 틀렸다면{" "}
                <a href={`mailto:${site.email}`} className="inline-flex min-h-11 min-w-11 max-w-full items-center break-all underline underline-offset-4">
                  {site.email}
                </a>
                로 알려 주세요. 확인되면 본문을 고치고, 기사 하단 &quot;정정 기록&quot;에 날짜·이전 값·새 값·사유를 남깁니다.
              </p>
            </section>

            <section aria-labelledby="ai" className="border-t-2 border-ink pt-6">
              <h2 id="ai" className="scroll-mt-20 text-h2">
                AI 사용 범위
              </h2>
              <dl className="mt-4 grid bg-plate text-plate-ink md:grid-cols-2">
                <div className="p-6">
                  <dt className="text-label">AI로 만드는 부분</dt>
                  <dd className="mt-3">3D 단면 이미지·영상 클립과 릴스 썸네일 배경은 공개자료를 바탕으로 AI로 생성한 참고 시각화이며, 실제 구조·치수와 다를 수 있습니다.</dd>
                </div>
                <div className="border-t border-rule p-6 md:border-t-0 md:border-l">
                  <dt className="text-label">사람이 쓰고 확인하는 부분</dt>
                  <dd className="mt-3">질문·답·숫자·출처는 사람이 쓰고 확인합니다.</dd>
                </div>
              </dl>
            </section>

            <section aria-labelledby="privacy" className="border-t-2 border-ink pt-6">
              <h2 id="privacy" className="scroll-mt-20 text-h2">
                방문 통계와 개인정보
              </h2>
              <p className="mt-4 text-ink-2">
                쿠키 없이 익명 방문 통계(Umami)를 셉니다. 개인정보는 수집하지 않습니다. 집계 범위는 페이지뷰, 유입 경로, 기기 종류, 다음 기사 클릭, 본문 끝 도달, 재방문, AI 링크 유입입니다. 재방문과 AI 링크 유입을 집계하기 위해 브라우저 저장소(localStorage·sessionStorage)에 첫 방문 시각, 유입 경로와 중복 집계 방지 표시를 저장하며, 브라우저 설정에서 지울 수 있습니다.
              </p>
            </section>

            <section aria-labelledby="contact" className="border-t-2 border-ink pt-6">
              <h2 id="contact" className="scroll-mt-20 text-h2">
                연락·제작 문의
              </h2>
              <p className="mt-4 text-ink-2">
                역 한 곳의 해부 기사와 릴스를 함께 제작합니다. 이메일{" "}
                <a href={`mailto:${site.email}`} className="inline-flex min-h-11 min-w-11 max-w-full items-center break-all underline underline-offset-4">
                  {site.email}
                </a>{" "}
                또는 인스타그램 DM으로 문의해 주세요.
              </p>
              <div className="mt-4 flex flex-col gap-3 md:flex-row md:flex-wrap">
                <Button asChild className="max-w-full break-all"><a href={`mailto:${site.email}`}>
                  {site.email}
                </a></Button>
                <Button asChild variant="outline"><a href={site.instagram} rel="noopener">
                  인스타그램 {site.instagramHandle} ↗
                </a></Button>
              </div>
            </section>

            <section aria-labelledby="articles" className="border-t-2 border-ink pt-6">
              <h2 id="articles" className="scroll-mt-20 text-h2">
                지금까지의 질문
              </h2>
              <ul className="mt-4 list-disc space-y-4 pl-5 text-ink-2">
                {stations.map((s) => (
                  <li key={s.slug}>
                    <Link href={stationPath(s)} className="inline-flex min-h-11 min-w-11 max-w-full items-center break-keep underline underline-offset-4">
                      {s.question}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </article>
    </>
  );
}
