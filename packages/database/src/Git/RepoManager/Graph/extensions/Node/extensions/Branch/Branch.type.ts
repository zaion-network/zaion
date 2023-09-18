import { Commit } from "../Commit/Commit";
import { Edge } from "../../../../../Edge/Edge.type";
import { Node } from "../../Node.type";
import {
  CommitBlock,
  Commits,
} from "../../../../../Edge/Edge";
import { Head } from "../../../../../Edge/Edge";
import { BranchValue } from "../../../../../../Types/Branch.type";

export enum BranchKinds {
  create = "create",
  update = "update",
  feature = "feature",
  task = "task",
}

// export interface BranchValue {
//   name: string;
// }

export abstract class Branch extends Node {
  kind: `${BranchKinds}`;
  nodes: Map<`${this["id"]}`, Branch>;
  edges: Map<"commits" | "head" | "commit-block", Edge>;

  get commits() {
    const E_ERR = "no commit edge";
    const C_ERR = "no commits array";
    let edge = this.edges.get("commits");
    if (!(edge instanceof Commits)) throw new Error(E_ERR);
    let commits = edge.value.get(this);
    if (!commits) throw new Error(C_ERR);
    return commits;
  }
  get head() {
    const E_ERR = "no head edge";
    const H_ERR = "no head";
    let edge = this.edges.get("head");
    if (!(edge instanceof Head)) throw new Error(E_ERR);
    let head = edge.value.get(this);
    if (!head) throw new Error(H_ERR);
    return head;
  }

  constructor(
    kind: `${BranchKinds}`,
    value: BranchValue
    // head: Commit
  ) {
    super("branch", value);
    let commitsedge = new Commits(
      new Map<Branch, Commit[]>().set(this, [])
    );
    // let headedge = new Head(
    //   new Map<Branch, Commit>().set(this, head)
    // );
    let commitblockedge = new CommitBlock(new Map());
    this.edges = new Map<
      "commits" | "head" | "commit-block",
      Edge
    >()
      .set(commitsedge.type, commitsedge)
      // .set(headedge.type, headedge)
      .set(commitblockedge.type, commitblockedge);
    this.nodes = new Map().set(this.id, this);
    this.value = value;
    this.kind = kind;
  }
}

export abstract class CreateBranch extends Branch {
  sort = "create";
}

export abstract class UpdateBranch extends Branch {
  sort = "update";
}

export abstract class FeatureBranch extends Branch {
  sort = "feature";
}

export abstract class TaskCommit extends Branch {
  sort = "task";
}
