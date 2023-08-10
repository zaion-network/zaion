import { Conditioner } from "./Conditioner";
const conditiner = new Conditioner();

const boolean = () => {
  type booleanconditions = Conditioner.booleanCondition;
  const cond = true;
  const conditions: booleanconditions = [
    cond,
    [
      [
        true,
        (mes: string) => {
          console.log(mes);
          return 0;
        },
        ["ciao"],
      ],
      [false, () => console.log("false"), []],
    ],
  ];

  let res = conditiner.boolean(conditions);
  console.log("boolean return: ", res);
};
boolean();

const multipleConditions = () => {
  const condition1 = false;
  const condition2 = false;
  const condition3 = false;
  const arr: Conditioner.condition[] = [
    [condition1, () => console.log("condition1"), []],
    [condition2, (a: string) => console.log(a), ["condition2"]],
    [condition3, (a: string) => a, ["condition3"]],
  ];
  let res = conditiner.elseIf("", arr, [(a) => a, ["test"]]);
  console.log(res);
};
multipleConditions();

const booleanTrue = () => {
  const condition = false;
  let res = conditiner.booleanTrue(condition, [(a) => a, ["test2"]]);
  console.log(res);
};
booleanTrue();

const booleanFalse = () => {
  const condition = false;
  let res = conditiner.booleanFalse(condition, [(a) => a, ["testfalse"]]);
  console.log(res);
};
booleanFalse();

const safeGuardError = () => {
  const condition = true;
  try {
    let res = conditiner.safeGuardError([condition, "error"]);
  } catch (error: any) {
    console.log("got this error: ", error.message);
  }
};
safeGuardError();
