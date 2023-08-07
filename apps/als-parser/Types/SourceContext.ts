import { Id, Value } from "./Attributes";
import { FileRef } from "./FileRef";
import { SearchHint } from "./SearchHint";

export interface OriginalFileRef extends Id {
  FileRef: FileRef;
  Data: string;
  RefersToFolder: Value;
  SearchHint: SearchHint;
  LivePackName: Value;
  LivePackId: Value;
}

export interface BranchSourceContext extends Id {
  OriginalFileRef: OriginalFileRef;
  BrowserContentPath: Value;
  PresetRef: unknown;
  BranchDeviceId: Value;
}

export interface DevicesSourceContext {
  Value: { BranchSourceContext: BranchSourceContext } | "";
}

export type SourceContext = Value | DevicesSourceContext;
