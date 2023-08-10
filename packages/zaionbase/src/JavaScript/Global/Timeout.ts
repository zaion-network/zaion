export interface Timeout extends Timeout.Timeout {}
export class Timeout implements Timeout.Timeout {
  #timeout: Timeout.TimeoutJS;
  constructor(cb: Timeout.cb, ms: Timeout.ms) {
    this.#timeout = Timeout.makeTimeoutJS(cb, ms);
    this.state = Timeout.state.initialized;
  }
  clear(): void {
    new Timeout.Clear(this.#timeout);
    new Timeout.ClearedState(this);
  }
  hasRef() {
    return this.#timeout.hasRef();
  }
  close(): void {
    new Timeout.ClosedState(this);
    this.#timeout.close();
  }
  refresh(): any {
    new Timeout.RefreshedState(this);
    return new Timeout.Refresh(this.#timeout).timeout;
  }
}
export namespace Timeout {
  export enum state {
    initialized = "initialized",
    refreshed = "refreshed",
    cleared = "cleared",
    closed = "closed",
  }
  export interface cb {
    (): void;
  }
  export type ms = number | undefined;
  export interface TimeoutJS extends NodeJS.Timeout {
    close(): void;
  }
  export interface makeTimeoutJS {
    (cb: cb, ms: ms): TimeoutJS;
  }
  export const makeTimeoutJS: makeTimeoutJS = (cb, ms) => {
    return setTimeout(cb, ms) as TimeoutJS;
  };

  export interface Timeout {
    state: state;
    close(): void;
    clear(): void;
    refresh(): void;
    hasRef: NodeJS.Timeout["hasRef"];
  }
  export interface ClearedTimeout {
    state: state.cleared;
    close(): void;
    clear(): void;
    refresh(): void;
    hasRef: NodeJS.Timeout["hasRef"];
  }
  export interface State {
    value: state;
  }
  export class State {
    constructor(value: state, ctx: Timeout) {
      ctx.state = value;
    }
  }
  export interface InitializedState extends State {
    value: state.initialized;
  }
  export class InitializedState extends State {
    constructor(ctx: Timeout) {
      super(state.initialized, ctx);
    }
  }
  export interface RefreshedState extends State {
    value: state.refreshed;
  }
  export class RefreshedState extends State {
    constructor(ctx: Timeout) {
      super(state.refreshed, ctx);
    }
  }
  export interface ClearedState extends State {
    value: state.cleared;
  }
  export class ClearedState extends State {
    constructor(ctx: Timeout) {
      super(state.cleared, ctx);
    }
  }
  export interface ClosedState extends State {
    value: state.closed;
  }
  export class ClosedState extends State {
    constructor(ctx: Timeout) {
      super(state.closed, ctx);
    }
  }
  export class Clear {
    constructor(timeout: NodeJS.Timeout) {
      clearTimeout(timeout);
    }
  }
  export class Refresh {
    constructor(public timeout: TimeoutJS) {
      this.timeout = timeout.refresh();
    }
  }
}
