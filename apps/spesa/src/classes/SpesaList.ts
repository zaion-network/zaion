import { ID, List, ListValue } from "./List";
import { Node } from "./Node";
import { ProductValue } from "./Product";

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
