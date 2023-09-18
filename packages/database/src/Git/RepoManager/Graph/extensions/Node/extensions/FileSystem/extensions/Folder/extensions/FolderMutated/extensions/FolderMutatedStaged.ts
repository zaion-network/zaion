import { CommonFolderType } from "../../../Folder.type";
import { FolderMutated } from "../FolderMutated.type";
import { StagedFolder } from "../../../../../decorators/Staged.type";

export class FolderMutatedStaged
  extends FolderMutated
  implements CommonFolderType, StagedFolder
{
  sort: "staged" = "staged";
  commit(message: string) {
    // let commitmessage =
    //   this.createCommitMessage(message);
    // FolderMutated.execSync(
    //   `git commit ${this.value.path} -m '${commitmessage}'`
    // );
    // this.setCommitted();
    console.log(`commited file: ${this.value.path}`);
  }

  createCommitMessage(message: string) {
    if (message) return message;
    else return "default message";
  }

  unstage() {
    if (this.sort === "staged") {
      FolderMutatedStaged.execSync(
        `git reset ${this.value.path}`
      );
      this.setUntracked();
      console.log(`unstaged file: ${this.value.path}`);
    } else console.log("can't unstage a not staged file");
  }
}
