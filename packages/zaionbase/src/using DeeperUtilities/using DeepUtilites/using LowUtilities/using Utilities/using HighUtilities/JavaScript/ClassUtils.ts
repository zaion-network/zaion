import "../../../../../../JavaScript";
import { Action } from "../../../../Action";
import { BasicClass as BC } from "../../../../BasicClass";
import { FunctionTypes } from "../../../../../../FunctionTypes";

declare module "../../../../../../JavaScript" {
  namespace JavaScript {
    interface ClassUtils {
      BasicClass: typeof BasicClass;
    }
    namespace ClassUtils {}
  }
}

declare module "./ClassUtils" {
  interface defineSubClass<C, S extends C> {
    (c: C): S;
  }
  type action = Action.action;
  type actionAndArgs = Action.actionAndArgs;
  type GenericFunction<A extends any[], R> = FunctionTypes.GenericFunction<
    A,
    R
  >;
}

export class ClassUtils {}
export namespace ClassUtils {
  export class BasicClass extends BC {}
}

export class BasicClass extends BC {}
