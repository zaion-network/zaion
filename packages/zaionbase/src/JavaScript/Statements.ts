import type { JavaScript } from "../JavaScript";
import type { Types } from "../Types/Types";

declare module "../JavaScript" {
  namespace JavaScript {
    interface Statements {
      TryCatch: typeof TryCatch;
    }
    namespace Statements {
      interface TryCatch extends TryCatch.TryCatch {}
      namespace TryCatch {
        interface TryCatch {
          value: ITryCatch;
          run: tryCatchRunner;
        }

        type positiveCb = (...args: any) => any;
        type negativeCb = (err: Error) => any;
        type tryCatchRunner = (
          cb: (...args: any) => any,
          errCb?: (err: Error) => any
        ) => any;
        interface ITryCatch {
          positiveCb: positiveCb;
          negativeCb?: negativeCb;
        }

        type configKeys = keyof typeof TryCatch.config;
        type Options = Types.BooleanKeys<configKeys, true>;
      }
    }
  }
}

export class TryCatch implements JavaScript.Statements.TryCatch.TryCatch {
  constructor(public value: JavaScript.Statements.TryCatch.ITryCatch) {}
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
  export const errCb1: JavaScript.Statements.TryCatch.negativeCb = err =>
    console.log(err.message);
  export const tryCatchRunner: JavaScript.Statements.TryCatch.tryCatchRunner = (
    cb,
    errCb = err => console.log(err.message)
  ) => {
    try {
      return cb();
    } catch (error: any) {
      return errCb(error);
    }
  };
}
