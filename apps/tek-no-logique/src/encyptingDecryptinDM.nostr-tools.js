import { nip04, getPublicKey, generatePrivateKey } from "nostr-tools";

// sender
let sk1 = generatePrivateKey();
let pk1 = getPublicKey(sk1);

// receiver
let sk2 = generatePrivateKey();
let pk2 = getPublicKey(sk2);

// on the sender side
let message = "hello";
let ciphertext = await nip04.encrypt(sk1, pk2, message);

let event = {
  kind: 4,
  pubkey: pk1,
  tags: [["p", pk2]],
  content: ciphertext,
  ...otherProperties,
};

sendEvent(event);

// on the receiver side
sub.on("event", async event => {
  let sender = event.pubkey;
  pk1 === sender;
  let plaintext = await nip04.decrypt(sk2, pk1, event.content);
});
