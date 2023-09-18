import { PluginObj, Visitor } from "@babel/core";
import { AbstractBabelPlugin } from "./BabelPlugin.types";

export interface IBabelPlugin_v1 {
  name: string;
}

export interface BabelPlugin_v1<T = {}>
  extends PluginObj<T> {
  stringResult: string[];
  visitor: Visitor<T>;
  manipulateOptions?(opts: any): void;
  pre?(state: any): void;
  post?(state: any): void;
  makeVisitor<T>(visitor: Visitor<T>): this;
}

export class BabelPlugin_v1<
  T = {}
> extends AbstractBabelPlugin {
  constructor() {
    super();
    this.stringResult = [];
  }
  makeVisitor<T_>(visitor: Visitor<T_>) {
    this.visitor = visitor as Visitor<T>;
    return this;
  }
}

export type BabelPlugin_v1Ctor = {
  new (name: string): BabelPlugin_v1;
};

export const BabelPlugin_v1Ctor: BabelPlugin_v1Ctor =
  BabelPlugin_v1;
