import { SrcCodeNode } from "../../../../SrcCodeNode";

const { IndexRule } = SrcCodeNode;

export let lib_rule = new IndexRule();
lib_rule.firstFile = IndexRule.originFiles.noiz;

const { FolderContent, contents } = SrcCodeNode;

export let lib = new SrcCodeNode(
  FolderContent.genres.lib,
  lib_rule
);
lib.addContent(contents.module_dir);
// files
lib.addContent(contents.index);
lib.addContent(contents.indexType);
