"use client";

import { useEffect } from "react";

const motionQuery = "(min-width: 1024px) and (min-height: 720px) and (prefers-reduced-motion: no-preference)";

/** The HTML and illustrations remain static until this optional enhancement is ready. */
export function TransitMotion() {
  useEffect(() => {
    const rail = document.querySelector<HTMLElement>('[data-transit-scene="rail"]');
    const network = document.querySelector<HTMLElement>('[data-transit-scene="network"]');
    const train = rail?.querySelector<HTMLElement>('[data-transit-motion="train"]');
    const bus = network?.querySelector<HTMLElement>('[data-transit-motion="bus"]');
    const map = network?.querySelector<HTMLElement>('[data-transit-motion="map"]');
    if (!rail || !network || !train || !bus || !map || !("IntersectionObserver" in window)) return;

    const configurations = [
      { element: train, target: rail, frames: ["translateX(-22%)", "translateX(-13%)", "translateX(2%)", "translateX(8%)"], times: [0, 0.35, 0.8, 1] },
      { element: bus, target: network, frames: ["translateX(-12%)", "translateX(0%)", "translateX(12%)", "translateX(16%)"], times: [0, 0.4, 0.85, 1] },
      { element: map, target: network, frames: ["translateY(32px)", "translateY(0px)", "translateY(-16px)"], times: [0, 0.45, 1] },
    ];

    const media = window.matchMedia(motionQuery);
    let generation = 0;
    let observer: IntersectionObserver | undefined;
    let disposeAnimations: (() => void) | undefined;

    function reset() {
      generation += 1;
      observer?.disconnect();
      observer = undefined;
      disposeAnimations?.();
      disposeAnimations = undefined;
    }

    function configure() {
      reset();
      if (!media.matches) return;
      const currentGeneration = generation;
      observer = new IntersectionObserver((entries) => {
        if (!entries.some((entry) => entry.isIntersecting)) return;
        observer?.disconnect();
        observer = undefined;
        void import("motion").then(({ animate, scroll }) => {
          if (currentGeneration !== generation || !media.matches) return;
          const disposers: (() => void)[] = [];
          disposeAnimations = () => disposers.forEach((dispose) => dispose());
          for (const { element, target, frames, times } of configurations) {
            const animation = animate(element, { transform: frames }, { duration: 1, times, ease: "linear", autoplay: false });
            let stopScroll = () => {};
            disposers.push(() => {
              stopScroll();
              animation.cancel();
              element.style.removeProperty("transform");
            });
            stopScroll = scroll(animation, { target, offset: ["start end", "end start"] });
          }
        }).catch(() => {
          // A failed optional chunk leaves the complete server-rendered scene usable.
          if (currentGeneration === generation) {
            disposeAnimations?.();
            disposeAnimations = undefined;
          }
        });
      }, { rootMargin: "300px 0px" });
      observer.observe(rail!);
      observer.observe(network!);
    }

    configure();
    media.addEventListener("change", configure);
    return () => {
      media.removeEventListener("change", configure);
      reset();
    };
  }, []);

  return null;
}
