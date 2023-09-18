import { SrcCodeNode } from "../../../SrcCodeNode";

let prettier_rule = new SrcCodeNode.FileRule();
prettier_rule.availability =
  SrcCodeNode.FolderContent.availabilities.optional;

export let prettier = new SrcCodeNode(
  SrcCodeNode.FolderContent.configFilesTypes.prettier,
  prettier_rule
);
