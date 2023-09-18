import { Src as SrcFolderContent } from "../../";
import type {
  availabilities,
  quantities,
  genres,
} from "../../../../";

let epsc = SrcFolderContent.genres;

export interface EntrypointSrc extends SrcFolderContent {
  genres: genres;
  isIgnored: false;
}
export class EntrypointSrc extends SrcFolderContent {
  constructor(
    availability: keyof typeof availabilities,
    quantity: keyof typeof quantities,
    genre: keyof typeof genres
  ) {
    super("src", quantity, availability, false);
    this.genres = SrcFolderContent.genres[genre];
  }
}
