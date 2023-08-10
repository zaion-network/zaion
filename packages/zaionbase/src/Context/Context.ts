import { DeeperUtilities } from "../DeeperUtilities";

declare module "./Context" {
  namespace Context {
    interface Context<V> {
      value: V;
    }
    interface State<V> {
      value: V;
    }

    namespace ValueChange {
      interface ValueChange<V> {
        changeValue(state: StateCtx<V>): ValueChange<V>;
      }
      type ValueChangeable<V> = DeeperUtilities.Mixins.mixin<
        ValueChange<V>,
        Context<V>,
        new (...args: any[]) => Context<V>
      >;

      interface StateCtx<V> extends Context.State<V> {
        ctx: Context<V> & ValueChange<V>;
      }
      type StateCtxable<V> = DeeperUtilities.Mixins.mixin<
        StateCtx<V>,
        State<V>,
        new (...args: any[]) => State<V>
      >;
    }

    namespace StateChange {
      interface StateChange<S> {
        state: S;
        changeState(state: S): void;
      }
    }
  }
}

export namespace Context {
  export class Context<V> {
    constructor(value: V) {
      this.value = value;
    }
  }

  export class State<V> {
    constructor(value: V) {
      this.value = value;
    }
  }

  export namespace ValueChangeable {
    export const ValueChangeable: ValueChange.ValueChangeable<number> = (
      ctor
    ) => {
      return class Extended extends ctor {
        changeValue(state: State<number>) {
          this.value = state.value;
          return this;
        }
      };
    };
    export const StateCtxable: ValueChange.StateCtxable<number> = (ctor) =>
      class extends ctor {
        ctx: Context<number> & ValueChange.ValueChange<number>;
        constructor(ctx: Context<number> & ValueChange.ValueChange<number>) {
          super();
          this.ctx = ctx;
        }
      };
  }
}
