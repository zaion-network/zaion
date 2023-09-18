import { Entity } from "../../../Entity";
import { Graph } from "../../Graph.type";

export abstract class Tree extends Graph {
  abstract children: Entity[] | [Entity];
  abstract parents: [Entity];
  constructor() {
    super();
  }
  abstract addNode(): this;
}
