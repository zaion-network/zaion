import { SrcCodeNode } from "../../../SrcCodeNode";

let indexTypeNode_rule = new SrcCodeNode.FileRule();

export let indexTypeNode = new SrcCodeNode(
  SrcCodeNode.FolderContent.configFilesTypes.indexTypes,
  indexTypeNode_rule
);
