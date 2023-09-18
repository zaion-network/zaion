import { SrcCodeNode } from "../../../../SrcCodeNode";

let nodeModules_rule = new SrcCodeNode.ContainerRule();
nodeModules_rule.isIgnored = true;

export let nodeModules = new SrcCodeNode(
  SrcCodeNode.FolderContent.categories.dist,
  nodeModules_rule
);
