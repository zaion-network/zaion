import { Track as T } from "./Track";

export interface Tracks {
  GroupTrack: Tracks.Track.GroupTrack | Tracks.Track.GroupTrack[];
  AudioTrack: Tracks.Track.AudioTrack | Tracks.Track.AudioTrack[];
  MidiTrack: Tracks.Track.MidiTrack | Tracks.Track.MidiTrack[];
}
export namespace Tracks {
  export import Track = T;
}
