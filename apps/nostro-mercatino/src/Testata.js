import { UIDesign } from "@zaionstate/ui";

export class Testata {
  value;
  constructor(prop) {
    this.value = prop;
  }
  get tree() {
    return Testata.createTestata(this.value);
  }
  get element() {
    return Testata.createTestata(this.value).element;
  }
  static createTestata = ({ classes }) => {
    const header = new UIDesign({
      tag: "header",
      id: "header",
      className: classes.header,
    });
    const weblnBtn = new UIDesign({
      tag: "button",
      id: "webln-btn",
      className: classes.weblnBtn,
    }).setInnerText("WebLN");
    const subheader = new UIDesign({
      tag: "div",
      id: "sub-header",
      className: classes.subHeader,
    });
    const testata = new UIDesign({
      tag: "div",
      id: "testata",
      className: classes.testata,
    });

    testata.addChild(header).addChild(subheader);
    subheader.addChild(weblnBtn);
    return testata;
  };
}
