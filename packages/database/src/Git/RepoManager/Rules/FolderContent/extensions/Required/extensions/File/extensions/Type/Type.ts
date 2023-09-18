import { File } from "../../File";
import type {
  filesSorts,
  filesSubSorts,
  sorts,
} from "../../../../../../";

export interface Type extends File {
  sort: (typeof filesSorts)["type"];
}
export class Type extends File {
  constructor(subSort: keyof typeof filesSubSorts) {
    super("type", "apps");
    this.subSort = Type.filesSubSorts[subSort];
  }
}
