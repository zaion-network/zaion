import { HigherUtilities as Utilities } from "../class/using DeeperUtilities/using DeepUtilites/using LowUtilities/using Utilities/using HighUtilities/HigherUtilites";
import { Value } from "./Attributes";
import { RelativePathElement } from "./RelativePathElement";
import { SearchHint } from "./SearchHint";

export interface FileRef {
  HasRelativePath: Value;
  RelativePathType: Value;
  RelativePath: {
    RelativePathElement: RelativePathElement | RelativePathElement[];
  };
  Name: Value;
  Type: Value;
  Data: string;
  RefersToFolder: Value;
  SearchHint: SearchHint;
  LivePackName: Value;
  LivePackId: Value;
}

type Keys = keyof FileRef;

enum relativePathTypes {
  "unknown0",
  "other projects",
  "unknown2",
  "current project",
  "unknown4",
  "unknown5",
  "user library",
}

relativePathTypes["other projects"];

export class FileRef {
  static #isArray = Utilities.JavaScript.ArrayUtils.ensureArray;

  static #mapRelativePaths = (e: RelativePathElement) =>
    e["@Dir"] === "" ? ".." : e["@Dir"];

  #relativePathTypes = [
    "unknown",
    "other projects",
    "unknown",
    "current project",
    "unknown",
    "unknown",
    "user library",
  ];

  constructor(obj: { [key in Keys]: any }) {
    for (let key in obj) {
      this[key as keyof this] = obj[key as keyof typeof obj];
    }
  }

  get pathtype() {
    return {
      value: Number(this.RelativePathType["@Value"]),
      description:
        this.#relativePathTypes[Number(this.RelativePathType["@Value"])],
    };
  }

  get filepath() {
    this.RelativePath.RelativePathElement = FileRef.#isArray(
      this.RelativePath.RelativePathElement
    );
    return this.#joinPathAndName(this.RelativePath.RelativePathElement);
  }

  get filename() {
    return this.Name["@Value"];
  }

  #joinPathAndName = (pathelements: RelativePathElement[]) =>
    `${pathelements.map(FileRef.#mapRelativePaths).join("/")}/${
      this.Name["@Value"]
    }`;
}
