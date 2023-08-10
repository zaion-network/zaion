import { Currency } from "./Currency";
import { Fee } from "./Fee";
import { Receipt } from "./Receipt";

export namespace ExchangePlatform {
  type importo = number;
  type totale = number;
  export enum exchanges {
    binance = "binance",
  }
  export interface ExchangePlatform<E extends exchanges> {
    exchange: E;
    withdrawfees: Fee.Fee<Fee.fees.withdraw, any, any>[];
    depositfees: Fee.DepositFee.DepositFee<any>[];
    withdraw<C extends Currency.Currency<any>>(
      amount: number
    ): Receipt.Receipt<ExchangePlatform<E>, Fee.fees.withdraw, C>;
    deposit<C extends Currency.Currency<any>>(
      amount: number,
      currency: C
    ): Receipt.Receipt<
      ExchangePlatform.ExchangePlatform<E>,
      Fee.fees.deposit,
      C
    >;
    performExchange<
      B extends Currency.Currency<any>,
      S extends Currency.Currency<any>,
      F extends Currency.Currency<any>
    >(
      buy: B,
      sell: S,
      fees: F,
      amount: importo | totale
    ): Receipt.Exchange.Exchange<ExchangePlatform.ExchangePlatform<E>, B, F, S>;
  }
  export class ExchangePlatform<E extends exchanges>
    implements ExchangePlatform<E>
  {
    constructor(public exchange: E) {
      this.withdrawfees = [];
      this.depositfees = [];
    }
  }

  export namespace Binance {
    export interface Binance extends ExchangePlatform<exchanges.binance> {
      deposit<C extends Currency.Currency<any>>(
        amount: number,
        currency: C
      ): Receipts.Deposit.Deposit<C>;
    }

    export class Binance
      extends ExchangePlatform<exchanges.binance>
      implements Binance.Binance
    {
      constructor() {
        super(exchanges.binance);
      }

      deposit<C extends Currency.Currency<any>>(
        amount: number,
        currency: C
      ): Binance.Receipts.Deposit.Deposit<any> {
        return new Receipts.Deposit.DepositEurReceipt.DepositEurReceipt(amount);
      }
    }

    export namespace Receipts {
      export namespace Deposit {
        export interface Deposit<C extends Currency.Currency<any>>
          extends Receipt.Deposit.Deposit<Binance, C> {}

        export class Deposit<C extends Currency.Currency<any>>
          extends Receipt.Deposit.Deposit<Binance, C>
          implements Deposit<C>
        {
          constructor(
            amount: number,
            currency: C,
            fee: Fee.DepositFee.DepositFee<C>,
            source: Binance
          ) {
            super(amount, currency, fee, source);
          }
        }
        export namespace DepositEurReceipt {
          export interface DepositEurReceipt
            extends Deposit<Currency.FiatCurrency.Eur.Eur> {}

          export class DepositEurReceipt extends Deposit<Currency.FiatCurrency.Eur.Eur> {
            constructor(amount: number) {
              super(
                amount,
                new Currency.FiatCurrency.Eur.Eur(),
                new Fee.DepositFee.DepositEur(1, 0),
                new Binance()
              );
            }
          }
        }
      }
      export namespace Exchange {
        export interface Exchange<
          C extends Currency.Currency<any>,
          F extends Currency.Currency<any>,
          P extends Currency.Currency<any>
        > extends Receipt.Exchange.Exchange<Binance, C, F, P> {}

        export class Exchange<
            C extends Currency.Currency<any>,
            F extends Currency.Currency<any>,
            P extends Currency.Currency<any>
          >
          extends Receipt.Exchange.Exchange<Binance, C, F, P>
          implements Exchange<C, F, P>
        {
          constructor(
            amount: number,
            currency: C,
            fee: Fee.Fee<Fee.fees.exchange, F, Fee.calculationTypes.percentage>,
            purchaseCurrency: P
          ) {
            super(amount, currency, fee, new Binance(), purchaseCurrency);
          }
        }

        export namespace BTCEUR {
          export interface BTCEUR
            extends Exchange<
              Currency.CryptoCurrency.Btc.Btc,
              Currency.CryptoCurrency.Bnb.Bnb,
              Currency.FiatCurrency.Eur.Eur
            > {}

          export class BTCEUR
            extends Exchange<
              Currency.CryptoCurrency.Btc.Btc,
              Currency.CryptoCurrency.Bnb.Bnb,
              Currency.FiatCurrency.Eur.Eur
            >
            implements BTCEUR
          {
            constructor(amount: number) {
              const fee = new Fee.ExchangeFee.ExchangeFee(
                amount,
                new Currency.CryptoCurrency.Bnb.Bnb(),
                0,
                0.0075
              );
              super(
                amount,
                new Currency.CryptoCurrency.Btc.Btc(),
                fee,
                new Currency.FiatCurrency.Eur.Eur()
              );
            }
          }
        }
      }
    }

    export class BinanceDepositEurFee extends Fee.DepositFee.DepositEur {
      constructor() {
        super(1, 0);
      }
    }
  }
}
