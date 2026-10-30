import type { Station } from "@/content/types";
import { formatDate } from "@/components/SourceRefs";
import { site } from "@/lib/site";

export function Corrections({ items = [] }: { items?: Station["corrections"] }) {
  return (
    <section aria-labelledby="corrections-heading" className="border-t-2 border-ink pt-4">
      <h2 id="corrections-heading" className="text-h2">정정 기록</h2>
      {items.length > 0 ? (
        <table className="mt-4 w-full table-fixed text-left text-caption">
          <caption className="sr-only">날짜별 이전 값, 새 값, 정정 사유</caption>
          <thead><tr>{["날짜", "이전 값", "새 값", "사유"].map((label) => <th key={label} scope="col" className="border-b border-rule p-2 align-top font-semibold">{label}</th>)}</tr></thead>
          <tbody>{items.map((item, index) => (
            <tr key={`${item.date}-${index}`}>
              <td className="break-words border-b border-rule p-2 align-top"><time dateTime={item.date}>{formatDate(item.date)}</time></td>
              <td className="break-words border-b border-rule p-2 align-top">{item.before}</td>
              <td className="break-words border-b border-rule p-2 align-top">{item.after}</td>
              <td className="break-words border-b border-rule p-2 align-top">{item.reason}</td>
            </tr>
          ))}</tbody>
        </table>
      ) : <p className="mt-4 text-caption">정정 기록 없음. 이 글은 게시 후 고친 내용이 없습니다.</p>}
      <p className="mt-3 text-caption">틀린 숫자나 빠진 사실은 <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center underline underline-offset-2">정정 요청 메일</a>로 보내 주세요.</p>
    </section>
  );
}
