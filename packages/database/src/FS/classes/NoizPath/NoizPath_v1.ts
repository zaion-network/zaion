export interface INoizPath_v1 {}

export interface NoizPath_v1 {}

import path from "path";

// TODO #178 @giacomogagliano delete this class cause it's going
// to be eported from the zionstate/utils package
export class NoizPath_v1 implements INoizPath_v1 {
  #path: string = "no path given";
  static joinPaths(...paths: string[]) {
    return path.join(...paths);
  }
  get path() {
    return this.#path;
  }
  constructor(paths?: string[]) {
    if (paths) this.#path = path.join(...paths);
  }
  directory() {
    return path.basename(path.dirname(this.#path));
  }
  baseName() {
    return path.basename(this.#path);
  }
}

export type NoizPath_v1Ctor = {
  joinPaths(...paths: string[]): string;
  new (paths?: string[]): NoizPath_v1;
};

export const NoizPath_v1Ctor: NoizPath_v1Ctor =
  NoizPath_v1;
