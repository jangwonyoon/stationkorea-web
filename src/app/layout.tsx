import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { hahmlet, plexSansKr } from "./fonts";
import { Analytics } from "@/components/Analytics";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — 길과 동네를 읽는 웹매거진`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/", types: { "application/rss+xml": "/rss.xml" } },
  openGraph: { type: "website", locale: "ko_KR", siteName: site.name, url: "/" },
  // 네이버 서치어드바이저 소유 확인(메타 태그 방식, 2026-10-29 확인). 지우면 소유 확인이 풀린다.
  // Vercel은 public/*.html을 확장자 없는 경로로 내보내므로 HTML 파일 방식은 쓰지 않는다. Google·Bing은 DNS·GSC 가져오기로 확인했다.
  verification: { other: { "naver-site-verification": "d19249b28a182b5efb8ef5c7c5ba514253b9d0e1" } },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko" className={`${hahmlet.variable} ${plexSansKr.variable}`}>
      <body className="antialiased">
        <SiteHeader />
        <main>{children}</main>
        {/* Umami(쿠키리스). data-domains로 production 도메인에서만 집계한다. */}
        <Script
          src="https://cloud.umami.is/script.js"
          data-website-id={site.umamiWebsiteId}
          data-domains="www.stationkorea.com"
          strategy="afterInteractive"
        />
        <Analytics />
        <SiteFooter />
      </body>
    </html>
  );
}
