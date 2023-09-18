import {
  checkFileExists,
  checkAndRemove,
  ReaddirSync,
  StatsSync,
} from "./using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/Node/FileSystem";

import {} from "./using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/Node/ChildProcess";
import { ExecSync } from "./using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/Node/ChildProcess/ExecSync";

import {
  hmacIt,
  hashIt,
} from "./using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/Node/Crypto";
import {
  ifUndefinedGeneric,
  ifUndefined,
  buildPaths,
  buildPathTuple,
  joinPaths,
} from "./using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/Node/Path";
import { httpRequest } from "./using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/Node/Https";

declare module "./Node" {
  namespace Node {
    interface FileSystem {}
    namespace FileSystem {}

    interface ChildProcess {}
    namespace ChildProcess {}

    interface Crypto {}
    namespace Crypto {}

    interface Path {}
    namespace Path {}

    interface Https {}
    namespace Https {}
  }
}

export const FileSystem: Node.FileSystem = {
  checkFileExists,
  checkAndRemove,
  ReaddirSync,
  StatsSync,
};
export const ChildProcess: Node.ChildProcess = {
  ExecSync,
};
export const Crypto: Node.Crypto = { hmacIt, hashIt };
export const Path: Node.Path = {
  ifUndefinedGeneric,
  ifUndefined,
  buildPaths,
  buildPathTuple,
  joinPaths,
};
export const Https: Node.Https = { httpRequest };
