import { Cache } from "@zaionstate/ipc-server";
import { Sample } from "./Types/AbletonProjectParser/Sample";
import { AbletonXml } from "./Types/AbletonXml";
import { ArrangerAutomation } from "./Types/ArrangerAutomation";
import { Attributes } from "./Types/Attributes";
import { AudioClip, Clip, ClipSlotList } from "./Types/Clip";
import { DeviceChain } from "./Types/DeviceChain";
import { Events } from "./Types/Events";
import { LiveSet } from "./Types/LiveSet";
import { MainSequencer } from "./Types/MainSequencer";
import { Track } from "./Types/Track";
import { Tracks } from "./Types/Tracks";

type AudioTrack = Track.AudioTrack;
type MidiTrack = Track.MidiTrack;

type StringToBeChecked = string | undefined;

interface XmlGenericObject {
  [key: string]: string | number | boolean | XmlGenericObject;
}

interface GenericObject {
  [key: string]: any;
}

export interface AlsParser {
  optionsType: AlsParser.optionTypes;
  cache: Cache<any>;
  compressedFile: Buffer | undefined;
  decompressedFile: StringToBeChecked;
  inputFilePath: StringToBeChecked;
  outputFilePath: StringToBeChecked;
  sourceFilePath: StringToBeChecked;
  filename: StringToBeChecked;
  path: StringToBeChecked;
  value: any;
  values: [StringToBeChecked, number] | undefined;
  parsedFiled: AbletonXml | undefined;
  ableton: AbletonXml.Ableton | undefined;
  liveset: LiveSet | undefined;
  tracks: Tracks | undefined;
  audioTracks: AudioTrack | AudioTrack[] | undefined;
  midiTracks: MidiTrack | MidiTrack[] | undefined;
  defaultOptions: {
    attributeNamePrefix: string;
    ignoreAttributes: boolean;
  };
  trackDeviceChain:
    | DeviceChain.AudioDeviceChain
    | DeviceChain.MidiDeviceChain
    | DeviceChain.GroupDeviceChain
    | undefined;
  mainSequencer: MainSequencer | undefined;
  clipSlotList: ClipSlotList | undefined;
  clipSlot: Clip[] | undefined;
  arrangerAutomation: ArrangerAutomation | undefined;
  events: Events | undefined | string;
  tracksStatuses:
    | {
        isFreezed: Attributes.Value;
        hasClipsInSlots: any;
        hasEventsInArrangement: boolean | undefined;
      }[]
    | undefined;
  backby: number | undefined;
  result: string[] | null | undefined;
}

export interface AlsParserContext {
  checkNumberOfAudioTracks(): number;
  checkNumberOfMidiTracks(): number;
  checkNumberOfTracks(
    value:
      | XmlGenericObject
      | AudioTrack
      | MidiTrack
      | (XmlGenericObject | AudioTrack | MidiTrack)[]
  ): number;
  checkSetTempo(): any;
  checkMidiTrack(miditrack: any):
    | {
        device: string;
        type: string;
        name: any;
      }
    | undefined;
  checkPlugType(miditrack: any): "au" | "vst3" | "vst" | "not yet known";
  checkDevice(miditrack: any): string;
  getPluginName(miditrack: MidiTrack): any;
  getAudioClipsOfTrack: (
    tracks: Tracks,
    audiotrack: number
  ) => AudioClip | AudioClip[] | undefined;
  auPluginName: (miditrack: any) => any;
  vstPluginName: (miditrack: any) => any;
  vst3PluginName: (miditrack: any) => any;
  manufacturer: (miditrack: any) => any;
  buildPaths(): string[];
  loadCompressedFile(): void;
  inflate(): void;
  get(type: "allSamples", filename: string): Promise<Sample[]>;
  get(
    type: "pathsOfValue",
    filename: string,
    path: string,
    value: string
  ): Promise<Sample[]>;
  get(type: "parsed", filename: string): Promise<[AbletonXml]>;
  get(type: "allSamples", filename: string): Promise<Sample[]>;

  selectedOptions: () =>
    | {
        attributeNamePrefix: string;
        ignoreAttributes: boolean;
      }
    | {
        attributeNamePrefix: string;
        format: boolean;
        ignoreAttributes: boolean;
        alwaysCreateTextNode: boolean;
        preserveOrder: boolean;
        indentBy: string;
      };
  parseFile(): Promise<any>;
  logDecompressed(): void;
  getClipsOfTrackStrategy: (
    track: number
  ) => () => AudioClip | AudioClip[] | undefined;
  getAllSamples: () => Promise<(Sample | null)[]>;
  getParsed: () => (string | AbletonXml | undefined)[];
  getLiveset: () => LiveSet | undefined;
  hasFreezedTracks(): boolean;
  hasEventsInArrangement(): boolean;
  hasClipsInSlots(): boolean;
  hasTrackClipInASlot(): boolean;
  hasSlotAClip: (slot: Clip) => boolean;
  getTrackStatus(
    miditrack: MidiTrack | AudioTrack,
    type?: any
  ): {
    isFreezed: Attributes.Value;
    hasClipsInSlots: boolean;
    hasEventsInArrangement: boolean | undefined;
  };
  basicInfo: () => {
    tempo: any;
    hasMidi: boolean;
    hasAudio: boolean;
    hasFreezedTracks: any;
    hasEventsInArrangement: any;
    hasClipsInSlots: any;
    nameType: number | undefined;
    description?: string | undefined;
  } & GenericObject;
  objectOfValue: () => GenericObject;
  pathsOfValue: () => string[] | null;
  getSetTempo: () => any;
  createObject: () => {
    tempo: any;
    midi?: any;
    audio?: any;
  };
  findValue(obj: GenericObject, value: string): GenericObject | null;
  findPath(obj: GenericObject, value: string, path?: string): null | string;
  findPaths(
    obj: GenericObject,
    value: string,
    path?: string,
    results?: string[]
  ): string[] | null;
  getObjectByPath: (
    obj: GenericObject,
    path: string,
    backby: number
  ) => GenericObject;
}

export namespace AlsParser {
  export enum optionTypes {
    default = "default",
    advanced = "advanced",
  }
}
