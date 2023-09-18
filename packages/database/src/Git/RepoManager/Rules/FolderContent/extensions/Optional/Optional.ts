import { FolderContent } from "../../FolderContent";
import type { sorts } from "../../FolderContent";
import type { filesSorts } from "../../FolderContent";
import type { availabilities } from "../../FolderContent";
import type { filesSubSorts } from "../../FolderContent";
import type { configFilesTypes } from "../../FolderContent";
import type { quantities } from "../../FolderContent";

export interface Optional extends FolderContent {
  availability: (typeof availabilities)["optional"];
}
export class Optional extends FolderContent {
  constructor(
    sort:
      | sorts
      | filesSubSorts
      | configFilesTypes
      | filesSorts,
    quantity: keyof typeof quantities,
    isIgnored: boolean
  ) {
    super(
      sort,
      Optional.quantities[quantity],
      isIgnored,
      Optional.availabilities.optional
    );
  }
}
