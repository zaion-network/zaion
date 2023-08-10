import { HighUtilities } from "../../HighUtilities";

export class ClassUtils {}
export namespace ClassUtils {
  export interface defineSubClass<C, S extends C> {
    (c: C): S;
  }
  export class BasicClass extends HighUtilities.BasicClass {}
  export type action = HighUtilities.Action.action;
  export type actionAndArgs = HighUtilities.Action.actionAndArgs;
  export type GenericFunction<
    A extends any[],
    R
  > = HighUtilities.GenericFunction<A, R>;
}
