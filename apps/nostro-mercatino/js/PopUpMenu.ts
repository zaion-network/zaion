import { UIDesign, Node } from "./Dom.js";

export interface iPopUpMenu {}
export class PopUpMenu implements Node<iPopUpMenu> {
  constructor(public value: iPopUpMenu) {}

  get tree() {
    return PopUpMenu.createpopupmenu();
  }
  get element() {
    return PopUpMenu.createpopupmenu().element;
  }
}
export namespace PopUpMenu {
  export const createpopupmenu = () => {
    const closeIcon = new UIDesign({
      tag: "div",
      id: "close-icon",
      className: "pos_a top_10 r_10 cu_p",
    }).setInnerText("✖︎");
    const chatWindow = new UIDesign({
      tag: "div",
      id: "chat-window",
      className:
        "bg w_300 h_400 flex flex-cr of_a b_1-s-rl p_0-5 box_bb",
    });
    const input = new UIDesign({
      tag: "input",
      id: "message-input",
      className: "bg_gl c_l b_n w_240 p_5",
    })
      .setHtmlAttribute("type", "text")
      .setHtmlAttribute("placeholder", "Scrivi un messaggio...");
    const button = new UIDesign({
      tag: "button",
      id: "chat-send",
      className: "bg p_5-10",
    }).setInnerText("Invia");
    const inputContainer = new UIDesign({
      tag: "div",
      className: "mt_10 w_240 p_5-10 flex",
      id: "input-container",
    });
    const popUpMenuClassBig =
      "dis_none pos_a bottom_0 w_100% h_100% bkdf_blur-5 box_bb jc_c ai_c";
    const popUpMenuClassSmall =
      "flex flex-column bg w_320 h_420 pos_f p_20 jc_c ai_c bottom_20 r_20 z_9999 bkdf_blur-5";
    const popUpMenuNone = `dis_none`;
    const popUpMenu = new UIDesign({
      tag: "div",
      id: "pop-up-menu",
      className: popUpMenuNone,
    })
      .addChild(closeIcon)
      .addChild(chatWindow)
      .addChild(inputContainer);
    inputContainer.addChild(input).addChild(button);
    return popUpMenu;
  };
}
