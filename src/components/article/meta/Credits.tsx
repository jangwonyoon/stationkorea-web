import Link from "next/link";
import type { Station } from "@/content/types";
import { site } from "@/lib/site";
import { formatDate } from "@/components/SourceRefs";
import { computeCredits } from "./compute-credits";

export type CreditsProps = {
  station: Pick<Station, "sources" | "stats" | "datePublished" | "dateModified">;
  /** 기본값 site.author. */
  author?: { name: string; path: string };
};

/**
 * 히어로 아래 크레딧 3줄(숫자 출처 / 숫자 기준일 / 글) + 날짜, 위에 rule-2(2px 먹).
 * 기관 목록과 기준일 범위는 sources·stats에서 계산한다(computeCredits). 전문은 출처 목록(SourceList)으로 링크한다.
 */
export function Credits({ station, author = site.author }: CreditsProps) {
  const c = computeCredits(station);

  return (
    <div className="flex flex-col gap-3 border-t-2 border-ink pt-3">
      <dl className="flex flex-col gap-1 text-caption">
        <div className="flex items-center gap-3">
          <dt className="w-20 shrink-0">숫자 출처</dt>
          <dd className="text-ink-2">
            {c.shownOrgs.join(", ")}
            {c.restCount > 0 && (
              <>
                {" "}
                <a href="#sources" className="inline-flex min-h-11 min-w-11 items-center underline underline-offset-2">
                  외 {c.restCount}곳
                </a>
              </>
            )}
          </dd>
        </div>
        {c.asOf && (
          <div className="flex gap-3">
            <dt className="w-20 shrink-0">숫자 기준일</dt>
            <dd className="text-ink-2 tabular-nums">
              {c.asOf.from === c.asOf.to ? c.asOf.from : `${c.asOf.from} ~ ${c.asOf.to}`}
            </dd>
          </div>
        )}
        <div className="flex items-center gap-3">
          <dt className="w-20 shrink-0">글</dt>
          <dd>
            <Link href={author.path} rel="author" className="inline-flex min-h-11 min-w-11 items-center font-semibold text-ink underline-offset-2 hover:underline">
              {author.name}
            </Link>
          </dd>
        </div>
      </dl>
      <DateLine published={station.datePublished} modified={station.dateModified} />
    </div>
  );
}

/** 크레딧의 글 행을 반복하지 않고 게시·갱신 날짜만 표시한다. */
function DateLine({ published, modified }: { published: string; modified: string }) {
  return (
    <dl className="flex flex-wrap gap-x-4 gap-y-1 text-caption">
      <div className="flex gap-1"><dt>게시</dt><dd><time dateTime={published}>{formatDate(published)}</time></dd></div>
      {modified.slice(0, 10) !== published.slice(0, 10) && (
        <div className="flex gap-1"><dt>갱신</dt><dd><time dateTime={modified}>{formatDate(modified)}</time></dd></div>
      )}
    </dl>
  );
}
