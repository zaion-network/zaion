import { Sample } from "./AbletonProjectParser/Sample";
import { BeatTime, Id, SecTime, Time, Value } from "./Attributes";
import { FileRef } from "./FileRef";
import { Onsets } from "./Onsets";
import { SampleRef } from "./SampleRef";
import { WarpMarkers } from "./WarpMarkers";

export interface Loop {
  LoopStart: Value;
  LoopEnd: Value;
  StartRelative: Value;
  LoopOn: Value;
  OutMarker: Value;
  HiddenLoopStart: Value;
  HiddenLoopEnd: Value;
}

export interface Grid {
  FixedNumerator: unknown;
  GridIntervalPixel: unknown;
  Ntoles: unknown;
  SnapToGrid: unknown;
  Fixed: unknown;
}

export interface TimeSignature {
  TimeSignature: unknown;
}

export interface Envelopes {
  Envelopes: unknown;
}

export interface ScrollerTimePreserver {
  LeftTime: unknown;
  RightTime: unknown;
}

export interface TimeSelection {
  AnchorTime: unknown;
  OtherTime: unknown;
}

export interface GrooveSettings {
  GrooveId: unknown;
}

export interface ClipCommon extends Time, Id {
  LomId: Value;
  LomIdView: Value;
  CurrentStart: Value;
  CurrentEnd: Value;
  Loop: Loop;
  Name: Value;
  Annotation: Value;
  ColorIndex: Value;
  LaunchMode: Value;
  LaunchQuantisation: Value;
  TimeSignature: TimeSignature;
  Envelopes: Envelopes;
  ScrollerTimePreserver: ScrollerTimePreserver;
  TimeSelection: TimeSelection;
  Legato: Value;
  Ram: Value;
  GrooveSettings: GrooveSettings;
  Disabled: Value;
  VelocityAmount: Value;
  FollowTime: Value;
  FollowActionA: Value;
  FollowActionB: Value;
  FollowChanceA: Value;
  FollowChanceB: Value;
  Grid: Grid;
  FreezeStart: Value;
  FreezeEnd: Value;
  IsWarped: Value;
}

export interface MidiClip extends ClipCommon {
  Notes: string;
  BankSelectCoarse: string;
  BankSelectFine: string;
  ProgramChange: string;
  NoteEditorFoldInZoom: string;
  NoteEditorFoldInScroll: string;
  NoteEditorFoldOutZoom: string;
  NoteEditorFoldOutScroll: string;
}

type MidiKeys = keyof MidiClip;

export class MidiClip {
  constructor(obj: { [key in MidiKeys]: any }) {
    for (let key in obj) {
      this[key as keyof this] = obj[key as keyof typeof obj];
    }
  }
}

export interface Fades {
  FadeInLength: Value;
  FadeOutLength: Value;
  ClipFadesAreInitialized: Value;
  CrossfadeInState: Value;
  FadeInCurveSkew: Value;
  FadeInCurveSlope: Value;
  FadeOutCurveSkew: Value;
  FadeOutCurveSlope: Value;
  IsDefaultFadeIn: Value;
  IsDefaultFadeOut: Value;
}

export interface AudioClip extends ClipCommon {
  SampleRef: SampleRef;
  Onsets: Onsets;
  WarpMode: Value;
  GranularityTones: Value;
  GranularityTexture: Value;
  FluctuationTexture: Value;
  TransientResolution: Value;
  TransientLoopMode: Value;
  TransientEnvelope: Value;
  ComplexProFormants: Value;
  ComplexProEnvelope: Value;
  Sync: Value;
  HiQ: Value;
  Fade: Value;
  Fades: Fades;
  PitchCoarse: Value;
  PitchFine: Value;
  SampleVolume: Value;
  MarkerDensity: Value;
  AutoWarpTolerance: Value;
  WarpMarkers: WarpMarkers;
  SavedWarpMarkersForStretched: unknown;
  MarkersGenerated: Value;
  IsSongTempoMaster: Value;
}

type AudioKeys = keyof AudioClip;

export class AudioClip {
  constructor(obj: { [key in AudioKeys]: any }) {
    for (let key in obj) {
      this[key as keyof this] = obj[key as keyof typeof obj];
    }
  }

  #fileref: FileRef | undefined;
  get sample() {
    this.#fileref = new FileRef(this.SampleRef.FileRef);
    return this.#makeSample();
  }

  #makeSample(): Sample {
    return {
      type: this.#fileref!.pathtype,
      filepath: this.#fileref!.filepath,
      filename: this.#fileref!.filename,
    };
  }
}

export interface ClipSlotValue {
  Value:
    | { MidiClip: MidiClip | MidiClip[] }
    | { AudioClip: AudioClip | AudioClip[] }
    | "";
}

export interface Clip {
  LomId: Value;
  ClipSlot: ClipSlotValue;
  HasStop: Value;
  NeedRefreeze: Value;
}

export interface ClipSlotList {
  ClipSlot: Clip[];
}
type ClipSlotListKeys = keyof ClipSlotList;

export class ClipSlotList {
  constructor(obj: { [key in ClipSlotListKeys]: any }) {
    for (let key in obj) {
      this[key as keyof this] = obj[key as keyof typeof obj];
    }
  }
  get samples() {
    return this.ClipSlot.map((s) => {
      if (s.ClipSlot.Value !== "") {
        s.ClipSlot.Value;
        if ("AudioClip" in s.ClipSlot.Value) {
          return new AudioClip(s.ClipSlot.Value.AudioClip as AudioClip).sample;
        }
      } else return null;
    }).filter(Boolean) as Sample[];
  }
}
