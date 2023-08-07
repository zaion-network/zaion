import {
  readdirSync,
  statSync,
  readFileSync,
  writeFileSync,
  existsSync,
} from "fs";
import { join, basename, extname } from "path";
import zlib from "zlib";
import { AlsParser } from "./AlsParser";
import { AlsBuilder } from "./AlsBuilder";
import { Renamer } from "./Renamer";
import { NameAnalyzer } from "./NameAnalyzer";
import { Update } from "./class/using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/using HigherUtilities/Node/oldHasUpdated/HasUpdated/Update";
import { Scan } from "./class/using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/using HigherUtilities/Node/oldHasUpdated/HasUpdated/Scan";
import { TopUtilities as Utilities } from "./class/using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/using HigherUtilities/TopUtilities";

const config = {
  rootpath: `/Users/WAW/Desktop/Als\ Analyzer\ Project`,
  datafolder: `data`,
  datafilename: `db.txt`,
  abletonProjectInfo: `Ableton\ Project\ Info`,
  dataFilePath: () =>
    join(config.rootpath, config.datafolder, config.datafilename),
  abletonProjectInfoPath: () =>
    join(config.rootpath, config.abletonProjectInfo),
};

export interface AbletonProjectParser {
  scan(dirPath?: string, arrayOfFiles?: any[]): string[];
}

export class AbletonProjectParser {
  static writeFileSync = writeFileSync;
  static readFileSync = readFileSync;
  static gzipSync = zlib.gzipSync;
  static gunzipSync = zlib.gunzipSync;
  static AlsParser = AlsParser;
  static AlsBuilder = AlsBuilder;
  static Renamer = Renamer;
  static NameAnalyzer = NameAnalyzer;

  #path: string;
  project;
  #parsed;
  #db: AbletonProjectParser.db;
  get db() {
    return this.#db;
  }
  #updateResult: 1 | 0 | undefined;

  #alsfiles: string[] | undefined;
  #clips: string[] | undefined;
  foo = <CB extends (...args: any[]) => void>(init: boolean, cb: CB) => {
    if (typeof init === "boolean") cb(config.dataFilePath());
    else if (Array.isArray(init)) {
      if (!init[0]) throw new Error("first value of tuple must be boolean");
      let map = new Map();
      map.set(AbletonProjectParser.constructorInitTypes.db, cb);
      map.set(AbletonProjectParser.constructorInitTypes.project, () => {});
      map.get(init[1])();
    }
  };

  // added in UnreadyAbletonProjectParser
  private initialize(
    init?: boolean | [true, AbletonProjectParser.constructorInitTypes]
  ): void {
    const checkAndRemove = Utilities.Node.FileSystem.checkAndRemove;
    // const boolean = new Utilities.Conditioner().boolean;
    // const makeValidations = Utilities.Conditioner.makeValidations;
    // const [ifTrue, ifFalse] = makeValidations([this.foo, []]);
    // boolean([
    //   (init as boolean | undefined) ? (init as boolean) : false,
    //   [ifTrue, ifFalse],
    // ]);
    if (init) {
      if (typeof init === "boolean") checkAndRemove(config.dataFilePath());
      else if (Array.isArray(init)) {
        if (!init[0]) throw new Error("first value of tuple must be boolean");
        let map = new Map();
        map.set(AbletonProjectParser.constructorInitTypes.db, checkAndRemove);
        map.set(AbletonProjectParser.constructorInitTypes.project, () => {});
        map.get(init[1])();
      }
    }
    if (!existsSync(`${config.dataFilePath()}`)) {
      writeFileSync(config.dataFilePath(), JSON.stringify({ db: {} }));
    }
  }

  // aggiunto in UnreadyAbletonProjectParser
  #checkIsFolderAnAbletonProject(path: string) {
    const existAnalysys = new Map();
    const Error = Utilities.ErrorHandler;
    const error = Error.errorCb(AbletonProjectParser.errors.notProject);
    existAnalysys.set(false, error);
    existAnalysys.set(true, () => {});
    const exists = existsSync(path);
    existAnalysys.get(exists)();
  }

  // aggiunto in UnloadedDbState
  #parseDb() {
    return JSON.parse(
      readFileSync(config.dataFilePath(), { encoding: "utf8" })
    );
  }

  #findFilesByExtension(ext: string, dir = this.#path, fileList = []) {
    const strategies = {
      default: this.#findFileByExtensionStrategy1.bind(this),
    };
    const strategy = strategies.default;
    return strategy(ext, dir, fileList);
  }

  // aggiunto in LoadedDbState
  #createRecord = () => {
    this.#alsfiles = this.#findFilesByExtension(".als");
    this.#clips = this.#findFilesByExtension(".alc");

    this.#db[this.#path] = {
      path: this.#path,
      projectName: basename(this.#path),
      creationDate: new Date(),
      changesLog: [new Update("default").execute(this.#path)],
      hash: this.#createHash(),
      files: { list: this.#alsfiles, qty: this.#alsfiles.length },
      clips: { list: this.#clips, qty: this.#clips.length },
      hasUpdated: undefined,
    };
    this.#prompt("writing new project in db");
    this.#save();
  };

  #promptCb(message: string) {
    return () => new Error(message);
  }

  // aggiunto in LoadedDbState
  #readRecord = () => {
    this.#prompt("reading project infos");
    this.#updateResult = this.#hasUpdated() as 1 | 0;
    const updateResultEvaluation = new Map<0 | 1, () => void>();
    const response1 = this.#promptCb("no changes has been detected");
    const response0 = () => {
      this.#prompt("some changes has been detected");
      this.#save();
    };
    updateResultEvaluation.set(1, response1);
    updateResultEvaluation.set(0, response0);
    (updateResultEvaluation.get(this.#updateResult) ?? (() => {}))();
  };

  constructor(path: string, init?: boolean);
  constructor(
    path: string,
    init?: boolean | [true, AbletonProjectParser.constructorInitTypes]
  ) {
    this.#path = path;
    this.initialize(init);
    this.#checkIsFolderAnAbletonProject(
      join(this.#path, config.abletonProjectInfo)
    );
    this.#parsed = this.#parseDb();
    this.#db = this.#parsed.db;
    const pathAnalysys = new Map<undefined | any, any>();
    const pathAnalysysResponse = new Map<null | any, any>();
    pathAnalysys.set(undefined, null);
    pathAnalysysResponse.set(null, this.#createRecord);
    pathAnalysysResponse.set(undefined, this.#readRecord);
    pathAnalysysResponse.get(pathAnalysys.get(this.#db[path]))();
    this.project = this.#db[this.#path];
  }

  #prompt(...messages: string[]) {
    console.log(...messages);
  }

  // aggiunto in LoadedDbState
  #save = () => {
    writeFileSync(config.dataFilePath(), JSON.stringify(this.#parsed));
  };

  // aggiunto in UndefinedUpdateProject
  #hasUpdated() {
    let res = new Utilities.Node.FileSystem.HasUpdated("hash").execute(
      new Scan("readDir").execute(this.#path),
      this.#db,
      this.#path
    );
    return res;
  }

  // aggiunto in LoadedDbState
  /**
   * scans recursively a directory
   * @param dirPath target directory
   * @param arrayOfFiles recursive result
   * @returns
   */
  scan(dirPath = this.#path, arrayOfFiles = []) {
    const res = new Scan("readDir").execute(dirPath, undefined, {
      withLastModifTime: false,
    });
    return res;
  }

  // #getAllExtensionsRecursively(root = this.#path) {
  //   let extensions = new Set();
  //   // const path = this.#path;

  //   function traverseFolder(folderPath: string) {
  //     const files = readdirSync(folderPath);

  //     for (let file of files) {
  //       const fullPath = join(folderPath, file);
  //       const stat = statSync(fullPath);

  //       if (stat.isDirectory()) {
  //         traverseFolder(fullPath);
  //       } else {
  //         const extension = extname(fullPath).toLowerCase();
  //         extensions.add(extension);
  //       }
  //     }
  //   }

  //   traverseFolder(root);
  //   return Array.from(extensions);
  // }

  // aggiunto a LoadedDbState
  checkExtensionAndPush =
    (fileList: string[], ext: string, dir: string) => (file: string) => {
      const filePath: string = join(dir, file);
      const stat = statSync(filePath);
      if (stat.isDirectory()) {
        this.#findFileByExtensionStrategy1(ext, filePath, fileList);
      } else if (extname(file) === ext) {
        fileList.push(filePath);
      }
    };

  // aggiunto a LoadedDbState
  #findFileByExtensionStrategy1 = (
    ext: string,
    dir = this.#path,
    fileList: string[] = []
  ) => {
    const files = readdirSync(dir);
    files.forEach(this.checkExtensionAndPush(fileList, ext, dir));
    return fileList;
  };

  // aggiunto a LoadedDbState
  #createHash(fileArray = this.scan()) {
    return {
      value: Utilities.Node.Crypto.hashIt(fileArray.join()),
      nFiles: fileArray.length,
    };
  }
}

enum parserDebugShowTypes {
  project = "project",
}

export class AbletonProjectParserDebug extends AbletonProjectParser {
  show(type: keyof typeof parserDebugShowTypes) {
    const typeSelector = new Map<
      keyof typeof parserDebugShowTypes,
      () => void
    >();
    typeSelector.set("project", () => console.log(this.project));
    typeSelector.get(type)!();
  }
}

export namespace AbletonProjectParser {
  export enum errors {
    notProject = "this folder isn't an Ableton Live project",
  }
  export enum constructorInitTypes {
    db,
    project,
  }

  interface ChangeLog extends Update.ChangeLog {}

  interface Hash {
    value: string;
    nFiles: number;
  }

  interface List {
    list: string[];
    qty: number;
  }
  interface FilesList extends List {}
  interface ClipsList extends List {}

  interface Project<U extends undefined | (0 | 1)> {
    path: string;
    projectName: string;
    creationDate: Date;
    changesLog: ChangeLog[];
    hash: Hash;
    files: FilesList;
    clips: ClipsList;
    hasUpdated: U;
  }
  interface UndefinedUpdateProject extends Project<undefined> {
    checkHasUpdated(): 0 | 1;
  }

  export interface db {
    [k: string]: Project<any>;
  }
  interface DbState<
    D extends db | undefined,
    L extends boolean,
    P extends string | undefined
  > {
    db: D;
    loaded: L;
    path: string;
    parsed: P;
  }

  class DbState<
    D extends db | undefined,
    L extends boolean,
    P extends string | undefined
  > {
    constructor(public db: D, public loaded: L) {}
  }

  interface LoadedDbState extends DbState<db, true, string> {
    db: db;
    prompt(...messages: string[]): void;
    save(): void;
    createHash(fileArray: string[]): Hash;
    checkExtensionAndPush: (
      fileList: string[],
      ext: string,
      dir: string
    ) => (file: string) => void;
    findFileByExtensionStrategy1: (
      ext: string,
      dir?: string,
      fileList?: string[],
      cb?: (
        fileList: string[],
        ext: string,
        dir: string
      ) => (file: string) => void
    ) => string[];
    findFilesByExtension(
      ext: string,
      dir?: string,
      fileList?: never[]
    ): string[];
    promptCb(message: string): () => Error;
    readRecord(project: UndefinedUpdateProject): void;
    createRecord(): void;
    scan(dirPath: string, arrayOfFiles: string[]): string[];
    // to add
    discard(): void;
  }

  class LoadedDbState
    extends DbState<db, true, string>
    implements LoadedDbState
  {
    prompt(...messages: string[]) {
      console.log(...messages);
    }
    save = () => {
      writeFileSync(config.dataFilePath(), JSON.stringify(this.parsed));
    };
    createHash(fileArray = this.scan()) {
      return {
        value: Utilities.Node.Crypto.hashIt(fileArray.join()),
        nFiles: fileArray.length,
      };
    }
    checkExtensionAndPush =
      (fileList: string[], ext: string, dir: string) => (file: string) => {
        const filePath: string = join(dir, file);
        const stat = statSync(filePath);
        if (stat.isDirectory()) {
          this.findFileByExtensionStrategy1(
            ext,
            filePath,
            fileList,
            this.checkExtensionAndPush
          );
        } else if (extname(file) === ext) {
          fileList.push(filePath);
        }
      };

    findFileByExtensionStrategy1 = (
      ext: string,
      dir = this.path,
      fileList: string[] = [],
      cb: (
        fileList: string[],
        ext: string,
        dir: string
      ) => (file: string) => void = this.checkExtensionAndPush
    ) => {
      const files = readdirSync(dir);
      files.forEach(cb(fileList, ext, dir));
      return fileList;
    };

    findFilesByExtension(ext: string, dir = this.path, fileList = []) {
      const strategies = {
        default: this.findFileByExtensionStrategy1.bind(this),
      };
      const strategy = strategies.default;
      return strategy(ext, dir, fileList, this.checkExtensionAndPush);
    }

    promptCb(message: string) {
      return () => new Error(message);
    }

    readRecord = (project: UndefinedUpdateProject) => {
      this.prompt("reading project infos");
      let updateResult = project.checkHasUpdated() as 1 | 0;
      const updateResultEvaluation = new Map<0 | 1, () => void>();
      const response1 = this.promptCb("no changes has been detected");
      const response0 = () => {
        this.prompt("some changes has been detected");
        this.save();
      };
      updateResultEvaluation.set(1, response1);
      updateResultEvaluation.set(0, response0);
      (updateResultEvaluation.get(updateResult) ?? (() => {}))();
    };

    createRecord = () => {
      const filesList = this.findFilesByExtension(".als");
      const filesQty = filesList.length;
      const files = { list: filesList, qty: filesQty };

      const clipsList = this.findFilesByExtension(".alc");
      const clispQty = clipsList.length;
      const clips = { list: clipsList, qty: clispQty };

      this.db[this.path] = {
        path: this.path,
        projectName: basename(this.path),
        creationDate: new Date(),
        changesLog: [new Update("default").execute(this.path)],
        hash: this.createHash(),
        files,
        clips: clips,
        hasUpdated: undefined,
      };
      this.prompt("writing new project in db");
      this.save();
    };
    scan(dirPath: string = this.path, arrayOfFiles: string[] = []) {
      const res = new Scan("readDir").execute(dirPath, undefined, {
        withLastModifTime: false,
      });
      return res;
    }
  }

  interface UnloadedDbState extends DbState<undefined, false, undefined> {
    db: undefined;
    parsedb(): any;
  }

  class UnloadedDbState
    extends DbState<undefined, false, undefined>
    implements UnloadedDbState
  {
    constructor() {
      super(undefined, false);
      this.parsed = this.parsedb();
    }
    parsedb() {
      return JSON.parse(
        readFileSync(config.dataFilePath(), { encoding: "utf8" })
      );
    }
  }

  interface ProjectsDatabase {
    projects: [];
  }

  interface AbletonProjectParser {
    project: Project<any> | undefined;
    cached: boolean | undefined;
    ready: boolean;
  }

  interface UnreadyAbletonProjectParser extends AbletonProjectParser {
    project: undefined;
    cached: undefined;
    ready: false;
    scan(): void;
    initialize(
      init?: boolean | [true, AbletonProjectParser.constructorInitTypes]
    ): void;
    checkIsFolderAnAbletonProject(path: string): void;
  }

  class UnreadyAbletonProjectParser {
    initialize(
      init?: boolean | [true, AbletonProjectParser.constructorInitTypes]
    ): void {
      const checkAndRemove = Utilities.Node.FileSystem.checkAndRemove;
      if (init) {
        if (typeof init === "boolean") checkAndRemove(config.dataFilePath());
        else if (Array.isArray(init)) {
          if (!init[0]) throw new Error("first value of tuple must be boolean");
          let map = new Map();
          map.set(AbletonProjectParser.constructorInitTypes.db, checkAndRemove);
          map.set(AbletonProjectParser.constructorInitTypes.project, () => {});
          map.get(init[1])();
        }
      }
      if (!existsSync(`${config.dataFilePath()}`)) {
        writeFileSync(config.dataFilePath(), JSON.stringify({ db: {} }));
      }
    }

    checkIsFolderAnAbletonProject(path: string) {
      const existAnalysys = new Map();
      const Error = Utilities.ErrorHandler;
      const error = Error.errorCb(AbletonProjectParser.errors.notProject);
      existAnalysys.set(false, error);
      existAnalysys.set(true, () => {});
      const exists = existsSync(path);
      existAnalysys.get(exists)();
    }
  }
  interface ReadyAbletonProjectParser extends AbletonProjectParser {
    project: Project<any>;
    cached: false;
    ready: true;
  }
  interface CachedAbletonProjectParser extends AbletonProjectParser {
    project: Project<any>;
    cached: true;
    ready: true;
  }
}
