import { FileType, FileValue } from "../..";
import { FolderMutatedCommitted } from "../../../Folder";
import { FolderMutatedStaged } from "../../../Folder";
import { FolderMutatedUntracked } from "../../../Folder";
import { MutatedSorts } from "../../../../FileSystemNode.type";

export abstract class FileMutated extends FileType {
  static sorts: typeof MutatedSorts = MutatedSorts;
  abstract sort: `${MutatedSorts}`;

  constructor(
    value: FileValue,
    parent?:
      | FolderMutatedUntracked
      | FolderMutatedStaged
      | FolderMutatedCommitted
  ) {
    super("file", value, parent);
  }

  setUntracked() {
    this.sort = FileMutated.sorts.untracked;
    return this;
  }
  setStaged() {
    this.sort = FileMutated.sorts.staged;
    return this;
  }
  setCommitted() {
    this.sort = FileMutated.sorts.committed;
    return this;
  }
}
