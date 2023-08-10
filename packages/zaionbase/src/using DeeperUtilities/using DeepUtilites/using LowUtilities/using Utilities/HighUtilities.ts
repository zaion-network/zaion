import { Utilities as U } from "../Utilities";
import { MapFromJson as MFJ } from "./MapFromJson";
import { benchmark as b } from "./benchmark";
// import { hashIt as h } from "./hashIt";
// import { validateJson as vj } from "./isJson";
// import { wait as w } from "./wait";

declare module "./MapFromJson" {}
declare module "./benchmark" {}
declare module "../Utilities" {
  export namespace Utilities {
    export import MapFromJson = MFJ;
    export import benchmark = b;
  }
}
U.MapFromJson = MFJ;
U.benchmark = b;
// export class HighUtilities extends Utilities {}
// export namespace HighUtilities {
//   export namespace Conditioner {
//     export type booleanCondition = Utilities.Conditioner.booleanCondition;
//     export type actionAndArgs = Utilities.Conditioner.actionAndArgs;
//   }

//   export class MapFromJson extends MFJ {}
//   export namespace MapFromJson {}

//   export class Action<A extends any[], R> extends Utilities.Action<A, R> {}
//   export namespace Action {
//     export type action = Utilities.Action.action;
//     export type actionAndArgs = Utilities.Action.actionAndArgs;
//     export type genericAction<
//       A extends any[],
//       R
//     > = Utilities.Action.genericAction<A, R>;
//   }
//   export type GenericFunction<A extends any[], R> = Utilities.GenericFunction<
//     A,
//     R
//   >;

//   export namespace Result {
//     export interface Result<T> extends Utilities.Context.Result.Result<T> {}
//   }

//   export class MethodWithStrategies<
//     T extends { [k: string]: any } = { [k: string]: any },
//     Strategies extends { [k in keyof T]: (...args: any[]) => any } = {
//       [k in keyof T]: (...args: any[]) => any;
//     },
//     SelectedKey extends keyof T = keyof T,
//     Selected extends Strategies[SelectedKey] = Strategies[SelectedKey],
//     Params extends Utilities.MethodWithStrategies.ParametersFromObject<
//       keyof Strategies,
//       Strategies,
//       SelectedKey
//     > = Utilities.MethodWithStrategies.ParametersFromObject<
//       keyof Strategies,
//       Strategies,
//       SelectedKey
//     >,
//     Return extends Utilities.MethodWithStrategies.ReturnTypeFromObject<
//       keyof Strategies,
//       Strategies,
//       SelectedKey
//     > = Utilities.MethodWithStrategies.ReturnTypeFromObject<
//       keyof Strategies,
//       Strategies,
//       SelectedKey
//     >
//   > extends Utilities.MethodWithStrategies<
//     T,
//     Strategies,
//     SelectedKey,
//     Selected,
//     Params,
//     Return
//   > {}
//   export namespace MethodWithStrategies {}

//   // export const hashIt = h;

//   // export const validateJson = vj;

//   // export const wait = w;

//   export const benchmark = b;
// }

export import HighUtilities = U;
