import { zionUtil } from '../../../telegram-bots/Classes/Utils';

class Node {
  static #nodes = [];
  #name;
  #path;
  #level;
  #children = [];
  constructor(name, path, level, children = []) {
    this.#name = name;
    this.#path = path;
    this.#level = level;
    this.#children = children;
    this.#nodes.push(this);
  }
  static get nodes() {
    return this.#nodes;
  }
  get name() {
    return this.#name;
  }
  get path() {
    return this.#path;
  }
  get level() {
    return this.#level;
  }
  get children() {
    return this.#children;
  }
  set name(name) {
    return (this.#name = name);
  }
  set path(path) {
    return (this.#path = path);
  }
  set level(level) {
    return (this.#level = level);
  }
  set children(children = []) {
    children.forEach((child) => {
      this.#children.push(new ChildNode(child));
    });
  }
}

class RootNode extends Node {
  constructor(name, path, children, root) {
    super(name, path, 0, children);
    this.root = root;
  }
}

class ChildNode extends Node {
  #childNodes = [];
  constructor(name, path, level, children, parent) {
    super(name, path, level, children);
    this.parent = parent;
  }
}

export class Tree {
  constructor() {}
  static buildTree(
    name,
    path,
    level,
    children = [],
    rootPath
  ) {
    // let _types = ['Folder', 'File'];
    let root = new RootNode(
      name,
      path,
      level,
      children,
      rootPath
    );
    const stack = [root];
    // https://en.wikipedia.org/wiki/Depth-first_search
    // Depth-first search aka DFS
    while (stack.length) {
      let currentNode = stack.pop();
      if (currentNode) {
        let { children } = currentNode;
        zionUtil.popFirst(children);
        for (let child of children) {
          let childPath = `${currentNode.path}/${child.name}`;
          let childNode = new ChildNode(
            currentNode.name,
            childPath,
            level,
            children,
            currentNode.name
          );
          let parent = Node.nodes.find(
            (node) => node.name === childNode.parent
          );
          let level = parent.level;
          level++;
          childNode.level = level;
          stack.push(childNode);
        }
      }
    }
    return root;
  }
}
