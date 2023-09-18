import { FileSystem as FS } from "./Node/FileSystem";
import { ChildProcess as CP } from "./Node/ChildProcess";
import { Crypto as C } from "./Node/Crypto";
import { Path as P } from "./Node/Path";
import { Https as Hs } from "./Node/Https";

// declare module "./Node/FileSystem" {}
// declare module "./Node/ChildProcess" {}
// declare module "./Node/Crypto" {}
// declare module "./Node/Path" {}
declare module "./Node" {
  export namespace Node {
    export import FileSystem = FS;
    export import ChildProcess = CP;
    export import Crypto = C;
    export import Path = P;
    export import Https = Hs;
  }
}

export class Node {}
Node.FileSystem = FS;
Node.ChildProcess = CP;
Node.Crypto = C;
Node.Path = P;
Node.Https = Hs;
