import { Required } from "../../";
import type {
  filesSubSorts,
  filesSorts,
} from "../../../../";
import {
  sorts,
  subCategories,
  categories,
  genres,
} from "../../../../FolderContent";

export interface File extends Required {
  sort: filesSorts;
  isIgnored: false;
  category: categories;
  subCategory: subCategories;
  genre: genres;
}
export class File extends Required {
  constructor(
    fileSort: keyof typeof filesSorts,
    sort?: keyof typeof sorts,
    category?: keyof typeof categories
  ) {
    super(File.filesSorts[fileSort], false);
    if (category)
      this.category = File.categories[category];
  }
}
