import { HigherUtilities as Utilities } from "../../../../HigherUtilites";

export class Scan<
  S extends keyof typeof Scan.scanStrategies
> extends Utilities.MethodWithStrategies<
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
  export const ExecSync = Utilities.Node.ChildProcess.ExecSync;
  export const ReaddirSync = Utilities.Node.FileSystem.ReaddirSync;

  export interface readDirIn {
    (
      dirPath: string,
      arrayOfFiles?: string[],
      options?: Utilities.Node.FileSystem.ReaddirSync.Options
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

  const replace = Utilities.JavaScript.ArrayUtils.MapCallbacks.replacer;
  const makeValidations = Utilities.Conditioner.makeValidations;
  export const checkOptions = (
    _options: { withoutSlash?: boolean | undefined },
    execSyncResult: string[]
  ) => {
    const conditioner = new Utilities.Conditioner();
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
