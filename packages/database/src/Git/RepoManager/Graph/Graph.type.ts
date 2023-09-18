import { Edge } from "../Edge/Edge.type";
import { Entity } from "../Entity";
import { Node } from "./extensions/Node/Node.type";

export abstract class Graph extends Entity {
  abstract nodes: Map<string, Node>;
  abstract edges: Map<string, Edge>;
}

export abstract class Graphfactory {
  constructor() {}
  abstract create(): Graph;
}
