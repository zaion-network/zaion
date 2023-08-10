import { Timeout as T } from "./Global/Timeout";
import { Interval as I } from "./Global/Interval";

export class Global_utils {}
export namespace Global_utils {
  export namespace setTimeout_utils {
    export class Timeout extends T {}
  }
  export namespace setInterval_utils {
    export class Interval extends I {}
  }
}
