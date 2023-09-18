import { readFileSync } from "fs";
import { extname } from "path";
import { js } from "@zionstate/zionbase/utils";

const { ZionRegExp } = js;
const regexp = ZionRegExp.allTsComments;
// TODO #184 @giacomogagliano integrare la regexp qui sopra
regexp;

const regexpdasubs = /(\/\*)\s.*(\*\/)|(\/\/)\s.*()/g;
const regexp2 = /\s/g;

export function readJSON_v1<T>(path: string): T | string {
  const extension = extname(path);
  let obj;
  if (extension !== ".json") throw "not json";
  let string = readFileSync(path).toString();
  const hasMatches = regexpdasubs.test(string);
  if (hasMatches)
    string = string.replace(regexpdasubs, "");
  string = string.replace(regexp2, "");
  try {
    obj = JSON.parse(string);
  } catch (error) {
    return "error in the formatting";
  }
  return obj;
}
