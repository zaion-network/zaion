import { SrcCodeNode } from "../../../../SrcCodeNode";

let assets_rule = new SrcCodeNode.ContainerRule();
assets_rule.firstFile =
  SrcCodeNode.ContainerRule.originFiles.noiz;

export let assets = new SrcCodeNode(
  SrcCodeNode.FolderContent.sorts.assets,
  assets_rule
);
