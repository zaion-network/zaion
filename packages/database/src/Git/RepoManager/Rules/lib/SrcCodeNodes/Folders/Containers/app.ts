import { SrcCodeNode } from "../../../../SrcCodeNode";

const { FolderContent, ContainerRule } = SrcCodeNode;

export let apps_rule = new ContainerRule();
apps_rule.sort = ContainerRule.FolderContent.sorts.apps;
apps_rule.firstFile = ContainerRule.originFiles.readme;
apps_rule.path_patterns = ["./apps/"];

export let app = new SrcCodeNode(
  FolderContent.subSorts.app,
  apps_rule
);
const { contents } = SrcCodeNode;

app.addContent(contents.src);
app.addContent(contents.bin);
app.addContent(contents.build);
app.addContent(contents.nodeModules);
app.addContent(contents.vscode_optional);
// files
app.addContent(contents.packagejson);
app.addContent(contents.tsconfig);
app.addContent(contents.gitignore_optional);
app.addContent(contents.prettier_optional);
app.addContent(contents.babel_optional);
app.addContent(contents.rollup_optional);
app.addContent(contents.next_optional);
