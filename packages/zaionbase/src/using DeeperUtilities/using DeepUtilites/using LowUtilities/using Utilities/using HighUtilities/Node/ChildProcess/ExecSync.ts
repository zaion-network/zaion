import { execSync } from "child_process";
import { Result } from "../../../../../../../Context/GenericContext/WithChangeState/Result";
import { BasicClass } from "../../../../../BasicClass";

declare module "./ExecSync" {
  namespace ExecSync {
    interface ExecSync<T extends Buffer | string | string[] | undefined> {
      type: types;
      command: string;
      options: {
        maxBuffer: number;
      };
      digest(): T;
    }

    interface ExecSyncBuffer extends ExecSync<Buffer> {
      format(): ExecSync.ExecSyncString;
    }

    interface ExecSyncString extends ExecSync<string> {
      split(splitter: ExecSync.splitters): ExecSync.ExecSyncStringArray;
    }

    interface ExecSyncStringArray extends ExecSync<string[]> {}

    interface ExecSyncUndefined extends ExecSync<undefined> {
      run(): ExecSync.ExecSyncBuffer;
    }
  }
}

export interface ExecSync<T extends Buffer | string | string[] | undefined>
  extends ExecSync.ExecSync<T> {}

export class ExecSync<T extends Buffer | string | string[] | undefined>
  extends BasicClass
  implements ExecSync.ExecSync<T>
{
  #safeGuardError = this.conditioner.safeGuardError;
  #newResult: Result<T>;
  constructor(
    public command: string,
    public options: {
      maxBuffer: number;
    }
  ) {
    super();
    this.#newResult = new Result<T>();
  }
  run(): ExecSync.ExecSyncBuffer {
    new ExecSync.Fullfilled(
      execSync(this.command, this.options) as T,
      this.#newResult
    );
    return this as ExecSync.ExecSyncBuffer;
  }

  format(): ExecSync.ExecSyncString {
    this.#safeGuardError([
      this.#newResult.isUndefined(),
      ExecSync.ExecSyncErrors.notstring,
    ]);
    new ExecSync.Fullfilled(
      this.#newResult.value?.toString().trim(),
      this.#newResult as any
    );
    return this as ExecSync.ExecSyncString;
  }

  split(splitter: ExecSync.splitters): ExecSync.ExecSyncStringArray {
    this.#safeGuardError([
      typeof this.#newResult.value !== "string",
      ExecSync.ExecSyncErrors.notstring,
    ]);
    new ExecSync.Fullfilled(
      (this.#newResult as Result<string>).value!.split(splitter),
      this.#newResult as Result<string[]>
    );
    return this as ExecSync.ExecSyncStringArray;
  }

  digest() {
    return this.#newResult.value;
  }
}
export namespace ExecSync {
  export enum types {
    buffer = "buffer",
    string = "string",
    stringArray = "stringArray",
    undefined = "undefined",
  }

  export enum splitters {
    newline = "\n",
  }

  export enum ExecSyncErrors {
    runfirst = "call run method first",
    notstring = "result is not a strings",
  }

  export const Fullfilled = Result.ResultState.Fullfilled;
}
