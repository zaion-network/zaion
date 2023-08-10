import { Cache as cache } from "../../../../IPC Server/Cache";
// import { BasicClass as BC } from "../BasicClass";
import { MethodWithStrategies as MWS } from "./MethodWithStrategy";
import { LowUtilities as L } from "../LowUtilities";

declare module "./MethodWithStrategy" {}
declare module "../../../../IPC Server/Cache" {}
declare module "../LowUtilities" {
  export namespace LowUtilities {
    export import MethodWithStrategies = MWS;
    export var Cache: typeof cache;
  }
}

L.Cache = cache;
L.MethodWithStrategies = MWS;

// export class Utilities extends LowUtilities {}

// export namespace Utilities {
//   export const Cache = cache;

//   export const DataStructures = LowUtilities.DataStructures;

//   export namespace Conditioner {
//     export type booleanCondition = LowUtilities.Conditioner.booleanCondition;
//     export type actionAndArgs = LowUtilities.Conditioner.actionAndArgs;
//   }

//   export interface MethodWithStrategies<
//     T,
//     Strategies,
//     SelectedKey,
//     Selected,
//     Params,
//     Return
//   > extends LowUtilities.BasicClass {
//     execute: Selected;
//   }
//   export class MethodWithStrategies<
//     T extends { [k: string]: any } = { [k: string]: any },
//     Strategies extends { [k in keyof T]: (...args: any[]) => any } = {
//       [k in keyof T]: (...args: any[]) => any;
//     },
//     SelectedKey extends keyof T = keyof T,
//     Selected extends Strategies[SelectedKey] = Strategies[SelectedKey],
//     Params extends MWS.ParametersFromObject<
//       keyof Strategies,
//       Strategies,
//       SelectedKey
//     > = MWS.ParametersFromObject<keyof Strategies, Strategies, SelectedKey>,
//     Return extends MWS.ReturnTypeFromObject<
//       keyof Strategies,
//       Strategies,
//       SelectedKey
//     > = MWS.ReturnTypeFromObject<keyof Strategies, Strategies, SelectedKey>
//   > extends MWS<T, Strategies, SelectedKey, Selected, Params, Return> {}
//   export namespace MethodWithStrategies {
//     export type ParametersFromObject<
//       Keys extends string | number | symbol,
//       O extends { [k in Keys]: (...args: any[]) => any },
//       T extends keyof O
//     > = MWS.ParametersFromObject<Keys, O, T>;

//     export type ReturnTypeFromObject<
//       Keys extends string | number | symbol,
//       O extends { [k in Keys]: () => any },
//       T extends keyof O
//     > = MWS.ReturnTypeFromObject<Keys, O, T>;
//   }

//   // export namespace Action {
//   //   // export type genericAction<
//   //   //   A extends any[],
//   //   //   R
//   //   // > = LowUtilities.Action.genericAction<A, R>;
//   //   // export const Conditioner = LowUtilities.Action.Conditioner;
//   //   // export type action = LowUtilities.Action.action;
//   //   // export type actionAndArgs = LowUtilities.Action.actionAndArgs;
//   // }
//   export class Action<A extends any[], R> extends LowUtilities.Action<A, R> {}
//   export namespace Action {
//     export type genericAction<
//       A extends any[],
//       R
//     > = LowUtilities.Action.genericAction<A, R>;
//     export const Conditioner = LowUtilities.Action.Conditioner;
//     export type action = LowUtilities.Action.action;
//     export type actionAndArgs = LowUtilities.Action.actionAndArgs;
//   }

//   export type GenericFunction<A extends any[], R> = BC.GenericFunction<A, R>;

//   export namespace Result {
//     export interface Result<T> extends LowUtilities.Context.Result.Result<T> {}
//   }
//   ////// TYPES
// }

export import Utilities = L;
