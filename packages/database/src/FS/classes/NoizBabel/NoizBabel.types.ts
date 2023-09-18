import { Node as BabelNode } from "@babel/types";
import * as parser from "@babel/parser";
import * as _NoizBabel from ".";
import { AbstractBabelPlugin } from "./plugins/BabelPlugin/BabelPlugin.types";

const NoizBabelExport: NoizBabelExport = _NoizBabel;

type LoadedPlugins =
  keyof AbstractNoizBabelCtor["plugins"];

interface NoizBabelExport {
  NoizBabel: AbstractNoizBabelCtor;
}

export abstract class AbstractNoizBabel {
  abstract code: string;
  abstract ast: BabelNode;
  abstract stringResult: string[];
  abstract parse_ops: parser.ParserOptions;
  abstract traverse(): this;
  abstract with(type: LoadedPlugins): this;
}

export interface NoizBabel_v1Props {
  code: string;
}

interface AbstractNoizBabelCtor {
  plugins: {
    getProperties: AbstractBabelPlugin;
  };
  new (props: NoizBabel_v1Props): AbstractNoizBabel;
}
