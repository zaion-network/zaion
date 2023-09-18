import { EventEmitter } from "events";
import  * from ''

const emitter = new EventEmitter();

async function goo() {
  async function foo() {
    return new Promise((res, rej) => {
      // if (control === 1) res(1);
      // if (control === 2) rej();
      emitter.on("stop", () => res("stopped"));
      emitter.emit("stop");
    });
  }

  let res = await foo();

  console.log(res);
}

goo();
