import { nip05 } from "nostr-tools";

let profile = await nip05.queryProfile("jb55.com");
console.log(profile.pubkey);
// prints: 32e1827635450ebb3c5a7d12c1f8e7b2b514439ac10a67eef3d9fd9c5c68e245
console.log(profile.relays);
// prints: [wss://relay.damus.io]
