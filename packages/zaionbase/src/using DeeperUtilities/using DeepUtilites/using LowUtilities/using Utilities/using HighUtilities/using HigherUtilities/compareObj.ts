import { Crypto } from "../Node/Crypto";

export const compareObj: compareObj = (obj1, obj2) =>
  Crypto.hashIt(JSON.stringify(obj1)) === Crypto.hashIt(JSON.stringify(obj2));

export interface compareObj {
  (obj1: object, obj2: object): boolean;
}
