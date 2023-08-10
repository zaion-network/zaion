export interface INode {
  key: string;
  edges?: INode["key"][] | (1 | 0)[];
  connect?(node: INode["key"]): INode;
  findAdjacentNodes?(node: INode["key"]): INode["key"][];
  isConnected(node: INode["key"]): boolean;
}

export type NodesKeys = INode["key"][];
