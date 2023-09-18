import { SrcCodeNode } from "../../../SrcCodeNode";

let next_rule = new SrcCodeNode.FileRule();

export let next = new SrcCodeNode(
  SrcCodeNode.FolderContent.configFilesTypes.next,
  next_rule
);
