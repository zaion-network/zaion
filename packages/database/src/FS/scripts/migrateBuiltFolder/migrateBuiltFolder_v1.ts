import fs from "fs";
import { join } from "path";
import {
  js,
  // node
} from "@zionstate/zionbase/utils";
import {
  changePackJson,
  changeTsConfig,
  deleteFolder,
  getKnownData,
  writeFile,
} from "../../lib";
import {
  jsconfigJSON,
  tsconfigJSON,
} from "../../lib/types";

export const migrateBuiltFolder_v1 =
  "migrateBuiltFolder_v1";
// const runProcess = node.process.runProcess;

const { ZionRegExp } = js;
// TODO #191 @giacomogagliano da cancellare ZionRegExp
ZionRegExp;

const sourceRepo: string =
  "/Users/WAW/Documents/Projects/ZION/packages/@zionstate_node/crypto";
const targetName: string = "built";
const newFolderName: string = "build/index.js";
const folderToExclude = "./build/**/*";
const packJson: string = "package.json";
const tsConfig: string = "tsconfig.json";
const packJsonPath: string = join(sourceRepo, packJson);
const tsConfigPath: string = join(sourceRepo, tsConfig);

const getPackJson = getKnownData<jsconfigJSON.DataType>;
const getTsConfig = getKnownData<tsconfigJSON.DataType>;

export async function main() {
  const dirent: string[] = fs.readdirSync(sourceRepo);
  const hasBuilt = dirent.some(
    entity => entity === targetName
  );
  hasBuilt
    ? await deleteFolder(join(sourceRepo, targetName))
    : {};
  const packJson = await getPackJson(packJsonPath);
  const updatedJson = await changePackJson(
    packJson,
    newFolderName
  );
  const tsConfigJson = await getTsConfig(tsConfigPath);
  const updatedTs = await changeTsConfig(
    tsConfigJson,
    newFolderName,
    folderToExclude
  );
  [
    [updatedJson, packJsonPath],
    [updatedTs, tsConfigPath],
  ].forEach(
    async tuple =>
      await writeFile(
        tuple[1] as string,
        JSON.stringify(tuple[0])
      )
  );
}

// runProcess(main, { successMess: "Build system enabled" });
