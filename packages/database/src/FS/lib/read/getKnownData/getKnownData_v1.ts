import fs from "fs";
import { js } from "@zionstate/zionbase/utils";
const { ZionRegExp } = js;

const check1 = ZionRegExp.tsComment;
const check2 = ZionRegExp.tsComment2;

type getKnownData_v1<T> = (path: string) => Promise<T>;
export const getKnownData_v1 = function <T>(
  path: string
): Promise<T> {
  let file = fs.readFileSync(path).toString();
  const cond1 = file.match(check1);
  const cond2 = file.match(check2);
  cond1 ? (file = file.replace(check1, "")) : file;
  cond2 ? (file = file.replace(check2, "")) : file;
  return JSON.parse(file);
};
