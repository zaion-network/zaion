import { Dirent } from "fs";
import {
  File,
  Folder,
} from "@zionstate/zionbase/zionbase";
import {
  readJSON,
  readPackageJSON,
  readTSconfigJSON,
} from "../../lib";
import { NoizCsv } from "../NoizCsv";
import { NoizYaml, NoizYamlToFile } from "../NoizYaml";
import { system } from "../System";

export interface Reader_v1 {
  path: string;
  targetResult: (Folder | File)[];
}
// } from "@zionstate/system/src/lib/types/index.js";

export enum SupportedFileExtensions {
  json = ".json",
  csv = ".csv",
  yaml = ".yaml",
  yml = ".yml",
  md = ".md",
  mdx = "mdx",
}

export class Reader_v1 {
  NoizYaml = NoizYaml;
  NoizYamlToFile = NoizYamlToFile;
  NoizCsv = NoizCsv;
  path = "./";
  constructor(path?: string) {
    if (path) this.path = path;
  }
  stringifyFile = system.stringifyFile;
  readFoldersInDir = system.arrayOfFoldersInDirectory;
  readFilesInFolder = system.arrayOfNamesOfFilesInFolder;
  joinPaths = system.joinPaths;
  readJSON = readJSON;
  readPackageJSON = readPackageJSON;
  readTSconfigJSON = readTSconfigJSON;
  Folder = Folder;

  direntToFolder = (source: Dirent) => {
    if (!source.isDirectory)
      throw new Error("not a folder");
    let path: string;
    const folder = Folder.nodeTypes.folder;
    if (!this.path) path = "./";
    else path = this.path;
    return new Folder(
      source.name,
      path,
      folder,
      undefined,
      0
    );
  };

  direntToFile = (source: Dirent) => {
    if (!source.isFile) throw new Error("not a folder");
    let path: string;
    const file = Folder.nodeTypes.file;
    if (!this.path) path = "./";
    else path = this.path;
    return new File(source.name, path, file, undefined, 0);
  };
  readFilesInDir_v2 = (path: string) => {
    const res = system.arrayOfFilesInDirectory(path);
    const adapted = res.map(this.direntToFile);
    this.targetResult = adapted;
    return this;
  };
  readFoldersInDir_v2 = (path: string) => {
    const res = system.arrayOfFoldersInDirectory(path);
    const adapted = res.map(this.direntToFolder);
    this.targetResult = adapted;
    return this;
  };
}

export let reader = new Reader_v1();

export type Reader_v1Ctor = {
  new (path?: string): Reader_v1;
};

export const Reader_v1Ctor: Reader_v1Ctor = Reader_v1;
