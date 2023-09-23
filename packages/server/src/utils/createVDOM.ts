import jsdom from "jsdom";

const { JSDOM } = jsdom;

export const creaVDOM = () => {
  // Crea un oggetto JSDOM
  const dom = new JSDOM();

  // Ottieni la window del DOM virtuale
  const window = dom.window;

  // Ottieni il documento del DOM virtuale
  const document = window.document;
  return { dom, window, document };
};
