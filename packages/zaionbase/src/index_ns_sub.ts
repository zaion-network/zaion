import {} from "./index_ns";
declare module "./index_ns_sub" {}
declare module "./index_ns" {
  export namespace Test {
    export interface ulla {
      surname: string;
    }
  }
}
export namespace sub {
  export const boo = "baz";
}
export const urca = "vacca";
