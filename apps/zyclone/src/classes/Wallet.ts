import { Currency } from "./Currency";

export namespace Wallet {
  export interface Wallet<W extends wallets> {
    wallet: W;
    receive<C extends Currency.Currency<any>>(
      amount: number,
      currency: C
    ): void;
    send<C extends Currency.Currency<any>>(amount: number, currency: C): void;
  }
  enum wallets {
    breez,
    alby,
  }
  export interface AlbyWallet extends Wallet<wallets.alby> {}
  export interface BreezWallet extends Wallet<wallets.breez> {}
}
