import { read_v2 as v2, read_v2Props as v2Props } from "./read_v2";
///// EXPORT
export { read_v1 as read } from "./read_v1";
//////

export const read_v2 = v2;
export type read_v2Props = v2Props;

//// readJSON
export * from "./readJSON";

//// readPackageJSON
export * from "./readPackageJSON";

//// readTSconfigJSON
export * from "./readTSconfigJSON";

//// getFileFromPath
export * from "./getFileFromPath";

//// getKnownData
export * from "./getKnownData";

//// getPathsOfZionPacks
export * from "./getPathsOfZionPacks";

//// getZionAppsAndPacks
export * from "./getZionAppsAndPacks";

//// mapObject
export * from "./mapObject";
