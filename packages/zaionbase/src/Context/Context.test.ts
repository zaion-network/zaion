import { Context } from "./Context";
import { Mixins } from "../Mixins";
import { tester } from "../utils/tester";
import { HigherUtilities } from "../using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/HigherUtilites";

tester(() => {
  enum connectionState {
    connected = "connected",
    notconnected = "notconnected",
  }
  interface State<V extends connectionState> {
    value: V;
  }
  class State<V extends connectionState> {
    constructor(public value: V, public ctx: Context<V>) {}
  }
  class Connected extends State<connectionState.connected> {
    constructor(ctx: Context<any>) {
      const connected = new ConnectedContext();
      super(connectionState.connected, ctx);
      connected.changeValue(this);
      this.ctx = ctx.changeValue(this);
    }
  }
  class NotConnected extends State<connectionState.notconnected> {
    constructor(ctx: Context<any>) {
      const notConnected = new NotConnectedContext();
      super(connectionState.notconnected, notConnected);
      notConnected.changeValue(this);
      this.ctx = ctx.changeValue(this);
    }
    boogalor() {
      console.log(`the boogalor is ${this.value}`);
      return this;
    }
  }

  interface Context<V extends connectionState> {
    value: V | undefined;
    b: V extends connectionState.connected ? true : false;
  }
  class Context<V extends connectionState> {
    value: V | undefined;
    constructor() {}
    changeValue<S extends State<V>>(
      state: S
    ): S extends State<infer X> ? Context<X> : never {
      this.value = state.value;
      return this as unknown as S extends State<infer X> ? Context<X> : never;
    }
  }
  class ConnectedContext extends Context<connectionState.connected> {}
  class NotConnectedContext extends Context<connectionState.notconnected> {}
  const ctx = new Context();
  console.log(ctx);
  const newctx1 = new Connected(ctx).ctx;
  console.log(newctx1);
  const newctx2 = new NotConnected(ctx).boogalor().ctx;
  console.log(newctx2);
})(true);

tester(() => {
  const Cts = Context.Context<number>;
  const Val = Context.ValueChangeable.ValueChangeable;
  const Sta = Context.State;
  const Stactx = Context.ValueChangeable.StateCtxable;

  class NewContext extends new Mixins.Mix(Cts).with(Val, Val) {}
  class NewState extends new Mixins.Mix(Sta).with(Stactx, Stactx) {}
  const ctx = new NewContext(10);

  console.log(ctx);
});

tester(() => {
  interface IState {
    id: number;
    bal: number;
    isLessThan10: boolean;
  }
  interface State extends Context.State<IState> {}

  class State extends Context.State<IState> {
    constructor(id: number, bal: number, isLT10: boolean) {
      super({ id: id, bal: bal, isLessThan10: isLT10 });
      this.value = { id, bal, isLessThan10: isLT10 };
    }
  }

  interface StateGeneric extends State {
    id: -1;
    isLessThan10: false;
    bal: number;
  }
  class StateGeneric extends State {
    constructor(bal: number) {
      super(-1, bal, false);
    }
  }

  interface State10 extends State {
    id: 0;
    bal: 10;
    isLessThan10: false;
  }
  class State10 extends State {
    constructor(bal: 10) {
      super(0, bal, false);
    }
  }

  interface StateLT10 extends State {
    id: 1;
    isLessThan10: true;
  }
  class StateLT10 extends State {
    constructor(bal: number) {
      super(1, bal, true);
    }
  }

  interface ContextLT10 extends State {
    top(): void;
  }
  class ContextLT10 {
    constructor(origin: StateLT10) {
      this.value = origin.value;
    }
    top() {
      console.log("top");
    }
  }

  interface Context10 extends Context.Context<IState> {
    pop(): void;
  }
  class Context10 extends Context.Context<IState> {
    constructor(origin: State10) {
      super(origin);
      this.value = origin.value;
    }
    pop() {
      console.log(this.value.bal - 10);
    }
  }
  interface GenericContext extends Context.Context<IState> {
    pip(): void;
  }
  class GenericContext extends Context.Context<IState> {
    constructor(origin: StateGeneric) {
      super(origin);
      this.value = origin.value;
    }
    pip() {
      console.log(this.value.bal + 1000);
    }
  }

  interface ContextFactory {}
  class ContextFactory {
    constructor() {}
    create<T extends State10>(origin: T): Context10;
    create<T extends StateLT10>(origin: T): ContextLT10;
    create<T extends State>(origin: T): GenericContext;
    create(origin: any): any {
      if (origin instanceof State10) return new Context10(origin);
      else if (origin instanceof StateLT10) return new ContextLT10(origin);
      else return new GenericContext(origin);
    }
  }

  const suState = (state: State) => {
    return new ContextFactory().create(state).pip();
  };
  const suState10 = (state: State10) => {
    return new ContextFactory().create(state).pop();
  };
  const suStateLT10 = (state: StateLT10) => {
    return new ContextFactory().create(state).top();
  };

  class NumberMap<V> extends HigherUtilities.JavaScript.MapUtils.NonNullableMap<
    number,
    V
  > {}
  const variabile: number = 100;
  const conditionA1 = variabile < 10 ? 0 : variabile === 10 ? 1 : 2;
  const numbermap = new NumberMap<new (...args: any[]) => State | State10>();
  numbermap.set(0, StateLT10);
  numbermap.set(1, State10);
  numbermap.set(2, StateGeneric);

  const Class2 = numbermap.get(conditionA1);
  const state2A = new Class2(variabile);

  type operatorOnState = (state: State | State10 | StateLT10) => void;
  const condition2A =
    state2A instanceof StateLT10 ? 0 : state2A instanceof State10 ? 1 : 2;
  const numbermap2 = new NumberMap<operatorOnState>();
  numbermap2.set(0, suStateLT10 as operatorOnState);
  numbermap2.set(1, suState10 as operatorOnState);
  numbermap2.set(2, suState as operatorOnState);

  const cb2 = numbermap2.get(condition2A);
  cb2(state2A);
})(false);

tester(() => {
  interface State<V> extends Context.State<V> {}
  abstract class State<V> extends Context.State<V> {
    constructor(ctx: ContextN<V>, value: V) {
      super(value);
      this.value = value;
      ctx.value = this.value;
    }
    abstract execute: (...args: any[]) => any;
  }
  interface FalseState extends State<false> {
    value: false;
  }
  class FalseState extends State<false> {
    constructor(ctx: ContextN<any>) {
      super(ctx, false);
    }
    execute: (...args: any[]) => true = () => {
      console.log("was false");
      return true;
    };
  }
  interface TrueState extends State<true> {
    value: true;
  }
  class TrueState extends State<true> {
    constructor(ctx: ContextN<any>) {
      super(ctx, true);
    }
    execute: (...args: any[]) => false = () => {
      console.log("was true");
      return false;
    };
  }

  interface ContextN<V> {
    value: V;
  }
  class ContextN<V> {
    private state: State<V>;
    constructor(value: boolean) {
      const map = new Map();
      map.set(true, () => new TrueState(this));
      map.set(false, () => new FalseState(this));
      this.state = map.get(value)();
    }
    execute() {
      return this.state.execute();
    }
  }

  const context = new ContextN(true).execute();
  console.log(context);
})(false);

tester(() => {
  interface IStato {
    hasMetamask: boolean;
    isConnected: boolean | undefined;
  }
  interface Stato extends Context.State<IStato> {}
  class Stato {
    constructor(value: IStato) {
      this.value = value;
    }
  }

  interface StatoNonHaMetamask extends Stato {
    value: { hasMetamask: false; isConnected: undefined };
  }
  class StatoNonHaMetamask extends Stato {
    constructor(ctx: ThingContext) {
      super({ hasMetamask: false as const, isConnected: undefined });
    }
  }

  interface StatoHaMetamask extends Stato {
    value: { hasMetamask: true; isConnected: undefined };
  }
  class StatoHaMetamask extends Stato {
    constructor(ctx: ThingContext) {
      super({ hasMetamask: true as const, isConnected: undefined });
    }
  }

  interface StatoConnesso extends Stato {
    value: { hasMetamask: true; isConnected: true };
  }
  class StatoConnesso extends Stato {
    constructor(ctx: ThingContext) {
      super({ hasMetamask: true as const, isConnected: true as const });
    }
  }

  interface StatoNonConnesso extends Stato {
    value: { hasMetamask: true; isConnected: false };
  }
  class StatoNonConnesso extends Stato {
    constructor(ctx: ThingContext) {
      super({ hasMetamask: true as const, isConnected: false as const });
    }
  }

  interface ThingContext extends Context.Context<IStato> {}

  interface ContextNonHaMetamask extends ThingContext {}
  class ContextNonHaMetamask {
    constructor(stato: StatoNonHaMetamask) {
      this.value = stato.value;
    }
    showInstallaMetamask() {
      console.log("please install metamask");
    }
  }

  interface ContextHaMetamask extends ThingContext {
    checkIfConnected(): void;
  }
  class ContextHaMetamask {
    constructor(stato: StatoHaMetamask) {
      this.value = stato.value;
    }
    checkIfConnected() {
      console.log("i will check the connection");
    }
  }

  interface ContextConnesso extends ThingContext {
    interactWithSmartContract(): void;
    disconnect(): void;
  }
  class ContextConnesso {
    constructor(stato: StatoConnesso) {
      this.value = stato.value;
    }
    interactWithSmartContract(): void {
      console.log("i will interact");
    }
    disconnect(): void {
      console.log("disconnectin");
    }
  }

  interface ContextNonConnesso extends ThingContext {
    connect(): void;
    fuckoff(): void;
  }
  class ContextNonConnesso {
    constructor(stato: StatoNonConnesso) {
      this.value = stato.value;
    }
    connect(): void {
      console.log("connect");
    }
    fuckoff(): void {
      console.log("fuck off");
    }
  }

  interface ContextFactory extends Stato {}
  class ContextFactory {
    constructor() {}
    create<T extends StatoNonHaMetamask>(origin: T): ContextNonHaMetamask;
    create<T extends StatoHaMetamask>(origin: T): ContextHaMetamask;
    create<T extends StatoConnesso>(origin: T): ContextConnesso;
    create<T extends StatoNonConnesso>(origin: T): ContextNonConnesso;
    create(origin: any): any {
      if (origin instanceof StatoNonHaMetamask)
        return new ContextNonHaMetamask(origin);
      else if (origin instanceof StatoHaMetamask)
        return new ContextHaMetamask(origin);
      else if (origin instanceof StatoConnesso)
        return new ContextConnesso(origin);
      else if (origin instanceof StatoNonConnesso)
        return new ContextNonConnesso(origin);
      else throw new Error("no correct state");
    }
  }

  const hasMetamask = true;
  const isConnected = false;

  const condition = !hasMetamask
    ? 0
    : isConnected === undefined
    ? 1
    : !isConnected
    ? 2
    : 3;
  class NumberMap<V> extends HigherUtilities.JavaScript.MapUtils.NonNullableMap<
    Number,
    V
  > {}
  type operator<S extends Stato> = (stato: S) => void;
  interface onNotMetamask extends operator<StatoNonHaMetamask> {
    (stato: StatoNonHaMetamask): void;
  }
  const nonhaOp: onNotMetamask = (stato) => {
    return new ContextFactory().create(stato).showInstallaMetamask();
  };

  interface onMetamask extends operator<StatoHaMetamask> {
    (stato: StatoHaMetamask): void;
  }
  const haOp: onMetamask = (stato) => {
    return new ContextFactory().create(stato).checkIfConnected();
  };

  interface onNonConnesso extends operator<StatoNonConnesso> {
    (stato: StatoNonConnesso): void;
  }
  const nonConOp: onNonConnesso = (stato) => {
    return new ContextFactory().create(stato).connect();
  };

  interface onConnesso extends operator<StatoConnesso> {
    (stato: StatoConnesso): void;
  }
  const conOp: onConnesso = (stato) => {
    return new ContextFactory().create(stato).interactWithSmartContract();
  };
  const statemap = new NumberMap<new (...args: any[]) => Stato>();
  statemap.set(0, StatoNonHaMetamask);
  statemap.set(1, StatoHaMetamask);
  statemap.set(2, StatoNonConnesso);
  statemap.set(3, StatoConnesso);
  const Class = statemap.get(condition);
  const state = new Class();

  const opmap = new NumberMap<<S extends Stato>(stato: S) => void>();
  opmap.set(0, nonhaOp);
  opmap.set(1, haOp);
  opmap.set(2, nonConOp);
  opmap.set(3, conOp);

  opmap.get(condition)(state);
})(false);

tester("with changeValue", () => {
  Context.ValueChangeable;
  Context.Context;
});
