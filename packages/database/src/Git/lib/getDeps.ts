import { ZionError } from "@zionstate/zionbase/utils";
import { Repo } from "../Repo";

const NAME = getDeps.name;
const NOPKGJSONERROR = "no pkg.json in repo";
const STRINGPKGJSON = "pkg json is a string";
const NPJE = NOPKGJSONERROR;

function getDeps(repo: Repo): string[] {
  let result, deps: string[], devDeps: string[];
  deps = [];
  devDeps = [];
  if (!repo.hasPackageJSON)
    throw new ZionError(NPJE, NAME, arguments);
  if (typeof repo.packageJSON === "string")
    throw new ZionError(STRINGPKGJSON, NAME, arguments);
  if (!repo.packageJSON)
    throw new ZionError(NOPKGJSONERROR);
  if (!repo.packageJSON?.dependencies) deps = [];
  if (repo.packageJSON?.dependencies)
    deps = Object.keys(repo.packageJSON.dependencies);
  if (!repo.packageJSON.devDependencies) devDeps = [];
  if (repo.packageJSON.devDependencies)
    devDeps = Object.keys(
      repo.packageJSON.devDependencies
    );
  result = deps.concat(devDeps);
  return result;
}
