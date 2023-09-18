import { Node } from "./Node";

export interface CategoriaValue {
  nome: string
}

export class Categoria extends Node<CategoriaValue> implements Node<CategoriaValue> {
  constructor(value: CategoriaValue) {
    super("categoria", value)
    Categoria.categories.push(this)
  }
}

export namespace Categoria {
  export const categories: Categoria[] = []
}