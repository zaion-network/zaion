import { UIDesign, Node } from "./Dom.js";

export interface iTestata {}

export class Testata implements Node<iTestata> {
  value: iTestata;
  constructor(prop: iTestata) {
    this.value = prop;
  }
  get tree() {
    return Testata.createTestata(this.value);
  }
  get element() {
    return Testata.createTestata(this.value).element;
  }
}

export namespace Testata {
  export const createTestata = (prop?: iTestata) => {
    const header = new UIDesign({
      tag: "header",
      id: "header",
      className: "bg_t flex",
    });
    const weblnBtn = new UIDesign({
      tag: "button",
      id: "webln-btn",
      className: "bg_l c_d",
    }).setInnerText("WebLN");
    const subheader = new UIDesign({
      tag: "div",
      id: "sub-header",
      className: "bg_t",
    });
    const testata = new UIDesign({
      tag: "div",
      id: "testata",
      className: "bg grid pos_f h_testata w_100vw p_10 box_bb",
    });

    testata.addChild(header).addChild(subheader);
    subheader.addChild(weblnBtn);
    return testata;
  };
}
