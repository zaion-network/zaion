import { Types } from "../../Types";
import { Edge } from "./Edge";

enum NodeMethods {
  createId = "create-id",
}
type NodeMethodsUnion = keyof typeof NodeMethods;

export interface BasicNode<T> {
  type: string;
  value: T;
}

export abstract class BasicNode<T> implements BasicNode<T> {
  value: T;
  constructor(p: T) {
    this.value = p;
  }
}

export abstract class Node {
  #methods: Map<unknown, Types.Class.Strategy> = new Map();
  get methods() {
    return this.#methods;
  }
  id: unknown;
  abstract type: string;
  abstract value: unknown;
  constructor() {
    this.id = this.#methods.get("create-id")?.method();
  }
  abstract addEdge(edge: Edge): this;
  addStrategy(strategy: Types.Class.Strategy) {
    this.#methods.set(strategy.name, strategy);
  }
  assignStrategy(
    strategy: NodeMethodsUnion,
    newStrategy: Types.Class.Strategy
  ) {
    this.#methods.set(strategy, newStrategy);
  }
}
