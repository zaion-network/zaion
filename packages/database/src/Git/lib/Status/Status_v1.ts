enum filesStatuses {
  "working ✅" = "working ✅",
  "notter ⛔️" = "notter ⛔️",
  "default-noiz" = "default-noiz",
  "icons-not-showing" = "icons-not-showing",
  "index-??" = "index-??",
}
export type fileStatusesTypes = keyof typeof filesStatuses;

export interface IStatus_v1 {
  name: string;
  packageName: string;
  version: string;
  hasPackageJSON: boolean;
  hasTSconfigJSON: boolean;
  isRoot: boolean;
  hasRemote: boolean;
  hasTypesInConfig: boolean | null;
  isCommitted: boolean;
  latestUpdate: string | false;
  dependencies: boolean | string;
  toKeep: boolean;
}

export interface Status_v1 {
  name: string;
  packageName: string;
  version: string;
  hasPackageJSON: boolean;
  hasTSconfigJSON: boolean;
  isRoot: boolean;
  hasRemote: boolean;
  hasTypesInConfig: boolean | null;
  isCommitted: boolean;
  latestUpdate: string | false;
  dependencies: boolean | string;
  toKeep: boolean;
}

export class Status_v1 implements IStatus_v1 {}

export type Status_v1Ctor = {
  new (): Status_v1;
};

export const Status_v1Ctor: Status_v1Ctor = Status_v1;
