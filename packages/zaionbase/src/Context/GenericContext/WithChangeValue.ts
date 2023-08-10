import { GenericContext } from "../GenericContext";

declare module "./WithChangeValue" {
  export namespace WithChangeValue {
    export interface WithChangeValue<V> extends GenericContext<V> {
      changeValue(state: State<V>): WithChangeValue<V>;
    }
    export interface State<V> extends State.State<V> {}
    export namespace State {
      export interface State<V> extends GenericContext.State<V> {
        ctx: WithChangeValue<V>;
      }
      export type statewithcontext = true;
    }
  }
}

export interface WithChangeValue<V>
  extends WithChangeValue.WithChangeValue<V> {}
export class WithChangeValue<V> implements WithChangeValue.WithChangeValue<V> {
  changeValue(state: WithChangeValue.State<V>): WithChangeValue<V> {
    this.value = state.value;
    const ctx = new WithChangeValue<V>();
    ctx.value = state.value;
    return ctx;
  }
}
export namespace WithChangeValue {
  export class State<V> implements State.State<V> {
    constructor(public value: V, public ctx: WithChangeValue<V>) {
      ctx.changeValue(this);
    }
  }
}
