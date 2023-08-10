import { Currency } from "./Currency";
import { ExchangePlatform } from "./ExchangePlatform";
import { Fee } from "./Fee";
import { Wallet } from "./Wallet";

export namespace Receipt {
  type AnyExchangePlatform = ExchangePlatform.ExchangePlatform<any>;
  type AnyWallet = Wallet.Wallet<any>;
  type AnyCurrency = Currency.Currency<any>;
  export interface Receipt<
    S extends AnyWallet | AnyExchangePlatform,
    T extends Fee.fees,
    C extends AnyCurrency,
    F extends AnyCurrency = C
  > {
    amount: number;
    currency: AnyCurrency;
    fee: Fee.Fee<T, F, any>;
    source: S;
  }

  export class Receipt<
    S extends AnyWallet | AnyExchangePlatform,
    T extends Fee.fees,
    C extends AnyCurrency,
    F extends AnyCurrency = C
  > implements Receipt<S, T, C, F>
  {
    constructor(
      public amount: number,
      public currency: AnyCurrency,
      public fee: Fee.Fee<T, F, any>,
      public source: S
    ) {}
  }

  export namespace Exchange {
    export interface Exchange<
      S extends AnyExchangePlatform,
      C extends AnyCurrency,
      F extends AnyCurrency,
      P extends AnyCurrency
    > extends Receipt<S, Fee.fees.exchange, C, F> {
      purchaseCurrency: P;
    }

    export class Exchange<
        S extends AnyExchangePlatform,
        C extends AnyCurrency,
        F extends AnyCurrency,
        P extends AnyCurrency
      >
      extends Receipt<S, Fee.fees.exchange, C, F>
      implements Exchange<S, C, F, P>
    {
      constructor(
        amount: number,
        currency: C,
        fee: Fee.Fee<Fee.fees.exchange, F, Fee.calculationTypes.percentage>,
        source: S,
        public purchaseCurrency: P
      ) {
        super(amount, currency, fee, source);
      }
    }
  }

  export namespace Tx {
    export interface Tx<
      S extends Wallet.Wallet<any> | ExchangePlatform.ExchangePlatform<any>
    > extends Receipt<S, Fee.fees.tx, Currency.Currency<any>> {}
  }

  export namespace Deposit {
    export interface Deposit<
      S extends ExchangePlatform.ExchangePlatform<any>,
      C extends Currency.Currency<any>
    > extends Receipt<S, Fee.fees.deposit, C> {}

    export class Deposit<
        S extends ExchangePlatform.ExchangePlatform<any>,
        C extends Currency.Currency<any>
      >
      extends Receipt<S, Fee.fees.deposit, C>
      implements Deposit<S, C>
    {
      constructor(
        amount: number,
        currency: Currency.Currency<any>,
        fee: Fee.Fee<Fee.fees.deposit, any, any>,
        source: S
      ) {
        super(amount, currency, fee, source);
      }
    }
  }

  export namespace Withdraw {
    export interface Withdraw<S extends ExchangePlatform.ExchangePlatform<any>>
      extends Receipt<S, Fee.fees.withdraw, Currency.Currency<any>> {}
  }
}
