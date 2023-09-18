import { Optional } from "../../";
import type {
  quantities,
  subGenres,
} from "../../../../../../";

export interface ExentionModule extends Optional {
  subGenre: subGenres.extensions;
}
export class ExentionModule extends Optional {
  subGenre: subGenres.extensions;
  constructor(quantity: `${quantities}`) {
    super(ExentionModule.quantities[quantity], "module");
    this.subGenre = ExentionModule.subGenres.extensions;
  }
}
