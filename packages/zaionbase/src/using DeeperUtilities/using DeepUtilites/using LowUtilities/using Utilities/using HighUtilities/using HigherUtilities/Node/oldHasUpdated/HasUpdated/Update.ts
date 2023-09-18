import { Path } from "../../../../Node/Path";
import { HigherUtilities } from "../../../../HigherUtilites";
import { StatsSync } from "../../../../Node/FileSystem/StatsSync";

export class Update<
  S extends keyof typeof Update.updateStrategies
> extends HigherUtilities.MethodWithStrategies<
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

  export interface DateAndPath {
    editDate: editedDate;
    editedPath: editedPath;
  }

  interface FileAndPath {
    file: string;
    path: string;
  }

  interface Filename {
    filename: string;
  }
  interface IgetLastModifiedTime extends DateAndPath, FileAndPath {}

  export interface ChangeLog extends DateAndPath, Filename {}

  export interface getLastModifiedTime {
    (path: string): ChangeLog;
  }

  export const getLastModifiedTime: getLastModifiedTime = path => {
    return new GetLastModifiedTime().getLastModifiedTime(path);
  };

  export class GetLastModifiedTime {
    getLastModifiedTime: Update.getLastModifiedTime = path => {
      let editDate = null;
      let editedPath: editedPath = null;
      console.log(path);
      const readdirSync =
        HigherUtilities.Node.FileSystem.ReaddirSync.readdirSync;

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
        // @ts-expect-error
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
      if (subResult.editDate && (!editDate || subResult.editDate > editDate)) {
        editDate = subResult.editDate;
        editedPath = subResult.editedPath;
      }
      return [editDate, editedPath];
    };
    export const getLastModifiedTimeOfFile =
      StatsSync.getLastModifiedTimeOfFile;

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
