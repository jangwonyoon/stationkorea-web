import assert from "node:assert/strict";
import { cp, mkdtemp, mkdir, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { spawnSync } from "node:child_process";
import sharp from "sharp";
import imageLoader from "../src/lib/image-loader.mjs";
import { imageSources, imageWidths, imageUrl, widthsFor } from "../src/lib/static-images.mjs";

assert.throws(() => imageLoader({ src: "/images/unknown.jpg", width: 180 }));
assert.throws(() => imageLoader({ src: imageSources[0], width: 181 }));
for (const src of imageSources) {
  const original = await sharp(`public${src}`).metadata();
  for (const width of imageWidths) {
    if (!widthsFor(src).includes(width)) {
      assert.throws(() => imageLoader({ src, width }));
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
