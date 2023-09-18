export const buildInPackages_v1 = "buildInPackages_v1";

import { existsSync, writeFileSync } from "fs";
import { join } from "path";
import {
  backup,
  getFileFromPath,
  getZionAppsAndPacks,
  mapObject,
} from "../../lib";
const path = "/Users/WAW/Documents/Projects/ZION/";

const packages = "packages";
const apps = "apps";
const file = "package.json";
const tsconfig = "tsconfig.json";
const packagesPath = join(path, packages);
const appsPath = join(path, apps);
////

export function run() {
  const joint = getZionAppsAndPacks(
    packagesPath,
    appsPath,
    {
      separated: true,
    }
  );
  const appsPackageJson = getFileFromPath(
    joint.apps,
    file
  );
  const appsTsConfigJson = getFileFromPath(
    joint.apps,
    tsconfig,
    true,
    true
  );
  const packsPackageJson = getFileFromPath(
    joint.packages,
    file
  );
  const packsTsConfigJson = getFileFromPath(
    joint.packages,
    tsconfig,
    true,
    false
  );
  if (!appsPackageJson) throw new Error("");
  if (!packsPackageJson) throw new Error("");
  if (!appsTsConfigJson) throw new Error("");
  if (!packsTsConfigJson) throw new Error("");
  const mappedApps = mapObject(
    appsPackageJson,
    "scripts",
    { perPack: true }
  );
  const mapdpackscr = mapObject(
    packsPackageJson,
    "scripts",
    { perPack: true }
  );
  // make backup
  appsTsConfigJson.forEach(_tsconfig => {
    backup([_tsconfig[0], _tsconfig[1], tsconfig]);
  });
  packsTsConfigJson.forEach(_tsconfig => {
    backup([_tsconfig[0], _tsconfig[1], tsconfig]);
  });
  // CREATES MAPS WITH PACK name, path and build folder name
  const mappedAppJson = appsPackageJson.map(pack => {
    const BUILD = "build";
    const BUILT = "built";
    const DIST = "dist";
    const regexp = /(@.*\/)/g;
    if (!regexp.exec(pack.name)) throw new Error("");
    const res = regexp.exec(pack.name);
    if (!res) throw new Error("");
    const name = pack.name.replace(res[0], "");
    const apppath = join(appsPath, name);
    const oldPack = {};
    Object.assign(oldPack, pack);
    let outdir: string;
    let hasModules: boolean = false;
    if (existsSync(join(apppath, BUILD))) outdir = BUILD;
    if (existsSync(join(apppath, BUILT))) outdir = BUILT;
    if (existsSync(join(apppath, DIST))) outdir = DIST;
    else outdir = "no outdir";
    if (existsSync(join(apppath, "node_modules")))
      hasModules = true;
    backup([name, pack, "package.json"]);
    return [
      [name, apppath, outdir, hasModules],
      pack,
      oldPack,
    ];
  });
  const mappedPackJson = packsPackageJson.map(pack => {
    const packagePath = join(packagesPath, pack.name);
    const BUILD = "build";
    const BUILT = "built";
    const DIST = "dist";
    const regexp = /(@.*\/)/g;
    const res = regexp.exec(pack.name);
    if (!res) throw new Error("");
    const name = pack.name.replace(res[0], "");
    // const packpath = join(appsPath, name);
    let outdir: string;
    let hasModules: boolean = false;
    if (existsSync(join(packagePath, BUILD)))
      outdir = BUILD;
    if (existsSync(join(packagePath, BUILT)))
      outdir = BUILT;
    if (existsSync(join(packagePath, DIST))) outdir = DIST;
    else outdir = "no outdir specified";
    if (existsSync(join(packagePath, "node_modules")))
      hasModules = true;
    // console.log(pack.name);

    backup([name, pack, "package.json"]);
    return [
      [pack.name, packagePath, outdir, hasModules],
      pack,
    ];
  });
  // EDIT SCRIPTS APPS
  mappedApps.map(obj => {
    if (!obj[1].build) obj[1].build = "next dev";
    if (!obj[1].dev) obj[1].dev = "next dev";
    if (!obj[1].prod) obj[1].prod = "next start";
    if (!obj[1].typecheck)
      obj[1].typecheck = "tsc --noEmit";
    return [obj[0], { scripts: obj[1] }];
  });
  // EDIT SCRIPTS PACKAGES
  mapdpackscr
    .map(pack => {
      if (!pack[1]) pack = [pack[0], {}];
      return pack;
    })
    .map(pack => {
      let outdir = "dist";
      if (pack[0] !== "@zionstate/ui") {
        if (!pack[1].clean)
          pack[1].clean = "rm -rf " + outdir;
        if (!pack[1].build)
          pack[1].build = "run-p build:*";
        if (!pack[1]["build"]) pack[1]["build"] = "tsc";
        if (!pack[1].typecheck)
          pack[1].typecheck = "tsc --noEmit";
      }
      return pack;
    });
  // EDIT ROOT PACKAGE JSON
  mappedAppJson.map(pack => {
    if (!pack[1].type) pack[1].type = "module";
    if (!pack[1].source) pack[1].source = "src/index.ts";
    if (existsSync(join(pack[0][1], "node_modules")))
      pack[0].push(true);
    if (pack[0][2])
      pack[1].scripts.clean = `rm -rf ${pack[0][2]}`;
    return pack;
  });
  mappedPackJson.map(pack => {
    if (!pack[1].type) pack[1].type = "module";
    if (!pack[1].source) pack[1].source = "src/index.ts";
    if (pack[0][0] !== "@zionstate/ui")
      pack[1].main = `${pack[0][2]}/index.js`;
    if (!pack[1].files) pack[1].files = [pack[0][2]];
    if (!pack[1].types)
      pack[1].types = `${pack[0][2]}/index.d.ts`;
    return pack;
  });

  const all = mappedAppJson.concat(mappedPackJson);
  all.forEach(appOrPack => {
    const path = appOrPack[0][1];
    const json = appOrPack[1];
    writeFileSync(join(path, file), JSON.stringify(json));
    console.log(appOrPack[1]);
  });
}

// run();

// .flat()
// .map((ent) => ent.join("/"))
// .map((ent) => join(packagesPath, ent));

export const pack = `
"scripts": {
  "clean": "rm -rf dist",
  "build": "run-p build:*",
  "build:types": "tsc --declaration --emitDeclarationOnly --outDir dist",
  "typecheck": "tsc --noEmit"
},
`;

export const exportus = `

"name": "@zionstate/ui",
"version": "0.0.1",
"description": "",
"source": "src/index.ts",
"main": "dist/@zionstate/ui.cjs.js",
"module": "dist/@zionstate/ui.esm.js",
"types": "dist/index.d.ts",
"exports": {
  ".": {
    "import": "./dist/@zionstate/ui.esm.js",
    "require": "./dist/@zionstate/ui.cjs.js"
  }
},
"files": [
  "dist"
],
"keywords": [],
"author": "Gagliano Giacomo",
"license": "ISC",
"type": "module",
`;
