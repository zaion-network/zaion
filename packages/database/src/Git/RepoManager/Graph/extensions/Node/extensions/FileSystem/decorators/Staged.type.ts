import { FileMutated as FiM } from "../extensions/File";
import { FolderMutated as FoM } from "../extensions/Folder";

interface Staged {
  unstage(): void;
  createCommitMessage(message: string): string;
  commit(message: string): void;
}

export interface StagedFile extends FiM, Staged {
  sort: "staged";
}

export interface StagedFolder extends FoM, Staged {
  sort: "staged";
}
