import assert from "node:assert/strict";
import { readFileSync } from "node:fs";

const css = readFileSync(new URL("../../app/globals.css", import.meta.url), "utf8");
const palette = (block) => Object.fromEntries([...block.matchAll(/--color-([\w-]+): (#[\da-f]{6});/g)].map(([, key, value]) => [key, value]));
const light = palette(css.split("@theme static {")[1].split("/* 노선색(")[0]);
const dark = { ...light, ...palette(css.split(':root[data-theme="dark"] {')[1].split("}")[0]) };
const luminance = (hex) => hex.slice(1).match(/../g).map((v) => parseInt(v, 16) / 255)
  .map((v) => v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)
  .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
for (const [name, colors] of Object.entries({ light, dark })) {
  for (const background of ["ground", "slab"]) {
    for (const text of ["ink", "ink-2", "ink-3"]) {
      const values = [luminance(colors[text]), luminance(colors[background])].sort((a, b) => b - a);
      const ratio = (values[0] + 0.05) / (values[1] + 0.05);
      assert(ratio >= 4.5, `${name} ${text}/${background}: ${ratio}`);
      console.log(`${name} ${text}/${background}: ${ratio.toFixed(2)}:1`);
    }
  }
}
