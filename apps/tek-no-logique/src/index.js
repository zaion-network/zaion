console.log("tek no logique rules");
console.log(document.documentElement.clientWidth);
import * as secp from "https://unpkg.com/@noble/secp256k1"; // Unpkg

class App extends EventTarget {
  constructor() {
    document.documentElement.clientWidth;
    document.documentElement.clientHeight;
  }
}
class UserInput extends EventTarget {
  constructor(userInput) {
    super();
    if (!userInput) return;
    this.userInput = userInput;
  }
  sanitizeEmail(sanitizer) {
    if (!this.userInput) throw `no user input provided`;
    this.sanitizedEmail = sanitizer(this.userInput);
    return this;
  }
  encryptEmail(encrypter) {
    if (!this.sanitizedEmail) throw `email was not sanitized`;
    this.encryptedEmail = encrypter(this.sanitizedEmail);
    return this;
  }
  send(sender) {
    if (!this.encryptedEmail) throw `email was not encrypted`;
    this.sendResponse = sender(this.encryptedEmail);
    return this;
  }
}

const showNostrPopup = () => {
  const container = document.createElement("div");
  const popup = document.createElement("p");
  const button = document.createElement("button");
  button.setAttribute("class", "p0 bc_tr");
  button.addEventListener("click", () => {
    container.setAttribute("class", "none");
  });
  button.textContent = "❌";
  const visibleBig =
    "p_f t_20px r_0 mr10rem fontRoboto bc_red p_1rem2rem br_05rem flex";
  const visibleSmall =
    "p_f t_20px r_0 m0 fontRoboto bc_red p_1rem2rem br_05rem flex";
  container.setAttribute("class", "none");
  popup.setAttribute("class", "mr1rem");
  popup.textContent =
    "woo great it seems you have nostr installed, or the Alby extention! thats great!! soon we will have something ready for you!!";
  setTimeout(() => {
    if (document.documentElement.clientWidth > 1200) {
      container.setAttribute("class", visibleBig);
    } else {
      container.setAttribute("class", visibleSmall);
    }
  }, 1000);
  container.appendChild(popup);
  container.appendChild(button);
  body.appendChild(container);
};
const showAboutPage = how => {
  const message = `Tek No Logique Records, since 2001.
We are an indipendent record label.
We believe in freedom and music!

TNL is stepping in the decentralization world and has created a DAO.

We will be using the nostr protocol to enable unstoppable communication.
If you wish to be a step ahead get yourself an Alby account to be able to have a
Bitcoin lightning wallet to connect to the network.
Subscribe for more news`;
  const shortMessage = `Tek No Logique Records, since 2001.
  We are an indipendent record label.
  We believe in freedom and music!
  
  TNL is stepping in the decentralization world and has created a DAO.
  
  Subscribe (when enabled 😅) for more news!!
  ${document.documentElement.clientHeight}`;
  if (document.documentElement.clientHeight < 600) {
    how(shortMessage);
  } else {
    how(message);
  }
};
const createUl = list => {
  const FONTROBOTO = "fontRoboto";
  const ul = document.createElement("ul");
  ul.className = "p0 mt10rem";
  const title = document.createElement("h3");
  title.id = "cooking";
  title.className = FONTROBOTO;
  title.textContent = "cooking in the yard a store bringing you:";
  ul.appendChild(title);
  list.forEach(e => {
    const li = document.createElement("li");
    li.textContent = e;
    li.className = FONTROBOTO;
    ul.appendChild(li);
  });
  return ul;
};
const createPis = list => {
  const pis = list.map(e => {
    const pi = document.createElement("p");
    pi.className = "fontRoboto mt2rem";
    pi.textContent = e;
    return pi;
  });
  return pis;
};

const createLogoPis = list => {
  const pis = list.map(e => {
    const pi = document.createElement("p");
    const FONTROBOTO = "fontRoboto";
    pi.className = FONTROBOTO;
    pi.textContent = e;
  });
  return pis;
};
const createFooter = () => {
  const footer = document.createElement("footer");
  footer.id = "footer";
  footer.className =
    "flex flexDirCol fontRoboto cG fsSmall p1rem pc_e w100% box_bor mt10rem";
  return footer;
};

function imgFadeIn(logo, className) {
  var wh = window.innerHeight || document.documentElement.clientHeight;

  var rect = logo.getBoundingClientRect();
  var thisPos = rect.top;
  var topOfWindow = window.scrollY || window.pageYOffset;
  if (topOfWindow + wh - 200 > thisPos) {
    logo.className = className;
  }
}
const body = document.getElementById("body");
const comingSoon = document.getElementsByTagName("p").item(1);
const button = document.getElementsByTagName("button").item(0);
const player = document.getElementById("player");
const playBtn = document.getElementById("play-btn");

window.addEventListener("DOMContentLoaded", () => {
  const logoPis = createLogoPis([
    "you can bust the party but you can't stop the vibe",
    "free party for no drugs people",
  ]);
  logoPis.forEach(e => {
    body.appendChild(e);
  });
  const ul = createUl([
    "music",
    "vinyl",
    "merchandise",
    "collectibles",
    "tracks download",
    "mixes download",
    "loops",
    "project files",
    "plug-ins",
    "streaming",
    "booking",
    "chat",
    "social",
  ]);
  body.appendChild(ul);
  const pis = createPis([
    "all of which will be built on decentralized technologies cause we believe in true freedom.",
    "if you are a producer and you are interested in making your music be heard, join us!! links below ⬇️",
    "if you are a dj and you are interested in finding good music, tracks, loops and make your mixes be heard, join us!! links below ⬇️",
    "if you are a label and you are interested in rejoining our network and learn out to use our open source tools, join us!! links below ⬇️",
    "if you are a developer and you are interested in helping us building open source tools, join us!! links below ⬇️",
  ]);
  pis.forEach(p => body.appendChild(p));
  const footer = createFooter();
  body.appendChild(footer);
  const logo = document.getElementById("logo");
  const tnl = document.getElementById("tnl");
  const INIT_LOGO_CLASS = "w100% mt5rem vis_h";
  const MUTATED_LOGO_CLASS = "w100% vis_vimp anim_fi1point2s";
  logo.setAttribute("class", INIT_LOGO_CLASS);
  const playclass = "fa-solid fa-circle-play fa-lg";
  const pauseclass = "fa-solid fa-circle-pause fa-lg";
  const tnlclasssmall = "fs4rem p0 m0 mt20vh";
  const tnlclassbig = "fs8rem p0 m0 mt20vh";

  window.addEventListener("scroll", function () {
    imgFadeIn(logo, MUTATED_LOGO_CLASS);
  });

  window.addEventListener("resize", function () {
    imgFadeIn(logo, INIT_LOGO_CLASS);
  });
  if (document.documentElement.clientWidth > 1200) {
    tnl.className = tnlclassbig;
  } else {
    tnl.className = tnlclasssmall;
  }
  const map = new Map().set(true, pauseclass).set(false, playclass);
  const mapstate = new Map()
    .set(false, () => player.play())
    .set(true, () => player.pause());
  // player.setAttribute("controls", "true");
  playBtn.setAttribute(
    "class",
    `${map.get(false)} cur_p ps_end p_f w_fc r_1rem t_calc1`
  );
  playBtn.addEventListener("click", e => {
    const condition = e.target.className.includes(pauseclass);
    e.target.setAttribute(
      "class",
      `${map.get(!condition)} cur_p ps_end p_f w_fc r_1rem t_calc1`
    );
    mapstate.get(condition)();
  });

  const texts = [`   `, `.  `, `.. `, `...`];
  let index = 0;
  setInterval(() => {
    index++;
    if (index === texts.length) {
      index = 0;
    }
    comingSoon.textContent = texts[index];
  }, 350);
  button.addEventListener("click", () => {
    const askToSubscribe = () => {
      const answer = window.prompt(
        "Enter your email to subscribe to our newsletter"
      );
      return answer;
    };
    const promptWip = () => {
      const message = `we are currently working on this feature, encrypting messages is fun!!
      `;
      window.confirm(message);
    };
    try {
      new UserInput(promptWip())
        .sanitizeEmail(answer => {
          if (answer === null) {
            throw Error("rejected");
          } else return answer;
        })
        .encryptEmail(sanitizedInput => {
          return sanitizedInput;
        })
        .send(ecryptedInput => {
          try {
            window.confirm(
              `thank you for subscribing with this address: ${answer}`
            );
            return true;
          } catch (error) {
            throw Error(error);
          }
        });
    } catch (error) {
      console.log(error);
    }
  });
  const links = [
    {
      href: "https://example.com",
      id: "about",
      target: "_blank",
      text: "about",
    },
    {
      href: "https://t.me/+gm8R7BbWmIRjMGM8",
      id: "tg-group",
      target: "_blank",
      text: "TNL Dao Channel",
    },
    {
      href: "https://t.me/+4HwnT5UaX9w4Yjc0",
      id: "tg-prod-group",
      target: "_blank",
      text: "TNL Producers Group",
    },
    {
      href: "https://audius.co/teknologique",
      id: "audius",
      target: "_blank",
      text: "audius",
    },
    {
      href: "https://gnosisscan.io/address/0xaf9b539cf6689c2d39e29e4dfe4debcf3ab43176",
      id: "dao-gnosis",
      target: "_blank",
      text: "dao on gnosis",
    },
    {
      href: "https://teknologique.bandcamp.com/",
      id: "bandcamp",
      target: "_blank",
      text: "bandcamp",
    },
    {
      href: "https://discord.gg/gNFQ3Us",
      id: "discord",
      target: "_blank",
      text: "discord",
    },
  ];

  links
    .map(data => {
      const a = document.createElement("a");
      a.setAttribute("target", data.target);
      a.setAttribute("id", data.id);
      a.setAttribute("href", data.href);
      a.textContent = data.text;
      return a;
    })
    .forEach(e => footer.appendChild(e));

  const about = document.getElementById("about");
  about.addEventListener("click", e => {
    e.preventDefault();
    showAboutPage(message => {
      window.confirm(message);
    });
  });
  const loadPlayer = () => {
    const src = document.createElement("source");
    src.setAttribute("type", "audio/mpeg");
    src.setAttribute(
      "src",
      "https://audius-dp.amsterdam.creatorseed.com/v1/tracks/DvX88/stream"
    );
    src.textContent = "Il tuo browser non supporta l'elemento audio.";
    player.appendChild(src);
  };
  player.addEventListener("loadedmetadata", () => {
    player.volume = 0.5;
    console.log("loaded");
    console.log(player.volume);
  });
  loadPlayer();

  function hexStringToUint8Array(hexString) {
    const length = hexString.length / 2;
    const uint8Array = new Uint8Array(length);

    for (let i = 0; i < length; i++) {
      const byteValue = parseInt(hexString.substr(i * 2, 2), 16);
      uint8Array[i] = byteValue;
    }

    return uint8Array;
  }

  const bufferToHex = buffer => {
    return Array.from(buffer)
      .map(byte => byte.toString(16).padStart(2, "0"))
      .join("");
  };

  const makePrivateAndPublicKeys = secp => {
    const sk = secp.utils.randomPrivateKey();
    const pk = secp.getPublicKey(sk);
    if (!secp.utils.isValidPrivateKey(sk))
      throw new Error(
        "There was a problem while generating the key which was not valid"
      );
    return { sk, pk };
  };

  const createIV = () => {
    return crypto.getRandomValues(new Uint8Array(16));
  };

  const convertSecret = async secret => {
    return await window.crypto.subtle.importKey(
      "raw",
      secret,
      "AES-CBC",
      false,
      ["encrypt", "decrypt"]
    );
  };

  const encryptData = async (text, convertedSecret, iv) => {
    return await window.crypto.subtle.encrypt(
      {
        name: "AES-CBC",
        iv: iv,
      },
      convertedSecret,
      new TextEncoder().encode(text)
    );
  };

  const makesomething = secp => {
    const { pk: pk1, sk: sk1 } = makePrivateAndPublicKeys(secp);
    const { pk: pk2, sk: sk2 } = makePrivateAndPublicKeys(secp);
    console.log(bufferToHex(sk1));
    console.log(bufferToHex(pk1));
    const isValid = secp.utils.isValidPrivateKey(sk1);
    console.log(isValid);
  };

  const nostrTools = tools => {
    const {
      validateEvent,
      verifySignature,
      getSignature,
      getEventHash,
      getPublicKey,
      relayInit,
      generatePrivateKey,
    } = tools;

    const signEvent = (
      { kind, created_at, tags, content, pubkey },
      getEventHash,
      getSignature,
      validateEvent,
      verifySignature
    ) => {
      let event = {
        kind,
        created_at,
        tags,
        content,
        pubkey,
      };

      event.id = getEventHash(event);
      event.sig = getSignature(event, privateKey);

      let ok = validateEvent(event);
      let veryOk = verifySignature(event);
      if (!ok || !veryOk) throw new Error("not good in signEvent");
      return event;
    };
  };
  // makesomething(secp);
  const TNLPUB =
    "49fd86bcb4f59963a2eea88449b46716cc606b53be62b13cd450a7ee9cbd92fc";
  const SEC = process.env.SEC;
  const PUB = process.env.PUB;
  console.log(SEC);
  console.log(PUB);
  const isValid = secp.utils.isValidPrivateKey(SEC);
  const condition = window.NostrTools !== undefined;
  console.log(condition);
  if (condition) nostrTools(window.NostrTools);
});

// prova fine
window.addEventListener("load", () => {
  // imgFadeIn( logo, INIT_LOGO_CLASS);
  if (!window.nostr) console.log("get yourself nostr!!");
  else showNostrPopup();
});
