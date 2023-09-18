#!/usr/bin/env node

import { existsSync, readFileSync, writeFileSync } from "fs";
import { App } from "./App.js";

const {
  ISSCRIPTFOLDER,
  ISROOTOFAPP,
  FILEEXISTS,
  FILENOTEXIST,
  ISJSON,
  ISNOTJSON,
  ISMONOREPO,
  ISNOTMONOREPO,
  GOTAPPPKGJSON,
  NOTGOTTHISPKGJSON,
  GOTDEPS,
  GOTADAPTEDDEPS,
  GOTMERGEDDATAS,
  DATASAVED,
} = App;

// EXECUTION

const packsInMonoRepo = { nostr: "^0.0.0", ui: "^0.0.0" };
const packsInStandAlone = {
  nostr: "git+https://github.com/zaion-network/nostr#v0.0.1",
  ui: "git+https://github.com/zaion-network/ui.git#v0.0.1",
};

const PACKSMAP = new Map()
  .set(true, packsInMonoRepo)
  .set(false, packsInStandAlone);

const fromScript = {
  ROOTPKGJSON: "../../../package.json",
  THISPKGJSON: "../package.json",
};
const fromRoot = {
  ROOTPKGJSON: "../../package.json",
  THISPKGJSON: "./package.json",
};

const PATHSMAP = new Map()
  .set(true, fromRoot)
  .set(false, fromScript);

const app = new App("zaion", "@zaionstate", PATHSMAP, PACKSMAP);

const rootChecker = (path) => {
  return !path.includes("script");
};

const exists = (path) => {
  return existsSync(path);
};

const reader = (path) => {
  return readFileSync(path, { encoding: "utf-8" });
};

const monorepoChecker = ({ json, reponame }) =>
  json.name === reponame;

const getter = ({ parsed, scope }) => {
  const deps = [];
  if ("dependencies" in parsed) {
    const keys = Object.keys(parsed.dependencies);
    keys.forEach((k) => {
      deps.push(["dependencies", k, parsed.dependencies[k]]);
    });
  }
  if ("devDependencies" in parsed) {
    const keys = Object.keys(parsed.devDependencies);
    keys.forEach((k) => {
      deps.push(["devDependencies", k, parsed.devDependencies[k]]);
    });
  }
  return deps
    .filter((d) => d[1].includes(scope))
    .map((e) => [e[0], e[1].replace(scope + "/", ""), e[2]]);
};

const getTargetInMap = (map, target, key) => map.get(target)[key];

const depsMapper = (map, target) => (e) =>
  [e[0], e[1], getTargetInMap(map, target, e[1])];

const adapter = ({ deps, map, target }) =>
  deps.map(depsMapper(map, target));

const makeDepRef = (scope, pack) => `${scope}/${pack}`;

const transformDeps =
  (scope, json) =>
  ([type, pack, link]) =>
    (json[type][makeDepRef(scope, pack)] = link);

const merger = ({ json, adaptedDeps, scope }) => {
  adaptedDeps.forEach(transformDeps(scope, json));
  return json;
};

const saver = ({ data, path }) => {
  try {
    const string = JSON.stringify(data, null, 2);
    writeFileSync(path, string);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const hIsRootOfApp = (path) => app.checkExistance(exists, path);
const hIsScriptFoldler = (path) => app.checkExistance(exists, path);
const hFileExists = (path) => app.readFileContent(reader, path);
const hFileNotExist = (trg) => app.readAppPkgJson(reader, trg);
const hIsJson = (props) => app.isMonorepo(monorepoChecker, props);
const hIsNotJson = () => {};
const hIsMonorepo = (target) => app.readAppPkgJson(reader, target);
const hIsNotMonorepo = () => {};
const hGotAppPkgJson = (props) => app.getThisDeps(getter, props);
const handleNotGotThisPackageJson = () => {};
const hGotDeps = (props) => app.adaptDependencyPath(adapter, props);
const hGotAdaptedDeps = (props) => app.mergeDatas(merger, props);
const handleGotMergedDatas = (props) => app.saveDatas(saver, props);
const handleDataSaved = () => {};

app.on(ISROOTOFAPP, hIsRootOfApp);
app.on(ISSCRIPTFOLDER, hIsScriptFoldler);
app.on(FILEEXISTS, hFileExists);
app.on(FILENOTEXIST, hFileNotExist);
app.on(ISJSON, hIsJson);
app.on(ISNOTJSON, hIsNotJson);
app.on(ISMONOREPO, hIsMonorepo);
app.on(ISNOTMONOREPO, hIsNotMonorepo);
app.on(GOTAPPPKGJSON, hGotAppPkgJson);
app.on(NOTGOTTHISPKGJSON, handleNotGotThisPackageJson);
app.on(GOTDEPS, hGotDeps);
app.on(GOTADAPTEDDEPS, hGotAdaptedDeps);
app.on(GOTMERGEDDATAS, handleGotMergedDatas);
app.on(DATASAVED, handleDataSaved);

app.checkIsRoot(rootChecker, process.cwd());
