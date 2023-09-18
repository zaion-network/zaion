declare module "./setTimeout.utils" {
  namespace setTimeout_utils {
    interface State {
      value: state;
    }
    interface InitializedState extends State {
      value: state.initialized;
    }
    interface RefreshedState extends State {
      value: state.refreshed;
    }
    interface ClearedState extends State {
      value: state.cleared;
    }
    interface ClosedState extends State {
      value: state.closed;
    }
    interface cb {
      (): void;
    }
    type ms = number | undefined;
  }
}

export interface setTimeout_utils extends setTimeout_utils.Timeout {}
export class setTimeout_utils implements setTimeout_utils.Timeout {
  // #timeout: setTimeout_utils.TimeoutJS;
  constructor(cb: setTimeout_utils.cb, ms: setTimeout_utils.ms) {
    // this.#timeout = setTimeout_utils.makeTimeoutJS(cb, ms);
    this.state = setTimeout_utils.state.initialized;
  }
  clear(): void {
    // new setTimeout_utils.Clear(this.#timeout);
    new setTimeout_utils.ClearedState(this);
  }
  // hasRef() {
  //   return this.#timeout.hasRef();
  // }
  close(): void {
    new setTimeout_utils.ClosedState(this);
    // this.#timeout.close();
  }
  // refresh(): any {
  //   new setTimeout_utils.RefreshedState(this);
  //   return new setTimeout_utils.Refresh(this.#timeout).timeout;
  // }
}
export namespace setTimeout_utils {
  export enum state {
    initialized = "initialized",
    refreshed = "refreshed",
    cleared = "cleared",
    closed = "closed",
  }
  export interface TimeoutJS extends NodeJS.Timeout {
    close(): void;
  }
  export interface makeTimeoutJS {
    (cb: cb, ms: ms): TimeoutJS;
  }
  // export const makeTimeoutJS: makeTimeoutJS = (cb, ms) => {
  //   return setTimeout(cb, ms) as TimeoutJS;
  // };

  export interface Timeout {
    state: state;
    close(): void;
    clear(): void;
    // refresh(): void;
    // hasRef: NodeJS.Timeout["hasRef"];
  }
  export interface ClearedTimeout {
    state: state.cleared;
    close(): void;
    clear(): void;
    refresh(): void;
    hasRef: NodeJS.Timeout["hasRef"];
  }
  export class State {
    constructor(value: state, ctx: Timeout) {
      ctx.state = value;
    }
  }
  export class InitializedState extends State {
    constructor(ctx: Timeout) {
      super(state.initialized, ctx);
    }
  }
  export class RefreshedState extends State {
    constructor(ctx: Timeout) {
      super(state.refreshed, ctx);
    }
  }
  export class ClearedState extends State {
    constructor(ctx: Timeout) {
      super(state.cleared, ctx);
    }
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
