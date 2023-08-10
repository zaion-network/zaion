declare module "./StringUtils" {
  export namespace StringUtils {
    interface generateFilenameCb {
      (line: string): string;
    }
    interface generateFilename {
      (line: string, cb: generateFilenameCb): string;
    }
  }
}
export class StringUtils {}
export namespace StringUtils {
  export namespace PathBuilder {
    export interface PathBuilder {
      endpoint: string;
      encoder: (obj: { [k: string]: string | number | undefined }) => string;
      setEncoder(
        encoder: (obj: { [k: string]: string | number | undefined }) => string
      ): this;
      hasher: (secret: string, value: string) => string;
      setHasher(hasher: (secret: string, value: string) => string): this;
      build<T extends { [k: string]: string | number | undefined }>(
        props: T
      ): string;
      options?: {
        timestamped?: boolean;
        signed?: boolean;
        secret?: string;
        payload?: boolean;
      };
    }
    export class PathBuilder implements PathBuilder {
      constructor(
        public endpoint: string,
        public options?: {
          timestamped?: boolean;
          signed?: boolean;
          secret?: string;
          payload?: boolean;
        }
      ) {}
      setEncoder(
        encoder: (obj: { [k: string]: string | number | undefined }) => string
      ): this {
        this.encoder = encoder;
        return this;
      }
      setHasher(hasher: (secret: string, value: string) => string): this {
        this.hasher = hasher;
        return this;
      }
      build<
        T extends {
          [k: string]: string | number | undefined;
          timestamp?: number;
          signature?: string;
        }
      >(props: T): string {
        if (this.options?.timestamped) props.timestamp = Date.now();
        if (!this.encoder) throw new Error("set encoder first");
        if (this.options?.signed)
          props.signature = this.hasher(
            this.options.secret!,
            this.encoder(props)
          );
        if (!this.options?.payload) {
          return `${this.endpoint}?${this.encoder(props)}`;
        } else {
          return this.encoder(props);
        }
      }
    }
  }
  export interface splitAtChar {
    (char: string): (e: string) => string[];
  }
  export const splitAtChar: splitAtChar = char => e => {
    return e.split(char);
  };

  export interface customTag {
    (strings: TemplateStringsArray, ...values: any[]): string;
  }
  export const customTag: customTag = (strings, ...values) => {
    let result = "";
    for (let i = 0; i < strings.length; i++) {
      result += strings[i];
      if (i < values.length) {
        result += values[i];
      }
    }
    return result;
  };

  export interface customTagMaker {
    (...args: string[]): string;
  }

  export const generateFilename: generateFilename = (
    line: string,
    cb: generateFilenameCb
  ) => {
    return cb(line);
  };

  export namespace ZionBase {
    export interface IsplitAt_v1 {
      (string: string, symbol: string): string[];
    }
    export const splitAt_v1: (
      filterCb: (
        value: string,
        index: number,
        array: string[]
      ) => value is string,
      thisArg?: any
    ) => IsplitAt_v1 = filterCb => (string: string, symbol: string) => {
      return string.split(symbol).filter(filterCb);
    };

    export interface IupperCaseFirst_v1 {
      (string: string): string;
    }

    export const upperCaseFirst_v1: IupperCaseFirst_v1 = function (
      string: string
    ) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };
  }
}
