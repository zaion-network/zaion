interface ITokenHolder {
  address: string;
  tokens: Token[];
  addToken(token: Token): void;
}

class TokenHolder implements ITokenHolder {
  address: string;
  tokens: Token[];
  constructor() {
    this.address = Math.round(Math.random() * 100_000).toString();
    this.tokens = [];
  }
  addToken(token: Token): void {
    this.tokens.push(token);
  }
}

export interface AMM extends ITokenHolder {
  tokens: [Token, Token];
  amount: [number, number];
  A_B(): number;
  B_A(): number;
  exchangeA(amount: number, holder: TokenHolder): number;
  exchangeB(amount: number, holder: TokenHolder): number;
  addB(amount: number, holder: TokenHolder): void;
  addASymm(amount: number, holder: TokenHolder): void;
  showAmount(): void;
  showTokens(): void;
}

export class AMM extends TokenHolder implements AMM {
  private precision = 10000;
  constructor(public tokens: [Token, Token], public amount: [number, number]) {
    super();
  }
  private exchange(
    amount: number,
    direction: AMM.direction,
    balances: [number, number],
    tokens: [Token, Token],
    holder: TokenHolder
  ) {
    const exchanged = this.round(
      this.ratio([direction[1], direction[0]]) * amount
    );
    balances[direction[1]] = balances[direction[1]] - exchanged;
    tokens[direction[1]].transferFrom(this, holder, exchanged);
    balances[direction[0]] = balances[direction[0]] + amount;
    tokens[direction[0]].transferFrom(holder, this, amount);
    return exchanged;
  }
  private add(
    direction: AMM.direction,
    amount: number,
    balances: [number, number],
    tokens: [Token, Token],
    holder: TokenHolder
  ) {
    balances[direction[0]] = balances[direction[0]] + amount;
    tokens[direction[0]].transferFrom(holder, this, amount);
  }
  private addSymm(
    direction: AMM.direction,
    amount: number,
    balances: [number, number],
    tokens: [Token, Token],
    holder: TokenHolder
  ) {
    const exchanged = amount * this.ratio(direction);

    balances[direction[1]] = balances[direction[1]] + amount;
    tokens[direction[1]].transferFrom(holder, this, amount);
    balances[direction[0]] = balances[direction[0]] + exchanged;
    tokens[direction[0]].transferFrom(holder, this, exchanged);
  }
  addASymm(amount: number, holder: TokenHolder): void {
    this.addSymm([0, 1], amount, this.amount, this.tokens, holder);
  }
  addB(amount: number, holder: TokenHolder): void {
    this.add([1, 0], amount, this.amount, this.tokens, holder);
  }
  exchangeA(amount: number, holder: TokenHolder) {
    return this.exchange(amount, [0, 1], this.amount, this.tokens, holder);
  }
  exchangeB(amount: number, holder: TokenHolder) {
    return this.exchange(amount, [1, 0], this.amount, this.tokens, holder);
  }
  private round(amount: number) {
    return Math.round(amount * this.precision) / this.precision;
  }
  private ratio(direction: AMM.direction) {
    if (this.amount[direction[0]] === 0 && this.amount[direction[1]] === 0)
      return 1;
    return this.round(this.amount[direction[0]] / this.amount[direction[1]]);
  }
  A_B = () => {
    return this.ratio([0, 1]);
  };
  B_A = () => {
    return this.ratio([1, 0]);
  };
  showAmount() {
    console.log(this.amount);
  }
  showTokens(): void {
    console.log(this.tokens);
  }
}
export namespace AMM {
  export type direction = [0 | 1, 0 | 1];
}

export interface Token {
  name: string;
  decimals: number;
  supply: number;
  balances: Map<TokenHolder["address"], number>;
  mint(to: TokenHolder, amount: number): void;
  transfer(to: TokenHolder, amount: number): void;
  transferFrom(from: TokenHolder, to: TokenHolder, amount: number): void;
}

export class Token implements Token {
  constructor(public name: string, public supply: number = 0) {
    this.balances = new Map();
  }
  private addSupply(amount: number) {
    this.supply = +amount;
  }
  private createBalance(holder: TokenHolder) {
    this.balances.set(holder.address, 0);
    holder.tokens.push(this);
  }
  private setNewBalance(holder: TokenHolder, amount: number) {
    this.balances.set(holder.address, amount);
  }
  mint(to: TokenHolder, amount: number): void {
    this.addSupply(amount);
    if (!this.balances.get(to.address)) this.createBalance(to);
    this.setNewBalance(to, this.balances.get(to.address)! + amount);
    console.log(`minted ${this.balances.get(to.address)} to: ${to.address}`);
  }
  transferFrom(from: TokenHolder, to: TokenHolder, amount: number): void {
    const prevsrcbalance = this.balances.get(from.address);
    if (!prevsrcbalance) this.createBalance(from);

    const prevtrgbalance = this.balances.get(to.address);
    if (!prevtrgbalance) this.createBalance(to);

    if (this.balances.get(from.address)! < amount)
      throw new Error("not enough balance");
    const currentsrcbalance = this.balances.get(from.address)! - amount;
    const currenttrgbalance = this.balances.get(to.address)! + amount;
    this.setNewBalance(from, currentsrcbalance);
    this.setNewBalance(to, currenttrgbalance);
  }
}

export interface IDeveloper extends TokenHolder {
  name: string;
  tokenbalance: number;
  withdraw(amm: AMM, amount: number): void;
  showbalance(): void;
}
export class Developer extends TokenHolder implements IDeveloper {
  constructor(public name: string, public tokenbalance: number) {
    super();
  }
  withdraw(amm: AMM, amount: number) {
    const exchanged = amm.exchangeB(amount, this);
    this.tokenbalance = this.tokenbalance - amount;
    console.log(`Dev ${this.name} will get: ${exchanged} eur`);
  }
  showbalance() {
    console.log(`${this.name} has: ${this.tokenbalance}`);
  }
}

export interface IClient extends TokenHolder {
  tokenbalance: number;
  purchase(amm: AMM, amount: number): void;
  paydev(dev: Developer, amount: number): void;
  showbalance(): void;
}
export class Client extends TokenHolder implements IClient {
  constructor(public name: string, public tokenbalance: number) {
    super();
  }
  purchase(amm: AMM, amount: number) {
    const exchanged = amm.exchangeA(amount, this);
    console.log(`Client ${this.name} will get: ${exchanged} platformtokens`);
  }
  paydev(dev: Developer, amount: number) {
    console.log(`${dev.name} will get: ${amount} platformtokens`);
    const token = this.tokens.filter((t) => t.name === "projectToken");
    token[0].transferFrom(this, dev, amount);
  }
  showbalance() {
    console.log(this.tokenbalance);
  }
}
