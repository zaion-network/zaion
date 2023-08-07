import { Dir, Id, Value } from "./Attributes";
import { RelativePathElement } from "./RelativePathElement";

export interface PathHint {
  RelativePathElement: RelativePathElement | RelativePathElement[];
}

export interface SearchHint {
  PathHint: PathHint;
  FileSize: Value;
  Crc: Value;
  MaxCrcSize: Value;
  HasExtendedInfo: Value;
}
