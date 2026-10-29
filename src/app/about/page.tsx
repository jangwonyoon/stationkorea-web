import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { stationPath, stations } from "@/content/stations";
import { aboutJsonLd } from "@/lib/jsonld";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "소개·출처 정책",
  description: `${site.name}은 서울 지하철 역 구조를 공식 숫자와 출처로 설명하는 웹 매거진입니다. 운영자, 제작 방식, 출처·정정 정책, AI 사용 범위, 연락처를 적습니다.`,
  alternates: { canonical: "/about/", types: { "application/rss+xml": "/rss.xml" } },
};

// 신뢰 신호 페이지(SEO·GEO 규칙 18). 운영 주체·제작 방식·출처 정책·정정 정책·AI 사용 범위·연락처.
export default function AboutPage() {
  return (
    <>
      <JsonLd data={aboutJsonLd()} />
      <article className="mx-auto max-w-3xl px-4 py-8 leading-relaxed break-keep">
        <h1 className="text-2xl font-bold sm:text-3xl">{site.name} 소개</h1>
        <p className="mt-4 text-lg">
          {site.name}은 매일 지나는 서울 지하철 역이 왜 그런 구조가 됐는지를 공식 숫자와 출처로 설명하는 웹 매거진입니다. 인스타그램{" "}
          <a href={site.instagram} rel="noopener" className="underline">
            {site.instagramHandle}
          </a>
          의 릴스와 짝을 이룹니다.
        </p>

        <section aria-labelledby="author" className="mt-10">
          <h2 id="author" className="text-xl font-bold">
            만드는 사람
          </h2>
          <p className="mt-3">
            <strong>{site.author.name}</strong>. {site.author.bio}
          </p>
        </section>

        <section aria-labelledby="how" className="mt-10">
          <h2 id="how" className="text-xl font-bold">
            제작 방식
          </h2>
          <p className="mt-3">
            기사 하나는 질문 하나에 답합니다. 숫자는 서울교통공사·서울 열린데이터광장·공공데이터포털 같은 공식 자료를 우선합니다. 공식 자료가 없는 구조·역사 설명은 전문지·보도·백과 자료를 쓰고 그 출처를 그대로 밝힙니다. 한 곳에서만 확인한 수치는 반올림하거나 범위를 좁혀 씁니다.
          </p>
        </section>

        <section aria-labelledby="sources-policy" className="mt-10">
          <h2 id="sources-policy" className="text-xl font-bold">
            출처 정책
          </h2>
          <ul className="mt-3 list-disc pl-5">
            <li>모든 숫자에 기준일을 붙이고, 기사 하단에 기관·자료명·기준일·URL을 전부 적습니다.</li>
            <li>출처가 붙은 숫자 카드 세 개를 갖추지 못한 기사는 발행하지 않습니다.</li>
            <li>공식 자료가 갱신되면 숫자를 고치고 기사의 갱신일을 올립니다. 내용이 바뀌지 않으면 날짜만 바꾸지 않습니다.</li>
          </ul>
        </section>

        <section aria-labelledby="corrections" className="mt-10">
          <h2 id="corrections" className="text-xl font-bold">
            정정 정책
          </h2>
          <p className="mt-3">
            숫자나 사실이 틀렸다면{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>
            로 알려 주세요. 확인되면 본문을 고치고, 기사 하단 &quot;정정 기록&quot;에 날짜·이전 값·새 값·사유를 남깁니다.
          </p>
        </section>

        <section aria-labelledby="ai" className="mt-10">
          <h2 id="ai" className="text-xl font-bold">
            AI 사용 범위
          </h2>
          <p className="mt-3">
            3D 단면 이미지·영상 클립과 릴스 썸네일 배경은 공개자료를 바탕으로 AI로 생성한 참고 시각화이며, 실제 구조·치수와 다를 수 있습니다. 질문·답·숫자·출처는 사람이 쓰고 확인합니다.
          </p>
        </section>

        <section aria-labelledby="privacy" className="mt-10">
          <h2 id="privacy" className="text-xl font-bold">
            방문 통계와 개인정보
          </h2>
          <p className="mt-3">
            이 사이트는 쿠키를 쓰지 않는 Umami로 익명 방문 통계(페이지뷰, 유입 경로, 기기 종류, 다음 기사 클릭, 본문 끝 도달)를 셉니다. 이름·이메일 같은 개인 정보는 수집하지 않습니다. 재방문 여부를 알기 위해 브라우저 저장소(localStorage)에 첫 방문 시각과 유입 경로만 저장하며, 브라우저 설정에서 지울 수 있습니다.
          </p>
        </section>

        <section aria-labelledby="contact" className="mt-10">
          <h2 id="contact" className="text-xl font-bold">
            연락·제작 문의
          </h2>
          <p className="mt-3">
            역 한 곳의 해부 기사와 릴스를 함께 제작합니다. 이메일{" "}
            <a href={`mailto:${site.email}`} className="underline">
              {site.email}
            </a>{" "}
            또는 인스타그램 DM으로 문의해 주세요.
          </p>
        </section>

        <section aria-labelledby="articles" className="mt-10">
          <h2 id="articles" className="text-xl font-bold">
            지금까지의 질문
          </h2>
          <ul className="mt-3 list-disc pl-5">
            {stations.map((s) => (
              <li key={s.slug}>
                <Link href={stationPath(s)} className="underline">
                  {s.question}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </>
  );
}
