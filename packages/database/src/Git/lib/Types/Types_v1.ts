export enum packageManagers_v1 {
  yarn = "yarn",
  npm = "npm",
}

export type packageManagerTypes_v1 =
  keyof typeof packageManagers_v1;

export enum monorepoManagers_v1 {
  bolt = "bolt",
  lerna = "lerna",
}

export type monorepoManagerTypes_v1 =
  keyof typeof monorepoManagers_v1;

/**
 * .noiz file lines
 */
export interface noiz {
  type: any;
  folderType: any;
  fileType: any;
  version: string;
  creationDate: Date;
  updateDate: Date;
}

export interface noiz_root extends noiz {
  type: "root";
  appPrefix: string;
  packagePrefix: string;
  packages: any[];
  apps: any[];
  devDeps: any[];
  peerDeps: any[];
  deps: any[];
}

export interface TreeNodeBasicProps_v1 {
  name: string;
  path: string;
  typeNumber: number;
  treeId: unknown;
  depth: number;
}
