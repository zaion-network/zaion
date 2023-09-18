import { filesSubSorts } from "../../../FolderContent";
import { Rule, ruleSubType } from "../../Rule.type";

export class FileRule extends Rule {
  type: typeof FileRule.ruleTypes.file =
    FileRule.ruleTypes.file;
  subType?: ruleSubType | undefined;
  kind?: filesSubSorts[] | undefined;
}
