import { Conditioner } from "../../../../../Conditioner";
import { MethodWithStrategies } from "../../../MethodWithStrategy";
import { StatsSync } from "../Node/FileSystem/StatsSync";
import { Crypto } from "../Node/Crypto";
import { ExecSync as ES } from "../Node/ChildProcess/ExecSync";
import { ReaddirSync as RDS } from "../Node/FileSystem/ReaddirSync";
import { Path } from "../Node/Path";
import { MapCallbacks } from "../JavaScript/ArrayUtils";

export class HasUpdated<
  S extends keyof typeof HasUpdated.hasUpdatedStrategies
> extends MethodWithStrategies<
  typeof HasUpdated.hasUpdatedStrategies,
  {
    hash: HasUpdated.Hash<"default">["execute"];
    length: HasUpdated.Length<"default">["execute"];
    scan: HasUpdated.Scan<"sh">["execute"];
    shFind: HasUpdated.Scan<"sh">["execute"];
    update: HasUpdated.Update<"default">["execute"];
  },
  S
> {
  constructor(selectedStrategy: S) {
    super(
      HasUpdated.hasUpdatedStrategies,
      {
        hash: new HasUpdated.Hash("default").execute,
        length: new HasUpdated.Length("default").execute,
        scan: new HasUpdated.Scan("sh").execute,
        shFind: new HasUpdated.Scan("sh").execute,
        update: new HasUpdated.Update("default").execute,
      },
      selectedStrategy
    );
  }
}
export namespace HasUpdated {
  export enum hasUpdatedStrategies {
    hash = "hash",
    update = "update",
    scan = "scan",
    shFind = "shFind",
    length = "length",
  }
  export class Hash<
    S extends keyof typeof Hash.hashStrategies = keyof typeof Hash.hashStrategies
  > extends MethodWithStrategies<
    typeof Hash.hashStrategies,
    { default: Hash.hash },
    S
  > {
    constructor(selectedStrategy: S) {
      super(Hash.hashStrategies, { default: Hash.hash }, selectedStrategy);
    }
  }
  export namespace Hash {
    export enum hashStrategies {
      default = "default",
    }
    export interface hashIt {
      (string: string): string;
    }
    export const hashIt: hashIt = Crypto.hashIt;

    export interface hash {
      (scanResult: string[], db: any, path: string): 1 | 0;
    }
    export const hash: hash = (scanResult, db, path) => {
      return new HashStrategy().hash(scanResult, db, path);
    };

    export class HashStrategy {
      hash: hash = (scanResult, db, path) => {
        let currenthash = hashIt(scanResult.join());
        console.log(currenthash);
        console.log(db[path].hash.value);
        if (currenthash === db[path].hash.value) return 1;
        else return 0;
      };
    }
  }

  export class Scan<
    S extends keyof typeof Scan.scanStrategies
  > extends MethodWithStrategies<
    typeof Scan.scanStrategies,
    { sh: Scan.find; readDir: Scan.readDirIn },
    S
  > {
    constructor(selectedStrategy: S) {
      const strats = {
        sh: Scan.find,
        readDir: Scan.readDir,
      };
      super(Scan.scanStrategies, strats, selectedStrategy);
    }
  }

  export namespace Scan {
    enum splitters {
      newline = "\n",
    }

    enum ExecSyncErrors {
      runfirst = "call run method first",
    }

    interface readDirInStrategy {
      (dirPath: string, arrayOfFiles: string[], options?: any): (
        file: string
      ) => void;
    }

    interface execSyncFormat {
      (
        command: string,
        options: {
          maxBuffer: number;
        }
      ): string[];
    }

    export enum scanStrategies {
      sh = "sh",
      readDir = "readDir",
    }
    export const ReaddirSync = RDS;
    export const ExecSync = ES;

    export interface readDirIn {
      (
        dirPath: string,
        arrayOfFiles?: string[],
        options?: RDS.Options
      ): string[];
    }
    export const readDir: readDirIn = (dirPath, arrayOfFiles = [], options) => {
      return new Scan.ReaddirSync(dirPath, arrayOfFiles, options)
        .run()
        .recurse()
        .digest();
    };

    export interface find {
      (path: string, options?: { withoutSlash?: boolean }): string[];
    }
    export const find: find = (path, _options) => {
      const options = { maxBuffer: 1024 * 1024 * 10 };
      const command = `find '${path}' -type f`;
      let result = new Scan.ExecSync(command, options)
        .run()
        .format()
        .split(Scan.ExecSync.splitters.newline)
        .digest();
      if (_options) result = Scan.checkOptions(_options, result);
      return result;
    };

    const replace = MapCallbacks.replacer;
    const makeValidations = Conditioner.makeValidations;
    export const checkOptions = (
      _options: { withoutSlash?: boolean | undefined },
      execSyncResult: string[]
    ) => {
      const conditioner = new Conditioner();
      const condition =
        _options.withoutSlash === undefined ? false : _options.withoutSlash;
      const ifTrue = () => execSyncResult.map(replace("./", ""));
      const ifFalse = () => execSyncResult;
      return conditioner.boolean([
        condition,
        makeValidations([ifTrue, []], [ifFalse, []]),
      ]);
    };
  }

  export class Update<
    S extends keyof typeof Update.updateStrategies
  > extends MethodWithStrategies<
    typeof Update.updateStrategies,
    { default: Update.getLastModifiedTime },
    S
  > {
    constructor(selectedStrategy: S) {
      super(
        Update.updateStrategies,
        { default: Update.getLastModifiedTime },
        selectedStrategy
      );
    }
  }

  export namespace Update {
    type editedDate = StatsSync.editedDate;
    type editedPath = StatsSync.editedPath;
    export enum updateStrategies {
      default = "default",
    }

    interface DateAndPath {
      editDate: editedDate;
      editedPath: editedPath;
    }

    interface FileAndPath {
      file: string;
      path: string;
    }

    interface IgetLastModifiedTime extends DateAndPath, FileAndPath {}

    export interface getLastModifiedTime {
      (path: string): DateAndPath & {
        filename: string;
      };
    }

    export const getLastModifiedTime: getLastModifiedTime = path => {
      return new GetLastModifiedTime().getLastModifiedTime(path);
    };

    export class GetLastModifiedTime {
      getLastModifiedTime: Update.getLastModifiedTime = path => {
        let editDate = null;
        let editedPath: editedPath = null;
        console.log(path);
        const readdirSync = RDS.readdirSync;

        const files = readdirSync(path);
        for (const file of files) {
          let obj: IgetLastModifiedTime = {
            file,
            path,
            editDate,
            editedPath,
          };
          let res: [editedDate, editedPath] | undefined =
            GetLastModifiedTime.getLastModifiedTimeFile(obj);
          if (res) [editDate, editedPath] = res;
          else continue;
        }
        return {
          editDate,
          editedPath,
          filename: Path.ifUndefined(editedPath),
        };
      };
    }

    export namespace GetLastModifiedTime {
      interface glmgeneric<T = unknown, R = unknown>
        extends StatsSync.genericGetLastModiftime<T, R> {}

      interface getLastModifiedTimeInFolder
        extends glmgeneric<{ filePath: string }> {}
      export const getLastModifiedTimeInFolder: getLastModifiedTimeInFolder = ({
        filePath,
        editDate,
        editedPath,
      }) => {
        const subResult = Update.getLastModifiedTime(filePath);
        if (
          subResult.editDate &&
          (!editDate || subResult.editDate > editDate)
        ) {
          editDate = subResult.editDate;
          editedPath = subResult.editedPath;
        }
        return [editDate, editedPath];
      };
      const getLastModifiedTimeOfFile = StatsSync.getLastModifiedTimeOfFile;

      interface getLastModifiedTimeFile
        extends glmgeneric<{ file: string; path: string }, undefined> {}
      export const getLastModifiedTimeFile: getLastModifiedTimeFile = ({
        file,
        path,
        editDate,
        editedPath,
      }) => {
        if (file === ".DS_Store") {
          return; // salta il file .DS_Store
        }
        const filePath = `${path}/${file}`;
        const stats = StatsSync.statSync(filePath);
        const folderobj = {
          filePath,
          editDate,
          editedPath,
        };
        const fileobj = {
          stats,
          editDate,
          editedPath,
          filePath,
        };
        if (stats.isDirectory())
          [editDate, editedPath] = getLastModifiedTimeInFolder(folderobj);
        else [editDate, editedPath] = getLastModifiedTimeOfFile(fileobj);
        return [editDate, editedPath];
      };
    }
  }
  // let oo = new Update("default").execute("");
  export class Length<
    S extends keyof typeof Length.lengthStrategies
  > extends MethodWithStrategies<
    typeof Length.lengthStrategies,
    { default: Length.lengthStrat },
    S
  > {
    constructor(selectedStrategy: S) {
      super(
        Length.lengthStrategies,
        { default: Length.lengthStrat },
        selectedStrategy
      );
    }
  }
  export namespace Length {
    export enum lengthStrategies {
      default = "default",
    }
    export const scan = (path: string) => new Scan("sh").execute(path) as any[];

    export interface lengthStrat {
      (db: { [k: string]: { hash: { nFiles: number } } }, path: string): 1 | 0;
    }
    const conditioner = new Conditioner();
    const boolean = conditioner.boolean;
    const makeValidations = Conditioner.makeValidations;
    export const lengthStrat: lengthStrat = (db, path) => {
      const condition = Length.scan(path).length === db[path]!.hash.nFiles;
      const ifTrue = () => 1;
      const ifFalse = () => 0;
      return boolean([condition, makeValidations([ifTrue, []], [ifFalse, []])]);
    };
  }
}
