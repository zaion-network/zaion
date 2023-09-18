import { Edge } from "../../../../../Edge/Edge.type";
import { Changes } from "../../../../../Edge/Edge";
import {
  CommitParents,
  Tree,
} from "../../../../../Edge/Edge";
import { Node } from "../../Node.type";
import { Folder } from "../FileSystem/extensions/Folder/Folder.type";
import { FileSystemKinds } from "../FileSystem/FileSystemNode.type";
import { FolderMutated } from "../FileSystem/extensions/Folder/extensions/FolderMutated/FolderMutated.type";
import { CommitValue } from "../../../../../../Types/Commit.type";

export abstract class Commit extends Node {
  get changes(): FolderMutated {
    let changesedge = this.edges.get("changes") as Changes;
    if (changesedge instanceof Changes) {
      let changes = changesedge.value.get(this);
      if (changes) {
        return changes;
      } else throw new Error("no value with this");
    } else throw new Error("no change edge");
  }
  get parents(): Commit[] | [Commit] | null {
    let parentsEdge: CommitParents = this.edges.get(
      "parents"
    ) as CommitParents;
    if (parentsEdge instanceof CommitParents) {
      let parents = parentsEdge.value.get(this);
      if (parents) {
        if (parents.length === 1) {
          return parents;
        } else {
          return parents;
        }
      } else {
        return null;
      }
    } else throw new Error("");
  }
  get tree(): Folder {
    const E_ERR = "no tree edge";
    const T_ERR = "no tree at all";
    let edge = this.edges.get("tree");
    if (!(edge instanceof Tree)) throw new Error(E_ERR);
    let tree = edge.value.get(this);
    if (!tree) throw new Error(T_ERR);
    return tree;
  }
  kind: `${FileSystemKinds}`;
  sort: any;
  nodes: Map<string, Node>;
  edges: Map<string, Edge>;
  constructor(
    kind: `${FileSystemKinds}`,
    value: CommitValue
  ) {
    super("commit", value);
    this.kind = kind;
    this.nodes = new Map();
    let changesedge = new Changes(
      new Map<Commit, FolderMutated>()
    );
    let parentsedge = new CommitParents(
      new Map<Commit, Commit[]>().set(this, [])
    );
    let treeedge = new Tree(new Map<Commit, Folder>());
    this.edges = new Map();
    this.edges.set(changesedge.type, changesedge);
    this.edges.set(parentsedge.type, parentsedge);
    this.edges.set(treeedge.type, treeedge);
  }
}
