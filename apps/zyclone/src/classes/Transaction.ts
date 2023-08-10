import { Currency } from "./Currency";

export namespace Transaction {
  type AnyCurrency = Currency.Currency<any>;
  type coins = Currency.CryptoCurrency.coins;
  type Btc = Currency.CryptoCurrency.Btc.Btc;
  type Btc_ln = Currency.CryptoCurrency.Btc_ln.Btc_ln;
  type CryptoCurrency<C extends coins> =
    Currency.CryptoCurrency.CryptoCurrency<C>;
  type FiatCurrency = Currency.FiatCurrency.FiatCurrency<any>;

  export interface Transaction<C extends AnyCurrency> {
    from: string;
    to: string;
    amount: number;
    currency: C;
  }
  export interface CryptoTx<C extends CryptoCurrency<any>>
    extends Transaction<C> {}

  export interface BtcTx extends CryptoTx<Btc> {}
  export namespace Btc_lnTx {
    export type node_id = string;
    export type address = string;
    export type invoice = string;
    export interface Btc_lnTx extends CryptoTx<Btc_ln> {
      from: node_id | address;
      to: node_id | address | invoice;
    }
  }
  export interface FiatTx extends Transaction<FiatCurrency> {}
}
