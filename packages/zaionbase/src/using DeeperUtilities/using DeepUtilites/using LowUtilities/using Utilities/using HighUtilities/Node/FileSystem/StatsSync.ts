import { Stats, statSync as s } from "fs";

export class StatsSync {}
export namespace StatsSync {
  interface getModifTime {
    (stats: Stats): Date;
  }
  export const getModifTime: getModifTime = stats => stats.mtime;

  export const statSync = s;

  export type editedDate = Date | null;
  export type editedPath = string | null;
  export interface genericGetLastModiftime<T = unknown, R = unknown> {
    (
      props: {
        editDate: editedDate;
        editedPath: editedPath;
      } & T
    ): R extends undefined
      ? [editedDate, editedPath] | undefined
      : [editedDate, editedPath];
  }

  interface getLastModifiedTimeOfFile
    extends genericGetLastModiftime<{ stats: Stats; filePath: string }> {}
  export const getLastModifiedTimeOfFile: getLastModifiedTimeOfFile = ({
    stats,
    editDate,
    editedPath,
    filePath,
  }) => {
    const modifiedTime = StatsSync.getModifTime(stats);
    if (!editDate || modifiedTime > editDate) {
      editDate = modifiedTime;
      editedPath = filePath;
    }
    return [editDate, editedPath];
  };
}
