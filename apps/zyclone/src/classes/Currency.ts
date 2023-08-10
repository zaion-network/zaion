export namespace Currency {
  export enum currencies {
    fiat = "fiat",
    crypto = "crypto",
  }
  export interface Currency<C extends currencies> {
    type: C;
  }
  export class Currency<C extends currencies> implements Currency<C> {
    constructor(public type: C) {}
  }

  export namespace CryptoCurrency {
    export enum coins {
      btc = "btc",
      btc_ln = "btc_ln",
      bnb = "bnb",
    }

    export interface CryptoCurrency<T extends coins>
      extends Currency<currencies.crypto> {
      coin: T;
    }
    export class CryptoCurrency<T extends coins>
      extends Currency<currencies.crypto>
      implements CryptoCurrency<T>
    {
      constructor(public coin: T) {
        super(currencies.crypto);
      }
    }

    export namespace Btc {
      export interface Btc extends CryptoCurrency<coins.btc> {}
      export class Btc extends CryptoCurrency<coins.btc> implements Btc {
        constructor() {
          super(coins.btc);
        }
      }
    }

    export namespace Btc_ln {
      type Btc_lnType = CryptoCurrency<coins.btc_ln>;
      export interface Btc_ln extends Btc_lnType {}
      export class Btc_ln
        extends CryptoCurrency<coins.btc_ln>
        implements Btc_ln
      {
        constructor() {
          super(coins.btc_ln);
        }
      }
    }

    export namespace Bnb {
      export interface Bnb extends CryptoCurrency<coins.bnb> {}
      export class Bnb extends CryptoCurrency<coins.bnb> implements Bnb.Bnb {
        constructor() {
          super(coins.bnb);
        }
      }
    }
  }

  export namespace FiatCurrency {
    export enum fiats {
      eur = "eur",
    }
    export interface FiatCurrency<T extends fiats>
      extends Currency<currencies.fiat> {
      fiat: T;
    }
    export class FiatCurrency<T extends fiats>
      extends Currency<currencies.fiat>
      implements FiatCurrency<T>
    {
      constructor(public fiat: T) {
        super(currencies.fiat);
      }
    }

    export namespace Eur {
      export interface Eur extends FiatCurrency<fiats.eur> {}
      export class Eur extends FiatCurrency<fiats.eur> implements Eur {
        constructor() {
          super(fiats.eur);
        }
      }
    }
  }
}
