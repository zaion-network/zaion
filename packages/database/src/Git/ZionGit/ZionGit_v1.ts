import {
  CheckRepoActions,
  GitError,
  SimpleGit,
  simpleGit,
  SimpleGitOptions,
  SimpleGitTaskCallback,
  TaskOptions,
  Options,
  StatusResult,
} from "simple-git";
// BUG #194 @giacomogagliano also here it give the import but, but only from one entry point
// import {} from "@zionstate/database/EVM";
import { InitResult } from "simple-git";
import { ZionGit } from ".";
import { system } from "../../../src/FS";

export interface IZionGit_v1 {}

export interface ZionGit_v1 {}

export class ZionGit_v1 implements IZionGit {
  #options: Partial<SimpleGitOptions> = {
    baseDir: process.cwd(),
    binary: "git",
    maxConcurrentProcesses: 6,
  };
  /**
   * Returns a read only copy of the default options.
   */
  get options() {
    let obj = {};
    Object.assign(obj, this.#options);
    Object.freeze(obj);
    return obj;
  }
  git: SimpleGit;
  /**
   *
   * @param path can be either in one of this formats:
   * ```js
   * const string1 = "/Path/with/initial/slash"
   * const string2 = "Path/without/initial/slash"
   * const arrayString = ["path","to","file"]
   * ```
   */
  constructor(path?: string[] | string) {
    if (path) {
      if (!Array.isArray(path)) {
        path = splitPath(path);
      }
      this.#options.baseDir = "/" + system.joinPaths(path);
    }
    this.git = simpleGit(this.#options);
  }
  /**
   * Validates that the current working directory is a valid git repo file path.
   *
   * To make a more specific assertion of the repo, add the `action` argument:
   *
   * - `bare` to validate that the working directory is inside a bare repo.
   * - `root` to validate that the working directory is the root of a repo.
   * - `tree` (default value when omitted) to simply validate that the working
   *    directory is the descendent of a repo
   */
  isRepo(
    action: CheckRepoActions = CheckRepoActions.IS_REPO_ROOT,
    callback?: SimpleGitTaskCallback<boolean, GitError>
  ) {
    return this.git.checkIsRepo(action, callback);
  }
  /**
   *
   * @param bare If set to true it create a Bare git
   * repository which is a deprecated way to create a
   * "central" repository. it is by default set to `false`
   * @param options Most tasks accept custom options as an
   * array of strings as well as the options object. Unless
   * the task is explicitly documented as such, the tasks
   * will not accept both formats at the same time,
   * preferring whichever appears last in the arguments.
   * @returns A promise
   */
  init(
    bare: boolean = false,
    options?: TaskOptions<Options>
  ) {
    return this.git.init(bare, options);
  }
  /**
   * Show the working tree status.
   */
  status(
    options?: TaskOptions<Options>,
    callback?: SimpleGitTaskCallback<
      StatusResult,
      GitError
    >
  ) {
    return this.git.status(options, callback);
  }
  /**
   * Check if repo has a remote git.
   */
  async hasRemote() {
    let result;
    // TODO use the result
    result;
    try {
      result = await this.git.listRemote();
    } catch (error: any) {
      return false;
    }
    return true;
  }
  /**
   *
   */
  // async latestUpdate(): Promise<Date | undefined> {
  //   let date: Date;
  //   // TODO user the date
  //   date = new Date();
  //   try {
  //     const response = await this.git.log();
  //     if (response.latest) return (date = new Date(response.latest.date));
  //   } catch (error) {
  //     return (date = new Date(0));
  //   }
  // }
}

export type ZionGit_v1Ctor = {
  new (path?: string[] | string): ZionGit_v1;
};

export const ZionGit_v1Ctor: ZionGit_v1Ctor = ZionGit_v1;

export type isRepo = (
  action?: CheckRepoActions,
  callback?: SimpleGitTaskCallback<boolean, GitError>
) => Promise<boolean>;

export type initRepo = (
  bare: boolean,
  options?: TaskOptions<Options>
) => SimpleGit & Promise<InitResult>;

export type repoStatus = (
  options?: TaskOptions<Options>,
  callback?: SimpleGitTaskCallback<StatusResult, GitError>
) => Promise<StatusResult>;

export interface IZionGit {
  options: Partial<SimpleGitOptions>;
  isRepo: isRepo;
  init: initRepo;
  status: repoStatus;
  hasRemote(): any;
  // TODO add lastupdate
  // latestUpdate(): Promise<Date | undefined>;
}

/**
 * This is an utility function which internally creates an
 * instance of ZionGit just to call the isRepo() on it. It
 * returns true weather or not the passed path is a git repo.
 * @param path can be either in one of this formats:
 * ```js
 * const string1 = "/Path/with/initial/slash"
 * const string2 = "Path/without/initial/slash"
 * const arrayString = ["path","to","file"]
 * ```
 * @returns
 */
export function testRepo(path: string[] | string) {
  if (!Array.isArray(path)) path = splitPath(path);
  const git = new ZionGit(path);
  return git.isRepo();
}

/**
 *
 * @param path Path of the folder to be initialized. It can
 * be either in one of this formats:
 * ```js
 * const string1 = "/Path/with/initial/slash"
 * const string2 = "Path/without/initial/slash"
 * const arrayString = ["path","to","file"]
 * ```
 * @param options
 * @returns
 */
export function initRepo(
  path: string[] | string,
  options?: TaskOptions<Options>
) {
  if (!Array.isArray(path)) path = splitPath(path);
  const git = new ZionGit(path);
  return git.init(false, options);
}

export async function repoStatus(
  path: string[] | string,
  options?: TaskOptions<Options>
) {
  if (!Array.isArray(path)) path = splitPath(path);
  if (!(await testRepo(path)))
    throw new Error("Path is not a repo");
  const git = new ZionGit(path);
  return git.status(options);
}

export async function repoHasRemote(
  path: string[] | string
): Promise<boolean> {
  if (!Array.isArray(path)) path = splitPath(path);
  if (!(await testRepo(path)))
    throw new Error("Path is not a repo");
  const git = new ZionGit(path);
  return await git.hasRemote();
}

// TODO move this function to utils library
function splitPath(path: string) {
  return path.split("/").filter(conditionNoEmptyString);
}

// TODO move this to conditions in utils?
function conditionNoEmptyString(string: string) {
  return string !== "";
}
