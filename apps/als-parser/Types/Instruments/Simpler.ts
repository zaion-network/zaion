import { TopUtilities as Utilities } from "../../class/using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/using HigherUtilities/TopUtilities";
import { Sample } from "../AbletonProjectParser/Sample";
// import { Utilities } from "../../class/using
// DeeperUtilities/using DeepUtilites/using
// LowUtilities/Utilities";

import {
  HasImportedSlicePoints,
  Id,
  NeedsAnalysisData,
  NormalizedEnergy,
  Rank,
  TimeInSeconds,
  Value,
} from "../Attributes";
import { BeatGrid } from "../BeatGrid";
import { TimeSignature } from "../Clip";
import { AbletonInstrumentsCommon } from "../Device";
import { FileRef } from "../FileRef";
import { MinMax } from "../Mixer";
import { Onsets } from "../Onsets";
import { SampleRef } from "../SampleRef";
import { WarpMarkers } from "../WarpMarkers";
const ensureArray = Utilities.JavaScript.ArrayUtils.ensureArray;

export interface Range extends MinMax {
  CrossfadeMin: Value;
  CrossfadeMax: Value;
}

export interface SimplerLoop {
  Start: Value;
  End: Value;
  Mode: Value;
  Crossfade: Value;
  Detune: Value;
}

export interface SampleWarpProperties {
  WarpMarkers: WarpMarkers;
  WarpMode: Value;
  GranularityTones: Value;
  GranularityTexture: Value;
  FluctuationTexture: Value;
  ComplexProFormants: Value;
  ComplexProEnvelope: Value;
  TransientResolution: Value;
  TransientLoopMode: Value;
  TransientEnvelope: Value;
  IsWarped: Value;
  Onsets: Onsets;
  TimeSignature: TimeSignature;
  BeatGrid: BeatGrid;
}

export interface SlicePoint extends TimeInSeconds, Rank, NormalizedEnergy {}

export interface SlicePoints {
  SlicePoint: SlicePoint | SlicePoint[];
}

export interface MultiSamplePart
  extends Id,
    HasImportedSlicePoints,
    NeedsAnalysisData {
  LomId: Value;
  Name: Value;
  Selection: Value;
  IsActive: Value;
  Solo: Value;
  KeyRange: Range;
  VelocityRange: Range;
  SelectorRange: Range;
  RootKey: Value;
  Detune: Value;
  TuneScale: Value;
  Panorama: Value;
  Volume: Value;
  Link: Value;
  SampleStart: Value;
  SampleEnd: Value;
  SustainLoop: SimplerLoop;
  ReleaseLoop: SimplerLoop;
  SampleRef: SampleRef;
  SlicingThreshold: Value;
  SlicingBeatGrid: Value;
  SlicingRegions: Value;
  SlicingStyle: Value;
  SampleWarpProperties: SampleWarpProperties;
  SlicePoints: SlicePoints;
  ManualSlicePoints: "";
  BeatSlicePoints: "";
  RegionSlicePoints: "";
  UseDynamicBeatSlices: Value;
  UseDynamicRegionSlices: Value;
}

export interface SampleParts {
  MultiSamplePart: MultiSamplePart | MultiSamplePart[];
}

export interface MultiSampleMap {
  SampleParts: SampleParts;
}

export interface Player {
  MultiSampleMap: MultiSampleMap;
  LoopModulators: unknown;
  Reverse: unknown;
  Snap: unknown;
  SampleSelector: unknown;
  SubOsc: unknown;
  InterpolationMode: unknown;
  UseConstPowCrossfade: unknown;
}

export interface Pitch {
  TransposeKey: unknown;
  TransposeFine: unknown;
  PitchLfoAmount: unknown;
  Envelope: unknown;
  ScrollPosition: unknown;
}

export interface DeviceStatus {
  IsOn: unknown;
  Slot: unknown;
}

interface VolumeAndPan {
  Volume: unknown;
  VolumeVelScale: unknown;
  VolumeKeyScale: unknown;
  VolumeLfoAmount: unknown;
  Panorama: unknown;
  PanoramaKeyScale: unknown;
  PanoramaRnd: unknown;
  PanoramaLfoAmount: unknown;
  Envelope: unknown;
  OneShotEnvelope: unknown;
}

export interface OriginalSimpler extends AbletonInstrumentsCommon {
  Player: Player;
  Pitch: Pitch;
  Filter: DeviceStatus;
  Shaper: DeviceStatus;
  VolumeAndPan: VolumeAndPan;
  AuxEnv: DeviceStatus;
  Lfo: DeviceStatus;
  ["AuxLfos.0"]: string;
  ["AuxLfos.1"]: string;
  KeyDst: string;
  VelDst: string;
  RelVelDst: string;
  ["MidiCtrl.0"]: DeviceStatus;
  ["MidiCtrl.1"]: DeviceStatus;
  ["MidiCtrl.2"]: DeviceStatus;
  ["MidiCtrl.3"]: DeviceStatus;
  Globals: {
    NumVoices: unknown;
    NumVoicesEnvTimeControl: unknown;
    RetriggerMode: unknown;
    ModulationResolution: unknown;
    SpreadAmount: unknown;
    KeyZoneShift: unknown;
    PortamentoMode: unknown;
    PortamentoTime: unknown;
    PitchBendRange: unknown;
    ScrollPosition: unknown;
    EnvScale: unknown;
    IsSimpler: unknown;
    PlaybackMode: unknown;
    LegacyMode: unknown;
  };
  ViewSettings: {
    SelectedPage: unknown;
    ZoneEditorVisible: unknown;
    Seconds: unknown;
    SelectedSampleChannel: unknown;
    VerticalSampleZoom: unknown;
    IsAutoSelectEnabled: unknown;
    SimplerBreakoutVisible: unknown;
  };
  SimplerSlicing: { PlaybackMode: unknown };
}

type Keys = keyof OriginalSimpler;

export class OriginalSimpler {
  constructor(obj: { [key in Keys]: any }) {
    for (let key in obj) {
      this[key as keyof this] = obj[key as keyof typeof obj];
    }
  }

  #fileref: FileRef | undefined;
  get samples() {
    this.Player.MultiSampleMap.SampleParts.MultiSamplePart = ensureArray(
      this.Player.MultiSampleMap.SampleParts.MultiSamplePart
    );
    return this.Player.MultiSampleMap.SampleParts.MultiSamplePart.map((msp) => {
      this.#fileref = new FileRef(msp.SampleRef.FileRef);
      return this.#makeSample();
    });
  }

  #makeSample(): Sample {
    return {
      type: this.#fileref!.pathtype,
      filepath: this.#fileref!.filepath,
      filename: this.#fileref!.filename,
    };
  }
}
