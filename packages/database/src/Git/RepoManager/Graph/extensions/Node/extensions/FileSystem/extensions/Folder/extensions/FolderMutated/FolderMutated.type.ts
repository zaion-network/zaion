import {
  CommonFolderType,
  Folder,
} from "../../Folder.type";
import { FolderValue } from "../../Folder.type";
import { FolderMutatedCommitted } from "../..";
import { FolderMutatedStaged } from "../..";
import { FolderMutatedUntracked } from "../..";
import { MutatedSorts } from "../../../../FileSystemNode.type";

export abstract class FolderMutated
  extends Folder
  implements CommonFolderType
{
  static sorts: typeof MutatedSorts = MutatedSorts;
  abstract sort: `${MutatedSorts}`;

  constructor(
    value: FolderValue,
    parent?:
      | FolderMutatedUntracked
      | FolderMutatedStaged
      | FolderMutatedCommitted
  ) {
    super("file", value, parent);
  }
  setUntracked() {
    this.sort = FolderMutated.sorts.untracked;
    return this;
  }
  setStaged() {
    this.sort = FolderMutated.sorts.staged;
    return this;
  }
  setCommitted() {
    this.sort = FolderMutated.sorts.committed;
    return this;
  }

  buildTag = this.buildTagFactory("main");
}
