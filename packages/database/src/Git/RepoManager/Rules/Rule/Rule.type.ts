import {
  availabilities,
  categories,
  filesSubSorts,
  FolderContent,
  genres,
  originFiles,
  sorts,
  subCategories,
  subGenres,
  subSorts,
} from "../FolderContent";

export interface Types {
  sort: sorts;
  subSort?: subSorts;
  category?: categories;
  subCategory?: subCategories;
  genre?: genres;
  subGenre?: subGenres;
}

export interface Rule extends Types {
  firstFile: originFiles;
  path_patterns: string[];
  availability: availabilities;
  isIgnored: boolean;
}

enum ruleTypes {
  folder = "folder",
  file = "file",
}

export enum ruleSubType {
  index = "index",
  module = "module",
  container = "container",
  package = "package",
  app = "app",
}

export abstract class Rule {
  static FolderContent = FolderContent;
  static ruleTypes = ruleTypes;
  static ruleSubType = ruleSubType;
  static originFiles = FolderContent.originFiles;
  static configFilesTypes = FolderContent.configFilesTypes;
  abstract type: ruleTypes;
  abstract subType?: ruleSubType;
  abstract kind?: filesSubSorts[];
  testString(string: string) {
    return function (rule: string) {
      let splitter = "/";
      let stringlevels = string.split(splitter);
      let rulelevels = rule.split(splitter);
      return !rulelevels
        .map((rule, i) => {
          if (rule === "*") {
            return true;
          } else {
            let stringlevel = stringlevels[i];
            if (rule === "") {
              return true;
            } else {
              return stringlevel === rule;
            }
          }
        })
        .some(v => v === false);
    };
  }
  testRules(string: string) {
    return this.path_patterns
      .map(this.testString(string))
      .some(v => v === true);
  }
}
