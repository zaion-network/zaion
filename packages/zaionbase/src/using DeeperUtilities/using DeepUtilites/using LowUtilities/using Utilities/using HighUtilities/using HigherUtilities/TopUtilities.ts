import { HigherUtilities as HU } from "../HigherUtilites";
import { HasUpdated as H } from "./HasUpdated";
import { compareObj as co } from "./compareObj";
import { FileEditor as FE } from "./FileEditor";

declare module "./HasUpdated" {}
declare module "./compareObj" {}
declare module "../HigherUtilites" {
  export namespace HigherUtilities {
    export namespace JavaScript {
      export namespace ObjectUtils {
        export import compareObj = co;
      }
    }
    export namespace Node {
      export namespace FileSystem {
        export import HasUpdated = H;
      }
    }

    export import FileEditor = FE;
    // export var FileEditor: typeof FE;
  }
}

HU.FileEditor = FE;
export import TopUtilities = HU;
