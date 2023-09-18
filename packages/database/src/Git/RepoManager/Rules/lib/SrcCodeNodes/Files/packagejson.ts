import { SrcCodeNode } from "../../../SrcCodeNode";

let packagejson_rule = new SrcCodeNode.FileRule();

export let packagejson = new SrcCodeNode(
  SrcCodeNode.FolderContent.configFilesTypes.packagesjson,
  packagejson_rule
);
