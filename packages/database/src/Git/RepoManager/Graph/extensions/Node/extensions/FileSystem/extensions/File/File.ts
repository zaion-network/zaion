import { File as F } from "./File.type";
import { FileValue } from "./File.type";
import { Folder } from "../Folder/Folder.type";

export class File extends F {
  constructor(
    sort: "staged" | "untracked" | "committed",
    value: FileValue,
    parent?: Folder
  ) {
    super("folder", value, parent);
    this.sort = sort;
  }
  isApp() {
    return this.value.path.includes("apps/");
  }
}
