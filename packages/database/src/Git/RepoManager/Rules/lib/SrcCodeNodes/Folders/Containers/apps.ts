import { SrcCodeNode } from "../../../../SrcCodeNode";

let apps_rule = new SrcCodeNode.ContainerRule();
apps_rule.firstFile =
  SrcCodeNode.ContainerRule.originFiles.noiz;

export let apps = new SrcCodeNode(
  SrcCodeNode.FolderContent.sorts.apps,
  apps_rule
);
