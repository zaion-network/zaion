#!/usr/bin/env bun

const res = await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "dist",
  target: "node",
});
console.log(res);
