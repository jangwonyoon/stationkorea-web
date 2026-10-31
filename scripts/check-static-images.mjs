import assert from "node:assert/strict";
import { cp, mkdtemp, mkdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";
import imageLoader from "../src/lib/image-loader.mjs";
import { imageSources, imageWidths, imageUrl, widthsFor } from "../src/lib/static-images.mjs";

assert.throws(() => imageLoader({ src: "/images/unknown.jpg", width: 180 }));
for (const width of [undefined, NaN, Infinity, 0, -1]) {
  assert.throws(() => imageLoader({ src: imageSources[0], width }));
}
for (const [requested, generated] of [[88, 96], [181, 384], [400, 640], [2000, 1080]]) {
  assert.equal(imageLoader({ src: imageSources[0], width: requested }), imageUrl(imageSources[0], generated));
}
assert.equal(imageLoader({ src: imageSources[1], width: 90 }), imageUrl(imageSources[1], 96));
assert.equal(imageLoader({ src: imageSources[1], width: 400 }), imageUrl(imageSources[1], 180));
assert.throws(() => imageUrl(imageSources[0], 181));
for (const src of imageSources) {
  const original = await sharp(`public${src}`).metadata();
  for (const width of imageWidths) {
    if (!widthsFor(src).includes(width)) {
      assert.throws(() => imageUrl(src, width));
      assert.equal(imageLoader({ src, width }), imageUrl(src, widthsFor(src).at(-1)));
      continue;
    }
    const url = imageLoader({ src, width });
    assert.equal(url, imageUrl(src, width));
    const output = await sharp(`public${url}`).metadata();
    assert.equal(output.format, "webp");
    assert.equal(output.width, width);
    assert.ok(Math.abs(output.height - original.height * width / original.width) <= 1);
    assert.ok((await readFile(`out${url}`)).equals(await readFile(`public${url}`)));
  }
}
const temporary = await mkdtemp(join(tmpdir(), "static-images-"));
try {
  await mkdir(join(temporary, "public/images"), { recursive: true });
  await cp("public/images/station", join(temporary, "public/images/station"), { recursive: true });
  await rm(join(temporary, "public/images/station/generated"), { recursive: true });
  const generate = () => spawnSync(process.execPath, [new URL("./generate-images.mjs", import.meta.url).pathname], { cwd: temporary, encoding: "utf8" });
  assert.equal(generate().status, 0);
  const sample = join(temporary, `public${imageUrl(imageSources[0], 180)}`);
  const first = await readFile(sample);
  assert.equal(generate().status, 0);
  assert.ok(first.equals(await readFile(sample)));
  await rm(join(temporary, `public${imageSources[0]}`));
  const missing = generate();
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /Input file is missing/);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
console.log("Static image widths, formats and exported assets verified.");
