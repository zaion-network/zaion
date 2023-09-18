import { readdirSync } from "fs";
import { NoizPath } from "../../classes";
import { system } from "../../classes/System";
import { addPath } from "@zionstate/zionbase/zionbase";
export function read_v1(folder: string): string[] {
  const workingDir = process.cwd();
  const dataFolder = "data";
  const folderName = folder;
  const libpath = [workingDir, dataFolder, folderName];
  let path = new NoizPath(libpath).path;

  return (() => {
    const filesInFolder =
      system.arrayOfNamesOfFilesInFolder(path);
    let paths: string[] = [];
    filesInFolder.forEach(addPath, paths);
    return paths;
  })();
}

export function read2(
  folder: string,
  filetypes: boolean = false
): string[] | undefined {
  {
    let options = undefined;
    if (filetypes) options = { withFileTypes: filetypes };
    if (!options)
      return readdirSync(folder)
        .filter(ent => ent[0] !== ".")
        .filter(ent => ent !== "giacomo");
  }
}
