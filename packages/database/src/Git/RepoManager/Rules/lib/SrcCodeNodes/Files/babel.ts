import { SrcCodeNode } from "../../../SrcCodeNode";

const { sorts, subSorts, configFilesTypes } =
  SrcCodeNode.FolderContent;

let babel_rule = new SrcCodeNode.FileRule();
babel_rule.sort = sorts.packages;
babel_rule.subSort = subSorts.package;

export let babel = new SrcCodeNode(
  configFilesTypes.babel,
  babel_rule
);
