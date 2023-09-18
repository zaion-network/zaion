

import { DataStructure, Types, Graph } from "@zaionstate/zaionbase"

export interface Node<T> extends Graph.BasicNode<T> { }
class BasicNode<T> implements Graph.BasicNode<T> {
  type: string;
  value: T;
  constructor(type: string, value: T) {
    this.type = type
    this.value = value
  }
}

export abstract class Node<T> extends BasicNode<T> { }
