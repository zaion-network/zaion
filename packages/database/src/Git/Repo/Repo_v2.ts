import { Tree } from "@zionstate/zionbase/zionbase";
import { lib } from "../../../src/FS";
import { ZionGit } from "../ZionGit";
import { ZionGitHub } from "../ZionGitHub";

// const { reader, system } = FS;

// const { joinPaths, existsSync } = system;

type package_json = lib.types.packageJSON.DataType2;
type tsconfig_json = lib.types.tsconfigJSON.DataType;
type jsconfig_json = lib.types.jsconfigJSON.DataType;
type prettierrc_json = lib.types.prettierrcJSON.DataType;
type dependency = lib.types.packageJSON.Dependency;

export type RepoTypes = "app" | "package";

export type Repo_v1Props = {
  name: string;
  packageName: string;
  isRoot: boolean;
  hasTypesInConfig: boolean;
  monorepo: string;
  auth: string;
  isWorking: boolean;
  isCommitted: boolean;
  dependencies(): dependency;
  __type: RepoTypes;
  subfolder: string;
  toKeep: boolean;
};

export enum PackagesSubFolders {
  "@zionstate" = "@zionstate",
  "@zionrepack" = "@zionrepack",
  "@zionstate_js" = "@zionstate_js",
  "@zionstate_node" = "@zionstate_node",
}

export type PackagesSubFoldersTypes =
  keyof typeof PackagesSubFolders;

export enum TypeFolders {
  app = "apps",
  package = "packages",
}

export type CreateRepoOptions = {
  name?: string;
  subFolder?: PackagesSubFoldersTypes | TypeFolders;
  type?: RepoTypes;
};

export interface IRepo_v2 {
  name: string;
  packageName: string;
  hasTypesInConfig: boolean;
  monorepo: string;
  auth: string;
  isWorking: boolean;
  __type: RepoTypes;
  subfolder: string;
  toKeep: boolean;
  //
  git: ZionGit;
  github: ZionGitHub;
  packageJSON?: package_json | string;
  tsconfigJSON?: tsconfig_json | string;
  prettierrcJSON?: prettierrc_json;
  jsconfigJSON?: jsconfig_json;
  path?: string;
  hasPackageJSON: boolean;
  hasTSconfigJSON: boolean;
  isRoot(): Promise<boolean>;
  hasRemote(): Promise<boolean>;
  isCommitted(): Promise<boolean>;
  dependencies(): dependency;
  // latestUpdate(): Promise<Date | undefined>;
  version(): string | undefined;
  /////
  /**
   * Performs a check and set status for repo
   */
  checkRepo(): this;
  // hasTypesInConfigTS(): boolean | null;
  // packageJSON(): Promise<object>;
}

export interface Repo_v2 {
  name: string;
  packageName: string;
  hasTypesInConfig: boolean;
  monorepo: string;
  auth: string;
  isWorking: boolean;
  __type: RepoTypes;
  subfolder: string;
  toKeep: boolean;
  //
  git: ZionGit;
  github: ZionGitHub;
  packageJSON?: package_json | string;
  tsconfigJSON?: tsconfig_json | string;
  prettierrcJSON?: prettierrc_json;
  jsconfigJSON?: jsconfig_json;
  path?: string;
  hasPackageJSON: boolean;
  hasTSconfigJSON: boolean;
  isRoot(): Promise<boolean>;
  hasRemote(): Promise<boolean>;
  isCommitted(): Promise<boolean>;
  dependencies(): dependency;
  // latestUpdate(): Promise<Date | undefined>;
  version(): string | undefined;
  /////
  /**
   * Performs a check and set status for repo
   */
  checkRepo(): this;
  // hasTypesInConfigTS(): boolean | null;
  // packageJSON(): Promise<object>;
}

export class Repo_v2 extends Tree implements IRepo_v2 {
  constructor(props: Repo_v1Props) {
    super();
    this.name = props.name;
    this.packageName = props.packageName;
    this.monorepo = props.monorepo;
    this.auth = props.auth;
    this.isWorking = props.isWorking;
    this.__type = props.__type;
    this.subfolder = props.subfolder;
    this.toKeep = props.toKeep;
  }
}

export type Repo_v2Ctor = {
  new (props: Repo_v1Props): Repo_v2;
};

export const Repo_v2Ctor: Repo_v2Ctor = Repo_v2;
