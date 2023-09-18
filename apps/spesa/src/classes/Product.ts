import { Categoria } from "./Categoria";
import { Node } from "./Node";
import { StoreValue } from "./Store";

export interface ProductValue {
  name: string;
  price: number;
  link: string;
}

export class Product extends Node<ProductValue> implements Node<ProductValue> {
  type: "product" = "product";
  stores: Node<StoreValue>[]
  categorie: Categoria[];
  constructor(value: ProductValue) {
    super("product", value)
    this.stores = []
    this.categorie = []
  }
}
