import { Sample } from "../AbletonProjectParser/Sample";
import { Utilities } from "../../class/using DeeperUtilities/using DeepUtilites/using LowUtilities/Utilities";
import { AbletonInstrumentsCommon } from "../Device";
import { FileRef } from "../FileRef";
import { Player } from "./Simpler";
const ensureArray = Utilities.ArrayUtils.ensureArray;

export interface MultiSampler extends AbletonInstrumentsCommon {
  Player: Player;
  Pitch: unknown;
  Filter: unknown;
  Shaper: unknown;
  VolumeAndPan: unknown;
  AuxEnv: unknown;
  Lfo: unknown;
  ["AuxLfos.0"]: unknown;
  ["AuxLfos.1"]: unknown;
  KeyDst: unknown;
  VelDst: unknown;
  RelVelDst: unknown;
  ["MidiCtrl.0"]: unknown;
  ["MidiCtrl.1"]: unknown;
  ["MidiCtrl.2"]: unknown;
  ["MidiCtrl.3"]: unknown;
  Globals: unknown;
  ViewSettings: unknown;
  SimplerSlicing: unknown;
}

type Keys = keyof MultiSampler;

export class MultiSampler {
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
