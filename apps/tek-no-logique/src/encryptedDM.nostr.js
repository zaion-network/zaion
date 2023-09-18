import crypto from "crypto";
import * as secp from "@noble/secp256k1";

{
  let sharedPoint = secp.getSharedSecret(ourPrivateKey, "02" + theirPublicKey);
  let sharedX = sharedPoint.slice(1, 33);

  let iv = crypto.randomFillSync(new Uint8Array(16));
  var cipher = crypto.createCipheriv("aes-256-cbc", Buffer.from(sharedX), iv);
  let encryptedMessage = cipher.update(text, "utf8", "base64");
  encryptedMessage += cipher.final("base64");
  let ivBase64 = Buffer.from(iv.buffer).toString("base64");

  let event = {
    pubkey: ourPubKey,
    created_at: Math.floor(Date.now() / 1000),
    kind: 4,
    tags: [["p", theirPublicKey]],
    content: encryptedMessage + "?iv=" + ivBase64,
  };
}

class App extends EventTarget {
  secret;
  iv;
  cypher;
  encryptedMessage;
  getSecret = (getter, senderSk, recipientPk) => {
    try {
      const secret = getter(senderSk, recipientPk);
      this.secret = secret;
    } catch (error) {
      console.log(error);
    }
  };
  cypherSecret = (cypherMaker, iv) => {
    try {
      this.iv = iv;
      this.cypher = cypherMaker(this.secret, iv);
    } catch (error) {
      console.log(error);
    }
  };
  encryptData = (encrypter, text) => {
    try {
      this.encryptedMessage = encrypter(this.cypher, text);
    } catch (error) {
      console.log(error);
    }
  };
  makeContent = contentMaker => {
    try {
      this.content = contentMaker(
        encryptedMessage,
        Buffer.from(this.iv.buffer).toString("base64")
      );
    } catch (error) {
      console.log(error);
    }
  };
  makeEvent = (eventMaker, senderPk, creationDate, recipientPk) => {
    const event = eventMaker(senderPk, creationDate, recipientPk, this.content);
  };
}

const app = new App();
const SENDERSK = "asdasd";
const SENDERPK = "asdasd";
const RECIPIENTPK = "asdasd";
const TEXT = "testo da crittografare";

app.getSecret(
  (senderSk, recipientPk) => {
    const sharedPoint = secp.getSharedSecret(senderSk, `02${recipientPk}`);
    return sharedPoint.slice(1, 33);
  },
  SENDERSK,
  RECIPIENTPK
);
app.cypherSecret((secret, iv) => {
  return crypto.createCipheriv("aes-256-cbc", Buffer.from(secret), iv);
}, crypto.randomFillSync(new Uint8Array(16)));

app.encryptData((cypher, text) => {
  let encryptedMessage = cypher.update(text, "utf8", "base64");
  encryptedMessage += cipher.final("base64");
  return encryptedMessage;
}, TEXT);

app.makeContent((encryptedMessage, ivBase64) => {
  return encryptedMessage + "?iv=" + ivBase64;
});

app.makeEvent(
  (senderPk, created_at, recipientPk, content) => {
    return {
      pubkey: senderPk,
      created_at,
      kind: 4,
      tags: [["p", recipientPk]],
      content,
    };
  },
  SENDERPK,
  Math.floor(Date.now() / 1000),
  RECIPIENTPK
);
