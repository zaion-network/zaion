import { App } from "@zaionstate/ui";
import { UIDesign } from "@zaionstate/ui";
import { Footer } from "./Footer.js";
import { Testata } from "./Testata.js";
import { prodotti, prodottiArray } from "./db/prodotti.js";
import { PopUpMenu } from "./PopUpMenu.js";
import { Content } from "./Content.js";

import { Relay } from "@zaionstate/nostr/web";

document.addEventListener("DOMContentLoaded", () =>
  console.log("content loaded")
);
document.addEventListener("load", () => console.log("loaded"));

const events = App.events;
const app = new App({
  window: window,
  nodeslist: UIDesign.nodeslist,
});

function closeChat() {
  const popUpMenuNone = `dis_none`;
  popUpMenuDesign.element.className = popUpMenuNone;
}

function showChat() {
  const popUpMenuClassBig =
    "flex flex-column bg w_100% h_100% pos_a top_0 p_20 bkdf_blur-5 box_bb jc_c ai_c fs_200%";
  popUpMenuDesign.element.className = popUpMenuClassBig;
}

function sendMessage(props) {
  if (props) {
  } else {
    var messageText = messageInput.value.trim();
    if (messageText !== "") {
    }
  }
}

function filterProducts() {
  console.log("changed");
  var selectedTag = tagsSelect.value;
  var products = document.querySelectorAll("#product");
  for (var i = 0; i < products.length; i++) {
    var product = products[i];
    var detailsElement = product.querySelector("#details");
    var tags = detailsElement.getAttribute("data-tags");

    if (!tags.includes(selectedTag)) {
      product.style.display = "none";
    } else {
      product.style.display = "flex";
    }
  }
}

const togglePlay = () => {
  if (audioPlayer.paused) {
    audioPlayer.play();
    playPauseButton.innerHTML = "&#10074;&#10074;"; // Simbolo di pausa
  } else {
    audioPlayer.pause();
    playPauseButton.innerHTML = "&#9658;"; // Simbolo di play
  }
};

function handleNextButtonClick() {
  const currentSource = audioPlayer.currentSrc;
  const sources = audioPlayer.getElementsByTagName("source");
  let nextIndex =
    Array.from(sources).findIndex(
      (source) => source.src === currentSource
    ) + 1;
  if (nextIndex >= sources.length) {
    nextIndex = 0;
  }
  const nextSource = sources[nextIndex];
  audioPlayer.src = nextSource.src;
  trackTitle.textContent = decodeURIComponent(
    nextSource.getAttribute("track-title")
  );
  trackArtist.textContent = decodeURIComponent(
    nextSource.getAttribute("track-artist")
  );
  audioPlayer.play();
  playPauseButton.innerHTML = "&#10074;&#10074;";
}

let pubkey;
const getkey = async (createTextElement) => {
  console.log("called");
  setTimeout(async () => {
    pubkey = await window.nostr.getPublicKey();
    const { UIDesign } = await import("@zaionstate/ui");
    console.log(UIDesign);
    console.log(`user connected: ${pubkey.slice(0, 8)}..`);
    Relay.Socket.startSocket({
      open: Relay.openHandler,
      message: Relay.messageHandler((prop) => {
        prop.forEach((e) => {
          createTextElement(e.content, e.type);
        });
      })(pubkey),
    });
  }, 3000);
};

function createTextElement(messageText, usertype) {
  var usericon = new UIDesign({
    tag: "div",
    id: "user-icon",
  });
  usericon.setClassName("bg mw_1.rem h_1.5rem brad_100% m_02rem");
  var text = new UIDesign({
    tag: "p",
    id: "message-text",
    className: "m_0 c_d w_maxcont",
  }).setInnerText(messageText);
  const newmessageContainer = new UIDesign({
    tag: "div",
    id: "message-container",
  });
  var messageContainer = document.createElement("div");
  if (usertype === "user") {
    const className =
      "flex bg_bl c_d p_10 mb_5 ml_80 brad_5-5-0-5 jc_e";
    messageContainer.className = className;
    newmessageContainer.addChild(text).setClassName(className);
  } else {
    const className = "flex bg_vl c_d p_10 mb_5 mr_80 brad_0-5-5-5";
    messageContainer.className = className;
    newmessageContainer
      .addChild(usericon)
      .addChild(text)
      .setClassName(className);
  }
  messageContainer.textContent = messageText;
  chatWindow.insertBefore(
    newmessageContainer.element,
    chatWindow.firstChild
  );
  messageInput.value = "";
}

const bg_color = new UIDesign({
  tag: "div",
  id: "color",
  className: "pos_a top_0 w_100% h_100% bg_prim",
});
app.appendTo("layout", bg_color.element);
app.setBodyClassName("m_0 w_100vw h_100vh");

app.on(events.themeChange, () =>
  console.log("color theme changed")
);

app.on(events.orientationChange, () =>
  console.log("orientation changed")
);

app.on(events.requestedProvider, () =>
  console.log("provider requested")
);

app.on(events.dom, () => {
  console.log("dom ready");
  setTimeout(() => {
    app.checkNostr();
    app.requestProvider();
  }, 100);
});

app.on(events.nostr, () => {
  console.log("got nostr");
  getkey(createTextElement);
});

app.on(events.load, (app) => {
  console.log("loaded");
  const iffee = (condition, cb) => {
    if (condition) cb();
  };
  const keydownHandler = (event) =>
    iffee(event.keyCode === 13, sendMessage);
  messageInput.addEventListener("keydown", keydownHandler);
});

app.on(events.noProvider, () => {
  console.log("no provider");
  const closeIcon = new UIDesign({
    tag: "div",
    id: "close-icon",
    className: "pos_a top_10 r_10 cu_p",
  }).setInnerText("✖︎");
  const logInWindow = new UIDesign({
    tag: "div",
    id: "chat-window",
    className: "chat-window bg",
  });
  const text = `Our chat is created on an open protocol, named “Nostr”, a new kind of censorship-resistant social networks.
  Users can identify themselves on every Nostr apps with their private and public key.
  The Alby Extension just helps you to conveniently manage your private key and to interact with other users across the network instead of handing it over to web apps.
  Get now your access to open web =>`;
  const textLogIn = new UIDesign({
    tag: "div",
    id: "text-login",
    className: "text-login",
  });
  const createPi = (txt, i) =>
    new UIDesign({ tag: "p", id: "no-prov-p" + i }).setInnerText(
      txt
    );
  const pis = text.split("\n").map(createPi);
  textLogIn.addChild(pis[0]);
  textLogIn.addChild(pis[1]);
  textLogIn.addChild(pis[2]);

  closeIcon.element.addEventListener("click", closeChat);
  popUpMenuDesign.children.forEach((e) => e.element.remove());
  popUpMenuDesign.children = [];
  popUpMenuDesign.uiNode.children = [];
  popUpMenuDesign.addChild(closeIcon);
  popUpMenuDesign.addChild(logInWindow);
  logInWindow.addChild(textLogIn);

  const popUpMenuClassBig =
    "flex flex-column bg w_100% h_100% pos_a top_0 p_20 bkdf_blur-5 box_bb jc_c ai_c fs_200%";
  popUpMenuDesign.element.className = popUpMenuClassBig;
});
// testata
const testataDesign = new Testata({
  classes: {
    testata: "bg grid pos_f h_testata w_100vw p_10 box_bb",
    header: "bg_t flex",
    weblnBtn: "bg_l c_d",
    subHeader: "bg_t",
  },
}).tree;

const weblnButton = app.get("testata/sub-header/webln-btn");
app.on(events.gotProvider, () => {
  console.log("got provider");
  weblnButton.setInnerText("yeeeee");
});
weblnButton.element.addEventListener("click", app.requestProvider);
app.appendTo("layout", testataDesign.element);

//
const options = [
  ["", "#All-tags"],
  ["vestiti", "#vestiti"],
  ["musica", "#musica"],
  ["elettronica", "#elettronica"],
  ["mobili", "#mobili"],
  ["viaggiare", "#viaggiare"],
  ["soundsystem", "#soundsystem"],
];
// prodcontainer
const productContainer = new Content({
  prodotti,
  options,
  classes: {
    select: "bg mb_10 mt_10 ol_0 b_n p_4 brad_9 js_e",
    tagsDropdown: "grid z_1 pos_s top_0 r_0",
    option: "bg",
    productContainer:
      "bg grid p_10 pb_0 pos_f top_as_testata box_bb ofy_a mh_100% w_100% ch_1",
  },
}).tree;
const productScroll = app.get(
  "product-container/product-scroll"
).element;
app.appendTo("layout", productContainer.element);

new Footer({
  classes: {
    footerDesign: "footer h_footer bg  box_bb p_5-20",
    buttonContainer: "bg p_0-20 flex",
  },
}).tree;
const footerDesign = app.get("footer");
app.appendTo("layout", footerDesign.element);

new PopUpMenu({
  classes: {
    closeIcon: "pos_a top_10 r_10 cu_p",
    chatWindow:
      "bg w_300 h_400 flex flex-cr of_a b_1-s-rl p_0-5 box_bb",
    inputContainer: "mt_10 w_240 p_5-10 flex",
    popUpMenu: `dis_none`,
    input: "bg_gl c_l b_n w_240 p_5",
    button: "bg p_5-10",
  },
}).tree;
const popUpMenuDesign = app.get("pop-up-menu");
app.appendTo("body", popUpMenuDesign.element);

const closeIconPath = "pop-up-menu/close-icon";
const closeIcon = app.get(closeIconPath).element;
const chatWindowPath = "pop-up-menu/chat-window";
const chatWindow = app.get(chatWindowPath).element;
const inputDesignPath = "pop-up-menu/input-container";
const messageInput = app.get(inputDesignPath).element;
const groupChatDesignPath = "footer/button-container";
const groupChat = app.get(groupChatDesignPath).element;
const buttonsDesignPath = "pop-up-menu/input-container/chat-send";
const chatSend = app.get(buttonsDesignPath).element;
const selectDesignPath =
  "product-container/tags-dropdown/tags-select";
const tagsSelect = app.get(selectDesignPath).element;

const chatSection = popUpMenuDesign.element;
// MUSIC PLAYER
const audioPlayerPath = "footer/music-player/audio-player";
const audioPlayer = app.get(audioPlayerPath).element;
const trackTitleDesignPath = "footer/music-player/track-title";
const trackTitle = app.get(trackTitleDesignPath).element;
const trackArtistDesignPath = "footer/music-player/track-artist";
const trackArtist = app.get(trackArtistDesignPath).element;
const playPauseBtnDesignPath =
  "footer/music-player/play-pause-button";
const playPauseButton = app.get(playPauseBtnDesignPath).element;
const nextBtnDesignPath = "footer/music-player/next-button";
const nextButton = app.get(nextBtnDesignPath).element;
// styling

const minWidth768Handler = (_, data) => {
  const LARGE_CLASS = "flex flex-row flex-nowrap of_xa mh_40rem";
  const DEF_CLASS = "flex flex-column flex-wrap ac_c";
  if (data.matches) productScroll.className = LARGE_CLASS;
  else productScroll.className = DEF_CLASS;
  //
  // setTimeout(() => {
  //   const popUpMenuClassBig =
  //     "flex flex-column bg w_100% h_100% pos_a top_0 p_20 bkdf_blur-5 box_bb jc_c ai_c fs_200%";
  //   const popUpMenuClassSmall =
  //     "flex flex-column bg w_100% h_100% pos_a top_0 p_20 jc_c ai_c bottom_20 r_20 z_9999 bkdf_blur-5";
  //   const popUpMenuNone = `dis_none`;
  //   if (data.matches && window.nostr)
  //     popUpMenuDesign.element.className = popUpMenuClassBig;
  //   else popUpMenuDesign.element.className = popUpMenuClassBig;
  // }, 200);
};
app.on(events.minWidth768Change, minWidth768Handler);
minWidth768Handler(undefined, app.minWidth768Query);

closeIcon.addEventListener("click", closeChat);
groupChat.addEventListener("click", showChat);
chatSend.addEventListener("click", sendMessage);
tagsSelect.addEventListener("change", filterProducts);
playPauseButton.addEventListener("click", togglePlay);
nextButton.addEventListener("click", handleNextButtonClick);
