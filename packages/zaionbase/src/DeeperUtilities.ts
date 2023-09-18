// import { Context as CTX } from "./Context";
// import { DataStructures as DS } from "./DataStructures";
import { ErrorHandler as EH } from "./ErrorHandler";
// import { Mixins as M } from "./Mixins";
import { FunctionTypes as F } from "./FunctionTypes";
// import { Types as T } from "./Types/Types";
// import { TA as TA_ } from "./TA";

// declare module "./Context" {}
// declare module "./DataStructures" {}
// declare module "./ErrorHandler" {}
// declare module "./Mixins" {}
// declare module "./TA" {}
declare module "./FunctionTypes" {}
declare module "./Types/Types" {}

export class DeeperUtilities {}
export namespace DeeperUtilities {
  export type GenericFunction<A extends any[], R> = F.GenericFunction<A, R>;
  export type DymanicGenericFunction<
    A extends any[],
    T extends [[any, any], [any, any]]
  > = F.DymanicGenericFunction<A, T>;
  export type AnyFunction = F.AnyFunction;
  export type GenericVoidFunction<A> = F.GenericVoidFunction<A>;
  export type AnyVoidFunction = F.AnyVoidFunction;
  export type inferGenericFunction<F> = F.inferGenericFunction<F>;

  export import FunctionTypes = F;

  export import ErrorHandler = EH;

  // export import DataStructures = DS;

  // export import Context = CTX;

  // export import Mixins = M;

  // export import Types = T;

  // export import TA = TA_;
}
