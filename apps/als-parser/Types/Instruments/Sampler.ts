import { AbletonInstrumentsCommon } from "../Device";

interface MultiSampler extends AbletonInstrumentsCommon {
  Player: string;
  Pitch: string;
  Filter: string;
  Shaper: string;
  VolumeAndPan: string;
  AuxEnv: string;
  Lfo: string;
  ["AuxLfos.0"]: string;
  ["AuxLfos.1"]: string;
  KeyDst: string;
  VelDst: string;
  RelVelDst: string;
  ["MidiCtrl.0"]: string;
  ["MidiCtrl.1"]: string;
  ["MidiCtrl.2"]: string;
  ["MidiCtrl.3"]: string;
  Globals: string;
  ViewSettings: string;
  SimplerSlicing: string;
}
