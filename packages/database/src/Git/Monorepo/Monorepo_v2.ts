import {
  monorepoManagerTypes,
  packageManagerTypes,
} from "../lib";
import { Repo } from "../Repo";
import { GitHubUserBasic } from "../Types/Oktokit/users";

export type Organization = {
  name: string;
  github: GitHubUserBasic;
};

export interface IMonorepo_v2 {
  id: string;
  name: string;
  path: string;
  appFolder: string;
  packagesFolder: string;
  organization: Organization;
  apps: Repo;
  packages: Repo;
  packageManager: packageManagerTypes;
  monorepoManager: monorepoManagerTypes;
}

export interface Monorepo_v2 {
  id: string;
  name: string;
  path: string;
  appFolder: string;
  packagesFolder: string;
  organization: Organization;
  apps: Repo;
  packages: Repo;
  packageManager: packageManagerTypes;
  monorepoManager: monorepoManagerTypes;
}

export class Monorepo_v2 implements IMonorepo_v2 {
  static monorepos: Monorepo_v2[] = [];
  constructor(props?: Monorepo_v2) {
    props;
    Monorepo_v2.monorepos.push(this);
  }
}

export type Monorepo_v2Ctor = {
  new (props?: Monorepo_v2): Monorepo_v2;
};

export const Monorepo_v2Ctor: Monorepo_v2Ctor =
  Monorepo_v2;

export const toKeep = [
  "telegraf",
  "styled-components",
  "ethers",
  "ipfs",
  "ipfs-http",
  "es-lint",
  "eslint-plugin-import",
  "eslint-plugin-react",
  "parcel",
  "typescript",
  "bundler",
  "react",
  "react-dom",
];
