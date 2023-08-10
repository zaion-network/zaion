type permitted = number;
type used = number;
type amount = number;
type fee = number;
type address = string;
type from<P extends Exchange.Exchange | Board.Board> =
  | Exchange.CustodialExchange.CustodialExchange
  | User.Peer<P>
  | Agent<P>
  | Agent.Subagent;

namespace Transaction {
  export enum types {
    cash,
    paypal,
    wire,
  }
  export interface Transaction<P extends Exchange.Exchange | Board.Board> {
    txtype: Transaction.types;
    ramp: Ramp.Ramp;
    platform: P;
  }
  namespace Ramp {
    export enum types {
      on,
      off,
    }
    export enum subtypes {
      standard,
      goods,
    }
    export interface Ramp {
      type: Ramp.types;
      subtype: Ramp.subtypes;
    }
    interface StandardRamp extends Ramp {
      subtype: Ramp.subtypes.standard;
    }
    interface GoodsRamp extends Ramp {
      subtype: Ramp.subtypes.goods;
      project: GoodsRamp.Project;
    }
    namespace GoodsRamp {
      export interface Project extends Mixins.name {}
      export namespace Project {
        export enum types {
          nft_release,
        }
      }
    }
  }
}
namespace Mixins {
  export interface buy<P extends Exchange.Exchange | Board.Board> {
    buy(from: from<P>, amount: amount): void;
  }
  export interface sell<P extends Exchange.Exchange | Board.Board> {
    sell(from: from<P>, amount: amount): void;
  }
  export interface name {
    name: string;
  }
  export interface id {
    id: string;
  }
}

namespace Trader {
  export interface Trader<P extends Exchange.Exchange | Board.Board>
    extends Mixins.buy<P>,
      Mixins.sell<P> {
    transactions_history: Transaction.Transaction<P>[];
  }
}

namespace Network {
  export enum types {
    crypto,
    fiat,
  }
  export enum suptypes {
    user,
  }
  export interface Network {
    type: Network.types;
  }
  interface UserNetwork extends Network {
    subtype: Network.suptypes.user;
    networks: UserNetwork[];
  }

  interface CryptoNetwork extends Network {
    type: Network.types.crypto;
    wallet: Wallet.Wallet;
  }
  namespace CryptoNetwork {
    interface LNable extends CryptoNetwork {}
    interface EthereumAble extends CryptoNetwork {}
    interface PolygonAbl extends CryptoNetwork {}
  }
}

interface User<P extends Exchange.Exchange | Board.Board>
  extends Mixins.name,
    Trader.Trader<P> {
  type: User.types;
}
namespace User {
  export enum types {
    owner,
    admin,
    peer,
  }
  export interface Owner<P extends Exchange.Exchange | Board.Board>
    extends User<P> {}
  export interface Admin<P extends Exchange.Exchange | Board.Board>
    extends User<P> {}
  export interface Peer<P extends Exchange.Exchange | Board.Board>
    extends User<P> {}
  export interface Client<P extends Exchange.Exchange | Board.Board>
    extends User<P> {}
  export namespace Client {
    export enum types {
      peer,
      digital,
    }
  }
}

interface Agent<P extends Exchange.Exchange | Board.Board>
  extends User<P>,
    ArbitrageManager<P>,
    Agent.Mixins.acceptRequest,
    Agent.Mixins.creditlines<P>,
    Agent.Mixins.submitRequest {
  subagents: Agent.Subagent[];
}
namespace Agent {
  export interface Subagent
    extends Agent.Mixins.creditlines<Exchange.Exchange>,
      Agent.Mixins.submitRequest {
    agents: Agent<Exchange.Exchange>[];
  }
  export interface Request<P extends Exchange.Exchange | Board.Board> {
    type: Request.types;
    subtype: Request.subtypes;
    direction: [Agent<P> | Subagent, Agent<P> | Subagent];
  }
  export namespace Request {
    export enum types {
      agent,
      subagent,
    }
    export enum subtypes {
      newCreditline,
      newCredit,
      subAgentApproval,
      subAgentInvitation,
    }
  }
  export namespace Mixins {
    export interface creditlines<P extends Exchange.Exchange | Board.Board> {
      creditlines: Creditline<P>[];
    }
    export interface requests<P extends Exchange.Exchange | Board.Board> {
      requests: Agent.Request<P>;
    }
    export interface acceptRequest {
      acceptRequest(type: Request.subtypes): void;
    }
    export interface submitRequest {
      submitRequest(type: Request.subtypes): void;
    }
  }
}

interface Creditline<P extends Exchange.Exchange | Board.Board> {
  types: Creditline.types;
  agent: Agent<P>;
  subagent: Agent.Subagent;
  permitted: permitted;
  used: used;
  create(): void;
  repayCredit(): void;
  close(): void;
}

namespace Creditline {
  export enum types {
    cash,
    paypal,
    wire,
  }
  export interface Repayment {
    type: repaymentTypes;
  }
  export enum repaymentTypes {
    same,
    transaction,
  }
  interface Credit<P extends Exchange.Exchange | Board.Board>
    extends Mixins.id {
    type: Creditline.types;
    creditline: Creditline<P>;
    amount: amount;
    repayment: null | Creditline.Repayment;
  }
}

interface ArbitrageManager<P extends Exchange.Exchange | Board.Board>
  extends Mixins.buy<P>,
    Mixins.sell<P> {
  tokens: [Product.Currency, Product.Currency];
  amounts: [number, number];
  rebalance(): void;
}
namespace Arbitrage {
  export enum types {
    symmetric,
    asymmetric,
  }
}

export namespace Fee {
  export interface Fee {
    network: string;
    fee_amount: number;
    currency: Product.Currency;
    min_tx_amount: number;
  }
}

export namespace Product {
  export namespace Good {
    export interface Good {}
  }

  export namespace Service {
    export interface Service {}
  }
  export interface Currency {
    type: Currency.currencyTypes;
  }
  export namespace Currency {
    export enum currencyTypes {
      fiat,
      crypto,
    }
    export enum fiatTypes {
      eur,
    }
    export enum cryptTypes {
      btc_ln,
      btc,
      polygon,
      eth,
      usdt,
      usdc,
    }
  }
}

export namespace Order {
  export interface Order<OB extends Exchange.Exchange | Board.Board> {
    date: Date;
    amount: number;
    sell_product:
      | Product.Currency
      | Product.Good.Good
      | Product.Service.Service;
    buy_currency: Product.Currency;
    order_book: OB;
  }
  export interface ExchangeOrder<OB extends Exchange.Exchange>
    extends Order<OB> {}
}

export namespace Board {
  export interface Board {}
}

export namespace Exchange {
  export enum types {
    custodial,
    decentralized,
  }
  export interface Exchange
    extends Mixins.name,
      Mixins.buy<Exchange>,
      Mixins.sell<Exchange> {
    deposit(): void;
    withdraw(): void;
    placeOrder(order: Order.ExchangeOrder<this>): void;
    fees: Fee.Fee[];
  }
  export namespace CustodialExchange {
    export interface CustodialExchange extends Exchange {}
    export interface Binance extends CustodialExchange {}
    export interface Coinbase extends CustodialExchange {}
    export interface Breez extends CustodialExchange {}
  }
}

export namespace Wallet {
  export enum types {
    alby,
    metamask,
    blue,
    breez,
  }
  export interface Wallet {
    type: Wallet.types;
    addresses: address[];
    networks: Network.Network[];
  }
}

export namespace Utils {
  interface BTCPricer {
    type: BTCPricer.types;
  }
  namespace BTCPricer {
    export enum types {
      crypto,
      goods,
    }
    interface Crypto extends BTCPricer {
      type: BTCPricer.types.crypto;
      fee: fee;
    }

    export const sat_to_btc = (sat: number) => sat / 10 ** 8;
    export const btc_to_sat = (btc: number) => btc * 10 ** 8;
    export const round = (sig_int: number) => Math.round(sig_int);
    export const round_prec = (sig_int: number, precision: number) =>
      Math.round(sig_int * precision) / precision;
  }
}
