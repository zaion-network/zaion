import { Visitor } from "@babel/core";
import * as _BabelPlugin from "./";

const BabelPlugin: BabelPluginExport = _BabelPlugin;

interface BabelPluginExport {
  BabelPlugin: AbstractBabelPluginCtor;
  getTsPropSigName: any;
}

export abstract class AbstractBabelPlugin {
  abstract makeVisitor<T>(visitor: Visitor<T>): this;
}

export interface AbstractBabelPluginCtor {
  new (): AbstractBabelPlugin;
}
