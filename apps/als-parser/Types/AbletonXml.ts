import { Attributes as A } from "./Attributes";
import { Ableton as Abl } from "./Ableton";

export interface AbletonXml {
  ["?xml"]: { ["@version"]: unknown; ["@encoding"]: unknown };
  Ableton: AbletonXml.Ableton;
}

export class AbletonXml {}
export namespace AbletonXml {
  export import Attributes = A;
  export import Ableton = Abl;
}
