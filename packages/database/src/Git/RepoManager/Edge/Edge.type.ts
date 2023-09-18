import { BlockCommit } from "../Graph/extensions/Node/extensions/Block/extensions/BlockCommit";
import { BlockNode } from "../Graph/extensions/Node/extensions/Block/BlockNode.type";
import { Branch } from "../Graph/extensions/Node/extensions/Branch/Branch.type";
import { Commit } from "../Graph/extensions/Node/extensions/Commit/Commit.type";
import { FileSystemNode } from "../Graph/extensions/Node/extensions/FileSystem/FileSystemNode.type";
import { Folder } from "../Graph/extensions/Node/extensions/FileSystem/extensions/Folder/Folder.type";
import { FolderMutated } from "../Graph/extensions/Node/extensions/FileSystem/extensions/Folder/extensions/FolderMutated/FolderMutated.type";
import { Node } from "../Graph/extensions/Node/Node.type";

export enum Types {
  blockChild = "block-child",
  blockParent = "block-parent",
  children = "children",
  parent = "parent",
  parents = "parents",
  commitBlock = "commit-block",
  commitParents = "commit-parents",
  commits = "commits",
  head = "head",
  change = "change",
  tree = "tree",
}

export abstract class Edge {
  abstract type: string;
  abstract value: Map<Node, Node[] | Node>;
}

export abstract class BlockChild extends Edge {
  type: (typeof Types)["blockChild"] = Types.blockChild;
  value: Map<BlockNode, BlockNode>;
  constructor(value: Map<BlockNode, BlockNode>) {
    super();
    this.value = value;
  }
}

export abstract class BlockParent extends Edge {
  type: (typeof Types)["blockParent"] = Types.blockParent;
  value: Map<BlockNode, BlockNode>;
  constructor(value: Map<BlockNode, BlockNode>) {
    super();
    this.value = value;
  }
}

export abstract class Children extends Edge {
  type: (typeof Types)["children"] = Types.children;
  value: Map<FileSystemNode, FileSystemNode[]>;
  constructor(
    value: Map<FileSystemNode, FileSystemNode[]>
  ) {
    super();
    this.value = value;
  }
}

export abstract class Parents extends Edge {
  type: (typeof Types)["parents"] = Types.parents;
  value: Map<FileSystemNode, FileSystemNode[]>;
  constructor(
    value: Map<FileSystemNode, FileSystemNode[]>
  ) {
    super();
    this.value = value;
  }
}

export abstract class Parent extends Edge {
  type: (typeof Types)["parent"] = Types.parent;
  value: Map<FileSystemNode, [FileSystemNode]>;
  constructor(
    value: Map<FileSystemNode, [FileSystemNode]>
  ) {
    super();
    this.value = value;
  }
}

export abstract class Changes extends Edge {
  type: (typeof Types)["change"] = Types.change;
  value: Map<Commit, FolderMutated>;
  constructor(value: Map<Commit, FolderMutated>) {
    super();
    this.value = value;
  }
}

export abstract class CommitBlock extends Edge {
  value: Map<Branch, BlockCommit>;
  type: (typeof Types)["commitBlock"] = Types.commitBlock;
  constructor(value: Map<Branch, BlockCommit>) {
    super();
    this.value = value;
  }
}

export abstract class CommitParents extends Edge {
  value: Map<Commit, Commit[] | [Commit]>;
  type: (typeof Types)["commitParents"] =
    Types.commitParents;
  constructor(value: Map<Commit, Commit[] | [Commit]>) {
    super();
    this.value = value;
  }
}

export abstract class Commits extends Edge {
  type: (typeof Types)["commits"] = Types.commits;
  value: Map<Branch, Commit[]>;
  constructor(value: Map<Branch, Commit[]>) {
    super();
    this.value = value;
  }
}

export abstract class Head extends Edge {
  type: (typeof Types)["head"] = Types.head;
  value: Map<Branch, Commit>;
  constructor(value: Map<Branch, Commit>) {
    super();
    this.value = value;
  }
}

export abstract class Tree extends Edge {
  type: (typeof Types)["tree"] = Types.tree;
  value: Map<Commit, Folder>;
  constructor(value: Map<Commit, Folder>) {
    super();
    this.value = value;
  }
}
