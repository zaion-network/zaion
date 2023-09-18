import { FileSystemNode as FileSystemNodeType } from "../../FileSystemNode.type";
import { Folder as F } from "./Folder.type";
import { FolderValue } from "./Folder.type";

export class Folder
  extends F
  implements FileSystemNodeType
{
  constructor(
    sort: "staged" | "untracked" | "committed",
    value: FolderValue,
    parent?: Folder
  ) {
    super("folder", value, parent);
    this.sort = sort;
  }
}
