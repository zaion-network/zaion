import { FolderRule } from "../../FolderRule";

export class Module extends FolderRule {
  constructor() {
    super(Module.ruleSubType.module);
  }
}
