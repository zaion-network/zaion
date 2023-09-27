const secp = require("@noble/secp256k1");
const tools = require("nostr-tools");

export function hexStringToUint8Array(hexString) {
  const length = hexString.length / 2;
  const uint8Array = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    const byteValue = parseInt(hexString.substr(i * 2, 2), 16);
    uint8Array[i] = byteValue;
  }

  return uint8Array;
}

export const bufferToHex = buffer => {
  return Array.from(buffer)
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("");
};

/**
 *
 * @param {secp} secp
 * @returns
 */
export const makePrivateAndPublicKeys = secp => {
  const sk = secp.utils.randomPrivateKey();
  const pk = secp.getPublicKey(sk);
  if (!secp.utils.isValidPrivateKey(sk))
    throw new Error(
      "There was a problem while generating the key which was not valid"
    );
  return { sk, pk };
};

export const createIV = () => {
  return crypto.getRandomValues(new Uint8Array(16));
};

export const convertSecret = async secret => {
  return await window.crypto.subtle.importKey("raw", secret, "AES-CBC", false, [
    "encrypt",
    "decrypt",
  ]);
};

export const encryptData = async (text, convertedSecret, iv) => {
  return await window.crypto.subtle.encrypt(
    {
      name: "AES-CBC",
      iv: iv,
    },
    convertedSecret,
    new TextEncoder().encode(text)
  );
};

export const createEvent = ({ kind, created_at, tags, content, pubkey }) => {
  return { kind, created_at, tags, content, pubkey };
};

export const signEvent = (event, privateKey) => {
  event.id = tools.getEventHash(event);
  console.log(privateKey);
  event.sig = tools.getSignature(event, privateKey);

  let ok = tools.validateEvent(event);
  let veryOk = tools.verifySignature(event);
  if (!ok || !veryOk) throw new Error("not good in signEvent");
  return event;
};

export async function connectToRelay(relayAddr) {
  const relay = tools.relayInit(relayAddr);
  relay.on("connect", () => {
    console.log(`connected to ${relay.url}`);
  });
  relay.on("error", () => {
    console.log(`failed to connect to ${relay.url}`);
  });
  relay.on("disconnect", () => console.log("closed"));
  await relay.connect();
  return relay;
}

export function queryRelay(relay, ids) {
  let sub = relay.sub([{ ids }]);
  sub.on("event", event => {
    console.log("we got the event we wanted:", event);
  });
  sub.on("eose", () => {
    sub.unsub();
  });
}

export async function publishAndMonitor(
  sk,
  pk,
  relay,
  kinds,
  event,
  finishEvent,
  cb
) {
  const sub = relay.sub([{ kinds, authors: [pk] }]);
  sub.on("event", event => {
    cb(event);
  });

  // this assigns the pubkey, calculates the event id and signs the event in a single step
  const signedEvent = finishEvent(event, sk);
  await relay.publish(signedEvent);
  return true;
}

export async function encryptMessage(sk1, pk2, message) {
  return tools.nip04.encrypt(sk1, pk2, message);
}

export async function sendDM(to, message, sk, pk, cb) {
  const content = await encryptMessage(sk, to, message);
  const event = createEvent({
    content,
    created_at: Math.floor(Date.now() / 1000),
    kind: 4,
    pubkey: pk,
    tags: [["p", to]],
  });

  const relay = await connectToRelay("wss://relay.damus.io");
  await publishAndMonitor(sk, pk, relay, [4], event, tools.finishEvent, e => {
    cb(e);
  });
  setTimeout(() => {
    relay.close;
  }, 2000);
  return true;
}
// export async function encrypChannelMessage(to, channelMessage, sk, pk, cb) {
//   return tools.nip28.encrypt(to, channelMessage);
// }
// export async function sendCM(to, sk, channelMessage) {
//   const relay = await connectToRelay("wss://relay.damus.io");
//   const content = await encryptChannelMessage(to, channelMessage);
//   const event = createEvent({
//     content,
//     created_at: Math.floor(Date.now() / 1000),
//     kind: 42,
//     pubkey: pk,
//     tags: [["e", eventIdChannel, relay]],
//   });
//   await publishAndMonitor(sk, pk, relay, [42], event, tools.finishEvent, e => {
//     cb(e);
//   });
//   setTimeout(() => {
//     relay.close;
//   }, 2000);
//   return true;
// }
