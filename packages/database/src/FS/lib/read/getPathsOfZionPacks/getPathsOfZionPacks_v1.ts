import { join } from "path";
import { read } from "..";

export function getPathsOfZionPacks_v1(
  folders: string[],
  packagesPath: string
) {
  return folders
    .map((pack) =>
      read(join(packagesPath, pack))
        .filter((ent) => ent[0] !== "@") // filters visualcode files
        .map((res) => [pack, res])
    )
    .flat()
    .map((ent) => ent.join("/"))
    .map((ent) => join(packagesPath, ent));
}
