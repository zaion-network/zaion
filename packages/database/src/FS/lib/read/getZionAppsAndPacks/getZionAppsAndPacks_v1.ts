import { join } from "path";
import { read } from "..";
import { getPathsOfZionPacks } from "../getPathsOfZionPacks";

export function getZionAppsAndPacks_v1(
  packagesPath: string,
  appsPath: string,
  options: { separated: true }
): { apps: string[]; packages: string[] };
export function getZionAppsAndPacks_v1(
  packagesPath: string,
  appsPath: string,
  options?: { separated: boolean }
): string[];
export function getZionAppsAndPacks_v1(
  packagesPath: string,
  appsPath: string,
  options?: { separated: boolean }
) {
  const folders = read(packagesPath);
  const packages = getPathsOfZionPacks(folders, packagesPath);
  const apps = read(appsPath).map((app) => join(appsPath, app));
  if (!options) {
    return packages.concat(apps);
  }
  if (options.separated) {
    return { apps, packages };
  }
}
