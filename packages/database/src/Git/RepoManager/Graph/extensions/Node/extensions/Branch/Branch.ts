import {
  Branch as BranchType,
  BranchKinds,
} from "./Branch.type";
import { BranchValue } from "../../../../../../Types/Branch.type";

export class Branch extends BranchType {
  sort: string;
  constructor(
    kind: `${BranchKinds}`,
    value: BranchValue
    // head: Commit
  ) {
    super(kind, value); //, head);
    this.sort = "default";
  }
}
