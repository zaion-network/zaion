import { Entity } from "../../../../../Entity";
import { Tree } from "../../Tree.type";

export abstract class BlockTree extends Tree {
  constructor(
    public children: Entity[],
    public parents: [Entity]
  ) {
    super();
  }
  addNode(): this {
    this.children.push();
    return this;
  }
}
