import { generateRandom } from "./lib/generateRandom";
import { ID, ListValue } from "./List";
import { Node } from "./Node";
import { Product, ProductValue } from "./Product";
import { SpesaList } from "./List";
import { StoreValue } from "./Store";

export abstract class Application {
  abstract lists: Map<ID, SpesaList>;
  abstract stores: Map<ID, Node<StoreValue>>;
  abstract products: Map<ID, Product>;
  abstract makelist(): SpesaList;
  abstract saveList(list: SpesaList): this;
  abstract getList(list: string): SpesaList;
  abstract updateList(): void;
  abstract deleteList(): void;
  abstract closeList(list: string): this;
  abstract getAllLists(): Node<ListValue>[];
  abstract createProduct(props: ProductValue): Node<ProductValue>;
  abstract saveProduct(prod: Product): this;
}

export class SpesaApplication extends Application {
  makelist(): SpesaList {
    let listaspesa = new SpesaList({ products: new Map() });
    this.lists.set(generateRandom(), listaspesa);
    return listaspesa;
  }
  saveList(list: SpesaList): this {
    this.lists.set(list.value.name!, list);
    return this;
  }
  getList(list: string): SpesaList {
    return this.lists.get(list)!;
  }
  updateList(): void {
    console.log("will update the list");
  }
  deleteList(): void {
    console.log("will delete the list");
  }
  closeList(list: string): this {
    Object.freeze(this.lists.get(list));
    return this;
  }
  getAllLists(): Node<ListValue>[] {
    let lists = Array.from(this.lists).map(e => e[1]);
    return lists;
  }
  createProduct(props?: ProductValue): Product {
    return new Product(props!);
  }
  saveProduct(prod: Product): this {
    this.products.set(prod.value.name, prod);
    return this;
  }
  lists: Map<string, SpesaList> = new Map();
  stores: Map<string, Node<StoreValue>> = new Map();
  products: Map<string, Product> = new Map();
}
