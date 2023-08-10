import { HighUtilities } from "../../HighUtilities";

declare module "./RegExpUtils" {
  namespace RegExpUtils {
    abstract class RegExpDescr implements RegExp {
      abstract exec(string: string): RegExpExecArray;
      abstract compile(pattern: string, flags?: string): this;
      abstract dotAll: boolean;
      abstract flags: string;
      abstract global: boolean;
      abstract ignoreCase: boolean;
      abstract lastIndex: number;
      abstract multiline: boolean;
      abstract source: string;
      abstract sticky: boolean;
      abstract test(string: string): boolean;
      abstract unicode: boolean;
      abstract [Symbol.match]: (string: string) => RegExpMatchArray | null;
      abstract [Symbol.replace]: {
        (string: string, replaceValue: string): string;
        (
          string: string,
          replacer: (substring: string, ...args: any[]) => string
        ): string;
      };
      abstract [Symbol.search]: (string: string) => number;
      abstract [Symbol.split]: (
        string: string,
        limit?: number | undefined
      ) => string[];
      abstract [Symbol.matchAll]: (
        str: string
      ) => IterableIterator<RegExpMatchArray>;
    }
    interface IZionRegExp extends RegExp {}
  }
}

export namespace RegExpUtils {
  export class ZionRegExp extends RegExp implements RegExpUtils.IZionRegExp {
    static [key: string]: RegExp | unknown;
    static folderNameFromFolderPath = /\w+$/g;
    static valueBetweenSymbols = /((?<=[/]))(.*?)(?=\.)/;
    static getFileFromPath = /(?<=[/])\w*[.]\w*/g;
    static catchTheFirstWord = /^([\w]+)/g;
    static siCaseUnsensitive = /si/gi;
    static botCaseUnsensitive = /bot/gi;
    static checkFirstSlach = /(^\/)/i;
    static firstAndLast3 = /^.{3}?|.{3}?$/g;
    static everythingBetween = /\{(.*?)\}/g;
    static tsComment = /(\/\*.*\*\/)/g;
    static tsComment2 = /\/\/.*\,/g;
    static allTsComments = /(\/\**.*\*\/)/g;
    static fileExtensionWithPoint = /(\..*)/g;
    static betterAllTsComments = /(\/\/\**.*\*\/)|(?<=\s)\/\**.*\*\//g;
    static filenameFromPath = /[\w-_]+(?=\.)/g;
    static excludeGetAnd_ = /(?![get])(.*?)(?=_)/g;
    static uuid =
      /[0-9a-fA-F]{8}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{4}\-[0-9a-fA-F]{12}/g;
    static firstAndLastDyn = (string = "", span: number) => {
      let stringPattern = `^.{${span}}}?|.{${span}}?$`;
      const flag = "g";
      return string.match(new RegExp(stringPattern, flag));
    };
    static everythingBetweenDyn = (
      symbolA: string,
      symbolB: string
    ): RegExp => {
      let regexp = `${symbolA}(.*?)${symbolB}`;
      return new RegExp(regexp, "g");
    };
    constructor(pattern: string | ZionRegExp, flags?: string) {
      super(pattern, flags);
    }
  }
}
