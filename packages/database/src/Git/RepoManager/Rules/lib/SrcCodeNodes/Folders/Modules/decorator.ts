import { SrcCodeNode } from "../../../../SrcCodeNode";

export let decorator_rule = new SrcCodeNode.ModuleRule();
decorator_rule.firstFile =
  SrcCodeNode.ModuleRule.originFiles.noiz;

const { FolderContent, contents } = SrcCodeNode;

export let decorator = new SrcCodeNode(
  FolderContent.subGenres.decorators,
  decorator_rule
);
decorator.addContent(contents.module_dir);
// files
decorator.addContent(contents.index);
decorator.addContent(contents.indexType);
