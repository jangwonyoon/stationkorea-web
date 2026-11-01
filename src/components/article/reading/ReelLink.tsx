import Image from "next/image";
import { formatDate } from "@/components/SourceRefs";
import type { Station } from "@/content/types";

export type ReelLinkProps = { reel: Station["reel"]; title: string };

export function ReelLink({ reel, title }: ReelLinkProps) {
  return (
    <div className="flex flex-col gap-3">
      {reel.notice && (
        <p className="border-l-2 border-line-2 bg-plate px-4 py-3 text-sm leading-6 text-plate-ink">
          {reel.notice}{" "}
          <a href="#corrections-heading" className="font-semibold underline underline-offset-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-line-2">정정 기록 읽기 ↓</a>
        </p>
      )}
      <a href={reel.url} rel="noopener noreferrer" className="pressable flex min-h-11 items-center gap-4 rounded-xl border border-rule bg-plate p-3 text-plate-ink active:text-ink">
        <Image src={reel.thumbnail} alt={`${title} 릴스 썸네일`} width={90} height={160} loading="lazy" className="h-40 w-auto shrink-0 rounded-lg object-cover" />
        <span className="min-w-0">
          <span className="block text-label">릴스 보기</span>
          <span className="mt-2 block text-body break-words">{title}</span>
          <time dateTime={reel.postedAt} className="mt-2 block text-sm">{formatDate(reel.postedAt)} 게시</time>
          <span className="mt-3 block text-label underline underline-offset-2">인스타그램에서 보기 ↗</span>
        </span>
      </a>
    </div>
  );
}
