import { GenericContext } from "../GenericContext";

declare module "./WithChangeState" {
  export interface WithChangeState<S, V>
    extends WithChangeState.Context<S, V> {}
  export namespace WithChangeState {
    export interface Context<S, V> extends GenericContext<V> {
      changeState(state: S): this;
    }
    export interface State<C, V> extends State.State<C, V> {}

    export namespace State {
      export interface State<C, V> extends GenericContext.State<V> {}
    }
  }
}

export abstract class WithChangeState<
  S extends WithChangeState.State<any>,
  V = unknown
> implements WithChangeState.Context<S, V>
{
  protected hiddenstate: S;
  constructor(state: S = new WithChangeState.State.UndefinedState() as S) {
    this.hiddenstate = state;
  }
  changeState(state: S): this {
    this.hiddenstate = state;
    return this;
  }
  get state() {
    return this.hiddenstate;
  }
  // set state(state) {
  //   this.hiddenstate = state;
  // }
}
export namespace WithChangeState {
  export abstract class State<C, V = unknown> extends GenericContext.State<V> {
    protected ctx: C;
    constructor(ctx: C) {
      super();
      this.ctx = ctx;
    }
  }
  export namespace State {
    export class UndefinedState extends State<undefined> {
      constructor() {
        super(undefined);
      }
    }
  }
}
