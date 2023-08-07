import { LomId, Value, ValueMember } from "./Attributes";
import {
  AmplitudeController,
  AmplitudeControllerCommon,
  MinMax,
} from "./Mixer";
import { SourceContext } from "./SourceContext";

export interface ChannelDevice extends AmplitudeControllerCommon {
  MidiCCOnOffThresholds: MinMax;
}
export interface On extends ChannelDevice {}

export interface Speaker extends ChannelDevice {}

export interface Routable {
  Target: Value;
  UpperDisplayString: Value;
  LowerDisplayString: Value;
}

export interface RoutingHelper {
  Routable: Routable;
  TargetEnum: Value;
}

export interface MixerDevice {
  LomId: Value;
  LomIdView: Value;
  IsExpanded: Value;
  On: On;
  ParametersListWrapper: LomId;
  LastSelectedTimeableIndex: Value;
  LastSelectedClipEnvelopeIndex: Value;
  LastPresetRef: ValueMember;
  LockedScripts: string;
  IsFolded: Value;
  ShouldShowPresetName: Value;
  UserName: Value;
  Annotation: Value;
  SourceContext: ValueMember | SourceContext;
  OverwriteProtectionNumber: Value;
  Speaker: Speaker;
  Volume: AmplitudeController;
  Panorama: AmplitudeController;
  SendInfos: string;
  RoutingHelper: RoutingHelper;
  SendsListWrapper: LomId;
}
