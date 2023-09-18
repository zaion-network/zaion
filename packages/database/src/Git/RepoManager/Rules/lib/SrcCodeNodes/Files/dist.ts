import { SrcCodeNode } from "../../../SrcCodeNode";

const { FileRule } = SrcCodeNode;

let dist_rule = new FileRule();
dist_rule.isIgnored = true;

export let dist = new SrcCodeNode(
  SrcCodeNode.FolderContent.categories.dist,
  dist_rule
);
