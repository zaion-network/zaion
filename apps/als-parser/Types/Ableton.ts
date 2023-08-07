import { LiveSet as L } from "./LiveSet";

export interface Ableton {
  LiveSet: Ableton.LiveSet;
  ["@MajorVersion"]: unknown;
  ["@MinorVersion"]: unknown;
  ["@SchemaChangeCount"]: unknown;
  ["@Creator"]: unknown;
  ["@Revision"]: unknown;
}
export namespace Ableton {
  export import LiveSet = L;
}
