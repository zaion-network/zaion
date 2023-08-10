import { Nostr as N } from "../Nip_002/Nip_002";
type RecommendedRelayURL = Nostr.BasicTypes.RecommendedRelayURL;

declare module "../../Nostr" {
  namespace Nostr {
    export import Nip_003 = _003;
    namespace Nips {
      interface nipTitles {
        ["003"]?: "OpenTimestamps Attestations for Events";
      }
    }
    namespace BasicTypes {
      type Base64<T extends string> = T;
      type OTSData = string;
    }
    namespace Event {
      interface Event<
        K extends number,
        C extends string,
        T extends (
          | ["e", id, RecommendedRelayURL]
          | ["p", pubkey, RecommendedRelayURL]
          | rootMessage
          | replyMessage
          | hideMessage
          | muteUser
        )[] = (
          | ["e", id, RecommendedRelayURL]
          | ["p", pubkey, RecommendedRelayURL]
          | rootMessage
          | replyMessage
          | hideMessage
          | muteUser
        )[]
      > {
        ots?: BasicTypes.Base64<BasicTypes.OTSData>;
      }
    }
  }
}

N.Nips.nipTitles = {
  ...N.Nips.nipTitles,
  "003": "OpenTimestamps Attestations for Events",
} as const;

const Nip = N.Nips.Nip;
const nipTitles = N.Nips.nipTitles;

/**
 * NIP-03
 * ======
 *
 * OpenTimestamps Attestations for Events
 * --------------------------------------
 *
 * `draft` `optional` `author:fiatjaf`
 *
 * When there is an OTS available it MAY be included in the existing event body under the `ots` key:
 *
 * ```
 * {
 *   "id": ...,
 *   "kind": ...,
 *   ...,
 *   ...,
 *   "ots": <base64-encoded OTS file data>
 * }
 * ```
 *
 * The _event id_ MUST be used as the raw hash to be included in the OpenTimestamps merkle tree.
 *
 * The attestation can be either provided by relays automatically (and the OTS binary contents just appended to the events it receives) or by clients themselves when they first upload the event to relays — and used by clients to show that an event is really "at least as old as [OTS date]".
 *
 */
namespace _003 {
  export const nip_003 = new Nip(3, nipTitles["003"]);
}

N.Nip_003 = _003;
export import Nostr = N;
