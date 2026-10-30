import type { ReactNode } from "react";
import Link from "next/link";
import { formatDate } from "@/components/SourceRefs";

export type BylineProps = {
  author: { name: string; path: string };
  /** ISO 날짜(Article datePublished와 같은 값). */
  published: string;
  /** ISO 날짜(Article dateModified와 같은 값). 게시일과 날짜가 같으면 "갱신" 행을 생략한다. */
  modified?: string;
  /** line = 첫 화면용 한 줄, table = 하단용 표. 둘 다 정의 목록(dl)이다. */
  layout?: "line" | "table";
};

/**
 * 바이라인(SEO·GEO 규칙 6·18). "글 A · 게시 B · 갱신 C" 같은 점 나열 대신 정의 목록으로 이름과 값을 짝짓는다.
 * 날짜는 <time dateTime>으로 JSON-LD의 datePublished·dateModified와 같은 값을 쓴다.
 */
export function Byline({ author, published, modified, layout = "line" }: BylineProps) {
  const rows: { term: string; value: ReactNode }[] = [
    {
      term: "글",
      value: (
        <Link href={author.path} rel="author" className="font-semibold text-ink underline-offset-2 hover:underline">
          {author.name}
        </Link>
      ),
    },
    { term: "게시", value: <time dateTime={published}>{formatDate(published)}</time> },
  ];
  if (modified && modified.slice(0, 10) !== published.slice(0, 10)) {
    rows.push({ term: "갱신", value: <time dateTime={modified}>{formatDate(modified)}</time> });
  }

  if (layout === "table") {
    return (
      <dl className="flex flex-col gap-2 text-caption">
        {rows.map((r) => (
          <div key={r.term} className="flex gap-6">
            <dt className="w-10 shrink-0">{r.term}</dt>
            <dd className="text-ink">{r.value}</dd>
          </div>
        ))}
      </dl>
    );
  }

  return (
    <dl className="flex flex-wrap gap-x-4 gap-y-1 text-caption">
      {rows.map((r) => (
        <div key={r.term} className="flex gap-1">
          <dt>{r.term}</dt>
          <dd>{r.value}</dd>
        </div>
      ))}
    </dl>
  );
}
