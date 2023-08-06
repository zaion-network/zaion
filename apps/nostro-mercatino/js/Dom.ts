type woo = string &
  ((property: string) => string) &
  ((property: string) => string) &
  ((index: number) => string) &
  ((property: string) => string) &
  ((
    property: string,
    value: string | null,
    priority?: string | undefined
  ) => void);

export namespace Dom {
  export const generateId = () =>
    `9x${(
      BigInt(Math.round(Math.random() * 10 ** 16)) *
      BigInt(Math.round(Math.random() * 10 ** 16))
    )
      .toString(16)
      .slice(0, 16)}`;

  export enum css_attributes_codes {
    position = "pos",
    width = "w",
    height = "h",
    max_height = "mh",
    calculated_height = "ch",

    overflow = "of",
    padding = "p",
    padding_top = "pt",
    padding_right = "pr",
    padding_bottom = "pb",
    padding_left = "pl",

    margin = "m",
    margin_top = "mt",
    margin_right = "mr",
    margin_bottom = "mb",
    margin_left = "ml",

    border = "b",
    border_top = "bt",
    border_right = "br",
    border_bottom = "bb",
    border_left = "bl",

    border_radius = "brad",

    box_sizing = "box",

    align_items = "ai",
    align_self = "as",

    justify_content = "jc",
    justify_self = "js",

    object_fit = "of",

    font_weight = "fw",
    background = "back",
    outline = "ol",
  }
}

export namespace Mercatino {
  export enum tipiDiProdotto {
    mobili = "mobili",
    vestiti = "vestiti",
    musica = "musica",
    elettronica = "elettronica",
    viaggiare = "viaggiare",
    soundSystem = "sound-system",
    cerco = "cerco",
  }
}

export const setInnerText = (text: string) => (e: HTMLElement) => {
  e.innerText = text;
  return e;
};
export const setHtmlAttribute =
  (attribute: string) => (value: string) => (el: HTMLElement) => {
    el.setAttribute(attribute, value);
    return el;
  };
export const setStyleAttribute =
  (attribute: keyof Omit<HTMLElement["style"], "length" | "parentRule">) =>
  (value: woo) =>
  (e: HTMLElement) => {
    e.style[attribute] = value;
    return e;
  };
export const setClassName = (className: string) => (e: HTMLElement) => {
  e.className = className;
  return e;
};
export const debug =
  (color: woo) => (isDebug: boolean) => (el: HTMLElement) => {
    if (isDebug) setStyleAttribute("backgroundColor")(color)(el);
  };

export interface Node<T> {
  value: T;
  children?: Node<T>[];
}

export interface iUIDesign {
  tag: keyof HTMLElementTagNameMap;
  id: string;
  className: string;
}
export interface UIDesign extends Node<iUIDesign> {
  children?: UIDesign[];
  path: string;
}
/**
 * ```
 * const p1 = new UIDesign({ tag: "p", id: "my-p1", className: "flex rythm" });
 * const p2 = new UIDesign({ tag: "p", id: "my-p1", className: "flex rythm" });
 * const div2 = new UIDesign({ tag: "div", id: "my-div", className: "flex cont" });
 * const code = new UIDesign({ tag: "code", id: "", className: "asds" });
 *
 * const design = new UIDesign({
 *   tag: "div",
 *   className: "some",
 *   id: "myid",
 * });
 *
 * design.addChild(div2.addChild(p1).addChild(p2).addChild(code));
 * ```
 */
export class UIDesign implements UIDesign {
  #element;
  uiNode: UINode;
  constructor(prop: iUIDesign) {
    this.value = prop;
    this.#element = document.createElement(this.value.tag);
    this.#element.id = this.value.id ? this.value.id : Dom.generateId();
    this.#element.className = this.value.className;
    this.uiNode = new UINode(this.#element);
    this.path = this.#element.id;
    UIDesign.nodeslist.push(this);
  }

  addChild(value: UIDesign) {
    value.path = `${this.path}/${value.path}`;
    if (!this.children) this.children = [];
    this.children.push(value);
    return this;
  }
  setInnerText(text: string) {
    setInnerText(text)(this.element);
    return this;
  }
  setHtmlAttribute(attribute: string, value: string) {
    setHtmlAttribute(attribute)(value)(this.element);
    return this;
  }
  setClassName(className: string) {
    setClassName(className)(this.element);
  }
  get element() {
    const cb =
      <T extends UINode>(newNode: T) =>
      (node: UIDesign) => {
        const stack = [node];
        const rootnode = newNode;
        while (stack.length) {
          const current = stack.pop();
          if (current) {
            const children = current.children as UIDesign[];
            if (children) {
              children.forEach((c) => {
                current.uiNode.addChild(c.uiNode);
                stack.push(c as UIDesign);
              });
            }
          }
        }
        return rootnode;
      };
    return build(cb(this.uiNode)(this));
  }
  getChildrenElements(): HTMLElement[] | undefined {
    if (this.uiNode.children) {
      const children = this.uiNode.children.map((e) => e.value);
      if (children.length === 1) this.uiNode.children.map((e) => e.value)[0];
      else return this.uiNode.children.map((e) => e.value);
    } else return undefined;
  }
}

export namespace UIDesign {
  export const nodeslist: UIDesign[] = [];
}

export interface UINode extends Node<HTMLElement> {
  value: HTMLElement;
  children?: UINode[];
}
/**
 * 
 * ```
 * const testdiv = document.createElement("div");
 * const testsubdiv1 = document.createElement("div");
 * const testsubdiv2 = document.createElement("div");
 * const testsubdiv3 = document.createElement("div");
 * const node1 = new UINode(testdiv);
 * const node2 = new UINode(testsubdiv1);
 * const node3 = new UINode(testsubdiv2);
 * const node4 = new UINode(testsubdiv3);
 * node1
 *  .addChild(node2)
 *  .addChild(
 *     node3.addChild(node4)
 *   );
 * ```
globalThis.node = build(node1);
 */
export class UINode implements UINode {
  constructor(public value: HTMLElement) {
    this.children = undefined;
  }
  addChild(value: UINode) {
    if (!this.children) this.children = [];
    this.children.push(value);
    return this;
  }
}

export const dfs =
  <T extends Node<any>>(cb: (children: T[], current: T, stack: T[]) => void) =>
  (node: T): HTMLElement => {
    let stack = [node];
    let res = [];
    while (stack.length) {
      const current = stack.pop();
      res.push(current);
      if (current) {
        const children = current.children;
        if (children) cb(children as T[], current, stack);
      }
    }
    return node.value;
  };

interface build {
  (node: UINode): HTMLElement;
}
/**
 *
 *
 * @param node Accetta il nodo root della sezione da creare
 * @returns {HTMLElement}
 *
 * @example
 * ```
 * const mydiv = createElementWIthId("div")("my-div");
 * const mysubdiv = createElementWIthId("div")("my-sub-div");
 * const myP1 = createElementWIthId("p")("my-p1");
 * const myP2 = createElementWIthId("p")("my-p2");
 *
 * const divpadre = {
 *   value: mydiv,
 *   children: [
 *     {
 *       value: mysubdiv,
 *       children: [{ value: myP1 }, { value: myP2 }],
 *     },
 *   ],
 * };
 * build(divpadre)
 * ```
 */
export const build: build = dfs<UINode>((children, current, stack) => {
  children.forEach((c) => {
    current.value.appendChild(c.value);
    stack.push(c);
  });
});
