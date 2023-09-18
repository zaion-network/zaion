import { SrcCodeNode } from "../../../../SrcCodeNode";

let chatGPT_rule = new SrcCodeNode.ContainerRule();
chatGPT_rule.firstFile =
  SrcCodeNode.ContainerRule.originFiles.readme;

export let chatGPT = new SrcCodeNode(
  SrcCodeNode.FolderContent.sorts.chatGPT,
  chatGPT_rule
);
