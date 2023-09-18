import { Node } from "./Node";
import { StoreValue } from "./Store";

export interface ProductValue {
  name: string;
  price: number;
  store: Node<StoreValue>;
  link: string;
  categorie: string[];
}

export class Product extends Node<ProductValue> implements Node<ProductValue> {
  type: "product" = "product";
  constructor(value: ProductValue) {
    super("product", value)
  }
}
