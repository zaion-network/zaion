import { UIDesign } from "@zaionstate/ui";

export class Content {
  constructor(value) {
    this.value = value;
  }
  get tree() {
    return Content.createContent(
      this.value.prodotti,
      this.value.options,
      this.value.classes
    );
  }
  get element() {
    return Content.createContent(
      this.value.prodotti,
      this.value.options,
      this.value.classes
    ).element;
  }
  static createContent = (prodotti, options, classes) => {
    const makeOption = (value, text) => {
      const option = new UIDesign({
        tag: "option",
        id: "select-option",
        className: classes.option,
      })
        .setInnerText(text)
        .setHtmlAttribute("value", value);
      return option;
    };
    const makeOptions = (ops) => {
      return ops.map((op) => makeOption(...op));
    };
    const optionsElements = makeOptions(options);
    const select = new UIDesign({
      tag: "select",
      id: "tags-select",
      className: classes.select,
    });
    const tagsDropdown = new UIDesign({
      tag: "div",
      id: "tags-dropdown",
      className: classes.tagsDropdown,
    });
    const prdScroll = new UIDesign({
      tag: "div",
      id: "product-scroll",
      className: "",
    });
    for (let k in prodotti) {
      prdScroll.addChild(prodotti[k].tree);
    }
    const productContainer = new UIDesign({
      tag: "div",
      id: "product-container",
      className: classes.productContainer,
    })
      .addChild(tagsDropdown)
      .addChild(prdScroll);
    tagsDropdown.addChild(select);
    optionsElements.forEach(select.addChild.bind(select));
    return productContainer;
  };
}
