import { targetInPkgJson } from "../../types";
import { addKeyValueToArray } from "./addKeyValueToArray";

export const composeNewObj_v1 = (
  newJson: targetInPkgJson,
  zionJson: targetInPkgJson
) => {
  let newdepsarray: [string, number][] = [];
  let newdevdepsarray: [string, number][] = [];
  let newpeerdepsarray: [string, number][] = [];
  let newobj: {
    dependencies: { [key: string]: number };
    devDependencies: { [key: string]: number };
    peerDependencies: { [key: string]: number };
  } = {
    dependencies: {},
    peerDependencies: {},
    devDependencies: {},
  };
  // deps
  addKeyValueToArray(newJson, "dependencies", newdepsarray);
  addKeyValueToArray(zionJson, "dependencies", newdepsarray);
  // devdeps
  addKeyValueToArray(newJson, "devDependencies", newdevdepsarray);
  addKeyValueToArray(zionJson, "devDependencies", newdevdepsarray);
  // peerdeps
  addKeyValueToArray(newJson, "peerDependencies", newpeerdepsarray);
  addKeyValueToArray(zionJson, "peerDependencies", newpeerdepsarray);
  // Sorting
  const deps = newdepsarray.sort();
  const dev = newdevdepsarray.sort();
  const peer = newpeerdepsarray.sort();
  // recreating objects
  deps.forEach((ent) => (newobj.dependencies[ent[0]] = ent[1]));
  dev.forEach((ent) => (newobj.devDependencies[ent[0]] = ent[1]));
  peer.forEach((ent) => (newobj.peerDependencies[ent[0]] = ent[1]));
  return newobj;
};
