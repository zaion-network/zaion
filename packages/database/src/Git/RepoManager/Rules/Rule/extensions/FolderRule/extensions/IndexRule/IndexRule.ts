import { FolderRule } from "../../FolderRule";

export class IndexRule extends FolderRule {
  constructor() {
    super(IndexRule.ruleSubType.index);
  }
}
