import { Context as C } from "../../../Context";
import { DeepUtilities } from "../../DeepUtilities";

declare module "../../../Context" {
  export namespace Context {}
}

export namespace NewContext {
  const MixEvo = DeepUtilities.Mixins.MixEvo;
  export interface Context<V> {
    value: V;
  }
  export interface State<V> {
    value: V;
  }
  export class State<V> {
    constructor(public value: V) {}
  }
  // export type ChangeableValue<V> = DeepUtilities.Mixins.Mixin.Mixin<
  //   new () => NewContext.State<V>,
  //   new () => {
  //     changeValue(state: NewContext.State<V>): void;
  //   }
  // >;

  // export type ChangeableState<V> = DeepUtilities.Mixins.Mixin.Mixin<
  //   new () => { state: { value: V }; value: V },
  //   new () => {
  //     changeState(state: { value: V }): void;
  //   }
  // >;
}
