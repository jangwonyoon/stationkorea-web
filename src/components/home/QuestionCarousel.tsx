"use client";

import { Children, useEffect, useId, useState, type ReactNode } from "react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";

/** Server-rendered list items keep every question link available without JavaScript. */
export function QuestionCarousel({ children }: { children: ReactNode }) {
  const count = Children.count(children);
  const id = useId();
  const [api, setApi] = useState<CarouselApi>();
  const [visible, setVisible] = useState<number[]>([]);

  useEffect(() => {
    if (!api) return;
    const update = () => setVisible(api.slidesInView());
    update();
    api.on("select", update).on("slidesInView", update).on("reInit", update);
    return () => { api.off("select", update).off("slidesInView", update).off("reInit", update); };
  }, [api]);

  if (!count) return null;
  const first = (visible[0] ?? 0) + 1;
  const last = (visible.at(-1) ?? 0) + 1;
  const overflow = api && api.scrollSnapList().length > 1;

  return (
    <Carousel
      className="mt-3"
      aria-label="최신 질문 캐러셀"
      aria-roledescription="캐러셀"
      setApi={setApi}
      opts={{
        align: "start", loop: false, duration: 0,
        watchFocus: (carousel, event) => {
          const index = carousel.slideNodes().findIndex((slide) => slide.contains(event.target as Node));
          carousel.rootNode().scrollLeft = 0;
          if (index >= 0) carousel.scrollTo(index, true);
          return false;
        },
      }}
    >
      <CarouselContent asChild>
        <ul id={id}>
          {Children.map(children, (child) => <CarouselItem asChild className="question-slide">{child}</CarouselItem>)}
        </ul>
      </CarouselContent>
      <span className="sr-only" aria-live="polite" aria-atomic="true">
        {api ? `${count}개 중 ${first}번부터 ${last}번 질문` : ""}
      </span>
      {overflow && (
        <div className="mt-2 flex items-center justify-end gap-2 text-ink">
          <span className="mr-2 text-caption" aria-live="off">{first === last ? first : `${first}–${last}`} / {count}</span>
          <CarouselPrevious aria-controls={id} />
          <CarouselNext aria-controls={id} />
        </div>
      )}
    </Carousel>
  );
}
