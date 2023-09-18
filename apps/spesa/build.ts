#!/usr/bin/env bun

const res = await Bun.build({
  entrypoints: ["./src/index.ts"],
  outdir: "dist",
  target: "browser"
});

console.log(res);
