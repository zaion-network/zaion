#!/usr/bin/env bun

await Bun.build({
  entrypoints: ["./src/index.js"],
  outdir: "dist",
  target: "browser",
});
