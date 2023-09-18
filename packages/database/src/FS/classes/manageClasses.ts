import {
  readdirSync,
  existsSync,
  Dirent,
  writeFileSync,
  readFileSync,
} from "fs";
import { join, basename } from "path";
import {
  inflate as zlibinflate,
  deflate as zlibdeflate,
} from "zlib";

///// functions

function PATH() {
  return "/Users/WAW/Documents/Projects/noiz-network-state/packages/ui/src/HTML/React/classes";
}

// check if folder exists
function checkFolder(path: string) {
  return existsSync(path);
}

// reads all directories in folder
function readDirs(
  path: string,
  options?: { onlyFolders: true }
): Dirent[] | null;
function readDirs(
  path: string,
  options?: { onlyFolders?: boolean }
) {
  if (checkFolder(path)) {
    let res = readdirSync(path, { withFileTypes: true });
    if (options) {
      return res.filter(e => e.isDirectory());
    } else return res;
  } else return null;
}

interface checkChildrenNode {
  (dir: FSEntity): string[] | null;
}
const checkChildrenNode: checkChildrenNode = function (
  dir
) {
  if (dir.children) return dir.children;
  else return null;
};

/// graph

function getNode(this: FileSystemTree, name: string) {
  let node = this.nodes.get(name);
  if (node) return node;
  else return null;
}
function writeFile(this: FileSystemTree) {
  if (this.root) {
    const path = join(this.root.path, "test.txt");
    process.stdout.write("file written..\n");
    writeFileSync(path, "test");
  }
  return this;
}
function addNode(this: FileSystemTree, node: FSEntity) {
  if (node.type === "root") this.root = node;
  if (node.type === "file") this.files.push(node);
  else this.folders.push(node);
  if (node.value && node.value.name)
    this.nodes.set(node.value.name, node);
  this.nodes.set(node.name, node);
}

/// node

function setKind(this: FSEntity, kind: FSEntity["kind"]) {
  this.kind = kind;
  return this;
}
function setIsDone(this: FSEntity, isDone: boolean) {
  if (this.value) this.value = { ...this.value, isDone };
  else this.value = { isDone };
}
function setNote(this: FSEntity, text: string) {
  let note = { date: new Date(), text };
  if (this.value) {
    if (!this.value.notes) {
      this.value.notes = [];
    }
    this.value.notes.push(note);
  } else {
    this.value = { notes: [note] };
  }
}
function hasNoizConfig(this: FSEntity) {
  if (this.type === "folder") {
    return this.children?.some(c => c === ".noiz");
  }
  return this;
}

/// manager

// fatto
async function inflate(buffer: Buffer) {
  return new Promise<Buffer>((res, rej) => {
    zlibinflate(buffer, (e, response) => {
      if (e) throw rej(e.message);
      else {
        res(response);
      }
    });
  });
}
// fatto
async function deflate(buffer: Buffer) {
  return new Promise<Buffer>((res, rej) => {
    zlibdeflate(buffer, (e, response) => {
      if (e) throw rej(e.message);
      res(response);
    });
  });
}
// fatto
function encode(string: string) {
  let buffer = Buffer.from(string);
  return buffer.toString("base64");
}
// fatto
function decode(buffer: Buffer) {
  return Buffer.from(
    buffer.toString("utf8"),
    "base64"
  ).toString();
}

// async function loadFile(path: string) {
//   let cond = existsSync(path);
//   if (cond) {
//     // load file
//     let buffer = Manager.read(path);
//     // return inflated
//     return buffer;
//   } else throw new Error("file doesn't exist");
// }
function write(path: string, buffer: Buffer): 1 | 0 {
  try {
    writeFileSync(path, buffer);
    return 1;
  } catch (error: any) {
    process.stderr.write(error.message + "\n");
    return 0;
  }
}
function read(path: string): Buffer {
  return readFileSync(path);
}
const makeNode =
  (graph: FileSystemTree) => (n: FSEntity) => {
    let node = new FSEntity(n);
    if (n.kind) node.kind = n.kind;
    if (n.value) {
      node.value = n.value;
      if (!n.value.name) n.value.name = n.name;
      if (!n.value.path) n.value.path = n.path;
    } else {
      node.value = { name: n.name, path: n.path };
    }
    graph.addNode(node);
  };

async function start(this: Manager) {
  let path = join(this.path, this.filename);
  try {
    // read
    let buffer = readFileSync(path);
    process.stdout.write(
      "config file exists, proceeding..\n"
    );
    // uncompress
    let uncompress = await Manager.inflate(buffer);
    // decode
    let json = Manager.decode(uncompress);
    // parse
    let nodes: FSEntity[] = JSON.parse(json);
    // recreate nodes
    let graph = new FileSystemTree();
    nodes.forEach(makeNode(graph));
    this.graph = graph;
    return graph;
  } catch (error: any) {
    // no file in
    process.stderr.write(error.message + "\n");
    // create a graph from path
    let graph = makeGraph(this.path);
    this.graph = graph;
    return graph;
  }
}
async function save(this: Manager): Promise<Manager> {
  let array = Array.from(this.graph.nodes.values());
  // stringify
  let string = JSON.stringify(array);
  // encode
  let encoded = Manager.encode(string);
  // compress
  let compressed = await Manager.deflate(
    Buffer.from(encoded)
  );
  // write
  Manager.write(
    join(this.path, this.filename),
    compressed
  );
  return this;
}

/// algo
const cb =
  (
    parentPath: string,
    current: FSEntity,
    parentName: string,
    queue: FSEntity[],
    graph: FileSystemTree
  ) =>
  (c: Dirent) => {
    let childPath = join(parentPath, c.name);
    let _children;
    _children;
    let node: FSEntity;
    try {
      _children = readDirs(childPath);
      node = new FSEntity({
        children: [],
        value: {
          name: c.name,
          path: join(current?.path!, c.name),
        },
        name: c.name,
        path: join(current?.path!, c.name),
        parent: parentName,
        type: "folder",
      });
    } catch (error) {
      let name;
      let cond1 = c.name === "index.ts";
      let cond2 = c.name === ".noiz";
      if (cond1 || cond2) {
        name = `${current?.name}/${c.name}`;
      } else {
        name = c.name;
      }
      node = new FSEntity({
        children: null,
        name: name,
        parent: parentName,
        value: {
          name: c.name,
          path: join(current?.path!, c.name),
        },
        path: join(current?.path!, c.name),
        type: "file",
      });
    }
    queue.push(node);
    graph.addNode(node);
    return node;
  };

const processor = (
  current: FSEntity,
  queue: FSEntity[],
  graph: FileSystemTree
) => {
  let parentName = current.name;
  let parentPath = current.path;
  if (
    current.type === "folder" ||
    current.type === "root"
  ) {
    let children = readDirs(current.path);
    if (children) {
      let node_children = children.map(
        cb(parentPath, current, parentName, queue, graph)
      );
      // substitute children in current
      current.children = node_children.map(c => c.name);
    } else {
      current.children = null;
    }
  } else current.children = null;
};

function makeGraph(root: string) {
  // program
  // create Graph
  let graph = new FileSystemTree();
  // create Root
  let root_node = new FSEntity({
    children: [],
    parent: null,
    type: "root",
    name: basename(root),
    path: root,
  });
  // add to graph
  graph.addNode(root_node);
  let queue: FSEntity[] = [root_node];
  // create new object
  while (queue.length) {
    let current = queue.shift();
    if (current) processor(current, queue, graph);
    else throw new Error("there was an error");
  }
  return graph;
}

///// CLASSES

abstract class Graph {
  abstract type: string;
  nodes: Map<string, FSEntity> = new Map();
}

abstract class Tree extends Graph {
  root?: FSEntity;
}

abstract class TreeNode<T> {
  abstract children: T;
}
TreeNode;

class FileSystemTree extends Tree {
  type: string = "tree";
  files: FSEntity[] = [];
  folders: FSEntity[] = [];
  getNode = getNode;
  writeFile = writeFile;
  addNode = addNode;
}

abstract class Node<V> {
  abstract type: string;
  abstract kind: string;
  abstract value: V;
}
Node;

interface INode {
  name: string;
  path: string;
  type: "root" | "folder" | "file";
  parent: string | null;
  children: string[] | null;
  kind?: "client" | "server";
  value?: FSEntityValue;
}

interface FSEntityValue {
  name?: string;
  path?: string;
  notes?: { date: Date; text: string }[];
  isDone?: boolean;
}

interface FSEntity {
  name: string;
  path: string;
  type: "root" | "folder" | "file";
  parent: string | null;
  children: string[] | null;
  kind?: "client" | "server";
  value?: FSEntityValue;
}

class FSEntity {
  constructor(props: INode) {
    this.children = props.children;
    this.parent = props.parent;
    this.type = props.type;
    this.name = props.name;
    this.path = props.path;
  }
  setKind = setKind;
  setIsDone = setIsDone;
  setNote = setNote;
  hasNoizConfig = hasNoizConfig;
}

interface Manager {
  graph: FileSystemTree;
  path: string;
}

class Manager {
  protected filename: ".folderManager" = ".folderManager";
  cached: boolean = false;
  static inflate = inflate;
  static deflate = deflate;
  static encode = encode;
  static decode = decode;
  // static loadFile = loadFile;
  static write = write;
  static read = read;
  constructor(path: string) {
    let cond = existsSync(path);
    if (cond) {
      this.path = path;
    } else throw new Error("folder doesn't exist");
  }
  start = start;
  save = save;
}

// .load manageClasses.ts
let manager = new Manager(PATH());
manager;
