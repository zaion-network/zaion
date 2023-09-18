export enum originFiles {
  noiz = ".noiz",
  readme = "README",
  todo = "TODO.md",
}

export enum configFilesTypes {
  packagesjson = "package.json",
  tsconfig = "tsconfig.json",
  tscofigBase = "tsconfig.base.json",
  tscofigApp = "tsconfig.app.json",
  gitignore = ".gitignore",
  prettier = ".prettierrc",
  babel = "babel.config.json",
  rollup = "rollup.config.js",
  preconstruct = "preconstructrc.js",
  yarn = "yarn.lock",
  yarnError = "yarn-error.log",
  docker = "Dockerfile",
  next = "next.config.js",
  index = "index.ts",
  indexTypes = "index.type.ts",
  build = "build.sh",
}

export enum kinds {
  folder = "folder",
  file = "file",
}

export enum filesSorts {
  module = "module",
  type = "type",
  test = "test",
}

// sub-genre
export enum filesSubSorts {
  class = "class",
  component = "component",
  function = "function",
  styled = "styled-component",
  hook = "hook",
  mixin = "mixin",
  instance = "instance",
}

// sort
export enum sorts {
  root = "root",
  packages = "packages",
  apps = "apps",
  //
  bin = "bin",
  assets = "assets",
  chatGPT = "chatGPT",
  proposals = "proposals",
  tasks = "tasks",
  nodeModules = "node_modules",
}

// category
export enum subSorts {
  app = "<app>",
  package = "<package>",
}

// sub-sort
export enum categories {
  bin = "bin",
  src = "src",
  entrypoint = "<entrypoint>",
  dist = "dist",
  build = "build",
  nodeModules = "node_modules",
  test = "test",
  vscode = ".vscode",
}

// sub-category
export enum subCategories {
  entrypoint_src = "<entrypoint-source>",
  dist = "dist",
}

// genre
export enum genres {
  entrypoint_sub_src = "<entrypoint-sub-source>",
  module = "<module>",
  leadModule = "<lead-module>",
  lib = "lib",
}

// sub-genre
export enum subGenres {
  extensions = "extensions",
  decorators = "decorators",
}

export enum quantities {
  one = "one",
  many = "many",
}

export enum availabilities {
  optional = "optional",
  required = "required",
}

export interface FolderContent {
  sort:
    | sorts
    | filesSubSorts
    | configFilesTypes
    | filesSorts;
  subSort: subSorts | filesSubSorts;
  category: categories;
  quantity: quantities;
  availability: availabilities;
  isIgnored: boolean;
  description?: string;
  kind?: kinds;
}

export class FolderContent {
  static quantities = quantities;
  static availabilities = availabilities;
  static configFilesTypes = configFilesTypes;
  static originFiles = originFiles;
  static kinds = kinds;
  static filesSorts = filesSorts;
  static filesSubSorts = filesSubSorts;
  static sorts = sorts;
  static subSorts = subSorts;
  static categories = categories;
  static subCategories = subCategories;
  static genres = genres;
  static subGenres = subGenres;
  constructor(
    sort:
      | sorts
      | filesSubSorts
      | configFilesTypes
      | filesSorts,
    quantity: quantities,
    isIgnored: boolean,
    availability: availabilities
  ) {
    this.sort = sort;
    this.quantity = quantity;
    this.isIgnored = isIgnored;
    this.availability = availability;
  }
}
