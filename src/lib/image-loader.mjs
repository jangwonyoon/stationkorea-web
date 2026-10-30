"use client";

import { imageUrl } from "./static-images.mjs";

export default function imageLoader({ src, width }) {
  return imageUrl(src, width);
}
