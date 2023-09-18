import EventEmitter from "events";
import { system } from "../../../src/FileSystem";

const { existsSync, joinPaths } = system;

interface Node {}

// interface GitTreeEntry {
//   // Il nome del file o della directory
//   name: string;
//   // Indica se l'oggetto rappresenta un file o una directory
//   isFile: boolean;
//   // L'hash dell'oggetto
//   hash: string;
//   // Un array di figli, se l'oggetto rappresenta una directory
//   children: Array<GitTreeEntry>;
// }

interface Entity extends Node {
  id: string;
  type: "entity";
  kind: "blob" | "folder";
  value: {
    name: string;
    path: string;
    description: string;
  };
  children: Entity[];
}
class Entity {
  constructor(props: Entity["value"]) {
    this.type = "entity";
    this.value = {
      name: props.name,
      path: props.path,
      description: props.description,
    };
  }
}

// interface Blob extends Entity {
//   kind: "blob";
//   moduleType:
//     | "class"
//     | "function"
//     | "component"
//     | "hook"
//     | "styled";
//   value: Entity["value"] & {
//     extension: string;
//     dimension: number;
//   };
// }
// class Blob extends Entity {
//   constructor(props: Entity["value"]) {
//     super(props);
//     this.kind = "blob";
//   }
// }

// interface Folder extends Entity {
//   kind: "folder";
//   folderType:
//     | "index"
//     | "module"
//     | "package"
//     | "app"
//     | "test";
// }

// class Folder extends Entity {
//   constructor(props: Entity["value"]) {
//     super(props);
//     this.kind = "folder";
//   }
// }

// interface Function_Ent extends Blob {
//   moduleType: "function";
// }
// class Function_Ent extends Blob {
//   constructor(props: Entity["value"]) {
//     super(props);
//     this.moduleType = "function";
//   }
// }

// interface Hook extends Blob {
//   modulType: "hook";
// }
// class Hook extends Blob {
//   constructor(props: Entity["value"]) {
//     super(props);
//     this.modulType = "hook";
//   }
// }

// interface Styled extends Blob {
//   modulType: "styled";
// }
// class Styled extends Blob {
//   constructor(props: Entity["value"]) {
//     super(props);
//     this.modulType = "styled";
//   }
// }

// interface Class extends Blob {
//   kind: "blob";
//   modulType: "class";
// }
// class Class {}

// interface Component extends Blob {
//   kind: "blob";
//   modulType: "component";
// }
// class Component extends Blob {
//   constructor(props: Entity["value"]) {
//     super(props);
//   }
// }

interface Package extends Folder {
  folderType: "package";
  packageManger: "npm" | "yarn";
  subModules: Module[];
  addSubModule(module: Module): this;
  ///
  gitignore: string;
  hasGitignore: () => boolean;
  pkgjsonPath: string;
  hasPackageJson: () => boolean;
  pkgLockjsonPath: string;
  hasPackLockJson: () => boolean;
  tsConfigPath: string;
  hasTsConfig: () => boolean;
  eslintrcPath: string;
  hasEsLintrc: () => boolean;
  babelrcPath: string;
  hasBabelrc: () => boolean;
  babelConfigPath: string;
  hasBabelConfig: () => boolean;
  prettierrcPath: string;
  hasPrttrrc: () => boolean;
  readmemdPath: string;
  hasreadmemd: () => boolean;
  READMEPath: string;
  hasREADME: () => boolean;
  LICENSEPath: string;
  hasLICENSE: () => boolean;
  srcPath: string;
  hasSrc: () => boolean;
  testPath: string;
  hasTest: () => boolean;
  binPath: string;
  hasBin: () => boolean;
}
class Package extends Folder {
  #join = (f: string) => joinPaths([this.value.path, f]);
  #gitignore = ".gitignore";
  gitignore = `${this.#join(this.#gitignore)}`;
  hasGitignore = () => existsSync(this.gitignore);
  #pkgJsn = "package.json";
  pkgjsonPath = `${this.#join(this.#pkgJsn)}`;
  hasPackageJson = () => existsSync(this.pkgjsonPath);
  #pkgLockJsn = "package-lock.json";
  pkgLockjsonPath = `${this.#join(this.#pkgLockJsn)}`;
  hasPackLockJson = () => existsSync(this.pkgLockjsonPath);
  #tsConfig = "tsconfig.json";
  tsConfigPath = `${this.#join(this.#tsConfig)}`;
  hasTsConfig = () => existsSync(this.tsConfigPath);
  #eslintrc = ".eslintrc.json";
  eslintrcPath = `${this.#join(this.#eslintrc)}`;
  hasEsLintrc = () => existsSync(this.eslintrcPath);
  #babelrc = ".babelrc";
  babelrcPath = `${this.#join(this.#babelrc)}`;
  hasBabelrc = () => existsSync(this.babelrcPath);
  #babelConfig = "babel.config.json";
  babelConfigPath = `${this.#join(this.#babelConfig)}`;
  hasBabelConfig = () => existsSync(this.babelConfigPath);
  #prettierrc = ".prettierrc";
  prettierrcPath = `${this.#join(this.#prettierrc)}`;
  hasPrttrrc = () => existsSync(this.prettierrcPath);
  #readmemd = "readme.me";
  readmemdPath = `${this.#join(this.#readmemd)}`;
  hasreadmemd = () => existsSync(this.readmemdPath);
  #README = "README";
  READMEPath = `${this.#join(this.#README)}`;
  hasREADME = () => existsSync(this.READMEPath);
  #LICENSE = "LICENSE";
  LICENSEPath = `${this.#join(this.#LICENSE)}`;
  hasLICENSE = () => existsSync(this.LICENSEPath);
  #src = "src";
  srcPath = `${this.#join(this.#src)}`;
  hasSrc = () => existsSync(this.srcPath);
  #test = "test";
  testPath = `${this.#join(this.#test)}`;
  hasTest = () => existsSync(this.testPath);
  #bin = "bin";
  binPath = `${this.#join(this.#bin)}`;
  hasBin = () => existsSync(this.binPath);
  constructor(props: Entity["value"]) {
    super(props);
    this.folderType = "package";
  }
}

// interface Index extends Folder {
//   folderType: "index";
// }
// class Index extends Folder {
//   constructor(props: Entity["value"]) {
//     super(props);
//     this.folderType = "index";
//   }
// }

// interface Module extends Folder {
//   folderType: "module";
//   tests: Test[];
// }
// class Module extends Folder {
//   constructor(props: Entity["value"]) {
//     super(props);
//     this.folderType = "module";
//   }
// }

// interface Test extends Folder {
//   folderType: "test";
//   modules: Module[];
// }
// class Test extends Folder {
//   constructor(props: Entity["value"]) {
//     super(props);
//   }
// }

// interface App extends Folder {
//   framework: "next" | "astro";
//   folderType: "app";
//   appType: "web" | "server" | "worker";
// }
// class App extends Folder {
//   constructor(props: Entity["value"]) {
//     super(props);
//     this.folderType = "app";
//   }
// }

// interface NextApp extends App {
//   framework: "next";
// }
// class NextApp extends App {
//   constructor(props: Entity["value"]) {
//     super(props);
//     this.framework = "next";
//   }
// }

interface Tree {
  commit: string;
  entities: App | Package | Index | Blob | Module | Test[];
}
class Tree {}

type commitHash = string;

export interface Repo_v3 extends EventEmitter {
  type: "repo";
  kind: "mono" | "single";
  value: {
    name: string;
    url: string;
    commits: string;
    issuers: string;
    tags: string;
    trees: Map<commitHash, Tree>;
  };
}
export class Repo_v3 {
  static Tree = Tree;
  //
  static Entity = Entity;
  //
  static Folder = Folder;
  static App = App;
  static Package = Package;
  static Test = Test;
  static NextApp = NextApp;
  static Module = Module;
  static Index = Index;
  //
  static Blob = Blob;
  static Function_Ent = Function_Ent;
  static Class = Class;
  static Component = Component;
  static Hook = Hook;
  static Styled = Styled;
  constructor() {
    this.type = "repo";
  }
}
