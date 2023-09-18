import { MethodWithStrategies } from "../../../../../../MethodWithStrategy";
import { Crypto } from "../../../../Node/Crypto";

export class Hash<
  S extends keyof typeof Hash.hashStrategies = keyof typeof Hash.hashStrategies
> extends MethodWithStrategies<
  typeof Hash.hashStrategies,
  { default: Hash.hash },
  S
> {
  constructor(selectedStrategy: S) {
    super(Hash.hashStrategies, { default: Hash.hash }, selectedStrategy);
  }
}
export namespace Hash {
  export enum hashStrategies {
    default = "default",
  }
  export interface hashIt {
    (string: string): string;
  }
  export const hashIt: hashIt = Crypto.hashIt;

  export interface hash {
    (scanResult: string[], db: any, path: string): 1 | 0;
  }
  export const hash: hash = (scanResult, db, path) => {
    return new HashStrategy().hash(scanResult, db, path);
  };

  export class HashStrategy {
    hash: hash = (scanResult, db, path) => {
      let currenthash = hashIt(scanResult.join());
      console.log(currenthash);
      console.log(db[path].hash.value);
      if (currenthash === db[path].hash.value) return 1;
      else return 0;
    };
  }
}
