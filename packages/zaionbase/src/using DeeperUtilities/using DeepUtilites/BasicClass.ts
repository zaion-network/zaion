import { DeepUtilities } from "../DeepUtilities";

export class BasicClass {
  static makeValidations = DeepUtilities.Conditioner.makeValidations;
  static makeActionAndArgs = DeepUtilities.Conditioner.makeActionAndArgs;
  conditioner = new DeepUtilities.Conditioner();
}
export namespace BasicClass {
  export type action = DeepUtilities.Conditioner.action;
  export type actionAndArgs = DeepUtilities.Conditioner.actionAndArgs;
  export type GenericFunction<
    A extends any[],
    R
  > = DeepUtilities.Conditioner.GenericFunction<A, R>;
}
