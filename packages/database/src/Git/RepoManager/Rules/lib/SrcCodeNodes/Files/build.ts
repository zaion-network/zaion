import { SrcCodeNode } from "../../../SrcCodeNode";

let build_rule = new SrcCodeNode.FileRule();

export let build = new SrcCodeNode(
  SrcCodeNode.FolderContent.categories.build,
  build_rule
);
