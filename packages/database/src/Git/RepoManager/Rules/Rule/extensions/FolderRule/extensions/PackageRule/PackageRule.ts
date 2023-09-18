import { FolderRule } from "../../FolderRule";

export class PackageRule extends FolderRule {
  constructor() {
    super(PackageRule.ruleSubType.package);
    this.firstFile = PackageRule.originFiles.readme;
  }
}
