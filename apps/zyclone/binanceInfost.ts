export namespace Exchange {
  namespace RSI {
    enum timeframes {
      "1m" = 1,
      "3m" = 3,
      "5m" = 5,
      "15m" = 15,
      "30m" = 30,
      "45m" = 30,
      "1h" = 60,
      "2h" = 120,
      "4h" = 240,
      "8h" = 480,
      "12h" = 720,
      "1D" = 1_440,
      "3D" = 4_320,
      "1W" = 10_080,
    }
  }
  namespace EMA {
    enum timeframes {}
  }
}
export class Binance {
  wsUrl = (streams: string[]) =>
    `wss://stream.binance.com:9443/stream?streams=${streams.join(`/`)}`;
}
export namespace Binance {
  type endpoint = string;
  export namespace ApiEndpoints {
    type candleStickOpeningTime = number;
    type candleStickClosingTime = number;
    type openPrice = string;
    type closePrice = string;
    type maxPrice = string;
    type minPrice = string;
    type volume = string;
    type volume_quoted_symbol = string;
    type trades = number;
    type taker_buy_base_asset_vol = string;
    type taker_buy_quote_asset_vol = string;
    type ignored = string;

    export type Candle = [
      candleStickOpeningTime, // Tempo di inizio del candlestick (timestamp)
      openPrice, // Prezzo di apertura
      closePrice, // Prezzo di chiusura
      maxPrice, // Prezzo massimo
      minPrice, // Prezzo minimo
      volume, // Volume
      candleStickClosingTime, // Tempo di chiusura del candlestick (timestamp)
      volume_quoted_symbol, // Volume della moneta quotata
      trades, // Numero di trade
      taker_buy_base_asset_vol, // Taker buy base asset volume
      taker_buy_quote_asset_vol, // Taker buy quote asset volume
      ignored // Ignorato
    ];

    export interface _object {
      [k: string]: string | number | undefined;
    }

    export interface commonOptions extends _object {
      symbol: string;
      timestamp?: number;
      signature?: string;
    }

    export interface getTickerCandlesArgs extends _object {
      symbol: string;
      interval: string;
      limit?: number;
      startTime?: number;
      endTime?: number;
    }
  }
  export namespace WsEndpoints {
    export interface pairDepth {
      (symbol: string, depth?: string): endpoint;
    }
    export interface aggregateTradeStreams {
      (symbol: string): endpoint;
    }
    export interface PairDepthResponse {
      lastUpdateId: number; // Last update ID
      bids: [
        // Bids to be updated
        [
          string, // Price level to be updated
          string // Quantity
        ]
      ];
      asks: [
        // Asks to be updated
        [
          string, // Price level to be updated
          string // Quantity
        ]
      ];
    }
    export class PairDepthResponse {}
    export const pairDepth: pairDepth = (symbol, depth) =>
      `${symbol.toLowerCase()}@depth${depth ? depth : `5`}`;

    export const isPairDepthReponse = (
      response: any
    ): response is Binance.WsEndpoints.PairDepthResponse =>
      response.stream.contains(`@depth`);

    export interface AggregateTradeStreamsResponse {
      e: "aggTrade"; // Event type
      E: number; // Event time
      s: string; // Symbol
      a: number; // Aggregate trade ID
      p: string; // Price
      q: string; // Quantity
      f: number; // First trade ID
      l: number; // Last trade ID
      T: number; // Trade time
      m: boolean; // Is the buyer the market maker?
      M: boolean; // Ignore
    }
    export class AggregateTradeStreamsResponse {}
    export const aggregateTradeStreams: aggregateTradeStreams = symbol =>
      `${symbol.toLowerCase()}@aggTrade`;
    export const isAggregateTradeStreams = (
      response: any
    ): response is Binance.WsEndpoints.AggregateTradeStreamsResponse =>
      response.stream.e === "aggTrade";
  }
}
