import { readFileSync } from "fs";
import { Cache } from "./Cache";
import { inflateSync, unzipSync } from "zlib";
const FILE = "/Users/WAW/Desktop/Als Analyzer Project/Als_Analyzer.als";

function slowData(): Promise<any> {
  return new Promise((res) => {
    const file = readFileSync(FILE);
    setTimeout(() => res({ an: "object", goo: unzipSync(file) }), 2000);
  });
}

async function benchmark(
  fn: (...args: any[]) => Promise<any>,
  args: any[],
  options?: {}
) {
  if (!options) {
    const now = performance.now;
    const start = now();
    let result = await fn(args[0], args[1]);

    const stop = now();
    console.log(`elapsed: `, stop - start);
    return result;
  }
}

(async function goo() {
  const cache = new Cache(25_000);
  const bench1 = await benchmark(cache.process, [slowData, []]);
  console.log(bench1);
  return;
})();

// async function goo() {
//   const cache = new Cache(25_000);
//   const bench1 = await cache.process(slowData, []);
//   console.log(bench1);
//   return bench1;
// }
