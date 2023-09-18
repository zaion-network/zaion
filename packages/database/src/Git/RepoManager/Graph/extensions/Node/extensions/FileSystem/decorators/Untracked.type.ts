import { FileValue } from "../extensions/File/File.type";
import { FileMutated as FiM } from "../extensions/File";
import { FolderMutated as FoM } from "../extensions/Folder";

interface UntrackedFileValue extends FileValue {
  //
}

interface Untracked {
  stage(patches: {
    [k: string]: [string, string];
  }): undefined;
}

export interface UntrackedFile extends FiM, Untracked {
  sort: "untracked";
}

export interface UntrackedFolder extends FoM, Untracked {
  sort: "untracked";
}
