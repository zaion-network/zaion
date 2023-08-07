export class NameAnalyzer {
  name;
  constructor(name: string) {
    this.name = name.replace(".als", "");
  }
  #splitted: string[] | undefined;
  #test: undefined | string;
  analyze() {
    if (this.name.includes("__")) return 0;
    else if (this.name.startsWith("[")) return 2;
    else if (this.name.startsWith("W.A.W - ")) return 3;
    else {
      this.#splitted = this.name.split(" ");
      if (this.#splitted.map((e) => Number(e)).some((e) => isNaN(e))) {
        return 4;
      }
    }
  }
}
