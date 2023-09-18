import { SrcCodeNode } from "../../../SrcCodeNode";

let indexNode_rule = new SrcCodeNode.FileRule();

export let indexNode = new SrcCodeNode(
  SrcCodeNode.FolderContent.configFilesTypes.index,
  indexNode_rule
);
