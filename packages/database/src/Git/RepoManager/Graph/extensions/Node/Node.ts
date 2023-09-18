import { FileOptions } from "./Node.type";
import { Types } from "./Node.type";
import { UntrackedFileOptions } from "./Node.type";
import { UntrackedFolderOptions } from "./Node.type";
import { FolderOptions } from "./Node.type";
import { Options } from "./Node.type";
import { FileSystemKinds } from "./extensions/FileSystem/FileSystemNode.type";
import { FileSystemNode } from "./extensions/FileSystem/FileSystemNode.type";
import { File } from "./extensions/FileSystem/extensions/File/File";
import { Folder } from "./extensions/FileSystem/extensions/Folder";
import { FileValue } from "./extensions/FileSystem/extensions/File/File.type";
import { UntrackedFile } from "./extensions/FileSystem/decorators/Untracked.type";
import { UntrackedFolder } from "./extensions/FileSystem/decorators/Untracked.type";
import { BranchKinds } from "./extensions/Branch/Branch.type";
import { MutatedSorts } from "./extensions/FileSystem/FileSystemNode.type";
import { FolderMutatedUntracked } from "./extensions/FileSystem/extensions/Folder";
import { FolderMutatedStaged } from "./extensions/FileSystem/extensions/Folder";
import { FolderMutatedCommitted } from "./extensions/FileSystem/extensions/Folder";
import { FileMutatedUntracked } from "./extensions/FileSystem/extensions/File";
import { FileMutatedStaged } from "./extensions/FileSystem/extensions/File";
import { FileMutatedCommitt } from "./extensions/FileSystem/extensions/File";

export class Node {
  static types = Types;
  static kinds = {
    filesystem: FileSystemKinds,
    branch: BranchKinds,
  };
  static sorts = {
    mutated: MutatedSorts,
  };
  create(
    value: FileValue,
    parent?: FolderMutatedUntracked,
    options?: UntrackedFolderOptions
  ): FolderMutatedUntracked;
  create(
    value: FileValue,
    parent?: FolderMutatedUntracked,
    options?: UntrackedFileOptions
  ): UntrackedFile;
  create(
    value: FileValue,
    parent?: FileSystemNode,
    options?: FolderOptions
  ): Folder;
  create(
    value: FileValue,
    parent?: FileSystemNode,
    options?: FileOptions
  ): File;
  create(
    value: any,
    parent?: FileSystemNode,
    options?: Options
  ): FileSystemNode {
    if (options) {
      const { kind, sort } = options;
      const args = { value, parent };
      if (kind === "file") {
        let file:
          | FileMutatedUntracked
          | FileMutatedStaged
          | FileMutatedCommitt;
        if (sort === "untracked")
          file = new FileMutatedUntracked(
            value,
            parent as FolderMutatedUntracked | undefined
          );
        else if (sort === "staged")
          file = new FileMutatedStaged(
            value,
            parent as FolderMutatedStaged | undefined
          );
        else
          file = new FileMutatedCommitt(
            value,
            parent as FolderMutatedCommitted | undefined
          );
        return file;
      } else {
        if (sort === "untracked")
          return new FolderMutatedUntracked(
            value,
            parent as FolderMutatedUntracked | undefined
          );
        else if (sort === "staged")
          return new FolderMutatedStaged(
            value,
            parent as FolderMutatedStaged | undefined
          );
        else
          return new FolderMutatedCommitted(
            value,
            parent as FolderMutatedStaged | undefined
          );
      }
    } else
      return new File(
        "untracked",
        value,
        parent as Folder
      );
  }
}
