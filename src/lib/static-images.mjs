export const deviceSizes = [384, 640, 828, 1080, 1600, 2048];
export const imageSizes = [96, 180];
export const imageWidths = [...imageSizes, ...deviceSizes];
const stationImageWidths = imageWidths.filter((width) => width <= 1080);
const comparisonImageWidths = [...imageWidths.filter((width) => width < 1000), 1000];
export const imageSources = [
  ...["jamsil", "konkuk-univ", "sadang"].flatMap((station) =>
    ["section", "reel"].map((kind) => `/images/station/${station}-${kind}.jpg`),
  ),
  ...["rail", "street", "space", "network", "change-day", "change-evening"].map((name) => `/images/about/${name}.jpg`),
];

export function widthsFor(src) {
  if (!imageSources.includes(src)) throw new Error(`Unsupported static image: ${src}`);
  if (src.startsWith("/images/station/")) return src.endsWith("-reel.jpg") ? imageSizes : stationImageWidths;
  return src.startsWith("/images/about/change-") ? comparisonImageWidths : imageWidths;
}

export function imageUrl(src, width) {
  if (!widthsFor(src).includes(width)) throw new Error(`Unsupported image width: ${src} (${width})`);
  return src.replace(/\/([^/]+)\.jpg$/, `/generated/$1-${width}.webp`);
}
