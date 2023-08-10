import { BasicClass } from "./BasicClass";

const BASICCLASSEXAMPLE = 1;

const basicClassExample = () => {
  class MyClass extends BasicClass {
    constructor(value: boolean) {
      super();
      const iftrue: BasicClass.actionAndArgs = [() => console.log(true), []];
      const iffalse = () => console.log(false);
      const validations = MyClass.makeValidations(iftrue, [iffalse, []]);
      this.conditioner.boolean([value, validations]);
    }
  }

  const run = () => {
    new MyClass(true);
    new MyClass(false);
  };
  run();
};
if (BASICCLASSEXAMPLE) basicClassExample();
