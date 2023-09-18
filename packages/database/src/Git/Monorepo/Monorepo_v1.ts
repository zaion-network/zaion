import { GetAuthenticatedUser } from "../Types/Oktokit/users";

export type Organization = {
  name: string;
  github: GitHubUserBasic;
};

export type GitHubUserBasic = Pick<
  GetAuthenticatedUser["data"],
  | "id"
  | "name"
  | "login"
  | "avatar_url"
  | "url"
  | "html_url"
  | "organizations_url"
  | "type"
>;

export type Repo = {
  path: string;
  list: string[];
};

export interface IMonorepo {
  id: string;
  name: string;
  path: string;
  appFolder?: string;
  packagesFolder?: string;
  organization?: Organization;
  apps?: Repo;
  packages?: Repo;
}

export type MonorepoType = new (
  id: string,
  name: string,
  path: string,
  organization: Organization,
  appFolder: string,
  packagesFolder: string
) => IMonorepo;

export interface IMonorepo_v1 {
  id: string;
  name: string;
  path: string;
  appFolder?: string;
  packagesFolder?: string;
  organization?: Organization;
}

export interface Monorepo_v1 {
  id: string;
  name: string;
  path: string;
  appFolder?: string;
  packagesFolder?: string;
  organization?: Organization;
}

/**
 * Class utlizzata per gestire un monorepo.
 */
export class Monorepo_v1 implements IMonorepo {
  static monorepos: Monorepo_v1[] = [];
  constructor(
    public id: string,
    public name: string,
    public path: string,
    public appFolder?: string,
    public packagesFolder?: string,
    public organization?: Organization
  ) {
    Monorepo_v1.monorepos.push(this);
  }
}

export type Monorepo_v1Ctor = {
  new (
    id: string,
    name: string,
    path: string,
    appFolder?: string,
    packagesFolder?: string,
    organization?: Organization
  ): Monorepo_v1;
};

export const Monorepo_v1Ctor: Monorepo_v1Ctor = Monorepo_v1;

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
