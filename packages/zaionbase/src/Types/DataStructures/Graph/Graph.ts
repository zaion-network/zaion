// import { MixAbstract } from "../../../Mixin";
import { Edge } from "./Edge";
import { Node } from "./Node";

export abstract class Graph {
  abstract type: string;
  constructor(public name: string) { }
  abstract addNode(node: Node): this;
  abstract addEdge(edge: Edge): this;
}

abstract class AbstractGraph_v2<T, N> {
  abstract type: T;
  abstract nodes: N;
}

// interface IMappable {
//   nodes: Map<string, number>;
// }
// type Mappable = ComplexMixin<IMappable>;
// const Mappable: Mappable = ctor => {
//   return class extends ctor implements IMappable {
//     #nodes: Map<string, number> = new Map();
//     get nodes() {
//       return this.#nodes;
//     }
//   };
// };

// class Tee extends new MixAbstract(AbstractGraph_v2).with([
//   Mappable,
// ]) {
//   type: string = "tree";
// }
