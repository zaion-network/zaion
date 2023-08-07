import { XMLBuilder, XmlBuilderOptions } from "fast-xml-parser";

export class AlsBuilder {
  #parsedxml;
  #valuemap = new Map();
  #valueset = new Set();
  #builder = () => new XMLBuilder(this.#buildOptions());
  constructor(parsedxml: { [key: string]: any }) {
    this.#parsedxml = parsedxml;
  }
  buildXml() {
    return this.#builder().build(this.#parsedxml).replaceAll("/>", " />");
  }
  #buildOptions = (
    parsedxml = this.#parsedxml
  ): Partial<XmlBuilderOptions> & {
    tagValueProcessor: (tag: string, value: unknown) => string;
    alwaysCreateTextNode: boolean;
  } => ({
    attributeNamePrefix: "@",
    format: true,
    ignoreAttributes: false,
    alwaysCreateTextNode: true,
    preserveOrder: true,
    indentBy: "\t",
    suppressEmptyNode: true,
    tagValueProcessor: (tag, value: unknown): string => {
      if (typeof value === "string") {
        let editedvalue = value.replaceAll("\n", "").replaceAll("\t", "");
        const TEXT = "#text";
        const DATA = "Data";
        const BUFFER = "Buffer";
        const PROCESSORSTATE = "ProcessorState";
        let paths, array;
        if (
          tag === TEXT ||
          tag === DATA ||
          tag === BUFFER ||
          tag === PROCESSORSTATE
        ) {
          if (value !== "") {
            paths = this.#findDepth(parsedxml, editedvalue);
            // controllo che il valore non sia nel set, se non lo
            // è lo inserisco
            if (!this.#valueset.has(editedvalue)) {
              this.#valueset.add(editedvalue);
              // se non cè il valore nel set vuole dire che devo
              // aggiungere nel map, per ogni valore creo una
              // key "#text" (necessaria solo se le opzioni di
              // parsing includono la creazione di un nodo per
              // il testo) e una "Data". Apparentemente uno
              // stesso valore di data puo apparire in più
              // oggetti all'interno dell'albero als, questo
              // metodo utilizza una strategia empirica per
              // dedurre quale dei path che contengono una key
              // con il valore uguale a vlue.
              this.#valuemap.set(editedvalue, {
                ["#text"]: [],
                ["Data"]: [],
                ["Buffer"]: [],
                [PROCESSORSTATE]: [],
              });
            }
            array = this.#valuemap.get(editedvalue)[tag];
            array.push(tag);
            // console.log(tag, editedvalue.slice(0, 20), paths[array.length - 1]);
            return this.#dataFormatter(
              value,
              paths ? paths[array.length - 1] - 1 : 0
            );
          }
        }
        if (tag === "SceneNames") {
          console.log(value);
          return value;
        }
        return value;
      }
      return value as string;
    },
  });
  #dataFormatter = (data: string, indents: number = 2) => {
    const indent = "\t";
    let pad = "";
    let tagpad = "";
    while (indents) {
      pad = pad + indent;
      if (indents !== 1) tagpad = tagpad + indent;
      indents--;
    }
    return `\n${pad}${data
      .replaceAll("\t", "")
      .replaceAll("\n", `\n${pad}`)}\n${tagpad}`;
  };
  #findDepth = (
    obj: { [key: string]: any },
    value: string,
    path = "",
    results: number[] = []
  ) => {
    for (let prop in obj) {
      let objvalue = obj[prop];
      if (prop === "#text") {
        objvalue = obj[prop].replaceAll("\n", "").replaceAll("\t", "");
      }
      if (objvalue === value) {
        // with array true means that the path level will be
        // calculated by keeping in the path the array
        // value.
        let witharray = false;
        let finalpath = `${path}.${prop}`;
        let level = finalpath.slice(1, finalpath.length).split(".").length;
        if (!witharray) {
          level = finalpath
            .slice(1, finalpath.length)
            .split(".")
            .filter((e) => {
              if (isNaN(Number(e))) return true;
              else return false;
            }).length;
        }
        results.push(level);
      } else if (typeof obj[prop] === "object") {
        this.#findDepth(obj[prop], value, `${path}.${prop}`, results);
      }
    }
    return results.length > 0 ? results : null;
  };
}
