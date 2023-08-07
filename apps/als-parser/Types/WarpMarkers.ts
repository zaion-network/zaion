import { BeatTime, Id, SecTime } from "./Attributes";

export interface WarpMarker extends Id, SecTime, BeatTime {}

export interface WarpMarkers {
  WarpMarker: WarpMarker | WarpMarker[];
}
