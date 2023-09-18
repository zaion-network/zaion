import {
  FileSystemKinds,
  FileSystemNode as FileSystemNodeType,
} from "../../FileSystemNode.type";
import { FileSystemNodeValue } from "../../FileSystemNode.type";
import { FileSystemNode } from "../../FileSystemNode";

export interface FileValue extends FileSystemNodeValue {
  extension?: string;
}

export interface CommonFileType {
  isApp(): boolean;
}

export abstract class File
  extends FileSystemNode
  implements CommonFileType, FileSystemNodeType
{
  kind: `${FileSystemKinds}` = "file";
  isApp() {
    return this.value.path.includes("apps/");
  }
}
