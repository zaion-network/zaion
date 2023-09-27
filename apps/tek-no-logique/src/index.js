import * as secp from "https://unpkg.com/@noble/secp256k1"; // Unpkg
import { links } from "../database/links";
import { paragraphs } from "../database/pis";
import { listOfFeatures } from "../database/listOfFeatures";
import { logoPayoffs } from "../database/logoPayoffs";

let parser = new DOMParser();

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
  popup.setAttribute("class", "mr1rem cDark");
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

const loadPlayer = (document, element) => {
  const src = document.createElement("source");
  src.setAttribute("type", "audio/mpeg");
  src.setAttribute(
    "src",
    "https://audius-dp.amsterdam.creatorseed.com/v1/tracks/DvX88/stream"
  );
  src.textContent = "Il tuo browser non supporta l'elemento audio.";
  element.appendChild(src);
};

/**
 * crea lettore audio
 * @param {document} document
 */
const createAudio = document => {
  const element = document.createElement("audio");
  element.id = "player";
  element.addEventListener("loadedmetadata", () => {
    element.volume = 0.5;
  });
  loadPlayer(document, element);
  return element;
};

/**
 *
 * @param {document} document
 * @param {string} path
 */
const createSvg = async (document, path, id, pathcolor) => {
  let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  const data = await (await fetch(path)).text();
  let svgDoc = parser.parseFromString(data, "image/svg+xml");
  let elements = svgDoc.querySelectorAll("circle, rect, path");
  // Aggiungi ogni elemento al tuo elemento SVG
  elements.forEach(element => {
    if (element.tagName === "path") {
      element.setAttribute("fill", pathcolor);
    }
    svg.appendChild(element);
  });
  svg.id = id;
  svg.classList.add("w24px");
  svg.classList.add("h24px");
  return svg;
};

/**
 *
 * @param {document} document
 */
const createPlayIcon = async (document, player) => {
  // let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  // const data = await (await fetch("./assets/play-btn-black.svg")).text();
  // let svgDoc = parser.parseFromString(data, "image/svg+xml");
  // let elements = svgDoc.querySelectorAll("circle, rect, path");
  // // Aggiungi ogni elemento al tuo elemento SVG
  // elements.forEach(element => {
  //   if (element.tagName === "path") {
  //     element.setAttribute("fill", "white");
  //   }
  //   svg.appendChild(element);
  // });
  const playbtnsvg = await createSvg(
    document,
    "./assets/play-btn-black.svg",
    "play-btn",
    "white"
  );
  const pausebtnsvg = await createSvg(
    document,
    "./assets/pause-btn-black.svg",
    "pause-btn",
    "white"
  );
  const button = document.createElement("div");
  button.appendChild(playbtnsvg);
  button.className = "cur_p ps_end p_f w_fc r_1rem t_calc1 w24px h24px";
  button.addEventListener("click", e => {
    const parent = e.target.parentNode;
    console.log(parent.firstChild.id);
    if (parent.firstChild.id === "play-btn") {
      parent.removeChild(parent.firstChild);
      parent.appendChild(pausebtnsvg);
      player.play();
    } else {
      parent.removeChild(parent.firstChild);
      parent.appendChild(playbtnsvg);
      player.pause();
    }
  });
  // const play = document.createElement("img");
  // play.id = "play-btn";
  // play.src = "assets/play-btn-black.svg";
  // const playclass = "none";
  // const pauseclass = "fa-solid fa-circle-pause fa-lg";

  // const map = new Map().set(true, pauseclass).set(false, playclass);
  // const mapstate = new Map()
  //   .set(false, () => player.play())
  //   .set(true, () => player.pause());
  // // player.setAttribute("controls", "true");
  // play.setAttribute("class", `${map.get(false)} `);
  // play.addEventListener("click", e => {
  //   const condition = e.target.className.includes(pauseclass);
  //   e.target.setAttribute("class", `${map.get(!condition)} `);
  //   mapstate.get(condition)();
  // });
  return button;
};

/**
 *
 * @param {document} document
 */
const createMainContainer = document => {
  const container = document.createElement("div");
  container.id = "main-container";
  container.className = "flex flexWrap flexDirCol w100% pc_c mb5rem";
  return container;
};

/**
 * crea il titolo TNL
 * @param {document} document
 */
const createTNL = document => {
  const h1 = document.createElement("h1");
  h1.id = "tnl";
  h1.className = "fs4rem p0 m0 mt20vh";
  h1.textContent = "Tek No Logique";
  const tnlclasssmall = "fs4rem p0 m0 mt20vh";
  const tnlclassbig = "fs8rem p0 m0 mt20vh";
  if (document.documentElement.clientWidth > 1200) {
    h1.className = tnlclassbig;
  } else {
    h1.className = tnlclasssmall;
  }
  return h1;
};

/**
 * crea l'elemento coming soon
 * @param {document} document
 */
const createComingSoon = document => {
  const container = document.createElement("div");
  container.className = "flex flexWrap pc_c";
  const comingsoontext = document.createElement("p");
  comingsoontext.className = "fontRoboto";
  comingsoontext.textContent = "coming soon";
  const comingsoonpoint = document.createElement("p");
  comingsoonpoint.className = "fontRoboto w20px taL";
  const texts = [`   `, `.  `, `.. `, `...`];
  let index = 0;
  setInterval(() => {
    index++;
    if (index === texts.length) {
      index = 0;
    }
    comingsoonpoint.textContent = texts[index];
  }, 350);
  container.appendChild(comingsoontext);
  container.appendChild(comingsoonpoint);
  return container;
};

/**
 * crea call to action
 * @param {document} document
 */
const createCallToAction = document => {
  const container = document.createElement("div");
  container.id = "call-to-action";
  container.className = "flex flexWrap pc_c";
  const button = document.createElement("button");
  button.textContent = "NEWS, PLEASE!!";
  container.appendChild(button);

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
    const answer = askToSubscribe();
    try {
      new UserInput(answer)
        .sanitizeEmail(answer => {
          console.log(validator.isEmail(answer));
          if (answer === null) {
            throw Error("rejected");
          } else if (!validator.isEmail(answer)) {
            window.alert("You Must input a valid email");
          } else return answer;
        })
        .encryptEmail(sanitizedInput => {
          return sanitizedInput;
        })
        .send(ecryptedInput => {
          fetch(`/subscribe?m=${ecryptedInput}`);
          try {
            window.confirm(
              `thank you for subscribing with this address: ${ecryptedInput}`
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
  return container;
};

/**
 * crea l'elemento logo
 * @param {document} document
 */
const createLogo = document => {
  const INIT_LOGO_CLASS = "w100% mt5rem vis_h";
  const MUTATED_LOGO_CLASS = "w100% vis_vimp anim_fi1point2s";
  const image = document.createElement("img");
  image.src = "./assets/Logo_white.svg";
  image.id = "logo";
  image.className = INIT_LOGO_CLASS;
  window.addEventListener("scroll", function () {
    imgFadeIn(logo, MUTATED_LOGO_CLASS);
  });

  window.addEventListener("resize", function () {
    imgFadeIn(logo, INIT_LOGO_CLASS);
  });
  return image;
};

const createLogoPis = list => {
  const pis = list.map(e => {
    const pi = document.createElement("p");
    const FONTROBOTO = "fontRoboto";
    pi.className = FONTROBOTO;
    pi.textContent = e;
    return pi;
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

/**
 *
 * @param {HTMLElement} element
 * @param {HTMLElement[]} nodes
 */
const appendChildren = (element, nodes) => {
  nodes.forEach(e => {
    element.appendChild(e);
  });
};

const body = document.getElementById("body");

window.addEventListener("DOMContentLoaded", async () => {
  const audio = createAudio(document);
  body.appendChild(audio);
  const playicon = await createPlayIcon(document, audio);
  console.log(playicon);
  body.appendChild(playicon);
  const maincontainer = createMainContainer(document);
  const teknologique = createTNL(document);
  maincontainer.appendChild(teknologique);
  const comingsoon = createComingSoon(document);
  maincontainer.appendChild(comingsoon);
  const calltoaction = createCallToAction(document);
  maincontainer.appendChild(calltoaction);
  body.appendChild(maincontainer);
  const newlogo = createLogo(document);
  body.appendChild(newlogo);
  newlogo.addEventListener("load", () => {
    const logoPis = createLogoPis(logoPayoffs);
    logoPis.forEach(e => {
      body.appendChild(e);
    });
    const ul = createUl(listOfFeatures);
    body.appendChild(ul);
    const pis = createPis(paragraphs);
    pis.forEach(p => body.appendChild(p));
    const footer = createFooter();
    body.appendChild(footer);

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
  });
});

// prova fine
window.addEventListener("load", () => {
  // imgFadeIn( logo, INIT_LOGO_CLASS);
  if (!window.nostr) console.log("get yourself nostr!!");
  else showNostrPopup();
});
