import { LomId, Value } from "./Attributes";
import { BranchSelectorRange } from "./BranchSelectorRange";
import { Device } from "./Device";
import { DrumBranch } from "./DrumBranch";
import { MixerDevice } from "./MixerDevice";
import { Name } from "./Name";
import { BranchSourceContext, DevicesSourceContext } from "./SourceContext";

export interface ZoneSettings {
  KeyRange: {
    Min: Value;
    Max: Value;
    CrossfadeMin: Value;
    CrossfadeMax: Value;
  };
  VelocityRange: {
    Min: Value;
    Max: Value;
    CrossfadeMin: Value;
    CrossfadeMax: Value;
  };
}

export interface InstrumentBranch {
  LomId: Value;
  Name: Name;
  isSelected: Value;
  DeviceChain: { MidiToAudioDeviceChain: { Devices: Device | Device[] } };
  BranchSelectorRange: BranchSelectorRange;
  IsSoloed: Value;
  SessionViewBranchWidth: Value;
  IsHighlightedInSessionView: Value;
  SourceContext: DevicesSourceContext;
  ColorIndex: Value;
  AutoColored: Value;
  AutoColorScheme: Value;
  SoloActivatedInSessionMixer: Value;
  DevicesListWrapper: LomId;
  MixerDevice: MixerDevice;
  ZoneSettings: ZoneSettings;
}
