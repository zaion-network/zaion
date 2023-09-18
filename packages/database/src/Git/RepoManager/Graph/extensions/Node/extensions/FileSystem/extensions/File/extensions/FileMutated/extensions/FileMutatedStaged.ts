import {
  CommonFileType,
  FileValue,
} from "../../../File.type";
import { FileMutated } from "../FileMutated.type";
import { FileSystemKinds } from "../../../../../FileSystemNode.type";
import { FolderMutatedStaged } from "../../../../Folder";
import { StagedFile } from "../../../../../decorators/Staged.type";

export class FileMutatedStaged
  extends FileMutated
  implements CommonFileType, StagedFile
{
  kind: `${FileSystemKinds}` = "file";
  sort: (typeof FileMutated)["sorts"]["staged"] =
    FileMutated.sorts.staged;

  constructor(
    value: FileValue,
    parent?: FolderMutatedStaged
  ) {
    super(value, parent);
  }

  commit(message: string) {
    if (!(this.sort === "staged")) {
      console.log("can only commit staged files");
    } else {
      let commitmessage =
        this.createCommitMessage(message);
      FileMutatedStaged.execSync(
        `git commit ${this.value.path} -m '${commitmessage}'`
      );
      this.setCommitted();
      console.log(`commited file: ${this.value.path}`);
    }
  }

  createCommitMessage(message: string) {
    if (message) return message;
    else return "default message";
  }

  unstage() {
    if (this.sort === "staged") {
      FileMutatedStaged.execSync(
        `git reset ${this.value.path}`
      );
      this.setUntracked();
      console.log(`unstaged file: ${this.value.path}`);
    } else console.log("can't unstage a not staged file");
  }
}
