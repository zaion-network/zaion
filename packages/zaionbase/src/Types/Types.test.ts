import { Types } from "./Types";

interface Person {
  firstName: string;
  lastName: string;
  dob: Date;
  hasCats: false;
}

export type keys = Types.TupleUnion<keyof Person>;

export interface IcalculateBitsForNumber {
  (x: number): number;
}

export const calculateBitsForNumber: IcalculateBitsForNumber = function (
  x: number
): number {
  return Math.ceil(Math.log2(x + 1));
};

abstract class CalculationStrategy extends Types.Class.Strategy {
  abstract method(x: unknown): number;
  abstract name: string;
}

class NumberCalculationStrategy implements CalculationStrategy {
  method = calculateBitsForNumber;
  name = "number-calculation-strategy";
}

export interface IcalculateBitsForString {
  (x: string): number;
}
export const calculateBitsForString: IcalculateBitsForString = function (
  x: string
): number {
  return x.length * 8;
};

class StringCalculationStrategy implements CalculationStrategy {
  method = calculateBitsForString;
  name = "string-calculation-strategy";
}

export abstract class BitsCalculator {
  static NumberCalculationStrategy = NumberCalculationStrategy;
  static StringCalculationStrategy = StringCalculationStrategy;
  private strategy: CalculationStrategy;
  constructor(strategy?: CalculationStrategy) {
    if (!strategy)
      this.strategy = new BitsCalculator.NumberCalculationStrategy();
    else this.strategy = strategy;
  }
  calculateBits(x: any): number {
    return this.strategy.method(x);
  }
}
