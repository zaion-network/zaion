import { HighUtilities } from "../../HighUtilities";

declare module "./ArrayUtils" {
  namespace ArrayUtils {
    type contentToEdit = string[];
    type content = string[];
    type coordinates = [number, number];
    type details = [content, contentToEdit, coordinates];
    type completeDetails = [...details, number, string];

    interface isArray {
      <T>(el: T | T[]): T[];
    }

    interface filterArray {
      (arr: string[], filterCb: (files: string) => boolean): string[];
    }

    interface splitter {
      (e: string): string[];
    }

    interface detailer {
      (content: content): details;
    }

    interface grabber {
      (
        getStart: (string: contentToEdit) => number,
        getEnd: (string: contentToEdit, start: number) => number
      ): detailer;
    }

    interface substituter {
      (
        olderContent: string[],
        editedContent: string[],
        coordinates: coordinates
      ): string[];
    }

    interface detailsEditor {
      (details: completeDetails): completeDetails;
    }

    type splicer = (
      content: string[]
    ) => (i: number, e: number, arr: string[]) => string[];

    namespace MapCallbacks {
      type conditionIndexTuple = [boolean, number];

      interface mapCallback<E, R = E> {
        (e: E, i: number, arr: E[]): R;
      }

      interface replacer {
        (target: string, source: string): mapCallback<string>;
      }

      interface makeConditionIndexTuple {
        (char: string): mapCallback<string, conditionIndexTuple>;
      }
    }

    namespace FilterCallbacks {
      interface filterCallback<T> {
        (elements: T): boolean;
      }

      interface filterCallbackMaker<V, T = V> {
        (value: V): filterCallback<T>;
      }

      interface startsWithString extends filterCallbackMaker<string> {}

      interface includesString extends filterCallbackMaker<string> {}

      interface exclude extends filterCallbackMaker<string[], string> {}

      interface filterConditionIndexTuple
        extends filterCallback<MapCallbacks.conditionIndexTuple> {}

      interface partToEdit {
        (c: string[]): number;
      }

      interface partToEditMkr {
        (
          filterConditionIndexTuple?: filterConditionIndexTuple,
          makeConditionIndexTuple?: MapCallbacks.makeConditionIndexTuple
        ): (checker: string) => partToEdit;
      }

      interface completeDetailsMaker {
        (tuple: details): completeDetails;
      }

      interface finderMaker {
        (filterCb: startsWithString, filterCbArg: string): completeDetailsMaker;
      }

      interface typeDefiner {
        (declarations: string[][], details: completeDetails): string;
      }

      interface definer {
        (line: string): string;
      }

      interface definerMaker {
        (
          toBeIncludedInLine: string,
          includerArg: string,
          replaceArgs: [string, string],
          includer?: includesString
        ): definer;
      }

      interface declarationAdderMaker {
        (
          declarations: string[][],
          customTagMaker: HighUtilities.JavaScript.String_utils.customTagMaker,
          defineNipTitleType?: typeDefiner
        ): (details: completeDetails) => completeDetails;
      }

      interface stringToAdd {
        (
          namespace: string,
          declarations: string[][],
          details: completeDetails,
          defineType: typeDefiner,
          customTagMaker: HighUtilities.JavaScript.String_utils.customTagMaker
        ): string;
      }

      interface detailsEditor {
        (details: completeDetails): completeDetails;
      }

      interface detailsEditorMaker {
        (
          defineNipName: definer,
          declarations: string[][],
          customTagMaker: HighUtilities.JavaScript.String_utils.customTagMaker,
          stringToAdd?: stringToAdd,
          typeDefiner?: typeDefiner
        ): detailsEditor;
      }
    }
  }
}

export class ArrayUtils {}
export namespace ArrayUtils {
  export class ExtendedArray extends Array {}

  export type AddToTuple<T extends any[], U> = [...T, U];
  export class TupleArray<T extends any[]> extends Array<T[number]> {
    public push(...items: T[number][]): number {
      return super.push(...items);
    }

    public add<U>(value: U): TupleArray<AddToTuple<T, U>> {
      const newArray = [...this, value];
      return new TupleArray<AddToTuple<T, U>>(...newArray) as TupleArray<
        AddToTuple<T, U>
      >;
    }
  }

  const conditioner = new HighUtilities.Conditioner();

  const boolean = conditioner.boolean;

  const makeValidation = HighUtilities.Conditioner.makeValidations;

  export const ensureArray: isArray = <T>(el: T | T[]) => {
    const ifFalse = () => ((el as T[]) = [el as T]);
    const ifTrue = () => el;
    return boolean([
      Array.isArray(el),
      makeValidation([ifTrue, []], [ifFalse, []]),
    ]);
  };

  export const filterArray: filterArray = (arr, filterCb) =>
    arr.filter(filterCb);

  export const grabPartToEdit: grabber = (getStart, getEnd) => content =>
    [
      content,
      [...content].splice(
        getStart(content),
        getEnd(content, getStart(content))
      ),
      [getStart(content), getEnd(content, getStart(content))],
    ];

  export const substituteEditedPart: substituter = (
    olderContent,
    editedContent,
    coordinates
  ) => {
    olderContent.splice(coordinates[0], coordinates[1], ...editedContent);
    return olderContent;
  };

  export const splicer: splicer =
    (content: string[]) => (i: number, e: number, arr: string[]) => {
      content.splice(i, e, ...arr);
      return content;
    };

  export interface IchangePosition_v1 {
    <T>(array: T[], old: number, new_pos: number): T[] | string;
  }

  /**
   *
   * @param {*[]} array Array da ricomporre
   * @param {number} old Indice di orgine dell'elemento da
   * spostare.
   * @param {number} new_pos Indice della posizione target
   * dell'elemento.
   * @returns Un array ricomposto nel quale l'elemento
   * situato precedentement all'indice di origine è situato,
   * nel risultato di ritorno, all'indice target.
   */
  export const changePosition_v1: IchangePosition_v1 = function changePosition<
    T
  >(array: T[], old: number, new_pos: number): T[] | string {
    // i numeri devono essere inclusi nella lunghezza
    // massima
    if (
      new_pos > array.length - 1 ||
      old > array.length ||
      new_pos < 0 ||
      old < 0
    ) {
      return "not";
    }
    array.splice(new_pos, 0, array.splice(old, 1)[0]);
    return array;
  };

  export interface IcheckArrayElementsConstructor_v1 {
    <T extends object>(array: T[], constructor: Function): boolean;
  }

  /**
   * Questa funzione controlla che tutti gli elementi di un
   * array siano della classe inviata come secondo
   * argomento.
   * @param {array} array array del quale bisogna
   * controllare gli elementi
   * @param {class} constructor la classe contro la quale
   * bisogna effettuare il check
   * @return True se tutti gli elementi matchano con il
   * costruttore fornito. False se un solo elemento non
   * matcha la classe fornita.
   */
  export const checkArrayElementsConstructor_v1: IcheckArrayElementsConstructor_v1 =
    function checkArrayElementsConstructor<T extends object>(
      array: T[],
      constructor: Function
    ): boolean {
      let risultatoControllo: boolean[] = [];
      const controllaIlConstructor = function (elemento: T) {
        let condizione = elemento.constructor === constructor;
        risultatoControllo.push(condizione);
        return risultatoControllo.some(el => el === false);
      };
      const controlloFinale = function (element: boolean) {
        return element === false;
      };
      array.forEach(controllaIlConstructor);
      return !risultatoControllo.some(controlloFinale);
    };

  export interface IcheckArraysContent_v1 {
    <T>(array: T[], nextArray: T[]): boolean;
  }

  /**
   * Il contenuto degli array deve essere identico anche nell'ordine
   * @param {*} array
   * @param {*} nextArray
   * @returns
   */
  export const checkArraysContent_v1: IcheckArraysContent_v1 =
    function checkArraysContent<T>(array: T[], nextArray: T[]): boolean {
      if (array.length !== nextArray.length) {
        return false;
      }
      let results: boolean[] = [];
      for (let index = 0; index < array.length; index++) {
        const element: T = array[index];
        const elementOfNextArray: T = nextArray[index];
        if (element === elementOfNextArray) {
          results.push(true);
        } else {
          results.push(false);
        }
      }
      if (!results.includes(false)) {
        return true;
      } else {
        return false;
      }
    };

  export interface IcheckObjectConstructor_v1 {
    (object: object, constructor: Function): boolean;
  }

  /**
   * // TODO #24 controllare se tutte le funzioni in questa
   * cartella hanno una descrizione @giacomogagliano @ariannatnl
   * @param object
   * @param constructor
   * @returns
   */
  export const checkObjectConstructor_v1: IcheckObjectConstructor_v1 =
    function checkObjectConstructor(
      object: object,
      constructor: Function
    ): boolean {
      const oggettoUgualeConstructor = object.constructor === constructor;
      return oggettoUgualeConstructor;
    };

  export interface IextractSameElementsFromArray_v1 {
    <T extends string | number | boolean>(array1: T[], array2: T[]): T[];
  }

  /**
   *
   * @param array1
   * @param array2
   * @returns
   */
  export const extractSameElementsFromArray_v1: IextractSameElementsFromArray_v1 =
    function extractSameElementsFromArray<
      T extends string | boolean | number | object
    >(array1: T[], array2: T[]): T[] {
      let sameValues: T[] = [];
      if (
        // controllo se gli array sono vuoti
        !isArrayEmpty(array1) &&
        !isArrayEmpty(array2)
      ) {
        // controllo se uno dei due array contiene oggetti
        if (
          hasArrayObjectElements(array1 as object[]) ||
          hasArrayObjectElements(array2 as object[])
        ) {
          throw new Error(
            `Uno dei due array contiente oggetti, questa funziona richiede che l'array contenga valori (string, number, boolan)`
          );
        }
        for (let element2 of array2) {
          let match = array1.find(element1 => element1 === element2);
          match ? sameValues.push(match) : "no match found";
        }
        return sameValues;
      }
      throw new Error("Uno dei due array è vuoto");
    };

  export interface IhasArrayObjectElements_v1 {
    (array: object[]): boolean | string;
  }

  export const hasArrayObjectElements: IhasArrayObjectElements_v1 =
    function hasArrayObjectElements(array: object[]): boolean | string {
      if (isArrayEmpty(array)) {
        return "Array is Empty";
      }
      let result: boolean[] = [];
      array.forEach(element => {
        if (typeof element === "object") result.push(true);
        if (typeof element !== "object") result.push(false);
      });
      if (!result.includes(true)) return false;
      else return true;
    };

  // TODO descrizione metodo
  /**
   *
   * @param array
   * @returns
   */

  export interface IisArrayEmpty_v1 {
    (a: any): any;
  }

  /**
   *
   * @param array
   * @returns
   */
  export const isArrayEmpty: IisArrayEmpty_v1 = function isArrayEmpty(
    array: any[]
  ): boolean {
    if (array.length !== 0) return false;
    else return true;
  };

  export interface IpopFirst_v1 {
    (a: any): any;
  }

  /**
   *
   * @param {*[]} array Array sorgente di lunghezza n.
   * @returns Ritorna un array ricomposto, dove il primo
   * elemeno del array è stato eliminato. L'array risultato
   * ha un lunghezza n-1.
   */
  export const popFirst: IpopFirst_v1 = function popFirst<T>(array: T[]): T[] {
    array.shift();
    return array;
  };

  export interface IremoveSpaceFromString_v1 {
    (type: number, string: string): string;
  }

  /**
   * @param type
   * @param string
   * @returns
   */
  export const removeSpaceFromString: IremoveSpaceFromString_v1 = function (
    type: number,
    string: string
  ): string {
    // TODO Migliorare inizializzazione
    let newString: string = "";
    switch (type) {
      case 1:
        method1(string);
        break;
      case 2:
        method2(string);
        break;
      case 3:
        method3(string);
        break;
      default:
        break;
    }
    function method1(string: string) {
      newString = string.replace(/ /g, "");
    }
    function method2(string: string) {
      newString = string.replace(/\s+/g, "");
    }
    function method3(string: string) {
      newString = string.split(" ").join("");
    }
    return newString;
  };

  export interface IsliceArray_v1 {
    <T>(size: number, array: T): T[][] | string;
  }

  /**
   *
   * @param size : ;
   * @param array
   * @returns
   */
  export const sliceArray: IsliceArray_v1 = function <T>(
    size: number,
    array: T
  ): T[][] | string {
    if (typeof size === "number" && Array.isArray(array)) {
      var s: number = size;
      var arrayOfArrays: T[][] = [];
      for (var i = 0; i < array.length; i += s) {
        arrayOfArrays.push(array.slice(i, i + s));
      }
      return arrayOfArrays;
    } else {
      let res: string;
      typeof size !== "number"
        ? (res = "size is not a number")
        : (res = "The second argument shall be an array");
      return res;
    }
  };

  export interface IsubtractArrays_v1 {
    (arr1: string[], arr2: string[]): string[];
  }

  export const subtractArrays_v1: IsubtractArrays_v1 = function subtractArrays(
    arr1: string[],
    arr2: string[]
  ) {
    return arr1
      .concat(arr2)
      .filter(item => !arr1.includes(item) || !arr2.includes(item));
  };

  export namespace MapCallbacks {
    export const replacer: replacer = (target, source) => e =>
      e.replace(target, source);

    export const makeConditionIndexTuple: makeConditionIndexTuple =
      char => (e, i) =>
        [e.startsWith(char), i];
  }

  export namespace FilterCallbacks {
    export const startsWithString: startsWithString = start => e =>
      e.startsWith(start);

    export const includesString: includesString = string => e =>
      e.includes(string);

    export const exclude: exclude = values => e => {
      return !values.includes(e);
    };

    export const filterConditionIndexTuple: filterConditionIndexTuple = e =>
      e[0];

    export const partToEditStartMaker: partToEditMkr =
      (
        filterConditionIndexTuple = FilterCallbacks.filterConditionIndexTuple,
        makeConditionIndexTuple = MapCallbacks.makeConditionIndexTuple
      ) =>
      checker =>
      c =>
        c
          .map(makeConditionIndexTuple(checker))
          .filter(filterConditionIndexTuple)[0][1];

    export const partToEditEndMaker: partToEditMkr =
      (
        filterConditionIndexTuple = FilterCallbacks.filterConditionIndexTuple,
        makeConditionIndexTuple = MapCallbacks.makeConditionIndexTuple
      ) =>
      checker =>
      c => {
        return c
          .map(makeConditionIndexTuple(checker))
          .filter(filterConditionIndexTuple)[0][1];
      };

    export const finderMaker: finderMaker = (filterCb, filterCbArg) => tuple =>
      [
        ...tuple,
        tuple[0].indexOf(tuple[0].filter(filterCb(filterCbArg))[0]),
        "",
      ];

    export const typeDefiner: typeDefiner = (
      declarations: string[][],
      details: completeDetails
    ) => {
      return declarations.filter(e => e[0] === details[4])[0][1];
    };

    export const definerMaker: definerMaker =
      (
        toBeIncludedInLine,
        includerArg,
        replaceArgs,
        includer = includesString
      ) =>
      line => {
        if (!line.includes(toBeIncludedInLine))
          throw new Error("not the correct line");
        return line
          .split(` `)
          .filter(includer(includerArg))[0]
          .replace(...replaceArgs);
      };

    export const declarationAdderMaker: declarationAdderMaker =
      (
        declarations,
        customTagMaker,
        typeDefiner = FilterCallbacks.typeDefiner
      ) =>
      details => {
        details[1] = customTagMaker(
          details[1].join(`\n`),
          details[4],
          typeDefiner(declarations, details)
        ).split(`\n`);
        return details;
      };

    export const stringToAdd: stringToAdd = (
      namespace,
      declarations,
      details,
      defineType,
      customTagMaker
    ) => {
      details[4] = namespace;

      return customTagMaker(namespace, defineType(declarations, details));
    };

    export const detailsEditorMaker: detailsEditorMaker =
      (
        definer,
        declarations,
        customTagMaker,
        stringToAdd = FilterCallbacks.stringToAdd,
        typeDefiner = FilterCallbacks.typeDefiner
      ) =>
      details => {
        details[1].splice(
          details[3] - 1,
          0,
          ...stringToAdd(
            definer(details[0][details[3]]),
            declarations,
            details,
            typeDefiner,
            customTagMaker
          ).split(`\n`)
        );
        details[4] = definer(details[0][details[3]]);
        return details;
      };
  }

  export namespace SortCallbacks {
    export interface IsortDescending_v1 {
      <T extends []>(a: T, b: T, index: number): number | undefined;
    }

    /**
     *
     * @param a
     * @param b
     * @param index
     * @returns
     */
    export const sortDescending_v1: IsortDescending_v1 =
      function sortDescending<T extends []>(
        a: T,
        b: T,
        index: number
      ): number | undefined {
        if (typeof a[index] !== "number" && typeof b[index] !== "number")
          return;

        // TODO errore TS
        return b[index] - a[index];
      };
  }
}
