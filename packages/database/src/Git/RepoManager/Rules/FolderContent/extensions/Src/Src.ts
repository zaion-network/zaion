import { FolderContent } from "../../FolderContent";
import type {
  quantities,
  availabilities,
  categories,
} from "../../FolderContent";

export interface Src extends FolderContent {
  category: categories;
}
export class Src extends FolderContent {
  constructor(
    category: keyof typeof categories,
    quantity: keyof typeof quantities,
    availability: keyof typeof availabilities,
    isIgnored: boolean
  ) {
    super(
      Src.sorts.packages,
      Src.quantities[quantity],
      isIgnored,
      Src.availabilities[availability]
    );
    this.category = Src.categories[category];
  }
}
