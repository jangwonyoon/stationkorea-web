export const deviceSizes = [384, 640, 828, 1080, 1600, 2048];
export const imageSizes = [96, 180];
export const imageWidths = [...imageSizes, ...deviceSizes];
const stationImageWidths = imageWidths.filter((width) => width <= 1080);
const comparisonImageWidths = [...imageWidths.filter((width) => width < 1000), 1000];
export const imageSources = [
  ...["jamsil", "konkuk-univ", "sadang"].flatMap((station) =>
    ["section", "reel"].map((kind) => `/images/station/${station}-${kind}.jpg`),
  ),
  ...["jamsil", "sadang", "konkuk-univ", "hongdae-transfer", "express-terminal"].map((slug) => `/images/station/${slug}-cover.jpg`),
  ...["seongsu", "guri", "express-terminal", "dongmyo", "gimpo", "isu", "hongdae", "dongjak", "jamsil", "sadang", "konkuk-univ"].map((slug) => `/images/station/${slug}-photo.jpg`),
  ...["ichon-museum-neighborhood","seoul-station-connections","sindorim-cultural-spaces","wangsimni-neighborhood","gangnam-connections","ddp-history-walk","jongno3-music-heritage","gongdeok-connections","gunja-morning-crowding"].map((slug) => `/images/station/${slug}-photo.jpg`),
  ...["ddp-igansu", "ddp-stadium-2004", "ddp-market-fabrics"].map((slug) => `/images/station/${slug}-photo.jpg`),
  ...["rail", "street", "space", "network", "change-day", "change-evening"].map((name) => `/images/about/${name}.jpg`),
];

export function widthsFor(src) {
  if (!imageSources.includes(src)) throw new Error(`Unsupported static image: ${src}`);
  // 공개된 DDP 원본은 853px이므로 확대 없이 828px까지 제공한다.
  if (src === "/images/station/ddp-history-walk-photo.jpg") return imageWidths.filter((width) => width <= 828);
  // 운동장 기록사진 원본은 640px이므로 더 큰 파생 이미지를 만들지 않는다.
  if (src === "/images/station/ddp-stadium-2004-photo.jpg") return imageWidths.filter((width) => width <= 640);
  if (src.startsWith("/images/station/")) return src.endsWith("-reel.jpg") ? imageSizes : stationImageWidths;
  return src.startsWith("/images/about/change-") ? comparisonImageWidths : imageWidths;
}

export function imageUrl(src, width) {
  if (!widthsFor(src).includes(width)) throw new Error(`Unsupported image width: ${src} (${width})`);
  return src.replace(/\/([^/]+)\.jpg$/, `/generated/$1-${width}.webp`);
}
