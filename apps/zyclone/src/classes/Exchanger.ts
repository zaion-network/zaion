import { Currency } from "./Currency";

export namespace Exchanger {
  export interface Exchanger<
    A extends Currency.Currency<any>,
    B extends Currency.Currency<any>,
    P extends PriceOracle.priceoracles
  > {
    pair: [A, B];
    perform_exchange_on_total(amount: number): number;
    perform_exchange_on_import(amount: number): number;
    exhangeRates: ExchangeRate.ExchangeRate<A, B, P>[];
  }

  export namespace ExchangeRate {
    export interface ExchangeRate<
      A extends Currency.Currency<any>,
      B extends Currency.Currency<any>,
      P extends PriceOracle.priceoracles
    > {
      pair: [A, B];
      source: P;
      value: number;
    }
    export class ExchangeRate<
      A extends Currency.Currency<any>,
      B extends Currency.Currency<any>,
      P extends PriceOracle.priceoracles
    > implements ExchangeRate<A, B, P>
    {
      constructor(
        public pair: [A, B],
        public source: P,
        public value: number
      ) {}
    }

    export namespace Binance {
      export interface BinanceExhangeRate<
        A extends Currency.Currency<any>,
        B extends Currency.Currency<any>
      > extends ExchangeRate<A, B, PriceOracle.priceoracles.binance> {}

      export class BinanceExhangeRate<
          A extends Currency.Currency<any>,
          B extends Currency.Currency<any>
        >
        extends ExchangeRate<A, B, PriceOracle.priceoracles.binance>
        implements BinanceExhangeRate<A, B>
      {
        constructor(pair: [A, B], value: number) {
          super(pair, PriceOracle.priceoracles.binance, value);
        }
      }

      export namespace Btc_Eur {
        export interface Btc_Eur
          extends BinanceExhangeRate<
            Currency.CryptoCurrency.Btc.Btc,
            Currency.FiatCurrency.Eur.Eur
          > {}
        export class Btc_Eur extends BinanceExhangeRate<
          Currency.CryptoCurrency.Btc.Btc,
          Currency.FiatCurrency.Eur.Eur
        > {
          constructor(value: number) {
            super(
              [
                new Currency.CryptoCurrency.Btc.Btc(),
                new Currency.FiatCurrency.Eur.Eur(),
              ],
              value
            );
          }
        }
      }
    }
  }

  export namespace PriceOracle {
    type PricePromise<
      A extends Currency.Currency<any>,
      B extends Currency.Currency<any>
    > = (pair: [A, B]) => Promise<number>;
    export enum priceoracles {
      binance = "binance",
      coinbase = "coinbase",
      coinmarketcap = "coinmarketcap",
    }

    export interface PriceOracle<
      A extends Currency.Currency<any>,
      B extends Currency.Currency<any>,
      T extends priceoracles
    > {
      type: T;
      getPrice(cb: PricePromise<A, B>, pair: [A, B]): Promise<() => number>;
      getExchangeRate(
        cb: PricePromise<A, B>,
        pair: [A, B],
        source: T
      ): Promise<() => ExchangeRate.ExchangeRate<A, B, T>>;
    }

    export class PriceOracle<
      A extends Currency.Currency<any>,
      B extends Currency.Currency<any>,
      T extends PriceOracle.priceoracles
    > implements PriceOracle<A, B, T>
    {
      constructor(public type: T) {}
      async getPrice(
        cb: (pair: [A, B]) => Promise<number>,
        pair: [A, B]
      ): Promise<() => number> {
        let res = await cb(pair);
        return () => res;
      }
      async getExchangeRate(
        cb: PricePromise<A, B>,
        pair: [A, B],
        source: T
      ): Promise<() => ExchangeRate.ExchangeRate<A, B, T>> {
        const price = (await this.getPrice(cb, pair))();
        return () => new ExchangeRate.ExchangeRate(pair, source, price);
      }
    }

    export namespace Binance {
      export interface Binance<
        A extends Currency.Currency<any>,
        B extends Currency.Currency<any>
      > extends PriceOracle<A, B, priceoracles.binance> {}

      export class Binance<
          A extends Currency.Currency<any>,
          B extends Currency.Currency<any>
        >
        extends PriceOracle<A, B, priceoracles.binance>
        implements Binance<A, B>
      {
        constructor() {
          super(priceoracles.binance);
        }
      }

      export namespace Btc_Eur {
        export interface Btc_Eur
          extends PriceOracle<
            Currency.CryptoCurrency.Btc.Btc,
            Currency.FiatCurrency.Eur.Eur,
            priceoracles.binance
          > {
          getExchangeRate(
            cb: PricePromise<
              Currency.CryptoCurrency.Btc.Btc,
              Currency.FiatCurrency.Eur.Eur
            >,
            pair: [
              Currency.CryptoCurrency.Btc.Btc,
              Currency.FiatCurrency.Eur.Eur
            ]
          ): Promise<
            () => ExchangeRate.ExchangeRate<
              Currency.CryptoCurrency.Btc.Btc,
              Currency.FiatCurrency.Eur.Eur,
              priceoracles.binance
            >
          >;
        }

        export class Btc_Eur
          extends PriceOracle<
            Currency.CryptoCurrency.Btc.Btc,
            Currency.FiatCurrency.Eur.Eur,
            priceoracles.binance
          >
          implements Btc_Eur
        {
          constructor() {
            super(priceoracles.binance);
          }

          override async getExchangeRate(
            cb: PricePromise<
              Currency.CryptoCurrency.Btc.Btc,
              Currency.FiatCurrency.Eur.Eur
            >,
            pair: [
              Currency.CryptoCurrency.Btc.Btc,
              Currency.FiatCurrency.Eur.Eur
            ]
          ): Promise<
            () => ExchangeRate.ExchangeRate<
              Currency.CryptoCurrency.Btc.Btc,
              Currency.FiatCurrency.Eur.Eur,
              priceoracles.binance
            >
          > {
            const price = (await this.getPrice(cb, pair))();
            return () => new ExchangeRate.Binance.Btc_Eur.Btc_Eur(price);
          }
        }
      }
    }
  }
}
