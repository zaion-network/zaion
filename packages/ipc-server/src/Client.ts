import { Socket } from "net";
import { existsSync } from "fs";
import { ChildProcess, SpawnOptions, spawn, spawnSync } from "child_process";
import { CacheServerOptions } from "./Server";
import { Readable } from "stream";

interface JsonBuffer {
  type: "Buffer";
  data: number[];
}

interface saveToCacheOptions {
  force?: boolean;
}

interface objectToSend {
  type: Methods;
  key?: string;
  value?: unknown;
}

type handleConnectArg = true | Error | PromiseLike<true | Error>;

enum Methods {
  status = "status",
  close = "close",
  get = "get",
  data = "data",
}

enum Messages {
  CONNECT = "connecting the socket...\n",
  QUESTIONHANDLER = "crash then!\n",
  EXIT = "something went wrong\n",
  PROCESS = "initializing cache...\n",
  DATAHANDLER = "received datas from server\n",
  SAVING = "saving datas in the cache...\n",
  READING = "reading datas from the cache...\n",
  CLOSING = "closing the server...\n",
  STATUS = "retriving server status...\n",
  HANDLEEXISTS = "handle file already exists!\n",
  DELETEHANDLE = "deleting handle file...\n",
  INTERFACECLOSED = "interface closed...\n",
  WRITEERROR = "write error\n",
  SPAWNSERVER = `spawning a server...\n`,
}

enum SocketEvents {
  data = "data",
  connect = "connect",
  error = "error",
  end = "end",
}

enum SpawnEvents {
  spawn = "spawn",
}

enum SpawnCommands {
  node = "node",
}

enum FileNames {
  server = "/Users/WAW/Desktop/Als Analyzer Project/IPC Server/server.js",
  process = "/tmp/some-file.sock",
}

enum SpawnIo {
  ignore = "ignore",
  inherit = "inherit",
  overlap = "overlap",
  pipe = "pipe",
}

type handlDataCb = (value: boolean | PromiseLike<boolean>) => void;

export class Client {
  static Socket = Socket;
  static existsSync = existsSync;
  static spawn = spawn;
  static spawnSync = spawnSync;
  static isJson<T>(target: string): Promise<T | false> {
    return new Promise((res) => {
      try {
        let response = JSON.parse(target);
        res(response);
      } catch (error) {
        res(false);
      }
    });
  }

  // #rl;
  #HANDLE: FileNames | string;
  #TIMEOUT: number;
  #serverProcess: ChildProcess | undefined;
  #socket: Socket;
  #options: CacheServerOptions;
  #args: (FileNames | string)[];
  #spawnOptions = {
    detached: true,
    stdio: SpawnIo.ignore,
  } as const;
  #spawnargs: [string, string[], SpawnOptions];
  #key: string | undefined;
  #value: any | undefined;
  #data: 0 | string | Buffer | undefined | null | JsonBuffer = undefined;
  #connected: Boolean = false;
  #message: Messages = Messages.SAVING;
  #isServer: Boolean = false;
  #objectToSend: objectToSend | undefined;
  #buff: Buffer = Buffer.alloc(0);
  #isBuffJson: boolean | 0 = false;

  #dataStream?: Readable;
  #stringifiedObject?: string;
  #bufferedStringObj?: Buffer;
  #setupListenersResponse?: boolean;

  constructor(
    handle: string | undefined = FileNames.process,
    timeout: number | undefined = 10_000
  ) {
    this.#socket = new Client.Socket({});
    this.#HANDLE = handle;
    this.#TIMEOUT = timeout;
    this.#options = {
      handle: this.#HANDLE,
      timeout: this.#TIMEOUT,
    };
    this.#args = [FileNames.server, JSON.stringify(this.#options)];
    this.#spawnargs = [SpawnCommands.node, this.#args, this.#spawnOptions];
  }

  #connectHandler = (res: (value: handleConnectArg) => void) => () => {
    res(true);
    this.#connected = true;
  };

  #errorHandler = (rej: (reason?: any) => void) => (err: Error) => {
    rej(err);
    this.#connected = false;
  };

  #spawnHandler = (res: (value: unknown) => void) => () => {
    setTimeout(() => {
      res(true);
    }, 200);
  };

  #connectSocket(): Promise<true | Error> {
    return new Promise((res, rej) => {
      process.stdout.write(Messages.CONNECT);
      this.#socket.on(SocketEvents.connect, this.#connectHandler(res));
      this.#socket.on(SocketEvents.error, this.#errorHandler(rej));
      this.#socket.connect(this.#HANDLE);
    });
  }

  async #spawnServer() {
    return new Promise((res) => {
      process.stdout.write(Messages.SPAWNSERVER);
      this.#serverProcess = Client.spawn(...this.#spawnargs);
      this.#serverProcess.unref();
      this.#serverProcess!.once(SpawnEvents.spawn, this.#spawnHandler(res));
      this.#isServer = true;
    });
  }

  #con = (b1: Buffer, b2: Buffer) => Buffer.concat([b1, b2]);

  #dataHandler = (data: Buffer) => (this.#buff = this.#con(this.#buff, data));

  #endHandler = (res: handlDataCb) => async () => {
    process.stdout.write(Messages.DATAHANDLER);
    this.#data = this.#buff;
    this.#buff = Buffer.alloc(0);
    this.#isBuffJson = await Client.isJson<0>(this.#data.toString());
    if (this.#isBuffJson) this.#data = this.#isBuffJson;
    if (this.#isBuffJson === 0) this.#data = null;
    res(true);
  };

  #setupListeners = async () => {
    return new Promise<boolean>(async (res, rej) => {
      process.stdout.write(this.#message);
      this.#data = undefined;
      this.#socket.removeAllListeners(SocketEvents.data);
      this.#socket.removeAllListeners(SocketEvents.end);
      this.#socket.on(SocketEvents.data, this.#dataHandler);
      this.#socket.on(SocketEvents.end, this.#endHandler(res));
      this.#stringifiedObject = JSON.stringify(this.#objectToSend);
      this.#bufferedStringObj = Buffer.from(this.#stringifiedObject);
      this.#dataStream = new Readable();
      this.#dataStream.push(this.#bufferedStringObj);
      this.#dataStream.push(null);
      this.#dataStream.pipe(this.#socket);
    });
  };

  #initializeCache = async () => {
    process.stdout.write(Messages.PROCESS);
    this.#isServer = Client.existsSync(this.#HANDLE);
    if (!this.#isServer) await this.#spawnServer();
    await this.#connectSocket();
    return this;
  };

  #process = async (): Promise<boolean | undefined> => {
    if (!this.#connected) await this.#initializeCache();
    this.#setupListenersResponse = await this.#setupListeners();
    return this.#setupListenersResponse;
  };

  #buildObject = (type: Methods) => {
    if (type === Methods.get) {
      return { type: Methods.get, key: this.#key };
    } else if (type === Methods.data) {
      return { type: Methods.data, key: this.#key, value: this.#value };
    } else if (type === Methods.close) {
      return { type: Methods.close };
    } else {
      return { type: Methods.status };
    }
  };

  async saveToCache(key: string, value: any) {
    this.#message = Messages.SAVING;
    this.#key = key;
    this.#value = value;
    this.#objectToSend = this.#buildObject(Methods.data);
    await this.#process();
    this.closeInterface();
    return this.#data;
  }

  async readFromCache(key: string) {
    this.#message = Messages.READING;
    this.#key = key;
    this.#objectToSend = this.#buildObject(Methods.get);
    await this.#process();
    this.closeInterface();
    return this.#data;
  }

  async close() {
    this.#message = Messages.CLOSING;
    this.#objectToSend = this.#buildObject(Methods.close);
    await this.#process();
    this.#isServer = false;
    this.closeInterface();
    return true;
  }

  async status() {
    this.#message = Messages.STATUS;
    this.#objectToSend = this.#buildObject(Methods.status);
    await this.#process();
    this.closeInterface();
    return this.#data;
  }

  closeInterface() {
    this.#connected = false;
    this.#socket.removeAllListeners();
    this.#serverProcess?.removeAllListeners();
    this.#socket.destroy();
    process.stdout.write(Messages.INTERFACECLOSED);
    return this;
  }
}
