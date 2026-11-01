import type { ReactNode } from "react";

// 기존 노선색을 유지하면서 밝은 바탕에서도 경로의 경계가 구별되게 한다.
function RouteLines({ children, width = 12 }: { children: ReactNode; width?: number }) {
  return <>
    <g className="fill-none stroke-ink" strokeWidth={width + 3} strokeLinejoin="round">{children}</g>
    <g className="fill-none stroke-line-2" strokeWidth={width} strokeLinejoin="round">{children}</g>
  </>;
}

type SeongsuDiagramsProps = {
  kind: "seongsu-current" | "seongsu-history";
  descriptions: string[];
};

export function SeongsuDiagrams({ kind, descriptions }: SeongsuDiagramsProps) {
  if (kind === "seongsu-history") {
    return (
      <ol className="mt-5 space-y-4">
        {[1980, 1983, 1984].map((year, index) => (
          <li key={year} className="grid items-center gap-4 border border-rule p-4 lg:grid-cols-2 lg:gap-6 lg:p-5">
            <svg
              viewBox="0 0 360 260"
              aria-hidden="true"
              focusable="false"
              className="block h-auto w-full font-sans"
            >
              <RouteLines width={10}>
                {year === 1984 ? (
                  <rect x="42" y="48" width="180" height="176" rx="88" />
                ) : (
                  <path d="M222 136 V188 Q222 224 186 224 H124" />
                )}
                {year === 1983 && <path d="M222 136 V84 Q222 48 186 48 H124" />}
                <path d="M222 136 H310" />
              </RouteLines>
              {year === 1983 && <RouteLines width={10}><path d="M124 224 H36" strokeDasharray="8 8" /></RouteLines>}
              <path d="M310 121 V151" className="stroke-ink" strokeWidth="4" />
              <g className="fill-ground stroke-ink" strokeWidth="3">
                <circle cx="222" cy="136" r="9" />
                {year !== 1984 && <circle cx="124" cy="224" r="7" />}
                {year === 1983 && <circle cx="124" cy="48" r="7" />}
              </g>
              <g className="fill-ink text-lg font-medium">
                <text x="310" y="178" textAnchor="middle" className="font-bold">신설동</text>
                <text x="206" y="120" textAnchor="end" className="font-bold">성수</text>
                {year !== 1984 && <text x="124" y="253" textAnchor="middle">종합운동장</text>}
                {year === 1983 && <text x="124" y="27" textAnchor="middle">을지로입구</text>}
              </g>
            </svg>
            <p className="text-body text-ink">{descriptions[index]}</p>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <>
      <svg
        viewBox="0 0 690 280"
        aria-hidden="true"
        focusable="false"
        className="hidden h-auto w-full font-sans md:block"
      >
        <RouteLines>
          <rect x="28" y="32" width="272" height="208" rx="104" />
          <path d="M300 136 H640" />
        </RouteLines>
        <path d="M640 118 V154" className="stroke-ink" strokeWidth="4" />
        <g className="fill-ground stroke-ink" strokeWidth="3">
          <circle cx="300" cy="136" r="10" />
          <circle cx="385" cy="136" r="8" />
          <circle cx="470" cy="136" r="8" />
          <circle cx="555" cy="136" r="8" />
        </g>
        <g className="fill-ink text-lg font-medium">
          <text x="164" y="132" textAnchor="middle">2호선 순환 구간</text>
          <text x="470" y="104" textAnchor="middle">성수지선</text>
          <text x="316" y="111" className="font-bold">성수</text>
          <text x="385" y="176" textAnchor="middle">용답</text>
          <text x="470" y="176" textAnchor="middle">신답</text>
          <text x="555" y="176" textAnchor="middle">용두</text>
          <text x="640" y="176" textAnchor="middle" className="font-bold">신설동</text>
        </g>
      </svg>
      <svg
        viewBox="0 0 350 510"
        aria-hidden="true"
        focusable="false"
        className="mx-auto block h-auto w-full max-w-sm font-sans md:hidden"
      >
        <RouteLines>
          <rect x="28" y="24" width="294" height="178" rx="89" />
          <path d="M175 202 V465" />
        </RouteLines>
        <path d="M157 465 H193" className="stroke-ink" strokeWidth="4" />
        <g className="fill-ground stroke-ink" strokeWidth="3">
          <circle cx="175" cy="202" r="10" />
          <circle cx="175" cy="268" r="8" />
          <circle cx="175" cy="334" r="8" />
          <circle cx="175" cy="400" r="8" />
        </g>
        <g className="fill-ink text-lg font-medium">
          <text x="175" y="119" textAnchor="middle">2호선 순환 구간</text>
          <text x="145" y="334" textAnchor="end">성수지선</text>
          <text x="201" y="226" className="font-bold">성수</text>
          <text x="201" y="274">용답</text>
          <text x="201" y="340">신답</text>
          <text x="201" y="406">용두</text>
          <text x="207" y="471" className="font-bold">신설동</text>
        </g>
      </svg>
    </>
  );
}
