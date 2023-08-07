import { AbletonInstrumentsCommon } from "../Device";

export interface Operator extends AbletonInstrumentsCommon {
  ["Operator.0"]: string;
  ["Operator.1"]: string;
  ["Operator.2"]: string;
  ["Operator.3"]: string;
  Globals: string;
  Lfo: string;
  PitchEnv: string;
  EnvScale: string;
  Filter: string;
  Shaper: string;
  MidiCtrl: string;
}
