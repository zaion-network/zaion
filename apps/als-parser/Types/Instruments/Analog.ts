import { AbletonInstrumentsCommon } from "../Device";

export interface UltraAnalog extends AbletonInstrumentsCommon {
  Polyphony: string;
  PitchBendRange: string;
  Volume: string;
  Octave: string;
  OctaveRelativePosition: string;
  Transpose: string;
  TransposeRelativePosition: string;
  KeyboardFineTune: string;
  KeyboardUnisonToggle: string;
  KeyboardUnison: string;
  KeyboardDetune: string;
  KeyboardUnisonDelay: string;
  KeyboardPriority: string;
  KeyboardStretch: string;
  KeyboardError: string;
  VibratoToggle: string;
  VibratoSpeed: string;
  VibratoFadeIn: string;
  VibratoAmount: string;
  VibratoError: string;
  VibratoDelay: string;
  VibratoModWheel: string;
  PortamentoToggle: string;
  PortamentoTime: string;
  PortamentoMode: string;
  PortamentoLegato: string;
  NoiseToggle: string;
  NoiseColor: string;
  NoiseBalance: string;
  NoiseLevel: string;
  SignalChain1: string;
  SignalChain2: string;
  SelectedFinger: string;
}
