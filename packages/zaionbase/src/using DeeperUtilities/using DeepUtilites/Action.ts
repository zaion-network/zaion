import { DeepUtilities } from "../DeepUtilities";

export interface Action<A extends Array<any>, R> {
  isSync(): this is Action.SyncAction<A, R>;
  isAsync(): this is Action.AsyncAction<
    A,
    R extends Promise<any> ? R : never,
    Awaited<R>
  >;
}
export class Action<A extends Array<any>, R> implements Action.Action<A, R> {
  constructor(
    public type: keyof typeof Action.types,
    public value: Action.genericAction<A, R>,
    public args: A
  ) {}
}
export namespace Action {
  export const Conditioner = DeepUtilities.Conditioner;
  export type action = DeepUtilities.Conditioner.action;
  export type actionAndArgs = DeepUtilities.Conditioner.actionAndArgs;
  export interface Action<A extends Array<any>, R> {
    type: keyof typeof types;
    args: A;
    value: genericAction<A, R>;
    isSync(): this is SyncAction<A, R>;
    isAsync(): this is AsyncAction<
      A,
      R extends Promise<any> ? R : never,
      Awaited<R>
    >;
  }
  export enum types {
    sync = "sync",
    async = "async",
  }

  export type genericAction<A extends any[], R> = DeepUtilities.GenericFunction<
    A,
    R
  >;

  export interface SyncAction<A extends Array<any>, R> {}
  export class SyncAction<A extends Array<any>, R>
    extends Action<A, R>
    implements SyncAction.SyncAction<A, R>
  {
    constructor(value: genericAction<A, R>, args: A) {
      super("sync", value, args);
    }
  }
  export namespace SyncAction {
    export interface SyncAction<A extends Array<any>, R> extends Action<A, R> {}
  }

  export interface AsyncAction<
    A extends Array<any>,
    R extends Promise<any>,
    P
  > {}
  export class AsyncAction<A extends Array<any>, R extends Promise<any>, P>
    extends Action<A, R>
    implements AsyncAction.AsyncAction<A, R, P>
  {
    constructor(value: genericAction<A, R>, args: A) {
      super("async", value, args);
    }
  }
  export namespace AsyncAction {
    export interface AsyncAction<A extends Array<any>, R extends Promise<P>, P>
      extends Action<A, R> {}
  }
}
