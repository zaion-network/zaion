import { FileSystemNode as FSTN } from "./FileSystemNode.type";
import { FileSystemNodeValue } from "./FileSystemNode.type";

export class FileSystemNode extends FSTN {
  sort: any;
  constructor(
    kind: "file" | "folder",
    value: FileSystemNodeValue,
    parent: FileSystemNode | null = null
  ) {
    super(kind, value, parent);
  }
}
