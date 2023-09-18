import { SrcCodeNode } from "../../../../SrcCodeNode";

let packs_rule = new SrcCodeNode.ContainerRule();
packs_rule.firstFile =
  SrcCodeNode.ContainerRule.originFiles.noiz;

export let packs = new SrcCodeNode(
  SrcCodeNode.FolderContent.sorts.packages,
  packs_rule
);
