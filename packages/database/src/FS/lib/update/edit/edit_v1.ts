import { jsconfigJSON, tsconfigJSON } from "../../types";

type js = jsconfigJSON.DataType;
type ts = tsconfigJSON.DataType;

type basicObject = {
  [key: string]: string | number | boolean | basicObject;
};

type changeKeyValueType2 = <
  T extends basicObject,
  X extends keyof T,
  Y extends keyof T[X]
>(
  obj: T,
  prop: [[X, Y], T[X] | T[X][Y]]
) => T;
export const changeKeyValue2: changeKeyValueType2 =
  function (obj, prop) {
    // TODO #187 @giacomogagliano delete this function there is a new one which
    // covers this in a better way
    // @ts-expect-error
    if (prop[0][1]) obj[prop[0][0]][prop[0][1]];
    // @ts-expect-error
    else obj[prop[0][0]] = prop[1];
    return obj;
  };

const obj = { lala: { bobo: "" } };
export type uuu = keyof typeof obj | keyof typeof obj.lala;

type changeKeyValueType = <T>(
  obj: T,
  prop: [keyof T, T[keyof T]]
) => T;
const changeKeyValue: changeKeyValueType = function (
  obj,
  prop
) {
  obj[prop[0]] = prop[1];
  return obj;
};

changeKeyValue({ name: "giacomo" }, ["name", "ciao"]);

const error1: string =
  "No compiler options in the tsconfig file";
export type StringTuple = [string];
type GenericObject = {
  [key: string]:
    | string
    | { [key: string]: string }
    | unknown;
};
type KeyValueOfObj<
  T extends GenericObject,
  P extends [string, string]
> = [keyof T, T[P[0]]];
export async function changeJson<T>(
  object: GenericObject,
  fieldAndProp: KeyValueOfObj<
    GenericObject,
    [string, string]
  >
): Promise<T>;
export async function changeJson(
  object: GenericObject,
  fieldAndProp: GenericObject
): Promise<js | ts>;
export async function changeJson(
  object: GenericObject,
  fieldAndProp:
    | GenericObject
    | KeyValueOfObj<GenericObject, [string, string]>
): Promise<js | ts> {
  if (Array.isArray(fieldAndProp))
    object[fieldAndProp[0]] = fieldAndProp[1];
  if (!Array.isArray(fieldAndProp)) object = fieldAndProp;
  return object;
}

export async function newChangePackJson(
  packJson: jsconfigJSON.DataType,
  newFolderName: string
) {
  return await changeJson(packJson, [
    "main",
    newFolderName,
  ]);
}

export async function changePackJson(
  packJson: jsconfigJSON.DataType,
  newFolderName: string
) {
  packJson.main = newFolderName;
  console.log("Updated: " + packJson.main);
  return packJson;
}

export async function newChangeTsConfig(
  tsConfig: tsconfigJSON.DataType,
  newFolderName: string,
  exclude: string
) {
  tsConfig = await changeJson(tsConfig, [
    "compilerOptions",
    { outDir: newFolderName },
  ]);
  if (!Array.isArray(tsConfig.exclude))
    throw new Error(error1);
  tsConfig = await changeJson(tsConfig, [
    "exclude",
    [exclude, ...tsConfig.exclude.shift()],
  ]);
  if (!Array.isArray(tsConfig.exclude))
    throw new Error(error1);

  console.log("Updated: " + tsConfig.exclude[0]);
  return tsConfig;
}

export async function changeTsConfig(
  tsConfig: tsconfigJSON.DataType,
  newFolderName: string,
  exclude: string
) {
  if (!tsConfig.compilerOptions) throw new Error(error1);
  tsConfig.compilerOptions.outDir = newFolderName;
  console.log(
    "Updated: " + tsConfig.compilerOptions.outDir
  );
  if (!Array.isArray(tsConfig.exclude))
    throw new Error(error1);
  tsConfig.exclude[0] = exclude;
  console.log("Updated: " + tsConfig.exclude[0]);
  return tsConfig;
}

export const edit_v1 = "to be continued";
