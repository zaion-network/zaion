import { FolderContent } from "../../FolderContent";
import type { sorts } from "../../FolderContent";
import type { filesSorts } from "../../FolderContent";
import type { configFilesTypes } from "../../FolderContent";

export interface Required extends FolderContent {
  availability: (typeof FolderContent.availabilities)["required"];
}
export class Required extends FolderContent {
  constructor(
    sort: sorts | configFilesTypes | filesSorts,
    isIgnored: boolean
  ) {
    super(
      sort,
      FolderContent.quantities.one,
      isIgnored,
      FolderContent.availabilities.required
    );
  }
}
