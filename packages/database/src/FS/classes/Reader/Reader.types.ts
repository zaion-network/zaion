import * as _Reader from ".";
import { AbstractNoizYamlToFile_v1Ctor } from "../NoizYaml/NoizYaml.types";
import { AbstractNoizYaml_v1Ctor } from "../NoizYaml/NoizYaml.types";
import { AbtractNoizCsvCtor } from "../NoizCsv/NoizCsv.types";
import EventEmitter from "events";
import { Dirent } from "fs";

const ReaderExport: ReaderExport = _Reader;

interface ReaderExport {
  Reader: AbstractReaderCtor;
  ReaderCtor: AbstractReaderCtor;
  reader: any;
}

abstract class AbstractReader {
  abstract NoizYaml: AbstractNoizYaml_v1Ctor<unknown>;
  abstract NoizYamlToFile: AbstractNoizYamlToFile_v1Ctor;
  abstract NoizCsv: AbtractNoizCsvCtor;
  abstract path: string;
  abstract stringifyFile(
    path: string,
    options?:
      | ({
          encoding?: null | undefined;
          flag?: string | undefined;
        } & EventEmitter.Abortable)
      | null
      | undefined
  ): string;
  abstract readFoldersInDir(path: string): Dirent[];
  abstract readFilesInFolder(path: string): {
    name: string;
    path: string;
  }[];
  abstract joinPaths(paths: string[]): string;
}

interface AbstractReaderCtor {
  new (path?: string): AbstractReader;
}
