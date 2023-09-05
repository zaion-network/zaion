import { EventEmitter } from "events";
import { IncomingMessage, get } from "http";
import WebSocket, { WebSocketServer, Server as S } from "ws";
import { Binance } from "../binanceInfost";

declare module "./server" {
  type checker = Server.checker;
  type getter = Server.getter;
  type pairGetter = Server.pairGetter;
  type lsct = Server.lastStoredCandleTimeGetter;
  type definer = Server.definer;
  type requester = Server.requester;
  type deleter = Server.deleter;
  type recordCreator = Server.recordCreator;
  type updater = Server.updater;
  type saver = Server.saver;
  type fileCreator = Server.fileCreator;
  type liveDatasGetter = Server.liveDatasGetter;
  type Candle = Binance.ApiEndpoints.Candle;
  type getTickerCandlesArgs = Binance.ApiEndpoints.getTickerCandlesArgs;
  type Database = Server.Database;
  type Period = Server.Period;
  namespace Server {
    interface checker {
      (path: string): boolean;
    }
    interface getter {
      (path: string): any;
    }
    interface fileCreator {
      (path: string): boolean;
    }
    interface deleter {
      (path: string): boolean;
    }
    interface definer {
      (lastClosingTime: number): {
        startTime: number;
        endTime: number;
      };
    }
    interface requester {
      (props: getTickerCandlesArgs): Promise<Binance.ApiEndpoints.Candle>;
    }
    interface updater {
      (
        path: string,
        prevData: Server.Database,
        data: Binance.ApiEndpoints.Candle[],
        symbol: string
      ): Server.Database;
    }
    interface pairGetter {
      (pair: string, db: Server.Database):
        | Binance.ApiEndpoints.Candle[]
        | false;
    }
    interface liveDatasGetter {
      (endpoint: string): boolean;
    }
    interface saver {
      (path: string, data: string): boolean;
    }
    interface recordCreator {
      (db: Server.Database, pair: string): boolean;
    }
    interface lastStoredCandleTimeGetter {
      (candles: Binance.ApiEndpoints.Candle[]): number;
    }
    interface Period {
      startTime: number;
      endTime: number;
    }
  }
}

export interface Server<
  T extends typeof WebSocket.WebSocket = typeof WebSocket.WebSocket
> extends WebSocketServer {
  db?: Server.Database;
  on(type: Server.events, cb: (...args: any[]) => any): this;
  on(
    event: string | symbol,
    listener: (this: S<T>, ...args: any[]) => void
  ): this;
  emit(type: Server.events, ...datas: any[]): boolean;
  start(pair: string, interval: string, checker: checker): this;
  fileExists(checker: checker): this;
  getContent(getter: getter): this;
  createFile(fileCreator: fileCreator): this;
  createPairRecord(recordCreator: recordCreator, pair: string): this;
  deleteFile(deleter: deleter): this;
  getPair(pairGetter: pairGetter, pair: string, db: Database): this;
  getLastStoredCandleTime(getter: lsct, candles: Candle[]): this;
  defineTimePeriod(definer: definer, lastClosingTime: number): this;
  requestDatas(requester: requester, endpoint: getTickerCandlesArgs): this;
  updateDatas(updater: updater, data: Candle[], symbol: string): this;
  saveDatas(saver: saver, data: string): this;
  getLiveDatas(liveDatasGetter: liveDatasGetter, endpoint: string): this;
  openWriteStream(): this;
}
const config: { databaseType: string; filename: string } = {
  databaseType: `json`,
  filename: `test.json`,
};
export class Server extends WebSocketServer implements Server {
  path: string;
  symbol?: string;
  interval?: string;
  constructor(
    options: WebSocket.ServerOptions<typeof WebSocket, typeof IncomingMessage>,
    cb?: () => void
  ) {
    super(options, cb);
    this.path = `${options.path}${config.filename}`;
  }
  start(symbol: string, interval: string, checker: checker): this {
    this.symbol = symbol;
    this.interval = interval;
    this.fileExists(checker);
    return this;
  }
  fileExists(checker: checker): this {
    if (checker(this.path)) {
      console.log(`file exists`);
      this.emit(Server.events.fileExists);
    } else {
      console.log(`file doesnt exist`);
      this.emit(Server.events.fileNotExists);
    }
    return this;
  }
  getContent(getter: getter): this {
    let result = getter(this.path);
    if (result !== undefined && result !== null && result !== "") {
      try {
        let db = new Server.Database(JSON.parse(result.trim()));
        console.log(`contains data`);
        this.emit(Server.events.containsData, db, this.symbol!);
      } catch (error) {
        console.log(`wrong file`);
        this.emit(Server.events.wrongDataType);
      }
    } else {
      console.log(`not contains data`);
      this.emit(Server.events.notContainsData);
    }
    return this;
  }
  deleteFile(deleter: deleter): this {
    if (deleter(this.path)) {
      console.log(`file deleted`);
      this.emit(Server.events.fileDeleted);
    } else throw Error(`there was a problem deleting the file`);
    return this;
  }
  createFile(fileCreator: fileCreator): this {
    if (fileCreator(this.path)) {
      console.log(`file created`);
      this.emit(Server.events.fileCreated, this.path);
    } else throw Error(`there was a problem creating the file`);
    return this;
  }
  createPairRecord(recordCreator: recordCreator, pair: string): this {
    if (recordCreator(this.db!, pair)) {
      console.log(`created record for pair`);
      this.emit(Server.events.pairRecordCreated);
    } else throw Error(`there was a problem creaing the pair`);
    return this;
  }
  requestDatas(requester: requester, props: getTickerCandlesArgs): this {
    console.log(`requesting datas`);
    async function run(this: Server) {
      try {
        const response = await requester(props);
        console.log(`received datas`);
        this.emit(Server.events.receivedDatas, response, this.symbol);
      } catch (error) {
        console.log(error);
        this.emit(Server.events.notReceivedDatas);
      }
    }
    run.bind(this)();
    return this;
  }
  getPair(pairGetter: pairGetter, pair: string, db: Database): this {
    let pairCandles = pairGetter(pair, db);
    if (!this.db) this.db = db;
    if (pairCandles) {
      console.log(`db has pair`);
      this.emit(Server.events.dbHasPair, pairCandles);
    } else {
      console.log(`here`);
      this.emit(Server.events.dbHasNotPair, pair);
    }
    return this;
  }
  getLastStoredCandleTime(getter: lsct, candles: Candle[]): this {
    const lastClosing = getter(candles);
    if (lastClosing) {
      console.log("got last recorded candle time");
      this.emit(Server.events.gotLastRecordedCandle, lastClosing);
    } else
      throw Error(`there was a problem retrieving the last closing candle`);
    return this;
  }
  defineTimePeriod(definer: definer, lastClosingTime: number): this {
    const period: Period = definer(lastClosingTime);
    if (period) {
      console.log(`time period defined`);
      this.emit(
        Server.events.timePeriodDefined,
        period,
        this.symbol!,
        this.interval!
      );
    }
    return this;
  }
  updateDatas(updater: updater, data: Candle[], symbol: string): this {
    let updatedDatas = updater(this.path, this.db!, data, symbol);
    if (updatedDatas) {
      console.log(`datas have been updated`);
      this.emit(Server.events.updatedDatas, updatedDatas);
    } else throw Error(`there was an errore updating the database`);
    return this;
  }
  saveDatas(saver: saver, data: string): this {
    if (saver(this.path, data)) {
      console.log(`updated datas have been saved`);
      this.emit(Server.events.savedDatas);
    } else throw Error(`there was a problem saving the datas`);
    return this;
  }
  getLiveDatas(liveDatasGetter: liveDatasGetter, endpoint: string): this {
    if (liveDatasGetter(endpoint)) {
      console.log(`received live datas`);
      this.emit(Server.events.receivedLiveDatas);
    }
    return this;
  }
}
export namespace Server {
  export enum events {
    fileExists = "file-exists",
    fileNotExists = "file-not-exists",
    containsData = `file-contains-datas`,
    wrongDataType = `wrong-data-type`,
    notContainsData = `file-not-contains-datas`,
    fileDeleted = `file-deleted`,
    fileCreated = `filed-created`,
    dbHasPair = `dbHasPair`,
    dbHasNotPair = `dbHasNotPair`,
    pairRecordCreated = `pairRecordCreated`,
    gotLastRecordedCandle = `got-last-recorded-candle`,
    receivedDatas = "received-datas",
    notReceivedDatas = "not-received-datas",
    updatedDatas = `updated-datas`,
    nontUpdatedDatas = `not-updated-datas`,
    receivedLiveDatas = `received-live-datas`,
    notReceivedLiveDatas = `not-received-live-datas`,
    savedDatas = `saved-datas`,
    timePeriodDefined = `time-period-defined`,
  }
  export interface Database {
    db: {
      pairs: { [key: string]: { candles: Binance.ApiEndpoints.Candle[] } };
    };
  }
  export class Database {
    constructor(props: Database) {
      this.db = props.db;
    }
  }
}
