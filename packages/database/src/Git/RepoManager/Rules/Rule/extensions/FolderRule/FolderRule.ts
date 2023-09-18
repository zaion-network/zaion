import { filesSubSorts } from "../../../FolderContent";
import { Rule, ruleSubType } from "../../Rule.type";

const { ruleTypes } = Rule;

export interface FolderRule extends Rule {}
export class FolderRule extends Rule {
  type: typeof ruleTypes.folder = ruleTypes.folder;
  subType?: ruleSubType;
  kind?: filesSubSorts[] | undefined;
  constructor(subType: Rule["subType"]) {
    super();
    this.subType = subType;
  }
}
