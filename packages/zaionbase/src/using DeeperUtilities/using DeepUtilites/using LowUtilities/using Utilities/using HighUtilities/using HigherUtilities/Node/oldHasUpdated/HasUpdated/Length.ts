import { MethodWithStrategies } from "../../../../../../MethodWithStrategy";
import { Conditioner } from "../../../../../../../../Conditioner";
import { Scan } from "./Scan";

export class Length<
  S extends keyof typeof Length.lengthStrategies
> extends MethodWithStrategies<
  typeof Length.lengthStrategies,
  { default: Length.lengthStrat },
  S
> {
  constructor(selectedStrategy: S) {
    super(
      Length.lengthStrategies,
      { default: Length.lengthStrat },
      selectedStrategy
    );
  }
}
export namespace Length {
  export enum lengthStrategies {
    default = "default",
  }
  export const scan = (path: string) => new Scan("sh").execute(path) as any[];

  export interface lengthStrat {
    (db: { [k: string]: { hash: { nFiles: number } } }, path: string): 1 | 0;
  }
  const conditioner = new Conditioner();
  const boolean = conditioner.boolean;
  const makeValidations = Conditioner.makeValidations;
  export const lengthStrat: lengthStrat = (db, path) => {
    const condition = Length.scan(path).length === db[path].hash.nFiles;
    const ifTrue = () => 1;
    const ifFalse = () => 0;
    return boolean([condition, makeValidations([ifTrue, []], [ifFalse, []])]);
  };
}
