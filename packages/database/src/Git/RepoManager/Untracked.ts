// @ts-nocheck
import { execSync } from "child_process";
import { lstatSync, existsSync } from "fs";
import { FileSystemNode } from "./Graph/extensions/Node/extensions/FileSystem/FileSystemNode.type";
export class Untracked extends FileSystemNode {
  kind: "folder" | "file";
  children: Untracked[];
  COMMITTED = "committed" as const;

  constructor(
    public value: { name: string; path: string },
    public parent?: Untracked | null
  ) {
    super("untracked", value, parent);
    this.type = "untracked";
    this.value = value;
    this.parent = parent;
    this.children = [];

    const stats = lstatSync(this.value.path);
    if (stats.isDirectory()) {
      this.kind = "folder";
    } else {
      this.kind = "file";
    }
  }

  get branch() {
    return execSync(`git rev-parse --abbrev-ref HEAD`);
  }

  traverse(callback: (node: Untracked) => void) {
    callback(this);
    if (this.children) {
      this.children.forEach(child =>
        child.traverse(callback)
      );
    }
  }

  find(name: string): Untracked | null {
    if (this.value.name === name) {
      return this;
    }

    for (const child of this.children) {
      const found = child.find(name);
      if (found) {
        return found;
      }
    }

    return null;
  }

  findAll(name: string) {
    let result: Untracked[] = [];
    if (this.value.name === name) {
      result.push(this);
    }
    this.children.forEach(child => {
      result = result.concat(child.findAll(name));
    });
    return result;
  }

  unstage() {
    if (this.kind === "staged") {
      execSync(`git reset ${this.value.path}`);
      this.kind = "untracked";
      console.log(`unstaged file: ${this.value.path}`);
    } else console.log("can't unstage a not staged file");
  }

  stage() {
    if (!(this.kind === "folder")) {
      execSync(`git add ${this.value.path}`);
      this.kind = "staged";
      console.log(`staged file: ${this.value.path}`);
    } else return "this node can't be staged directly";
  }

  createCommitMessage(message: string) {
    if (message) return message;
    else return "default message";
  }

  uncommit() {
    if (this.kind === this.COMMITTED) {
      let response = execSync(`git reset HEAD~1`);
      let messages = response
        .toString("utf-8")
        .split("\n");
      this.kind = "untracked";
      messages.forEach(t => console.log(t));
    } else
      console.log("cannot uncommit not commited files");
  }

  commit(message: string) {
    if (!(this.kind === "staged")) {
      console.log("can only commit staged files");
    } else {
      let commitmessage =
        this.createCommitMessage(message);
      execSync(
        `git commit ${this.value.path} -m '${commitmessage}'`
      );
      this.kind = this.COMMITTED;
      console.log(`commited file: ${this.value.path}`);
    }
  }

  tag() {
    let stringToDelete;
    let stringWhichSubstitutes;
    if (this.kind === this.COMMITTED) {
      // can tag
      if (this.isPackage()) {
        let repopack = this.detectPackage();
        stringToDelete = `./packages/${repopack}/`;
        stringWhichSubstitutes = `${repopack}/`;
        if (this.isSrc()) {
          // if the file is in the src folder, add src
          stringToDelete = `${stringToDelete}src/`;
        } else {
          // if file is not, just delete the package path
          stringToDelete = `${stringToDelete}/`;
        }
      } else {
        return this.value.path;
      }
      return this.value.path.replace(
        stringToDelete,
        stringWhichSubstitutes
      );
    } else {
      console.log("this node cannot be tagged");
    }
  }
  status() {
    let response;
    if (this.kind === "folder") {
      response = execSync(
        `git status ${this.value.path}/`
      );
    } else if (this.kind === "file") {
      response = execSync(
        `git status -s ${this.parent?.value.path}/`
      );
    }
    return response?.toString("utf-8").trim().split("\n");
  }
  // this shall go in a monorepo
  isPackagesFolder() {
    return this.value.path === "./packages";
  }
  isAppsFolder() {
    return this.value.path === "./apps";
  }
  isPackage() {
    return this.value.path.includes("packages/");
  }
  isApp() {
    return this.value.path.includes("apps/");
  }
  isSrc() {
    return this.value.path.includes("src/");
  }
  hasREADME() {
    return existsSync(this.value.path + "/README");
  }
  createREADME() {
    if (this.kind === "folder") {
      execSync(`touch ${this.value.path}/README`);
    } else return "this node is not a folder";
  }
  detectPackage() {
    if (this.isPackage()) {
      let PACKAGE = "./packages/";
      let basepath = this.value.path.replace(PACKAGE, "");
      let splitted = basepath.split("/");
      return splitted[0];
    } else {
      return "This node is not a package.";
    }
  }
  createTag() {
    // checks if checkout is on parent
    // check if its an update or a new file
    // stage
    // commit
    //
  }
}

// NewNode = Untracked;
// restart();
// packages = r.children[12];
// database = packages.children[0];
// packjson = database.children[11];
// rootpackjson = r.children[11];

// Eseguire il comando "git ls-files -o --exclude-standard" con una dimensione massima del buffer di 10 MB

// const untracked = execSync(
//   "git ls-files -o --exclude-standard",
//   { maxBuffer: 10 * 1024 * 1024 }
// )
//   .toString()
//   .trim()
//   .split("\n");

// Leggere solo i file dalla cartella corrente

// // Creare un albero che rappresenta i file non tracciati
// const root = new NewNode({ name: ".", path: "." }, null);

// function buildTree(_untracked, _root) {
//   return _untracked.forEach(file => {
//     const parts = file.split("/");
//     let node = _root;
//     parts.forEach(part => {
//       let child = node.children.find(
//         child => child.value.name === part
//       );
//       if (!child) {
//         const value = {
//           name: part,
//           path: node.value.path + "/" + part,
//         };
//         child = new NewNode(value, node);
//         node.children.push(child);
//       }
//       node = child;
//     });
//   });
// }

// Visualizzare l'albero come stringa
// function printTree(node, indent = "") {
//   let output = "";
//   const isRoot = node.parent === null;
//   const isLast =
//     isRoot ||
//     node ===
//       node.parent.children[
//         node.parent.children.length - 1
//       ];
//   output += `${indent}${
//     isRoot ? "" : isLast ? "└─" : "├─"
//   } ${node.value.name}\n`;
//   node.children.forEach((child, index) => {
//     output += printTree(
//       child,
//       `${indent}${isRoot ? "" : isLast ? "  " : "│ "}  `
//     );
//   });
//   return output;
// }

// console.log(printTree(root));

// files = fs
//   .readdirSync(".", { withFileTypes: true })
//   .filter(dirent => dirent.isFile())
//   .map(
//     dirent =>
//       new NewNode(
//         { name: dirent.name, path: dirent.name },
//         null
//       )
//   );

// //// helpers

// function initializeRoot() {
//   return new NewNode({ name: ".", path: "." }, null);
// }

// function restart() {
//   r = initializeRoot();
//   return buildTree(u, r);
// }
