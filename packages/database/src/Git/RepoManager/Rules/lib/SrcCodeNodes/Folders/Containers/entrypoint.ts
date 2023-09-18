import { SrcCodeNode } from "../../../../SrcCodeNode";

let entrypoint_rule = new SrcCodeNode.ContainerRule();

const { packagejson, dist } = SrcCodeNode.contents;

export let entrypoint = new SrcCodeNode(
  SrcCodeNode.FolderContent.categories.entrypoint,
  entrypoint_rule
);
// folders
entrypoint.addContent(dist);
// files
entrypoint.addContent(packagejson);
