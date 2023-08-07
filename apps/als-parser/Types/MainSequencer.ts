import { AudioClip, ClipSlotList } from "./Clip";
import { ClipTimeable } from "./ClipTimeable";
import { Events } from "./Events";
import { FileRef } from "./FileRef";
import { Mixer } from "./Mixer";
import { Sample } from "./Sample";
import { Sample as SampleLog } from "./AbletonProjectParser/Sample";
import { TopUtilities as Utilities } from "../class/using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/using HigherUtilities/TopUtilities";
import { AbletonXml } from "./AbletonXml";

type Value = AbletonXml.Attributes.Value;
type MixerFreezeAndDeviceCommon = Mixer.MixerFreezeAndDeviceCommon;
type Modulation = Mixer.Modulation;

export type MainSequencer =
  | MainSequencer.AbletonInstrumentMainSequencer
  | MainSequencer.PluginMainSequencer
  | MainSequencer.Sequencer;

export namespace MainSequencer {
  const ensureArray = Utilities.JavaScript.ArrayUtils.ensureArray;

  export interface Recorder {
    IsArmed: Value;
    TakeCounter: Value;
  }

  export interface SequencerCommon extends MixerFreezeAndDeviceCommon {
    ClipSlotList: ClipSlotList;
  }

  type Keys = keyof SequencerCommon;
  export class SequencerCommon {
    constructor(obj: { [key in Keys]: any }) {
      for (let key in obj) {
        this[key as keyof this] = obj[key as keyof typeof obj];
      }
    }
  }

  export interface Sequencer extends SequencerCommon {
    MonitoringEnum: Value;
    Recorder: Recorder;
    Sample: Sample;
    VolumeModulationTarget: string;
    TranspositionModulationTarget: string;
    GrainSizeModulationTarget: string;
    FluxModulationTarget: string;
    SampleOffsetModulationTarget: string;
    PitchViewScrollPosition: string;
    SampleOffsetModulationScrollPosition: string;
  }
  export class Sequencer extends SequencerCommon {
    #events: Events | undefined | "";
    get samples() {
      this.#events = this.Sample.ArrangerAutomation.Events;
      let result: SampleLog[] = [];
      if (this.#events === "") {
        // return null;
      } else {
        result.push(
          ...ensureArray(this.#events.AudioClip).map((a) => {
            return new AudioClip(a).sample;
          })
        );
      }
      let list = new ClipSlotList(this.ClipSlotList);
      if (list.samples.length) result.push(...list.samples);
      return result;
    }
  }

  export interface FreezeSequencer extends Sequencer {}
  export class FreezeSequencer extends Sequencer {}

  export interface PluginMainSequencer extends SequencerCommon {
    ClipTimeable: ClipTimeable;
    MidiControllers: string;
  }

  export interface AbletonInstrumentMainSequencer extends PluginMainSequencer {}
}
