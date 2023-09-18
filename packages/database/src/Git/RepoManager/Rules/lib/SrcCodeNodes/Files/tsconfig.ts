import { SrcCodeNode } from "../../../SrcCodeNode";

let tsconfig_rule = new SrcCodeNode.FileRule();

export let tsconfigjson = new SrcCodeNode(
  SrcCodeNode.FolderContent.configFilesTypes.tsconfig,
  tsconfig_rule
);
