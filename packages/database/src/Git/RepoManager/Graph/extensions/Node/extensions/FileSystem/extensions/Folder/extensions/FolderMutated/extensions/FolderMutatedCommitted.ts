import { CommittedFolder } from "../../../../../decorators/Committed.type";
import { CommonFolderType } from "../../../Folder.type";
import { FolderMutated } from "../FolderMutated.type";

export class FolderMutatedCommitted
  extends FolderMutated
  implements CommonFolderType, CommittedFolder
{
  sort: "committed" = "committed";
  kind: "file" | "folder" = "folder";
  uncommit() {
    if (this.sort === "committed") {
      FolderMutatedCommitted.execSync(`git reset HEAD~1`);
      this, this.setUntracked();
      console.log(`resetted `);
    } else
      console.log("cannot uncommit not commited files");
  }
}
