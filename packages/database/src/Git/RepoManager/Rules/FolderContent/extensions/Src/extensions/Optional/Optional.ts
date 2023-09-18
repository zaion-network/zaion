import { Src } from "../../";
import type {
  availabilities,
  genres,
  quantities,
} from "../../../../";

export interface Optional extends Src {
  subCategory: genres;
  availability: (typeof availabilities)["optional"];
  isIgnored: false;
}

export class Optional extends Src {
  constructor(
    quantity: keyof typeof quantities,
    genre: keyof typeof genres
  ) {
    super(
      "src",
      quantity,
      Optional.availabilities.optional,
      false
    );
    this.subCategory = Optional.genres[genre];
  }
}
