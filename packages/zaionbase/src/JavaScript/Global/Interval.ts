export interface Interval extends Interval.Interval {}
export class Interval implements Interval.Interval {
  #interval: NodeJS.Timer;
  constructor(cb: Interval.cb, ms: Interval.ms) {
    this.#interval = setInterval(cb, ms);
  }
}
export namespace Interval {
  enum states {
    initialized = "initialized",
    refreshed = "refreshed",
    cleared = "cleared",
    closed = "closed",
  }
  export interface TimerJS extends NodeJS.Timer {}
  export interface Interval {
    close(): TimerJS;
    clear(): void;
    refresh(): void;
    hasRef: NodeJS.Timer["hasRef"];
  }
  export interface cb {
    (): void;
  }
  export type ms = number | undefined;
  let int = setInterval(() => {}, 1000);

  export class Clear {
    constructor(interval: NodeJS.Timer) {
      clearInterval(interval);
    }
  }
}
