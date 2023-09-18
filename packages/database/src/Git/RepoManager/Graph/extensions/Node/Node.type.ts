import { BranchKinds } from "./extensions/Branch/Branch.type";
import { Edge } from "../../../Edge/Edge.type";
import { FileSystemKinds } from "./extensions/FileSystem/FileSystemNode.type";
import { Graph } from "../../Graph.type";
import { MutatedSorts } from "./extensions/FileSystem/FileSystemNode.type";

export enum Types {
  fileSystem = "file-system", // tree
  commit = "commit",
  tag = "tag",
  blob = "blob",
  change = "change",
  block = "block",
  branch = "branch",
}

export type Kinds =
  | `${FileSystemKinds}`
  | `${BranchKinds}`;

export type Sorts = `${MutatedSorts}`;

export interface Options {
  type?: `${Types}`;
  kind?: `${Kinds}`;
  sort?: `${Sorts}`;
}

export interface FolderOptions extends Options {
  type?: (typeof Types)["fileSystem"];
  kind?: (typeof FileSystemKinds)["folder"];
}

export interface FileOptions extends Options {
  type?: (typeof Types)["fileSystem"];
  kind?: (typeof FileSystemKinds)["file"];
}

export interface ChangeOptions extends Options {
  type?: (typeof Types)["change"];
}

export interface UntrackedFileOptions extends Options {
  type?: (typeof Types)["fileSystem"];
  kind?: (typeof FileSystemKinds)["file"];
  sort?: (typeof MutatedSorts)["untracked"];
}

export interface UntrackedFolderOptions extends Options {
  type?: (typeof Types)["fileSystem"];
  kind?: (typeof FileSystemKinds)["folder"];
  sort?: (typeof MutatedSorts)["untracked"];
}

export abstract class Node<T = `${Types}`> extends Graph {
  static Types: typeof Types = Types;
  abstract nodes: Map<string, Node>;
  abstract edges: Map<string, Edge>;
  abstract kind: string;
  abstract sort: string;
  constructor(
    public type: T,
    public value: any // public parent?: Node<T> | null
  ) {
    super();
    this.type = type;
    this.value = value;
    // this.parent = parent;
  }
}

export abstract class WorkingTreeNode extends Node {}

export abstract class NodeFactory {
  map: Map<
    string,
    new (value: any, parent: null | Node) => Node
  >;
  constructor() {
    this.map = new Map();
  }
  protected abstract registerModules(): void;
  protected registerModule(
    options: Options,
    Ctor: new () => Node
  ) {
    this.map.set(JSON.stringify(options), Ctor);
  }
  create(
    value: any,
    parent: Node | null,
    options: Options
  ): Node {
    const Ctor = this.map.get(JSON.stringify(options));
    if (!Ctor) throw new Error("");
    return new Ctor(value, parent);
  }
}
