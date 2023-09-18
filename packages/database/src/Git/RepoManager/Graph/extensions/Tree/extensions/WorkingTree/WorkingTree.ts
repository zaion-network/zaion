import { Entity } from "../../../../../Entity";
import { Tree } from "../../Tree.type";

export abstract class WorkingTree extends Tree {
  constructor(
    public children: Entity[] | [Entity],
    public parents: [Entity]
  ) {
    super();
  }
  addNode(): this {
    this.children.push();
    return this;
  }
}
