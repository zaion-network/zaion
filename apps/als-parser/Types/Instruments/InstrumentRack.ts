import { Sample } from "../AbletonProjectParser/Sample";
import { Utilities } from "../../class/using DeeperUtilities/using DeepUtilites/using LowUtilities/Utilities";
import { AbletonInstrumentsCommon, Device } from "../Device";
import { FileRef } from "../FileRef";
import { InstrumentBranch } from "../InstrumentBranch";
import { InstrumentsWithSamples } from "../InstrumentsWithSamples";
import { DrumGroupDevice, GroupDevices } from "./DrumRack";
import { InstrumentImpulse } from "./Impulse";
import { MultiSampler } from "./MultiSampler";
import { OriginalSimpler } from "./Simpler";
import { InstrumentVector } from "./Wavetable";
const ensureArray = Utilities.ArrayUtils.ensureArray;

export interface InstrumentGroupDevice
  extends AbletonInstrumentsCommon,
    GroupDevices {
  Branches: { InstrumentBranch: InstrumentBranch | InstrumentBranch[] };
}

type Keys = keyof InstrumentGroupDevice;

export class InstrumentGroupDevice {
  #abletonDevices = new Map<InstrumentsWithSamples, any>();
  constructor(obj: { [key in Keys]: any }) {
    for (let key in obj) {
      this[key as keyof this] = obj[key as keyof typeof obj];
    }
    this.#abletonDevices.set(InstrumentsWithSamples.sampler, MultiSampler);
    this.#abletonDevices.set(InstrumentsWithSamples.simpler, OriginalSimpler);
    this.#abletonDevices.set(InstrumentsWithSamples.drumrack, DrumGroupDevice);
    this.#abletonDevices.set(InstrumentsWithSamples.impulse, InstrumentImpulse);
    this.#abletonDevices.set(
      InstrumentsWithSamples.instrumentrack,
      InstrumentGroupDevice
    );
    this.#abletonDevices.set(
      InstrumentsWithSamples.wavetable,
      InstrumentVector
    );
  }

  #fileref: FileRef | undefined;
  get samples() {
    this.Branches.InstrumentBranch = ensureArray(
      this.Branches.InstrumentBranch
    );
    return this.Branches.InstrumentBranch.map((db) => {
      let sourcecontextvalue = db.SourceContext.Value;
      if (sourcecontextvalue !== "") {
        this.#fileref = new FileRef(
          sourcecontextvalue.BranchSourceContext.OriginalFileRef.FileRef
        );
        db.DeviceChain.MidiToAudioDeviceChain.Devices = ensureArray(
          db.DeviceChain.MidiToAudioDeviceChain.Devices
        );
        const device = Object.keys(
          db.DeviceChain.MidiToAudioDeviceChain.Devices[0]
        )[0] as InstrumentsWithSamples;

        const Deviceclass = this.#abletonDevices.get(device);
        const instance = new Deviceclass(
          db.DeviceChain.MidiToAudioDeviceChain.Devices[0][
            device as keyof Device
          ]
        );

        this.#fileref.RelativePath.RelativePathElement = ensureArray(
          this.#fileref.RelativePath.RelativePathElement
        );
        return instance.samples;
      }
    }).filter(Boolean) as Sample[];
  }

  #isOriginalSimpler(arg: unknown): arg is OriginalSimpler {
    if (arg instanceof OriginalSimpler) return true;
    else return false;
  }
  #isMultiSampler(arg: unknown): arg is MultiSampler {
    if (arg instanceof MultiSampler) return true;
    else return false;
  }
  #isInstrumentVector(arg: unknown): arg is InstrumentVector {
    if (arg instanceof InstrumentVector) return true;
    else return false;
  }
  #isInstrumentImpulse(arg: unknown): arg is InstrumentImpulse {
    if (arg instanceof InstrumentImpulse) return true;
    else return false;
  }
  #isInstrumentGroupDevice(arg: unknown): arg is InstrumentGroupDevice {
    if (arg instanceof InstrumentGroupDevice) return true;
    else return false;
  }
  #isDrumGroupDevice(arg: unknown): arg is DrumGroupDevice {
    if (arg instanceof DrumGroupDevice) return true;
    else return false;
  }

  #makeSample(): Sample {
    return {
      type: this.#fileref!.pathtype,
      filepath: this.#fileref!.filepath,
      filename: this.#fileref!.filename,
    };
  }
}
