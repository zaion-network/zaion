import { SrcCodeNode } from "../../../../SrcCodeNode";

let root_rule = new SrcCodeNode.ContainerRule();
root_rule.firstFile =
  SrcCodeNode.ContainerRule.originFiles.readme;

const {
  apps,
  packages,
  bin,
  proposals,
  vscode_optional,
  assets_optional,
  chatGPT_optional,
  tasks,
} = SrcCodeNode.contents;

export let root = new SrcCodeNode(".", root_rule);
root.addContent(apps);
root.addContent(bin);
root.addContent(packages);
root.addContent(proposals);
root.addContent(tasks);
root.addContent(vscode_optional);
root.addContent(assets_optional);
root.addContent(chatGPT_optional);
