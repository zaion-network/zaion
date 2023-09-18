import { FolderRule } from "../../FolderRule";

export class AppRule extends FolderRule {
  constructor() {
    super(AppRule.ruleSubType.app);
    this.firstFile = FolderRule.originFiles.readme;
  }
}
