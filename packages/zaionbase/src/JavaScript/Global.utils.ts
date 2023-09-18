import "../JavaScript";
import { setTimeout_utils as T } from "./Global/setTimeout.utils";
import { setInterval_utils as I } from "./Global/setInterval.utils";

export const setTimeout_utils = T;
export const setInterval_utils = I;

declare module "../JavaScript" {
  namespace JavaScript {
    interface Global_utils {
      setTimeout_utils: typeof T;
      setInterval_utils: typeof I;
    }
    namespace Global_utils {
      type it2 = string;
      export import setTimeout_utils = T;
      export import Interval = I;
    }
  }
}
export namespace Global_utils {}
