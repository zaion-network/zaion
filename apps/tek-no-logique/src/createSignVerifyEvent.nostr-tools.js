import {
  validateEvent,
  verifySignature,
  getSignature,
  getEventHash,
  getPublicKey,
} from "nostr-tools";

let event = {
  kind: 1,
  created_at: Math.floor(Date.now() / 1000),
  tags: [],
  content: "hello",
  pubkey: getPublicKey(privateKey),
};

event.id = getEventHash(event);
event.sig = getSignature(event, privateKey);

let ok = validateEvent(event);
let veryOk = verifySignature(event);
