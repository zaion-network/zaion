import { Node } from "./Node";
import { ProductValue } from "./Product";

export type quantity = number;
export type price = number;
export type ID = string;

export interface ListValue {
  creation_date?: Date;
  update_date?: Date;
  name?: string;
  products?: Map<ID, quantity>;
}

export abstract class List extends Node<ListValue> implements Node<ListValue> {
  type: "list" = "list";
  abstract addProduct(product: ID, qty: number): this;
  abstract removeProduct(product: Node<ProductValue>): void;
  abstract closeList(): void;
  abstract total(): price;
}
