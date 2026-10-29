import type { Metadata, Viewport } from "next";
import Link from "next/link";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — 서울 지하철 역, 왜 이렇게 생겼을까`, template: `%s | ${site.name}` },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "ko_KR", siteName: site.name, url: "/" },
};

export const viewport: Viewport = { width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ko">
      <body className="antialiased">
        <header className="border-b border-neutral-200">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
            <Link href="/" className="font-bold">
              {site.name}
            </Link>
            <a href={site.instagram} rel="noopener" className="text-sm text-neutral-600 hover:underline">
              인스타그램 {site.instagramHandle}
            </a>
          </div>
        </header>
        <main>{children}</main>
        <footer className="mt-16 border-t border-neutral-200">
          <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-neutral-500 break-keep">
            <p>숫자마다 기관·자료명·기준일을 출처로 적습니다. {site.aiNotice}</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
