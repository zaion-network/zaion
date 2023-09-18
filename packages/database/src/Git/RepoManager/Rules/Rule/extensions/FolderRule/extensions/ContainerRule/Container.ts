import { FolderRule } from "../../FolderRule";

export class Container extends FolderRule {
  constructor() {
    super(Container.ruleSubType.container);
  }
}
