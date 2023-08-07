import { Sample } from "../AbletonProjectParser/Sample";
import { AbletonInstrumentsCommon } from "../Device";
import { FileRef } from "../FileRef";
import { SampleRef } from "../SampleRef";

interface TabSample {
  Value: { SampleRef: SampleRef } | "";
}

export interface InstrumentImpulse extends AbletonInstrumentsCommon {
  GlobalVolume: unknown;
  GlobalTime: unknown;
  GlobalPitch: unknown;
  ["StartStart.0"]: unknown;
  ["StartSoft.0"]: unknown;
  ["StartTune.0"]: unknown;
  ["StartVelocity.0"]: unknown;
  ["StartRandom.0"]: unknown;
  ["StartStretchType.0"]: unknown;
  ["StartStretch.0"]: unknown;
  ["StartStretchVel.0"]: unknown;
  ["DecaySatOn.0"]: unknown;
  ["DecayDrive.0"]: unknown;
  ["FilterOn.0"]: unknown;
  ["FilterType.0"]: unknown;
  ["FilterFreq.0"]: unknown;
  ["FilterQ.0"]: unknown;
  ["FilterVelocity.0"]: unknown;
  ["FilterRandom.0"]: unknown;
  ["DecayDecayType.0"]: unknown;
  ["DecayDecay.0"]: unknown;
  ["VolumePan.0"]: unknown;
  ["VolumePanVel.0"]: unknown;
  ["VolumePanRand.0"]: unknown;
  ["VolumeVolume.0"]: unknown;
  ["VolumeVolumeVel.0"]: unknown;
  ["VolumeSolo.0"]: unknown;
  ["VolumeMute.0"]: unknown;
  ["StartStart.1"]: unknown;
  ["StartSoft.1"]: unknown;
  ["StartTune.1"]: unknown;
  ["StartVelocity.1"]: unknown;
  ["StartRandom.1"]: unknown;
  ["StartStretchType.1"]: unknown;
  ["StartStretch.1"]: unknown;
  ["StartStretchVel.1"]: unknown;
  ["DecaySatOn.1"]: unknown;
  ["DecayDrive.1"]: unknown;
  ["FilterOn.1"]: unknown;
  ["FilterType.1"]: unknown;
  ["FilterFreq.1"]: unknown;
  ["FilterQ.1"]: unknown;
  ["FilterVelocity.1"]: unknown;
  ["FilterRandom.1"]: unknown;
  ["DecayDecayType.1"]: unknown;
  ["DecayDecay.1"]: unknown;
  ["VolumePan.1"]: unknown;
  ["VolumePanVel.1"]: unknown;
  ["VolumePanRand.1"]: unknown;
  ["VolumeVolume.1"]: unknown;
  ["VolumeVolumeVel.1"]: unknown;
  ["VolumeSolo.1"]: unknown;
  ["VolumeMute.1"]: unknown;
  ["StartStart.2"]: unknown;
  ["StartSoft.2"]: unknown;
  ["StartTune.2"]: unknown;
  ["StartVelocity.2"]: unknown;
  ["StartRandom.2"]: unknown;
  ["StartStretchType.2"]: unknown;
  ["StartStretch.2"]: unknown;
  ["StartStretchVel.2"]: unknown;
  ["DecaySatOn.2"]: unknown;
  ["DecayDrive.2"]: unknown;
  ["FilterOn.2"]: unknown;
  ["FilterType.2"]: unknown;
  ["FilterFreq.2"]: unknown;
  ["FilterQ.2"]: unknown;
  ["FilterVelocity.2"]: unknown;
  ["FilterRandom.2"]: unknown;
  ["DecayDecayType.2"]: unknown;
  ["DecayDecay.2"]: unknown;
  ["VolumePan.2"]: unknown;
  ["VolumePanVel.2"]: unknown;
  ["VolumePanRand.2"]: unknown;
  ["VolumeVolume.2"]: unknown;
  ["VolumeVolumeVel.2"]: unknown;
  ["VolumeSolo.2"]: unknown;
  ["VolumeMute.2"]: unknown;
  ["StartStart.3"]: unknown;
  ["StartSoft.3"]: unknown;
  ["StartTune.3"]: unknown;
  ["StartVelocity.3"]: unknown;
  ["StartRandom.3"]: unknown;
  ["StartStretchType.3"]: unknown;
  ["StartStretch.3"]: unknown;
  ["StartStretchVel.3"]: unknown;
  ["DecaySatOn.3"]: unknown;
  ["DecayDrive.3"]: unknown;
  ["FilterOn.3"]: unknown;
  ["FilterType.3"]: unknown;
  ["FilterFreq.3"]: unknown;
  ["FilterQ.3"]: unknown;
  ["FilterVelocity.3"]: unknown;
  ["FilterRandom.3"]: unknown;
  ["DecayDecayType.3"]: unknown;
  ["DecayDecay.3"]: unknown;
  ["VolumePan.3"]: unknown;
  ["VolumePanVel.3"]: unknown;
  ["VolumePanRand.3"]: unknown;
  ["VolumeVolume.3"]: unknown;
  ["VolumeVolumeVel.3"]: unknown;
  ["VolumeSolo.3"]: unknown;
  ["VolumeMute.3"]: unknown;
  ["StartStart.4"]: unknown;
  ["StartSoft.4"]: unknown;
  ["StartTune.4"]: unknown;
  ["StartVelocity.4"]: unknown;
  ["StartRandom.4"]: unknown;
  ["StartStretchType.4"]: unknown;
  ["StartStretch.4"]: unknown;
  ["StartStretchVel.4"]: unknown;
  ["DecaySatOn.4"]: unknown;
  ["DecayDrive.4"]: unknown;
  ["FilterOn.4"]: unknown;
  ["FilterType.4"]: unknown;
  ["FilterFreq.4"]: unknown;
  ["FilterQ.4"]: unknown;
  ["FilterVelocity.4"]: unknown;
  ["FilterRandom.4"]: unknown;
  ["DecayDecayType.4"]: unknown;
  ["DecayDecay.4"]: unknown;
  ["VolumePan.4"]: unknown;
  ["VolumePanVel.4"]: unknown;
  ["VolumePanRand.4"]: unknown;
  ["VolumeVolume.4"]: unknown;
  ["VolumeVolumeVel.4"]: unknown;
  ["VolumeSolo.4"]: unknown;
  ["VolumeMute.4"]: unknown;
  ["StartStart.5"]: unknown;
  ["StartSoft.5"]: unknown;
  ["StartTune.5"]: unknown;
  ["StartVelocity.5"]: unknown;
  ["StartRandom.5"]: unknown;
  ["StartStretchType.5"]: unknown;
  ["StartStretch.5"]: unknown;
  ["StartStretchVel.5"]: unknown;
  ["DecaySatOn.5"]: unknown;
  ["DecayDrive.5"]: unknown;
  ["FilterOn.5"]: unknown;
  ["FilterType.5"]: unknown;
  ["FilterFreq.5"]: unknown;
  ["FilterQ.5"]: unknown;
  ["FilterVelocity.5"]: unknown;
  ["FilterRandom.5"]: unknown;
  ["DecayDecayType.5"]: unknown;
  ["DecayDecay.5"]: unknown;
  ["VolumePan.5"]: unknown;
  ["VolumePanVel.5"]: unknown;
  ["VolumePanRand.5"]: unknown;
  ["VolumeVolume.5"]: unknown;
  ["VolumeVolumeVel.5"]: unknown;
  ["VolumeSolo.5"]: unknown;
  ["VolumeMute.5"]: unknown;
  ["StartStart.6"]: unknown;
  ["StartSoft.6"]: unknown;
  ["StartTune.6"]: unknown;
  ["StartVelocity.6"]: unknown;
  ["StartRandom.6"]: unknown;
  ["StartStretchType.6"]: unknown;
  ["StartStretch.6"]: unknown;
  ["StartStretchVel.6"]: unknown;
  ["DecaySatOn.6"]: unknown;
  ["DecayDrive.6"]: unknown;
  ["FilterOn.6"]: unknown;
  ["FilterType.6"]: unknown;
  ["FilterFreq.6"]: unknown;
  ["FilterQ.6"]: unknown;
  ["FilterVelocity.6"]: unknown;
  ["FilterRandom.6"]: unknown;
  ["DecayDecayType.6"]: unknown;
  ["DecayDecay.6"]: unknown;
  ["VolumePan.6"]: unknown;
  ["VolumePanVel.6"]: unknown;
  ["VolumePanRand.6"]: unknown;
  ["VolumeVolume.6"]: unknown;
  ["VolumeVolumeVel.6"]: unknown;
  ["VolumeSolo.6"]: unknown;
  ["VolumeMute.6"]: unknown;
  ["StartStart.7"]: unknown;
  ["StartSoft.7"]: unknown;
  ["StartTune.7"]: unknown;
  ["StartVelocity.7"]: unknown;
  ["StartRandom.7"]: unknown;
  ["StartStretchType.7"]: unknown;
  ["StartStretch.7"]: unknown;
  ["StartStretchVel.7"]: unknown;
  ["DecaySatOn.7"]: unknown;
  ["DecayDrive.7"]: unknown;
  ["FilterOn.7"]: unknown;
  ["FilterType.7"]: unknown;
  ["FilterFreq.7"]: unknown;
  ["FilterQ.7"]: unknown;
  ["FilterVelocity.7"]: unknown;
  ["FilterRandom.7"]: unknown;
  ["DecayDecayType.7"]: unknown;
  ["DecayDecay.7"]: unknown;
  ["VolumePan.7"]: unknown;
  ["VolumePanVel.7"]: unknown;
  ["VolumePanRand.7"]: unknown;
  ["VolumeVolume.7"]: unknown;
  ["VolumeVolumeVel.7"]: unknown;
  ["VolumeSolo.7"]: unknown;
  ["VolumeMute.7"]: unknown;
  ["SlotNumber.0"]: unknown;
  ["SlotNumber.1"]: unknown;
  ["SlotNumber.2"]: unknown;
  ["SlotNumber.3"]: unknown;
  ["SlotNumber.4"]: unknown;
  ["SlotNumber.5"]: unknown;
  ["SlotNumber.6"]: unknown;
  ["SlotNumber.7"]: unknown;
  ["TabSample.0"]: TabSample;
  ["TabSample.1"]: TabSample;
  ["TabSample.2"]: TabSample;
  ["TabSample.3"]: TabSample;
  ["TabSample.4"]: TabSample;
  ["TabSample.5"]: TabSample;
  ["TabSample.6"]: TabSample;
  ["TabSample.7"]: TabSample;
  ["TabAlpha.0"]: unknown;
  ["TabAlpha.1"]: unknown;
  ["TabAlpha.2"]: unknown;
  ["TabAlpha.3"]: unknown;
  ["TabAlpha.4"]: unknown;
  ["TabAlpha.5"]: unknown;
  ["TabAlpha.6"]: unknown;
  ["TabAlpha.7"]: unknown;
  ["TabOmega.0"]: unknown;
  ["TabOmega.1"]: unknown;
  ["TabOmega.2"]: unknown;
  ["TabOmega.3"]: unknown;
  ["TabOmega.4"]: unknown;
  ["TabOmega.5"]: unknown;
  ["TabOmega.6"]: unknown;
  ["TabOmega.7"]: unknown;
  ["TabTitle.0"]: unknown;
  ["TabTitle.1"]: unknown;
  ["TabTitle.2"]: unknown;
  ["TabTitle.3"]: unknown;
  ["TabTitle.4"]: unknown;
  ["TabTitle.5"]: unknown;
  ["TabTitle.6"]: unknown;
  ["TabTitle.7"]: unknown;
  LinkVoices7and8: unknown;
  RelativePitchScrollPosition: unknown;
}

type Keys = keyof InstrumentImpulse;

export class InstrumentImpulse {
  constructor(obj: { [key in Keys]: any }) {
    for (let key in obj) {
      this[key as keyof this] = obj[key as keyof typeof obj];
    }
  }
  #sampleTabs = () => [
    this["TabSample.0"],
    this["TabSample.1"],
    this["TabSample.2"],
    this["TabSample.3"],
    this["TabSample.4"],
    this["TabSample.5"],
    this["TabSample.6"],
    this["TabSample.7"],
  ];
  #fileref: FileRef | undefined;
  get samples() {
    let samples: Sample[] = [];
    this.#sampleTabs().forEach((st) => {
      if (st.Value !== "") {
        this.#fileref = new FileRef(st.Value.SampleRef.FileRef);
        samples.push(this.#makeSample());
      }
    });
    return samples;
  }

  #makeSample(): Sample {
    return {
      type: this.#fileref!.pathtype,
      filepath: this.#fileref!.filepath,
      filename: this.#fileref!.filename,
    };
  }
}
