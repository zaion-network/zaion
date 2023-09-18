import { SrcCodeNode } from "../../../../SrcCodeNode";

let vscode_rule = new SrcCodeNode.ContainerRule();
vscode_rule.firstFile =
  SrcCodeNode.ContainerRule.originFiles.noiz;

export let vscode = new SrcCodeNode(
  SrcCodeNode.FolderContent.categories.vscode,
  vscode_rule
);
