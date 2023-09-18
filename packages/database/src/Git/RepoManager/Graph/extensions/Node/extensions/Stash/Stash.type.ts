import { Node } from "../../Node.type";

export abstract class Stash extends Node {
  blobs: Blob[] = [];
}
