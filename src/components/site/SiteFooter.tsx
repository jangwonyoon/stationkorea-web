import Link from "next/link";
import { site } from "@/lib/site";

const linkClass = "inline-flex min-h-11 items-center text-sm font-semibold underline underline-offset-4 focus-visible:outline-on-footer";

export function SiteFooter() {
  return (
    <footer className="mt-12 bg-footer text-on-footer">
      <div className="page-wrap grid gap-6 py-8 md:grid-cols-4 md:gap-x-8">
        <div>
          <p className="brand-wordmark">{site.name}</p>
          <p className="mt-2 text-sm leading-relaxed break-keep">{site.description}</p>
        </div>
        <nav aria-labelledby="footer-browse">
          <h2 id="footer-browse" className="text-xs font-bold text-footer-muted">둘러보기</h2>
          <ul className="mt-1 grid grid-cols-2 gap-x-4 md:grid-cols-1">
            <li><Link href="/articles/" className={linkClass}>기사</Link></li>
            <li><Link href="/line/" className={linkClass}>노선</Link></li>
            <li><Link href="/about/" className={linkClass}>소개</Link></li>
          </ul>
        </nav>
        <nav aria-labelledby="footer-policies">
          <h2 id="footer-policies" className="text-xs font-bold text-footer-muted">원칙과 문의</h2>
          <ul className="mt-1 grid grid-cols-2 gap-x-4 md:grid-cols-1">
            <li><Link href="/about/#sources-policy" className={linkClass}>출처 원칙</Link></li>
            <li><Link href="/about/#corrections" className={linkClass}>정정 정책</Link></li>
            <li><a href={`mailto:${site.email}`} className={linkClass}>문의·정정 요청</a></li>
          </ul>
        </nav>
        <div>
          <h2 className="text-xs font-bold text-footer-muted">영상 채널</h2>
          <a href={site.instagram} className={`${linkClass} mt-1`}>영상으로 만나는 {site.channelName} <span aria-hidden="true" className="ml-1">↗</span></a>
          <p className="text-xs leading-relaxed text-footer-muted">인스타그램 {site.instagramHandle}</p>
        </div>
        <div className="border-t border-footer-muted pt-4 text-xs leading-relaxed text-footer-muted md:col-span-4">
          <p>문의 <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center break-all underline underline-offset-4 focus-visible:outline-on-footer">{site.email}</a></p>
          <p>쿠키 없이 익명 방문 통계(Umami)를 셉니다. 개인정보는 수집하지 않습니다.{" "}<Link href="/about/#privacy" className="inline-flex min-h-11 items-center underline underline-offset-4 focus-visible:outline-on-footer">자세히</Link></p>
        </div>
      </div>
    </footer>
  );
}
