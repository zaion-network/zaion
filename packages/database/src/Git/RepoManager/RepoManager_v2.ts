import { Untracked } from "./Untracked";
import { execSync } from "child_process";
import util from "util";
import path from "path";

async function execCommand(command: string) {
  const exec = util.promisify(
    require("node:child_process").exec
  );
  const { stdout, stderr } = await exec(command);
  if (stderr) return stderr;
  else return stdout;
}

export let execCommandCallback =
  util.callbackify(execCommand);

export class RepoManager {
  Node = Untracked;
  STATUS_ERROR = "there are staged files";
  MAIN = "main";
  DEV = "dev";
  EMPTY = "";
  NOIZ = ".noiz";
  PACKAGES = "packages/";
  APPS = "apps/";

  workingTree: any;

  // git
  MODIFIED_PRESTRING = "modified:   ";

  zionbase = "packages/zionbase/src/";
  zionbaseSubstitution = "zionbase/";
  rootValue = { name: ".", path: "." };
  currentBranch: string = "";
  files: string[] | string = [];
  untrackedTree: Untracked = new this.Node(
    this.rootValue,
    null
  );
  branches: string[] = [];
  untracked: string[] | string = "";
  tags: string[] = [];

  get untrackedSync() {
    return execSync("git ls-files -o --exclude-standard", {
      maxBuffer: 10 * 1024 * 1024,
    })
      .toString()
      .trim()
      .split("\n");
  }

  buildUntrackedTree() {
    let rootValue = { name: ".", path: "." };
    console.log("called");
    this.untrackedSync.forEach(file => {
      const parts = file.split("/");
      let node = this.untrackedTree;
      parts.forEach(part => {
        let child = node.children.find(
          child => child.value.name === part
        );
        if (!child) {
          const value = {
            name: part,
            path: node.value.path + "/" + part,
          };
          child = new this.Node(value, node);
          node.children.push(child);
        }
        node = child;
      });
    });
    return "done";
  }

  printUntrackedTree(
    node = this.untrackedTree,
    indent = ""
  ) {
    if (!node) return "no tree";
    let output = "";
    const isRoot = node.parent === null;
    const isLast =
      isRoot ||
      node ===
        node.parent?.children[
          node.parent.children.length - 1
        ];
    output += `${indent}${
      isRoot ? "" : isLast ? "└─" : "├─"
    } ${node.value.name}\n`;
    node.children.forEach((child, index) => {
      output += this.printUntrackedTree(
        child,
        `${indent}${isRoot ? "" : isLast ? "  " : "│ "}  `
      );
    });
    return output;
  }

  async createDevMerge() {
    let currentbranch = this.currentBranch;
    let currentbranchtags =
      await this.getCurrentBranchTags();
    // build dev branch patph
    let devbranch = currentbranch.replace(
      this.MAIN,
      this.DEV
    );
    // create dev branch
    let action_result = await this.checkoutAndCreate(
      devbranch
    );
    console.log(action_result);
    while (currentbranchtags.length) {
      let currenttag = currentbranchtags.shift();
      if (currenttag) {
        await this.merge(currenttag);
        console.log(
          `succesfully merged ${currenttag} into ${devbranch}`
        );
      } else continue;
    }
    return currentbranchtags;
  }

  async zaionCommitFirstFolder(repo: RepoManager) {
    await repo.zaionCommitFolder(repo.files[0]);
  }

  async zaionCommitAllFiles(repo: RepoManager) {
    if (Array.isArray(repo.files)) {
      let files = this.filterFileRaw(repo.files);
      let clone = [...files];
      while (clone.length > 0) {
        let current = clone.shift();
        if (current) {
          await repo.zaionCommitFile(current);
        }
      }
    }
  }

  async zaionCommitFolder(
    folder: string,
    message?: string
  ) {
    if (message) {
      return "not yes";
    } else {
      await this.start();
      // get current branch (shall be a main)
      let currentBranch = this.currentBranch;
      // select untracked
      let folder_path_results = await this.filterUntracked(
        folder
      );
      let folder_path;
      if (folder_path_results) {
        if (
          folder_path_results.length === 0 ||
          folder_path_results.length > 1
        ) {
          return "there are many paths with the same folder name";
        } else {
          folder_path = folder_path_results[0];
        }
      }
      let untracked_files_in_folder_response:
        | string[]
        | string = await this.getUntracked(folder_path);
      let untracked_files_in_folder: string;
      if (
        untracked_files_in_folder_response.length === 0
      ) {
        return `no untracked files in the path: ${folder_path} matched this pattern: ${this.NOIZ}`;
      } else {
        untracked_files_in_folder =
          untracked_files_in_folder_response[0];
      }
      let file;
      if (
        Array.isArray(untracked_files_in_folder_response)
      ) {
        file = untracked_files_in_folder_response.filter(
          e => e.includes(this.NOIZ)
        );
      }
      // if folder
      // cut main from branch branch_name
      let fixed = currentBranch.replace(
        this.MAIN,
        this.EMPTY
      );
      // stick untracked name plus /main
      let newBranchName = `${fixed}${folder}/${this.MAIN}`;
      // checkoutAndCreate
      await this.checkoutAndCreate(newBranchName);
      // stage and commit .noiz or readme
      if (file) {
        // stage
        await this.stageFile(file[0]);
        // commit
        let commitresponse = await this.commitFile(
          file[0]
        );
        // reload
        await this.start();
        return commitresponse;
      }
    }
  }

  pathPatches: { [k: string]: [string, string] } = {
    zionbase: ["packages/zionbase/src/", "zionbase/"],
    ui: ["packages/ui/src/", "ui/"],
    database: ["packages/database/src/", "database/"],
  };

  getPatchPath(pack: string) {
    return this.pathPatches[pack];
  }

  detectPackage(path: string) {
    if (!path.includes("/")) return "root";
    return path
      .replace(this.PACKAGES, this.EMPTY)
      .split("/")[0];
  }

  formatUntrackedResponse(untracked: string) {
    const isModified = this.isModified(untracked);
    if (isModified) {
      return untracked.replace(
        this.MODIFIED_PRESTRING,
        this.EMPTY
      );
    } else return untracked;
  }

  isPackage(path: string) {
    return path.includes("packages/");
  }

  isApp(path: string) {
    return path.includes("apps/");
  }

  isRoot(path: string) {
    let isPackage = this.isPackage(path);
    let isApp = this.isApp(path);
    let condition = isPackage === false && isApp === false;
    return condition;
  }

  isModified(untracked: string) {
    return untracked.startsWith(this.MODIFIED_PRESTRING);
  }

  async step1(
    untracked_path: string,
    current = null,
    message = "default message"
  ) {
    if (current === null)
      throw new Error("there was a problem");
    // // checkout and create branch
    console.log("creating branch and checking out");
    const pack = this.detectPackage(
      this.formatUntrackedResponse(untracked_path)
    );
    const patchPath = this.getPatchPath(pack);
    let fixed = this.fixBranchName(
      untracked_path,
      patchPath[0],
      patchPath[1]
    );
    await this.checkoutAndCreate(fixed);

    // // stage file
    await this.stageFile(untracked_path);

    // // commit file
    let commitres = await this.commitFile(
      untracked_path,
      message
    );

    // create tag
    await this.addTag(await this.getCurrentBranch());

    // checkout to base branch
    await this.checkout(current);

    // delete branch
    await this.removeBranch(fixed, true);

    // reload it it was started
    await this.start();

    return commitres;
  }

  // zaion
  async zaionCommitFile(file: string, message?: string) {
    if (message) {
      return "not yet";
    } else {
      let currentBranch = await this.getCurrentBranch();
      console.log(
        "the current branch is: ",
        currentBranch
      );
      // check file
      let isFileInUntracked =
        await this.checkIsFileInUntracked(file);
      if (isFileInUntracked) {
        console.log("file is untracked");
        let untracked_paths = await this.filterUntracked(
          file
        );
        if (untracked_paths) {
          let untracked_path = untracked_paths[0];
          return await this.step1(
            untracked_path,
            currentBranch
          );
        }
      } else return "file is not in tracked ones";
    }
  }

  // general
  async status(path?: string) {
    // TODO integrare la libreria di git, questo comando da
    // problemi quando ci sono file gia nello stage
    let command;
    if (path) {
      command = `git status ${path}`;
    } else {
      command = `git status`;
    }
    let status = await execCommand(command);
    // check is contains staged files

    let response = this.checkHasStaged(status);
    if (response) {
      return "there are staged files";
    } else {
      return await execCommand(command);
    }
  }

  // tags
  async getTags(): Promise<string[]> {
    return (await execCommand("git tag")).split("\n");
  }

  async getCurrentBranchTags() {
    return (await this.getTags()).filter(e =>
      e.includes(this.currentBranch.replace("main", ""))
    );
  }

  async addTag(tag: string, commithash?: string) {
    let command;
    if (commithash) {
      command = `git tag ${tag} ${commithash}`;
    } else {
      command = `git tag ${tag}`;
    }
    return await execCommand(command);
  }

  async addAllTags(tags: string[]) {
    tags.forEach(
      async tag => await this.addTag(tag[0], tag[1])
    );
  }

  async substituteTag(newTag: string, oldTag: string) {
    const command = `git tag ${newTag} ${oldTag}`;
    return await execCommand(command);
  }

  async deleteTag(tagname: string) {
    const command = `git tag -d ${tagname}`;
    return await execCommand(command);
  }

  async substituteAndDeleteTag(
    newTag: string,
    oldTag: string
  ) {
    let createRes = await this.substituteTag(
      newTag,
      oldTag
    );
    console.log("create new tag result: ", createRes);
    let deleteOld = await this.deleteTag(oldTag);
    console.log("old tag deletiong result: ", deleteOld);
    return "success";
  }

  async substituteAndDeleteAllTags(list: string[]) {
    list.forEach(
      async e =>
        await this.substituteAndDeleteTag(e[1], e[0])
    );
  }

  async getHash(branch: string) {
    let hash = await execCommand(
      `git rev-parse ${branch}`
    );
    return hash.replace("\n", "");
  }

  async makeBranchHashTuple(br: string[]) {
    let res = br.map(async b => {
      let hash = await this.getHash(b);
      return [b, hash];
    });
    return await Promise.all(res);
  }

  // branches
  async getBranches(filter = "") {
    let command = "git branch";
    return (await execCommand(command))
      .split("\n")
      .map((e: string) => e.slice(2, e.length))
      .filter((e: string) => e !== "")
      .filter((e: string) => e.includes(filter));
  }
  /**
   * retrieves tags which have the same root as the current
   * branch.
   */
  async getChildBranches(): Promise<string[]> {
    let branches = await this.getBranches();
    return this.filterTagList(
      branches,
      this.currentBranch.replace(this.MAIN, this.EMPTY)
    );
  }

  /**
   * retrieves a child branch which is a "main", branch.
   */
  async getBranchMainChild() {
    let children = await this.getChildBranches();
    let index = children
      .map(e =>
        e.replace(
          this.currentBranch.replace(
            this.MAIN,
            this.EMPTY
          ),
          this.EMPTY
        )
      )
      .findIndex(e => e === "main");
    //
    return children[index];
  }

  async removeAllBranches(
    branches: string[],
    force?: boolean
  ) {
    let flag;
    if (force) flag = "-D";
    else flag = "-d";
    while (branches.length > 0) {
      let current = branches.pop();
      let command = `git branch ${flag} ${current}`;
      await execCommand(command);
      console.log(`deleted ${current}`);
    }
    return branches;
  }

  async removeBranch(branch: string, force?: boolean) {
    let flag = "-d";
    let command = "git branch";
    if (force) {
      flag = "-D";
    } else {
      flag = "-d";
    }
    command = `${command} ${flag} ${branch}`;
    return await execCommand(command);
  }

  async getCurrentBranch() {
    let command = `git rev-parse --abbrev-ref HEAD`;
    return (await execCommand(command)).replace("\n", "");
  }

  async checkout(branch: string) {
    let command = `git checkout ${branch}`;
    let response = await execCommand(command);
    console.log(response);
    await this.start();
    return this;
  }

  async checkoutAndCreate(branch: string) {
    let command = `git checkout -b ${branch}`;
    let response = await execCommand(command);
    await this.start();
    return response;
  }

  async checkoutADeleetB(A: string, B: string) {
    let checkoutresult = await this.checkout(A);
    console.log(checkoutresult);
    return this.removeBranch(B);
  }

  async checkoutBranchMainChild() {
    let branchMainChild = await this.getBranchMainChild();
    let chresponse = await this.checkout(branchMainChild);
    console.log(chresponse);
    return this;
  }

  // untracked
  async checkIsFileInUntracked(file: string) {
    let filtered = await this.filterUntracked(file);
    if (filtered) {
      let isFileInUntracked = filtered.length > 0;
      return isFileInUntracked;
    }
  }

  async getUntracked(path?: string) {
    let status: string;
    if (path) {
      status = await this.status(path);
    } else {
      status = await this.status();
    }
    if (status === this.STATUS_ERROR) {
      return status;
    } else {
      return status
        .split("\n")
        .filter(e => e.startsWith("\t"))
        .map(f => f.replace("\t", ""));
    }
  }

  async filterUntracked(file: string) {
    let untracked = await this.getUntracked();
    if (Array.isArray(untracked)) {
      let filtered = untracked.filter(b =>
        b.includes(file)
      );
      return filtered;
    }
  }

  // stage
  async stageFile(file: string) {
    let command = `git add ${file}`;
    return await execCommand(command);
  }

  // commit
  async commitFile(file: string, message?: string) {
    let command = `git commit ${file} -m`;
    if (message) {
      command = `${command} "${message}"`;
    } else command = `${command} "default message"`;
    return (await execCommand(command)).split("\n");
  }

  // merge
  async merge(tag: string) {
    let command = `git merge ${tag} --no-ff`;
    let response = await execCommand(command);
    console.log(response);
    return this;
  }

  // utilities
  filterTagList(res: string[], filter: string) {
    return res.filter(e => e.startsWith(filter));
  }

  substituteAll(
    results: string[],
    arg1: string,
    arg2: string
  ) {
    return results.map(e => [e, e.replace(arg1, arg2)]);
  }

  removeLevels(path: string, levels: string) {
    return path.replace(levels, "");
  }

  addPrefixLevels(path: string, levels: string) {
    return `${levels}${path}`;
  }

  fixBranchName(
    branch: string,
    levelsToRemove: string,
    levelsToadd: string
  ) {
    if (levelsToRemove && levelsToadd) {
      let removed = this.removeLevels(
        branch,
        levelsToRemove
      );
      let prefixed = this.addPrefixLevels(
        removed,
        levelsToadd
      );
      return prefixed;
    } else return "wrong number of args";
  }

  checkHasStaged(status: string) {
    let hasStaged = status.includes(
      "Changes to be committed"
    );
    if (hasStaged) return true;
    else return false;
  }

  filterFileRaw(entities: string[]) {
    return entities.filter(e => e.includes("."));
  }

  async start() {
    this.branches = await this.getBranches();
    this.untracked = await this.getUntracked();
    if (this.untracked === this.STATUS_ERROR) {
      this.files = this.STATUS_ERROR;
    } else {
      if (Array.isArray(this.untracked)) {
        this.files = this.untracked.map(p =>
          path.basename(this.formatUntrackedResponse(p))
        );
      }
    }
    this.currentBranch = await this.getCurrentBranch();
    this.tags = await this.getTags();
  }
}

// repo = new Man();
// await repo.start();
