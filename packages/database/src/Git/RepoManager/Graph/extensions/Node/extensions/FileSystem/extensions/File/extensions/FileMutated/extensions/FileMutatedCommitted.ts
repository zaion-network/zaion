import { CommittedFile } from "../../../../../decorators/Committed.type";
import {
  CommonFileType,
  FileValue,
} from "../../../File.type";
import { FileMutated } from "../FileMutated.type";
import { FileSystemKinds } from "../../../../../FileSystemNode.type";
import { FolderMutatedCommitted } from "../../../../Folder";

export class FileMutatedCommitt
  extends FileMutated
  implements CommonFileType, CommittedFile
{
  kind: `${FileSystemKinds}` = "file";
  sort: (typeof FileMutated)["sorts"]["committed"] =
    FileMutated.sorts.committed;

  constructor(
    value: FileValue,
    parent?: FolderMutatedCommitted
  ) {
    super(value, parent);
  }

  uncommit() {
    if (this.sort === "committed") {
      FileMutatedCommitt.execSync(`git reset HEAD~1`);
      this, this.setUntracked();
      console.log(`resetted `);
    } else
      console.log("cannot uncommit not commited files");
  }
}
