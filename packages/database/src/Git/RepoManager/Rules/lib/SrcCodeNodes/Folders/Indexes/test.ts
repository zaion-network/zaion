import { SrcCodeNode } from "../../../../SrcCodeNode";

const { IndexRule } = SrcCodeNode;

const { sorts, subSorts, categories } =
  IndexRule.FolderContent;

let test_rule = new IndexRule();
test_rule.firstFile = IndexRule.originFiles.noiz;
test_rule.sort = sorts.packages;
test_rule.subSort = subSorts.package;
test_rule.category = categories.test;
test_rule.path_patterns = ["./packages/*/test/"];

const { contents } = SrcCodeNode;

export let test = new SrcCodeNode(
  categories.test + "_node",
  test_rule
);
// file
test.addContent(contents.test_file);
