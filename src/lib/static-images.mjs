export const deviceSizes = [384, 640, 828, 1080];
export const imageSizes = [96, 180];
export const imageWidths = [...imageSizes, ...deviceSizes];
export const imageSources = ["jamsil", "konkuk-univ", "sadang"].flatMap((station) =>
  ["section", "reel"].map((kind) => `/images/station/${station}-${kind}.jpg`),
);

export function widthsFor(src) {
  if (!imageSources.includes(src)) throw new Error(`Unsupported static image: ${src}`);
  return src.endsWith("-reel.jpg") ? imageSizes : imageWidths;
}

export function imageUrl(src, width) {
  if (!widthsFor(src).includes(width)) throw new Error(`Unsupported image width: ${src} (${width})`);
  return src.replace(/\/([^/]+)\.jpg$/, `/generated/$1-${width}.webp`);
}
