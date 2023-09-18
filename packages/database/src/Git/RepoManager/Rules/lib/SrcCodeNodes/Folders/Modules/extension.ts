import { SrcCodeNode } from "../../../../SrcCodeNode";

const { ModuleRule } = SrcCodeNode;

export let extension_rule = new ModuleRule();
extension_rule.firstFile = ModuleRule.originFiles.noiz;

const { FolderContent, contents } = SrcCodeNode;

export let extension = new SrcCodeNode(
  FolderContent.subGenres.extensions,
  extension_rule
);
extension.addContent(contents.module_dir);
// files
extension.addContent(contents.index);
extension.addContent(contents.indexType);
