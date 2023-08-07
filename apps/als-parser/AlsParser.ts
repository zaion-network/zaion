import { XMLParser } from "fast-xml-parser";
import { NameAnalyzer } from "./NameAnalyzer";
import { readFileSync } from "fs";
import zlib from "zlib";
// TYPES
import { LiveSet } from "./Types/LiveSet";
import { Tracks } from "./Types/Tracks";
import { Track } from "./Types/Track";
import { AbletonXml } from "./Types/AbletonXml";
import { ArrangerAutomation } from "./Types/ArrangerAutomation";
import { AudioEvents, Events } from "./Types/Events";
import { Attributes } from "./Types/Attributes";
import { AudioClip, Clip, ClipSlotList } from "./Types/Clip";
import {
  // Sequencer,
  MainSequencer,
  // FreezeSequencer,
} from "./Types/MainSequencer";
import { DeviceChain } from "./Types/DeviceChain";
import { Device } from "./Types/Device";
import { InstrumentsWithSamples } from "./Types/InstrumentsWithSamples";
import { DrumGroupDevice } from "./Types/Instruments/DrumRack";
import { Sample } from "./Types/AbletonProjectParser/Sample";
import { InstrumentImpulse } from "./Types/Instruments/Impulse";
import { MultiSampler } from "./Types/Instruments/MultiSampler";
import { OriginalSimpler } from "./Types/Instruments/Simpler";
import { InstrumentVector } from "./Types/Instruments/Wavetable";
import { InstrumentGroupDevice } from "./Types/Instruments/InstrumentRack";
import { Cache } from "./IPC Server/Cache";
import { HigherUtilities as Utilities } from "./class/using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/HigherUtilites";

const ensureArray = Utilities.JavaScript.ArrayUtils.ensureArray;

interface XmlGenericObject {
  [key: string]: string | number | boolean | XmlGenericObject;
}

interface GenericObject {
  [key: string]: any;
}

type InitialValueToBeChanged = XmlGenericObject | undefined;
type StringToBeChecked = string | undefined;

type getTypes =
  | "object"
  | "tempo"
  | "basicInfo"
  | "pathsOfValue"
  | "liveset"
  | "parsed"
  | "clipsOfTrack"
  | "allSamples"
  | "objectOfValue";

export class AlsParser {
  #optionsType;
  #cache: Cache<any>;
  constructor(optionsType?: "default" | "advanced") {
    this.#optionsType = optionsType;
    this.#cache = new Cache(10_000);
  }
  #checkNumberOfAudioTracks() {
    return this.#checkNumberOfTracks(this.#audioTracks!);
  }
  #checkNumberOfMidiTracks() {
    const tracks = this.#liveset!.Tracks;
    return this.#checkNumberOfTracks(tracks.MidiTrack);
  }
  #checkNumberOfTracks(
    value:
      | XmlGenericObject
      | Track.AudioTrack
      | Track.MidiTrack
      | (XmlGenericObject | Track.AudioTrack | Track.MidiTrack)[]
  ): number {
    const ifArray = (value: any[]) => value.length;
    const ifObject = () => 1;
    const ifElse = () => 0;

    let state: undefined | 0 | 1 | 2 = undefined;
    Array.isArray(value)
      ? (state = 0)
      : typeof value === "object"
      ? (state = 1)
      : (state = 2);

    const map = new Map<0 | 1 | 2, (...args: any[]) => number>();
    map.set(0, ifArray);
    map.set(1, ifObject);
    map.set(2, ifElse);
    return map.get(state)!();

    // if (Array.isArray(value)) {
    //   return value.length;
    // } else if (typeof value === "object") {
    //   return 1;
    // } else return 0;
  }
  #checkSetTempo() {
    return this.#liveset!.MasterTrack.DeviceChain.Mixer.Tempo.Manual.Value;
  }
  #checkAllMidiTracks() {
    let array;
    if (!Array.isArray(this.#liveset!.Tracks.MidiTrack))
      array = [this.#liveset!.Tracks.MidiTrack];
    else array = this.#liveset!.Tracks.MidiTrack;
    return array.map((t) => this.#checkMidiTrack(t));
  }
  #checkMidiTrack(miditrack: any) {
    let device: string = this.#checkDevice(miditrack);
    if (device === "vst plugin" || device === "au plugin") {
      device = "plugin";
      let type = this.#checkPlugType(miditrack);
      let name = this.#getPluginName(miditrack);
      return { device: device, type, name };
    }
  }
  #checkPlugType(miditrack: any) {
    const devices = miditrack.DeviceChain.DeviceChain.Devices;
    if ("AuPluginDevice" in devices) return "au";
    else if ("PluginDevice" in devices) {
      let plugindevice = devices.PluginDevice;
      let plugdesc = plugindevice.PluginDesc;
      if ("Vst3PluginInfo" in plugdesc) return "vst3";
      else return "vst";
    } else return "not yet known";
  }
  #checkDevice(miditrack: any) {
    const devices = miditrack.DeviceChain.DeviceChain.Devices;
    if ("DrumGroupDevice" in devices) return "drum rack";
    if ("AuPluginDevice" in devices) return "au plugin";
    if ("PluginDevice" in devices) return "vst plugin";
    if ("UltraAnalog" in devices) return "analog";
    if ("Collision" in devices) return "collision";
    if ("LoungeLizard" in devices) return "electric";
    if ("ProxyInstrumentDevice" in devices) return "external device";
    if ("InstrumentImpulse" in devices) return "impulse";
    if ("InstrumentGroupDevice" in devices) return "instrument rack";
    if ("Operator" in devices) return "operator";
    if ("MultiSampler" in devices) return "sampler";
    if ("OriginalSimpler" in devices) return "simpler";
    if ("StringStudio" in devices) return "tension";
    if ("InstrumentVector" in devices) return "wavetable";
    if ("GroupTrack" in devices) return "grouptrack";
    return Object.keys(devices)[0];
  }
  #getPluginName(miditrack: Track.MidiTrack) {
    if (this.#checkPlugType(miditrack) === "au") {
      return this.#auPluginName(miditrack);
    } else if (this.#checkPlugType(miditrack) === "vst") {
      return this.#vstPluginName(miditrack);
    } else if (this.#checkPlugType(miditrack) === "vst3") {
      return this.#vst3PluginName(miditrack);
    } else return null;
  }

  #getAudioClipsOfTrack = (tracks: Tracks, audiotrack: number) => {
    let array;
    if (!Array.isArray(tracks.AudioTrack)) array = [tracks.AudioTrack];
    else array = tracks.AudioTrack;
    let devchain = array[audiotrack].DeviceChain;
    if ("MainSequencer" in devchain) {
      if ("Sample" in devchain.MainSequencer) {
        let events = devchain.MainSequencer.Sample.ArrangerAutomation.Events;
        if (typeof events !== "string" && "AudioClip" in events)
          return events.AudioClip;
      }
    }
  };

  #auPluginName = (miditrack: any) => {
    let devices = miditrack.DeviceChain.DeviceChain.Devices;
    if (Array.isArray(devices)) throw new Error();
    if ("AuPlugin" in devices) {
      return devices.AuPluginDevice.PluginDesc.AuPluginInfo.Name.Value;
    }
  };

  #vstPluginName = (miditrack: any) =>
    miditrack.DeviceChain.DeviceChain.Devices.PluginDevice.PluginDesc
      .VstPluginInfo.PlugName.Value;

  #vst3PluginName = (miditrack: any) =>
    miditrack.DeviceChain.DeviceChain.Devices.PluginDevice.PluginDesc
      .Vst3PluginInfo.Name.Value;

  #manufacturer = (miditrack: any) =>
    miditrack.DeviceChain.DeviceChain.Devices.AuPluginDevice.PluginDesc
      .AuPluginInfo.Manufacturer.Value;

  #inputFilePath: StringToBeChecked;
  #outputFilePath: StringToBeChecked;
  #sourceFilePath: StringToBeChecked;

  // utils

  #buildPaths() {
    let basepath;
    if (this.#path) basepath = this.#path;
    else basepath = ".";
    const sourceFilePath = `${basepath}/${this.#filename}`;
    const filename_base = this.#filename!.replace(".als", "");
    const inputFilePath = `./${filename_base}.gzip`;
    const outputFilePath = `./${filename_base}.xml`;
    this.#sourceFilePath = sourceFilePath;
    // this.#inputFilePath = inputFilePath;
    // this.#outputFilePath = outputFilePath;
    return [sourceFilePath, inputFilePath, outputFilePath];
  }

  #compressedFile: Buffer | undefined;
  #loadCompressedFile() {
    this.#compressedFile = readFileSync(this.#sourceFilePath!);
  }

  #decompressedFile: StringToBeChecked;
  #inflate() {
    // this.#decompressedFile =
    // zlib.inflateSync(this.#compressedFile.toString());

    const buffer = readFileSync(this.#sourceFilePath!);

    // rinominare la copia in .gzip

    // decomprimere il buffer copiato
    this.#decompressedFile = zlib.gunzipSync(buffer).toString();
  }

  #filename: StringToBeChecked;
  #path: StringToBeChecked;
  #value: any;
  #values: [StringToBeChecked, number] | undefined;
  get(type: "allSamples", filename: string): Promise<Sample[]>;
  get(
    type: "pathsOfValue",
    filename: string,
    path: string,
    value: string
  ): Promise<Sample[]>;
  get(type: "parsed", filename: string): Promise<[AbletonXml]>;
  async get(
    type: getTypes,
    filename: string,
    path?: string,
    value?: string | [StringToBeChecked, number]
  ) {
    if (typeof filename === "string") {
      this.#filename = filename;
      this.#path = path;
      if (!Array.isArray(value)) {
        this.#value = value;
      } else {
        this.#values = value;
      }
      this.#buildPaths();
      this.#loadCompressedFile();
      this.#inflate();
      const callbacks: { [props in getTypes]: any } = {
        object: this.#createObject,
        tempo: this.#getSetTempo,
        basicInfo: this.#basicInfo,
        pathsOfValue: this.#pathsOfValue,
        liveset: this.#getLiveset,
        parsed: this.#getParsed,
        clipsOfTrack: this.#getClipsOfTrackStrategy(this.#value),
        objectOfValue: this.#objectOfValue,
        allSamples: this.#getAllSamples,
      };
      let res = await callbacks[type]();
      // this.#cache.close();
      return res;
    }
  }

  #parsedFiled: AbletonXml | undefined;
  #ableton: AbletonXml.Ableton | undefined;
  #liveset: LiveSet | undefined;
  #tracks: Tracks | undefined;
  #audioTracks: Track.AudioTrack | Track.AudioTrack[] | undefined;
  #midiTracks: Track.MidiTrack | Track.MidiTrack[] | undefined;
  #defaultOptions = {
    attributeNamePrefix: "@",
    ignoreAttributes: false,
  };
  /**
   * these options are suitable for rebuilding purposes
   */
  #advancedOptions = {
    attributeNamePrefix: "@",
    format: true,
    ignoreAttributes: false,
    alwaysCreateTextNode: true,
    preserveOrder: true,
    indentBy: "\t",
  };
  #optionsTypes = {
    default: this.#defaultOptions,
    advanced: this.#advancedOptions,
  };
  #selectedOptions = () => {
    return this.#optionsTypes[
      this.#optionsType ? this.#optionsType : "default"
    ];
  };
  async #parseFile() {
    const parser = new XMLParser(this.#selectedOptions());
    async function asyncparse(string: string) {
      return parser.parse(string);
    }
    const process = this.#cache.process;
    const parsed = await process(asyncparse, [this.#decompressedFile!]);
    this.#parsedFiled = parsed;
    if (!this.#optionsType || this.#optionsType === "default") {
      this.#ableton = parsed.Ableton;
      this.#liveset = this.#ableton!.LiveSet;
      this.#tracks = this.#liveset.Tracks;
      this.#audioTracks = this.#liveset.Tracks.AudioTrack;
      this.#midiTracks = this.#liveset.Tracks.MidiTrack;
    }
    return parsed;
  }

  #logDecompressed() {
    console.log("File decompressed.");
  }

  #getClipsOfTrackStrategy = (track: number) => () => {
    this.#parseFile();
    return this.#getAudioClipsOfTrack(this.#tracks!, track);
  };

  #getAllSamples = async () => {
    // this.#parseFile();
    let start = performance.now();
    await this.#parseFile();
    let stop = performance.now();
    console.log(stop - start);
    const ableton = this.#parsedFiled?.Ableton;
    const tracks = ableton?.LiveSet.Tracks;

    let audiotracks: Track.AudioTrack[] = [];
    let freezedaudiotracks: Track.AudioTrack[] = [];
    let miditracks: Track.MidiTrack[] = [];
    let freezedmiditracks: Track.MidiTrack[] = [];
    // const OLD = 0;
    // if (OLD) {
    //   audiotracks = Utilities.isArray(tracks!.AudioTrack);
    //   miditracks = Utilities.isArray(tracks!.MidiTrack);
    // } else {
    // }
    if (tracks && tracks.AudioTrack) {
      ensureArray(tracks.AudioTrack).forEach((e) => {
        if (e.Freeze["@Value"] !== "true") audiotracks.push(e);
        else freezedaudiotracks.push(e);
      });
    }
    if (tracks && tracks.MidiTrack) {
      ensureArray(tracks.MidiTrack).forEach((e) => {
        if (e.Freeze["@Value"] !== "true") miditracks.push(e);
        else freezedmiditracks.push(e);
      });
    }
    const grouptracks = tracks!.GroupTrack;

    let devices: Device[] = [];
    let devicesWithSamples: Device[] = [];

    const map: Map<InstrumentsWithSamples, any> = new Map<
      InstrumentsWithSamples,
      any
    >();

    // check midi devices
    const isMidiTrackArray = (obj: any): obj is Track.MidiTrack[] =>
      Array.isArray(obj);

    if (isMidiTrackArray(miditracks)) {
      miditracks.forEach((track) => {
        devices.push(track.DeviceChain.DeviceChain.Devices as Device);
      });
    }
    type oo = (keyof typeof InstrumentsWithSamples)[];
    let keys: oo = Object.keys(InstrumentsWithSamples) as oo;
    keys.forEach((i) => {
      map.set(InstrumentsWithSamples[i], true);
    });
    let samples: Sample[] = [];
    freezedmiditracks.forEach((e) => {
      const freezeseq = new MainSequencer.FreezeSequencer(
        e.DeviceChain.FreezeSequencer
      );
      if (freezeseq.samples) samples.push(...freezeseq.samples);

      // console.log(e.DeviceChain.FreezeSequencer.ClipSlotList);
    });
    devices.forEach((d) => {
      const key = Object.keys(d)[0] as InstrumentsWithSamples;
      const cond = map.get(key);
      if (cond) {
        // @ts-expect-error
        let obj = d[key];
        if (key === "DrumGroupDevice") {
          let drumrack = new DrumGroupDevice(obj);
          samples.push(...drumrack.samples);
        } else if (key === "InstrumentImpulse") {
          let impulse = new InstrumentImpulse(obj);
          samples.push(...impulse.samples);
        } else if (key === "MultiSampler") {
          let sampler = new MultiSampler(obj);
          samples.push(...sampler.samples);
        } else if (key === "OriginalSimpler") {
          let simpler = new OriginalSimpler(obj);
          samples.push(...simpler.samples);
        } else if (key === "InstrumentVector") {
          let wavetable = new InstrumentVector(obj);
          samples.push(...wavetable.samples);
        } else if (key === "InstrumentGroupDevice") {
          let instrumentrack = new InstrumentGroupDevice(obj);
          samples.push(...instrumentrack.samples);
        } else {
          console.log(key);
        }
      }
    });
    let audioclipssamples = audiotracks
      .map((a) => {
        const MainSequencer: MainSequencer.Sequencer = a.DeviceChain
          .MainSequencer as MainSequencer.Sequencer;
        const audioclips = ensureArray(
          (MainSequencer.Sample.ArrangerAutomation.Events as AudioEvents)
            .AudioClip
        );
        const freezed_audioclipsinslots = "";
        const freezed_audioclips = "";
        const audioclipsinslots = MainSequencer.ClipSlotList.ClipSlot.filter(
          (e) => e.ClipSlot.Value !== ""
        ).map((e) => {
          if (e.ClipSlot.Value !== "") {
            if ("AudioClip" in e.ClipSlot.Value) {
              const audioclip = new AudioClip(
                e.ClipSlot.Value.AudioClip as AudioClip
              );
              return audioclip.sample;
            }
            if ("MidiClip" in e.ClipSlot.Value) {
              return null;
            }
          }
        });
        return audioclips
          .map((a) => {
            if (a) {
              let audioclip = new AudioClip(a);
              return audioclip.sample;
            } else return null;
          })
          .concat(audioclipsinslots as Sample[]);
      })
      .flat()
      .filter(Boolean);

    return audioclipssamples.concat(samples).flat();
  };

  #getParsed = () => {
    this.#parseFile();
    return [this.#parsedFiled, "this.#decompressedFile"];
  };

  #getLiveset = () => {
    this.#parseFile();
    return this.#liveset;
  };

  get liveset() {
    if (this.#liveset) {
      console.log("cached");
      return this.#liveset;
    } else {
      console.log("not cached");
      this.#getLiveset();
      return this.#liveset;
    }
  }

  #hasFreezedTracks() {
    return this.#tracksStatuses!.some((e) => {
      const options = {
        true: true,
        false: false,
      };
      return options[e.isFreezed["@Value"].toString() as "true" | "false"];
    });
  }

  #hasEventsInArrangement() {
    return this.#tracksStatuses!.some((e) => e.hasEventsInArrangement);
  }

  #hasClipsInSlots() {
    return this.#tracksStatuses!.some(
      (e: { hasClipsInSlots: boolean }) => e.hasClipsInSlots
    );
  }

  #trackDeviceChain:
    | DeviceChain.AudioDeviceChain
    | DeviceChain.MidiDeviceChain
    | DeviceChain.GroupDeviceChain
    | undefined;
  #mainSequencer: MainSequencer | undefined;
  #clipSlotList: ClipSlotList | undefined;
  #clipSlot: Clip[] | undefined;
  #hasTrackClipInASlot() {
    return this.#clipSlot!.map(this.#hasSlotAClip).some((e) => e === true);
  }
  #hasSlotAClip = (slot: Clip) => {
    return slot.ClipSlot.Value === "" ? false : true;
  };

  #arrangerAutomation: ArrangerAutomation | undefined;
  #events: Events | undefined | string;
  #getTrackStatus(miditrack: Track.MidiTrack | Track.AudioTrack, type?: any) {
    this.#trackDeviceChain = miditrack.DeviceChain;
    if ("MainSequencer" in this.#trackDeviceChain) {
      this.#mainSequencer = this.#trackDeviceChain.MainSequencer;
      this.#clipSlotList = this.#mainSequencer.ClipSlotList;
      this.#clipSlot = this.#clipSlotList.ClipSlot;
      if ("Sample" in this.#mainSequencer) {
        this.#arrangerAutomation =
          this.#mainSequencer.Sample.ArrangerAutomation;
      } else {
        this.#arrangerAutomation =
          this.#mainSequencer.ClipTimeable.ArrangerAutomation;
      }
    }
    this.#events = this.#arrangerAutomation!.Events;
    return {
      isFreezed: miditrack.Freeze,
      hasClipsInSlots: this.#hasTrackClipInASlot(),
      hasEventsInArrangement:
        this.#events === ""
          ? false
          : this.#events === undefined
          ? undefined
          : true,
    };
  }

  #tracksStatuses:
    | {
        isFreezed: Attributes.Value;
        hasClipsInSlots: any;
        hasEventsInArrangement: boolean | undefined;
      }[]
    | undefined;
  #basicInfo = () => {
    this.#logDecompressed();
    this.#parseFile();
    const tempo = this.#checkSetTempo();
    const hasMidi = this.#checkNumberOfMidiTracks() !== 0;
    const hasAudio = this.#checkNumberOfAudioTracks() !== 0;
    this.#tracksStatuses = [];
    if (Array.isArray(this.#audioTracks)) {
      this.#audioTracks.forEach((e) => {
        this.#tracksStatuses!.push(this.#getTrackStatus(e));
      });
    }
    if (Array.isArray(this.#midiTracks)) {
      this.#midiTracks.forEach((e) => {
        this.#tracksStatuses!.push(this.#getTrackStatus(e));
      });
    }
    const hasFreezedTracks = this.#hasFreezedTracks();
    const hasEventsInArrangement = this.#hasEventsInArrangement();
    const hasClipsInSlots = this.#hasClipsInSlots();
    //

    const positive: GenericObject = {
      hasMidi: "midi",
      hasAudio: "audio",
      hasFreezedTracks: "not-produced",
      hasEventsInArrangement: "arranged",
      hasClipsInSlots: "loop",
    };

    const negative: GenericObject = {
      hasMidi: "production",
    };

    const response: {
      tempo: any;
      hasMidi: boolean;
      hasAudio: boolean;
      hasFreezedTracks: any;
      hasEventsInArrangement: any;
      hasClipsInSlots: any;
      nameType: number | undefined;
      description?: string;
    } & GenericObject = {
      tempo,
      hasMidi,
      hasAudio,
      hasFreezedTracks,
      hasEventsInArrangement,
      hasClipsInSlots,
      nameType: new NameAnalyzer(this.#filename!).analyze(),
    };
    const description = [];
    for (let prop in response) {
      if (response[prop]) {
        if (positive[prop]) description.push(positive[prop]);
      } else {
        if (negative[prop]) description.push(negative[prop]);
      }
    }
    response.description = description.join(".");
    return response;
  };

  #backby: number | undefined;
  #objectOfValue = () => {
    const [value, backby] = this.#values!;
    if (this.#values) {
      this.#value = value;
      this.#backby = backby;
    }
    if (!this.#value) {
      this.#value = value;
    }
    this.#pathsOfValue();
    return this.#getObjectByPath(
      this.#parsedFiled!,
      this.#result![0],
      this.#backby!
    );
  };

  #result: string[] | null | undefined;
  #pathsOfValue = () => {
    this.#logDecompressed();
    this.#parseFile();
    let res = this.#findPaths(this.#parsedFiled!, this.#value!);
    this.#result = res;
    return res;
  };

  #getSetTempo = () => {
    this.#logDecompressed();
    this.#parseFile();
    const tempo = this.#checkSetTempo();
    console.log(tempo);
    return tempo;
  };

  #createObject = () => {
    this.#logDecompressed();
    this.#parseFile();
    // this.#liveset = liveset;
    const hasMidiTracks = this.#checkNumberOfMidiTracks() != 0;
    const hasAudioTracks = this.#checkNumberOfAudioTracks() != 0;
    let obj: { tempo: any; midi?: any; audio?: any } = {
      tempo: this.#checkSetTempo(),
    };
    if (hasMidiTracks)
      obj.midi = {
        n: this.#checkNumberOfMidiTracks(),
        tracks: this.#checkAllMidiTracks(),
      };
    if (hasAudioTracks) {
      obj.audio = {
        n: this.#checkNumberOfAudioTracks(),
        tracks: [],
      };
    }
    return obj;
  };

  #findValue(obj: GenericObject, value: string): GenericObject | null {
    for (let prop in obj) {
      if (obj[prop] === value) {
        return obj;
      } else if (typeof obj[prop] === "object") {
        const result: null | GenericObject = this.#findValue(obj[prop], value);
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
  }

  #findPath(
    obj: GenericObject,
    value: string,
    path: string = ""
  ): null | string {
    for (let prop in obj) {
      if (obj[prop] === value) {
        return `${path}.${prop}`;
      } else if (typeof obj[prop] === "object") {
        const result: null | string = this.#findPath(
          obj[prop],
          value,
          `${path}.${prop}`
        );
        if (result !== null) {
          return result;
        }
      }
    }
    return null;
  }

  #findPaths(
    obj: GenericObject,
    value: string,
    path: string = "",
    results: string[] = []
  ): string[] | null {
    for (let prop in obj) {
      if (obj[prop] === value) {
        results.push(`${path}.${prop}`);
      } else if (typeof obj[prop] === "object") {
        this.#findPaths(obj[prop], value, `${path}.${prop}`, results);
      }
    }
    return results.length > 0 ? results : null;
  }

  #getObjectByPath = (obj: GenericObject, path: string, backby: number) => {
    const pathElements = path.split(".").filter(Boolean);
    let result = obj;
    let pad = backby ? backby : 0;
    let level = pathElements.length - pad;
    for (let i = 0; i < level; i++) {
      const pathElement = pathElements[i];
      const isArrayIndex = /^\d+$/.test(pathElement);
      if (isArrayIndex) {
        result = result[parseInt(pathElement)];
      } else {
        result = result[pathElement];
      }
    }
    return result;
  };
}

const entitiesWhichUseAudio = {
  instruments: {
    ableton: ["simpler", "sampler", "wavetable", "impulse", "audio-clip"],
    max: [],
  },
  tracks: {
    audio: true,
    midi: false,
  },
};
