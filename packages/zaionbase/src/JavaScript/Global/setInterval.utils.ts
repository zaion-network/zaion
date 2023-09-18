declare module "./setInterval.utils" {
  namespace setInterval_utils {
    interface TimerJS extends NodeJS.Timer {}
    interface Interval {
      close(): TimerJS;
      clear(): void;
      refresh(): void;
      hasRef: NodeJS.Timer["hasRef"];
    }
    interface cb {
      (): void;
    }
  }
}

export interface setInterval_utils extends setInterval_utils.Interval {}
export class setInterval_utils implements setInterval_utils.Interval {
  #interval: NodeJS.Timer;
  constructor(cb: setInterval_utils.cb, ms: setInterval_utils.ms) {
    this.#interval = setInterval(cb, ms);
  }
}
export namespace setInterval_utils {
  export enum states {
    initialized = "initialized",
    refreshed = "refreshed",
    cleared = "cleared",
    closed = "closed",
  }
  export type ms = number | undefined;

  export class Clear {
    constructor(interval: NodeJS.Timer) {
      clearInterval(interval);
    }
  }
}
