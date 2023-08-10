import { HigherUtilities } from "../HigherUtilites";

export const compareObj: compareObj.compareObj = (obj1, obj2) =>
  HigherUtilities.Node.Crypto.hashIt(JSON.stringify(obj1)) ===
  HigherUtilities.Node.Crypto.hashIt(JSON.stringify(obj2));

export namespace compareObj {
  export interface compareObj {
    (obj1: object, obj2: object): boolean;
  }
}
