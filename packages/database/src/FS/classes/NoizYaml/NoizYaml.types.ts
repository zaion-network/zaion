import { PathLike } from "fs";
import type { Tree } from "@zionstate/zionbase/zionbase";
import * as _NoizYaml from ".";
import { Dirent } from "../System";
const NoizYaml: NoizYaml = _NoizYaml;

interface NoizYaml {
  NoizYaml: AbstractNoizYaml_v2Ctor<unknown>;
  NoizYamlCtor: AbstractNoizYaml_v1Ctor<unknown>;
  NoizYamlCtor_v1: AbstractNoizYaml_v1Ctor<unknown>;
  NoizYaml_v2: AbstractNoizYaml_v2Ctor<unknown>;
  NoizYamlToFile: AbstractNoizYamlToFile_v1Ctor;
  NoizYamlToFile_v1: AbstractNoizYamlToFile_v1Ctor;
  v1: AbstractNoizYaml_v1Ctor<unknown>;
}

abstract class AbstractNoizYaml_v1<T> {
  abstract string: string;
  abstract parsed: T;
}

export interface AbstractNoizYaml_v1Ctor<T> {
  new (
    path: string,
    configYaml: string
  ): AbstractNoizYaml_v1<T>;
}

abstract class AbstractNoizYaml_v2<T> {
  abstract path: string;
  abstract string: string;
  abstract parsed: T;
  abstract write(): void;
}

interface AbstractNoizYaml_v2Ctor<T> {
  new (path?: string): AbstractNoizYaml_v2<T>;
}

abstract class AbstractNoizYamlToFile_v1 {
  abstract result: Dirent[];
  abstract configYaml: [];
  abstract tree: Tree;
}

export interface AbstractNoizYamlToFile_v1Ctor {
  getDirent(path: PathLike): Dirent[];
  joinPaths(paths: string[]): string;
  new (
    path: string,
    configYaml: string
  ): AbstractNoizYamlToFile_v1;
}
