#!bin/ts-node

// https://www.youtube.com/watch?v=pNL6VUq_gEw
// https://www.npmjs.com/package/fake-json-stream

import { existsSync, unlinkSync } from "fs";
import { Socket, Server } from "net";
import { Interface, createInterface } from "readline";

enum exitCodes {
  ["no data"],
  ["end of stream"],
}

export interface CacheServerOptions {
  handle?: string;
  timeout?: number;
}

class CacheServer {
  static Server = Server;
  static unlinkSync = unlinkSync;
  static createInterface = createInterface;

  #cache: any = {};
  #HANDLE = "/tmp/some-file.sock";
  #server;
  #client?: Socket;
  #rl: Interface;
  #timeoutId?: NodeJS.Timeout;
  #timeout = 5_000;

  constructor(options?: CacheServerOptions) {
    if (options && options.handle) this.#HANDLE = options.handle;
    if (options && options.timeout) this.#timeout = options.timeout;
    this.#server = new CacheServer.Server({});
    const { stdin: input, stdout: output } = process;
    this.#rl = CacheServer.createInterface({ input, output });
    this.#rl.write("server\n");
    this.#server.on("error", this.serverErrorHandler);
    this.#server.on("listening", this.listeningHandler);
    this.#server.on("connection", this.connectionHandler);
    this.#server.on("finish", this.finishHandler);
    this.existsTmp(this.#HANDLE)
      .then((exists) => {
        if (exists) {
          this.#server.listen(this.#HANDLE);
          this.setTimeout();
        } else process.exit();
      })
      .catch();
  }

  setTimeout() {
    this.#timeoutId = setTimeout(this.#close, this.#timeout);
  }

  errorHandler = (prompt: string) => (err: Error) =>
    this.#rl.write(`${prompt} ${err.stack}\n`);
  serverErrorHandler = this.errorHandler(`Error from the server:`);
  clientErrorHandler = this.errorHandler(`Error from the client:`);
  finishHandler = () => this.#rl.write(`finished.\n`);
  listeningHandler = () => this.#rl.write(`listening...\n`);
  /**
   *
   * @param {Socket} client
   */
  #TEST = true;
  connectionHandler = (client: Socket) => {
    this.#rl.write("connection\n");
    this.#client = client;
    client.on("error", this.clientErrorHandler);
    client.on("data", this.dataHandler);
    client.on("end", this.#endHandler);
  };

  #question = `the file ${this.#HANDLE} already exists,
  do you want to delete it? Y or N\n`;
  existsTmp(path: any) {
    return new Promise((res) => {
      if (existsSync(path)) {
        this.#rl.question(this.#question, this.#handleAnswer(res));
        return true;
      } else {
        this.#rl.write("not exists\n");
        res(true);
        return null;
      }
    });
  }

  #handleAnswer = (res: (value: unknown) => void) => (answer: string) => {
    if (answer === "Y") {
      this.#rl.write("I will delete the file\n");
      unlinkSync(this.#HANDLE);
      res(true);
    } else if (answer === "N") {
      res(false);
    } else {
      this.#rl.write(this.#question);
      return;
    }
  };

  #parsed?: any;
  #dataBuffer: Buffer = Buffer.alloc(0);
  dataHandler = (data: Buffer) => {
    this.#resetTimeOut();
    if (!this.#TEST) {
      this.#parsed = JSON.parse(data.toString());
      if (this.#parsed && this.#parsed.type === "data") this.#data();
      if (!this.#parsed) return 0;
      else if (this.#parsed && this.#parsed.type === "get") this.#get();
      else if (this.#parsed && this.#parsed.type === "close") this.#close();
      else if (this.#parsed && this.#parsed.type === "status") this.#status();
    } else {
      this.#dataBuffer = Buffer.concat([this.#dataBuffer, data]);
    }
  };

  #endHandler = () => {
    this.#rl.write("emitted end\n");
    try {
      this.#parsed = JSON.parse(this.#dataBuffer!.toString().trim());
      this.#dataBuffer = Buffer.alloc(0);
    } catch (error: any) {
      return 0;
    }
    if (!this.#parsed) return 0;
    if (this.#parsed && this.#parsed.type === "data") this.#data();
    else if (this.#parsed && this.#parsed.type === "get") this.#get();
    else if (this.#parsed && this.#parsed.type === "close") this.#close();
    else if (this.#parsed && this.#parsed.type === "status") this.#status();
    this.#rl.write("end\n");
  };

  #writeToClient(src: any) {
    try {
      this.#client!.write(JSON.stringify(src));
    } catch (error) {
      process.stdout.write("got error\n");
    }
  }

  #status = () => {
    this.#writeToClient(this.#getProcessMemoryUsage());
  };

  #data = () => {
    this.#cache[this.#parsed.key] = this.#parsed.value;
    this.#writeToClient(this.#cache[this.#parsed.key]);
  };

  #get = () => {
    if (this.#cache[this.#parsed.key])
      this.#writeToClient(this.#cache[this.#parsed.key]);
    else this.#writeToClient(exitCodes["no data"]);
  };

  #close = () => {
    CacheServer.unlinkSync(this.#HANDLE);
    if (this.#client)
      this.#client.write(JSON.stringify(this.#getProcessMemoryUsage()));
    this.#server.close();
    this.#rl.close();
  };

  #resetTimeOut() {
    clearTimeout(this.#timeoutId);
    this.setTimeout();
  }

  #getProcessMemoryUsage() {
    const memoryUsage = process.memoryUsage();
    return this.#formatMemoryUsage(memoryUsage);
  }

  #formatMemoryUsage = (memoryUsage: NodeJS.MemoryUsage) => ({
    rss: `${(memoryUsage.rss / 1024 / 1024).toFixed(2)} MB`,
    heapTotal: `${(memoryUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`,
    heapUsed: `${(memoryUsage.heapUsed / 1024 / 1024).toFixed(2)} MB`,
    external: `${(memoryUsage.external / 1024 / 1024).toFixed(2)} MB`,
  });
}

const [_, __, arg1] = process.argv;

function validateArguments(args: string) {
  let options: CacheServerOptions = { handle: undefined, timeout: undefined };
  try {
    options = JSON.parse(args);
  } catch (error) {
    throw new Error("the passed arguments should be in a JSON format");
  }
  let keys = Object.keys(options);
  const cond1 = keys.includes("handle");
  const cond2 = keys.includes("timeout");
  const cond3 = keys.length > 2;

  if (keys.length === 2) {
    if (!cond1 || !cond2)
      throw new Error("data fields shall be handle and timeout");
  }
  if (keys.length === 1) {
    if (!(cond1 || cond2)) {
      throw new Error("data fields shall be handle or timeout");
    }
  }
  if ("timeout" in options) {
    if (options.timeout != undefined) {
      let value = Number(options.timeout);
      if (isNaN(value)) {
        throw new Error("timout value must be a number");
      }
    }
  }
  if ("handle" in options) {
    if (!options.handle === undefined) {
      if (typeof options.handle !== "string") {
        throw new Error("handle must be of type string");
      }
    }
  }
  if (cond3) throw new Error("to many fields in the options object");
  return options;
}

let options: CacheServerOptions = { handle: undefined, timeout: undefined };
try {
  options = validateArguments(arg1);
  new CacheServer(options);
} catch (error: any) {
  process.stdout.write("ERROR: " + error.message + "\n");
}
