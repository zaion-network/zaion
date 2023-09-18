import { existsSync, rmSync } from "fs";

import type { Node } from "../../../../../../Node";
import { Conditioner } from "../../../../../Conditioner";

import { ReaddirSync as RDS } from "./FileSystem/ReaddirSync";
import { StatsSync as SS } from "./FileSystem/StatsSync";

export const ReaddirSync = RDS;
export const StatsSync = SS;

declare module "../../../../../../Node" {
  namespace Node {
    interface FileSystem {
      checkFileExists: FileSystem.checkFileExists;
      checkAndRemove: FileSystem.checkAndRemove;
      ReaddirSync: typeof RDS;
      StatsSync: typeof SS;
    }
    namespace FileSystem {
      interface checkAndRemove {
        (path: string): any;
      }
      interface checkFileExists {
        (path: string): Promise<boolean>;
      }
      export import StatsSync = SS;
      export import ReaddirSync = RDS;
    }
  }
}

export const checkFileExists: Node.FileSystem.checkFileExists = path => {
  return new Promise(resolve => {
    existsSync(path) ? resolve(true) : resolve(false);
  });
};

const conditioner = new Conditioner();
const mv = Conditioner.makeValidations;
export const checkAndRemove: Node.FileSystem.checkAndRemove = path => {
  const ifTrue = () => {
    rmSync(path);
    return true;
  };
  const bool: Conditioner.booleanCondition = [
    existsSync(path),
    mv([ifTrue, []], [() => false, []]),
  ];
  return conditioner.boolean(bool);
};
export class FileSystem {}
export namespace FileSystem {
  export import StatsSync = SS;
  export import ReaddirSync = RDS;
}
