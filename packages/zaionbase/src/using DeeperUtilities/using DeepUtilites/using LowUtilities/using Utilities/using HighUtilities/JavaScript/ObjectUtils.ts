import "../../../../../../JavaScript";
import { FilterCallbacks, filterArray as fa } from "./ArrayUtils";

declare module "./ObjectUtils" {
  type filterCallbackMaker<V, T = V> = FilterCallbacks.filterCallbackMaker<
    V,
    T
  >;
  type filterArray = fa;
  type StringGenericObj<T> = {
    [k: string]: T;
  };

  type StringAnyObj = StringGenericObj<any>;

  interface objectkeys {
    <O extends { [k: string]: string | number | undefined }>(obj: O): string[];
  }

  interface encodeQueryParamFromObj {
    (obj: { [k: string]: string | number | undefined }): string;
  }

  interface getKeyInObjOfObjWithFilterMkr {
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
  interface makeArrayFromEnum {
    <
      T extends {
        [k: string]: string;
      }
    >(
      e: T
    ): (keyof T)[];
  }
}

declare module "../../../../../../JavaScript" {
  namespace JavaScript {
    interface ObjectUtils {
      objectkeys: objectkeys;
      encodeQueryParamFromObj: encodeQueryParamFromObj;
      getKeyInObjOfObjWithFilterMkr: getKeyInObjOfObjWithFilterMkr;
      makeArrayFromEnum: makeArrayFromEnum;
    }
    namespace ObjectUtils {}
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
  export const objectkeys: objectkeys = obj => keys(obj);

  export const encodeQueryParamFromObj: encodeQueryParamFromObj = obj =>
    (objectkeys(obj) as (keyof typeof obj)[])
      .map(e => `${e}=${obj[e]}`)
      .join("&");

  export const getKeyInObjOfObjWithFilterMkr: getKeyInObjOfObjWithFilterMkr =
    (filterCb, filterMaker, keys) =>
    (target, starting_chars) =>
    (source, key, cb) =>
    e => {
      if (!source) throw new Error("no source");
      return [
        e,
        target[e][filterCb(keys(target[e]), filterMaker(starting_chars))[0]!][
          key
        ].map(cb),
      ];
    };

  export const makeArrayFromEnum = <T extends { [k: string]: string }>(
    e: T
  ): (keyof T)[] => Object.values(e);
}

const keys = Object.keys;
// export interface compareObj {
//   (obj1: object, obj2: object): boolean;
// }

// export const compareObj: compareObj = (obj1, obj2) =>
//   HighUtilities.hashIt(JSON.stringify(obj1)) ===
//   HighUtilities.hashIt(JSON.stringify(obj2));
export const objectkeys: objectkeys = obj => keys(obj);

export const encodeQueryParamFromObj: encodeQueryParamFromObj = obj =>
  (objectkeys(obj) as (keyof typeof obj)[])
    .map(e => `${e}=${obj[e]}`)
    .join("&");

export const getKeyInObjOfObjWithFilterMkr: getKeyInObjOfObjWithFilterMkr =
  (filterCb, filterMaker, keys) =>
  (target, starting_chars) =>
  (source, key, cb) =>
  e => {
    if (!source) throw new Error("no source");
    return [
      e,
      target[e][filterCb(keys(target[e]), filterMaker(starting_chars))[0]!][
        key
      ].map(cb),
    ];
  };

export const makeArrayFromEnum: makeArrayFromEnum = e => Object.values(e);
