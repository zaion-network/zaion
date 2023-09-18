export class Node {
  children: Node[] = [];
  parents: Node[] | null = null;
  value;
  constructor(
    value: { name: string; path?: string },
    parent: Node | null = null
  ) {
    this.value = value;
    if (parent) {
      this.parents = [];
      if (parent) this.parents.push(parent);
    }
  }
  move(destination: string) {
    let paths = destination.split("/");
    if (!this.parents) return;
    let currentparent = this.parents[0];
    let newparent = this.getRoot();
    if (!newparent) return;
    paths.forEach(p => {
      if (!newparent) return;
      let child = newparent.children.find(
        c => c.value.name === p
      );
      if (!child) return;
      newparent = child;
    });
    newparent.children.push(this);
    let idx = currentparent.children.findIndex(
      c => (c.value.name = this.value.name)
    );
    currentparent.children.splice(idx, 1);
  }
  getRoot = () => {
    function recurse(node: Node): Node | null {
      if (node.parents === null) return node;
      else return recurse(node.parents[0]);
    }
    let root = recurse(this);
    return root;
  };
}

let root = new Node({ name: "root" });
root.children.push(new Node({ name: "a" }, root));
root.children[0].children.push(
  new Node({ name: "b" }, root.children[0])
);
root.children.push(new Node({ name: "c" }, root));
root.getRoot();
root.children[0].children[0].move("c");
