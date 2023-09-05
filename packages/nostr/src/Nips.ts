import { Nostr } from "./Nostr";

export namespace Nips {
  export interface nipTitles {}
  export const nipTitles: nipTitles = {
    "001": "Basic protocol flow description",
    "002": "Contact List and Petnames",
    "003": "OpenTimestamps Attestations for Events",
    "004": "EncryptedDirectMessage",
    "005": "MappingNostrkeystoDNS-basedinternetidentifiers",
  };
  export interface Nip<
    I extends number,
    T extends (typeof nipTitles)[keyof typeof nipTitles]
  > {
    id: I;
    kinds: Nostr.Kinds.AnyKind[];
    kindRanges: Nostr.Kinds.AnyKindRange[];
    messageTypes: Nostr.Messages.AnyMessage[];
    tags: Nostr.Tags.AnyTag[];
    title: T;
    addKind(kind: Nostr.Kinds.AnyKind): this;
    addKindRange(kindRange: Nostr.Kinds.AnyKindRange): this;
    addMessage(message: Nostr.Messages.AnyMessage): this;
    addTag(tag: Nostr.Tags.AnyTag): this;
  }
  export class Nip<
    I extends number,
    T extends (typeof nipTitles)[keyof typeof nipTitles]
  > implements Nip<I, T>
  {
    constructor(public id: I, public title: T) {
      this.kinds = [];
      this.kindRanges = [];
      this.messageTypes = [];
      this.tags = [];
    }
    addKind(kind: Nostr.Kinds.AnyKind): this {
      this.kinds.push(kind);
      return this;
    }
    addKindRange(kindRange: Nostr.Kinds.AnyKindRange): this {
      this.kindRanges.push(kindRange);
      return this;
    }
    addMessage(message: Nostr.Messages.AnyMessage): this {
      this.messageTypes.push(message);
      return this;
    }
    addTag(tag: Nostr.Tags.AnyTag): this {
      this.tags.push(tag);
      return this;
    }
  }
}
