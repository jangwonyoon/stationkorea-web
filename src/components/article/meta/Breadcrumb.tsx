import { Fragment } from "react";
import { Breadcrumb as BreadcrumbNav, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import Link from "next/link";

/** JSON-LD BreadcrumbList와 같은 이름·순서·URL을 전달한다. 미개설 노선은 href를 생략한다. */
export function Breadcrumb({ items }: { items: readonly { name: string; href?: string }[] }) {
  return (
    <BreadcrumbNav aria-label="현재 위치" className="text-caption">
      <BreadcrumbList className="flex flex-wrap items-center gap-x-2 gap-y-0 text-caption sm:gap-x-2 sm:gap-y-0">
        {items.map((item, index) => (
          <Fragment key={`${index}-${item.name}`}>
            {index > 0 && <BreadcrumbSeparator>/</BreadcrumbSeparator>}
            <BreadcrumbItem className="flex items-center gap-2">
              {index === items.length - 1 ? <BreadcrumbPage className="text-ink-3">{item.name}</BreadcrumbPage> : item.href ? (
                <BreadcrumbLink asChild><Link href={item.href} className="inline-flex min-h-11 min-w-11 items-center underline-offset-2 hover:underline">{item.name}</Link></BreadcrumbLink>
              ) : <span>{item.name}</span>}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
}
