import {
  CommonFileType,
  FileValue,
} from "../../../File.type";
import { FileMutated } from "../FileMutated.type";
import { FileSystemKinds } from "../../../../../FileSystemNode.type";
import { FolderMutatedUntracked } from "../../../../Folder";
import { UntrackedFile } from "../../../../../decorators/Untracked.type";

export class FileMutatedUntracked
  extends FileMutated
  implements CommonFileType, UntrackedFile
{
  kind: `${FileSystemKinds}` = "file";
  sort: (typeof FileMutated)["sorts"]["untracked"] =
    FileMutated.sorts.untracked;

  constructor(
    value: FileValue,
    parent?: FolderMutatedUntracked
  ) {
    super(value, parent);
  }

  stage(patches: { [k: string]: [string, string] }) {
    // FileMutatedUntracked.execSync(
    //   `git add ${this.value.path}`
    // );
    // this.setStaged();
    let tag = this.#buildTag(patches);
    console.log(`i will use this tag: ${tag}`);
    console.log(`i will check if this tag exists: ${tag}`);
    console.log(`staged file: ${this.value.path}`);
    return undefined;
  }
  #buildTag = this.buildTagFactory("0.0.1");
}
