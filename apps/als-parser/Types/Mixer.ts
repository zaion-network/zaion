import { AbletonXml } from "./AbletonXml";
import { On, Speaker } from "./MixerDevice";
import { SourceContext } from "./SourceContext";

type Value = AbletonXml.Attributes.Value;
type Id = AbletonXml.Attributes.Id;
type LomId = AbletonXml.Attributes.LomId;

export interface Mixer extends Mixer.MixerFreezeAndDeviceCommon {
  Sends: void;
  Speaker: Speaker;
  SoloSink: Value;
  PanMode: Value;
  Pan: Mixer.AmplitudeController;
  SplitStereoPanL: Mixer.AmplitudeController;
  SplitStereoPanR: Mixer.AmplitudeController;
  Volume: Mixer.AmplitudeController;
  ViewStateSesstionTrackWidth: Value;
  CrossFadeState: Mixer.AmplitudeControllerCommon;
  SendsListWrapper: LomId;
}
export namespace Mixer {
  export interface MinMax {
    min: Value;
    max: Value;
  }

  export interface LockedEnvelope {
    LockEnvelope: Value;
  }

  export interface AmplitudeControllerCommon {
    LomId: Value;
    Manual: Value;
    AutomationTarget: Id;
  }

  export interface Modulation extends LockedEnvelope, Id {}

  export interface AmplitudeController extends AmplitudeControllerCommon {
    MidiControllerRange: MinMax;
    ModulationTarget: Modulation;
  }

  export interface MixerFreezeAndDeviceCommon {
    LomId: Value;
    LomIdView: Value;
    IsExpanded: Value;
    On: On;
    ParametersListWrapper: LomId;
    LastSelectedTimeableIndex: Value;
    LastSelectedClipEnvelopeIndex: Value;
    LastPresetRef: Value;
    LockedScripts: unknown;
    IsFolded: Value;
    ShouldShowPresetName: Value;
    UserName: Value;
    Annotation: Value;
    SourceContext: SourceContext;
  }
}
