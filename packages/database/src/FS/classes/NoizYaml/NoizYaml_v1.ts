import yaml from "yaml";
import util from "util";
import { Dirent, system } from "../System";

const deprecate = util.deprecate;

export interface INoizYaml_v1<T> {
  string: string;
  parsed: T;
}

export interface NoizYaml_v1<T> {
  string: string;
  parsed: T;
}

export class NoizYaml_v1<T> {
  string: string;
  parsed: T;
  constructor(path: string) {
    this.string = system.stringifyFile(path);
    this.parsed = yaml.parse(this.string);
  }
}

export class NoizYamlToFile_v1 {
  static getDirent = system.getDirent;
  static joinPaths = system.joinPaths;
  result: Dirent[];
  configYaml: [];
  tree;
  constructor(path: string, configYaml: string) {
    this.result = system.getDirent(path);
    this.configYaml = yaml.parse(
      system.stringifyFile(configYaml)
    );
    this.tree = system.buildTree(path);
  }
}

export type NoizYaml_v1Ctor<T> = {
  new (name: string): NoizYaml_v1<T>;
};

export const NoizYaml_v1Ctor: NoizYaml_v1Ctor<any> =
  deprecate(
    NoizYaml_v1,
    "non mi ricordo perchè lho deprecato, quando me lo ricordo ve lo dico!"
  );
