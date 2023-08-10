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

export const appendTheseTo = (node: HTMLElement) => (element: HTMLElement) =>
  node.appendChild(element);
export const setclassName = (name: string) => (e: HTMLElement) => {
  e.className = name;
  return e;
};
export const setInnerText = (text: string) => (e: HTMLElement) => {
  e.innerText = text;
  return e;
};
export const setAttribute =
  (attribute: keyof Omit<HTMLElement["style"], "length" | "parentRule">) =>
  (value: woo) =>
  (e: HTMLElement) => {
    e.style[attribute] = value;
    return e;
  };
export const debug =
  (color: woo) => (isDebug: boolean) => (el: HTMLElement) => {
    if (isDebug) setAttribute("backgroundColor")(color)(el);
  };

export const createElementWIthId =
  (type: keyof HTMLElementTagNameMap) => (id: string) => {
    const element = document.createElement(type);
    element.id = id;
    return element;
  };

export const createPWithText = (text: string) => {
  return setInnerText(text)(document.createElement("p"));
};
export const createDivWithClassName = (classname: string) => {
  return setclassName(classname)(document.createElement("div"));
};

interface UINode {
  value: HTMLElement;
  children: UINode[];
}

export const build = (node: UINode) => {
  let stack = [node];
  let res = [];
  while (stack.length) {
    const current = stack.pop();
    res.push(current);
    if (current) {
      const children = current.children;
      if (children)
        children.forEach((c) => {
          current.value.appendChild(c.value);
          stack.push(c);
        });
    }
  }
  return node.value;
};
