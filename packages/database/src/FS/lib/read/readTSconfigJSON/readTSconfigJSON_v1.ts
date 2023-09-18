import { tsconfigJSON } from "../../types";
import { readJSON } from "../readJSON";

type DataType = tsconfigJSON.DataType;

export function readTSconfigJSON_v1(path: string): DataType | string {
  let res = readJSON<DataType>(path);
  return res;
}
export let a = 1;
