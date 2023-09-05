import { UIDesign } from "@zaionstate/ui";

export class PopUpLogIn {
  constructor(value) {}

  get tree() {
    return PopUpLogIn.createpopupLogIn();
  }
  get element() {
    return PopUpLogIn.createpopupLogIn().element;
  }
  createpopupLogIn = () => {
    const closeIcon = new UIDesign({
      tag: "div",
      id: "close-icon",
      className: "close-icon",
    }).setInnerText("✖︎");
    const logInWindow = new UIDesign({
      tag: "div",
      id: "chat-window",
      className: "chat-window bg",
    });
    const popUpLogIn = new UIDesign({
      tag: "div",
      id: "pop-up-menu",
      className: "pop-up-menu bg",
    });
    const textLogIn = new UIDesign({
      tag: "div",
      id: "text-login",
      className: "text-login",
    }).setInnerText(
      "Our chat is created on an open protocol, named “Nostr”, a new kind of censorship-resistant social networksUsers can identify themselves  on every Nostr apps with their private and public key. Every The Alby Extension  just helps you to conveniently manage your private key and to interact with other users acrossthe network instead of handing it over to web apps. Get now your access to open web =>"
    );
    textLogIn.addChild(closeIcon).addChild(logInWindow);
    logInWindow.addChild(textLogIn);
    return popUpLogIn;
  };
}
