import { Branch } from "../Node/extensions/Branch/Branch.type";
import { FileMutated } from "../Node/extensions/FileSystem/extensions/File";
import { FolderMutated } from "../Node/extensions/FileSystem/extensions/Folder";
import { Git } from "../../../../ZaionGit/Git.type";
import { Graph } from "../../Graph.type";
import { FolderContent } from "../../../Rules/FolderContent";
import { CommitValue } from "../../../../Types/Commit.type";
// import { CommitValue } from "../../../../Types";

interface formatUntrackedResponse {
  (untracked: string): string;
}

///////// tags

///////// branches

///////// untracked

interface filterUntracked {
  (file: string): string[] | undefined;
}

//////// utilities

interface RepoConfig {
  STATUS_ERROR: "there are staged files";
  MAIN: "main";
  DEV: "dev";
  EMPTY: "";
  NOIZ: ".noiz";
  PACKAGES: "packages/";
  APPS: "apps/";
}

enum errors {
  STATUS_ERROR = "there are staged files",
  NO_TREE = "no tree",
  PROBLEM = "there was a problem",
}

enum testStrings {
  MODIFIED_PRESTRING = "modified:   ",
}

enum logs {
  called = "called",
  done = "done",
}

export enum splitters {
  slash = "/",
  return = "\n",
  verticalBar = "|",
  doubleVBar = "||",
  minor = "<",
  doubleminor = "<<",
  minorDollar = "<$",
  comma = ",",
  space = " ",
}

export enum config {
  MAIN = "main",
  DEV = "dev",
  EMPTY = "",
  NOIZ = ".noiz",
  PACKAGES = "packages/",
  APPS = "apps/",
  BIN = "bin/",
}

export enum setOptionsTypes {
  rp = "relative-path",
}

export interface RepoState {
  activeBranch: Branch;
  baseDir: string;
  // untrackedChanges: Change[];
  // directory: Folder;
  // workingTree: WorkingTreeNode;
  options: { relativePath: boolean };
}

export interface Repo {
  // utilities
}

export abstract class Repo extends Graph {
  static configFiles = FolderContent.configFilesTypes;
  static originFiles = FolderContent.originFiles;
  static errors = errors;
  static testString = testStrings;
  static config = config;
  static logs = logs;
  static splitters = splitters;
  static setOptionsTypes = setOptionsTypes;
  //////// variables
  abstract git: Git;
  abstract untrackedSync: string[];
  abstract branches: Branch[];
  abstract currentBranch: string;
  abstract state: RepoState;
  abstract pathPatches: { [k: string]: [string, string] };
  abstract untracked: string[] | string;
  abstract tags: {
    [key: string]: string[];
    no_pattern: string[];
  };
  abstract files: string[] | string;

  ////////// MANAGER
  //////// tree
  abstract buildUntrackedTree(): string;
  abstract printUntrackedTree(
    node?: FolderMutated | FileMutated,
    indent?: string
  ): string | errors.NO_TREE;
  /////////
  abstract step1(
    untracked_path: string,
    current?: null | string,
    message?: string
  ): string[];
  abstract status(path?: string): string;
  abstract start(): void;
  abstract createDevMerge(): string[];
  abstract zaionCommitFirstFolder(repo: Repo): this;
  abstract zaionCommitFolder(
    folder: string,
    message?: string
  ): string | string[] | undefined;
  abstract zaionCommitAllFiles(repo: Repo): this;
  abstract zaionCommitFile(
    file: string,
    message?: string
  ):
    | string[]
    | "not yet"
    | "file is not in tracked ones"
    | undefined;

  //////// git log
  abstract getBaseDir(): string;
  abstract getCommit(head: string): CommitValue;
  abstract getDirectParentOfCommit(
    _hash: string
  ): CommitValue | null;

  //////// git rev-parse
  abstract getCurrentBranch(pointer?: string): string;

  //////// tree
  abstract getPatchPath(pack: string): any;
  abstract detectPackage(path: string): string;
  abstract formatUntrackedResponse(
    untracked: string
  ): string;
  abstract isPackage(path: string): boolean;
  abstract isApp(path: string): boolean;
  abstract isRoot(path: string): boolean;
  abstract isModified(untracked: string): boolean;

  // // tags
  abstract getTags(): string[];
  abstract getCurrentBranchTags(): string[];
  abstract addTag(tag: string, commithash?: string): any;
  abstract addAllTags(tags: string[]): this;
  abstract substituteTag(
    newTag: string,
    oldTag: string
  ): string;
  abstract deleteTag(tagname: string): any;
  abstract substituteAndDeleteTag(
    newTag: string,
    oldTag: string
  ): string;
  abstract substituteAndDeleteAllTags(
    list: string[]
  ): this;
  abstract getHash(branch: string): any;
  abstract makeBranchHashTuple(br: string[]): any[][];

  // // branches
  abstract getBranches(
    filter?: string,
    ops?: { object?: boolean }
  ): string[];
  abstract getChildBranches(): string[];
  abstract getBranchMainChild(): string;
  abstract removeAllBranches(
    branches: string[],
    force?: boolean
  ): string[];
  abstract removeBranch(
    branch: string,
    force?: boolean
  ): string;

  /////// checkout
  abstract checkout(branch: string): this;
  abstract checkoutAndCreate(branch: string): this;
  abstract checkoutADeleetB(A: string, B: string): this;
  abstract checkoutBranchMainChild(): this;

  // // untracked
  abstract checkIsFileInUntracked(
    file: string
  ): boolean | undefined;
  abstract getUntracked(path?: string): string | string[];
  abstract filterUntracked(
    file: string
  ): string[] | undefined;

  // // stage
  abstract stageFile(file: string): string;

  // // commit
  abstract commitFile(
    file: string,
    message?: string
  ): string[];

  // // merge
  abstract merge(tag: string): this;

  // // utilities
  abstract filterTagList(
    res: string[],
    filter: string
  ): string[];
  abstract substituteAll(
    results: string[],
    arg1: string,
    arg2: string
  ): string[][];
  abstract removeLevels(
    path: string,
    levels: string
  ): string;
  abstract addPrefixLevels(
    path: string,
    levels: string
  ): string;
  abstract fixBranchName(
    branch: string,
    levelsToRemove: string,
    levelsToadd: string
  ): string;
  abstract checkHasStaged(status: string): boolean;
  abstract filterFileRaw(entities: string[]): string[];
}
