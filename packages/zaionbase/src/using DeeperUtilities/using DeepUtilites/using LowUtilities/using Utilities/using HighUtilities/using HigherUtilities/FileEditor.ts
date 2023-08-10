import { HigherUtilities } from "../HigherUtilites";

declare module "./FileEditor" {
  type details = HigherUtilities.JavaScript.ArrayUtils.details;
  type compDet = HigherUtilities.JavaScript.ArrayUtils.completeDetails;
  type splitter = HigherUtilities.JavaScript.ArrayUtils.splitter;
  type detailer = HigherUtilities.JavaScript.ArrayUtils.detailer;
  type dtsMkr =
    HigherUtilities.JavaScript.ArrayUtils.FilterCallbacks.completeDetailsMaker;
  type detEditor = HigherUtilities.JavaScript.ArrayUtils.detailsEditor;
  type subs = HigherUtilities.JavaScript.ArrayUtils.substituter;

  type reader = (path: string) => Buffer;
  type start = undefined | string;
  type strOrArr = string | string[];
  type arrOrDet = string[] | details;
  type detOrCom = compDet | details;
  type detOrStr = compDet | string;
  type mapCallback<
    E,
    R = E
  > = HigherUtilities.JavaScript.ArrayUtils.MapCallbacks.mapCallback<E, R>;

  type read = (filename: string, reader: (path: string) => Buffer) => string[];
  type splicer = HigherUtilities.JavaScript.ArrayUtils.splicer;
  interface fileSaver {
    (path: string, content: string): void;
  }

  export namespace FileEditor {
    export type lineEditor = mapCallback<string, [string, string[]] | null>;
    export interface decorator {
      (customTag: (e: string) => string, initial: string, final: string): (
        reader: reader
      ) => mapCallback<string, [string, string[]]>;
    }
    interface mediate {
      (reader: (path: string) => Buffer): mapCallback<
        string,
        [string, string[]]
      >;
    }
    interface mid {
      (
        customTag: (e: string) => string,
        initial: string,
        final: string
      ): mediate;
    }
    export interface readFileEditLinesAddFirstAddLast {
      (read: read, splicer: splicer): mid;
    }
  }
}

export class FileEditor<
  T extends undefined | string | string[] | details | compDet = undefined
> {
  result: T;
  #content?: string[];
  constructor(public path: string, resultExample: T = undefined as T) {
    this.result = resultExample;
    return this;
  }
  read(this: FileEditor<string>, readFile: reader): never;
  read(this: FileEditor<undefined>, readFile: reader): FileEditor<string>;
  read(this: FileEditor<start>, readFile: reader): FileEditor<start> {
    this.result = readFile(this.path).toString();
    return this;
  }

  split(this: FileEditor<string[]>, splitter: splitter): never;
  split(this: FileEditor<string>, splitter: splitter): FileEditor<string[]>;
  split(this: FileEditor<strOrArr>, splitter: splitter): FileEditor<strOrArr> {
    this.result = splitter(this.result as string);
    this.#content = this.result;
    return this as unknown as FileEditor<string[]>;
  }

  grabPart(this: FileEditor<details>, grab: detailer): never;
  grabPart(this: FileEditor<string[]>, grab: detailer): FileEditor<details>;
  grabPart(this: FileEditor<arrOrDet>, grab: detailer): FileEditor<arrOrDet> {
    this.result = grab(this.result as string[]);
    return this;
  }

  details(this: FileEditor<compDet>, find: dtsMkr): never;
  details(this: FileEditor<details>, find: dtsMkr): FileEditor<compDet>;
  details(this: FileEditor<detOrCom>, find: dtsMkr): FileEditor<detOrCom> {
    this.result = find(this.result as details);
    return this;
  }

  add(this: FileEditor<compDet>, editor: detEditor): FileEditor<compDet> {
    this.result = editor(this.result);
    return this as FileEditor<compDet>;
  }

  substitute(this: FileEditor<string>, sub: subs): never;
  substitute(this: FileEditor<compDet>, sub: subs): FileEditor<string>;
  substitute(this: FileEditor<detOrStr>, sub: subs): FileEditor<detOrStr> {
    this.result = sub(
      this.#content!,
      (this.result as compDet)[1],
      (this.result as compDet)[2]
    ).join(`\n`);
    return this;
  }

  save(this: FileEditor<string>, saveFile: fileSaver) {
    saveFile(this.path, this.result);
    return this;
  }
}

export namespace FileEditor {
  type Undefined = TextDecorator<undefined>;
  type UndefinedOrReader = TextDecorator<undefined | reader>;
  type Reader = TextDecorator<reader>;
  type RoAS = TextDecorator<reader | [string[], splicer]>;
  type ArrAndSpl = TextDecorator<[string[], splicer]>;
  type ASoD = TextDecorator<[string[], splicer] | [string, string[]]>;
  type Deco = TextDecorator<[string, string[]]>;
  type lineEditorArgs = [(e: string) => string, string, string];
  export class TextDecorator<
    V extends
      | reader
      | [string[], splicer]
      | string
      | [string, string[]]
      | undefined = undefined
  > {
    value: V;

    constructor(
      public filename: string,
      public i: number,
      public context: string[],
      value: V = undefined as V
    ) {
      this.value = value;
      return this;
    }

    setReader(this: Reader, reader: reader): never;
    setReader(this: Undefined, reader: reader): Reader;
    setReader(this: UndefinedOrReader, reader: reader): UndefinedOrReader {
      this.value = reader;
      return this;
    }

    setReadAndSplicer(this: ArrAndSpl, read: read, splicer: splicer): never;
    setReadAndSplicer(this: Reader, read: read, splicer: splicer): ArrAndSpl;
    setReadAndSplicer(this: RoAS, read: read, splicer: splicer): RoAS {
      this.value = [read(this.filename, this.value as reader), splicer];
      return this;
    }

    configureLineEditor(this: Deco, ...args: lineEditorArgs): never;
    configureLineEditor(this: ArrAndSpl, ...args: lineEditorArgs): Deco;
    configureLineEditor(this: ASoD, ...args: lineEditorArgs): ASoD {
      this.value = [
        this.filename,
        (this.value as [string[], splicer])[1](this.context)(this.i, 0, [
          args[1],
          ...(this.value as [string[], splicer])[0].map(args[0]),
          args[2],
        ]),
      ];
      return this;
    }

    decorate(this: TextDecorator<[string, string[]]>): [string, string[]];
    decorate(this: TextDecorator<[string, string[]]>): [string, string[]];
    decorate(this: TextDecorator<[string, string[]]>): [string, string[]] {
      return this.value;
    }
  }
}
