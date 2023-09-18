import { SrcCodeNode } from "../../../../SrcCodeNode";

const { ModuleRule } = SrcCodeNode;

export let leaf_module_rule = new ModuleRule();

const { FolderContent, contents } = SrcCodeNode;

export let leaf = new SrcCodeNode(
  FolderContent.genres.leadModule,
  leaf_module_rule
);
// files
leaf.addContent(contents.module_file);
leaf.addContent(contents.test_file);
leaf.addContent(contents.type_file);
leaf.addContent(contents.index);
leaf.addContent(contents.indexType);
