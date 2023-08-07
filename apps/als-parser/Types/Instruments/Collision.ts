import { AbletonInstrumentsCommon } from "../Device";

export interface Collision extends AbletonInstrumentsCommon {
  Mallet: string;
  Noise: string;
  Resonator1: string;
  Resonator2: string;
  ResonatorOrder: string;
  Lfo1: string;
  Lfo2: string;
  PitchBendRange: string;
  PitchBendTarget1: string;
  ModWheelTarget1: string;
  ModWheelTarget2: string;
  ChannelPressureTarget1: string;
  ChannelPressureTarget2: string;
  Polyphony: string;
  Retrigger: string;
  Volume: string;
  PitchBendOn: string;
  ModWheelOn: string;
  ChannelPressureOn: string;
}
