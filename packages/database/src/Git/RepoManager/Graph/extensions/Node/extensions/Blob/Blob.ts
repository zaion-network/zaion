import { Node } from "../../Node";

export class Blob extends Node {
  type = "blob";
  kind:
    | ""
    | "code"
    | "readme"
    | "config"
    | "license"
    | ""
    | ""
    | "" = "";
  sort:
    | "function"
    | "hook"
    | "styled"
    | "class"
    | "component" = "function";
  specie: "" | "edit" | "creation" = "";
}
