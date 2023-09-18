import { SrcCodeNode } from "../../../../SrcCodeNode";

let public_rule = new SrcCodeNode.ContainerRule();
public_rule.firstFile =
  SrcCodeNode.ContainerRule.originFiles.noiz;

export let publicNode = new SrcCodeNode(
  SrcCodeNode.FolderContent.sorts.proposals,
  public_rule
);
