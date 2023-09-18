import { Folder } from "../..";
import { PackageEntity } from "./PackageEntity";

export class Package extends Folder {
  packagejson: any;
  packageEntities: PackageEntity[] = [];
}
