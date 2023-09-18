import { filesSubSorts } from "../FolderContent";
import { Rule } from "../Rule";
import { SrcCodeNode } from "../SrcCodeNode";
import { SrcCodeRulesTree } from "../SrcCodeRulesTree";
import { Git } from "../../../ZaionGit";

interface SortsObject {
  [k: string]: filesSubSorts[] | null;
}

interface checkLibArguments {
  addToModules: boolean;
  sort: filesSubSorts[] | undefined;
  sorts: typeof filesSubSorts;
}

enum errors {
  noSubtype = "no subtype in node",
  noNodeName = "no node with that name",
  noNode = "no node",
  notRoot = "not root path, try ./",
  notFilePath = "this path is a file",
}

export interface SrcCodeGraph {
  addNode(node: SrcCodeNode): this;
  getNode(value: string): SrcCodeNode;
  listNodes(): string[];
  connectNodes(
    parent: SrcCodeNode,
    child: SrcCodeNode
  ): this;
  getNodeChildren(node: string): string[] | null;
  /**
   *
   * @param path
   * @returns a tuple which contains:
   * 1. an array of tuples or undefined:
   *  1. the string name of the node
   *  2. the actual srcCode node
   *     if undefined it means that the level of the path
   *     has not et any criteria to define it's actual type
   * 2. an object which is used to create the content of the
   *    .noiz file.
   * 3. an array with the modules/folders which didn't meet
   *    any criteria.
   */
  testPath(path: string): [
    ([string, SrcCodeNode] | undefined)[] | null,
    {
      type: "file" | "folder";
      subType: "index" | "module" | "container";
      sort?: filesSubSorts[];
    } | null,
    string[]
  ];
}

export class SrcCodeGraph {
  static errors = errors;
  static sortsObject: SortsObject = {
    src: null,
    components: [
      SrcCodeNode.FolderContent.filesSubSorts.component,
    ],
    classes: [
      SrcCodeNode.FolderContent.filesSubSorts.class,
    ],
    lib: [
      SrcCodeNode.FolderContent.filesSubSorts.styled,
      SrcCodeNode.FolderContent.filesSubSorts.function,
    ],
  };
  static commonSorts = [
    SrcCodeNode.FolderContent.filesSubSorts.function,
    SrcCodeNode.FolderContent.filesSubSorts.class,
    SrcCodeNode.FolderContent.filesSubSorts.component,
  ];
  static git = new Git();
  static isDir(path: string) {
    let root = SrcCodeGraph.git.getBaseDir();
    let cwd = process.cwd();
    let isRoot = root === cwd;
    let result: boolean;
    if (isRoot) {
      result = SrcCodeGraph.git.isDirectory(path);
    } else {
      process.chdir(root);
      result = SrcCodeGraph.git.isDirectory(path);
      process.chdir(cwd);
    }
    return result;
  }
  static checkLibArgsDefault: checkLibArguments = {
    addToModules: false,
    sort: undefined,
    sorts: SrcCodeNode.FolderContent.filesSubSorts,
  };
  #lookup: Map<string, SrcCodeNode>;
  #nodes: SrcCodeNode[];
  #tree: SrcCodeRulesTree;
  #edges: Map<string, string[]>;
  #rules: { [k: string]: { [k: string]: Rule } };
  get tree() {
    if (this.#lookup.size > 0) {
      console.log("building tree..");
      this.#buildtree();
    } else {
      console.log("lookup table is empty");
      return new SrcCodeRulesTree();
    }
    return this.#tree;
  }
  get rules() {
    return this.#rules;
  }
  #buildtree(): SrcCodeRulesTree {
    console.log("in the making");

    // Creiamo una mappa vuota per contenere i sottoalberi
    const subtreeMap = new Map<
      SrcCodeNode["value"],
      SrcCodeRulesTree
    >();

    // Definiamo una funzione ricorsiva per costruire i sottoalberi
    const buildSubtree = (
      node: SrcCodeNode
    ): SrcCodeRulesTree => {
      // Se il sottoalbero per il nodo corrente è già stato costruito in precedenza, lo restituiamo
      if (subtreeMap.has(node.value)) {
        return subtreeMap.get(node.value)!;
      }

      // Creiamo un nuovo sottoalbero vuoto per il nodo corrente
      const subtree: SrcCodeRulesTree = {};

      // Se il nodo corrente ha figli, costruiamo i sottoalberi per i figli e li aggiungiamo come figli del sottoalbero corrente
      const childValues = this.#edges.get(node.value);
      if (childValues) {
        for (const childValue of childValues) {
          const childNode = this.#lookup.get(childValue)!;
          const childSubtree = buildSubtree(childNode);
          subtree[childValue] = childSubtree;
        }
      }

      // Aggiungiamo il sottoalbero per il nodo corrente alla mappa
      subtreeMap.set(node.value, subtree);

      // Restituiamo il sottoalbero per il nodo corrente
      return subtree;
    };

    // Costruiamo i sottoalberi per tutti i nodi del grafo
    for (const node of this.#nodes) {
      buildSubtree(node);
    }

    // Restituiamo il sottoalbero per la radice del grafo
    let tree = subtreeMap.get(this.#nodes[0].value);
    this.#tree = tree || {};
    return subtreeMap.get(this.#nodes[0].value) || {};
  }
  constructor() {
    this.#nodes = [];
    this.#edges = new Map();
    this.#tree = new SrcCodeRulesTree();
    this.#rules = {};
    this.#lookup = new Map();
    this.addNode = function (node: SrcCodeNode) {
      this.#lookup.set(node.value, node);
      this.#nodes.push(node);
      let obj: { [k: string]: { [k: string]: Rule } } = {
        ...this.#rules,
      };
      if (node.rule.subType) {
        if (!obj[node.rule.subType]) {
          obj[node.rule.subType] = {};
        }
        obj[node.rule.subType][node.value] = node.rule;
      }
      this.#rules = obj;
      return this;
    };
    this.connectNodes = function (
      parent: SrcCodeNode,
      child: SrcCodeNode
    ) {
      let newValues: string[] = [];
      let prevValues = this.#edges.get(parent.value);
      if (prevValues) newValues = [...prevValues];
      newValues.push(child.value);
      this.#edges.set(parent.value, newValues);
      return this;
    };
    this.getNode = function (value: string): SrcCodeNode {
      let result = this.#nodes.find(
        n => n.value === value
      );
      if (!result)
        throw new Error(SrcCodeGraph.errors.noNodeName);

      return result;
    };
    this.listNodes = function () {
      return this.#nodes.map(n => n.value);
    };
    this.getNodeChildren = function (node: string) {
      let children = this.#edges.get(node);
      if (children?.length) return children;
      else return null;
    };
    this.testPath = function (path: string) {
      const {
        errors: { notRoot, notFilePath },
        isDir,
      } = SrcCodeGraph;
      let levels = path.split("/");
      let modules: string[] = [];
      let addToModules = true;
      if (levels[0] !== ".") throw new Error(notRoot);
      if (levels[levels.length - 1].includes(".")) {
        if (!isDir(path)) throw new Error(notFilePath);
      }
      levels.shift();
      if (levels.length === 0) levels.push(".");
      const {
        FolderContent: { filesSubSorts },
      } = SrcCodeNode;
      const { ruleTypes, ruleSubType } = Rule;
      let node: SrcCodeNode | null = null;
      let type: keyof typeof ruleTypes = "folder";
      let subType: keyof typeof ruleSubType = "container";
      let sort: filesSubSorts[] | undefined;
      let sorts = filesSubSorts;
      let makePtchdObj = {
        node,
        addToModules,
        sort,
        sorts,
        type,
        subType,
        modules,
      };
      let makePatchedCb = this.#makePatched(makePtchdObj);
      let patched = levels.map(makePatchedCb);
      if (patched[patched.length - 1] === undefined)
        sort = undefined;
      if (subType === "container") sort = undefined;
      if (patched[0]![0] === "apps") {
        const { sortsObject, commonSorts } = SrcCodeGraph;
        let lastNodeName = patched[patched.length - 1]![0];
        let sel = sortsObject[lastNodeName as string];
        if (sel === null) sort = undefined;
        else if (sel === undefined) sort = commonSorts;
        else sort = sel;
      }
      return [
        patched as [string, SrcCodeNode][],
        { type, subType, sort },
        modules,
      ];
    };
  }

  #checkLib({
    addToModules,
    sort,
    sorts,
  }: {
    addToModules: boolean;
    sort: filesSubSorts[] | undefined;
    sorts: typeof filesSubSorts;
  }) {
    {
      addToModules = false;
      sort = [sorts.function, sorts.instance];
    }
    return { addToModules, sort };
  }

  #checkSrc(i: number, l: string) {
    if (i > 2) l = "src_in_entrypoint_src";
    return l;
  }

  #isPlaceholder(string: string) {
    const regex = /^<.*?>$/;
    return regex.test(string);
  }
  #hasPlaceholder(strings: string[]) {
    return strings
      .map(this.#isPlaceholder)
      .some(v => v === true);
  }
  #makePatched({
    addToModules,
    modules,
    node,
    sort,
    sorts,
    subType,
    type,
  }: {
    node: any;
    addToModules: any;
    sort: any;
    sorts: any;
    type: any;
    subType: any;
    modules: any;
  }) {
    return (l: string, i: number) => {
      const { errors, checkLibArgsDefault } = SrcCodeGraph;
      const { noNode, noSubtype } = errors;
      try {
        if (l === "src") l = this.#checkSrc(i, l);
        let _node = this.getNode(l);
        node = _node;
        let obj: checkLibArguments = checkLibArgsDefault;
        obj.addToModules = addToModules;
        obj.sort = sort;
        obj.sorts = sorts;
        let _subType = node.rule.subType;
        if (!_subType) throw new Error(noSubtype);
        type = node.rule.type;
        subType = _subType;
        sort = [sorts.class];
        if (node.value === "lib")
          ({ addToModules, sort } = this.#checkLib(obj));
        if (node.value === "src_in_entrypoint_src")
          sort = undefined;
        return [l, _node];
      } catch (error) {
        if (addToModules) modules.push(l);
        if (node === null) throw new Error(noNode);
        let isSrc = node!.value === "src";
        if (isSrc) {
          let nodetype = "<entrypoint-source>";
          let module = this.getNode(nodetype);
          return [l, module];
        } else return [l, node];
      }
    };
  }
}
