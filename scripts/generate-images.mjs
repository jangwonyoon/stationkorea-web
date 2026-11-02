import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";
import sharp from "sharp";
import { imageSources, imageUrl, widthsFor } from "../src/lib/static-images.mjs";

for (const src of imageSources) {
  const widths = widthsFor(src);
  const original = await sharp(`public${src}`).metadata();
  if (original.width < widths.at(-1)) throw new Error(`Static image would be upscaled: ${src}`);
  await mkdir(dirname(`public${imageUrl(src, widths[0])}`), { recursive: true });
  for (const width of widths) {
    await sharp(`public${src}`).resize({ width, withoutEnlargement: true }).webp({ quality: 75 }).toFile(`public${imageUrl(src, width)}`);
  }
}
