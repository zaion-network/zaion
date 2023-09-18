import { SrcCodeNode } from "../../../../SrcCodeNode";

let proposals_rule = new SrcCodeNode.ContainerRule();
proposals_rule.firstFile =
  SrcCodeNode.ContainerRule.originFiles.readme;

export let proposals = new SrcCodeNode(
  SrcCodeNode.FolderContent.sorts.proposals,
  proposals_rule
);
