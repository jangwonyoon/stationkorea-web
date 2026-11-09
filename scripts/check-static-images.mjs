import assert from "node:assert/strict";
import { cp, mkdtemp, mkdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";
import imageLoader from "../src/lib/image-loader.mjs";
import { imageSources, imageWidths, imageUrl, widthsFor } from "../src/lib/static-images.mjs";

assert.throws(() => imageLoader({ src: "/images/unknown.jpg", width: 180 }));
assert.throws(() => widthsFor("/images/about/unknown.jpg"));
for (const width of [undefined, NaN, Infinity, 0, -1]) {
  assert.throws(() => imageLoader({ src: imageSources[0], width }));
}
for (const [requested, generated] of [[88, 96], [181, 384], [400, 640], [2000, 1080], [2048, 1080]]) {
  assert.equal(imageLoader({ src: imageSources[0], width: requested }), imageUrl(imageSources[0], generated));
}
const reelSource = "/images/station/jamsil-reel.jpg";
assert.equal(imageLoader({ src: reelSource, width: 90 }), imageUrl(reelSource, 96));
assert.equal(imageLoader({ src: reelSource, width: 400 }), imageUrl(reelSource, 180));
assert.throws(() => imageUrl(imageSources[0], 181));
for (const src of ["/images/about/rail.jpg", "/images/about/street.jpg", "/images/about/space.jpg"]) {
  assert.equal(widthsFor(src).at(-1), 2048);
  assert.equal(imageLoader({ src, width: 1600 }), imageUrl(src, 1600));
  assert.equal(imageLoader({ src, width: 1601 }), imageUrl(src, 2048));
  assert.equal(imageLoader({ src, width: 3840 }), imageUrl(src, 2048));
}
for (const src of ["/images/about/change-day.jpg", "/images/about/change-evening.jpg"]) {
  assert.equal(widthsFor(src).at(-1), 1000);
  assert.equal(imageLoader({ src, width: 900 }), imageUrl(src, 1000));
  assert.equal(imageLoader({ src, width: 2048 }), imageUrl(src, 1000));
  assert.throws(() => imageUrl(src, 1080));
}
for (const src of imageSources) {
  const original = await sharp(`public${src}`).metadata();
  if (src.endsWith("-cover.jpg")) {
    assert.equal(imageLoader({ src, width: 400 }), imageUrl(src, 640), "표지 개발 검사 폭을 실제 생성 이미지로 연결");
  }
  for (const width of new Set([...imageWidths, ...widthsFor(src)])) {
    if (!widthsFor(src).includes(width)) {
      assert.throws(() => imageUrl(src, width));
      assert.equal(imageLoader({ src, width }), imageUrl(src, widthsFor(src).at(-1)));
      continue;
    }
    const url = imageLoader({ src, width });
    assert.ok(width <= original.width, `${src}: generated width must not upscale the original`);
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
  const directories = new Set(imageSources.map((src) => dirname(`public${src}`)));
  for (const directory of directories) {
    await cp(directory, join(temporary, directory), { recursive: true });
    await rm(join(temporary, directory, "generated"), { recursive: true });
  }
  const generate = () => spawnSync(process.execPath, [new URL("./generate-images.mjs", import.meta.url).pathname], { cwd: temporary, encoding: "utf8" });
  assert.equal(generate().status, 0);
  const sample = join(temporary, `public${imageUrl(imageSources[0], 180)}`);
  const first = await readFile(sample);
  assert.equal(generate().status, 0);
  assert.ok(first.equals(await readFile(sample)));
  const tooSmall = join(temporary, "public/images/about/change-day.jpg");
  await sharp({ create: { width: 999, height: 600, channels: 3, background: "white" } }).jpeg().toFile(tooSmall);
  const upscaled = generate();
  assert.notEqual(upscaled.status, 0);
  assert.match(upscaled.stderr, /Static image would be upscaled/);
  await rm(join(temporary, `public${imageSources[0]}`));
  const missing = generate();
  assert.notEqual(missing.status, 0);
  assert.match(missing.stderr, /Input file is missing/);
} finally {
  await rm(temporary, { recursive: true, force: true });
}
console.log("Static image widths, formats and exported assets verified.");
