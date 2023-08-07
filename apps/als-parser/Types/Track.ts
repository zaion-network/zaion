import { AbletonXml } from "./AbletonXml";
import { DeviceChain as D } from "./DeviceChain";
import { Name as N } from "./Name";

type Value = AbletonXml.Attributes.Value;
type LomId = AbletonXml.Attributes.LomId;
type Id = AbletonXml.Attributes.Id;
type MidiDeviceChain = Track.DeviceChain.MidiDeviceChain;
type AudioDeviceChain = Track.DeviceChain.AudioDeviceChain;
type GroupDeviceChain = Track.DeviceChain.GroupDeviceChain;

export namespace Track {
  export interface TrackDelay {
    Value: Value;
    IsValueSampleBased: Value;
  }

  export interface AutomationEnvelopes {
    Envelopes: string;
  }

  export interface CommonTrack {
    LomId: Value;
    LomIdView: Value;
    IsContentSelected: Value;
    EnvelopeModePreferred: Value;
    TrackDelay: TrackDelay;
    Name: Name;
    ColorIndex: Value;
    AutomationEnvelopes: AutomationEnvelopes;
    TrackGroupId: Value;
    TrackUnfolded: Value;
    DevicesListWrapper: LomId;
    ClipSlotsListWrapper: string;
    ViewData: LomId;
    DeviceChain: MidiDeviceChain | AudioDeviceChain | GroupDeviceChain;
  }

  export interface CommonAudioAndMidi extends CommonTrack {
    SavedPlayingSlot: string;
    SavedPlayingOffset: string;
    Freeze: Value;
    VelocityDetail: string;
    NeedArrangerRefreeze: string;
    PostProcessFreezeClips: string;
  }

  export interface GroupTrack extends Id, CommonTrack {
    Slots: string;
    DeviceChain: GroupDeviceChain;
  }

  export interface AudioTrack extends Id, CommonAudioAndMidi {
    DeviceChain: AudioDeviceChain;
  }

  type Keys = keyof AudioTrack;

  export class AudioTrack {
    constructor(obj: { [key in Keys]: any }) {
      for (let key in obj) {
        this[key as keyof this] = obj[key as keyof typeof obj];
      }
    }
  }

  export interface MidiTrack extends CommonAudioAndMidi {
    ReWireSlaveMidiTargetId: string;
    DeviceChain: MidiDeviceChain;
  }

  export import DeviceChain = D;

  export import Name = N;
}
