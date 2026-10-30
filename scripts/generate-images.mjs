import { mkdir } from "node:fs/promises";
import sharp from "sharp";
import { imageSources, imageUrl, widthsFor } from "../src/lib/static-images.mjs";

await mkdir("public/images/station/generated", { recursive: true });
for (const src of imageSources) {
  for (const width of widthsFor(src)) {
    await sharp(`public${src}`).resize({ width }).webp({ quality: 75 }).toFile(`public${imageUrl(src, width)}`);
  }
}
