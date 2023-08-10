import { LowUtilities } from "../LowUtilities";

export interface MethodWithStrategies<
  T,
  Strategies,
  SelectedKey,
  Selected,
  Params,
  Return
> extends MethodWithStrategies.IMethodWithStrategies<
    T,
    Strategies,
    SelectedKey,
    Selected,
    Params,
    Return
  > {}

export class MethodWithStrategies<
    T extends { [k: string]: any } = { [k: string]: any },
    Strategies extends { [k in keyof T]: (...args: any[]) => any } = {
      [k in keyof T]: (...args: any[]) => any;
    },
    SelectedKey extends keyof T = keyof T,
    Selected extends Strategies[SelectedKey] = Strategies[SelectedKey],
    Params extends MethodWithStrategies.ParametersFromObject<
      keyof Strategies,
      Strategies,
      SelectedKey
    > = MethodWithStrategies.ParametersFromObject<
      keyof Strategies,
      Strategies,
      SelectedKey
    >,
    Return extends MethodWithStrategies.ReturnTypeFromObject<
      keyof Strategies,
      Strategies,
      SelectedKey
    > = MethodWithStrategies.ReturnTypeFromObject<
      keyof Strategies,
      Strategies,
      SelectedKey
    >
  >
  extends LowUtilities.BasicClass
  implements
    MethodWithStrategies.IMethodWithStrategies<
      T,
      Strategies,
      SelectedKey,
      Selected,
      Params,
      Return
    >
{
  #strategiesEnum: T;
  get strategiesEnum() {
    return this.#strategiesEnum;
  }
  #selectedStrategy: SelectedKey;
  get selectedStrategy() {
    return this.#selectedStrategy;
  }
  #strategies: Strategies;
  get strategies() {
    return this.#strategies;
  }
  #strategy: Selected;
  get strategy() {
    return this.#strategy;
  }
  constructor(
    strategiesEnum: T,
    strategies: Strategies,
    selectedStrategy: SelectedKey
  ) {
    super();
    this.#strategiesEnum = strategiesEnum;
    this.#selectedStrategy = selectedStrategy;
    this.#strategies = strategies;
    this.#strategy = this.strategies[this.#selectedStrategy]! as Selected;
  }
  execute = ((...args: Params): Return => {
    const condition = this.strategy === undefined ? false : true;
    this.conditioner.safeguard([condition, "no strategy set"]);
    return this.strategy(...args);
  }) as Selected;
}
export namespace MethodWithStrategies {
  export type ParametersFromObject<
    Keys extends string | number | symbol,
    O extends { [k in Keys]: (...args: any[]) => any },
    T extends keyof O
  > = Parameters<O[T]>;

  export type ReturnTypeFromObject<
    Keys extends string | number | symbol,
    O extends { [k in Keys]: () => any },
    T extends keyof O
  > = ReturnType<O[T]>;

  export interface IMethodWithStrategies<
    T,
    Strategies,
    SelectedKey,
    Selected,
    Params,
    Return
  > extends LowUtilities.BasicClass {
    execute: Selected;
  }

  interface addStrategy<
    T,
    Key extends keyof T = keyof T,
    Value extends
      | ((...args: any[]) => any)
      | (new (...args: any[]) => any) = any,
    Ctor extends new (...args: any[]) => any = new (...args: any[]) => any,
    Func extends (...args: any[]) => any = (...args: any[]) => any
  > {
    <
      Y extends unknown,
      X extends Y extends new (...args: any[]) => MethodWithStrategies<infer M>
        ? new (...args: any[]) => MethodWithStrategies<any>
        : any
    >(
      key: Key,
      value: Value extends Ctor ? X : never,
      arg: ConstructorParameters<X>[0]
    ): void;
    (
      key: Key,
      value: Value extends Func ? Func : never,
      arg?: Value extends Func ? never : unknown
    ): void;
  }

  interface isClass
    extends LowUtilities.BasicClass.GenericFunction<[any], boolean> {}

  export const isClass: isClass = (value) =>
    /^class\s/.test(Function.prototype.toString.call(value));
}
