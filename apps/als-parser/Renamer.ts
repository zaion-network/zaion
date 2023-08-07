import { NameAnalyzer } from "./NameAnalyzer";

export class Renamer {
  #filename;
  #sourcefolder;
  #style;
  #substyle;
  #genre;
  #bpm;
  #key;
  #title: string | string[];
  #additionalProps;
  NameAnalyzer = NameAnalyzer;
  constructor(
    filename: string,
    style: string,
    substyle: string,
    genre: string,
    bpm = 120,
    key = "1m",
    title = "new_song",
    additionalProps = [],
    sourcefolder = "."
  ) {
    this.#filename = [filename];
    this.#sourcefolder = sourcefolder;
    this.#style = style;
    this.#substyle = substyle;
    this.#genre = genre;
    this.#bpm = bpm;
    this.#key = key;
    this.#title = title;
    this.#additionalProps = additionalProps;
  }
  #order1 = () => [
    this.#bpm,
    this.#style,
    this.#substyle,
    this.#genre,
    this.#additionalProps,
    `key[${this.#key}]`,
    `title[${this.#title}]`,
  ];
  #order2 = () => [
    this.#bpm,
    this.#style,
    this.#substyle,
    this.#genre,
    this.#additionalProps,
    `key[${this.#key}]`,
    `id[${this.#title}]`,
  ];
  rename(type: number) {
    const strategies: ((() => any[]) | (() => void))[] = [
      this.type0,
      () => {
        this.type1;
        console.log("to be implemented");
      },
      this.type2,
      this.type3,
      this.type4,
      () => {
        this.type5;
        console.log("to be implemented");
      },
    ];
    // @ts-expect-error
    const [sourcepath, targetpath] = strategies[type]()[0];
    console.log(`renamed ${sourcepath} to ${targetpath}`);
    return [sourcepath, targetpath];
  }
  type0 = () => {
    return this.#filename.map((e) => {
      if (e.startsWith("W")) {
        return null;
      }
      const filepath = `${this.#sourcefolder}/${e}`;
      const split = e.split("_");
      if (split.length !== 2) return null;
      let [key, title] = split;
      this.#key = key;
      if (title.includes("W.A.W - ")) {
        title = title.replace("W.A.W - ", "");
      }
      const cleantitle = title
        .split(".")
        .filter((e) => e !== "als")
        .map((e) => e.toLocaleLowerCase().replace(" ", "_"));
      this.#title = cleantitle;
      const editedname = `${this.#order1().flat().join(".")}`;
      const targetpath = `${this.#sourcefolder}/${editedname}.als`;
      return [filepath, targetpath];
    });
  };
  type1() {
    // return this.res.map((e) => {
    //   const sourcepath = `./${e}`;
    //   const renamed = `${this.#style}.${this.#substyle}.${e}`;
    //   const targetpath = `./${renamed}`;
    //   renameSync(sourcepath, targetpath);
    //   return [sourcepath, targetpath];
    // });
  }
  type2 = () => {
    return this.#filename
      .filter((e) => e.split(".")[0].includes("["))
      .map((e) => {
        const split = e.split(".");
        const value = split.map((e) => {
          e = e.replace("[", "");
          e = e.replace("]", "");
          return e;
        });
        let [tempo, genre, key, title, extension] = value;
        if (tempo.includes("bpm")) tempo = tempo.replace("bpm", "");
        this.#bpm = typeof tempo === "string" ? Number(tempo) : tempo;
        this.#genre = genre.toLocaleLowerCase();
        this.#key = key;
        this.#title = title;
        const edited = `${this.#order1().flat().join(".")}`;
        const sourcepath = `${this.#sourcefolder}/${e}`;
        const targetpath = `${this.#sourcefolder}/${edited}.als`;

        // rename
        // renameSync(sourcepath, targetpath);
        return [sourcepath, targetpath];
      });
  };
  type3 = () => {
    return this.#filename.map((e) => {
      if (e.startsWith("W")) {
        let fixed = e
          .replace("W.A.W - ", "")
          .replace(" ", "_")
          .replace(".als", "")
          .toLocaleLowerCase();
        this.#title = fixed;
        const edited = `${this.#order1().flat().join(".")}`;
        const sourcepath = `${this.#sourcefolder}/${e}`;
        const targetpath = `${this.#sourcefolder}/${edited}.als`;

        // rename
        // renameSync(sourcepath, targetpath);
        return [sourcepath, targetpath];
      } else {
        return null;
      }
    });
  };
  #checkObjCat(cat: string) {
    let splitter;
    let genre;
    if (cat.includes("DUTTY RIDDIM")) {
      splitter = "DUTTY RIDDIM ";
      genre = "dutty";
    } else {
      splitter = `${cat.split(" ")[0]} `;
      genre = cat.split(" ")[0].toLocaleLowerCase();
    }
    let id = cat.replace(splitter, "");
    let genres: { [k: string]: any } = {
      trap: "☔️",
      dutty: "dutty",
    };
    return [
      genres[genre] ? genres[genre] : cat.split(" ")[0].toLocaleLowerCase(),
      id,
    ];
  }
  type4 = () => {
    return this.#filename
      .map((e): [string, boolean] => {
        return [e, e.split(" ").length >= 2];
      })
      .filter((e) => e[1])
      .map((e): [string, { cat: string; title?: string }] => {
        let name: string = e[0];
        let withoutextension = name.replace(".als", "");
        let splitted = withoutextension.split(" - ");
        // filenames which has a name pattern will have an
        // array length gt 2
        return [
          e[0],
          splitted[1]
            ? { cat: splitted[0], title: splitted[1] }
            : { cat: splitted[0] },
        ];
      })
      .map((e) => {
        let obj = e[1];
        const [genre, id] = this.#checkObjCat(obj.cat);
        this.#genre = genre;
        const source = `${this.#sourcefolder}/${e[0]}`;
        let target;
        if ("title" in obj) {
          this.#title = obj.title!;
          target = `${this.#order1().flat().join(".")}`;
          return [source, target];
        } else {
          this.#title = id;
          target = `${this.#order2().flat().join(".")}`;
          return [source, target];
        }
      })
      .map((e) => {
        const sourcepath = e[0];
        const targetpath = e[1];
        // renameSync(sourcepath, targetpath);
        return [sourcepath, targetpath];
      });
    // .map((e) => {
    //   if (e.length > 2) {
    //     return null;
    //   } else return true;
    // });
  };
  type5() {
    // return this.res
    //   .filter((e) => !e.includes(".als"))
    //   .filter((e) => e.startsWith("h"))
    //   .map((e) => {
    //     let renamed = `${e}.als`;
    //     const sourcepath = `${this.#sourcefolder}/${e}`;
    //     const targetpath = `${this.#sourcefolder}/${renamed}`;
    //     renameSync(sourcepath, targetpath);
    //     return [sourcepath, targetpath];
    //   });
  }
}
