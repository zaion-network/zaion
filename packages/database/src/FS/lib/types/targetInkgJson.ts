import { objectInPackJson } from "../read/mapObject/mapObject_v1";

export type targetInPkgJson = {
  dependencies: objectInPackJson;
  peerDependencies: objectInPackJson;
  devDependencies: objectInPackJson;
};
