import { SrcCodeNode } from "../../../SrcCodeNode";

let rollup_rule = new SrcCodeNode.FileRule();

export let rollup = new SrcCodeNode(
  SrcCodeNode.FolderContent.configFilesTypes.rollup,
  rollup_rule
);
