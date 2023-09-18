import { SrcFolderRule } from "../../SrcFolder";
import { FolderContent } from "../../../../../../../FolderContent";
import type { genres } from "../../../../../../../FolderContent";

export interface EntrypointSrcFolderRule
  extends SrcFolderRule {}
export class EntrypointSrcFolderRule extends SrcFolderRule {
  constructor(subCategory: genres) {
    super(
      SrcFolderRule.FolderContent.subCategories
        .entrypoint_src
    );
    this.genre = subCategory;
  }
}
