import { ExecSync as ES } from "./ChildProcess/ExecSync";

export class ChildProcess {}
export namespace ChildProcess {
  export class ExecSync<
    T extends Buffer | string | string[] | undefined
  > extends ES<T> {}
  export namespace ExecSync {
    export interface ExecSync<T extends Buffer | string | string[] | undefined>
      extends ES.ExecSync<T> {}
    export interface ExecSyncBuffer extends ES.ExecSyncBuffer {}
    export interface ExecSyncString extends ES.ExecSyncString {}
    export interface ExecSyncStringArray extends ES.ExecSyncStringArray {}
    export interface ExecSyncUndefined extends ES.ExecSyncUndefined {}
  }
}
