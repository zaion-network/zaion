// import { readJSON } from "./readJSON.js";
// import { packageJSON } from "./types/index.js";

// import { packageJSON } from "../../types";
import { packageJSON } from "../../types";
import { readJSON } from "../readJSON";

type DataType = packageJSON.DataType2;

export function readPackageJSON_v1(path: string): DataType | string {
  let res = readJSON<DataType>(path);
  return res;
}
