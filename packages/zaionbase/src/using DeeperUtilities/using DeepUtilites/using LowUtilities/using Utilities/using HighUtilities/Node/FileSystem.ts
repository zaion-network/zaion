import { existsSync, rmSync } from "fs";
import { HighUtilities } from "../../HighUtilities";
import { ReaddirSync as RDS } from "./FileSystem/ReaddirSync";
import { StatsSync as SS } from "./FileSystem/StatsSync";

declare module "./FileSystem/ReaddirSync" {}
declare module "./FileSystem/StatsSync" {}

export class FileSystem {}

export namespace FileSystem {
  const conditioner = new HighUtilities.Conditioner();
  const mv = HighUtilities.Conditioner.makeValidations;
  export const checkFileExists: (path: string) => Promise<boolean> = (path) => {
    return new Promise((resolve) => {
      existsSync(path) ? resolve(true) : resolve(false);
    });
  };
  export interface checkAndRemove {
    (path: string): any;
  }
  export const checkAndRemove: checkAndRemove = (path) => {
    const ifTrue = () => {
      rmSync(path);
      return true;
    };
    const bool: HighUtilities.Conditioner.booleanCondition = [
      existsSync(path),
      mv([ifTrue, []], [() => false, []]),
    ];
    return conditioner.boolean(bool);
  };

  export import StatsSync = SS;

  export import ReaddirSync = RDS;
}
