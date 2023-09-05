import { existsSync, readFileSync, rmSync, writeFileSync } from "fs";
import WebSocket, { WebSocketServer } from "ws";
import { Server } from "./server";
import { Binance } from "../binanceInfost";
import { Binance as B } from "./classes/ExhangeApi/Binance";
import { config } from "dotenv";

config();
// const websocketserver = new WebSocket.WebSocketServer({ port: 8080 });

const server = new Server(
  {
    port: 8080,
    path: `/Users/WAW/Documents/Projects/zaion-network-state/apps/zyclone/database/`,
  },
  () => console.log(`server listening on port 8000`)
);

const getter = (path: string) => readFileSync(path, { encoding: "utf-8" });

const checker = (path: string) => existsSync(path);

const deleter = (path: string) => {
  try {
    rmSync(path);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const fileCreator = (path: string) => {
  try {
    const newDatabase = new Server.Database({ db: { pairs: {} } });
    writeFileSync(path, JSON.stringify(newDatabase));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const requester = async (props: Binance.ApiEndpoints.getTickerCandlesArgs) => {
  const binance = new B.BinanceApi(
    process.env.BINANCE_API_KEY_WRITE!,
    process.env.BINANCE_SECRET_KEY_WRITE!
  );
  try {
    const response = await binance.getTickerCandles(props);
    return response;
  } catch (error: any) {
    throw new Error(error.message);
  }
};

const pairGetter: (
  pair: string,
  db: Server.Database
) => Binance.ApiEndpoints.Candle[] | false = (pair, db) => {
  try {
    return db.db.pairs[pair].candles;
  } catch (error) {
    return false;
  }
};

const lastStoredCandleTimeGetter: Server.lastStoredCandleTimeGetter =
  candles => {
    const closingTime = candles[candles.length - 1][6];
    return closingTime;
  };

const definer: (lastClosingTime: number) => {
  startTime: number;
  endTime: number;
} = closingTime => {
  return { startTime: closingTime, endTime: Date.now() };
};

const updater: Server.updater = (path, prevData, data, symbol) => {
  const previousCandles = prevData.db.pairs[symbol].candles;
  previousCandles.push(...data);
  return prevData;
};

const saver: Server.saver = (path, data) => {
  try {
    writeFileSync(path, data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const liveDatasGetter: Server.liveDatasGetter = endpoint => {
  return true;
};

const recordCreator: Server.recordCreator = (db, pair) => {
  try {
    console.log(db);
    db.db.pairs[pair] = { candles: [] };
    return true;
  } catch (error) {
    return false;
  }
};

// HANDLERS
const onFileExistHandler = () => {
  server.getContent(getter);
};

const onFileNotExistHandler = () => {
  server.createFile(fileCreator);
};

const onContainsDataHandler = (db: Server.Database, symbol: string) => {
  if (db instanceof Server.Database) {
    console.log(`datas in the correct format`);
    server.getPair(pairGetter, symbol, db);
  } else server.deleteFile(deleter);
};

const onWrongFileHandler = () => {
  server.deleteFile(deleter);
};

const onNotContainsDataHandler = () => {
  server.deleteFile(deleter);
};

const onFileDeletedHandler = () => {
  server.createFile(fileCreator);
};

const onFileCreatedHandler = () => {
  server.getContent(getter);
};

const onReceivedDatasHandler = (
  datas: Binance.ApiEndpoints.Candle[],
  symbol: string
) => {
  server.updateDatas(updater, datas, symbol);
};

const onDbHasPairHandler = (candles: Binance.ApiEndpoints.Candle[]) => {
  server.getLastStoredCandleTime(lastStoredCandleTimeGetter, candles);
};

const onGotLastRecordedCandleHandler = (time: number) => {
  server.defineTimePeriod(definer, time);
};

const onPairRecordCreatedHandler = () => {
  server.defineTimePeriod(definer, Date.now() - 4 * 60 * 1000);
};

const onTimePeriodDefinedHandler = (
  period: Server.Period,
  symbol: string,
  interval: string
) => {
  server.requestDatas(requester, {
    symbol,
    interval,
    ...period,
  });
};

const onUpdatedDatasHandler = (data: Server.Database) => {
  server.saveDatas(saver, JSON.stringify(data));
};

const onSavedDatasHandler = () => {
  server.getLiveDatas(liveDatasGetter, ``);
};

const onReceivedLiveDatasHandler = () => {};

interface onDbHasNotPairHandler {
  (pair: string): void;
}

const onDbHasNotPairHandler: onDbHasNotPairHandler = pair => {
  server.createPairRecord(recordCreator, pair);
};

server.on("listening", () => {
  console.log(`ready`);
  server
    .on(Server.events.fileExists, onFileExistHandler)
    .on(Server.events.fileNotExists, onFileNotExistHandler)
    .on(Server.events.containsData, onContainsDataHandler)
    .on(Server.events.dbHasPair, onDbHasPairHandler)
    .on(Server.events.dbHasNotPair, onDbHasNotPairHandler)
    .on(Server.events.gotLastRecordedCandle, onGotLastRecordedCandleHandler)
    .on(Server.events.pairRecordCreated, onPairRecordCreatedHandler)
    .on(Server.events.timePeriodDefined, onTimePeriodDefinedHandler)
    .on(Server.events.updatedDatas, onUpdatedDatasHandler)
    .on(Server.events.wrongDataType, onWrongFileHandler)
    .on(Server.events.notContainsData, onNotContainsDataHandler)
    .on(Server.events.fileDeleted, onFileDeletedHandler)
    .on(Server.events.fileCreated, onFileCreatedHandler)
    .on(Server.events.receivedDatas, onReceivedDatasHandler)
    .on(Server.events.savedDatas, onSavedDatasHandler)
    .on(Server.events.receivedLiveDatas, onReceivedLiveDatasHandler)
    .start(`BTCUSDT`, `3m`, checker);
});
