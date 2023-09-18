import {
  BlockChild,
  BlockParent,
} from "../../../../../Edge/Edge";
import {
  Edge,
  Types as EdgeTypes,
} from "../../../../../Edge/Edge.type";
import { Node } from "../../Node.type";

enum Types {
  commit = "commit",
}

export abstract class BlockNode extends Node {
  nodes: Map<string, Node>;
  sort: `${Types}`;
  edges: Map<
    | (typeof EdgeTypes)["blockParent"]
    | (typeof EdgeTypes)["blockChild"],
    Edge
  >;
  get parent(): BlockNode {
    const E_ERR = "no block-parent edge";
    let edge = this.edges.get(EdgeTypes.blockParent);
    if (!(edge instanceof BlockParent))
      throw new Error(E_ERR);
    let parent = edge.value.get(this);
    if (!parent) return this;
    return parent;
  }
  get child() {
    const E_ERR = "no block-child edge";
    let edge = this.edges.get(EdgeTypes.blockChild);
    if (!(edge instanceof BlockChild))
      throw new Error(E_ERR);
    let child = edge.value.get(this);
    if (!child) return;
    return child;
  }
  set child(child: BlockNode | undefined) {
    const E_ERR = "no block-child edge";
    const A_ERR =
      "no argument passed, please provide a child";
    let edge = this.edges.get(EdgeTypes.blockChild);
    if (!edge) throw new Error(E_ERR);
    let _child = edge.value.get(this);
    if (_child) return;
    if (!child) throw new Error(A_ERR);
    edge.value.set(this, child);
  }
  constructor(
    sort: `${Types}`,
    value: any,
    parent?: BlockNode
  ) {
    super("block", value);
    this.sort = sort;
    let blockchildedge = new BlockChild(
      new Map<BlockNode, BlockNode>()
    );
    let blockparentedge = new BlockParent(
      new Map<BlockNode, BlockNode>()
    );
    if (parent) {
      blockparentedge.value.set(this, parent);
      parent.child = this;
    }
    this.edges = new Map();
    this.edges.set(blockchildedge.type, blockchildedge);
    this.edges.set(blockparentedge.type, blockparentedge);
    this.nodes = new Map<string, Node>();
  }
  isRoot() {
    if (!this.parent) return true;
    else false;
  }
}
