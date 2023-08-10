import { Context } from "../../../Context";

const RESULTEXAMPLME = 1;

const resultExample = () => {
  const res = new Context.Result(10);
  new Context.Result.ResultState.Fullfilled(14, res);
  new Context.Result.ResultState.Fullfilled(100, res);
  console.log(res.value);
};
if (RESULTEXAMPLME) resultExample();
