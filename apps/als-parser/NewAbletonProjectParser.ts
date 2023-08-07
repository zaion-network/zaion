import {
  readdirSync,
  statSync,
  readFileSync,
  writeFileSync,
  existsSync,
} from "fs";
import { join, basename, extname } from "path";
import { Update } from "./class/using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/using HigherUtilities/Node/oldHasUpdated/HasUpdated/Update";
import { Scan } from "./class/using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/using HigherUtilities/Node/oldHasUpdated/HasUpdated/Scan";
import { TopUtilities as Utilities } from "./class/using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/using HigherUtilities/TopUtilities";

const config = {
  rootpath: `/Users/WAW/Desktop/Als\ Analyzer\ Project`,
  datafolder: `data`,
  datafilename: `dbtest.tt`,
  abletonProjectInfo: `Ableton\ Project\ Info`,
  dataFilePath: () =>
    join(config.rootpath, config.datafolder, config.datafilename),
  abletonProjectInfoPath: () =>
    join(config.rootpath, config.abletonProjectInfo),
};

export namespace NewAbletonProjectParser {
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
  export namespace Db {
    export interface db {
      [k: string]: Project<any>;
    }
    export namespace State {
      export interface DbState<
        D extends Db.db | undefined,
        L extends boolean,
        P extends string | undefined,
        F extends string | undefined,
        FE extends boolean | undefined,
        ISEMPTYDB extends boolean | undefined
      > {
        db: D;
        loaded: L;
        path: string;
        parsed: P;
        fileContent: F;
        fileExists: FE;
        isEmptyDb: ISEMPTYDB;
      }
      export class DbState<
        D extends Db.db | undefined,
        L extends boolean,
        P extends string | undefined,
        F extends string | undefined,
        FE extends boolean | undefined,
        ISEMPTYDB extends boolean | undefined
      > {
        constructor(public db: D, public loaded: L, public fileExists: FE) {}
      }

      export interface UndefinedFileExistDbState
        extends DbState<
          undefined,
          false,
          undefined,
          undefined,
          undefined,
          undefined
        > {
        db: undefined;
        checkIfFileExists(): boolean | FileDoesntExistDbState | UnloadedDbState;
      }
      export class UndefinedFileExistDbState extends DbState<
        undefined,
        false,
        undefined,
        undefined,
        undefined,
        undefined
      > {
        constructor() {
          super(undefined, false, undefined);
        }
        checkIfFileExists() {
          const map = new Map();
          map.set(true, () => {
            console.log("exists");
            const unloaded = new UnloadedDbState();
            return unloaded;
          });
          map.set(false, () => {
            console.log("doesnt exits");
            const filenotexists = new FileDoesntExistDbState();
            return filenotexists;
          });
          return map.get(existsSync(config.dataFilePath()))();
        }
      }
      export interface FileDoesntExistDbState
        extends DbState<undefined, false, undefined, undefined, false, false> {
        db: undefined;
        createFile(): boolean;
      }
      export class FileDoesntExistDbState extends DbState<
        undefined,
        false,
        undefined,
        undefined,
        false,
        false
      > {
        constructor() {
          super(undefined, false, false);
        }
        createFile() {
          writeFileSync(config.dataFilePath(), "start");
          return true;
        }
      }
      export interface UnloadedDbState
        extends DbState<
          undefined,
          false,
          undefined,
          undefined,
          true,
          undefined
        > {
        db: undefined;
        hasData(): any;
      }

      export class UnloadedDbState
        extends DbState<undefined, false, undefined, undefined, true, undefined>
        implements UnloadedDbState
      {
        constructor() {
          super(undefined, false, true);
        }
        hasData() {
          const filecontent = readFileSync(config.dataFilePath(), {
            encoding: "utf8",
          });
          const condition = filecontent === "start";
          const map = new Map();
          map.set(true, () => {
            console.log("starting file");
            return new EmptyDbState();
          });
          map.set(false, () => {
            console.log("has data");
            return new GotDataDbState();
          });
          return map.get(condition)();
        }
      }
      export interface EmptyDbState
        extends DbState<undefined, false, undefined, undefined, true, true> {
        db: undefined;
        initialize(): any;
      }

      export class EmptyDbState extends DbState<
        undefined,
        false,
        undefined,
        undefined,
        true,
        true
      > {
        constructor() {
          super(undefined, false, true);
          this.isEmptyDb = true;
        }
        initialize() {
          console.log(this["initialize"].name);
          let string = JSON.stringify({ db: null });
          writeFileSync(config.dataFilePath(), string);
          return new GotDataDbState();
        }
      }

      export interface GotDataDbState
        extends DbState<undefined, false, undefined, undefined, true, false> {
        db: undefined;
        parsedb(): any;
      }
      export class GotDataDbState extends DbState<
        undefined,
        false,
        undefined,
        undefined,
        true,
        false
      > {
        constructor() {
          super(undefined, false, true);
          this.isEmptyDb = false;
        }
        parsedb() {
          const filecontent = readFileSync(config.dataFilePath(), {
            encoding: "utf8",
          });
          const map = new Map();
          const condition = filecontent === "start";
          map.set(true, () => {
            console.log("starting file");
          });
          map.set(false, () => {
            const db = JSON.parse(
              readFileSync(config.dataFilePath(), { encoding: "utf8" })
            ).db;
            return db;
          });
          this.db = map.get(condition)();
          const loaded = new LoadedDbState(this.db!);
          return loaded;
        }
      }

      export interface iLoadedDbState
        extends DbState<Db.db, true, string, string, true, false> {
        db: Db.db;
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

      export class LoadedDbState
        extends DbState<Db.db, true, string, string, true, false>
        implements iLoadedDbState
      {
        constructor(db: Db.db) {
          super(db, true, true);
          this.isEmptyDb = false;
        }
        discard(): void {}
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
        checkExtensionAndPush: iLoadedDbState["checkExtensionAndPush"] =
          (fileList, ext, dir) => (file) => {
            const filePath: string = join(dir, file);
            const stat = statSync(filePath);
            let condition: undefined | 0 | 1 = undefined;
            stat.isDirectory() ? (condition = 0) : (condition = undefined);
            extname(file) === ext ? (condition = 1) : (condition = undefined);
            const map = new Map();
            map.set(0, () => {
              this.findFileByExtensionStrategy1(
                ext,
                filePath,
                fileList,
                this.checkExtensionAndPush
              );
            });
            map.set(1, () => {
              fileList.push(filePath);
            });
            return map.get(condition)();
          };

        findFileByExtensionStrategy1: iLoadedDbState["findFileByExtensionStrategy1"] =
          (
            ext,
            dir = this.path,
            fileList = [],
            cb = this.checkExtensionAndPush
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
    }
  }

  interface ProjectsDatabase {
    projects: [];
  }

  interface AbletonProjectParser {
    path: string;
    project: Project<any> | undefined;
    cached: boolean | undefined;
    ready: boolean;
  }
  class AbletonProjectParser {}

  interface UnreadyAbletonProjectParser extends AbletonProjectParser {
    project: undefined;
    cached: undefined;
    ready: false;
    scan(): void;
    initialize(
      init?: boolean | [true, NewAbletonProjectParser.constructorInitTypes]
    ): void;
    checkIsFolderAnAbletonProject(path: string): void;
  }

  class UnreadyAbletonProjectParser
    extends AbletonProjectParser
    implements UnreadyAbletonProjectParser
  {
    constructor(path: string) {
      super();
      this.project = undefined;
      this.cached = undefined;
      this.ready = false;
      this.path = path;
    }

    scan(dirPath: string = this.path, arrayOfFiles: string[] = []) {
      const res = new Scan("readDir").execute(dirPath, undefined, {
        withLastModifTime: false,
      });
      return res;
    }
    initialize(
      init?: boolean | [true, NewAbletonProjectParser.constructorInitTypes]
    ): void {
      // const checkAndRemove = Utilities.Node.FileSystem.checkAndRemove;
      // if (init) {
      //   if (typeof init === "boolean") checkAndRemove(config.dataFilePath());
      //   else if (Array.isArray(init)) {
      //     if (!init[0]) throw new Error("first value of tuple must be boolean");
      //     let map = new Map();
      //     map.set(
      //       NewAbletonProjectParser.constructorInitTypes.db,
      //       checkAndRemove
      //     );
      //     map.set(
      //       NewAbletonProjectParser.constructorInitTypes.project,
      //       () => {}
      //     );
      //     map.get(init[1])();
      //   }
      // }
      // if (!existsSync(`${config.dataFilePath()}`)) {
      //   writeFileSync(config.dataFilePath(), JSON.stringify({ db: {} }));
      // }

      const UndefinedFileExistDbState = Db.State.UndefinedFileExistDbState;
      const FileDoesntExistDbState = Db.State.FileDoesntExistDbState;
      type FileDoesntExistDbState = Db.State.FileDoesntExistDbState;
      const UnloadedDbState = Db.State.UnloadedDbState;
      type UnloadedDbState = Db.State.UnloadedDbState;
      const EmptyDbState = Db.State.EmptyDbState;
      type EmptyDbState = Db.State.EmptyDbState;
      const GotDataDbState = Db.State.GotDataDbState;
      type GotDataDbState = Db.State.GotDataDbState;
      const LoadedDbState = Db.State.LoadedDbState;
      type LoadedDbState = Db.State.LoadedDbState;

      const unloaded = new UndefinedFileExistDbState();
      const loaded = unloaded.checkIfFileExists();

      let dbstate_1: 0 | 1 | undefined = undefined;
      loaded instanceof FileDoesntExistDbState
        ? (dbstate_1 = 0)
        : (dbstate_1 = undefined);
      loaded instanceof UnloadedDbState
        ? (dbstate_1 = 1)
        : (dbstate_1 = undefined);
      const dbstate1_map = new Map();
      dbstate1_map.set(0, (state: FileDoesntExistDbState) =>
        state.createFile()
      );
      dbstate1_map.set(1, (state: UnloadedDbState) => state.hasData());
      let init_step1 = dbstate1_map.get(dbstate_1)(loaded);

      let dbstate_2: undefined | boolean = undefined;
      init_step1 instanceof EmptyDbState ? (dbstate_2 = true) : undefined;
      init_step1 instanceof GotDataDbState ? (dbstate_2 = false) : undefined;
      const dbstate2_map = new Map();
      dbstate2_map.set(true, (state: EmptyDbState) => state.initialize());
      dbstate2_map.set(false, (state: GotDataDbState) => state.parsedb());
      const init_step2 = dbstate2_map.get(dbstate_2)(init_step1);

      let dbstate_3: undefined | 0 | 1 = undefined;
      init_step2 instanceof GotDataDbState
        ? (dbstate_3 = 0)
        : (dbstate_3 = undefined);
      init_step2 instanceof LoadedDbState
        ? (dbstate_3 = 1)
        : (dbstate_3 = undefined);
      const dbstate_3_map = new Map();
      dbstate_3_map.set(0, (state: GotDataDbState) => state.parsedb());
      dbstate_3_map.set(1, () => init_step2);
      let init_step3 = dbstate_3_map.get(dbstate_3)(init_step2);
      console.log(init_step3);
    }

    checkIsFolderAnAbletonProject(path: string) {
      const existAnalysys = new Map();
      const Error = Utilities.ErrorHandler;
      const error = Error.errorCb(NewAbletonProjectParser.errors.notProject);
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
