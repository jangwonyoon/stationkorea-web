"use client";

import { imageUrl, widthsFor } from "./static-images.mjs";

export default function imageLoader({ src, width }) {
  const widths = widthsFor(src);
  if (!Number.isFinite(width) || width <= 0) throw new Error(`Unsupported image width: ${src} (${width})`);
  // Next.js 개발 검사는 설정된 폭 외에 원래 표시 폭 또는 400px로도 호출한다.
  const generatedWidth = widths.find((candidate) => candidate >= width) ?? widths.at(-1);
  return imageUrl(src, generatedWidth);
}
