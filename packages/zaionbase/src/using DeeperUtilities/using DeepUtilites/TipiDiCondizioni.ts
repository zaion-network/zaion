import { DeepUtilities } from "../DeepUtilities";

export namespace TipiDiCondizioni {
  const donothing = () => {
    return;
  };

  const throwError = () => {
    throw new Error("");
  };

  const defaultFoo = () => {
    console.log("default");
  };

  const logAndReturn = (mess: string) => {
    return () => {
      console.log(mess);
      return;
    };
  };

  interface map {
    [k: string]: {
      equivalent: null | string;
      action: () => any;
      inMap: () => any;
      children?: map;
    };
  }
  export const map = {
    boolean: {
      equivalent: null,
      action: function () {
        const trueoffalse = true;
        if (trueoffalse) console.log("was true");
        else console.log("was false");
      },
      inMap: function () {
        const trueoffalse = true;
        const map = new Map();
        map.set(true, () => console.log("was true"));
        map.set(false, () => console.log("was false"));
        map.get(trueoffalse);
      },
      children: {
        booleanIfTrue: {
          equivalent: "boolean",
          action: function () {
            // equivalente a onlyIfTrue
            const trueoffalse = true;
            if (trueoffalse) {
              // fai qualcosa
              console.log("got true");
            } else {
              // non fare nulla
            }
          },
          inMap: function () {
            const trueoffalse = true;
            const map = new Map();
            map.set(true, () => console.log("was true"));
            map.set(false, donothing);
            map.get(trueoffalse);
          },
          children: {
            onlyIfTrue: {
              equivalent: "boolean",
              action: function () {
                const condition = true;
                if (condition) {
                  // do something
                  console.log("got true");
                }
                // else continue
              },
              inMap: function () {
                const trueoffalse = true;
                const map = new Map();
                map.set(true, () => console.log("was true"));
                map.set(false, donothing);
                map.get(trueoffalse);
              },
            },
          },
        },
        booleanIfFalse: {
          equivalent: "onlyIfFalse",
          action: function () {
            const trueoffalse = false;
            if (!trueoffalse) {
              console.log("got false");
            } else {
              // non fare nulla
            }
          },
          inMap: function () {
            const trueoffalse = true;
            const map = new Map();
            map.set(true, donothing);
            map.set(false, () => console.log("was false"));
            map.get(trueoffalse);
          },
          children: {
            onlyIfFalse: {
              equivalent: "boolean",
              action: function () {
                const condition = false;
                if (!condition) {
                  // do something
                  console.log("got false");
                }
                // else continue
              },
              inMap: function () {
                const trueoffalse = true;
                const map = new Map();
                map.set(true, donothing);
                map.set(false, () => console.log("was false"));
                map.get(trueoffalse);
              },
            },
            safeGuardThrow: {
              equivalent: "onlyIfFalse con errore",
              action: function () {
                const condition = true;
                if (!condition) throw new Error("");
              },
              inMap: function () {
                const trueoffalse = true;
                const map = new Map();
                map.set(true, throwError);
                map.set(false, () => console.log("was false"));
                map.get(trueoffalse);
              },
            },
          },
        },
      },
    },

    elseIf: {
      equivalent: "",
      action: function () {
        const condition1 = false;
        const condition2 = false;
        const condition3 = true;
        if (condition1) {
          return console.log("condition1");
        } else if (condition2) {
          return console.log("condition2");
        } else if (condition3) {
          return console.log("condition3");
        } else {
          return console.log("default");
        }
      },
      inMap: function () {
        const condition1 = false;
        const condition2 = false;
        const condition3 = false;
        let arr: DeepUtilities.Conditioner.condition[] = [
          [condition1, logAndReturn("condition1"), []],
          [condition2, logAndReturn("condition2"), []],
          [condition3, logAndReturn("condition3"), []],
        ];
        let oo = DeepUtilities.Conditioner.reduceConditions(arr, [
          defaultFoo,
          [],
        ]);
        // oo[2]?.get(condition1)();
      },
      children: {
        elseIfConditionToElseIf: {
          equivalent: "elseIf",
          action: function () {
            // equivalente a elseIf
            let string = "ciao";
            const condition1 = string === "ciao";
            const condition2 = string === "cacca";
            if (condition1) {
              return console.log("got ciao");
            } else if (condition2) {
              return console.log("got cacca");
            } else {
              return console.log("default");
            }
          },
          inMap: function () {
            let string = "caccas";

            const condition1 = string === "ciao";
            const condition2 = string === "cacca";

            let arr: DeepUtilities.Conditioner.condition[] = [
              [condition1, logAndReturn("got ciao"), []],
              [condition2, logAndReturn("got cacca"), []],
            ];
            let oo = DeepUtilities.Conditioner.reduceConditions(arr, [
              defaultFoo,
              [],
            ]);
          },
          fromConditioner: (string: string) => {
            const condition1 = string === "ciao";
            const condition2 = string === "miao";
            return new DeepUtilities.Conditioner().elseIf(
              string,
              [
                [condition1, () => console.log("ciao"), []],
                [condition2, () => console.log("miao"), []],
              ],
              [defaultFoo, []]
            );
          },
          children: {
            elseIfCondition: {
              equivalent: "",
              action: function () {
                // equivalente a elseIf
                let string = "ciao";
                if (string === "ciao") {
                  console.log("got ciao");
                } else if (string === "cacca") {
                  console.log("got cacca");
                } else {
                  console.log("default");
                }
              },
              inMap: function () {},
            },
          },
        },
      },
    },

    parallelIf: {
      equivalent: "",
      action: function () {
        // equivalente a piu boolean
        let string = "ciao";
        const condition1 = string === "ciao";
        string = "cacca";
        const condition2 = string === "cacca";
        if (condition1) {
          console.log("got ciao");
        }
        if (condition2) {
          console.log("got cacca");
        }
      },
      inMap: function () {
        const condition1 = false;
        const condition2 = false;
        const condition3 = true;

        const condition1map = new Map();
        condition1map.set(true, () => console.log("condition1"));
        condition1map.set(false, donothing);
        condition1map.get(condition1)();

        const condition2map = new Map();
        condition2map.set(true, () => console.log("condition2"));
        condition2map.set(false, donothing);
        condition2map.get(condition2)();

        const condition3map = new Map();
        condition3map.set(true, () => console.log("condition3"));
        condition3map.set(false, defaultFoo);
        condition3map.get(condition3)();
      },
    },
  };
}
