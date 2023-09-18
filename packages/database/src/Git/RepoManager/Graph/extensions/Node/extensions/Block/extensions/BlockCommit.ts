import { BlockNode } from "../BlockNode.type";
import {
  Commit,
  CommitValue,
} from "../../Commit/Commit.type";

export abstract class BlockCommit extends BlockNode {
  constructor(value: CommitValue, parent?: BlockCommit) {
    super("commit", value, parent);
  }
}
