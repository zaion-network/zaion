import { ambulacaca } from "./webinar";
export * as JavaScript from "./JavaScript";
export const web = "i am web";

declare module "./web" {
  namespace bubolo {
    interface bubolone {}
  }
}
export namespace bubolo {
  export const bubolone: bubolone = {
    name: ambulacaca,
  };
}
