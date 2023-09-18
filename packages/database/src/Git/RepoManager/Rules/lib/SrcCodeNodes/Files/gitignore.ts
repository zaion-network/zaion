import { SrcCodeNode } from "../../../SrcCodeNode";

let gitignore_rule = new SrcCodeNode.FileRule();

export let gitignore = new SrcCodeNode(
  SrcCodeNode.FolderContent.configFilesTypes.gitignore,
  gitignore_rule
);
