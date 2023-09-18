import { execSync } from "../../../../../../lib/execSync";
import { Commit } from "../Commit/Commit";
import { Node } from "../../Node.type";

export abstract class Tag extends Node {
  constructor(value: any, parent?: Commit) {
    super("tag", value);
  }
}
