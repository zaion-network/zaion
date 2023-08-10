import { Nostr } from "./Nip_001";

type Byte32LoCaseHex<T extends string> = Nostr.BasicTypes.Byte32LoCaseHex<T>;
type Sha<T extends string> = Nostr.BasicTypes.Sha<T>;
type serialized<T> = Nostr.BasicTypes.serialized<T>;
type Max64Char = Nostr.BasicTypes.Max64Char;
type RecommendedRelayURL = Nostr.BasicTypes.RecommendedRelayURL;
type UnixTimestampInSec = Nostr.BasicTypes.UnixTimestampInSec;
type signature = Nostr.BasicTypes.signature;
