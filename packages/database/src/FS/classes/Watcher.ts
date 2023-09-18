import chokidar from "chokidar";
import { emitter } from "../lib/chokidar/stop.js";

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
