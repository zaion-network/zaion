import { basename, join } from "path";
import "../../../../../../Node";

declare module "./Path" {
  interface ifUndefined {
    (path?: string | null): string;
  }
  interface ifUndefinedGeneric {
    (substitute: string): ifUndefined;
  }

  interface IbuildPaths_v1 {
    (path: string, array: string[]): any[];
  }

  interface IbuildPathTuple_v1 {
    (paths: string[], text: string): [string, string];
  }

  interface IjoinPaths_v1 {
    (...paths: string[]): string;
  }
}

declare module "../../../../../../Node" {
  namespace Node {
    interface Path {
      ifUndefinedGeneric: ifUndefinedGeneric;
      ifUndefined: ifUndefined;
      buildPaths: IbuildPaths_v1;
      buildPathTuple: IbuildPathTuple_v1;
      joinPaths: IjoinPaths_v1;
    }
    namespace Path {}
  }
}

export class Path {}
export namespace Path {
  export const ifUndefinedGeneric: ifUndefinedGeneric = substitute => path => {
    return basename(path ? path : substitute);
  };

  export const ifUndefined: ifUndefined = ifUndefinedGeneric("");
  export const buildPaths: IbuildPaths_v1 = function (
    path: string,
    array: string[]
  ) {
    const res = array.map(item => buildPathTuple([path, item], item));
    return res;
  };

  export const buildPathTuple: IbuildPathTuple_v1 = function (
    paths: string[],
    text: string
  ) {
    let res: [string, string] = [joinPaths(...paths), text];
    return res;
  };

  export const joinPaths: IjoinPaths_v1 = function (...paths: string[]) {
    return join(...paths);
  };
}

export const ifUndefinedGeneric: ifUndefinedGeneric = substitute => path => {
  return basename(path ? path : substitute);
};

export const ifUndefined: ifUndefined = ifUndefinedGeneric("");
export const buildPaths: IbuildPaths_v1 = function (
  path: string,
  array: string[]
) {
  const res = array.map(item => buildPathTuple([path, item], item));
  return res;
};

export const buildPathTuple: IbuildPathTuple_v1 = function (
  paths: string[],
  text: string
) {
  let res: [string, string] = [joinPaths(...paths), text];
  return res;
};

export const joinPaths: IjoinPaths_v1 = function (...paths: string[]) {
  return join(...paths);
};
