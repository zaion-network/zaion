import { Types } from "../../Types";
import { IGraph } from "../IGraph";
import { INode, NodesKeys } from "./INode";

export type AdjacencyMatrix = (0 | 1)[][];

export type NodeIndexes = { [key: INode["key"]]: number };

export type addNodeType = (this: IMatrixGraph, node: INode["key"]) => IGraph;

export type findAdjacentNodesType = (
  this: IMatrixGraph,
  node: INode["key"]
) => INode["key"][];

export type isConnectedType = (
  this: IMatrixGraph,
  nodeA: INode["key"],
  nodeB: INode["key"]
) => boolean;

export type connectNodes = (
  this: IMatrixGraph,
  nodeA: INode["key"],
  nodeB: INode["key"]
) => INode["key"][];

export type MatrixGraphArgs = {
  nodes: NodesKeys;
  adjacencyMatrix: AdjacencyMatrix;
  nodeIndexes: NodeIndexes;
};

export interface IMatrixGraph extends IGraph {
  nodes: NodesKeys;
  adjacencyMatrix: AdjacencyMatrix;
  nodeIndexes: NodeIndexes;
  findAdjacentNodes: findAdjacentNodesType;
  isConnected: isConnectedType;
  addNode?: addNodeType;
  connectNodes?: connectNodes;
}

export type MatrixGraphCtor = Types.Class.GCtor3<MatrixGraphArgs, IMatrixGraph>;
