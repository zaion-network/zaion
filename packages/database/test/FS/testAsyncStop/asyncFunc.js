import { EventEmitter } from "events";

export const emitter = new EventEmitter();

async function foo() {
  const koo = new Promise((res, rej) => {
    // emitter.on("emit", () => {
    //   res(console.log("emitted"));
    // });
    const boo = false;
    if (boo === true) res();
  });
  await koo;
}
await foo();

console.log("solved");
