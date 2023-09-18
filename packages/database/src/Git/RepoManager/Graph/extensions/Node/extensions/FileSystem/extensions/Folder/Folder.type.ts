import { FileSystemNode as FileSystemNodeType } from "../../FileSystemNode.type";
import { FileSystemNodeValue } from "../../FileSystemNode.type";
import { FileSystemNode } from "../../FileSystemNode";
import {
  filesSubSorts,
  FolderContent,
  originFiles,
} from "../../../../../../../Rules/FolderContent";
import { SrcCodeNode } from "../../../../../../../Rules/SrcCodeNode";

export interface FolderValue extends FileSystemNodeValue {}

// TODO
// 1. [x] fare hasTodo()
// 2. [x] fare createTodo()
// 3. fare commitChanges
//    1. buildtag/commitname
//      1. [x] fare tuple [folder senza noiz,firstFile]
//      2. delete self
//    2. [x] stage
//    3. [x] commitInit
//    4. [x] commitFilesInFolder
//    5. [x] commitFirstFolder
//    6. stage
// 4. fare merge

interface Noiz {
  type: "folder" | "file";
  subType: "index" | "module" | "container";
  kind?: filesSubSorts[];
  lastVersion: string;
  creationDate: Date;
  updateDate: Date;
}

export interface CommonFolderType {
  isPackagesFolder(): boolean;
  isAppsFolder(): boolean;
  hasREADME(): boolean;
  hasNoiz(): boolean;
  hasTodo(): boolean;
  createREADME(): "this node is not a folder" | undefined;
  createTODO(): "this node is not a folder" | undefined;
  readNoiz():
    | Noiz
    | "no .noiz file in this folder"
    | "empty";
}

export abstract class Folder
  extends FileSystemNode
  implements CommonFolderType, FileSystemNodeType
{
  static originFiles = FolderContent.originFiles;
  kind: "file" | "folder" = "folder";
  #createFile(file: keyof typeof originFiles) {
    let kind = this.kind;
    let value = this.value;
    let filename = Folder.originFiles[file];
    let command = `touch ${value.path}/${filename}`;
    return function () {
      const cwd = Folder.cwd;
      const root = Folder.root;
      const condition = cwd === root;
      if (!condition) {
        if (kind === "folder") {
          process.chdir(root);
          Folder.execSync(command, {
            cwd: root,
          });
          process.chdir(cwd);
        } else return "this node is not a folder";
      } else {
        if (kind === "folder") {
          Folder.execSync(command);
        } else return "this node is not a folder";
      }
    };
  }
  createREADME = this.#createFile("readme");
  createTODO = this.#createFile("todo");

  isAppsFolder() {
    return this.value.path === "./apps";
  }

  isPackagesFolder() {
    return this.value.path === "./packages";
  }

  #readWritePreCondition = (): [
    boolean,
    string,
    string
  ] => {
    const cwd = Folder.cwd;
    const root = Folder.root;
    const condition = cwd === root;
    return [condition, root, cwd];
  };

  #formatDate(dateString: String) {
    const months = {
      Gen: 0,
      Feb: 1,
      Mar: 2,
      Apr: 3,
      Mag: 4,
      Giu: 5,
      Lug: 6,
      Ago: 7,
      Set: 8,
      Ott: 9,
      Nov: 10,
      Dic: 11,
    };

    const parts = dateString.split(" ");
    const day = parseInt(parts[1]);
    const month = months[parts[2] as keyof typeof months];
    const year = parseInt(parts[3]);
    const timeParts = parts[4].split(":");
    const hour = parseInt(timeParts[0]);
    const minute = parseInt(timeParts[1]);
    const second = parseInt(timeParts[2]);
    const dateObj = new Date(
      year,
      month,
      day,
      hour,
      minute,
      second
    );
    return dateObj;
  }

  #readNoiz(path: string): Noiz | null {
    let type: "folder" | "file",
      subType: "index" | "module",
      kind: filesSubSorts,
      lastVersion: string,
      creationDate: Date,
      updateDate: Date;
    let filecontent = Folder.readFileSync(path).toString();
    if (filecontent === "") {
      return null;
    } else {
      let [
        _type,
        _subType,
        _kind,
        _lastVersion,
        _creationDate,
        _updateDate,
      ] = Folder.readFileSync(path)
        .toString()
        .trim()
        .split("\n");
      type = _type as "folder" | "file";
      subType = _subType as "index" | "module";
      kind = _kind as filesSubSorts;
      lastVersion = _lastVersion;
      creationDate = this.#formatDate(_creationDate);
      updateDate = this.#formatDate(_updateDate);
      return {
        type,
        subType,
        kind: [kind],
        lastVersion,
        creationDate,
        updateDate,
      };
    }
  }

  #hasFile(file: originFiles): () => boolean {
    const readWritePrecondition =
      this.#readWritePreCondition;
    const path = this.value.path;
    return function () {
      const [condition, root, cwd] =
        readWritePrecondition();
      let result: boolean;
      if (!condition) {
        process.chdir(root);
        result = Folder.existsSync(`${path}/${file}`);
        process.chdir(cwd);
      } else {
        result = Folder.existsSync(`${path}/${file}`);
      }
      return result;
    };
  }

  hasNoiz = this.#hasFile(Folder.originFiles.noiz);
  hasREADME = this.#hasFile(Folder.originFiles.readme);
  hasTodo = this.#hasFile(Folder.originFiles.todo);

  readNoiz():
    | Noiz
    | "no .noiz file in this folder"
    | "empty" {
    let condition = this.hasNoiz();
    let noizpath = `${this.value.path}/${Folder.originFiles.noiz}`;
    let result: Noiz;
    if (condition) {
      const [precondition, root, cwd] =
        this.#readWritePreCondition();
      if (precondition) {
        let filecontent = this.#readNoiz(noizpath);
        if (filecontent) {
          result = filecontent;
        } else return "empty";
      } else {
        process.chdir(root);
        let filecontent = this.#readNoiz(noizpath);
        process.chdir(cwd);
        if (filecontent) {
          result = filecontent;
        } else return "empty";
      }
      return result;
    } else {
      return "no .noiz file in this folder";
    }
  }

  #analizeFolder() {
    return Folder.srcCodeGraph.testPath(this.value.path);
  }

  createNoiz() {
    let [_, noizObj] = this.#analizeFolder();
    if (!noizObj) throw new Error("no noizobj");
    let now = new Date();
    let obj: Noiz = {
      type: noizObj.type,
      subType: noizObj.subType,
      kind: noizObj.sort,
      creationDate: now,
      lastVersion: "0.0.1",
      updateDate: now,
    };
    const [precondition, root, cwd] =
      this.#readWritePreCondition();
    let path = `${this.value.path}/${FolderContent.originFiles.noiz}`;
    let file = [
      obj.type,
      obj.subType,
      obj.kind,
      obj.lastVersion,
      obj.creationDate,
      obj.updateDate,
    ]
      .map(e => {
        if (Array.isArray(e)) {
          e = e.toString();
        }
        return e;
      })
      .join("\n");
    console.log(file);
    // if (precondition) {
    //   Folder.writeFileSync(path, file);
    // } else {
    //   process.chdir(root);
    //   Folder.writeFileSync(path, file);
    //   process.chdir(cwd);
    // }
    console.log(".noiz file written to: ", path);
  }

  initialize(): {
    tag: string;
    branch: string;
  } {
    let [nodes, noizObj] = this.#analizeFolder();
    if (nodes) {
      let lastnodeTuple = nodes[nodes.length - 1];
      if (lastnodeTuple) {
        let node = lastnodeTuple[1] as SrcCodeNode;
        let firstfile = node.rule.firstFile;
        let file: "noiz" | "readme" | "todo";
        if (firstfile === ".noiz") {
          file = "noiz";
        } else if (firstfile === "README") {
          file = "readme";
        } else {
          file = "todo";
        }
        let hasFirstFile = this.#hasFile(firstfile)();
        if (!hasFirstFile) {
          // this.#createFile(file);
          console.log(
            `created file: ${this.value.path}/${firstfile}`
          );
        } else {
          console.log("has first file");
        }
        return { tag: "", branch: "" };
      } else {
        throw new Error("no tuple");
      }
    } else {
      throw new Error("no node");
    }
  }
}
