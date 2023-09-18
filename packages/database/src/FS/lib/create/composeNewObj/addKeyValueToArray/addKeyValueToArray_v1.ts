import { targetInPkgJson } from "../../../types";

export function addKeyValueToArray_v1<
  T = targetInPkgJson,
  X extends keyof T = keyof T
>(obj: T, field: X, array: [keyof T[X], any][]) {
  for (let key in obj[field]) array.push([key, obj[field][key]]);
}
