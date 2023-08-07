import { AbletonXml } from "./AbletonXml";

type Id = AbletonXml.Attributes.Id;

export type Device = {
  [k in Device.DeviceTypes]?: AbletonXml.Ableton.LiveSet.Tracks.Track.DeviceChain.Mixer.MixerFreezeAndDeviceCommon &
    Id;
};

export namespace Device {
  export interface PluginCommon {
    PluginDesc: string;
    MpeEnabled: string;
    ParameterList: string;
    AxisX: string;
    AxisY: string;
    SideChain: string;
  }

  export type AbletonDevices =
    | "Collision"
    | "DrumGroupDevice"
    | "LoungeLizard"
    | "ProxyInstrumentDevice"
    | "InstrumentImpulse"
    | "InstrumentGroupDevice"
    | "MultiSampler"
    | "Operator"
    | "OriginalSimpler"
    | "StringStudio"
    | "InstrumentVector"
    | "UltraAnalog";

  type PluginDevices = "PluginDevice" | "AuPluginDevice";

  export type DeviceTypes = AbletonDevices | PluginDevices;

  interface AbletonDeviceDefinition
    extends AbletonXml.Ableton.LiveSet.Tracks.Track.DeviceChain.Mixer
        .MixerFreezeAndDeviceCommon,
      Id {
    OverwriteProtectionNumber: string;
  }

  export type AbletonDevice = {
    [k in DeviceTypes]?: AbletonXml.Ableton.LiveSet.Tracks.Track.DeviceChain.Mixer.MixerFreezeAndDeviceCommon &
      Id & {
        OverwriteProtectionNumber: string;
      };
  };

  export interface PluginDevice extends Device {
    PluginDevice: AbletonXml.Ableton.LiveSet.Tracks.Track.DeviceChain.Mixer.MixerFreezeAndDeviceCommon &
      Id &
      PluginCommon;
  }

  export interface AuPluginDevice extends Device {
    AuPluginDevice: AbletonXml.Ableton.LiveSet.Tracks.Track.DeviceChain.Mixer.MixerFreezeAndDeviceCommon &
      Id &
      PluginCommon;
  }

  export interface AbletonInstrumentsCommon
    extends AbletonXml.Ableton.LiveSet.Tracks.Track.DeviceChain.Mixer
        .MixerFreezeAndDeviceCommon,
      Id {
    OverwriteProtectionNumber: string;
  }

  export class AbletonInstrumentsCommon {}
}
