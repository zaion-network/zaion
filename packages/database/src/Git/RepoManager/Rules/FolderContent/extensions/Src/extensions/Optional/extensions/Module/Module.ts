import { Optional } from "../../";
import type {
  quantities,
  subGenres,
} from "../../../../../../";

export interface Module {
  subGenre?: subGenres;
  quantity: (typeof quantities)["one"];
}
export class Module extends Optional {
  constructor(genre: keyof typeof subGenres) {
    super("one", "module");
    this.subGenre = Optional.subGenres[genre];
  }
}
