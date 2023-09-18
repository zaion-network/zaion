import { FileMutated as FiM } from "../extensions/File";
import { FolderMutated as FoM } from "../extensions/Folder";

interface Committed {
  uncommit(): void;
}

export interface CommittedFile extends FiM, Committed {
  sort: "committed";
}

export interface CommittedFolder extends FoM, Committed {
  sort: "committed";
}
