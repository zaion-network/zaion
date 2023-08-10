import { Types } from "../Types";

export class Statements {}
export namespace Statements {
  export interface TryCatch extends TryCatch.TryCatch {}
  export class TryCatch implements TryCatch.TryCatch {
    constructor(public value: TryCatch.ITryCatch) {}
    run: () => any = () => {
      const pcb = this.value.positiveCb;
      const ncb = this.value.negativeCb;
      return TryCatch.tryCatchRunner(pcb, ncb);
    };
  }
  export namespace TryCatch {
    export enum config {
      withLog,
      withReturn,
    }
    type configKeys = keyof typeof config;

    export interface ITryCatch {
      positiveCb: positiveCb;
      negativeCb?: negativeCb;
    }
    export interface TryCatch {
      value: ITryCatch;
      run: tryCatchRunner;
    }

    type positiveCb = (...args: any) => any;
    type negativeCb = (err: Error) => any;

    type Options = Types.BooleanKeys<configKeys, true>;

    export const errCb1: negativeCb = (err) => console.log(err.message);
    type tryCatchRunner = (
      cb: (...args: any) => any,
      errCb?: (err: Error) => any
    ) => any;
    export const tryCatchRunner: tryCatchRunner = (
      cb,
      errCb = (err) => console.log(err.message)
    ) => {
      try {
        return cb();
      } catch (error: any) {
        return errCb(error);
      }
    };
  }
}
