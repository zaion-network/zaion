import { RepoFile, RepoFolder } from "../lib";
import { Repo } from "../Repo";

export interface App {}
export class App {}

export interface Package {}
export class Package {}

export type CommitPolicy = "commit" | "not-commit";
export type Entity = RepoFile | RepoFolder | Package | App;

export interface IRepoManager_v1 {}

export interface RepoManager_v1 {
  repo: Repo;
  create(
    entity: Entity,
    options: { commitPolicy?: CommitPolicy }
  ): this;
  delete(entity: Entity): this;
  addDep(target: App | Package): this;
  // Folder structure
  movePackage(): this;
  commit(): this;
  // Docker
  createDockerFile(): this;
  createImage(): this;
  // GIT
  stageChanges(): this;
  commitRepo(id: string): this;
  commitMonorepo(): this;
  // package manager
  checkDeps(npmpkg: string): string[];
  // Test
  aggiungiTestARepo(name: string, repo: Repo): this;
  setTestResult(test: string, result: boolean): this;
}

export class RepoManager_v1 implements IRepoManager_v1 {}

export type RepoManager_v1Ctor = {
  new (name: string): RepoManager_v1;
};

export const RepoManager_v1Ctor: RepoManager_v1Ctor =
  RepoManager_v1;
