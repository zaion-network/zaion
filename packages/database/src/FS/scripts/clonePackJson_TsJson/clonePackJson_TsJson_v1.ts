// import { node } from "@zionstate/zionbase/utils";
import { join } from "path";
import {
  changeJson,
  changePackJson,
  getKnownData,
  writeFile,
} from "../../lib";
import {
  jsconfigJSON,
  tsconfigJSON,
} from "../../lib/types";

export const clonePackJson_TsJson_v1 =
  "clonePackJson_TsJson_v1";

// const runProcess = node.process.runProcess;

const source =
  "/Users/WAW/Documents/Projects/ZION/packages/@zionstate/newui";
const target =
  "/Users/WAW/Documents/Projects/ZION/packages/@zionstate/ui";
const packJson = "package.json";
const tsConfig = "tsconfig.json";
const datas = {
  source: {
    json: join(source, packJson),
    ts: join(source, tsConfig),
  },
  target: {
    json: join(target, packJson),
    ts: join(target, tsConfig),
  },
};

export async function main() {
  const sourceJson =
    await getKnownData<jsconfigJSON.DataType>(
      datas.source.json
    );
  const targetJson =
    await getKnownData<jsconfigJSON.DataType>(
      datas.target.json
    );
  const sourceTs =
    await getKnownData<tsconfigJSON.DataType>(
      datas.source.json
    );
  const targetTs =
    await getKnownData<tsconfigJSON.DataType>(
      datas.source.json
    );
  // TODO #189 @giacomogagliano added this just to make ts shut ... fix it
  sourceTs;
  targetTs;
  changePackJson;
  const updatedJson = await changeJson(
    targetJson,
    sourceJson
  );
  const updatedTs = await changeJson(
    targetJson,
    sourceJson
  );
  await writeFile(
    datas.target.json,
    JSON.stringify(updatedJson)
  );
  await writeFile(
    datas.target.ts,
    JSON.stringify(updatedTs)
  );
  console.log(updatedJson);
}

// runProcess(main, {
//   successMess: "Succesfully cloned package.json and tsconfig.json",
// });
