import { FolderRule } from "../../FolderRule";
import { FolderContent } from "../../../../../FolderContent";
import type { subCategories } from "../../../../../FolderContent";

const { ruleSubType } = FolderRule;

export interface SrcFolderRule extends FolderRule {}
export class SrcFolderRule extends FolderRule {
  constructor(category: subCategories) {
    super(FolderRule.ruleSubType.index);
    this.sort = FolderContent.sorts.packages;
    this.firstFile = FolderContent.originFiles.noiz;
    this.subCategory = category;
  }
}
