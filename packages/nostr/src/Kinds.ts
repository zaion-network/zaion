import { Nostr } from "./Nostr";

export namespace Kinds {
  export interface kinds {
    [k: string]: string | undefined;
  }
  export const kinds: kinds = {
    metadata: "Metadata",
    recommend_relay: "Recommended Relay",
    short_note: "Short Text Note",
    contacts: "Contacts",
    encryptedDirectMessages: "Encrypted Direct Messages",
  };
  // export enum kinds {
  //   metadata = "Metadata",
  //   short_note = "Short Text Note",
  //   recommend_relay = "",
  //   contacts = "Contacts",
  //   encryptedDirectMessages = "Encrypted Direct Messages",
  //   eventDeletion = "Event Deletion",
  //   repost = "Repost",
  //   reaction = "Reaction",
  //   badgeAward = "Badge Award",
  //   genericRepost = "Generic Repost",
  //   channelCreation = "Channel Creation",
  //   channelMetadata = "Channel Metadata",
  //   channelMessage = "Channel Message",
  //   channelHideMessage = "Channel Hide Message",
  //   channelMuteUser = "Channel Mute User",
  //   fileMetadata = "File Metadata",
  //   liveChatMessage = "Live Chat Message",
  //   reporting = "Reporting",
  //   label = "Label",
  //   zapRequest = "Zap Request",
  //   zap = "Zap",
  //   muteList = "Mute List",
  //   pinList = "Pin List",
  //   relayListMeta = "Relay List Metadata",
  //   walletInfo = "Wallet Info",
  //   clientAuth = "Client Authentication",
  //   walletRequest = "Wallet Request",
  //   walletResponse = "Wallet Response",
  //   nostrConnect = "Nostr Connect",
  //   HTTPAuth = "HTTP Auth",
  //   catPeopleList = "Categorized People List",
  //   catBookmarkList = "Categorized Bookmark List",
  //   profileBadges = "Profile Badges",
  //   badgeDefinition = "Badge Definition",
  //   c_u_a_stall = "Create or update a stall",
  //   c_u_a_product = "Create or update a product",
  //   l_form_Content = "Long-form Content",
  //   app_spec_Data = "Application-specific Data",
  //   liveEvent = "Live Event",
  //   handler_recomm = "Handler recommendation",
  //   handler_info = "Handler information",
  // }

  export enum kindDefinitionMembers {
    kind = "kind",
    description = "description",
    nip = "nip",
  }

  export interface KindDefinition<
    K extends number,
    D extends (typeof kinds)[string],
    I extends number
  > {
    kind: K;
    description: D;
    // @ts-ignore
    nip: Nostr.Nips.Nip<I, any>;
  }
  export class KindDefinition<
    K extends number,
    D extends (typeof kinds)[string],
    I extends number
  > {
    constructor(
      public kind: K,
      public description: D,
      // @ts-ignore
      nip: Nostr.Nips.Nip<I, any>
    ) {
      nip.addKind(this);
    }
  }

  export enum kindRanges {
    regular = "Regular Events",
    replaceable = "Replabeable Events",
    ephemeral = "Ephemeral Events",
    param_repl = "Parametrizable Replaceable Events",
  }

  export interface KindRange<
    L extends number,
    H extends number,
    D extends kindRanges,
    I extends number
  > {
    // @ts-ignore
    range: Nostr.BasicTypes.range<L, H>;
    description: D;
  }
  export class KindRange<
    L extends number,
    H extends number,
    D extends kindRanges,
    I extends number
  > implements KindRange<L, H, D, I>
  {
    constructor(
      // @ts-ignore
      public range: Nostr.BasicTypes.range<L, H>,
      public description: D,
      // @ts-ignore
      nip: Nostr.Nips.Nip<I, any>
    ) {
      nip.addKindRange(this);
    }
  }

  export type AnyKind = KindDefinition<any, any, any>;
  export type AnyKindRange = KindRange<any, any, any, any>;
}
