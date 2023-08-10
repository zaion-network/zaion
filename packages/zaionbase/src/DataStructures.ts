import {
  addNodeType,
  findAdjacentNodesType,
  isConnectedType,
} from "./Types/DataStructures/Graph/IMatrixGraph";
import { INode } from "./Types/DataStructures/Graph/INode";

declare module "./DataStructures" {
  export namespace DataStructures {
    export interface Tuple<T extends any[], V> {
      arr: T;
    }
    export namespace Tuple {
      export type AddToTuple<T extends any[], U> = [...T, U];
      type Tuple<T extends unknown[]> = [...T];

      type TupleRedux = <T extends any[], C, R>(
        tuple: T,
        callback: (
          accumulator: C,
          current: T[number],
          index: number,
          tuple: T | undefined
        ) => R,
        initialValue: C
      ) => R;
    }
  }
}

export class DataStructures {}
export namespace DataStructures {
  type foo = <T extends any[], U>(arr: T, value: U) => Tuple.AddToTuple<T, U>;
  const foo: foo = (arr, value) => [...arr, value];

  export class Tuple2<V, T extends any[] = [V]> {
    arr: T;
    constructor(value: V) {
      this.arr = [value] as T;
    }
    push<A>(
      this: Tuple2<any, T> | Tuple2<any, Tuple.AddToTuple<T, A>>,
      value: A
    ) {
      this.arr = foo((this as Tuple2<any, T>).arr, value);
      return this as Tuple2<any, Tuple.AddToTuple<T, A>>;
    }
    tupleReduce = <C, R>(
      callback: (
        accumulator: C,
        current: T[number],
        index: number,
        tuple?: T
      ) => R,
      initialValue: C
    ): R => Tuple.tupleReduce<T, C, R>(this.arr, callback, initialValue);
  }
  export class Tuple<T extends any[], V extends [...T] = [...T]>
    implements Tuple<T>
  {
    value: V;
    constructor(public arr: T) {
      this.value = [...arr] as V;
    }

    add<U>(e: U): Tuple<Tuple.AddToTuple<T, U>> {
      return new Tuple<Tuple.AddToTuple<T, U>>([...this.arr, e]) as Tuple<
        Tuple.AddToTuple<T, U>
      >;
    }

    tupleReduce = <C, R>(
      callback: (
        accumulator: C,
        current: T[number],
        index: number,
        tuple?: T
      ) => R,
      initialValue: C
    ): R => Tuple.tupleReduce<T, C, R>(this.arr, callback, initialValue);
  }
  export namespace Tuple {
    export const tupleReduce: TupleRedux = <T extends any[], C, R>(
      tuple: T,
      callback: (
        accumulator: C,
        current: T[number],
        index: number,
        tuple?: T
      ) => R,
      initialValue: C
    ): R => {
      const reduceHelper = (index: number, accumulator: R | C): R => {
        if (index >= tuple.length) {
          return accumulator as R;
        }
        const current = tuple[index];
        const updatedAccumulator = callback(accumulator as C, current, index);
        return reduceHelper(index + 1, updatedAccumulator);
      };

      return reduceHelper(0, initialValue);
    };
  }

  export namespace Graph {
    export enum types {
      list = "list",
      matrix = "matrix",
    }
    export namespace Tree {}
    export namespace DAG {}

    export namespace Zionbase {
      export namespace DataStructure {
        export namespace Graph_v1 {
          type EncodedId = string;

          export interface IGraph {
            name: EncodedId;
            nodes: EncodedId[];
          }

          export type GraphProps = {
            name: EncodedId;
            nodes: EncodedId[];
          };

          export interface Graph {
            name: EncodedId;
            nodes: EncodedId[];
          }

          export class Graph implements IGraph {
            constructor(props: GraphProps) {
              this.name = props.name;
              this.nodes = props.nodes;
            }
          }

          export type Graph_v1Ctor = {
            new (props: GraphProps): Graph;
          };

          export const Graph_v1Ctor: Graph_v1Ctor = Graph;
        }
        export namespace Graph_v2 {
          type EncodedId = string;

          interface Node<T = number> {
            id: T;
          }

          export interface IGraph_v2 {
            id: EncodedId;
            nodes: Node[];
          }

          export type Graph_v2Props = {
            id: EncodedId;
            nodes: Node[];
          };

          export interface Graph_v2 {
            id: EncodedId;
            nodes: Node[];
          }

          export class Graph_v2 implements IGraph_v2 {
            constructor(props: Graph_v2Props) {
              this.id = props.id;
              this.nodes = props.nodes;
            }
          }

          export type Graph_v2Ctor = {
            new (props: Graph_v2Props): Graph_v2;
          };

          export const Graph_v2Ctor: Graph_v2Ctor = Graph_v2;
        }
        export namespace Graph_v3 {
          // TODO capire come integrare diversi tipi di id
          // type EncodedId = string;

          interface Node<NodeId = number, V = {}> {
            id: NodeId;
            value: V;
            children: Node["id"][] | Node[];
          }

          interface Id_v3<Id> {
            id: Id;
          }

          export interface ObjGraphProps<
            Id,
            NodeId extends string | number | symbol,
            N extends Node<NodeId, V>,
            V
          > extends Id_v3<Id> {
            type: "object";
            nodes: { [props in NodeId]: N };
          }

          export interface ArrayGraphProps<
            Id,
            NodeId,
            N extends Node<NodeId, V>,
            V
          > extends Id_v3<Id> {
            type: "array";
            nodes: N[];
          }

          export interface MapGraphProps<
            Id,
            NodeId,
            N extends Node<NodeId, V>,
            V
          > extends Id_v3<Id> {
            type: "map";
            nodes: Map<NodeId, N>;
          }

          export type FluidGraph<
            Id,
            NodeId extends string | number | symbol,
            N extends Node<NodeId, Value>,
            Value
          > =
            | ArrayGraphProps<Id, NodeId, N, Value>
            | MapGraphProps<Id, NodeId, N, Value>
            | ObjGraphProps<Id, NodeId, N, Value>;

          export type IGraph_v3<
            Id,
            NodeId extends string | number | symbol,
            N extends Node<NodeId, Value>,
            Value
          > = {
            id: Id;
            type: "map" | "array" | "object";
            nodes: { [props in NodeId]: N } | N[] | Map<NodeId, N>;
          };

          export interface Graph_v3<Id, NodeId, N, Value> {
            id: Id;
            type: "map" | "array" | "object";
            nodes: { [props in NodeId]: N } | N[] | Map<NodeId, N>;
          }

          export class Graph_v3<
            Id,
            NodeId extends string | number | symbol,
            N extends Node<NodeId, Value>,
            Value
          > implements IGraph_v3<Id, NodeId, N, Value>
          {
            bfs;
            dfs;
            constructor(props: FluidGraph<Id, NodeId, N, Value>) {
              const self = this;
              this.id = props.id;
              this.type = props.type;
              this.nodes = props.nodes;
              // @ts-expect-error
              if (DataStructures.Array.isArray(this.nodes)) {
                // @ts-expect-error
                const curr = this.nodes[0];
                if (!curr) throw new Error("no nodes");
                // @ts-expect-error
                const bfs = new Algo({
                  type: "bfs",
                  // @ts-expect-error
                  curr: curr as BasicNode<NodeId, Value>,
                  graph: self as FluidGraph<
                    Id,
                    NodeId,
                    // @ts-expect-error
                    BasicNode<NodeId, Value>,
                    Value
                  >,
                  processors: [],
                  // @ts-expect-error
                  queue: [curr as BasicNode<NodeId, Value>],
                });
                this.bfs = bfs;
                // @ts-expect-error
                const dfs = new Algo({
                  type: "dfs",
                  // @ts-expect-error
                  curr: curr as BasicNode<NodeId, Value>,
                  graph: self as FluidGraph<
                    Id,
                    NodeId,
                    // @ts-expect-error
                    BasicNode<NodeId, Value>,
                    Value
                  >,
                  processors: [],
                  // @ts-expect-error
                  stack: [curr as BasicNode<NodeId, Value>],
                });
                this.dfs = dfs;
              }
            }
          }

          export type ArrayGraph_v3Ctor<
            Id = string,
            NodeId extends string | number | symbol = string,
            Value = string,
            N extends Node<NodeId, Value> = Node<NodeId, Value>
          > = {
            new (props: ArrayGraphProps<Id, NodeId, N, Value>): Graph_v3<
              Id,
              NodeId,
              N,
              Value
            >;
          };

          export const ArrayGraph_v3Ctor: ArrayGraph_v3Ctor = Graph_v3;
        }

        export namespace Node {
          export namespace Node_v1 {
            type EncodedId = string;

            type basicProps<T = unknown> = { node: EncodedId } & T;
            type connectType<T> = (props: basicProps) => T;

            type isConnectedType = (props: basicProps) => boolean;

            type findAdjacentNodes = () => EncodedId[];

            export interface INode_v1 {
              name: EncodedId;
              edges: EncodedId[];
              connect: connectType<this>;
              isConnected: isConnectedType;
              findAdjacentNodes: findAdjacentNodes;
            }

            export interface Node_v1 {
              name: EncodedId;
              edges: EncodedId[];
            }

            export interface Node_v1Props {
              name: EncodedId;
            }

            export class Node_v1 implements INode_v1 {
              constructor(props: Node_v1Props) {
                this.name = props.name;
                this.edges = [];
              }
              connect(props: basicProps) {
                const { node } = props;
                this.edges.push(node);
                return this;
              }
              isConnected(props: basicProps) {
                return this.edges.some(edge => edge === props.node)
                  ? true
                  : false;
              }
              findAdjacentNodes() {
                return this.edges;
              }
            }

            export type Node_v1Ctor = {
              new (props: Node_v1Props): Node_v1;
            };

            export const Node_v1Ctor: Node_v1Ctor = Node_v1;
          }

          export namespace Node_v2 {
            // type EncodedId = string;

            // type basicProps<T = unknown> = { node: EncodedId } & T;

            // type findAdjacentNodes = () => EncodedId[];

            enum nodeTypes {
              array_ids = "array_ids",
              array_nodes = "array_nodes",
              map = "map",
              object = "object",
            }

            type nodeTypeTypes = keyof typeof nodeTypes;

            export interface ArrayNodeIdsProps<
              I extends string | number | symbol = number,
              V = unknown
            > {
              type: nodeTypes.array_ids;
              id: I;
              children: number[];
              value: V;
            }

            export interface ArrayNodesProps<
              I extends string | number | symbol = number,
              V = unknown
            > {
              type: nodeTypes.array_nodes;
              id: I;
              children: ArrayNodeIdsProps<I>[];
              value: V;
            }

            export interface MapNodeProps<
              I extends string | number | symbol = number,
              V = unknown
            > {
              type: nodeTypes.map;
              id: I;
              children: Map<I, MapNodeProps<I>>;
              value: V;
            }

            export interface ObjectNodeProps<
              I extends string | number | symbol = number,
              V = unknown
            > {
              type: nodeTypes.object;
              id: I;
              children: { [props in I]: ObjectNodeProps<I> };
              value: V;
            }
            export type Node_v2Props<
              Id extends string | number | symbol,
              V = unknown
            > =
              | ObjectNodeProps<Id, V>
              | ArrayNodeIdsProps<Id, V>
              | ArrayNodesProps<Id, V>
              | MapNodeProps<Id, V>;

            export interface INode_v2<
              T extends nodeTypeTypes,
              Id extends string | number | symbol,
              V
            > {
              type: T;
              id: Id;
              children:
                | ArrayNodeIdsProps["id"][]
                | { [props in Id]: ObjectNodeProps<Id> }
                | Map<Id, MapNodeProps<Id>>;
              value: V;
              addChild: (n: number) => this;
              hasChild: (n: number) => boolean;
              hasChildren: () => boolean;
              findAdjacentNodes: () => Id[];
            }

            export interface Node_v2<T extends nodeTypeTypes, Id, V> {
              type: T;
              id: Id;
              children:
                | ArrayNodeIdsProps["id"][]
                | { [props in Id]: ObjectNodeProps<Id> }
                | Map<Id, MapNodeProps<Id>>;
              value: V;
            }

            export class Node_v2<
              T extends nodeTypeTypes,
              Id extends string | number | symbol,
              V
            > implements INode_v2<T, Id, V>
            {
              static nodeTypes = nodeTypes;
              #NOT_IMPLEMENTED = "not yet implemented";
              constructor(props: ArrayNodeIdsProps<Id>);
              constructor(props: ObjectNodeProps<Id>);
              constructor(props: MapNodeProps<Id>);
              constructor(props: Node_v2Props<Id>) {
                switch (props.type) {
                  case "array_ids":
                    this.children = props.children as number[];
                    this.id = props.id;
                    this.value = props.value as V;
                    break;
                  case "array_nodes":
                    throw new Error(this.#NOT_IMPLEMENTED);
                  case "map":
                    throw new Error(this.#NOT_IMPLEMENTED);
                  case "object":
                    throw new Error(this.#NOT_IMPLEMENTED);

                  default:
                    this.children = props.children as number[];
                    this.id = props.id;
                    this.value = props.value as V;
                    break;
                }
              }
              addChild(n: number) {
                if (Array.isArray(this.children))
                  this.children.push(n as number);
                else throw new Error("not yet implemented");
                return this;
              }
              hasChild(n: number) {
                if (Array.isArray(this.children))
                  return this.children.some(edge => edge === n) ? true : false;
                else throw new Error("not yet implemented");
              }
              findAdjacentNodes() {
                if (Array.isArray(this.children)) return this.children as Id[];
                else throw new Error("not yet implemented");
              }
              hasChildren: () => boolean = () => {
                if (Array.isArray(this.children))
                  return this.children.length > 0;
                else throw new Error("not yet implemented");
              };
            }

            export type Node_v2Ctor<
              T extends nodeTypeTypes = nodeTypes.array_ids,
              Id extends string | number | symbol = string,
              V = unknown
            > = {
              new (props: ArrayNodeIdsProps<Id>): Node_v2<T, Id, V>;
            };

            export const Node_v2Ctor: Node_v2Ctor = Node_v2;
          }
        }

        export namespace Tree {
          export namespace Tree_v1 {
            enum TreeNodeTypes {
              root,
              file,
              folder,
            }

            export namespace TreeNodeTs {
              export type RequiredFields = {
                name: string;
                path: string;
                typeNumber: number;
                treeId: unknown;
              };
              export type OptionalFields = {
                genitore?: TreeNode[];
                figlio?: TreeNode[];
                depth?: number;
                children?: TreeNode[];
                root?: boolean;
                type?: string;
                id?: number;
              };
            }

            export interface TreeNode {
              name?: string;
              path?: string;
              typeNumber?: number | TreeNodeTypes;
              treeId?: unknown;
              depth?: number;
              genitore?: TreeNode[];
              figlio?: TreeNode[];
              root: true | false;
              type?: string;
              id?: number;
              stringedDir?: string | undefined;
              _isLastChild?: boolean;
              toStringedTree(): string;
              stringedName(
                name: string,
                type: unknown,
                depth: number,
                folders: string[][],
                string: string,
                folderId: number,
                nomeDeiFileInNodeChildren: string[],
                _isLastChild: boolean | undefined,
                isRoot: boolean
              ): {
                _string: string;
                _folders: string[][];
                _folderId: number;
              };
              connettiAGenitore(node: TreeNode): TreeNode;
              connettiAFiglio(node: TreeNode): TreeNode;
              isRoot(): boolean;
              isFolder(): boolean;
              trovaSiblings(): TreeNode[];
              trovaFigli(): TreeNode[] | string;
              trovaGenitore(): TreeNode | undefined;
            }

            export class TreeNode implements TreeNode {
              static #types: ("Folder" | "File")[] = ["Folder", "File"];
              static #treeNodes: TreeNode[] = [];
              static get treeNodes() {
                return TreeNode.#treeNodes;
              }
              static get types() {
                return this.#types;
              }
              static nodeTypes: typeof TreeNodeTypes = TreeNodeTypes;
              // @ts-expect-error
              static makeNodes(res: Reader, data: Folder | File) {
                if (res.targetResult.length) {
                  this.makeIndex(data);
                } else {
                  this.makeModule(data);
                }
              }
              // @ts-expect-error
              static makeModule(data: Folder | File) {
                if (!("types" in data)) throw new Error("");
                if (!data.types) throw new Error("");
                data.type = data.types?.module;
              }
              // @ts-expect-error
              static makeIndex(data: Folder | File) {
                if (!("types" in data)) throw new Error("");
                if (!data.types) throw new Error("");
                data.type = data.types?.index;
              }
              constructor(
                public name?: string,
                public path?: string,
                public typeNumber?: number,
                public treeId?: unknown,
                public depth?: number,
                public genitore?: TreeNode[],
                public figlio?: TreeNode[],
                public children?: TreeNode[],
                public root: boolean = false,
                public type?: string,
                public id?: number,
                public stringedDir?: string,
                public _isLastChild?: boolean
              ) {
                this.name = name;
                this.path = path;
                this.genitore = [];
                this.figlio = [];
                if (typeNumber) this.type = TreeNode.#types[typeNumber];
                this.children = [];
                TreeNode.#treeNodes.push(this);
                this.id = TreeNode.length;
                this.treeId = treeId;
              }
              toStringedTree = (): string => {
                let string: string,
                  stack: TreeNode[] = [this],
                  treeStrings: string[] = [],
                  folders: string[][] = [],
                  folderId = -1,
                  stringedTree: string = "";

                while (stack.length) {
                  let currentNode = stack.pop(),
                    nomeDeiFileInNodeChildren: string[] = [];

                  if (!currentNode) return "no current node";

                  if (currentNode.children) {
                    let children = currentNode.children;
                    // children.reverse();

                    for (let child of children) {
                      if (!child.name) throw new Error("no child name");
                      nomeDeiFileInNodeChildren.push(child.name);
                      stack.push(child);
                    }
                  }

                  string = "";
                  if (!currentNode.name) throw new Error("no name");
                  if (!currentNode.depth) throw new Error("no depth");

                  let { _string, _folders, _folderId } = this.stringedName(
                    currentNode.name,
                    currentNode.type,
                    currentNode.depth,
                    folders,
                    string,
                    folderId,
                    nomeDeiFileInNodeChildren,
                    currentNode._isLastChild,
                    currentNode.isRoot()
                  );

                  string = _string;
                  folderId = _folderId;
                  folders = _folders;
                  currentNode.stringedDir = string;
                  treeStrings.push(string);
                }

                stringedTree = treeStrings.join("");

                return stringedTree;
              };
              stringedName = (
                name: string,
                type: unknown,
                depth: number,
                folders: string[][],
                string: string,
                folderId: number,
                nomeDeiFileInNodeChildren: string[],
                _isLastChild: boolean | undefined,
                isRoot: boolean
              ): {
                _string: string;
                _folders: string[][];
                _folderId: number;
              } => {
                let tab = `\n`,
                  pattern: string = "",
                  counter: number = 0,
                  _string: string,
                  _folders: string[][],
                  _folderId: number;

                if (depth === 1) pattern = "  ";
                if (depth > 1) pattern = "│ ";

                while (depth) {
                  depth--;
                  counter++;
                  if (counter === 1) pattern = "  ";
                  if (counter !== 1) pattern = "│ ";
                  tab = tab + pattern;
                }

                if (type === TreeNode.#types[0]) {
                  folders.push(nomeDeiFileInNodeChildren);
                  if (isRoot) string = `${tab}└─┬${name}`;
                  else string = `${tab}├─┬${name}`;
                  folderId++;
                }

                if (type === TreeNode.#types[1]) {
                  string = this.formatFolderString(
                    folders,
                    folderId,
                    name,
                    string,
                    tab
                  );
                }

                _string = string;
                _folders = folders;
                _folderId = folderId;

                return { _string, _folders, _folderId };
              };

              formatFolderString(
                folders: string[][],
                folderId: number,
                name: string,
                string: string,
                tab: string
              ) {
                if (!folders) throw new Error("no folders");
                const folder = folders[folderId];
                if (!folder) throw new Error("");
                const length = folder.length;
                const positionToCheck = length - 1;
                if (name === folder[positionToCheck])
                  string = `${tab}├──${name}`;
                else string = `${tab}└──${name}`;
                return string;
              }

              connettiAGenitore(node: TreeNode) {
                if (this.genitore) this.genitore.push(node);
                return this;
              }
              connettiAFiglio(node: TreeNode) {
                if (this.figlio) this.figlio.push(node);
                node.connettiAGenitore(this);
                return this;
              }
              isRoot() {
                if (this.root) return true;
                else return false;
              }
              isFolder(): boolean {
                return false;
              }
              trovaSiblings() {
                if (this.isRoot())
                  throw new Error("Il nodo root non ha Siblings");
                let servedArray: TreeNode[] = [];

                // this.genitore[0].figlio;
                TreeNode.#treeNodes.forEach(treeNode => {
                  if (!treeNode.genitore) return;
                  if (!this.genitore) return;
                  if (!treeNode.genitore[0]) return;
                  if (treeNode.genitore[0].name === this.genitore[0].name) {
                    // console.log(treeNode.genitore[0]);
                    servedArray.push(treeNode);
                  }
                });
                return servedArray;
              }
              trovaFigli() {
                if (this.type === TreeNode.#types[1])
                  throw new Error("I file non hanno figli");
                let servedArray: TreeNode[] = [];
                if (!this.figlio) return "no figlio";
                this.figlio.forEach(child => {
                  if (!child) return;
                  servedArray.push(child);
                });
                Object.freeze(servedArray);
                return servedArray;
              }
              trovaGenitore() {
                if (this.isRoot())
                  throw new Error("Il nodo root non ha genitori");
                if (this.genitore) return this.genitore[0];
              }
            }
          }

          export namespace Tree_v2 {
            export enum treeNodeTypes {
              root = "root",
              file = "file",
              folder = "folder",
            }

            export type treeNodeTypeType = keyof typeof treeNodeTypes;

            export interface ITreeNode_v2<T> {
              id: number;
              type: treeNodeTypeType;
              value: T;
              parent: TreeNode_v2[];
              children: TreeNode_v2[];
            }

            export interface TreeNode_v2<T> extends ITreeNode_v2<T> {
              addParent(node: TreeNode_v2<T>): this;
              addChild(node: TreeNode_v2<T>): this;
              findSiblings(): TreeNode_v2<T>[];
              findChildren(): TreeNode_v2<T>[] | string;
              findParent(): TreeNode_v2<T> | undefined;
              dfs(): this;
              bfs(): this;
              dijkstra(): string;
            }

            export class TreeNode_v2<T = any> implements TreeNode_v2<T> {
              static #types: typeof treeNodeTypes = treeNodeTypes;

              static #treeNodes: TreeNode_v2[] = [];

              static get treeNodes() {
                return TreeNode_v2.#treeNodes;
              }

              static get types() {
                return this.#types;
              }
              // TODO move this function somewhere in database
              // was a Reader but had to put any cause it would make
              // this package import from database
              // @ts-expect-error
              static makeNodes(res: any, data: Folder | File) {
                if (res.targetResult.length) {
                  this.makeIndex(data);
                } else {
                  this.makeModule(data);
                }
              }

              // @ts-expect-error
              static makeModule(data: Folder | File) {
                if (!("types" in data)) throw new Error("");
                if (!data.types) throw new Error("");
                data.type = data.types?.module;
              }

              // @ts-expect-error
              static makeIndex(data: Folder | File) {
                if (!("types" in data)) throw new Error("");
                if (!data.types) throw new Error("");
                data.type = data.types?.index;
              }

              #type: treeNodeTypeType = TreeNode_v2.#types.root;
              get type() {
                return this.#type;
              }

              constructor(props?: T) {
                TreeNode_v2.#treeNodes.push(this);
                this.id = TreeNode_v2.length;
                if (props) this.value = props;
              }

              get treeId() {
                return JSON.stringify(this);
              }

              connettiAGenitore(node: TreeNode_v2) {
                if (this.parent) this.parent.push(node);
                return this;
              }

              connettiAFiglio(node: TreeNode_v2) {
                if (this.children) this.children.push(node);
                node.connettiAGenitore(this);
                return this;
              }

              get isRoot() {
                return this.type === TreeNode_v2.types.root;
              }

              get isFolder() {
                return this.type === TreeNode_v2.types.folder;
              }

              get isFile() {
                return this.type === TreeNode_v2.types.file;
              }

              trovaSiblings() {
                if (this.isRoot)
                  throw new Error("Il nodo root non ha Siblings");
                let servedArray: TreeNode_v2[] = [];
                // this.genitore[0].figlio;
                TreeNode_v2.#treeNodes.forEach(treeNode => {
                  if (!treeNode.parent) return;
                  if (!this.parent) return;
                  if (!this.parent[0]) return;
                  if (!treeNode.parent[0]) return;
                  if (treeNode.parent[0].id === this.parent[0].id) {
                    // console.log(treeNode.genitore[0]);
                    servedArray.push(treeNode);
                  }
                });
                return servedArray;
              }

              pushChildInArray =
                (result: TreeNode_v2[]) => (child: TreeNode_v2) => {
                  if (!child) return;
                  result.push(child);
                };

              trovaFigli() {
                const isFile = this.type === "file";
                if (isFile) throw new Error("I file non hanno figli");
                let result: TreeNode_v2[] = [];
                if (!this.children) return [];
                this.children.forEach(this.pushChildInArray(result));
                Object.freeze(result);
                return result;
              }

              NO_PARENTS = "Il nodo root non ha genitori";
              trovaGenitore() {
                if (this.isRoot) throw new Error(this.NO_PARENTS);
                if (this.parent) return this.parent[0];
              }
            }
          }

          export namespace FileSystem {
            export interface IFileSystemTree_v1 {
              name: string;
              path: string;
              size: number;
            }

            export interface FileSystemTree<T>
              extends Tree_v2.TreeNode_v2<IFileSystemTree_v1 & T> {
              name: string;
              path: string;
              size: number;
            }

            export class FileSystemTree<
              T = unknown
            > extends Tree_v2.TreeNode_v2<IFileSystemTree_v1 & T> {}

            export type FileSystemTree_v1Ctor = {
              new (): FileSystemTree;
            };

            export const FileSystemTree_v1Ctor: FileSystemTree_v1Ctor =
              FileSystemTree;
          }

          export namespace File {
            export namespace v1 {
              enum filesStatuses {
                "working ✅" = "working ✅",
                "notter ⛔️" = "notter ⛔️",
                "default-noiz" = "default-noiz",
                "icons-not-showing" = "icons-not-showing",
                "index-??" = "index-??",
              }
              type fileStatusesTypes = keyof typeof filesStatuses;

              export interface File_v1 extends Tree.Tree_v1.TreeNode {
                extension?: string;
                fileSize?: number;
                status: fileStatusesTypes;
              }

              export class File_v1
                extends Tree.Tree_v1.TreeNode
                implements Tree.Tree_v1.TreeNode
              {
                status: fileStatusesTypes = "working ✅";
                constructor(
                  public name: string,
                  public path: string,
                  public typeNumber: number,
                  public treeId: unknown,
                  public depth: number,
                  public extension?: string,
                  public fileSize?: number
                ) {
                  super(name, path, typeNumber, treeId, depth);
                  delete this.children;
                  this.extension = extension;
                  this.fileSize = fileSize; // MB size of file
                }
              }
              // TODO #1 estendere file a immagine
              // class Image extends File {
              //   constructor(name, path, type, width, height) {
              //     super(name, path, type);
              //     this.size = new Size(width, height);
              //   }
              // }
            }
            export namespace v2 {
              export enum fileTypes {
                ts,
                tsx,
                js,
                jsx,
                sol,
                md,
                yaml,
                json,
                svg,
                noiz,
                csv,
              }
              type fileTypeTypes = keyof typeof filesStatuses;

              enum filesStatuses {
                "working ✅" = "working ✅",
                "notter ⛔️" = "notter ⛔️",
                "default-noiz" = "default-noiz",
                "icons-not-showing" = "icons-not-showing",
                "index-??" = "index-??",
              }
              type fileStatusesTypes = keyof typeof filesStatuses;

              export interface IFile_v2 {
                _type: fileTypeTypes;
                extension: string;
                name_without_extension: string;
                status: fileStatusesTypes;
                depth: number;
              }

              export interface File_v2
                extends FileSystem.FileSystemTree<IFile_v2> {}

              export class File_v2 extends FileSystem.FileSystemTree<IFile_v2> {
                #type = Tree.Tree_v2.TreeNode_v2.types.file;
                get type() {
                  return this.#type;
                }
              }

              export type File_v2Ctor = {
                new (): File_v2;
              };

              export const File_v2Ctor: File_v2Ctor = File_v2;
            }
          }

          export namespace Folder_v1 {
            enum folderTypes {
              index = "index",
              module = "module",
            }
            type folderTypeTypes = keyof typeof folderTypes;

            export interface Folder_v1 extends Tree_v1.TreeNode {
              depth?: number;
              types?: typeof folderTypes;
              type?: folderTypeTypes;
            }

            export class Folder_v1
              extends Tree_v1.TreeNode
              implements Tree_v1.TreeNode
            {
              types? = folderTypes;
              constructor(
                public name?: string,
                public path?: string,
                public typeNumber?: number,
                public treeId?: unknown,
                public depth?: number
              ) {
                super(name, path, typeNumber, treeId, depth);
                this.depth;
              }
              isFolder(): boolean {
                return this.constructor === Folder_v1;
              }
            }
          }

          export namespace Folder_v2 {
            enum folderTypes {
              index = "index",
              module = "module",
            }
            type folderTypeTypes = keyof typeof folderTypes;

            export interface IFolder_v2 {
              _type: folderTypeTypes;
            }

            export interface Folder_v2
              extends FileSystem.FileSystemTree<IFolder_v2> {}

            export class Folder_v2 extends FileSystem.FileSystemTree<IFolder_v2> {
              #type = Tree_v2.TreeNode_v2.types.folder;
              get type() {
                return this.#type;
              }
            }

            export type Folder_v2Ctor = {
              new (): Folder_v2;
            };

            export const Folder_v2Ctor: Folder_v2Ctor = Folder_v2;
          }

          export namespace Leaf {
            export namespace v2 {
              export interface ILeafNode_v2 {
                name: string;
              }

              export interface LeafNode_v2 {
                name: string;
              }

              export class LeafNode_v2 implements ILeafNode_v2 {
                constructor(name: string) {
                  this.name = name;
                }
              }

              export type LeafNode_v2Ctor = {
                new (name: string): LeafNode_v2;
              };

              export const LeafNode_v2Ctor: LeafNode_v2Ctor = LeafNode_v2;
            }
          }

          export namespace Root {
            export namespace v1 {
              export interface Root_v1 extends Tree.Tree_v1.TreeNode {
                root: boolean;
              }

              export class Root_v1
                extends Tree.Tree_v1.TreeNode
                implements Tree.Tree_v1.TreeNode
              {
                static #roots: Tree.Tree_v1.TreeNode[] = [];
                #type = "root";
                constructor(
                  name: string,
                  path: string,
                  typeNumber: number,
                  treeId: unknown,
                  depth: number
                ) {
                  super(name, path, typeNumber, treeId, depth);
                  this.root = true;
                  this.#type;
                  Root_v1.#roots.push(this);
                }
              }
            }
            export namespace v2 {
              enum rootTypes {
                index = "repo",
                module = "monorepo",
              }
              type rootTypeTypes = keyof typeof rootTypes;

              export interface IRoot_v2 {
                _type: rootTypeTypes;
              }

              export interface Root_v2
                extends FileSystem.FileSystemTree<IRoot_v2> {}

              export class Root_v2 extends FileSystem.FileSystemTree<IRoot_v2> {
                #type = Tree.Tree_v2.TreeNode_v2.types.root;
                get type() {
                  return this.#type;
                }
              }

              export type Root_v2Ctor = {
                new (): Root_v2;
              };

              export const Root_v2Ctor: Root_v2Ctor = Root_v2;
            }
          }

          export namespace MerkleTree {
            export interface IMerkleTree_v1 {
              name: string;
            }

            export interface MerkleTree_v1 {
              name: string;
            }

            export class MerkleTree_v1 implements IMerkleTree_v1 {
              constructor(name: string) {
                this.name = name;
              }
            }

            export type MerkleTree_v1Ctor = {
              new (name: string): MerkleTree_v1;
            };

            export const MerkleTree_v1Ctor: MerkleTree_v1Ctor = MerkleTree_v1;
          }

          export namespace BinaryTree {
            export interface BinaryTree_v1 {
              key: string;
              right: BinaryTree_v1;
              left: BinaryTree_v1;
            }

            export class BinaryTree_v1 {}

            export namespace TupleBinaryTree {
              export type Left = TupleBinaryTree_v1;
              export type Right = TupleBinaryTree_v1;
              export interface TupleBinaryTree_v1 {
                key: string;
                children: [Left, Right];
              }
              export class TupleBinaryTree_v1 {}
            }
          }
        }

        export namespace AppGraph {
          export namespace AppNode {
            export interface IAppNode_v1<
              S extends string = string,
              A extends string = string,
              C extends string = string
            > {
              id: S;
              actions?: A[];
              children?: C[];
            }

            export interface AppNode<
              S extends string = string,
              A extends string = string,
              C extends string = string
            > {
              id: S;
              actions?: A[];
              children?: C[];
            }

            export interface AppNode_v1Props<
              S extends string = string,
              A extends string = string,
              C extends string = string
            > {
              id: S;
              actions?: A[];
              children?: C[];
            }

            export class AppNode<
              S extends string = string,
              A extends string = string,
              C extends string = string
            > implements IAppNode_v1<S, A, C>
            {
              constructor(props: AppNode_v1Props<S, A, C>) {
                this.id = props.id;
                this.actions = props.actions;
                this.children = props.children;
              }
              next(children: C[]) {
                this.children = children;
                return this;
              }
              setActions(action: A[]): this;
              setActions(action: A): this;
              setActions(action: A | A[]): this {
                if (Array.isArray(action)) this.actions = action;
                else this.actions?.push(action);
                return this;
              }
            }

            export type AppNode_v1Ctor<
              S extends string = string,
              A extends string = string,
              C extends string = string
            > = {
              new (props: AppNode_v1Props<S, A, C>): AppNode;
            };

            export const AppNode_v1Ctor: AppNode_v1Ctor = AppNode;

            export type getNodeId<T> = T extends AppNode<infer X>[] ? X : never;
          }

          type FuncReturns<U> = U extends any ? () => U : never;

          type OverloadOfAsReturn<U> = U extends any
            ? (k: FuncReturns<U>) => void
            : never;

          type IntersectionOfAsReturn<U> = OverloadOfAsReturn<U> extends (
            k: infer I
          ) => void
            ? I
            : never;

          type Last<U> = IntersectionOfAsReturn<U> extends () => infer R
            ? R
            : never;

          type IsArray<U> = [U] extends [never] ? true : false;

          type PushToArray<A extends any[], E> = [...A, E];

          type TupleOf<
            U,
            L = Last<U>,
            E = Exclude<U, L>
          > = IsArray<U> extends true ? [] : PushToArray<TupleOf<E>, L>;

          export interface IAppGraph_v1<
            S extends string = string,
            N extends AppGraph.AppNode.AppNode = AppGraph.AppNode.AppNode,
            A extends string = string,
            C extends string = string,
            I extends AppNode.getNodeId<N[]> = AppNode.getNodeId<N[]>
          > {
            id: S;
            nodes: N[];
            actions: A[];
            children: C[];
            addNode(node: N): this;
            getById(id: I): N;
            makeApp(children: C[]): this;
          }

          export interface AppGraph_v1<
            S extends string = string,
            N extends AppGraph.AppNode.AppNode = AppGraph.AppNode.AppNode,
            A extends string = string,
            C extends string = string,
            I extends AppNode.getNodeId<N[]> = AppNode.getNodeId<N[]>
          > {
            id: S;
            nodes: N[];
            actions: A[];
            children: C[];
            addNode(node: N): this;
            getById(id: I): N;
            makeApp(children: C[]): this;
          }

          export interface AppGraph_v1Props<
            S extends string,
            N extends AppGraph.AppNode.AppNode,
            A extends string = string,
            C extends string = string
          > {
            id: S;
            nodes: N[];
            actions?: A[];
            children?: C[];
          }

          export class AppGraph_v1<
            S extends string,
            N extends AppGraph.AppNode.AppNode,
            A extends string = string,
            C extends string = string,
            I extends AppGraph.AppNode.getNodeId<
              N[]
            > = AppGraph.AppNode.getNodeId<N[]>
          > implements IAppGraph_v1
          {
            static Nodes: AppGraph.AppNode.AppNode[] = [];
            static addElement<T>(
              arrayOfNodes: T[],
              startingElement: T
            ): TupleOf<T> {
              const res = arrayOfNodes.reduce(
                (arr, el) => {
                  return [...arr, el];
                },
                [startingElement] as T[]
              );
              return res as TupleOf<T>;
            }
            constructor(props: AppGraph_v1Props<S, N, A, C>) {
              const { actions, children, id, nodes } = props;
              this.id = id;
              this.nodes = nodes;

              if (actions) this.actions = actions;
              if (children) this.children = children;
            }
            getById(id: I) {
              const node = this.nodes.find(node => node.id === id);
              if (!node) throw new Error("");
              return node;
            }
            makeApp(children: C[]) {
              this.children = children;
              return this;
            }
          }

          export type AppGraph_v1Ctor = {
            new <
              S extends string = string,
              N extends AppGraph.AppNode.AppNode = AppGraph.AppNode.AppNode,
              A extends string = string,
              C extends string = string
            >(
              props: AppGraph_v1Props<S, N, A, C>
            ): AppGraph_v1;
          };

          export const AppGraph_v1Ctor: AppGraph_v1Ctor = AppGraph_v1;
        }

        export namespace ListGraph {
          type EncodedId = string;

          type AddProps = { node: EncodedId };
          type AddType<T> = (props: AddProps) => T;

          export interface IListGraph_v1 extends Graph_v1.IGraph {
            add: AddType<this>;
          }

          export interface ListGraph_v1 extends Graph_v1.Graph {}

          export interface ListGraph_v1Props extends Graph_v1.GraphProps {}

          export class ListGraph_v1
            extends Graph_v1.Graph
            implements IListGraph_v1
          {
            constructor(props: ListGraph_v1Props) {
              super(props);
            }
            add(props: AddProps) {
              this.nodes.push(props.node);
              return this;
            }
          }

          export type ListGraph_v1Ctor = {
            new (props: ListGraph_v1Props): ListGraph_v1;
          };

          export const ListGraph_v1Ctor: ListGraph_v1Ctor = ListGraph_v1;
        }

        export namespace MatrixGraph {
          type isConnectedProps = {
            nodeA: EncodedId;
            nodeB: EncodedId;
          };
          type isConnectedType = (props: isConnectedProps) => boolean;

          type findAdjacentNodesProps = {
            node: EncodedId;
          };
          type findAdjacentNodesType = (
            props: findAdjacentNodesProps
          ) => EncodedId[];

          type EncodedId = string;

          export type AdjacencyMatrix = (0 | 1)[][];

          type NodeIndexes = { [key: EncodedId]: number };

          export interface IMatrixGraph_v1 extends Graph_v1.IGraph {
            adjacencyMatrix: AdjacencyMatrix;
            nodeIndexes: NodeIndexes;
            isConnected: isConnectedType;
            findAdjacetNodes: findAdjacentNodesType;
          }

          export interface MatrixGraph_v1 extends Graph_v1.Graph {
            adjacencyMatrix: AdjacencyMatrix;
            nodeIndexes: NodeIndexes;
          }

          export interface MatrixGraph_v1Props extends Graph_v1.GraphProps {
            adjacencyMatrix: AdjacencyMatrix;
            nodeIndexes: NodeIndexes;
          }

          export class MatrixGraph_v1
            extends Graph_v1.Graph
            implements IMatrixGraph_v1
          {
            constructor(props: MatrixGraph_v1Props) {
              super(props);
              this.adjacencyMatrix = props.adjacencyMatrix;
              this.nodes = props.nodes;
              this.nodeIndexes = props.nodeIndexes;
            }
            isConnected(props: isConnectedProps) {
              const indexA = this.nodeIndexes[props.nodeA];
              const indexB = this.nodeIndexes[props.nodeB];
              if (!indexA) throw new Error("no index A");
              if (!indexB) throw new Error("no index b");
              const bii = this.adjacencyMatrix[indexA];
              if (!bii) throw new Error("");
              const cond = bii[indexB] ? true : false;
              return cond;
            }
            findAdjacetNodes(props: findAdjacentNodesProps) {
              const result: EncodedId[] = [];
              if (!this.nodeIndexes) throw new Error("");
              for (let key in this.nodeIndexes) {
                let nodeIndex = this.nodeIndexes[props.node];
                if (!nodeIndex) throw new Error("");
                const connectionsOfNode = this.adjacencyMatrix[nodeIndex];
                const currentNode = this.nodeIndexes[key];
                if (!connectionsOfNode) throw new Error("");
                if (!currentNode) throw new Error("");

                if (connectionsOfNode[currentNode]) {
                  const node = this.nodes[currentNode];
                  if (!node) throw new Error("");
                  result.push(node);
                }
              }
              return result;
            }
          }

          export type MatrixGraph_v1Ctor = {
            new (props: MatrixGraph_v1Props): MatrixGraph_v1;
          };

          export const MatrixGraph_v1Ctor: MatrixGraph_v1Ctor = MatrixGraph_v1;
        }

        export namespace lib {
          export namespace addNode {
            export const addNode_v1: addNodeType = function (node) {
              const currentMatrixLength = this.adjacencyMatrix.length;

              this.adjacencyMatrix.push(new Array(currentMatrixLength).fill(0));
              this.nodeIndexes[node] = this.adjacencyMatrix.length - 1;
              return this;
            };
          }
          export namespace findAdjacentNodes {
            export const findAdjacentNodes_v1: findAdjacentNodesType =
              function (node) {
                const result: INode["key"][] = [];
                if (!this.nodeIndexes) throw new Error("");
                for (let key in this.nodeIndexes) {
                  let nodeIndex = this.nodeIndexes[node];
                  if (!nodeIndex) throw new Error("");
                  const connectionsOfNode = this.adjacencyMatrix[nodeIndex];
                  const currentNode = this.nodeIndexes[key];
                  if (!connectionsOfNode) throw new Error("");
                  if (!currentNode) throw new Error("");

                  if (connectionsOfNode[currentNode]) {
                    const node = this.nodes[currentNode];
                    if (!node) throw new Error("");
                    result.push(node);
                  }
                }
                return result;
              };
          }
          export namespace isConnected {
            export const isConnected_v1: isConnectedType = function (
              nodeA,
              nodeB
            ) {
              const indexA = this.nodeIndexes[nodeA];
              const indexB = this.nodeIndexes[nodeB];
              if (!indexA) throw new Error("no index A");
              if (!indexB) throw new Error("no index b");
              const bii = this.adjacencyMatrix[indexA];
              if (!bii) throw new Error("");
              const cond = bii[indexB] ? true : false;
              return cond;
            };
          }
        }

        export namespace Algo {
          // Graph

          export interface graph<N> {
            type: "simple";
            nodes: N[];
          }

          // Node

          export interface BasicNode<I = number, T = {}> {
            id: I;
            children: BasicNode["id"][];
            value: T;
          }

          // Processor

          export interface processor<T> {
            (e: T): T;
          }

          // Algo

          export interface commonProps<N> {
            thiscurr: N;
            processors: processor<N>[];
            treat: (p: processor<N>) => void;
          }
          export namespace v1 {
            type GraphTypes<
              Id extends string | number | symbol,
              T,
              Node extends BasicNode<Id, T>
            > = graph<Node> | Graph_v3.FluidGraph<unknown, Id, Node, T>;

            export interface Dfs_v1Props<
              I extends string | number | symbol = number,
              T = {},
              N extends BasicNode<I, T> = BasicNode<I, T>
            > {
              type?: "dfs";
              graph: GraphTypes<I, T, N>;
              stack: BasicNode<I, T>[];
              curr: N;
              processors: processor<N>[];
            }

            export interface Bfs_v1Props<
              I extends string | number | symbol = number,
              T = {},
              N extends BasicNode<I, T> = BasicNode<I, T>
            > {
              type?: "bfs";
              graph: GraphTypes<I, T, N>;
              queue: BasicNode<I, T>[];
              curr: N;
              processors: processor<N>[];
            }

            export type FluidAlgoProps<
              I extends string | number | symbol = number,
              T = {},
              N extends BasicNode<I, T> = BasicNode<I, T>
            > = Bfs_v1Props<I, T, N> | Dfs_v1Props<I, T, N>;

            export interface IAlgo_v1<
              I extends string | number | symbol = number,
              T = {},
              N extends BasicNode<I, T> = BasicNode<I, T>
            > {
              type: "dfs" | "bfs";
              graph: GraphTypes<I, T, N>;
              stack_or_queue: BasicNode<I, T>[];
              curr: N;
              processors: processor<N>[];
            }

            export interface Algo_v1<
              I extends string | number | symbol = number,
              T = {},
              N extends BasicNode<I, T> = BasicNode<I, T>
            > {
              type: "dfs" | "bfs";
              graph: GraphTypes<I, T, N>;
              stack_or_queue: BasicNode<I, T>[];
              curr: N;
              processors: processor<N>[];
              traverse(): this;
              use(p: processor<N>): this;
              treat: (p: processor<N>) => void;
              pushInStack: (id: I) => void;
              // TODO #55 @giacomogagliano finire implementazioni e togliere
              // il void return
              process(graph?: GraphTypes<I, T, N>): GraphTypes<I, T, N> | void;
            }

            export class Algo_v1<
              I = number,
              T = {},
              N extends BasicNode<I, T> = BasicNode<I, T>
            > {
              constructor(props: FluidAlgoProps<I, T, N>) {
                switch (props.type) {
                  case "bfs":
                    this.stack_or_queue = props.queue;
                    this.type = "bfs";
                    break;
                  case "dfs":
                    this.stack_or_queue = props.stack;
                    this.type = "dfs";
                    break;
                  default:
                    break;
                }
                this.processors = props.processors;
                this.graph = props.graph;
                this.curr = props.curr;
              }

              traverse() {
                return this;
              }

              use(processor: processor<N>) {
                this.processors.push(processor);
                return this;
              }

              treat = (p: processor<N>) => {
                if (!this.curr) return;
                this.curr = p(this.curr);
              };

              pushInStack = (c: I) => {
                if (!this.graph) return;
                let node;
                switch (this.graph.type) {
                  case "array":
                    var nodes = this.graph.nodes as N[];
                    node = nodes[c as number];
                    break;

                  default:
                    if (this.graph.type === "map") throw new Error("");
                    var nodes = this.graph.nodes as N[];
                    node = nodes[c as number];
                    break;
                }
                this.stack_or_queue.push(node as N);
              };

              process(graph?: GraphTypes<I, T, N>) {
                if (graph) this.graph = graph;
                let root;
                switch (graph?.type) {
                  case "array":
                    var nodes = this.graph.nodes as N[];
                    var arrayroot = nodes[0]!;
                    root = arrayroot;
                    break;

                  case "map":
                    throw new Error("to be implemented");

                  default:
                    var nodes = this.graph.nodes as N[];
                    var arrayroot = nodes[0]!;
                    root = arrayroot;
                    break;
                }
                if (!root) return;
                this.stack_or_queue = [root];
                while (this.stack_or_queue.length) {
                  let curr: BasicNode<I, T>;
                  switch (this.type) {
                    case "dfs":
                      curr = this.stack_or_queue.pop()!;
                      break;
                    case "bfs":
                      curr = this.stack_or_queue.shift()!;
                      break;
                    default:
                      curr = this.stack_or_queue.shift()!;
                      break;
                  }
                  if (!curr) return;
                  this.curr = curr as N;
                  const children = curr.children as I[];
                  children.forEach(this.pushInStack);
                  // process
                  if (this.processors) {
                    this.processors.forEach(this.treat);
                  }
                }
                return graph;
              }
            }

            export type Algo_v1Ctor<
              I extends string | number | symbol = number,
              T = {},
              N extends BasicNode<I, T> = BasicNode<I, T>
            > = {
              new (props: FluidAlgoProps<I, T, N>): Algo_v1<I, T, N>;
            };

            export const Algo_v1Ctor: Algo_v1Ctor = Algo_v1;
          }

          export namespace Bfs {
            export interface IBfs_v1<
              I = number,
              T = {},
              N extends BasicNode<I, T> = BasicNode<I, T>
            > {
              graph: graph<N> | undefined;
              queue: N[];
              curr: N;
              processors: processor<N>[];
            }

            export interface Bfs_v1<
              I = number,
              T = {},
              N extends BasicNode<I, T> = BasicNode<I, T>
            > {
              graph: graph<N> | undefined;
              queue: N[];
              curr: N;
              processors: processor<N>[];
              traverse(): this;
              use(p: processor<N>): this;
              treat: (p: processor<N>) => void;
              pushInQueue: (id: I) => void;
              process(graph: graph<N>): graph<N>;
            }

            export class Bfs_v1<
              I = number,
              T = {},
              N extends BasicNode<I, T> = BasicNode<I, T>
            > {
              constructor() {
                this.queue = [];
                this.processors = [];
              }

              traverse() {
                return this;
              }

              use(processor: processor<N>) {
                this.processors.push(processor);
                return this;
              }

              treat = (p: processor<N>) => {
                if (!this.curr) return;
                this.curr = p(this.curr);
              };

              pushInQueue = (c: I) => {
                if (!this.graph) return;
                const node = this.graph.nodes[c as number];
                this.queue.push(node as N);
              };

              process(graph: graph<N>) {
                this.graph = graph;
                let root = graph.nodes[0];
                if (!root) return;
                this.queue = [root];
                while (this.queue.length) {
                  let curr = this.queue.shift();
                  if (!curr) return;
                  this.curr = curr;
                  const children = curr.children as I[];
                  children.forEach(this.pushInQueue);
                  // process
                  if (this.processors) {
                    this.processors.forEach(this.treat);
                  }
                }
                return graph;
              }
            }

            export type Bfs_v1Ctor<
              T = {},
              N extends BasicNode<T> = BasicNode<T>
            > = {
              new (): Bfs_v1<T, N>;
            };

            export const Bfs_v1Ctor: Bfs_v1Ctor = Bfs_v1;
          }

          export namespace Dfs {
            export interface IDfs_v1<
              I = number,
              T = {},
              N extends BasicNode<I, T> = BasicNode<I, T>
            > {
              graph: graph<N> | undefined;
              stack: N[];
              curr: N;
              processors: processor<N>[];
            }

            export interface Dfs_v1<
              I = number,
              T = {},
              N extends BasicNode<I, T> = BasicNode<I, T>
            > {
              graph: graph<N> | undefined;
              stack: N[];
              curr: N;
              processors: processor<N>[];
              traverse(): this;
              use(p: processor<N>): this;
              treat: (p: processor<N>) => void;
              pushInStack: (id: I) => void;
              process(graph: graph<N>): graph<N>;
            }

            export class Dfs_v1<
              I = number,
              T = {},
              N extends BasicNode<I, T> = BasicNode<I, T>
            > {
              constructor() {
                this.stack = [];
                this.processors = [];
              }

              traverse() {
                return this;
              }

              use(processor: processor<N>) {
                this.processors.push(processor);
                return this;
              }

              treat = (p: processor<N>) => {
                if (!this.curr) return;
                this.curr = p(this.curr);
              };

              pushInStack = (c: I) => {
                if (!this.graph) return;
                const node = this.graph.nodes[c as number];
                this.stack.push(node as N);
              };

              process(graph: graph<N>) {
                this.graph = graph;
                let root = graph.nodes[0];
                if (!root) return;
                this.stack = [root];
                while (this.stack.length) {
                  let curr = this.stack.pop();
                  if (!curr) return;
                  this.curr = curr;
                  const children = curr.children as I[];
                  children.forEach(this.pushInStack);
                  // process
                  if (this.processors) {
                    this.processors.forEach(this.treat);
                  }
                }
                return graph;
              }
            }

            export type Dfs_v1Ctor<
              I = number,
              T = {},
              N extends BasicNode<I, T> = BasicNode<I, T>
            > = {
              new (): Dfs_v1<I, T, N>;
            };

            export const Dfs_v1Ctor: Dfs_v1Ctor = Dfs_v1;
          }

          export namespace Dijkstra {
            export namespace dijk {
              // https://bytethisstore.com/articles/pg/dijkstras-algorithm
              /**
               * Encapsulates a graph node/vertex
               * Holds references to connected nodes with weights
               */
              export class GraphNode {
                private outNodes = new Map<GraphNode, number>();

                constructor(private value: string) {}

                getValue(): string {
                  return this.value;
                }

                getChildMaps(): Map<GraphNode, number> {
                  return this.outNodes;
                }

                /**
                 * Add a connection to a node, then add node to this
                 * Both weights will be the same
                 */
                addConnectionTo(node: GraphNode, weight: number): void {
                  this.outNodes.set(node, weight);
                  if (!node.isConnectedTo(this)) {
                    node.addConnectionTo(this, weight);
                  }
                }

                isConnectedTo(node: GraphNode): boolean {
                  return this.outNodes.has(node);
                }
              }

              /**
               * Encapsulate a response for finding the shortest path
               */
              class ShortestPath {
                constructor(public path: GraphNode[], public cost: number) {}
              }

              /**
               * Store the function in a class as a static method
               */
              export class Dijkstra {
                /**
                 * Find the shortest path
                 * Return an object which contains the path and sum of weights
                 */
                public static findShortestPath(
                  startNode: GraphNode,
                  endNode: GraphNode
                ): ShortestPath {
                  const smallestWeights = new Map<GraphNode, number>();
                  smallestWeights.set(startNode, 0);
                  const prevNodes = new Map<GraphNode, GraphNode>();
                  const nodesToVisitQueue: GraphNode[] = [];
                  const visitedNodes = new Set<GraphNode>();
                  visitedNodes.add(startNode);
                  let currentNode = startNode;
                  while (true) {
                    const dist = smallestWeights.get(currentNode)!;
                    const childNodes = currentNode.getChildMaps();
                    for (const [childNode, weight] of childNodes) {
                      if (!visitedNodes.has(childNode)) {
                        nodesToVisitQueue.push(childNode);
                      }
                      const thisDist = dist + weight;
                      if (prevNodes.has(childNode)) {
                        const altDist = smallestWeights.get(childNode)!;
                        if (thisDist < altDist) {
                          prevNodes.set(childNode, currentNode);
                          smallestWeights.set(childNode, thisDist);
                        }
                      } else {
                        prevNodes.set(childNode, currentNode);
                        smallestWeights.set(childNode, thisDist);
                      }
                    }
                    visitedNodes.add(currentNode);
                    if (nodesToVisitQueue.length === 0) {
                      break;
                    }
                    currentNode = nodesToVisitQueue.shift()!;
                  }
                  const path: GraphNode[] = [];
                  currentNode = endNode;
                  while (currentNode !== startNode) {
                    path.push(currentNode);
                    currentNode = prevNodes.get(currentNode)!;
                  }
                  path.push(startNode);
                  path.reverse();
                  const cost = smallestWeights.get(endNode)!;
                  return new ShortestPath(path, cost);
                }
              }
            }

            export namespace dijk2 {}

            export namespace v1 {
              export interface IDijkstra_v1 {
                name: string;
              }

              export interface Dijkstra_v1 {
                name: string;
              }

              export class Dijkstra_v1 implements IDijkstra_v1 {
                constructor(name: string) {
                  this.name = name;
                }
              }

              export type Dijkstra_v1Ctor = {
                new (name: string): Dijkstra_v1;
              };

              export const Dijkstra_v1Ctor: Dijkstra_v1Ctor = Dijkstra_v1;
            }
          }

          export namespace lib {
            export namespace bfs {
              export interface Ibfs_v1 {
                (a: any): any;
              }

              export const bfs_v1: Ibfs_v1 = function () {};
            }
            export namespace dfs {
              interface BinaryTree {
                key: string;
                right: BinaryTree;
                left: BinaryTree;
              }

              interface Tree {
                key: string;
                children: Tree[];
              }

              export interface Idfs_v1 {
                (root: Tree): any;
              }

              export function dfs_v1(root: Tree) {
                let stack: Tree[] = [root];
                let res: string[] = [];
                while (stack.length) {
                  let curr = stack.pop();
                  res.push(curr?.key!);
                  if (curr) {
                    const children = curr.children;
                    if (children)
                      /**reversing the children to have the in the
                       * same order  as they were input in the array*/
                      children.reverse().forEach(c => stack.push(c));
                  }
                }
                return res;
              }

              export function dfs_binary_tree(root: BinaryTree) {
                let stack: BinaryTree[] = [root];
                let res: string[] = [];
                while (stack.length) {
                  let curr = stack.pop();
                  if (curr) {
                    res.push(curr.key);
                    if (curr.right) {
                      stack.push(curr.right);
                    }
                    if (curr.left) {
                      stack.push(curr.left);
                    }
                  }
                }
                return res.reverse();
              }
            }
            export namespace dijkstra {
              export interface Idijkstra_v1 {
                (a: any): any;
              }

              export const dijkstra_v1: Idijkstra_v1 = function () {};
            }
          }
        }
      }
      export namespace Class {
        export function staticImplements<T>() {
          return <U extends T>(constructor: U) => {
            constructor;
          };
        }
        export namespace Base {
          export namespace v1 {
            export interface IBase_v1 {
              name: string;
            }

            export interface Base_v1 {
              name: string;
            }

            export class Base_v1 implements IBase_v1 {
              constructor(name: string) {
                this.name = name;
              }
            }

            export type Base_v1Ctor = {
              new (name: string): Base_v1;
            };

            export const Base_v1Ctor: Base_v1Ctor = Base_v1;

            interface IStaticBase {
              basi: IBase[];
              mostraBasi(): void;
            }

            export interface IBase {
              id: number;
              type: string;
            }

            export abstract class ABase implements IBase {
              static #basi: IBase[] = [];
              static get basi() {
                return ABase.#basi;
              }
              static mostraBasi() {
                console.table(ABase.basi);
              }
              id: number;
              constructor(public type: string = "nd") {
                ABase.#basi.push(this);
                this.id = ABase.basi.length;
              }
            }
          }
          export namespace v2 {
            export interface IBase_v2 {
              name: string;
            }

            export interface Base_v2 {
              name: string;
            }

            export interface Base_v2Props {}

            export class Base_v2 implements IBase_v2 {
              constructor(name: string) {
                this.name = name;
              }
            }

            export type Base_v2Ctor = {
              new (name: string): Base_v2;
            };

            export const Base_v2Ctor: Base_v2Ctor = Base_v2;
          }
        }
        export namespace ProcessingNoiz {
          export interface functionality<T> {
            (a: T): T;
          }

          export interface processor<T> {
            (x: T): (a: T) => T;
          }

          export interface plugin<T, F = functionality<T>> {
            (next: F): F;
          }

          export interface reducer<P> {
            (prevFn: P, currFn: P): P;
          }

          export interface decoratePlugin<T> {
            (a: T): plugin<T>;
          }

          export interface fromScratch<T> {
            (fn: functionality<T>): plugin<T>;
          }

          export interface makePlugin<T> {
            (a: T): plugin<T>;
            (fn: functionality<T>): plugin<T>;
          }

          ///////////////////////////////////////
          ///////////////////////////////////////
          ///////////////////////////////////////

          export interface IProcessingNoiz {
            name: string;
          }

          /**
           * ```ts
           * import {
           *   functionality,
           *   plugin,
           *   ProcessingNoiz,
           *   processor,
           * } from "@zionstate/zionbase";
           *
           * type aType = { name: string };
           * const blobProc: processor<aType> = mutator => a => {
           *   a.name = a.name + mutator.name;
           *   return a;
           * };
           *
           * let blob = new ProcessingNoiz(blobProc);
           *
           * let avulc: plugin<aType>,
           *   agirl: plugin<aType>,
           *   scratched: plugin<aType>;
           *
           * const simpleProcessor: functionality<aType> = (
           *   a: aType
           * ) => {
           *   return { name: a.name + "auch" };
           * };
           *
           * avulc = blob.makePlugin({ name: "🌋" });
           * agirl = blob.makePlugin({ name: "🧑" });
           * scratched = blob.makePlugin(simpleProcessor);
           *
           * const res3 = blob
           *   .use(avulc)
           *   .use(agirl)
           *   .use(scratched)
           *   .process({ name: "santa-" });
           * console.log(res3);
           *
           * // yelds { name: 'santa-🌋🧑auch' }
           * ```
           */
          export interface ProcessingNoiz<
            T = unknown,
            F extends functionality<T> = functionality<T>,
            P extends plugin<T, F> = plugin<T, F>,
            Proc extends processor<T> = processor<T>
          > {
            use(next: P): this;
            proc: processor<T>;
            makePlugin: makePlugin<T>;
          }
          export class ProcessingNoiz<
            T = unknown,
            F extends functionality<T> = functionality<T>,
            P extends plugin<T, F> = plugin<T, F>
          > {
            #processors: P[] = [];

            #init?: functionality<T> = (a: T): T => a;

            #reducer: reducer<P> = (prev, curr) =>
              ((next: F) => curr(prev(next))) as P;

            #decorate: decoratePlugin<T> = x => {
              return next => {
                return a => {
                  a = next(a);
                  a = this.proc(x)(a);
                  return a;
                };
              };
            };

            #fromScratch: fromScratch<T> = (fn: functionality<T>) => {
              return (next: functionality<T>) => {
                return (a: T) => {
                  a = next(a);
                  a = fn(a);
                  return a;
                };
              };
            };

            constructor(proc: processor<T>) {
              this.proc = proc;
            }

            use(next: P) {
              this.#processors.push(next);
              return this;
            }

            process(value: T) {
              if (!this.#init) throw new Error("no init");
              return this.#processors.reduce(this.#reducer)(this.#init as F)(
                value
              );
            }
            makePlugin: makePlugin<T> = (a: T | functionality<T>) => {
              if (typeof a === "function") {
                return this.#fromScratch(a as functionality<T>);
              } else {
                return this.#decorate(a);
              }
            };
          }

          export type ProcessingNoizCtor<T = unknown> = {
            new (proc: processor<T>): ProcessingNoiz;
          };

          export const ProcessingNoizCtor: ProcessingNoizCtor = ProcessingNoiz;
        }
      }
    }
  }

  export namespace MyArray {
    export interface IArray_v1 {
      name: string;
    }

    export interface Array_v1 {
      name: string;
    }

    export class Array_v1 implements IArray_v1 {
      constructor(name: string) {
        this.name = name;
      }
    }

    export type Array_v1Ctor = {
      new (name: string): Array_v1;
    };

    export namespace lib {
      export namespace find {
        export interface find1<T, L extends object, K> {
          key: string;
          constructor: T;
          parameter: string;
          parsed: L;
          instance: K;
          callback: string;
        }

        export function find_v1<T, N, L, K>(
          key: string,
          constructor: T,
          parameter: string,
          parsed: L,
          instance: K,
          callback: string
        ): void;
        export function find_v1<T, N, L, K>(
          key: string,
          constructor: T,
          parameter: string,
          parsed: L,
          instance: K,
          callback: string,
          paramToParse: string
        ): void;
        export function find_v1<T, N, L, K>(
          key: string,
          constructor: T,
          parameter: string,
          parsed: L,
          instance: K,
          callback: string,
          paramToParse?: string
        ): void {
          // @ts-expect-error
          if (parsed[parameter])
            // @ts-expect-error
            parsed[parameter].map(parsedParam => {
              // @ts-expect-error
              let res: N | undefined = constructor[parameter].find(
                // @ts-expect-error
                item => item[key] === parsedParam
              );
              // @ts-expect-error
              if (res) instance[callback](res);
            });
          if (paramToParse !== undefined) {
            // @ts-expect-error
            let res: N | undefined = constructor[parameter].find(
              // @ts-expect-error
              item => item[key] === parsed[paramToParse]
            );
            // @ts-expect-error
            if (res) instance[callback](res);
          }
        }
      }
      export namespace add {
        export function add_v1Path(
          this: string[],
          fileInFolder: { name: string; path: string }
        ) {
          this.push(fileInFolder.path);
        }

        export type Parameter = string;
        export type Key = string;

        export function add_v1<T>(
          obj1: unknown,
          key: string,
          obj: unknown,
          parameter: string
        ): T;
        export function add_v1<T>(
          obj1: T,
          key: string,
          obj: unknown,
          parameter: string,
          map: boolean
        ): T;
        export function add_v1<T>(
          obj1: T,
          key: string,
          obj: unknown,
          parameter: string,
          map: boolean,
          path: string[]
        ): T;
        export function add_v1<T>(
          obj1: T,
          key: string,
          obj: unknown,
          parameter: string,
          map?: boolean,
          path?: string[]
        ): T {
          if (!map && !path) {
            // TODO solito errore ts index
            //@ts-expect-error
            obj1[key] = obj[parameter];
          } else if (!map) {
            // TODO solito errore ts index
            //@ts-expect-error
            if (obj[parameter]) obj1[key] = obj[path[0]][path[1]];
          }
          return obj1;
        }
      }
    }
  }
}
