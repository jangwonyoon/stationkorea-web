import Link from "next/link";

/** JSON-LD BreadcrumbList와 같은 이름·순서·URL을 전달한다. 미개설 노선은 href를 생략한다. */
export function Breadcrumb({ items }: { items: readonly { name: string; href?: string }[] }) {
  return (
    <nav aria-label="현재 위치" className="text-caption">
      <ol className="flex flex-wrap items-center gap-x-2">
        {items.map((item, index) => (
          <li key={`${index}-${item.name}`} className="flex items-center gap-2">
            {index > 0 && <span aria-hidden="true">/</span>}
            {index === items.length - 1 ? <span aria-current="page">{item.name}</span> : item.href ? (
              <Link href={item.href} className="inline-flex min-h-11 items-center underline-offset-2 hover:underline">{item.name}</Link>
            ) : <span>{item.name}</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
