import { Edge } from "../../../Edge/Edge.type";
import {
  Repo as RepoType,
  setOptionsTypes,
} from "./Repo.type";
import { RepoState } from "./Repo.type";
import {
  Node as NodeType,
  UntrackedFileOptions,
  UntrackedFolderOptions,
} from "../Node/Node.type";
import { Branch } from "../Node/extensions/Branch/Branch";
import { Commit } from "../Node/extensions/Commit/Commit";
import { FileSystemNode, Node } from "../Node";
import { FolderMutatedUntracked } from "../Node/extensions/FileSystem/extensions/Folder";
import { FileValue } from "../Node/extensions/FileSystem/extensions/File/File.type";
import { Git as GitType } from "../../../../ZaionGit/Git.type";
import { Git } from "../../../../ZaionGit/Git";
import {
  FileMutated,
  FileMutatedStaged,
} from "../Node/extensions/FileSystem/extensions/File";
import { FolderMutated } from "../Node/extensions/FileSystem/extensions/Folder";
// import { CommitValue } from "../../../../Types";
import { CommitValue } from "../../../../Types/Commit.type";

const create = new Node().create;

export class Repo extends RepoType {
  files: string | string[] = [];
  get tags() {
    let response: {
      [key: string]: string[];
      no_pattern: string[];
    } = {
      no_pattern: [],
    };
    let tags = this.git.getTags();
    let names = tags.map(t => t.name);
    names.forEach(p => {
      let levels = p.split("/");
      if (levels.length === 1) {
        response.no_pattern.push(levels[0]);
      } else {
        if (!response[levels[0]]) response[levels[0]] = [];
        response[levels[0]].push(
          p.replace(levels[0] + "/", "")
        );
      }
    });
    return response;
  }
  untracked: string | string[] = [];
  branches: Branch[] = [];
  get currentBranch() {
    return this.state.activeBranch.value;
  }
  git: GitType;

  rootValue: FileValue = { name: ".", path: "." };

  pathPatches: { [k: string]: [string, string] } = {
    zionbase: ["./packages/zionbase/", "zionbase/"],
    ui: ["./packages/ui/", "ui/"],
    database: ["./packages/database/", "database/"],
    ["landing-page"]: ["./apps/landing-page/", "landing/"],
    root: ["./", "root/"],
    cli: ["./apps/cli/", "cli/"],
  };

  get isUntrackedTreeBuilt() {
    return !(this.untrackedTree.children.length === 0);
  }
  untrackedTree = create(this.rootValue, undefined, {
    type: Node.types.fileSystem,
    sort: Node.sorts.mutated.untracked,
    kind: Node.kinds.filesystem.folder,
  });

  #state: RepoState;

  get untrackedSync() {
    const isRelativePath = this.state.options.relativePath;
    if (isRelativePath) return this.git.getUntracked();
    else return this.git.getUntracked(this.state.baseDir);
  }

  get state() {
    return this.#state;
  }

  set state(state: RepoState) {
    this.#state = state;
  }

  edges: Map<string, Edge> = new Map();

  nodes: Map<string, NodeType> = new Map();

  constructor() {
    //
    super();

    this.git = new Git();

    // let activeBranch = this.git.getCurrentBranch();

    let baseDir = this.git.getBaseDir();

    // let activeCommit = this.git.getCommit(activeBranch);

    // let { hash } = activeCommit;

    // let parentCommitValue =
    //   this.git.getDirectParentOfCommit(hash);

    // let parentCommit;

    // if (parentCommitValue) {
    //   parentCommit = new Commit(
    //     "folder",
    //     parentCommitValue
    //   );
    // } else {
    //   parentCommit = null;
    // }

    // let commit = new Commit(
    //   "folder",
    //   activeCommit,
    //   parentCommit
    // );

    let branch_ = this.git.branch(
      "getBranch",
      "refs/heads/zaion/dev"
    );

    let branch = new Branch(
      "create",
      branch_
      // commit
    );
    this.#state = {
      activeBranch: branch,
      baseDir: baseDir ? baseDir : ".",
      options: { relativePath: false },
    };
  }

  #defineNodePath(path: string) {
    const isRelativePath = this.state.options.relativePath;
    if (isRelativePath) return path;
    else return `${this.state.baseDir}/${path}`;
  }

  buildUntrackedTree(): string {
    if (this.isUntrackedTreeBuilt) {
      this.untrackedTree = create(
        this.rootValue,
        undefined,
        {
          type: Node.types.fileSystem,
          sort: Node.sorts.mutated.untracked,
          kind: Node.kinds.filesystem.folder,
        }
      );
    }
    console.log(Repo.logs.called);
    this.untrackedSync.forEach(file => {
      const parts = file.split(Repo.splitters.slash);
      let node = this.untrackedTree;
      parts.forEach(part => {
        let child = node.children.find(
          child => child.value.name === part
        );
        if (!child) {
          const value = {
            name: part,
            path:
              node.value.path +
              Repo.splitters.slash +
              part,
          };
          let folder = Node.kinds.filesystem.folder;
          let file = Node.kinds.filesystem.file;
          let nodepath = this.#defineNodePath(value.path);
          let isDir = this.git.isDirectory(nodepath);
          let untracked = Node.sorts.mutated.untracked;
          let foOpts: UntrackedFolderOptions = {
            kind: folder,
            sort: untracked,
          };
          let fiOpts: UntrackedFileOptions = {
            kind: file,
            sort: untracked,
          };
          if (isDir) child = create(value, node, foOpts);
          else child = create(value, node, fiOpts);
          node.children.push(child);
        }
        node = child as FolderMutatedUntracked;
      });
    });
    return Repo.logs.done;
  }

  printUntrackedTree(
    node: FileMutated | FolderMutated = this.untrackedTree,
    indent = ""
  ) {
    if (!node) return Repo.errors.NO_TREE;
    let output = "";
    const parent = node.parent;
    const isRoot = parent === undefined;
    let nofchildren;
    let lastchildidx;
    let lastchild;
    let isLast: boolean = isRoot;
    let isLastChildren: boolean | undefined;
    if (parent) {
      nofchildren = parent[0].children.length;
      lastchildidx = nofchildren - 1;
      lastchild = parent[0].children[lastchildidx];
      isLastChildren = node.id === lastchild.id;
      isLast = isLastChildren;
    }
    output += `${indent}${
      isRoot ? "" : isLast ? "└─" : "├─"
    } ${isRoot ? ".root" : node.value.name}\n`;
    node.children.forEach((child, index) => {
      output += this.printUntrackedTree(
        child as FileMutated | FolderMutated,
        `${indent}${isRoot ? "" : isLast ? "  " : "│ "}  `
      );
    });
    return output;
  }

  ///// MANAGER

  step1(
    untracked_path: string,
    current: string | null = null,
    message = "default message"
  ) {
    if (current === null)
      throw new Error(Repo.errors.PROBLEM);
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
    this.checkoutAndCreate(fixed);

    // // stage file
    this.stageFile(untracked_path);

    // // commit file
    let commitres = this.commitFile(
      untracked_path,
      message
    );

    // create tag
    this.addTag(this.getCurrentBranch());

    // checkout to base branch
    this.checkout(current);

    // delete branch
    this.removeBranch(fixed, true);

    // reload it it was started
    this.start();

    return commitres;
  }

  start(): void {
    this.branches = this.getBranches("", { object: true });
    this.untracked = this.getUntracked();
    if (this.untracked === Repo.errors.STATUS_ERROR) {
      this.files = Repo.errors.STATUS_ERROR;
    } else {
      if (Array.isArray(this.untracked)) {
        this.files = this.untracked.map(p =>
          this.git.basename(
            this.formatUntrackedResponse(p)
          )
        );
      }
    }

    // let activeBranch = this.git.getCurrentBranch();

    // let activeCommit = this.git.getCommit(activeBranch);

    // let { hash } = activeCommit;

    // let parentCommitValue =
    //   this.git.getDirectParentOfCommit(hash);

    // let parentCommit;

    // if (parentCommitValue) {
    //   parentCommit = new Commit(
    //     "folder",
    //     parentCommitValue
    //   );
    // } else {
    //   parentCommit = null;
    // }

    // let commit = new Commit(
    //   "folder",
    //   activeCommit,
    //   parentCommit
    // );

    let branch_ = this.git.branch(
      "getBranch",
      "refs/heads/zaion/dev"
    );

    let branch = new Branch(
      "create",
      branch_
      // commit
    );

    let state = this.state;

    state.activeBranch = branch;
    this.setState(state);
  }

  status(path?: string) {
    // TODO integrare la libreria di git, questo comando da
    // problemi quando ci sono file gia nello stage
    let status;
    if (path) {
      status = this.git.status(path, true);
    } else {
      status = this.git.status(undefined, true);
    }
    // check is contains staged files

    let response = this.checkHasStaged(status);
    if (response) {
      return "there are staged files";
    } else {
      return status;
    }
  }

  createDevMerge() {
    let currentbranch = this.currentBranch;
    let currentbranchtags = this.getCurrentBranchTags();
    // build dev branch patph
    let devbranch = currentbranch.replace(
      Repo.config.MAIN,
      Repo.config.DEV
    );
    // create dev branch
    let action_result = this.checkoutAndCreate(devbranch);
    console.log(action_result);
    while (currentbranchtags.length) {
      let currenttag = currentbranchtags.shift();
      if (currenttag) {
        this.merge(currenttag);
        console.log(
          `succesfully merged ${currenttag} into ${devbranch}`
        );
      } else continue;
    }
    return currentbranchtags;
  }

  zaionCommitFirstFolder(repo: RepoType) {
    this.zaionCommitFolder(repo.files[0]);
    return this;
  }

  zaionCommitFolder(folder: string, message?: string) {
    if (message) {
      return "not yet";
    } else {
      this.start();
      // get current branch (shall be a main)
      let currentBranch = this.currentBranch;
      // select untracked
      let folder_path_results =
        this.filterUntracked(folder);
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
        | string = this.getUntracked(folder_path);
      let untracked_files_in_folder: string;
      if (
        untracked_files_in_folder_response.length === 0
      ) {
        return `no untracked files in the path: ${folder_path} matched this pattern: ${Repo.config.NOIZ}`;
      } else {
        untracked_files_in_folder =
          untracked_files_in_folder_response[0];
      }
      let file;
      if (
        Array.isArray(untracked_files_in_folder_response)
      ) {
        file = untracked_files_in_folder_response.filter(
          e => e.includes(Repo.config.NOIZ)
        );
      }
      // if folder
      // cut main from branch branch_name
      let fixed = currentBranch.replace(
        Repo.config.MAIN,
        Repo.config.EMPTY
      );
      // stick untracked name plus /main
      let newBranchName = `${fixed}${folder}/${Repo.config.MAIN}`;
      // checkoutAndCreate
      this.checkoutAndCreate(newBranchName);
      // stage and commit .noiz or readme
      if (file) {
        // stage
        this.stageFile(file[0]);
        // commit
        let commitresponse = this.commitFile(file[0]);
        // reload
        this.start();
        return commitresponse;
      }
    }
  }

  zaionCommitAllFiles(repo: RepoType) {
    if (Array.isArray(repo.files)) {
      let files = this.filterFileRaw(repo.files);
      let clone = [...files];
      while (clone.length > 0) {
        let current = clone.shift();
        if (current) {
          repo.zaionCommitFile(current);
        }
      }
    }
    return this;
  }

  zaionCommitFile(file: string, message?: string) {
    if (message) {
      return "not yet";
    } else {
      let currentBranch = this.getCurrentBranch();
      console.log(
        "the current branch is: ",
        currentBranch
      );
      // check file
      let isFileInUntracked =
        this.checkIsFileInUntracked(file);
      if (isFileInUntracked) {
        console.log("file is untracked");
        let untracked_paths = this.filterUntracked(file);
        if (untracked_paths) {
          let untracked_path = untracked_paths[0];
          return this.step1(untracked_path, currentBranch);
        }
      } else return "file is not in tracked ones";
    }
  }

  #nodeIsFolderMutatedUntracked(
    node: FileSystemNode
  ): node is FolderMutatedUntracked {
    if (
      node.sort === "untracked" &&
      node.kind === "folder"
    )
      return true;
    else return false;
  }

  commitUntracked(node?: FolderMutatedUntracked) {
    let untracked = this.untrackedTree;
    if (node) {
      untracked = node;
    } else {
      untracked = this.untrackedTree;
    }
    untracked.traverse(node => {
      // initialize
      if (this.#nodeIsFolderMutatedUntracked(node)) {
        type init = {
          tag: string;
          branch: string;
        };
        // initialize
        node.initialize();
        // stage
        node.stage(this.pathPatches);
        // let staged = new FolderMutatedStaged(node.value);
        // // prepare
        // let prefix = node.detectLocation();
        // console.log(`prefix: ${prefix}`);

        // let patch = this.getPatchPath(prefix);
        // let fixed = this.fixBranchName(
        //   node.value.path,
        //   patch[0],
        //   patch[1]
        // );
        // console.log(`fixed path: ${fixed}`);

        // staged.commit("a commit message");
      }
    });
  }

  ///// rev-parse
  getBaseDir(): string {
    return this.git.getBaseDir();
  }

  getCurrentBranch(pointer: string = "HEAD") {
    return this.git.getCurrentBranch(pointer);
  }

  ///// log

  getCommit(head: string): CommitValue {
    return this.git.getCommit(head);
  }

  getDirectParentOfCommit(
    hash: string
  ): CommitValue | null {
    return this.git.getDirectParentOfCommit(hash);
  }

  ///// infos

  getPatchPath(pack: string) {
    return this.pathPatches[pack];
  }

  #detectPath(type: string) {
    return function (path: string) {
      return path
        .replace(type, Repo.config.EMPTY)
        .split("/")
        .filter(e => e !== ".")[0];
    };
  }

  detectApp = this.#detectPath(Repo.config.APPS);

  detectPackage = this.#detectPath(Repo.config.PACKAGES);

  // state

  #setRelativePath(isRelativePath: boolean) {
    if (this.isUntrackedTreeBuilt) {
      let currentstate = this.state;
      currentstate.options.relativePath = isRelativePath;
      this.state = currentstate;
      this.buildUntrackedTree();
    } else {
      let currentstate = this.state;
      currentstate.options.relativePath = isRelativePath;
      this.state = currentstate;
    }
  }
  setOptions(
    type: (typeof Repo.setOptionsTypes)["rp"],
    value: boolean
  ): void;
  setOptions(
    type: `${setOptionsTypes}`,
    value: any
  ): void {
    if (type === Repo.setOptionsTypes.rp)
      this.#setRelativePath(value);
  }
  setState(state: RepoState) {
    this.#state = state;
  }

  ///// booleans
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
    return untracked.startsWith(
      Repo.testString.MODIFIED_PRESTRING
    );
  }

  formatUntrackedResponse(untracked: string) {
    const isModified = this.isModified(untracked);
    if (isModified) {
      return untracked.replace(
        Repo.testString.MODIFIED_PRESTRING,
        Repo.config.EMPTY
      );
    } else return untracked;
  }

  ///// tags
  buildTag(node: FileSystemNode) {
    let location = node.detectLocation();
    let patch = this.getPatchPath(location);
    return this.fixBranchName(
      node.value.path,
      patch[0],
      patch[1]
    );
  }
  getTags(): string[] {
    return this.git.refs.tags as string[];
  }

  getCurrentBranchTags(): string[] {
    return this.getTags().filter(e =>
      e.includes(
        this.currentBranch.replace(
          Repo.config.MAIN,
          Repo.config.EMPTY
        )
      )
    );
  }

  addTag(tag: string, commithash?: string | undefined) {
    return this.git.addTag(tag, commithash);
  }

  addAllTags(tags: string[]) {
    tags.forEach(async tag => this.addTag(tag[0], tag[1]));
    return this;
  }

  substituteTag(newTag: string, oldTag: string): string {
    return this.git.addTag(newTag, oldTag);
  }

  deleteTag(tagname: string) {
    return this.git.deleteTag(tagname);
  }

  substituteAndDeleteTag(newTag: string, oldTag: string) {
    let createRes = this.substituteTag(newTag, oldTag);
    console.log("create new tag result: ", createRes);
    let deleteOld = this.deleteTag(oldTag);
    console.log("old tag deletiong result: ", deleteOld);
    return "success";
  }

  substituteAndDeleteAllTags(list: string[]) {
    list.forEach(async e =>
      this.substituteAndDeleteTag(e[1], e[0])
    );
    return this;
  }

  getHash(branch: string) {
    return this.git.getHash(branch);
  }

  makeBranchHashTuple(br: string[]) {
    let res = br.map(b => {
      let hash = this.getHash(b);
      return [b, hash];
    });
    return res;
  }

  ///// branches
  getBranches(
    filter?: string | undefined,
    ops?: { object: boolean }
  ) {
    if (filter) {
      return this.git
        .getBranches()
        .filter((e: string) => e.includes(filter));
    } else {
      if (ops) {
        return this.git.getBranches(filter, ops);
      } else {
        return this.git.getBranches();
      }
    }
  }
  /**
   * retrieves tags which have the same root as the current
   * branch.
   */
  getChildBranches(): string[] {
    let branches = this.getBranches();
    return this.filterTagList(
      branches,
      this.currentBranch.replace(
        Repo.config.MAIN,
        Repo.config.EMPTY
      )
    );
  }

  /**
   * retrieves a child branch which is a "main", branch.
   */
  getBranchMainChild() {
    let children = this.getChildBranches();
    let index = children
      .map(e =>
        e.replace(
          this.currentBranch.replace(
            Repo.config.MAIN,
            Repo.config.EMPTY
          ),
          Repo.config.EMPTY
        )
      )
      .findIndex(e => e === "main");
    //
    return children[index];
  }

  removeAllBranches(
    branches: string[],
    force?: boolean | undefined
  ): string[] {
    return this.git.removeAllBranches(branches, force);
  }

  removeBranch(
    branch: string,
    force?: boolean | undefined
  ): string {
    return this.git.removeBranch(branch, force);
  }

  ///// untracked

  checkIsFileInUntracked(file: string) {
    let filtered = this.filterUntracked(file);
    if (filtered) {
      let isFileInUntracked = filtered.length > 0;
      return isFileInUntracked;
    }
  }

  getUntracked(path?: string) {
    let status: string;
    if (path) {
      status = this.status(path);
    } else {
      status = this.status();
    }
    if (status === Repo.errors.STATUS_ERROR) {
      return status;
    } else {
      return status
        .split("\n")
        .filter(e => e.startsWith("\t"))
        .map(f => f.replace("\t", ""));
    }
  }

  filterUntracked(file: string) {
    let untracked = this.getUntracked();
    if (Array.isArray(untracked)) {
      let filtered = untracked.filter(b =>
        b.includes(file)
      );
      return filtered;
    }
  }

  ///// stage

  stageFile(file: string) {
    return this.git.stageFile(file);
  }

  ///// commit

  commitFile(
    file: string,
    message?: string | undefined
  ): string[] {
    return this.git.commitFile(file, message);
  }

  ///// merge

  merge(tag: string): this {
    this.git.merge(tag);
    return this;
  }

  ///// checkout
  checkout(branch: string): this {
    let response = this.git.checkout(branch);
    console.log(response);
    this.start();
    return this;
  }

  checkoutAndCreate(branch: string) {
    let response = this.git.checkoutAndCreate(branch);
    console.log(response);
    this.start();
    return this;
  }

  checkoutADeleetB(A: string, B: string): this {
    this.git.checkoutADeleteB(A, B);
    return this;
  }

  checkoutBranchMainChild() {
    let branchMainChild = this.getBranchMainChild();
    let chresponse = this.checkout(branchMainChild);
    console.log(chresponse);
    return this;
  }

  newCheckout(branch: string) {
    console.log(
      `i will checkout to this branch ${branch}`
    );
  }

  ///// utilities
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
}
