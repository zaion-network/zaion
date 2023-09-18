import { Commit as CommitType } from "./Commit.type";
import { FileSystemKinds } from "../FileSystem/FileSystemNode.type";
import { CommitValue } from "../../../../../../Types/Commit.type";

export class Commit extends CommitType {
  constructor(
    kind: `${FileSystemKinds}`,
    value: CommitValue,
    parent?: Commit | null
  ) {
    super(kind, value);
    if (parent)
      this.edges.get("parents")?.value.set(this, parent);
  }
}
