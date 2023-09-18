import { EntrypointSrcFolderRule } from "../../EntrypointSrcFolder";
import { FolderContent } from "../../../../../../../../../FolderContent";
import type { subGenres } from "../../../../../../../../../FolderContent";

export interface ModuleEntrypoinSrcFolderRule
  extends EntrypointSrcFolderRule {}
export class ModuleEntrypoinSrcFolderRule extends EntrypointSrcFolderRule {
  constructor(genre: keyof typeof subGenres) {
    super(FolderContent.genres.module);
    this.subGenre = FolderContent.subGenres[genre];
  }
}
