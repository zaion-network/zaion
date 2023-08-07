import { Sample } from "../AbletonProjectParser/Sample";
import { AbletonInstrumentsCommon } from "../Device";
import { FileRef } from "../FileRef";
import { SampleRef } from "../SampleRef";

interface UserSprite {
  Value: { SampleRef: SampleRef } | "";
}

export interface InstrumentVector extends AbletonInstrumentsCommon {
  AmpEnvelopeDisplayMode: unknown;
  Envelope2DisplayMode: unknown;
  Envelope3DisplayMode: unknown;
  VisualizationMode: unknown;
  SelectedModulationSourceVisualization: unknown;
  SelectedOscillatorBreakout: unknown;
  SpriteName1: unknown;
  SpriteName2: unknown;
  UserSprite1: UserSprite;
  UserSprite2: UserSprite;
  UseRawUserWavetable1: unknown;
  UseRawUserWavetable2: unknown;
  Voice_Oscillator1_On: unknown;
  Voice_Oscillator1_Pitch_Transpose: unknown;
  Voice_Oscillator1_Pitch_Detune: unknown;
  Voice_Oscillator1_Wavetables_WavePosition: unknown;
  Voice_Oscillator1_Effects_EffectMode: unknown;
  Voice_Oscillator1_Effects_Effect1: unknown;
  Voice_Oscillator1_Effects_Effect2: unknown;
  Voice_Oscillator1_Pan: unknown;
  Voice_Oscillator1_Gain: unknown;
  Voice_Oscillator2_On: unknown;
  Voice_Oscillator2_Pitch_Transpose: unknown;
  Voice_Oscillator2_Pitch_Detune: unknown;
  Voice_Oscillator2_Wavetables_WavePosition: unknown;
  Voice_Oscillator2_Effects_EffectMode: unknown;
  Voice_Oscillator2_Effects_Effect1: unknown;
  Voice_Oscillator2_Effects_Effect2: unknown;
  Voice_Oscillator2_Pan: unknown;
  Voice_Oscillator2_Gain: unknown;
  Voice_SubOscillator_On: unknown;
  Voice_SubOscillator_Tone: unknown;
  Voice_SubOscillator_Gain: unknown;
  Voice_SubOscillator_Transpose: unknown;
  Voice_Filter1_On: unknown;
  Voice_Filter1_Type: unknown;
  Voice_Filter1_CircuitLpHp: unknown;
  Voice_Filter1_CircuitBpNoMo: unknown;
  Voice_Filter1_Slope: unknown;
  Voice_Filter1_Frequency: unknown;
  Voice_Filter1_Resonance: unknown;
  Voice_Filter1_Drive: unknown;
  Voice_Filter1_Morph: unknown;
  Voice_Filter2_On: unknown;
  Voice_Filter2_Type: unknown;
  Voice_Filter2_CircuitLpHp: unknown;
  Voice_Filter2_CircuitBpNoMo: unknown;
  Voice_Filter2_Slope: unknown;
  Voice_Filter2_Frequency: unknown;
  Voice_Filter2_Resonance: unknown;
  Voice_Filter2_Drive: unknown;
  Voice_Filter2_Morph: unknown;
  Voice_Modulators_AmpEnvelope_Times_Attack: unknown;
  Voice_Modulators_AmpEnvelope_Times_Decay: unknown;
  Voice_Modulators_AmpEnvelope_Times_Release: unknown;
  Voice_Modulators_AmpEnvelope_Slopes_Attack: unknown;
  Voice_Modulators_AmpEnvelope_Slopes_Decay: unknown;
  Voice_Modulators_AmpEnvelope_Slopes_Release: unknown;
  Voice_Modulators_AmpEnvelope_Sustain: unknown;
  Voice_Modulators_AmpEnvelope_LoopMode: unknown;
  Voice_Modulators_Envelope2_Times_Attack: unknown;
  Voice_Modulators_Envelope2_Times_Decay: unknown;
  Voice_Modulators_Envelope2_Times_Release: unknown;
  Voice_Modulators_Envelope2_Slopes_Attack: unknown;
  Voice_Modulators_Envelope2_Slopes_Decay: unknown;
  Voice_Modulators_Envelope2_Slopes_Release: unknown;
  Voice_Modulators_Envelope2_Values_Initial: unknown;
  Voice_Modulators_Envelope2_Values_Peak: unknown;
  Voice_Modulators_Envelope2_Values_Sustain: unknown;
  Voice_Modulators_Envelope2_Values_Final: unknown;
  Voice_Modulators_Envelope2_LoopMode: unknown;
  Voice_Modulators_Envelope3_Times_Attack: unknown;
  Voice_Modulators_Envelope3_Times_Decay: unknown;
  Voice_Modulators_Envelope3_Times_Release: unknown;
  Voice_Modulators_Envelope3_Slopes_Attack: unknown;
  Voice_Modulators_Envelope3_Slopes_Decay: unknown;
  Voice_Modulators_Envelope3_Slopes_Release: unknown;
  Voice_Modulators_Envelope3_Values_Initial: unknown;
  Voice_Modulators_Envelope3_Values_Peak: unknown;
  Voice_Modulators_Envelope3_Values_Sustain: unknown;
  Voice_Modulators_Envelope3_Values_Final: unknown;
  Voice_Modulators_Envelope3_LoopMode: unknown;
  Voice_Modulators_Lfo1_Retrigger: unknown;
  Voice_Modulators_Lfo1_Shape_Type: unknown;
  Voice_Modulators_Lfo1_Shape_Amount: unknown;
  Voice_Modulators_Lfo1_Shape_Shaping: unknown;
  Voice_Modulators_Lfo1_Shape_PhaseOffset: unknown;
  Voice_Modulators_Lfo1_Time_Sync: unknown;
  Voice_Modulators_Lfo1_Time_Rate: unknown;
  Voice_Modulators_Lfo1_Time_SyncedRate: unknown;
  Voice_Modulators_Lfo1_Time_AttackTime: unknown;
  Voice_Modulators_Lfo2_Retrigger: unknown;
  Voice_Modulators_Lfo2_Shape_Type: unknown;
  Voice_Modulators_Lfo2_Shape_Amount: unknown;
  Voice_Modulators_Lfo2_Shape_Shaping: unknown;
  Voice_Modulators_Lfo2_Shape_PhaseOffset: unknown;
  Voice_Modulators_Lfo2_Time_Sync: unknown;
  Voice_Modulators_Lfo2_Time_Rate: unknown;
  Voice_Modulators_Lfo2_Time_SyncedRate: unknown;
  Voice_Modulators_Lfo2_Time_AttackTime: unknown;
  Voice_Modulators_TimeScale: unknown;
  Voice_Modulators_Amount: unknown;
  Voice_Unison_Mode: unknown;
  Voice_Unison_VoiceCount: unknown;
  Voice_Unison_Amount: unknown;
  Voice_Global_Transpose: unknown;
  Voice_Global_FilterRouting: unknown;
  Voice_Global_Glide: unknown;
  Volume: unknown;
  MonoPoly: unknown;
  PolyVoices: unknown;
  ModulationConnections: unknown;
}

type Keys = keyof InstrumentVector;

export class InstrumentVector {
  constructor(obj: { [key in Keys]: any }) {
    for (let key in obj) {
      this[key as keyof this] = obj[key as keyof typeof obj];
    }
  }

  #filerefs: () => UserSprite[] = () => [this.UserSprite1, this.UserSprite2];
  #fileref: FileRef | undefined;
  get samples() {
    let samples: Sample[] = [];
    this.#filerefs().forEach((fr) => {
      if (fr.Value !== "") {
        this.#fileref = new FileRef(fr.Value.SampleRef.FileRef);
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
