import {
  GConstructor as GC,
  AnyCtor_v1 as AC,
  InferInstance as II,
} from "/Users/WAW/Documents/Projects/zaion-network-state/packages/zaionbase/src/zionbase/Types/Constructors/Constructors_v1";
import { Types } from "./Types/Types";

declare module "./FunctionTypes" {
  namespace FunctionTypes {
    type GenericFunction<A extends any[], R> = (...args: A) => R;
    type DymanicGenericFunction<
      A extends any[],
      T extends [[any, any], [any, any]]
    > = (
      ...args: A
    ) => A extends T[0][0] ? T[0][1] : A extends T[1][0] ? T[1][1] : never;
    type AnyFunction = GenericFunction<any, any>;
    type GenericVoidFunction<A> = GenericFunction<[A], void>;
    type AnyVoidFunction = GenericFunction<any, any>;
    type inferGenericFunction<F> = F extends GenericFunction<
      infer A extends any[],
      infer R
    >
      ? GenericFunction<A, R>
      : AnyVoidFunction;

    namespace Ctors {
      /**
       * Generic type constructor. It accepts only one type
       * parameters which describe the interface of the
       * returned instance.
       */
      type GConstructor<T> = GC<T>;
      type AnyCtor = AC;
      type Ctor<C extends readonly any[], T> = new (...args: C) => T;

      /**
       * Represents a typing for a class constructor that returns a generic interface.
       *
       * @template C - The tuple of constructor arguments.
       * @template V - The value type of the generic interface.
       * @returns A constructor type that creates instances of `Types.Record.GenericRecord<V>`.
       */
      type GRecordCtor<C extends any[], V> = new (
        ...args: C
      ) => Types.Record.GenericRecord<V>;

      type InferInstance<t extends new (...args: any) => any> = II<t>;
      type flattenCtor<C> = C extends Ctor<infer A, infer V>
        ? [A, Types.flatten<V>]
        : never;
    }
  }
}
export class FunctionTypes {}
export namespace FunctionTypes {}

// // this generates a strict requirement
// type MyRecord = Types.Record.GenericRecord<{ name: number }, "value">;
// // this generates a losey requirement
// type MyRecord2 = Types.Record.GenericRecord<{ name: number }>;
// type ou = { value: { name: number } };
// type oo = { value: { name: number }; s: number };
// type oi = { value: { namd: number }; valu: { name: number } };
// type test1 = ou extends MyRecord ? true : false; // true
// type test1a = ou extends MyRecord2 ? true : false; // true
// type test2 = oo extends MyRecord ? true : false; // true
// type test2a = oo extends MyRecord2 ? true : false; // false
// type test3 = oi extends MyRecord ? true : false; // false
// type test3a = oi extends MyRecord2 ? true : false; // false

// type bitch = new () => MyRecord;
// type test4 = bitch extends FunctionTypes.Ctors.GRecordCtor<any, any>
//   ? true
//   : false;
