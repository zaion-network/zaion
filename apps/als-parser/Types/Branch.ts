import { LomId, Value } from "./Attributes";
import { BranchSelectorRange } from "./BranchSelectorRange";
import { Device } from "./Device";
import { Name } from "./Name";
import { BranchSourceContext } from "./SourceContext";

export interface DrumBranch {
  LomId: Value;
  Name: Name;
  isSelected: Value;
  DeviceChain: { MidiToAudioDeviceChain: { Devices: Device | Device[] } };
  BranchSelectorRange: BranchSelectorRange;
  IsSoloed: Value;
  SessionViewBranchWidth: Value;
  IsHighlightedInSessionView: Value;
  SourceContext: { Value: { SourceContext: BranchSourceContext } | "" };
  ColorIndex: Value;
  AutoColored: Value;
  AutoColorScheme: Value;
  SoloActivatedInSessionMixer: Value;
  DevicesListWrapper: LomId;
}
