import "../../../../../../Node";
import { ExecSync as ES } from "./ChildProcess/ExecSync";

declare module "../../../../../../Node" {
  namespace Node {
    interface ChildProcess {
      ExecSync: typeof ES;
    }
    namespace ChildProcess {
      export import ExecSync = ES;
    }
  }
}

export class ChildProcess {}
export namespace ChildProcess {}
