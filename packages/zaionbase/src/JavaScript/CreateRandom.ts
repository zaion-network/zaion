import { Types } from "../Types/Types";

type createReturnTypes = number | string | symbol;

export abstract class CreateRandom {
  private _strategy: Types.Class.Strategy;
  get strategy() {
    return this._strategy;
  }
  abstract create(): createReturnTypes;
  constructor(strategy: Types.Class.Strategy, public length?: number) {
    this._strategy = strategy;
  }
}
export type arg1 = "string" | "number" | "symbol";
export type returnType = string | number | symbol;
export type createRandomType = (arg1: arg1, arg2?: number) => returnType;
