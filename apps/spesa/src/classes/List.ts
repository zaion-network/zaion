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
  products?: Map<ID, quantity>;
  abstract addProduct(product: ID, qty: number): this;
  abstract removeProduct(product: Node<ProductValue>): void;
  abstract closeList(): void;
  abstract total(): price;
}

export class SpesaList extends List {
  constructor(v: ListValue) {
    super("spesa-lise", v);
  }
  addProduct(product: ID, qty: number): this {
    this.value.products!.set(product, qty);
    return this;
  }
  removeProduct(product: Node<ProductValue>): void {
    console.log("ill remove");
  }
  closeList(): void {
    console.log("ill close");
  }
  total(): number {
    console.log("ill total");
    return 0;
  }
}
