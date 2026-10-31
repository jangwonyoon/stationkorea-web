import Link from "next/link";
import { site } from "@/lib/site";

// 푸터: 먹 바탕 반전. 링크는 모두 정적 <a>라 JS 없이 동작한다.
// 소개 페이지 안 앵커(#sources-policy·#privacy)는 src/app/about/page.tsx의 id를 따른다.
const linkClass =
  "inline-flex min-h-11 min-w-11 items-center text-label text-ground underline underline-offset-4 focus-visible:outline-ground";

export function SiteFooter() {
  return (
    <footer className="mt-16 bg-ink text-ground">
      <div className="page-wrap py-12">
        <p className="font-serif text-lg font-bold">{site.name}</p>
        <p className="mt-2 text-body">{site.description}</p>

        <nav aria-label="사이트 정보" className="mt-6 border-t border-ground pt-4">
          <ul className="grid grid-cols-2 gap-x-6 md:flex md:flex-wrap md:gap-x-8">
            <li>
              <Link href="/about/" className={linkClass}>
                소개
              </Link>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                문의·정정 요청
              </a>
            </li>
            <li>
              <Link href="/about/#sources-policy" className={linkClass}>
                출처
              </Link>
            </li>
            <li>
              <Link href="/about/#corrections" className={linkClass}>
                정정 정책
              </Link>
            </li>
            <li>
              <a href={site.instagram} rel="noopener" className={linkClass}>
                {site.instagramHandle}
              </a>
            </li>
          </ul>
        </nav>

        <dl className="mt-6 grid gap-4 text-label">
          <div className="grid gap-1 md:flex md:items-baseline md:gap-6">
            <dt className="md:w-20 md:shrink-0">문의</dt>
            <dd className="min-w-0 text-sm font-normal leading-relaxed">
              <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all underline underline-offset-4 focus-visible:outline-ground">
                {site.email}
              </a>
            </dd>
          </div>
          <div className="grid gap-1 md:flex md:items-baseline md:gap-6">
            <dt className="md:w-20 md:shrink-0">방문 통계</dt>
            <dd className="min-w-0 text-sm font-normal leading-relaxed break-keep">
              쿠키 없이 익명 방문 통계(Umami)를 셉니다. 개인정보는 수집하지 않습니다.{" "}
              <Link href="/about/#privacy" className={linkClass}>
                자세히
              </Link>
            </dd>
          </div>
        </dl>
      </div>
    </footer>
  );
}
