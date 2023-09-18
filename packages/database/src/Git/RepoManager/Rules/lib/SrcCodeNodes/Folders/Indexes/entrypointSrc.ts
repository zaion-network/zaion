import { SrcCodeNode } from "../../../../SrcCodeNode";

const { IndexRule } = SrcCodeNode;

export let entrypoint_src_rule = new IndexRule();
entrypoint_src_rule.path_patterns = [
  "./apps/*/src/*/",
  "./packages/*/src/*/",
];
entrypoint_src_rule.firstFile = IndexRule.originFiles.noiz;

export let entrypointSrc = new SrcCodeNode(
  SrcCodeNode.FolderContent.subCategories.entrypoint_src,
  entrypoint_src_rule
);
const { contents } = SrcCodeNode;

entrypointSrc.addContent(contents.lib_optional);
entrypointSrc.addContent(contents.module_optional);
// files
entrypointSrc.addContent(contents.indexType_optional);
entrypointSrc.addContent(contents.indexType_optional);
