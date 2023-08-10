import { Readable } from "stream";
import { Client } from "./Client";
import { readFileSync } from "fs";

async function run() {
  const start = performance.now();
  const cache = new Client();
  let res = await cache.saveToCache("ciao", "funzina");
  res = await cache.saveToCache("ciao", "funziona");
  let status = await cache.status();
  let read = await cache.readFromCache("ciao");
  let close = await cache.close();
  console.log(res);
  console.log(status);
  console.log(read);
  console.log(close);
  const stop = performance.now();
  console.log(stop - start);
  cache.closeInterface();
}

async function run2() {
  const FILE = "/Users/WAW/Desktop/Als Analyzer Project/Als_Analyzer.als";
  const start = performance.now();
  const cache = new Client();
  const stream = new Readable();
  const stringfiled = readFileSync(FILE).toString();
  stream.push(null);
  // let res = await cache.saveToCache("ciao", "funzna");
  let res = await cache.readFromCache("ciao");
  console.log(res);
  if (!res) {
    let res = await cache.saveToCache("ciao", stringfiled);
    console.log(res);
  }
  // cache.status();
  // cache.close();
  const stop = performance.now();
  console.log(stop - start);
  // process.exit();
}

run2();
