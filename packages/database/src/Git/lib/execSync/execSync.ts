import {
  execSync as es,
  ExecSyncOptionsWithBufferEncoding,
} from "child_process";

export function execSync(
  command: string,
  options?: {
    withResponse?: true;
    filter: true;
  }
): string[];
export function execSync(
  command: string,
  options?: {
    withResponse?: true;
    cwd: string;
  }
): string[];
// raw true
export function execSync(
  command: string,
  options?: {
    raw: true;
    git?: true;
  }
): string;
// raw true
export function execSync(
  command: string,
  options: {
    raw: true;
    cwd?: string;
  }
): string;
// raw true
export function execSync(
  command: string,
  options?: {
    raw: true;
    cwd?: string;
    withResponse: true;
    git: true;
  }
): string;
// raw true
export function execSync<T>(
  command: string,
  options: {
    raw: true;
    cwd: string | undefined;
    git: true;
  }
): T;
export function execSync(
  command: string,
  options?: {
    withResponse?: true;
    maxBuffer?: number;
    trim?: boolean;
  }
): string[];
export function execSync(
  command: string,
  options?: {
    withResponse?: true;
    maxBuffer?: number;
    trim?: boolean;
    cwd?: string;
  }
): string[];
export function execSync(
  command: string,
  options?: {
    log: true;
  }
): void;
export function execSync(
  command: string,
  options: undefined
): string[];
export function execSync(
  command: string,
  options?: {
    withResponse?: boolean;
    trim?: boolean;
    log?: boolean;
    maxBuffer?: number;
    cwd?: string;
    raw?: boolean;
    git?: boolean;
    filter?: boolean;
  }
): string[] | string | void {
  const DECODE_TYPE = "utf-8";
  const SPLIT_VALUE = "\n";
  let response = es(command);
  let string = response.toString(DECODE_TYPE);
  let formatted;
  if (options) {
    if (!options.raw) {
      let opts: ExecSyncOptionsWithBufferEncoding = {
        cwd: options.cwd,
        maxBuffer: options.maxBuffer,
      };
      response = es(command, opts);
      string = response.toString(DECODE_TYPE);
      formatted = options.trim
        ? string.trim().split(SPLIT_VALUE)
        : options.filter
        ? string.split(SPLIT_VALUE).filter(Boolean)
        : string.split(SPLIT_VALUE);
      if (options.log)
        formatted.forEach(e => console.log(e));
      else return formatted;
    } else {
      string = response.toString(DECODE_TYPE);
      if (options.git) {
        return string
          .split("\n")
          .filter(Boolean)
          .map(j => JSON.parse(j));
      } else {
        return string;
      }
    }
  } else {
    string = response.toString(DECODE_TYPE);
    formatted = string.split(SPLIT_VALUE);
    return formatted;
  }
}
