import chokidar from "chokidar";
import { emitter } from "../../lib/chokidar/stop.js";

export interface IWatcher_v1 {
  name: string;
}

export interface Watcher_v1 {
  name: string;
}

export class Watcher_v1 implements IWatcher_v1 {
  constructor(name: string) {
    this.name = name;
  }
}

export type Watcher_v1Ctor = {
  new (name: string): Watcher_v1;
};

export const Watcher_v1Ctor: Watcher_v1Ctor = Watcher_v1;

async function watch(path: string) {
  const watcher = chokidar.watch(path).on("all", (event, path) => {
    console.log(event, path);
    emitter.on("close", () => {
      console.log("closed");
      watcher.close();
      return;
    });
  });
  // return watcher;
}

watch(".");
//
