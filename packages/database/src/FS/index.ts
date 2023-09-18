//// THIS IS THE FS ENTRY POINT EXPORT
// export * from "../../giacomo/FS/FileSystem.js";
// export * from "../../giacomo/FS/System.js";
// classes
// export * from "./classes/Reader.js";
// export * from "./classes/Watcher.js";
// export * from "./classes/Writer.js";
// lib
// export * from "./lib/CRUD.js";
// export * from "./lib/read.js";
// export * from "./lib/readJSON.js";
// export * from "./lib/readPackageJSON.js";
// export * from "./lib/readTSconfigJSON.js";
// export * from "./lib/types/index.js";
/// DIRECT EXPORTS
export * from "../FS/classes/System";
export { ZionCsv } from "./classes/";
export type { IZionCsv } from "./classes/";
export { ZionYaml, ZionYamlToFile } from "./classes";
export { ZionYaml as NoizYaml } from "./classes";
export { NoizPath } from "./classes";
export { NoizBabel } from "./classes";
/// classes
import * as _classes from "./classes";
import { NoizBabel_v1Ctor } from "./classes/NoizBabel/NoizBabel_v1";
import { NoizCsv_v1Ctor } from "./classes/NoizCsv/NoizCsv_v1";
import { NoizPath_v1Ctor } from "./classes/NoizPath/NoizPath_v1";
import { NoizYaml_v2Ctor } from "./classes/NoizYaml/NoizYaml_v2";
import { NoizYaml_v1Ctor } from "./classes/NoizYaml/NoizYaml_v1";
import { NoizYamlToFile_v2 } from "./classes/NoizYaml/NoizYaml_v2";
import { NoizYamlToFile_v1 } from "./classes/NoizYaml/NoizYaml_v1";
import { Reader_v1 } from "./classes/Reader/Reader_v1";
import { Reader_v1Ctor } from "./classes/Reader/Reader_v1";
import { System_v1 } from "./classes/System/System_v1";
import { System_v1Ctor } from "./classes/System/System_v1";
import { Writer_v1Ctor } from "./classes/Writer/Writer_v1";
export const classes: classes = _classes;
_classes.v1;
interface classes {
  NoizBabel: NoizBabel_v1Ctor;
  NoizCsv: NoizCsv_v1Ctor;
  NoizCsvCtor: NoizCsv_v1Ctor; // da cancellare
  NoizPath: NoizPath_v1Ctor;
  NoizPathCtor: NoizPath_v1Ctor; // da cancellare
  NoizYaml: typeof NoizYaml_v2Ctor; // generic
  NoizYamlCtor: typeof NoizYaml_v2Ctor; // generic
  NoizYamlCtor_v1: typeof NoizYaml_v1Ctor; // generic
  NoizYamlToFile: typeof NoizYamlToFile_v2; // generic
  NoizYamlToFile_v1: typeof NoizYamlToFile_v1; // generic
  NoizYaml_v2: typeof NoizYaml_v2Ctor; // generic
  Reader: Reader_v1Ctor;
  ReaderCtor: Reader_v1Ctor;
  System: System_v1Ctor;
  Writer: Writer_v1Ctor;
  WriterCtor: Writer_v1Ctor;
  ZionCsv: NoizCsv_v1Ctor;
  ZionYaml: typeof NoizYaml_v2Ctor; // generic
  ZionYamlToFile: typeof NoizYamlToFile_v2;
  reader: Reader_v1;
  system: System_v1;
  v1: typeof NoizYaml_v1Ctor;
}
export { reader, Reader } from "./classes";
export * as lib from "./lib";
export * as scripts from "./scripts";
