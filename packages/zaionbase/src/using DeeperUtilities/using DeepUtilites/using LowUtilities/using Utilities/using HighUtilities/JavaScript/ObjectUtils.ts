import { ArrayUtils } from "./ArrayUtils";

type filterCallbackMaker<
  V,
  T = V
> = ArrayUtils.FilterCallbacks.filterCallbackMaker<V, T>;
type filterArray = ArrayUtils.filterArray;

declare module "./ObjectUtils" {
  export namespace ObjectUtils {
    type StringGenericObj<T> = {
      [k: string]: T;
    };

    type StringAnyObj = StringGenericObj<any>;

    export interface objectkeys {
      <O extends { [k: string]: string | number | undefined }>(
        obj: O
      ): string[];
    }

    export interface encodeQueryParamFromObj {
      (obj: { [k: string]: string | number | undefined }): string;
    }

    export interface getKeyInObjOfObjWithFilterMkr {
      (
        filterCb: filterArray,
        filterMaker: filterCallbackMaker<string>,
        keys: (o: {}) => string[]
      ): <T extends StringAnyObj>(
        target: T extends {
          [k: string]: infer X;
        }
          ? StringGenericObj<X>
          : never,
        starting_chars: string
      ) => <S extends unknown, K extends keyof S, Kel extends S[K] = S[K]>(
        source: S,
        key: K,
        cb: (k: Kel extends any[] ? Kel[number] : never) => any
      ) => (e: T[string]) => [string, string[]];
    }
  }
}

export class ObjectUtils {}
export namespace ObjectUtils {
  const keys = Object.keys;
  // export interface compareObj {
  //   (obj1: object, obj2: object): boolean;
  // }

  // export const compareObj: compareObj = (obj1, obj2) =>
  //   HighUtilities.hashIt(JSON.stringify(obj1)) ===
  //   HighUtilities.hashIt(JSON.stringify(obj2));
  export const objectkeys: objectkeys = (obj) => keys(obj);

  export const encodeQueryParamFromObj: encodeQueryParamFromObj = (obj) =>
    (objectkeys(obj) as (keyof typeof obj)[])
      .map((e) => `${e}=${obj[e]}`)
      .join("&");

  export const getKeyInObjOfObjWithFilterMkr: getKeyInObjOfObjWithFilterMkr =
    (filterCb, filterMaker, keys) =>
    (target, starting_chars) =>
    (source, key, cb) =>
    (e) => {
      if (!source) throw new Error("no source");
      return [
        e,
        target[e][filterCb(keys(target[e]), filterMaker(starting_chars))[0]][
          key
        ].map(cb),
      ];
    };
}
