import { ArrayUtils as AU } from "./JavaScript/ArrayUtils";
import { ObjectUtils as OU } from "./JavaScript/ObjectUtils";
import { MapUtils as MU } from "./JavaScript/MapUtils";
import { ClassUtils as CU } from "./JavaScript/ClassUtils";
import { JSONUtils as JU } from "./JavaScript/JSONUtils";
import { Promise_utils as PU } from "./JavaScript/Promise_Utils";
import { StringUtils as SU } from "./JavaScript/StringUtils";
import { RegExpUtils as REU } from "./JavaScript/RegExpUtils";

// declare module "./JavaScript/ArrayUtils" {}
// declare module "./JavaScript/ObjectUtils" {}
// declare module "./JavaScript/MapUtils" {}
// declare module "./JavaScript/ClassUtils" {}
// declare module "./JavaScript/JSONUtils" {}
// declare module "./JavaScript/Promise_Utils" {}
// declare module "./JavaScript/StringUtils" {}
declare module "./JavaScript" {
  export namespace JavaScript {
    export import ArrayUtils = AU;
    export import ObjectUtils = OU;
    export import MapUtils = MU;
    export import ClassUtils = CU;
    export import JSONUtils = JU;
    export import Promise_utils = PU;
    export import String_utils = SU;
    export import RegExp_utils = REU;
  }
}

export interface JavaScript extends JavaScript.JavaScript {}
export class JavaScript implements JavaScript.JavaScript {}
// JavaScript.ArrayUtils = AU;
JavaScript.ObjectUtils = OU;
// JavaScript.MapUtils = MU;
// JavaScript.ClassUtils = CU;
// JavaScript.JSONUtils = JU;
// JavaScript.Promise_utils = PU;
// JavaScript.String_utils = SU;

export namespace JavaScript {
  export interface JavaScript {}

  export namespace ArrayBufferUtils {}
  export namespace AsyncFunction_utils {}
  export namespace AsyncGenerator_utils {}
  export namespace AsyncGeneratorFunction_utils {}
  export namespace AsyncIterator_utils {}
  export namespace DataView_utils {}
  export namespace Date_utils {}
  export namespace Error_utils {}
  export namespace Function_utils {}
  export namespace Generator_utils {}
  export namespace GeneratorFunction_utils {}
  export namespace Math_utils {}
  export namespace Proxy_utils {}
  export namespace RegExpUtils_utils {}
  export namespace Buffer_utils {}

  // export class JSONUtils extends JU {}
  // export namespace JSONUtils {}

  // export class ObjectUtils extends OU {}
  // export namespace ObjectUtils {
  //   export interface objectkeys extends OU.objectkeys {}
  // }

  // export class ArrayUtils extends AU {}
  // export namespace ArrayUtils {
  //   export class ExtendedArray extends Array {}
  //   export interface isArray extends AU.isArray {}
  //   export namespace MapCallbacks {
  //     export interface replace extends AU.MapCallbacks.replace {}
  //   }
  // }

  // export class MapUtils extends MU {}
  // export namespace MapUtils {
  //   export interface stringifyMap extends MU.stringifyMap {}
  //   export interface NonNullableMap<K, V> extends MU.NonNullableMap<K, V> {}
  // }

  export class SetUtils {}
  export namespace SetUtils {}

  // export class ClassUtils {}
  // export namespace ClassUtils {
  //   export interface defineSubClass<C, S extends C>
  //     extends CU.defineSubClass<C, S> {}
  //   export class BasicClass extends CU.BasicClass {}
  //   export type action = CU.action;
  //   export type actionAndArgs = CU.actionAndArgs;
  //   export type GenericFunction<A extends any[], R> = CU.GenericFunction<A, R>;
  // }

  // export class Promise_utils extends PU {}
  // export namespace Promise_utils {}

  export namespace GlobalUtils {
    export namespace setTimeoutUtils {}
    export namespace setIntervalUtils {}
  }
}
