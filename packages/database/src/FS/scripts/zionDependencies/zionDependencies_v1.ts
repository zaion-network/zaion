export const zionDependencies_v1 = "zionDependencies_v1";

import { writeFileSync } from "fs";
import { join } from "path";
import {
  composeNewObj,
  filterZion,
  getFileFromPath,
  getZionAppsAndPacks,
  mapObject,
} from "../../lib";

const packages = "packages";
const apps = "apps";
const file = "package.json";
const path = "/Users/WAW/Documents/Projects/ZION/";
const packagesPath = join(path, packages);
const appsPath = join(path, apps);

// const fileextension = /(\..*)/g;

export const main = function () {
  const joint = getZionAppsAndPacks(
    packagesPath,
    appsPath
  );
  const allPacksJson = getFileFromPath(joint, file);
  ///////
  if (!allPacksJson) throw new Error("");
  const allDeps = mapObject(allPacksJson, "dependencies");
  const allDevDeps = mapObject(
    allPacksJson,
    "devDependencies"
  );
  const allPeerDeps = mapObject(
    allPacksJson,
    "peerDependencies"
  );
  ////////
  const newJson = {
    dependencies: {},
    devDependencies: {},
    peerDependencies: {},
  };
  const zionJson = {
    dependencies: {},
    devDependencies: {},
    peerDependencies: {},
  };
  ///////
  // deps
  filterZion(allDeps, zionJson, "dependencies");
  // TODO #193 @giacomogagliano trovare solution typescript
  // @ts-expect-error
  filterThirdParties(allDeps, newJson, "dependencies");
  // devDeps
  filterZion(allDevDeps, zionJson, "devDependencies");
  // TODO trovare solution typescript
  // @ts-expect-error
  filterThirdParties(
    allDevDeps,
    newJson,
    "devDependencies"
  );
  // peerDeps
  filterZion(allPeerDeps, zionJson, "peerDependencies");
  // TODO trovare solution typescript
  // @ts-expect-error
  filterThirdParties(
    allPeerDeps,
    newJson,
    "peerDependencies"
  );
  writeFileSync(
    join(process.cwd(), "newJson.json"),
    JSON.stringify(composeNewObj(newJson, zionJson))
  );
};

// try {
//   main();
// } catch (error) {
//   console.log(error);
// }
