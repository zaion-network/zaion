import { DeeperUtilities } from "../DeeperUtilities";

export interface Conditioner {
  boolean: Conditioner.Boolean;
  safeguard: Conditioner.Safeguard;
  elseIf: Conditioner.ElseIf;
}
export class Conditioner {
  safeguard: Conditioner.Safeguard = props => {
    const map = Conditioner.createErrorMap(props[1]);
    return map.get(props[0])!();
  };
  boolean: Conditioner.Boolean = props => {
    const map = new Map();
    map.set(props[1][0][0], [props[1][0][1], props[1][0][2]]);
    map.set(props[1][1][0], [props[1][1][1], props[1][1][2]]);
    return map.get(props[0])[0](...map.get(props[0])[1]);
  };
  booleanTrue = (
    ...props: [boolean, [Conditioner.action, Conditioner.args]]
  ) => {
    type condition = [Conditioner.action, Conditioner.args];
    const doNothing: condition = [() => {}, []];
    const ifTrue: condition = [props[1][0], props[1][1]];
    const makeValidations = Conditioner.makeValidations;
    return this.boolean([props[0], makeValidations(ifTrue, doNothing)]);
  };
  booleanFalse = (
    ...props: [boolean, [Conditioner.action, Conditioner.args]]
  ) => {
    type condition = [Conditioner.action, Conditioner.args];
    const doNothing: condition = [() => {}, []];
    const ifFalse: condition = [props[1][0], props[1][1]];
    const makeValidations = Conditioner.makeValidations;
    return this.boolean([props[0], makeValidations(doNothing, ifFalse)]);
  };
  safeGuardError: Conditioner.Safeguard = props => {
    const existAnalysys = DeeperUtilities.ErrorHandler.errorCb(props[1]);
    return this.booleanFalse(!props[0], [existAnalysys, []]);
  };
  elseIf: Conditioner.ElseIf = (value, arr, defaultCondition) => {
    return Conditioner.reduceConditions(arr, defaultCondition);
  };
}
export namespace Conditioner {
  /// imports
  type AnyVoidFunction = DeeperUtilities.AnyVoidFunction;
  export type GenericFunction<
    A extends any[],
    R
  > = DeeperUtilities.GenericFunction<A, R>;
  type inferGenericFunction<F> = DeeperUtilities.inferGenericFunction<F>;
  ///////
  export type action = DeeperUtilities.AnyFunction;
  export type args = any[];
  export type actionAndArgs = [action, args];
  type errormessage = string;
  type key = string;
  type value = any;

  export type condition<B extends true | false = boolean, A = action> = [
    B,
    A,
    any[]
  ];

  type reduceableCondition = [
    boolean,
    actionAndArgs,
    Map<any, any> | undefined
  ];

  interface ConditionOperator<
    A extends booleanCondition | safeGuardCondition | keyGuardCondition,
    R = A extends booleanCondition ? Boolean : void
  > extends GenericFunction<[A], R> {}

  export type booleanCondition = [boolean, [condition<true>, condition<false>]];
  export type booleanConditionTrue = [boolean, [condition<true>]];
  export type booleanConditionFalse = [boolean, [condition<false>]];

  export interface BooleanGeneric<T extends booleanCondition> {
    <R = T[0] extends true ? ReturnType<T[1][0][1]> : ReturnType<T[1][1][1]>>(
      a: T
    ): R;
  }

  export interface Boolean {
    <
      T extends booleanCondition,
      R = T[0] extends true ? ReturnType<T[1][0][1]> : ReturnType<T[1][1][1]>
    >(
      a: T
    ): R;
  }

  type safeGuardCondition = [boolean, errormessage];
  export interface Safeguard extends ConditionOperator<safeGuardCondition> {}

  type keyGuardCondition = [[key, value], [condition<true>, condition<false>]];
  export interface KeyGuard extends ConditionOperator<keyGuardCondition> {}

  export interface ElseIf {
    <V extends string>(
      value: V,
      arr: condition[],
      defaultCondition: actionAndArgs
    ): ReturnType<reduceConditions>;
  }

  ////////////////

  /////////////// MAP

  interface createErrorMap {
    (message: string): Map<boolean, GenericFunction<any, any>>;
  }
  export const createErrorMap: createErrorMap = message => {
    const map = new Map();
    map.set(false, DeeperUtilities.ErrorHandler.errorCb(message));
    map.set(true, () => {});
    return map;
  };

  interface createTrueFalseMap {
    (iftrue: actionAndArgs, iffalse: actionAndArgs): Map<any, any>;
  }
  export const createTrueFalseMap: createTrueFalseMap = (iftrue, iffalse) => {
    const map = new Map();
    map.set(true, iftrue);
    map.set(false, iffalse);
    return map;
  };

  interface undefinedFalseMap {
    (): Map<any, any>;
  }
  const undefinedFalseMap = () => {
    return new Map().set(undefined, false);
  };

  interface undefinedField {
    (
      bool: boolean,
      actionAndArgs: [action, any[]],
      mapped: Map<any, any> | undefined
    ): any;
  }
  const undefinedField: undefinedField = (bool, actionAndArgs, mapped) => {
    const map = undefinedFalseMap();
    const map2 = new Map();
    map2.set(undefined, () => mapped!.get(bool));
    map2.set(false, () => [actionAndArgs[0], actionAndArgs[1]]);
    return map2.get(map.get(mapped))();
  };

  /////////////////

  const defaultFalse: inferGenericFunction<any> = () => {};

  interface makeValidations {
    <T extends [action, any[]], F extends [action, any[]]>(
      ifTrue: T,
      ifFalse?: F | [action, any[]]
    ): [condition<true, T[0]>, condition<false, F[0]>];
  }
  export const makeValidations: makeValidations = (
    ifTrue,
    ifFalse = [defaultFalse, []]
  ) => {
    const trueval = makeValidation(true, ifTrue[0], ifTrue[1]);
    const falsval = makeValidation(false, ifFalse[0], ifFalse[1]);
    return [trueval, falsval];
  };

  interface makeValidation {
    <B extends true | false, A extends action>(
      bool: B,
      cb: A,
      args: any[]
    ): condition<B, inferGenericFunction<A>>;
  }
  const makeValidation: makeValidation = <
    B extends true | false,
    A extends GenericFunction<any, any>
  >(
    bool: B,
    cb: A,
    args: any[]
  ): condition<B, inferGenericFunction<A>> => {
    const degeneric = <T extends GenericFunction<any, any>>(
      cb: T
    ): inferGenericFunction<T> => cb as unknown as inferGenericFunction<T>;
    let ret = degeneric(cb);
    return [bool, ret, args];
  };

  interface makeActionAndArgs {
    (action: action, args: args): actionAndArgs;
  }
  export const makeActionAndArgs: makeActionAndArgs = (action, args) => {
    return [action, args];
  };

  interface makeReduceable {
    (arg: condition): reduceableCondition;
  }
  export const makeReducable: makeReduceable = arg => {
    return [arg[0], [arg[1], arg[2]], undefined];
  };

  interface reducer {
    (p: reduceableCondition, c: reduceableCondition): reduceableCondition;
  }
  export const reducer: (
    p: reduceableCondition,
    c: reduceableCondition
  ) => reduceableCondition = (p, c) => [
    c[0],
    c[1],
    createTrueFalseMap(c[1], undefinedField(...p)),
  ];

  interface reduceConditions {
    (arr: condition[], defaultAction: actionAndArgs): any;
  }
  export const reduceConditions: reduceConditions = (arr, defaultAction) => {
    let reduced = arr
      .map(makeReducable)
      .reverse()
      .reduce(reducer, [true, defaultAction, undefined]);
    let map = reduced[2];
    let cb = map?.get(arr[0][0]);
    return cb[0](...cb[1]);
  };
  export namespace Zionbase {
    type StandardValues = string | number | boolean;

    export function emptyString(el: string) {
      return el !== "";
    }

    export class Condizioni_v1 {
      constructor() {}
      // TODO creare strategie di riconoscimento classe
      oggettoUgualeCostruttore(object: object, constructor: Function) {
        return object.constructor === constructor;
      }
      proprietàName<T>(
        elemento: T extends { name: string } ? T : never,
        name: string
      ) {
        return elemento.name === name;
      }
    }

    export class Condizionatore {
      static #condizionatori: Condizionatore[] = [];
      #property;
      get property() {
        return this.#property;
      }
      set property(property) {
        this.#property = property;
      }
      #value: StandardValues;
      get value() {
        return this.#value;
      }
      set value(value) {
        this.#value = value;
      }
      // TODO eliminare - [ ] si /  - [ ] no
      // #result;
      // get result() {
      //   return this.#result;
      // }
      // set result(result) {
      //   this.#result = result;
      // }
      #servedArray = [];
      get servedArray() {
        return this.#servedArray;
      }
      set servedArray(servedArray) {
        this.#servedArray = servedArray;
      }
      id;
      constructor(value: string | number | boolean, property?: string) {
        this.#property = property;
        this.#value = value;
        Condizionatore.#condizionatori.push(this);
        this.id = Condizionatore.#condizionatori.length;
      }
      condizione = (oggetto: { [key: string]: string }) => {
        if (!this.property) throw Error();
        return oggetto[this.property] === this.value;
      };
      condizioneForEach = (oggetto: { [key: string]: string }) => {
        let servedArray: object[] = this.servedArray;
        if (!this.property) throw Error();
        if (oggetto[this.property] === this.value) {
          servedArray.push(oggetto);
        }
        return this;
      };
    }

    export namespace DataGuards {
      export interface IdataGuard_v1 {
        <T>(data: T, err: string): NonNullable<T>;
      }

      /**
       * This utility function returns the datas as a non
       * nullable. Use this when you have a variable which can
       * have a value of type `T|undefined` and you wish to have
       * only `T`, excluding undefined.
       * @param data
       * @param err
       * @returns
       */
      export const dataGuard: IdataGuard_v1 = function <T>(
        data: T,
        err: string
      ) {
        if (!data) throw new Error(err);
        return data;
      };

      export interface IkeyInObjGuard_v1 {
        <T, K extends keyof T>(data: T, key: K): Required<Pick<T, K>> &
          Exclude<T, K>;
      }
      export const keyInObjGuard: IkeyInObjGuard_v1 = function (obj, key) {
        const ERR = `value in ${key.toString()} is undefined`;
        dataGuard(obj[key], ERR);
        return obj as Required<Pick<typeof obj, typeof key>> &
          Exclude<typeof obj, typeof key>;
      };

      export interface ImakeErrGuard_v1 {
        <T>(data: T): NonNullable<T>;
      }

      // TODO @ariannatnl mettere queste funzioni in moduli in
      // questa cartella
      export const makeErrGuard: ImakeErrGuard_v1 = function (data) {
        // TODO @giacomogagliano aggiungere un modo per
        // identificare il nome del paramentro, o ad esempio
        // convertire il tipo che arriva dal dato passato in
        // string per il messaggio di errore
        if (!data) throw new Error("no options given");
        return data;
      };

      // type und = { name?: string };
      // const u: und = { name: "" };

      // const a = keyInObjGuard_v1(u, "name");
      // const b = a.name;

      export interface IoptionGuard_v1 {
        <T, Option, Output extends {}>(
          data: T,
          errOption: [Option, Output][]
        ): [T, Output];
      }

      export const optionGuard: IoptionGuard_v1 = function (data, errOption) {
        // TODO @giacomogagliano cambiare questa funzione e
        // renderla simile a switch
        if (!errOption[0]) throw new Error("no options given");
        if (!errOption[1]) throw new Error("no options given");
        if (!errOption[2]) throw new Error("no options given");
        if (!errOption[0][1]) throw new Error("");
        if (!errOption[1][1]) throw new Error("");
        if (!errOption[2][1]) throw new Error("");
        if (!data) throw new Error("");
        if (data === errOption[0][0]) return [data, errOption[0][1]];
        if (data === errOption[1][0]) return [data, errOption[1][1]];
        if (data === errOption[2][0]) return [data, errOption[2][1]];
        return [data, errOption[0][1]];
      };

      /**
       * Overload interface fot the guard function.
       */
      export interface Iguard_v1 {
        // makeErrGuard
        <T>(data: T): NonNullable<T>;
        // dataGuard
        <T>(data: T, err: string): NonNullable<T>;
        // optionGuard
        <T, O, Out extends {}>(data: T, options: [O, Out][]): [
          T,
          NonNullable<Out>
        ];
        // keyInObjGuard
        <T, O, Key extends keyof T>(obj: T, key: Key): Required<Pick<T, Key>> &
          Exclude<T, Key>;
        //////// MERGED
        <T, O, Out extends {}, Key extends keyof T>(
          data: T,
          errOption?: string | [O, Out][] | Key
        ):
          | [T, NonNullable<Out>]
          | NonNullable<T>
          | (Required<Pick<T, Key>> & Exclude<T, Key>);
      }

      /**
       * this function is meant to be an extensible guard function
       * which can be use to create guard closures:
       * - boolean without error
       * - boolean with error
       * - evaluate some conditions and return the provided output
       * @param data
       * @param errOption
       * @returns
       */
      // @ts-expect-error
      export const guard: Iguard_v1 = function <
        T extends object,
        O,
        Out extends {},
        Key extends keyof T
      >(
        data: T,
        errOption?: string | [O, Out][] | Key
      ):
        | [T, NonNullable<Out>]
        | NonNullable<T>
        | (Required<Pick<T, Key>> & Exclude<T, Key>) {
        if (!errOption) return makeErrGuard(data);
        if (typeof errOption === "string") return dataGuard(data, errOption);
        if (Array.isArray(errOption)) return optionGuard(data, errOption);
        if (errOption in data) return keyInObjGuard(data, errOption);
        if (!data) throw new Error("no data");
        return data;
      };

      // const opt1: ["ciao", 10] = ["ciao", 10];
      // const opt2: ["mia0", 11] = ["mia0", 11];

      // const res = optionGuard("ciao", [opt1, opt2]);

      // interface Ifoo {
      //   <A extends string, B extends number, C extends string, D extends number>(
      //     a: [[A, B], [C, D]]
      //   ): [[A, C], [B, D]];
      // }
      // const foo: Ifoo = function (a) {
      //   let stringarr: string[] = a.map(e => e[0]);
      //   let numarr: number[] = a.map(e => e[1]);
      //   return [stringarr, numarr];
      // };

      // const arrfoo: [typeof opt1, typeof opt2] = [opt1, opt2];
      // const foores = foo(arrfoo);
    }

    export namespace Swtch {
      export const swtch2: Iswtch = function (arr, opt, test) {
        if (!opt[0]) throw new Error("");
        if (!opt[1]) throw new Error("");
        switch (test) {
          case arr[0]:
            return opt[0];
          case arr[1]:
            return opt[1];
          default:
            return opt[0];
        }
      };

      export const swtch3: Iswtch = function (arr, opt, test) {
        if (!opt[0]) throw new Error("");
        if (!opt[1]) throw new Error("");
        if (!opt[2]) throw new Error("");
        switch (test) {
          case arr[0]:
            return opt[0];
          case arr[1]:
            return opt[1];
          case arr[2]:
            return opt[2];
          default:
            return opt[0];
        }
      };

      export const swtch4: Iswtch = function (arr, opt, test) {
        if (!opt[0]) throw new Error("");
        if (!opt[1]) throw new Error("");
        if (!opt[2]) throw new Error("");
        if (!opt[3]) throw new Error("");
        switch (test) {
          case arr[0]:
            return opt[0];
          case arr[1]:
            return opt[1];
          case arr[2]:
            return opt[2];
          case arr[3]:
            return opt[3];
          default:
            return opt[0];
        }
      };

      export const swtch5: Iswtch = function (arr, opt, test) {
        if (!opt[0]) throw new Error("");
        if (!opt[1]) throw new Error("");
        if (!opt[2]) throw new Error("");
        if (!opt[3]) throw new Error("");
        if (!opt[4]) throw new Error("");
        switch (test) {
          case arr[0]:
            return opt[0];
          case arr[1]:
            return opt[1];
          case arr[2]:
            return opt[2];
          case arr[3]:
            return opt[3];
          case arr[4]:
            return opt[4];
          default:
            return opt[0];
        }
      };

      export interface Iswtch {
        <A extends T[], O extends any[], T>(arr: A, opt: O, test: A[0]): O[0];
        <A extends T[], O extends any[], T>(arr: A, opt: O, test: A[1]): O[1];
        <A extends T[], O extends any[], T>(arr: A, opt: O, test: A[2]): O[2];
        <A extends T[], O extends any[], T>(arr: A, opt: O, test: A[3]): O[3];
        <A extends T[], O extends any[], T>(arr: A, opt: O, test: A[4]): O[4];
      }

      /**
       * Usage:
       * ```ts
       * const arr2: ["1", "2", "asdf"] = ["1", "2", "asdf"];
       * const opt2: ["opt1", () => void, 10] = ["opt1", () => console.log(), 10];
       *
       * const res = swtch_v1(arr2, opt2, "1");
       * ```
       * @param arr
       * @param opt
       * @param test
       * @returns
       */
      export const swtch_v1: Iswtch = function (arr, opt, test) {
        if (arr.length === 2) return swtch2(arr, opt, test);
        if (arr.length === 3) return swtch3(arr, opt, test);
        if (arr.length === 4) return swtch4(arr, opt, test);
        if (arr.length === 5) return swtch5(arr, opt, test);
      };
    }
  }
}
