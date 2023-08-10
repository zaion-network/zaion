import { basename, join } from "path";

export class Path {}
export namespace Path {
  export interface ifUndefined {
    (path?: string | null): string;
  }
  export interface ifUndefinedGeneric {
    (substitute: string): ifUndefined;
  }

  export const ifUndefinedGeneric: ifUndefinedGeneric = substitute => path => {
    return basename(path ? path : substitute);
  };

  export const ifUndefined: ifUndefined = ifUndefinedGeneric("");

  export interface IbuildPaths_v1 {
    (path: string, array: string[]): any[];
  }

  export const buildPaths: IbuildPaths_v1 = function (
    path: string,
    array: string[]
  ) {
    const res = array.map(item => buildPathTuple([path, item], item));
    return res;
  };

  export interface IbuildPathTuple_v1 {
    (paths: string[], text: string): [string, string];
  }

  export const buildPathTuple: IbuildPathTuple_v1 = function (
    paths: string[],
    text: string
  ) {
    let res: [string, string] = [joinPaths(...paths), text];
    return res;
  };

  export interface IjoinPaths_v1 {
    (...paths: string[]): string;
  }

  export const joinPaths: IjoinPaths_v1 = function (...paths: string[]) {
    return join(...paths);
  };
}
