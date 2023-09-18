import { Node as BabelNode } from "@babel/types";
import traverse from "@babel/traverse";
import * as parser from "@babel/parser";
import { BabelPlugin, getTsPropSigName } from "./plugins";

type LoadedPlugins = keyof typeof NoizBabel_v1["plugins"];

export interface INoizBabel_v1 {
  code: string;
  ast: BabelNode;
}

export interface NoizBabel_v1Props {
  code: string;
}

export interface NoizBabel_v1 {
  code: string;
  ast: BabelNode;
}

export class NoizBabel_v1 implements INoizBabel_v1 {
  static plugins: {
    getProperties: BabelPlugin;
  } = { getProperties: getTsPropSigName };

  stringResult: string[] = [];

  parse_ops: parser.ParserOptions = {
    sourceType: "module",
    plugins: ["jsx", "typescript"],
  };

  constructor({ code }: NoizBabel_v1Props) {
    this.code = code;
    this.ast = parser.parse(code, this.parse_ops);
  }

  traverse() {
    return this;
  }
  /**
   * This function modifies the object in the following way:
   * 1. It retrieves the plugin with the specified type from
   *    the `NoizBabel_v1.plugins` object.
   * 2. If the plugin has a `stringResult` property, it sets
   *    the `stringResult` property of the object to the
   *    value of the plugin's `stringResult` property.
   * 3. It calls the `traverse` function and passes it the
   *    object's `ast` property and the visitor object of
   *    the plugin.
   * 4. It returns the object.
   *
   * @param type - The type of the plugin to retrieve from
   *    the `NoizBabel_v1.plugins` object.
   * @returns {this} The modified object.
   */
  with(type: LoadedPlugins): this {
    const plugin = NoizBabel_v1.plugins[type];
    const result = plugin.stringResult;
    if (result) this.stringResult = result;
    traverse(this.ast, NoizBabel_v1.plugins[type].visitor);
    return this;
  }
}

export type NoizBabel_v1Ctor = {
  new (props: INoizBabel_v1): NoizBabel_v1;
};

export const NoizBabel_v1Ctor: NoizBabel_v1Ctor =
  NoizBabel_v1;
