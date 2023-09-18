import { CommonFolderType } from "../../../Folder.type";
import { FolderMutated } from "../FolderMutated.type";
import { UntrackedFolder } from "../../../../../decorators/Untracked.type";
import { FileMutatedUntracked } from "../../../../File";
import { SrcCodeNode } from "../../../../../../../../../../Rules/SrcCodeNode";

enum errors {
  non = "no n",
  noNodes = "no nodes",
  noValuesInArr = "no values in array",
  itsString = "it's a string",
}

const logs = {
  willUseTag: (tag: string) =>
    `i will use this tag: ${tag}`,
  willCreateFirst: `i will create the first file`,
};

const conditions = {
  typeOfN: (n: any) => typeof n[1] === "string",
};

export class FolderMutatedUntracked
  extends FolderMutated
  implements CommonFolderType, UntrackedFolder
{
  static errors = errors;
  static logs = logs;
  sort: "untracked" = "untracked";
  kind: "file" | "folder" = "folder";
  #getRuleFirstFile =
    (firstfile: string) =>
    (n: [string, SrcCodeNode] | undefined) => {
      if (!n) throw new Error(errors.non);
      const [_, node] = n;
      if (typeof node === "string")
        throw new Error(errors.itsString);
      firstfile = node.rule.firstFile;
    };
  stage(patches: { [k: string]: [string, string] }) {
    const children = this.children;
    const {
      srcCodeGraph,
      errors: { noNodes, noValuesInArr },
      logs,
    } = FolderMutatedUntracked;
    // test the value of the path of this node
    let res = srcCodeGraph.testPath(this.value.path);
    let nodes = res[0];
    let firstfile: string = "";
    // if there is no nodes throw error
    if (!nodes) throw new Error(noNodes);
    // if there is no node in the list throw
    if (!nodes.length) throw new Error(noValuesInArr);
    // look for node's rule, and retain the firstFile from
    // the last node in the list
    nodes.forEach(n => {
      if (!n) throw new Error(errors.non);
      const [_, node] = n;
      if (typeof node === "string")
        throw new Error(errors.itsString);
      firstfile = node.rule.firstFile;
    });
    // build the tag for the current path using the patches
    // set in the repo
    let tag = this.buildTag(patches);
    // logs the value of the tag
    console.log(logs.willUseTag(tag));
    // find first file node
    let result = children.find(
      c => c.value.name === firstfile
    );
    let firstfilenode: FolderMutatedUntracked =
      this.findByName(
        firstfile
      ) as unknown as FolderMutatedUntracked;
    console.log(result, firstfilenode);

    if (!firstfilenode) {
      // create first file
      console.log(logs.willCreateFirst);
    } else {
      console.log("first file", firstfilenode);

      firstfilenode.stage(patches);
    }

    // children.forEach(c => {
    //   if (c.kind === "file") {
    //     (c as FileMutatedUntracked).stage(patches);
    //   }
    // });
    // children.forEach(c => {
    //   if (c.kind === "folder") {
    //     (c as FolderMutatedUntracked).stage(patches);
    //   }
    // });

    // FolderMutatedUntracked.execSync(
    //   `git add ${this.value.path}`
    // );
    // this.setStaged();
    return undefined;
  }
}
