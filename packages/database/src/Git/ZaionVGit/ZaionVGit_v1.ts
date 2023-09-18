import git, {
  CallbackFsClient,
  PromiseFsClient,
  HttpClient,
  ProgressCallback,
  MessageCallback,
  AuthCallback,
  AuthFailureCallback,
  AuthSuccessCallback,
} from "isomorphic-git";
import http from "isomorphic-git/http/node";
import { Volume, createFsFromVolume, IFs } from "memfs";

type Options = {
  fs: CallbackFsClient | PromiseFsClient;
  http: HttpClient;
  onProgress?: ProgressCallback;
  onMessage?: MessageCallback;
  onAuth?: AuthCallback;
  onAuthFailure?: AuthFailureCallback;
  onAuthSuccess?: AuthSuccessCallback;
  dir: string;
  gitdir?: string;
  url: string;
  corsProxy?: string;
  ref?: string;
  singleBranch?: boolean;
  noCheckout?: boolean;
  noTags?: boolean;
  remote?: string;
  depth?: number;
  since?: Date;
  exclude?: string[];
  relative?: boolean;
  headers?: {
    [x: string]: string;
  };
  cache?: any;
};

export interface IZaionVGit_v1 {
  name: string;
}

export interface ZaionVGit_v1 {
  name: string;
}

export class ZaionVGit_v1 implements IZaionVGit_v1 {
  #fs: IFs;
  constructor(
    name: string,
    public options: Options = {
      fs: createFsFromVolume(new Volume()),
      http,
      dir: process.cwd(),
      url: "https://github.com/Zion-PTC/noiz-network-state.git",
      ref: "master",
      singleBranch: false,
      depth: 1,
      remote: "origin",
    }
  ) {
    this.name = name;
    this.#fs = options.fs as IFs;
  }
  get fs() {
    return this.#fs;
  }
  readTree() {
    // const { readTree } = git;
  }
  async listBranches() {
    return await git.listBranches(this.options);
  }
  async clone() {
    // this.options.onAuth = (dir, auth) => {
    //   process.stdout.write([dir, auth]);
    // };
    await git.clone({
      ...this.options,
    });
    return this;
  }
  async ls() {
    return await this.#fs.promises.readdir(
      this.options.dir
    );
  }
  async fetch() {
    return await git.fetch(this.options);
  }
  setUrl(newUrl: string) {
    this.options.url = newUrl;
    return this;
  }
  setRef(newref: string) {
    this.options.ref = newref;
    return this;
  }
  setDepth(newDepth: number) {
    this.options.depth = newDepth;
    return this;
  }
  setRemote(newRemote: string) {
    this.options.remote = newRemote;
    return this;
  }
}

export type ZaionVGit_v1Ctor = {
  new (name: string): ZaionVGit_v1;
};

export const ZaionVGit_v1Ctor: ZaionVGit_v1Ctor =
  ZaionVGit_v1;
