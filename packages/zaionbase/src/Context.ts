// import { GenericContext as GC } from "./Context/GenericContext";
import { WithChangeState as WCS } from "./Context/GenericContext/WithChangeState";
import { Result as R } from "./Context/GenericContext/WithChangeState/Result";
import { WithChangeValue as WCV } from "./Context/GenericContext/WithChangeValue";

declare module "./Context" {
  export namespace Context {
    export import WithChangeState = WCS;
    export import WithChangeValue = WCV;
    export import Result = R;
  }
}

export class Context {}
export namespace Context {}

Context.WithChangeState = WCS;
Context.WithChangeValue = WCV;
Context.Result = R;
