import { Currency } from "./Currency";

export namespace Fee {
  type AnyCurrency = Currency.Currency<any>;
  export enum fees {
    withdraw = "withdraw",
    deposit = "deposit",
    exchange = "exchange",
    tx = "tx",
  }
  export enum calculationTypes {
    fixed = "fixed",
    percentage = "percentage",
  }
  export interface Fee<
    T extends fees,
    C extends AnyCurrency,
    Ct extends calculationTypes
  > {
    type: T;
    calculationType: Ct;
    amount: number;
    currency: C;
    min_tx_amount: number;
  }

  export class Fee<
    T extends fees,
    C extends AnyCurrency,
    Ct extends Fee.calculationTypes
  > implements Fee<T, C, Ct>
  {
    constructor(
      public type: T,
      public calculationType: Ct,
      public amount: number,
      public currency: C,
      public min_tx_amount: number
    ) {}
  }

  export namespace FixedFee {
    export interface FixedFee<T extends fees, C extends AnyCurrency>
      extends Fee<T, C, calculationTypes.fixed> {}

    export class FixedFee<T extends fees, C extends AnyCurrency>
      extends Fee<T, C, calculationTypes.fixed>
      implements FixedFee<T, C>
    {
      constructor(type: T, amount: number, currency: C, min_tx_amount: number) {
        super(type, calculationTypes.fixed, amount, currency, min_tx_amount);
      }
    }
  }

  export namespace PercentageFee {
    export interface PercentageFee<T extends fees, C extends AnyCurrency>
      extends Fee<T, C, calculationTypes.percentage> {
      percentage: number;
      calculateFee(): number;
    }

    export class PercentageFee<T extends fees, C extends AnyCurrency>
      extends Fee<T, C, calculationTypes.percentage>
      implements PercentageFee<T, C>
    {
      constructor(
        type: T,
        amount: number,
        currency: C,
        min_tx_amount: number,
        public percentage: number
      ) {
        super(
          type,
          calculationTypes.percentage,
          amount * percentage,
          currency,
          min_tx_amount
        );
      }
    }
  }

  export namespace DepositFee {
    export interface DepositFee<C extends AnyCurrency>
      extends FixedFee.FixedFee<Fee.fees.deposit, C> {}

    export class DepositFee<C extends AnyCurrency>
      extends FixedFee.FixedFee<fees.deposit, C>
      implements DepositFee<C>
    {
      constructor(amount: number, currency: C, min_tx_amount: number) {
        super(fees.deposit, amount, currency, min_tx_amount);
      }
    }

    export class DepositEur
      extends DepositFee<Currency.FiatCurrency.Eur.Eur>
      implements DepositEur.DepositEur
    {
      constructor(amount: number, min: number) {
        super(amount, new Currency.FiatCurrency.Eur.Eur(), min);
      }
    }
    export namespace DepositEur {
      export interface DepositEur
        extends DepositFee<Currency.FiatCurrency.Eur.Eur> {}
    }
  }

  export namespace ExchangeFee {
    export interface ExchangeFee<C extends AnyCurrency>
      extends PercentageFee.PercentageFee<fees.exchange, C> {}

    export class ExchangeFee<C extends AnyCurrency>
      extends PercentageFee.PercentageFee<fees.exchange, C>
      implements ExchangeFee<C>
    {
      constructor(
        amount: number,
        currency: C,
        min_tx_amount: number,
        public percentage: number
      ) {
        super(fees.exchange, amount, currency, min_tx_amount, percentage);
      }
    }
  }

  export namespace WithdrawFee {
    export interface WithdrawFee<C extends AnyCurrency>
      extends Fee<fees.withdraw, C, Fee.calculationTypes.fixed> {}

    export class WithdrawFee<C extends AnyCurrency>
      extends Fee<fees.withdraw, C, calculationTypes.fixed>
      implements WithdrawFee<C>
    {
      constructor(amount: number, currency: C, min_tx_amount: number) {
        super(
          fees.withdraw,
          calculationTypes.fixed,
          amount,
          currency,
          min_tx_amount
        );
      }
    }
  }

  export namespace TxFee {
    export interface TxFeee<C extends AnyCurrency>
      extends Fee<fees.tx, C, Fee.calculationTypes.fixed> {}

    export class TxFee<C extends AnyCurrency>
      extends Fee<fees.tx, C, Fee.calculationTypes.fixed>
      implements TxFeee<C>
    {
      constructor(amount: number, currency: C, min_tx_amount: number) {
        super(fees.tx, calculationTypes.fixed, amount, currency, min_tx_amount);
      }
    }
  }
}
