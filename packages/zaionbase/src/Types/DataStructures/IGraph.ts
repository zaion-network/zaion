import { INode, NodesKeys } from "./Graph";

export type GraphArguments = { nodes: INode[] };

export interface IGraph {
  nodes: INode[] | NodesKeys;
}
