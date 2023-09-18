import yaml from "yaml";
import { Dirent, system } from "../System";

export interface INoizYaml_v2<T> {
  string: string;
  parsed: T;
}

export interface NoizYaml_v2<T> {
  string: string;
  parsed: T;
}

export class NoizYaml_v2<T> {
  path: string = process.cwd();
  string: string;
  parsed: T;
  constructor(path?: string) {
    if (path) {
      this.path = path;
      this.string = system.stringifyFile(this.path);
      this.parsed = yaml.parse(this.string);
    } else {
      this.string = "";
      this.parsed = {} as T;
      this.path = system.joinPaths([
        this.path,
        "temp.yaml",
      ]);
      system.writeFileSync(this.path, this.string);
    }
  }
  write() {
    system.writeFileSync(
      this.path,
      yaml.stringify(this.parsed)
    );
  }
}

export class NoizYamlToFile_v2 {
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

export type NoizYaml_v2Ctor<T> = {
  new (name: string): NoizYaml_v2<T>;
};

export const NoizYaml_v2Ctor: NoizYaml_v2Ctor<any> =
  NoizYaml_v2;
