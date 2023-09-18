import {
  Edge,
  Types,
} from "../../../../../Edge/Edge.type";
import {
  Children,
  Parent,
} from "../../../../../Edge/Edge";
import { Node } from "../../Node.type";
import { execSync } from "../../../../../../lib/execSync";
import { existsSync } from "fs";
import { writeFileSync } from "fs";
import { readFileSync } from "fs";
import { Git } from "../../../../../../ZaionGit/Git";
import { graph } from "../../../../../Rules/SrcCodeGraph/lib";
import { config } from "../../../Repo";
import { splitters } from "../../../Repo/Repo.type";

export enum FileSystemNodeStates {
  untracked = "untracked",
  staged = "staged",
  committed = "committed",
}

export enum MutatedSorts {
  untracked = "untracked",
  staged = "staged",
  committed = "committed",
}

export interface Mutated {
  sort: `${MutatedSorts}`;
}

export enum FileSystemKinds {
  folder = "folder",
  file = "file",
}

export interface FileSystemNodeValue {
  name: string;
  path: string;
  parent?: FileSystemNode;
}

// aliases
let fsnt = FileSystemNodeStates;

export abstract class FileSystemNode extends Node {
  static git = new Git();
  static execSync = execSync;
  static existsSync = existsSync;
  static readFileSync = readFileSync;
  static writeFileSync = writeFileSync;
  static srcCodeGraph = graph;
  static config = config;
  static splitters = splitters;
  static get cwd() {
    return process.cwd();
  }
  static get root() {
    return FileSystemNode.git.getBaseDir();
  }
  static kinds: typeof FileSystemKinds = FileSystemKinds;
  static sorts: typeof MutatedSorts = MutatedSorts;
  // static folderSorts: typeof folderTypes = folderTypes;
  // static fileSorts: typeof fileSubCategories =
  //   fileSubCategories;
  // static srcFolderCatagories: typeof sfc = sfc;
  static fileSystemStates: typeof fsnt = fsnt;
  value: FileSystemNodeValue;
  kind: `${FileSystemKinds}`;
  nodes: Map<string, FileSystemNode>;
  edges: Map<string, Edge>;
  constructor(
    kind: `${FileSystemKinds}`,
    value: FileSystemNodeValue,
    parent?: FileSystemNode | null
  ) {
    super("file-system", value);
    this.value = value;
    let children = new Children(
      new Map<FileSystemNode, FileSystemNode[]>()
    );
    let _parent = new Parent(
      new Map<FileSystemNode, [FileSystemNode]>()
    );
    if (parent) _parent.value.set(this, [parent]);
    this.kind = kind;
    this.nodes = new Map();
    this.edges = new Map();
    this.edges.set(children.type, children);
    this.edges.set(_parent.type, _parent);

    this.edges.get(children.type)?.value.set(this, []);
  }
  get children() {
    let children = this.edges
      .get("children")
      ?.value.get(this) as FileSystemNode[];
    if (!children) throw new Error("no children");
    return children;
  }
  set children(nodes: FileSystemNode[]) {
    let prevnodes = this.edges
      .get("children")
      ?.value.get(this) as FileSystemNode[];
    let newchildren: FileSystemNode[] = [];
    if (prevnodes)
      prevnodes.forEach(n => newchildren.push(n));
    nodes.forEach(n => newchildren.push(n));
    this.edges
      .get("children")
      ?.value.set(this, newchildren);
  }
  get parent() {
    const E_ERR = "no parent edge";
    let edge = this.edges.get(Types.parent);
    if (!(edge instanceof Parent)) throw new Error("");
    let parent = edge.value.get(this);
    if (!parent) return;
    return parent;
  }
  traverse(callback: (node: FileSystemNode) => void) {
    callback(this);
    if (this.children) {
      this.children.forEach(child =>
        child.traverse(callback)
      );
    }
  }
  find(
    cb: (node: FileSystemNode) => boolean
  ): FileSystemNode[] | null {
    let result: FileSystemNode[] | null = [];
    this.traverse(node => {
      if (!Array.isArray(result)) result = [];
      if (cb(node)) result.push(node);
    });
    if (result.length === 0) result = null;
    return result;
  }
  findByName(name: string): FileSystemNode | null {
    if (this.value.name === name) {
      return this;
    }
    for (const child of this.children) {
      const found = child.findByName(name);
      if (found) {
        return found;
      }
    }
    return null;
  }
  findAllByName(name: string): FileSystemNode[] {
    let result: FileSystemNode[] = [];
    if (this.value.name === name) {
      result.push(this);
    }
    this.children.forEach(child => {
      result = result.concat(child.findAllByName(name));
    });
    return result;
  }
  tag() {
    let stringToDelete;
    let stringWhichSubstitutes;
    if (this.sort === FileSystemNode.sorts.committed) {
      // can tag
      if (this.isPackage()) {
        let repopack = this.detectPackage();
        stringToDelete = `./packages/${repopack}/`;
        stringWhichSubstitutes = `${repopack}/`;
        if (this.isSrc()) {
          // if the file is in the src folder, add src
          stringToDelete = `${stringToDelete}src/`;
        } else {
          // if file is not, just delete the package path
          stringToDelete = `${stringToDelete}/`;
        }
      } else {
        return this.value.path;
      }
      return this.value.path.replace(
        stringToDelete,
        stringWhichSubstitutes
      );
    } else {
      console.log("this node cannot be tagged");
    }
  }
  status(): string[] | undefined {
    let response: string[] | undefined;
    if (this.kind === "folder") {
      response = FileSystemNode.execSync(
        `git status ${this.value.path}/`
      );
    } else if (this.kind === "file") {
      let parent = this.parent;
      let path;
      if (!parent) path = this.value.path;
      else path = parent[0].value.path;
      response = FileSystemNode.execSync(
        `git status -s ${path}/`,
        { withResponse: true }
      );
    }
    return response;
  }
  isSrc() {
    return this.value.path.includes("src/");
  }
  isPackage() {
    return this.value.path.includes(
      FileSystemNode.config.PACKAGES
    );
  }
  isApp() {
    return this.value.path.includes(
      FileSystemNode.config.APPS
    );
  }
  isBin() {
    return this.value.path.includes(
      FileSystemNode.config.BIN
    );
  }
  isRoot() {
    return this.parent === undefined;
  }
  isFolder() {
    return this.kind === "folder";
  }
  isFile() {
    return this.kind === "file";
  }

  #detectPath(path: string) {
    const value = this.value;
    let basepath = value.path.replace(
      path,
      FileSystemNode.config.EMPTY
    );
    let splitted = basepath.split("/");
    return splitted[0];
  }

  detectPackage() {
    return this.#detectPath(
      `./${FileSystemNode.config.PACKAGES}`
    );
  }

  detectApp() {
    return this.#detectPath(
      `./${FileSystemNode.config.APPS}`
    );
  }
  detectLocation() {
    if (this.isApp()) return this.detectApp();
    else if (this.isPackage()) return this.detectPackage();
    else if (this.isBin()) return "bin";
    else return "root";
  }

  #removeLevels(path: string, levels: string) {
    return path.replace(levels, "");
  }

  #addPrefixLevels(path: string, levels: string) {
    return `${levels}${path}`;
  }
  #isFirstLetterPoint() {
    return this.value.name.startsWith(".");
  }

  #correctFirstLetter(string: string) {
    const { slash } = FileSystemNode.splitters;
    let split = string.split(slash);
    let last = split.pop();
    if (!last) throw new Error("no last");
    let fixed = last.slice(1, last.length);
    split.push(fixed);
    string = split.join(slash);
    return string;
  }

  #checkAndFix(string: string, splitSign: string) {
    return string
      .split(splitSign)
      .map(this.#checkAndFixAll)
      .join(splitSign);
  }

  #checkAndFixAll = (s: string) => {
    if (s.startsWith(".")) s = this.#correctFirstLetter(s);
    return s;
  };

  #buildTagName(
    branch: string,
    levelsToRemove: string,
    levelsToadd: string,
    suffix: string
  ) {
    const remove = this.#removeLevels;
    const add = this.#addPrefixLevels;
    if (!levelsToRemove || !levelsToadd)
      return "wrong number of args";
    let removed = remove(branch, levelsToRemove);
    let prefixed = add(removed, levelsToadd);
    let slash = FileSystemNode.splitters.slash;
    prefixed = this.#checkAndFix(prefixed, slash);
    return `${prefixed}/${suffix}`;
  }

  protected buildTagFactory = (suffix: string) => {
    return (patches: {
      [k: string]: [string, string];
    }) => {
      let location = this.detectLocation();
      let patch = patches[location];

      let isPathAsPatch =
        this.value.path ===
        patch[0].slice(0, patch[0].length - 1);
      if (isPathAsPatch) {
        return `${patch[1]}${suffix}`;
      } else {
        return this.#buildTagName(
          this.value.path,
          patch[0],
          patch[1],
          suffix
        );
      }
    };
  };
}
