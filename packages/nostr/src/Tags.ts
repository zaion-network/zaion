import { Nostr as N, Nostr } from "./Nostr";

// declare module "./Nostr" {
//   export namespace Nostr {
//     export import Tags = _Tags;
//   }
// }

declare module "./Tags" {}

export namespace Tags {
  export interface tagNames {
    [k: string]: string;
  }
  export var tagNames: tagNames;

  export interface newTagDescriptions {
    [k: string]: string;
  }
  export var newTagDescriptions: newTagDescriptions;
  export type AnyTag = TagDefinition<any, any, any, any, any>;
  // export enum tagNames {
  //   a = "a",
  //   alt = "alt",
  //   d = "d",
  //   e = "e",
  //   g = "g",
  //   i = "i",
  //   l = "l",
  //   L = "L",
  //   p = "p",
  //   r = "r",
  //   t = "t",
  //   amount = "amount",
  //   bolt11 = "bolt11",
  //   challenge = "challenge",
  //   contentWarning = "content-warning",
  //   delegation = "delegation",
  //   badgeDesc = "description",
  //   invoiceDesc = "description",
  //   emoji = "emoji",
  //   expiration = "expiration",
  //   image = "image",
  //   lnurl = "lnurl",
  //   name = "name",
  //   nonce = "nonce",
  //   preimage = "preimage",
  //   published_at = "published_at",
  //   relay = "relay",
  //   relays = "relays",
  //   subject = "subject",
  //   summary = "summary",
  //   thumb = "thumb",
  //   title = "title",
  //   zap = "zap",
  // }

  // export enum tagDescriptions {
  //   "a" = "coordinates to an event",
  //   "alt" = "Alt tag",
  //   "d" = "identifier",
  //   "e" = "event id (hex)",
  //   "g" = "geohash",
  //   "i" = "identity",
  //   "l" = "label, label namespace",
  //   "L" = "label namespace",
  //   "p" = "pubkey (hex)",
  //   "r" = "a reference (URL, etc)",
  //   "t" = "hashtag",
  //   "amount" = "millisats",
  //   "bolt11" = "`bolt11` invoice",
  //   "challenge" = "challenge string",
  //   "content-warning" = "reason",
  //   "delegation" = "pubkey, conditions, delegation ",
  //   "description_b" = "badge description",
  //   "description_i" = "invoice description",
  //   "emoji" = "shortcode",
  //   "expiration" = "unix timestamp (string)",
  //   "image" = "image URL",
  //   "lnurl" = "`bech32` encoded `lnurl`",
  //   "name" = "badge name",
  //   "nonce" = "random",
  //   "preimage" = "hash of `bolt11` invoice",
  //   "published_at" = "unix timestamp (string)",
  //   "relay" = "relay url",
  //   "relays" = "relay list",
  //   "subject" = "subject",
  //   "summary" = "article summary",
  //   "thumb" = "badge thumbnail",
  //   "title" = "article title",
  //   "zap" = "profile name",
  // }

  export enum otherParameters {
    relay_url = "relay URL",
    marker = "marker",
    proof = "proof",
    annotations = "annotations",
    image_url = "image URL",
    dimensions = "dimensions in pixels",
    type_of_value = "type of value",
  }

  export enum markers {
    root = "root",
    reply = "reply",
    mention = "mention",
  }

  export interface TagDefinition<
    N extends (typeof tagNames)[string],
    D extends (typeof newTagDescriptions)[string],
    F extends `${D}`,
    O extends otherParameters,
    I extends number
  > {
    name: N;
    description: D;
    other_parameters: O[];
    nip: N.Nips.Nip<I, any>;
    addTagToNip<I extends number>(nip: N.Nips.Nip<I, any>): this;
  }
  export class TagDefinition<
    N extends (typeof tagNames)[string],
    D extends (typeof newTagDescriptions)[string],
    F extends `${D}`,
    O extends otherParameters,
    I extends number
  > implements TagDefinition<N, D, F, O, I>
  {
    constructor(
      public name: N,
      public description: D,
      public other_parameters: O[],
      nip: N.Nips.Nip<I, any>
    ) {
      nip.addTag(this);
    }
    addTagToNip<I extends number>(nip: N.Nips.Nip<I, any>): this {
      nip.addTag(this);
      return this;
    }
    get fieldName(): F {
      return `#${this.name}` as F;
    }
  }
}
