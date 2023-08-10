import { Types } from "../../Types";
import { IGraph, GraphArguments } from "../IGraph";
import { INode } from "./INode";

export interface IListGraph extends IGraph {
  nodes: INode[];
  add(node: INode): IListGraph;
  isRoot?(node: INode["key"]): boolean;
  hasChildren?(node: INode["key"]): boolean;
  traverse?(type: "bfs" | "dfs"): string[];
}

export type IListGraphConstructor = Types.Class.GCtor3<
  GraphArguments,
  IListGraph
>;
