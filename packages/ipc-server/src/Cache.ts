import { createHash } from "crypto";
import { Client } from "./Client";
import { deflateSync, inflateSync } from "zlib";

interface JsonBuffer {
  type: "Buffer";
  data: number[];
}

enum joinChar {
  tilde = "~",
}

export interface Cache<T extends string | number> {
  process: (
    cb: (...args: any[]) => Promise<any>,
    args: string[]
  ) => Promise<any>;
  close(): void;
}

export class Cache<T extends string | number> {
  #client: Client;
  #cache: Map<(...args: any[]) => Promise<any>, any> = new Map();
  #handle?: string;
  #timeout?: number;
  constructor(handle: string);
  constructor(timeout: number);
  constructor(handleOrTimeout?: T);
  constructor(handle: string, timeout?: number);
  constructor(handleOrTimeout?: T, timeout?: number) {
    if (handleOrTimeout) {
      if (typeof handleOrTimeout === "string") this.#handle = handleOrTimeout;
      else this.#timeout = handleOrTimeout;
    }
    if (timeout) this.#timeout = timeout;
    this.#client = new Client(this.#handle, this.#timeout);
  }
  close() {
    this.#client.closeInterface();
  }
  process = async (cb: (...args: any[]) => Promise<any>, args: string[]) => {
    let cached = this.#cache.get(cb);
    if (cached) {
      process.stdout.write("from cache\n");
      this.#client.closeInterface();
      let inflated = inflateSync(Buffer.from(cached.data));
      let parsed = JSON.parse(inflated.toString());
      return parsed;
    } else {
      const key = this.#hashIt(
        [cb.toString(), args].flat().join(joinChar.tilde)
      );
      let value = (await this.#client.readFromCache(key)) as JsonBuffer;
      let res: JsonBuffer;
      if (!value) {
        value = await cb(...args);
        const buffer = Buffer.from(JSON.stringify(value));
        const deflated = deflateSync(buffer);
        process.stdout.write(`saving to cache...\n`);
        res = (await this.#client.saveToCache(key, deflated)) as JsonBuffer;
        this.#cache.set(cb, res);
      } else {
        res = value;
      }
      const inflated = inflateSync(Buffer.from(res.data));
      const parsed = JSON.parse(inflated.toString());
      return parsed;
    }
  };
  #hashIt(string: string) {
    const hash = createHash("sha256");
    hash.update(string);
    return hash.digest("hex");
  }
}
export namespace Cache {}
