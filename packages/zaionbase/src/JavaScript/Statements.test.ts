import { Statements } from "./Statements";

const functionthatmayreturnError = (error: boolean) => {
  if (error) throw new Error("mannaggia");
  else return "o mamma mia";
};

const trycatch1 = new Statements.TryCatch({
  positiveCb: () => {
    functionthatmayreturnError(false);
    return true;
  },
});

const trycatch2 = new Statements.TryCatch({
  positiveCb: () => {
    functionthatmayreturnError(true);
    return true;
  },
});

console.log(trycatch1.run());
console.log(trycatch2.run());
