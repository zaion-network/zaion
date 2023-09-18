import { File } from "../../";
import type {
  filesSorts,
  filesSubSorts,
  sorts,
} from "../../../../../../";

export interface Test extends File {
  sort: (typeof filesSorts)["test"];
}
export class Test extends File {
  constructor(subSort: keyof typeof filesSubSorts) {
    super("test");
    this.subSort = Test.filesSubSorts[subSort];
  }
}
