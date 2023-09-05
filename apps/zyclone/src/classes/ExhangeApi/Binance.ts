import { TopUtilities } from "@zaionstate/zaionbase";
import { ExchangeApi } from "../ExchangeApi";

const httpRequest = TopUtilities.Node.Https.httpRequest;
const hmacIt = TopUtilities.Node.Crypto.hmacIt;
const encodeQueryParamFromObj =
  TopUtilities.JavaScript.ObjectUtils.encodeQueryParamFromObj;
const PathBuilder =
  TopUtilities.JavaScript.String_utils.PathBuilder.PathBuilder;

export namespace Binance {
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

  enum endpoints {
    price = "/api/v3/ticker/price",
    klines = "/api/v3/klines",
    allOrders = "/api/v3/allOrders",
    myTrades = "/api/v3/myTrades",
    order = "/api/v3/order",
  }

  enum timesInForce {
    GTC = "GTC",
  }

  enum headersFields {
    contenType = "Content-Type",
  }

  enum contentTypes {
    app_urlencoded = "application/x-www-form-urlencoded",
  }

  export interface Price {
    symbol: string;
    price: string;
  }

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

  export type Order = {
    symbol: string;
    orderId: number;
    orderListId: number;
    clientOrderId: string;
    price: string;
    origQty: string;
    executedQty: string;
    cummulativeQuoteQty: string;
    status: string;
    timeInForce: string;
    type: string;
    side: string;
    stopPrice: string;
    icebergQty: string;
    time: number;
    updateTime: number;
    isWorking: boolean;
    origQuoteOrderQty?: string;
    commission: string;
  };

  export interface OrderDetails {
    symbol: string;
    id: number;
    orderId: number;
    orderListId: number;
    price: string;
    qty: string;
    quoteQty: string;
    commission: string;
    commissionAsset: string;
    time: number;
    isBuyer: boolean;
    isMaker: boolean;
    isBestMatch: boolean;
  }

  export interface OrderResponse {
    symbol: string;
    orderId: number;
    orderListId: number;
    clientOrderId: string;
    transactTime: number;
    price: string;
    origQty: string;
    executedQty: string;
    cummulativeQuoteQty: string;
    status: string;
    timeInForce: string;
    type: string;
    side: string;
    fills: Fill[];
  }

  export interface Fill {
    price: string;
    qty: string;
    commission: string;
    commissionAsset: string;
  }

  export interface OrderCancellationResponse {
    symbol: string;
    origClientOrderId: string;
    orderId: number;
    orderListId: number;
    clientOrderId: string;
    transactTime: number;
    price: string;
    origQty: string;
    executedQty: string;
    cummulativeQuoteQty: string;
    status: string;
    timeInForce: string;
    type: string;
    side: string;
  }

  export interface BinanceApi
    extends ExchangeApi.ExchangeApi<Price, Candle, Order, OrderDetails> {}
  export class BinanceApi extends ExchangeApi.ExchangeApi<
    Price,
    Candle,
    Order,
    OrderDetails
  > {
    constructor(API_KEY: string, API_SEC: string) {
      super(API_KEY, API_SEC, { source: ExchangeApi.sources.binance });
    }

    requester<T, H = undefined>(
      method: string
    ): (props: ExchangeApi.getterProps<H>) => Promise<T> {
      return async function (props) {
        return await httpRequest<T>({
          hostname: ExchangeApi.sources.binance,
          path: props.path,
          method: method,
          headers: props.headers,
        })(props.body);
      };
    }
    headers_1: ExchangeApi._object = { "X-MBX-APIKEY": this.API_KEY };

    async getter<T, H = undefined>(
      props: ExchangeApi.getterProps<H>
    ): Promise<T> {
      return this.requester<T, H>(httpRequest.requestTypes.get)(props);
    }
    async poster<T, H = undefined>(
      props: ExchangeApi.getterProps<H>
    ): Promise<T> {
      return this.requester<T, H>(httpRequest.requestTypes.post)(props);
    }
    async deleter<T, H = undefined>(
      props: ExchangeApi.getterProps<H>
    ): Promise<T> {
      return this.requester<T, H>(httpRequest.requestTypes.delete)(props);
    }

    async getTickerPrice(
      props: ExchangeApi.getTickerPriceProps
    ): Promise<Price> {
      const path = new PathBuilder(endpoints.price)
        .setEncoder(encodeQueryParamFromObj)
        .build(props);
      return await this.getter<Price>({ path });
    }

    async getTickerCandles(
      props: ExchangeApi.getTickerCandlesArgs
    ): Promise<Candle> {
      const path = new PathBuilder(endpoints.klines)
        .setEncoder(encodeQueryParamFromObj)
        .build(props);
      return await this.getter<Candle>({ path });
    }

    async getOrders(props: ExchangeApi.getOrdersProps): Promise<Order[]> {
      const path = new PathBuilder(endpoints.allOrders, {
        timestamped: true,
        signed: true,
        secret: this.API_SEC,
      })
        .setEncoder(encodeQueryParamFromObj)
        .setHasher(hmacIt)
        .build(props);
      const headers = this.headers_1;
      return await this.getter<Order[], typeof headers>({ path, headers });
    }

    async getOrdersDetails(
      props: ExchangeApi.getOrdersDetailsProps
    ): Promise<OrderDetails[]> {
      const path = new PathBuilder(endpoints.myTrades, {
        signed: true,
        timestamped: true,
        secret: this.API_SEC,
      })
        .setEncoder(encodeQueryParamFromObj)
        .setHasher(hmacIt)
        .build(props);
      const headers = this.headers_1;
      return await this.getter<OrderDetails[], typeof headers>({
        path,
        headers,
      });
    }

    async createOrder(props: ExchangeApi.createOrderProps): Promise<Order> {
      if (!props.timeInForce) props.timeInForce = timesInForce.GTC;
      const pathbuilder = new PathBuilder(endpoints.order, {
        timestamped: true,
        signed: true,
        secret: this.API_SEC,
        payload: true,
      });
      const body = pathbuilder
        .setEncoder(encodeQueryParamFromObj)
        .setHasher(hmacIt)
        .build(props);
      this.headers_1[headersFields.contenType] = contentTypes.app_urlencoded;
      const headers = this.headers_1;
      return await this.poster<Order, typeof headers>({
        path: pathbuilder.endpoint,
        headers,
        body,
      });
    }

    async cancelOrder(props: ExchangeApi.cancelOrderProps): Promise<any> {
      const path = new PathBuilder(endpoints.order, {
        timestamped: true,
        signed: true,
        secret: this.API_SEC,
      })
        .setEncoder(encodeQueryParamFromObj)
        .setHasher(hmacIt)
        .build(props);
      const headers = this.headers_1;
      return await this.deleter<OrderDetails[], typeof headers>({
        path,
        headers,
      });
    }
  }
}
