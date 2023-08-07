import { MidiClip } from "./Clip";
import { AudioClip } from "./Clip";

export interface AudioEvents {
  AudioClip: AudioClip | AudioClip[];
}

export interface MidiEvents {
  MidiClip: MidiClip | MidiClip[];
}

export interface Events extends AudioEvents, MidiEvents {}
