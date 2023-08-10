import { HighUtilities as H } from "../HighUtilities";
import { Application as A } from "./Application";
import { JavaScript as J } from "./JavaScript";
import { Node as N } from "./Node";

declare module "./Application" {}
declare module "./JavaScript" {}
declare module "./Node" {}
declare module "../HighUtilities" {
  export namespace HighUtilities {
    export import Application = A;
    export import JavaScript = J;
    export import Node = N;
  }
}
H.Application = A;
H.JavaScript = J;
H.Node = N;

export import HigherUtilities = H;

// export class HigherUtilities extends HighUtilities {}
// export namespace HigherUtilities {
//   export class Application<A extends any[], R, C> extends A<A, R, C> {}

//   export type GenericFunction<
//     A extends any[],
//     R
//   > = HighUtilities.GenericFunction<A, R>;

//   export class Node extends N {}
//   export namespace Node {
//     export namespace FileSystem {
//       export namespace StatsSync {
//         export type editedDate = N.FileSystem.StatsSync.editedDate;
//         export type editedPath = N.FileSystem.StatsSync.editedPath;
//         export interface genericGetLastModiftime<T = unknown, R = unknown>
//           extends N.FileSystem.StatsSync.genericGetLastModiftime<T, R> {}
//       }
//       export namespace ReaddirSync {
//         export interface ReaddirSync<T extends string[]>
//           extends N.FileSystem.ReaddirSync.ReaddirSync<T> {}
//         export interface Options extends N.FileSystem.ReaddirSync.Options {}
//       }
//     }
//   }

//   export class JavaScript extends J {}
//   export namespace JavaScript {
//     export namespace ObjectUtils {
//       export interface objectkeys extends J.ObjectUtils.objectkeys {}
//     }
//   }
// }
