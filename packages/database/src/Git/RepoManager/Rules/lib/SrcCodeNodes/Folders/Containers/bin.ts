import { SrcCodeNode } from "../../../../SrcCodeNode";

const { ContainerRule } = SrcCodeNode;
const { sorts, subSorts, categories } =
  SrcCodeNode.ContainerRule.FolderContent;

const { buildSh } = SrcCodeNode.contents;

let bin_rule = new ContainerRule();
bin_rule.sort = sorts.packages;
bin_rule.subSort = subSorts.package;
bin_rule.category = categories.bin;
bin_rule.firstFile = ContainerRule.originFiles.readme;

export let bin = new SrcCodeNode(
  SrcCodeNode.FolderContent.categories.bin,
  bin_rule
);
bin.contents = [buildSh];
