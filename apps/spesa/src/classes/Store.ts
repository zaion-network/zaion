import { Node } from "./Node";

export interface StoreValue {
  name: string;
  link: string;
}
export abstract class Store
  extends Node<StoreValue>
  implements Node<StoreValue>
{
  type: "store" = "store";
  abstract kind: string;
}

export class ECommerce extends Store {
  kind: "e-commerce" = "e-commerce";
}

export class CentroCommerciale extends Store {
  kind: "centro-commerciale" = "centro-commerciale";
}

export class NegozioLocale extends Store {
  kind: "negozio-locale" = "negozio-locale";
}
