import { File } from "../../";
import type { filesSorts } from "../../../../../../";
import type { filesSubSorts } from "../../../../../../";

export interface Module extends File {
  catagory: (typeof filesSorts)["module"];
}
export class Module extends File {
  constructor(subcategory: keyof typeof filesSubSorts) {
    super("module");
    this.subSort = Module.filesSubSorts[subcategory];
  }
}
