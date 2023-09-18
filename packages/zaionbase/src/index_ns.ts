import { urca as u, sub as s } from "./index_ns_sub";
declare module "./index_ns" {
  type mamma = "mamma";
  export namespace Test {}
}
export namespace Test {
  export const ulla: Test.ulla = {
    surname: "wow",
  };
  export const urca = u;
  export import sub = s;
  export const subValues = s;
}
