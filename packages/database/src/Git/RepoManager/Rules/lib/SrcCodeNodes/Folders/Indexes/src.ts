import { SrcCodeNode } from "../../../../SrcCodeNode";

const { IndexRule } = SrcCodeNode;
const { originFiles, FolderContent } = IndexRule;
const {
  sorts,
  subSorts,
  categories,
  subCategories,
  genres,
} = FolderContent;
const { entrypoint_src } = subCategories;

let contents = [
  SrcCodeNode.contents.module_optional,
  SrcCodeNode.contents.lib_optional,
  SrcCodeNode.contents.sub_src_optional,
  SrcCodeNode.contents.index_optional,
  SrcCodeNode.contents.indexType_optional,
];

export let src_rule = new IndexRule();
src_rule.sort = IndexRule.FolderContent.sorts.packages;
src_rule.firstFile = originFiles.noiz;
src_rule.path_patterns = [
  "./apps/*/src/",
  "./packages/*/src/",
];

export let src = new SrcCodeNode(
  SrcCodeNode.FolderContent.categories.src,
  src_rule
);

let src_in_entrypoint_rule = new IndexRule();
src_in_entrypoint_rule.path_patterns = [
  "./apps/*/src/*/src/",
  "./packages/*/src/*/src/",
];
src_in_entrypoint_rule.firstFile = originFiles.readme;
src_in_entrypoint_rule.sort = sorts.apps;
src_in_entrypoint_rule.subSort = subSorts.app;
src_in_entrypoint_rule.category = categories.src;
src_in_entrypoint_rule.subCategory = entrypoint_src;
src_in_entrypoint_rule.genre = genres.entrypoint_sub_src;

export let src_in_entrypointSrc = new SrcCodeNode(
  categories.src + "_in_entrypoint_src",
  src_in_entrypoint_rule
);

contents.forEach(n => {
  src.addContent(n);
  src_in_entrypointSrc.addContent(n);
});
