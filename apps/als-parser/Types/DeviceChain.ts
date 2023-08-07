import { AbletonXml } from "./AbletonXml";
import { Device as D } from "./Device";
import { MainSequencer as M } from "./MainSequencer";
import { Mixer as Mx } from "./Mixer";

type Value = AbletonXml.Attributes.Value;

export interface DeviceChain {
  Devices:
    | DeviceChain.Device.PluginDevice
    | DeviceChain.Device.AuPluginDevice
    | DeviceChain.Device.AbletonInstrumentsCommon
    | (
        | DeviceChain.Device.PluginDevice
        | DeviceChain.Device.AuPluginDevice
        | DeviceChain.Device.AbletonInstrumentsCommon
      )[];
}

export namespace DeviceChain {
  export interface AutomationLane {
    SelectedDevice: Value;
    SelectedEnvelope: Value;
    IsContentSelected: Value;
    LaneHeight: Value;
  }

  export interface Routing {
    Target: Value;
    UpperDisplayString: Value;
    LowerDisplayString: Value;
  }

  // controllare questo valore
  export type AutomationLanesList =
    | { AutomationLane: AutomationLane }
    | AutomationLane[];

  export interface AutomationLanes {
    AutomationLanes: AutomationLanesList;
    AreAdditionalAutomationLanesFolded: Value;
  }

  export interface ClipEnvelopeChooserViewState {
    SelectedDevice: Value;
    SelectedEnvelope: Value;
    PreferModulationVisible: Value;
  }

  export interface DeviceChainCommon {
    AutomationLanes: AutomationLanes;
    ClipEnvelopeChooserViewState: ClipEnvelopeChooserViewState;
    AudioInputRouting: Routing;
    MidiInputRouting: Routing;
    AudioOutputRouting: Routing;
    MidiOutputRouting: Routing;
    Mixer: Mixer;
    FreezeSequencer: MainSequencer.FreezeSequencer;
    DeviceChain: DeviceChain;
  }

  export interface DeviceChainAudioMidi extends DeviceChainCommon {
    MainSequencer: MainSequencer;
  }

  export interface AudioDeviceChain extends DeviceChainAudioMidi {}
  export interface MidiDeviceChain extends DeviceChainAudioMidi {}
  export interface GroupDeviceChain extends DeviceChainCommon {}

  export import Device = D;
  export import MainSequencer = M;
  export import Mixer = Mx;
}
