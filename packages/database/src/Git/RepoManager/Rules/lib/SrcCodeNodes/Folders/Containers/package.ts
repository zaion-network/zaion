import { SrcCodeNode } from "../../../../SrcCodeNode";

const { ContainerRule } = SrcCodeNode;
const { originFiles } = ContainerRule;

export let packs_rule = new ContainerRule();
packs_rule.sort =
  ContainerRule.FolderContent.sorts.packages;
packs_rule.firstFile = originFiles.readme;
packs_rule.path_patterns = ["./packages/"];

export let pack = new SrcCodeNode(
  SrcCodeNode.FolderContent.subSorts.package,
  packs_rule
);
const { contents } = SrcCodeNode;
pack.addContent(contents.src);
pack.addContent(contents.bin);
pack.addContent(contents.test_optional);
pack.addContent(contents.dist);
pack.addContent(contents.nodeModules);
pack.addContent(contents.entrypoint_optional);
pack.addContent(contents.vscode_optional);
// files
pack.addContent(contents.babel_optional);
pack.addContent(contents.rollup_optional);
pack.addContent(contents.packagejson);
pack.addContent(contents.tsconfig);
pack.addContent(contents.gitignore_optional);
pack.addContent(contents.prettier_optional);
