import { MethodWithStrategies } from "./MethodWithStrategy";

enum strategiesTypes {
  strategyA = "strategyA",
  strategyB = "strategyB",
}

type strategiesKeys = keyof typeof strategiesTypes;

interface strategies {
  strategyA: Method;
  strategyB: Method;
}

interface Method {
  (a: string): string[];
}

const strategyA: Method = (a) => [a];
const strategyB: Method = (a) => a.split("");

class NewClass<
  S extends strategiesKeys = strategiesKeys
> extends MethodWithStrategies<typeof strategiesTypes, strategies> {
  constructor(selected: S) {
    super(strategiesTypes, { strategyA, strategyB }, selected);
  }
}

const testTheNewClass = () => {
  const newclass = new NewClass("strategyA").execute;
  const newclass2 = new NewClass("strategyB").execute;
  const res = newclass("ciao");
  const res2 = newclass2("ciao");
  console.log(res);
  console.log(res2);
};
testTheNewClass();
