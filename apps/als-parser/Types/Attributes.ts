export namespace Attributes {
  export interface Value {
    ["@Value"]: string;
  }
  export interface Id {
    ["@Id"]: string;
  }
  export interface LomId {
    ["@LomId"]: string;
  }
  export interface Time {
    ["@Time"]: string;
  }
  export interface Dir {
    ["@Dir"]: string;
  }
  export interface SecTime {
    ["@SecTime"]: string;
  }
  export interface BeatTime {
    ["@BeatTime"]: string;
  }
  export interface TimeInSeconds {
    ["@TimeInSeconds"]: string;
  }
  export interface Rank {
    ["@Rank"]: string;
  }
  export interface NormalizedEnergy {
    ["@NormalizedEnergy"]: string;
  }
  export interface HasImportedSlicePoints {
    ["@HasImportedSlicePoints"]: string;
  }
  export interface NeedsAnalysisData {
    ["@NeedsAnalysisData"]: string;
  }

  export interface ValueMember {
    Value: string;
  }
}
