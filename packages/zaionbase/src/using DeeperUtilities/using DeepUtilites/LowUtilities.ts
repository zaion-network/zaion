import { DeepUtilities as D } from "../DeepUtilities";
import { Action as A } from "./Action";
import { BasicClass as BC } from "./BasicClass";

declare module "./Action" {}
declare module "./BasicClass" {}
declare module "../DeepUtilities" {
  export namespace DeepUtilities {
    export import Action = A;
    export import BasicClass = BC;
  }
}
D.BasicClass = BC;
D.Action = A;

// export class LowUtilities extends DeepUtilities {}
// export namespace LowUtilities {
//   export namespace Conditioner {
//     export type condition = DeepUtilities.Conditioner.condition;
//     export type booleanCondition = DeepUtilities.Conditioner.booleanCondition;
//     export type action = DeepUtilities.Conditioner.action;
//     export type actionAndArgs = DeepUtilities.Conditioner.actionAndArgs;
//     export type GenericFunction<
//       A extends any[],
//       R
//     > = DeepUtilities.Conditioner.GenericFunction<A, R>;
//   }
//   export type GenericFunction<
//     A extends any[],
//     R
//   > = DeepUtilities.GenericFunction<A, R>;

//   export class BasicClass extends BC {}
//   export namespace BasicClass {
//     export type action = DeepUtilities.Conditioner.action;
//     export type actionAndArgs = DeepUtilities.Conditioner.actionAndArgs;
//     export type GenericFunction<
//       A extends any[],
//       R
//     > = DeepUtilities.Conditioner.GenericFunction<A, R>;
//   }

//   export class Action<A extends any[], R> extends A<A, R> {}
//   export namespace Action {
//     export type genericAction<A extends any[], R> = A.genericAction<A, R>;
//     export const Conditioner = A.Conditioner;
//     export type action = A.action;
//     export type actionAndArgs = A.actionAndArgs;
//   }
//   export namespace Result {
//     export interface Result<T> extends DeepUtilities.Context.Result.Result<T> {}
//   }
// }

export import LowUtilities = D;
