import { Stats, readdirSync as r, statSync, Dirent } from "fs";
import { join } from "path";
import { HighUtilities } from "../../../HighUtilities";

interface State<M extends boolean> {
  context: ReaddirSync<any>;
  withLastModifTime?: M;
}
class State<M extends boolean> {
  constructor(public state: M, public context: ReaddirSync<any>) {
    context.withLastModifTime = this.withLastModifTime ? true : false;
  }
}

interface WithLastModif extends State<true> {}
class WithLastModif extends State<true> {
  constructor(context: ReaddirSync<any>) {
    super(true, context);
  }
}

export interface ReaddirSync<T extends string[]>
  extends ReaddirSync.ReaddirSync<T> {
  digest(): T;
}

export class ReaddirSync<T extends string[]>
  extends HighUtilities.BasicClass
  implements ReaddirSync.ReaddirSync<T>
{
  constructor(
    public dirPath: string,
    public arrayOfFiles: string[],
    options?: ReaddirSync.Options
  ) {
    super();

    const setLastModifTime = (value: boolean) =>
      (this.#withLastModifTime = value);

    const checkOptions = (
      options: ReaddirSync.Options,
      cb: (value: boolean) => boolean
    ) => {
      const iftrue = () => cb(true);
      const condition = options.withLastModifTime ? true : false;
      this.conditioner.booleanTrue(condition, [iftrue, []]);
    };

    const iftrue = () => checkOptions(options!, setLastModifTime);
    this.conditioner.booleanTrue(options ? true : false, [iftrue, []]);
  }
  scanStrategyfiles: string[] | Dirent[] | undefined;
  #withLastModifTime?: boolean;

  set withLastModifTime(value: boolean) {
    this.#withLastModifTime = value;
  }

  digest() {
    return this.arrayOfFiles;
  }
  #stats: Stats | undefined;
  #isDirectory: ReaddirSync.isDirectory = () =>
    ReaddirSync.isDirectory(this.#file, this.dirPath);

  #joint: string = "";
  #file: string = "";
  repeatRecurse = () => {
    this.#joint = join(this.dirPath, this.#file);
    this.recurse(this.#joint);
    return this;
  };

  #fileMTime = () => statSync(this.#dirAndFilename()).mtime.toISOString();
  #dirAndFilename = () => `./${join(this.dirPath, "/", this.#file)}`;
  #jointAndLastModif = () => `${this.#dirAndFilename()}, ${this.#fileMTime()}`;

  #discriminateRecurse: ReaddirSync.discriminateRecurse = () => {
    const path = this.dirPath;
    return (file: string) => {
      this.#file = file;
      this.dirPath = path;
      const maaa = ReaddirSync.makeActionAndArgs;
      const mv = ReaddirSync.makeValidations;
      const boolean = this.conditioner.boolean;
      const iftrue = maaa(() => this.#jointAndLastModif(), []);
      const iffalse = maaa(() => this.#dirAndFilename(), []);
      const condition = this.#withLastModifTime ? true : false;
      const validations = mv(iftrue, iffalse);
      const value = this.conditioner.boolean([condition, validations]);

      const ifDir = maaa(() => this.repeatRecurse(), []);
      const ifNotDir = maaa(() => this.arrayOfFiles.push(value), []);

      return boolean([this.#isDirectory(), mv(ifDir, ifNotDir)]);
    };
  };
  #discriminateRecurseDirent: ReaddirSync.discriminateRecurseDirent = () => {
    const path = this.dirPath;
    return (file: Dirent) => {
      this.#file = file.name;
      this.dirPath = path;
      const maaa = ReaddirSync.makeActionAndArgs;
      const mv = ReaddirSync.makeValidations;
      const boolean = this.conditioner.boolean;
      const iftrue = maaa(() => this.#jointAndLastModif(), []);
      const iffalse = maaa(() => this.#dirAndFilename(), []);
      const condition = this.#withLastModifTime ? true : false;
      const validations = mv(iftrue, iffalse);
      const value = this.conditioner.boolean([condition, validations]);

      const ifDir = maaa(() => this.repeatRecurse(), []);
      const ifNotDir = maaa(() => this.arrayOfFiles.push(value), []);

      return boolean([this.#isDirectory(), mv(ifDir, ifNotDir)]);
    };
  };

  #forEach: ReaddirSync.forEachString = () => {
    (this.scanStrategyfiles as string[]).forEach(this.#discriminateRecurse());
    return this;
  };
  #forEachDirent: ReaddirSync.forEachDirent = () => {
    (this.scanStrategyfiles as Dirent[]).forEach(
      this.#discriminateRecurseDirent()
    );
    return this;
  };

  run = () => {
    this.scanStrategyfiles = r(this.dirPath);
    return this;
  };

  recurse = (dirPath: string = this.dirPath, withFileTypes?: boolean) => {
    if (!withFileTypes) {
      const sge = this.conditioner.safeGuardError;
      const condition = !this.scanStrategyfiles;
      const message = ReaddirSync.readdirSyncErrors.runfirst;
      sge([condition, message]);
      this.dirPath = dirPath;
      this.run();
      this.#forEach();
      return this;
    } else {
      const sge = this.conditioner.safeGuardError;
      const condition = !this.scanStrategyfiles;
      const message = ReaddirSync.readdirSyncErrors.runfirst;
      sge([condition, message]);
      this.dirPath = dirPath;
      this.run();
      this.#forEachDirent();
      return this;
    }
  };
}
export namespace ReaddirSync {
  export interface ReaddirSync<T extends string[]> {
    dirPath: string;
    arrayOfFiles: string[];
    digest(): T;
  }
  enum config {
    withLastModifTime = "withLastModifTime",
  }
  enum states {}
  export enum readdirSyncErrors {
    runfirst = "call the run method first",
  }

  export interface isDirectory {
    (file?: string, dirPath?: string): boolean;
  }

  export interface discriminateRecurse {
    (dirPath?: string, arrayOfFiles?: string[]): (file: string) => void;
  }

  export interface discriminateRecurseDirent {
    (dirPath?: Dirent, arrayOfFiles?: Dirent[]): (file: Dirent) => void;
  }

  export interface recurse {
    (arrayOfFiles: string[], path: string, dirPath: string): void;
  }

  export interface forEachString {
    (
      dirPath?: string,
      arrayOfFiles?: string[],
      cb?: (dirPath: string, arrayOfFiles: string[]) => (file: string) => void
    ): void;
  }

  export interface forEachDirent {
    (
      dirPath?: Dirent,
      arrayOfFiles?: Dirent[],
      cb?: (dirPath: Dirent, arrayOfFiles: Dirent[]) => (file: Dirent) => void
    ): void;
  }

  export interface Options {
    withLastModifTime?: boolean;
  }

  export const isDirectory: ReaddirSync.isDirectory = (
    file?: string,
    dirPath?: string
  ) => {
    return statSync(join(dirPath!, file!)).isDirectory();
  };

  export const readdirSync = r;
}
