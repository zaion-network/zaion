import { Action } from "./Action";

const syncfoo = () => {
  const action = new Action("sync", (a: string) => ({ name: a }), ["ciao"]);
  let res = action.value(...action.args);
  console.log(res.name);
};
syncfoo();

const asyncfoo = async () => {
  const action = new Action.AsyncAction(
    async (a: string) => ({ name: a }),
    ["bomba"]
  );
  const res = await action.value(...action.args);
  console.log(res);
};
asyncfoo();
